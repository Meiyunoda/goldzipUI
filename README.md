Clone down this repository. You will need `node` and `npm` installed globally on your machine.

Dependency Installation:

    npm install
    npm install --force (if it fails)

Setup

    1. create cognito users pool
    https://console.aws.amazon.com/cognito/users

    check this article for details
    https://darrenwhite.dev/blog/nextjs-authentication-with-next-auth-and-aws-cognito


    Enabled Identity Providers
    ✔️ Select all
    ✔️ Cognito User Pool
    ✔️ Authorization code grant
    ✔️ email
    ✔️ openid
    ✔️ profile

    Sign in and sign out URLs
    Callback URL(s) should be:
    http://localhost:3000/api/auth/callback/cognito, https://goldzip.vercel.app/api/auth/callback/cognito


    2. set up s3

    check off `Block all public access`

    Bucket policy:
    
        {
            "Version": "2012-10-17",
            "Statement": [
                {
                    "Sid": "PublicListGet",
                    "Effect": "Allow",
                    "Principal": "*",
                    "Action": [
                        "s3:List*",
                        "s3:Get*"
                    ],
                    "Resource": [
                        "arn:aws:s3:::hk-goldzip",
                        "arn:aws:s3:::hk-goldzip/*"
                    ]
                }
            ]
        }

        Cross-origin resource sharing (CORS):

        [
            {
                "AllowedHeaders": [
                    "*"
                ],
                "AllowedMethods": [
                    "PUT",
                    "POST",
                    "DELETE",
                    "GET"
                ],
                "AllowedOrigins": [
                    "*"
                ],
                "ExposeHeaders": []
            }
        ]

    get Amazon S3 Access key ID and Secret Key here:
    https://support.promax.com/knowledge/amazon-s3

Create `.env.local` under root before development:
    
    NEXT_PUBLIC_GOLDZIP_WALLET=

    NEXT_PUBLIC_COGNITO_CLIENT_ID=
    NEXT_PUBLIC_COGNITO_CLIENT_SECRET=
    NEXT_PUBLIC_COGNITO_DOMAIN=

    NEXT_PUBLIC_S3_ACCESS_KEY_ID=
    NEXT_PUBLIC_S3_SECRET_ACCESS_KEY=
    NEXT_PUBLIC_S3_REGION=
    NEXT_PUBLIC_S3_BUCKET_NAME=
    NEXT_PUBLIC_S3_DIR_NAME=

    NEXTAUTH_URL=


Development: then visit localhost:3000

    npm run dev

Deployment: Build then Start Server:

    npm run build
    npm run start

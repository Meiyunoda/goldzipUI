import NextAuth from 'next-auth';
import CognitoProvider from 'next-auth/providers/cognito';

// export default NextAuth({
//   providers: [
//     // Providers.Cognito({
//     CognitoProvider({
//       clientId: process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID,
//       clientSecret: process.env.NEXT_PUBLIC_COGNITO_CLIENT_SECRET,
//       domain: process.env.NEXT_PUBLIC_COGNITO_DOMAIN,
//     })
//   ],
//   debug: true,
//   // callbacks: {
//   //   // async signIn({ user, account, profile, email, credentials, ...rest }) {
//   //   //   console.log(` [...nextauth].js --- :`, { user, account, profile, email, credentials, rest })
//   //   //   // return false;
//   //   //   return true
//   //   // },
//   //   async redirect({ url, baseUrl }) {
//   //     return baseUrl
//   //   },
//   //   async session({ session, user, token }) {
//   //     return session
//   //   },
//   //   async jwt({ token, user, account, profile, isNewUser }) {
//   //     return token
//   //   }
//   //   // debug: process.env.NODE_ENV === 'development' ? true : false
//   // }
// })




const providers = [
  CognitoProvider({
    clientId: process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID,
    clientSecret: process.env.NEXT_PUBLIC_COGNITO_CLIENT_SECRET,
    domain: process.env.NEXT_PUBLIC_COGNITO_DOMAIN,
  })
]

const callbacks = {}

callbacks.signIn = async function signIn(user, account, metadata) {
  user.accessToken = account.accessToken;
  return true;
}

callbacks.jwt = async function jwt(token, user) {
  if (user) {
    token = {
      accessToken: user.accessToken,
      ...user
    }
  }

  return token
}

callbacks.session = async function session(session, token) {
  session.accessToken = token.accessToken
  return session
}

const options = {
  providers,
  callbacks,
  debug: true,
}

export default (req, res) => NextAuth(req, res, options)

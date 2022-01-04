import { InfoIcon } from '@chakra-ui/icons';
import { FormControl, FormLabel, Popover, PopoverBody, PopoverContent, PopoverTrigger, Progress, Text, useToast } from "@chakra-ui/react";
import React, { useState } from "react";
import S3 from 'react-aws-s3';


const ImageUpload = ({ onChange, name, label, required = true, filePath = '' }) => {
  let config = {
    bucketName: process.env.NEXT_PUBLIC_S3_BUCKET_NAME,//'myBucket',
    dirName: filePath || name || process.env.NEXT_PUBLIC_S3_DIR_NAME,// 'media',
    // dirName: process.env.NEXT_PUBLIC_S3_DIR_NAME,// 'media',
    region: process.env.NEXT_PUBLIC_S3_REGION,// 'eu-west-1',
    accessKeyId: process.env.NEXT_PUBLIC_S3_ACCESS_KEY_ID, // JAJHAFJFHJDFJSDHFSDHFJKDSF,
    secretAccessKey: process.env.NEXT_PUBLIC_S3_SECRET_ACCESS_KEY// 'cms21uMxçduyUxYjeg20+DEkgDxe6veFosBT7eUgEXAMPLE',
  };

  const ReactS3Client = new S3(config);

  const [fileName, setFileName] = useState('');
  const [url, setUrl] = useState('');
  const [progress, setProgress] = useState(0);
  const toast = useToast();

  const handleUpload = async (e) => {
    try {
      if (!e?.target?.files?.[0]) {
        throw new Error('File not found')
      }

      const image = e.target.files[0];
      const fileSize = ((image.size / 1024) / 1024); // MB
      if (fileSize > 4) {
        throw new Error(`${image.name} is larger than 4MB, please reduce the size.`)
      }

      const fileName = `${(+new Date())}-${image.name}`;

      const data = await ReactS3Client.uploadFile(image, fileName);
      setUrl(data.location);
      onChange && onChange(data.location);
      setFileName(image.name);
    } catch (e) {
      toast({
        title: e.message,
        status: "error",
      });
      setUrl('');
      setProgress(0);
    }
  };

  return (
    <FormControl>
      <FormLabel htmlFor={name}>{label}</FormLabel>
      {(progress > 0 && progress < 100) && <Progress hasStripe value={progress} />}

      <input type="file" onChange={handleUpload} id={name} required={required} accept=".pdf,.jpg,.tiff,.png,.doc,.docx" />

      <Popover trigger={'hover'}>
        <PopoverTrigger>
          <InfoIcon />
        </PopoverTrigger>
        <PopoverContent>
          <PopoverBody>
            <Text>
              The maximum size for each file is 4 MB (four megabytes). We accept these file formats:<br />
              PDF (Portable Document)<br />
              JPG, TIFF, or PNG (Image)<br />
              DOC or DOCX (Microsoft Word Document).
            </Text>
          </PopoverBody>
        </PopoverContent>
      </Popover>

      {url &&
        (
          url.match(/^http[^\?]*.(jpg|jpeg|gif|png|tiff|bmp)(\?(.*))?$/gmi) != null
            ? <img
              src={url}
              alt={`Uploaded ${fileName}`}
              height={"300"}
              width={"400"}
            />
            : <div><br /><a href={url} target={'_blank'} >Check {fileName}</a></div>
        )
      }
    </FormControl>
  );
}

export default ImageUpload;

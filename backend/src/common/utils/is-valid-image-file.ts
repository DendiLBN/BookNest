import { readFileSync } from 'fs';

export const isValidImageFileSignature = (
  filePath: string,
  mimetype: string,
): boolean => {
  const fileHeader = readFileSync(filePath).subarray(0, 12);

  if (mimetype === 'image/jpeg') {
    return (
      fileHeader[0] === 0xff && fileHeader[1] === 0xd8 && fileHeader[2] === 0xff
    );
  }

  if (mimetype === 'image/png') {
    return fileHeader
      .subarray(0, 8)
      .equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]));
  }

  if (mimetype === 'image/webp') {
    return (
      fileHeader.subarray(0, 4).toString() === 'RIFF' &&
      fileHeader.subarray(8, 12).toString() === 'WEBP'
    );
  }

  return false;
};

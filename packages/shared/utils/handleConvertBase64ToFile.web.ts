export const convertBase64ToFile = async ({
  base64,
  mimeType = 'image/jpeg',
}: {
  base64: string;
  fileName?: string;
  mimeType: string;
}) => {
  const prefix = `data:${mimeType};base64,`;
  const validBase64 = base64.startsWith(prefix) ? base64 : `${prefix}${base64}`;

  // use fetch to convert base64 to blob
  const blob = await fetch(validBase64).then(res => res.blob());
  return URL.createObjectURL(blob);
};

export const downloadBase64PDF = (uri: string) => {
  const link = document.createElement('a');
  link.href = uri!;
  link.download = 'contract.pdf';
  link.click();
};

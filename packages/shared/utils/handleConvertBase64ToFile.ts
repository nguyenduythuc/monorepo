import moment from 'moment';
import RNFS from 'react-native-fs';
import Share from 'react-native-share';

export const convertBase64ToFile = async ({
  base64,
  fileName,
  mimeType = 'image/jpeg',
}: {
  base64: string;
  fileName?: string;
  mimeType?: string;
}) => {
  try {
    const path = `${RNFS.DocumentDirectoryPath}/${fileName}`;

    const prefix = `data:${mimeType};base64,`;
    const validBase64 = base64.startsWith(prefix)
      ? base64
      : `${prefix}${base64}`;

    // save base64 to file
    await RNFS.writeFile(
      path,
      validBase64.replace(/^data:image\/\w+;base64,/, ''),
      'base64',
    );
    return path;
  } catch (error) {
    console.error('Error saving file: ', error);
    return '';
  }
};

export const downloadBase64PDF = (uri: string) => {
  if (uri) {
    try {
      const options = {
        title: `signed-contract-${moment().format('YYYYMMDDHHmmss')}.pdf`,
        message: null,
        url: `file://${uri}`,
      };
      // @ts-ignore
      Share.open(options)
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          err && console.log(err);
        });
      // }
    } catch (error) {
      console.error(error);
    }
  }
};

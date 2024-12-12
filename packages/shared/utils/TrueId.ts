/* eslint-disable sonarjs/no-duplicate-string */
import Config from 'react-native-config';

export enum EkycType {
  NFC = 'verifyNFC',
  OCR = 'verifyOCR',
}

export const stepVerification = (type: EkycType) =>
  type === EkycType.NFC
    ? '["SCANMRZ", "INTRONFC", "SCANNFC"]'
    : '["FRONT", "BACK", "SELFIE"]';

export const CONFIG_UI = (type: EkycType) => {
  return `{"primaryColor":"#C60C0C","secondaryColor":"#C60C0C","titleColor":"#253858","errorColor":"#FF6234","textColor":"#091E42","borderInputColor":"#D3D9E0","backgroundColor":"#FFFFFF","closeColor":"#253858","stepBarColor":"#C60C0C","stepBarBackgroundColor":"#E4F4FF","fontName":"Inter","borderRadius":4,"maxRetry":5,"defaultSpacing":20,"livenessType":"${'trueid'}","imageConfirmation": false,"trueidWatermark": false,"allowEditOcr": false,"isShowStepBar": false,"hasInstroctions": false,"isShowSkipNFC": true,"isManualSelfie": false,"stepVerification": ${stepVerification(type)} }`;
};

const configEndPoint = {
  front: '/ekyc/v1.2/id/verify/front',
  back: '/ekyc/v1.2/id/verify/back',
  selfie: '/ekyc/v1.2/selfie/verify',
  complete: '/ekyc/v1.2/complete',
  nfcqrverify: '/ekyc/v2.0/nfcqr/verify',
  nfcrar: '/ekyc/v1.2/nfcqr/upload',
  ocr: '/ekyc/v1.2/id/ocr',
  nfcbshield: '/ekyc/v1.2/nfcqr/upload',
  createrequest: '/ekyc/v1.2/request/create',
  accesstoken: '/auth/v1/oauth/accessToken',
};

export const configInfo = (type: EkycType) => {
  return {
    domain: Config.TRUE_ID_DOMAIN,
    authDomain: Config.TRUE_ID_DOMAIN,
    configEndPoint: {...configEndPoint, nfcbshield: ''},
    appId: Config.TRUE_ID_APP_ID,
    appSecret: Config.TRUE_ID_APP_SECRET,
    zoomLicenseKey: '',
    zoomPublicKey: '',
    zoomServerBaseURL: Config.TRUE_ID_ZOOM_SERVER_BASE_URL,
    zoomAuthURL: Config.TRUE_ID_ZOOM_AUTH_URL,
    accessToken: '',
    configUI: CONFIG_UI(type),
    configHeader: '',
  };
};

export const webConfigInfo = {
  domain: process.env.NEXT_PUBLIC_TRUE_ID_DOMAIN,
  configEndpoint: {
    ...configEndPoint,
    nfcbshield: '/ekyc/v1.2/nfcqr/upload',
  },
  clientId: process.env.NEXT_PUBLIC_TRUE_ID_APP_ID,
  clientSecret: process.env.NEXT_PUBLIC_TRUE_ID_APP_SECRET,
  configHeader: '{"header1":"header1_value", "header2":"header2_value"}',
  stepVerification: JSON.parse(stepVerification(EkycType.OCR)),
  titleColor: '#091E42CC', //80%
  subTitleColor: '#091E4299', //60%
  closeColor: '#091E42CC', //80%
  buttonCaptureColor: '#1182E7',
  titleButtonCaptureColor: '#ffffff',
  backgroundColor: '#ffffff',
  requestId: '',
  accessToken: '',
};

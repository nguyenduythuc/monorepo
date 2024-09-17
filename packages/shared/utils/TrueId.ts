import RNTrueID from 'react-native-true-id';
import Config from 'react-native-config';

export const stepVerification = (type: string) => {
  return type === 'verifyNFC'
    ? '["SCANMRZ","INTRONFC","SCANNFC"]'
    : '["FRONT","BACK","SELFIE"]';
};

export const CONFIG_UI = (type: string) => {
  return `{"primaryColor":"#C60C0C","secondaryColor":"#C60C0C","titleColor":"#253858","errorColor":"#FF6234","textColor":"#091E42","borderInputColor":"#D3D9E0","backgroundColor":"#FFFFFF","closeColor":"#253858","stepBarColor":"#C60C0C","stepBarBackgroundColor":"#E4F4FF","fontName":"Inter","borderRadius":4,"maxRetry":5,"defaultSpacing":20,"livenessType":"${'trueid'}","imageConfirmation": false,"trueidWatermark": false,"allowEditOcr": false,"isShowStepBar": false,"hasInstroctions": false,"isShowSkipNFC": true,"isManualSelfie": false,"stepVerification": ${stepVerification(type)} }`;
};

export const configInfo = (type: string) => {
  return {
    domain: Config.TRUE_ID_DOMAIN,
    authDomain: Config.TRUE_ID_DOMAIN,
    configEndPoint: {
      front: '/ekyc/v1.2/id/verify/front',
      back: '/ekyc/v1.2/id/verify/back',
      selfie: '/ekyc/v1.2/selfie/verify',
      complete: '/ekyc/v1.2/complete',
      nfcqrverify: '/ekyc/v2.0/nfcqr/verify',
      nfcrar: '/ekyc/v1.2/nfcqr/upload',
      ocr: '/ekyc/v1.2/id/ocr',
      nfcbshield: '',
      createrequest: '/ekyc/v1.2/request/create',
      accesstoken: '/auth/v1/oauth/accessToken',
    },
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

export default RNTrueID;

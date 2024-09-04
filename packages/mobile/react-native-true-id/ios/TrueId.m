#import "TrueId.h"
#import <UIKit/UIKit.h>
#import <TrueIDSDK/TrueIDSDK.h>

@implementation TrueId

RCT_EXPORT_MODULE()

RCT_EXPORT_METHOD(configure:(NSDictionary*)data) {
    dispatch_async(dispatch_get_main_queue(), ^{
        if (@available(iOS 12, *)) {
            NSString *domain = [data objectForKey:@"domain"];
            NSString *authDomain = [data objectForKey:@"authDomain"];
            NSString *appId = [data objectForKey:@"appId"];
            NSString *appSecret = [data objectForKey:@"appSecret"];

            ConfigInfo *configInfo;
            NSString *zoomLicenseKey = [data objectForKey:@"zoomLicenseKey"];
            NSString *zoomServerBaseURL = [data objectForKey:@"zoomServerBaseURL"];
            NSString *zoomPublicKey = [data objectForKey:@"zoomPublicKey"];
            NSString *zoomClient = @"320994dcb418e19ed41055b933066b8d";

            NSString *zoomAuthURL = [data objectForKey:@"zoomAuthURL"];
            NSString *accessToken = [data objectForKey:@"accessToken"];
            NSString *configHeader = [data objectForKey:@"configHeader"];
            
            NSDictionary *endPoint = [data objectForKey:@"configEndPoint"];
            
            ConfigEndPoint *configEndPoint = [[ConfigEndPoint alloc] init];
            configEndPoint.front = endPoint[@"front"];
            configEndPoint.back = endPoint[@"back"];
            configEndPoint.selfie = endPoint[@"selfie"];
            configEndPoint.complete = endPoint[@"complete"];
            configEndPoint.nfcqrverify = endPoint[@"nfcqrverify"];
            configEndPoint.nfcrar = endPoint[@"nfcrar"];
            configEndPoint.ocr = endPoint[@"ocr"];
            configEndPoint.nfcbshield = endPoint[@"nfcbshield"];
            configEndPoint.createrequest = endPoint[@"createrequest"];
            configEndPoint.accesstoken = endPoint[@"accesstoken"];
           
            NSString *ui = [data objectForKey:@"configUI"];
            configInfo = [[ConfigInfo alloc] initWithDomain:domain
                                             configEndPoint:configEndPoint
                                                      appId:appId
                                                  appSecret:appSecret
                                             zoomLicenseKey:zoomLicenseKey
                                          zoomServerBaseURL:zoomServerBaseURL
                                              zoomPublicKey:zoomPublicKey
                                                zoomAuthURL:zoomAuthURL
                                                 zoomClient:zoomClient
                                                accessToken:accessToken
                                               configHeader:configHeader];
            
            ConfigUI *configUI;
            configUI =  [[ConfigUI alloc] initWithJsonString: ui];

            [TrueID configureWithConfigInfo:configInfo configUI: configUI];
        }
        else {
            [self showAlert:@"trueID doesn't support iOS less than 12"];
        }
    });
}

RCT_EXPORT_METHOD(start:(RCTResponseSenderBlock)callback) {
    dispatch_async(dispatch_get_main_queue(), ^{
        if (@available(iOS 12, *)) {
            [TrueID startWithListener:^(VerificationResult * _Nonnull verificationResult) {
                if (callback) {
                    NSMutableDictionary *res = [NSMutableDictionary new];
                    
                    res[@"code"] = verificationResult.code;
                    res[@"errorMessage"] = verificationResult.errorMessage;
                    if([verificationResult.code intValue] == 1){
                        res[@"clientId"] = verificationResult.clientId;
                        res[@"requestId"] = verificationResult.requestId;
                    
                        if(verificationResult.livenessCheck != nil){
                            res[@"livenessCheck"] = [NSNumber numberWithBool:verificationResult.livenessCheck] ;

                        }
                        if(verificationResult.decision != nil) {
                            res[@"decision"] =  @{
                                @"code" : verificationResult.decision.code,
                                @"decision" : verificationResult.decision.decision
                            };//verificationResult.decision;
                        }
                       

                       
                        
                    if(verificationResult.idInfo != nil) {
                        res[@"idInfo"] =  @{
                            @"idNumber" : verificationResult.idInfo.idNumber,
                            @"gender" : verificationResult.idInfo.gender,
                            @"dob": verificationResult.idInfo.dob,
                            @"fullname" : verificationResult.idInfo.fullname,
                            @"address" : verificationResult.idInfo.address,
                            @"doi" : verificationResult.idInfo.doi,
                            @"givenPlace" : verificationResult.idInfo.givenPlace,
                            @"origin" : verificationResult.idInfo.origin,
                           @"dueDate": verificationResult.idInfo.dueDate,
                            @"idType" : [NSNumber numberWithInteger:verificationResult.idInfo.idTypeCode],
                            @"qrcode" : verificationResult.idInfo.qrcode,

                          @"idOriginWard" : @{
                                @"value":  verificationResult.idInfo.idOriginWard.value,
                                @"code": verificationResult.idInfo.idOriginWard.code
                                },
                             @"idAddressProvince" : @{
                                @"value":  verificationResult.idInfo.idAddressProvince.value,
                                @"code": verificationResult.idInfo.idAddressProvince.code
                                },
                             @"idOriginDistrict" : @{
                                @"value":  verificationResult.idInfo.idOriginDistrict.value,
                                @"code": verificationResult.idInfo.idOriginDistrict.code
                                },
                             @"idAddressWard" : @{
                                @"value":  verificationResult.idInfo.idAddressWard.value,
                                @"code": verificationResult.idInfo.idAddressWard.code
                                },
                             @"idOriginProvince" : @{
                                @"value":  verificationResult.idInfo.idOriginProvince.value,
                                @"code": verificationResult.idInfo.idOriginProvince.code
                                },
                             @"idAddressDistrict" : @{
                                @"value":  verificationResult.idInfo.idAddressDistrict.value,
                                @"code": verificationResult.idInfo.idAddressDistrict.code
                                }

                        };// verificationResult.idInfo;
                    }
                    if(verificationResult.nfcInfo != nil) {
                            res[@"nfcInfo"] =  @{
                                    @"idNumber" : verificationResult.nfcInfo.idNumber,
                                    @"gender" : verificationResult.nfcInfo.gender,
                                    @"dob": verificationResult.nfcInfo.dob,
                                    @"fullname" : verificationResult.nfcInfo.fullname,
                                    @"dueDate": verificationResult.nfcInfo.dueDate,
                                    @"mrz" : verificationResult.nfcInfo.mrz,
                                     @"photo" : verificationResult.nfcInfo.photo
                                };// verificationResult.idInfo;

                    }
                        
                        if(verificationResult.nfcStatus != nil){
                            res[@"nfcStatus"] = [NSNumber numberWithInt:verificationResult.nfcStatus] ;

                        }

                    if(verificationResult.nfcRarInfo != nil) {
                            res[@"nfcInfo"] = @{
                                
                                    @"faceImage" : verificationResult.nfcRarInfo.faceImage,
                                    @"cardNumber" : verificationResult.nfcRarInfo.cardNumber,
                                    @"dateOfBirth": verificationResult.nfcRarInfo.dateOfBirth,
                                    @"issueDate" : verificationResult.nfcRarInfo.issueDate,
                                    @"previousNumber": verificationResult.nfcRarInfo.previousNumber,
                                    @"name" : verificationResult.nfcRarInfo.name,
                                    @"sex" : verificationResult.nfcRarInfo.sex,
                                     @"nationality" : verificationResult.nfcRarInfo.nationality,
                                    @"nation" : verificationResult.nfcRarInfo.nation,
                                    @"religion": verificationResult.nfcRarInfo.religion,
                                    @"hometown" : verificationResult.nfcRarInfo.hometown,
                                    @"address": verificationResult.nfcRarInfo.address,
                                    @"character" : verificationResult.nfcRarInfo.character,
                                     @"expiredDate" : verificationResult.nfcRarInfo.expiredDate,
                                    @"fatherName" : verificationResult.nfcRarInfo.fatherName,
                                    @"motherName": verificationResult.nfcRarInfo.motherName,
                                    //@"partnerName": verificationResult.nfcRarInfo.partnerName,
                                    @"mrz" : verificationResult.nfcRarInfo.mrz
                                };
                        }

                    if(verificationResult.rawImage != nil)
                    {
                        res[@"rawImage"] = @{
                            @"front":verificationResult.rawImage.front == nil ? @"" : verificationResult.rawImage.front,
                            @"back":verificationResult.rawImage.back == nil ? @"" : verificationResult.rawImage.back,
                            @"selfie":verificationResult.rawImage.selfie == nil ? @"" : verificationResult.rawImage.selfie,
                        };
                    }
                    if(verificationResult.faceMatching != nil) {
                        res[@"faceMatching"] =  verificationResult.faceMatching.stringValue;
                    }
                    
                    
                    
                    res[@"ekycResult"] = verificationResult.ekycResult;
                    }
                   
                  
                   
                    callback(@[res]);
                }
            }];
        }
        else {
            [self showAlert:@"trueID doesn't support iOS less than 11"];
        }
    });
}

RCT_EXPORT_METHOD(startNFC:(NSString *)idnumber
                  dob:(NSString *)dob
                  doe:(NSString *)doe
                  callback:(RCTResponseSenderBlock)callback)
{
    dispatch_async(dispatch_get_main_queue(), ^{
        if (@available(iOS 11, *)) {
            [TrueID startNFCC06WithIdnumber:idnumber 
                                        dob:dob
                                        doe:doe
                                listenerNFC:^(NfcResult * _Nonnull nfcResult) {
                if (callback) {
                    NSMutableDictionary *res = [NSMutableDictionary new];
                    
                    res[@"code"] = nfcResult.code;
                    res[@"errorMessage"] = nfcResult.errorMessage;

                    if(nfcResult.nfcInfo != nil) {
                            res[@"nfcInfo"] = @{
                                    @"faceImage" : nfcResult.nfcInfo.faceImage,
                                    @"cardNumber" : nfcResult.nfcInfo.cardNumber,
                                    @"dateOfBirth": nfcResult.nfcInfo.dateOfBirth,
                                    @"issueDate" : nfcResult.nfcInfo.issueDate,
                                    @"previousNumber": nfcResult.nfcInfo.previousNumber,
                                    @"name" : nfcResult.nfcInfo.name,
                                    @"sex" : nfcResult.nfcInfo.sex,
                                    @"nationality" : nfcResult.nfcInfo.nationality,
                                    @"nation" : nfcResult.nfcInfo.nation,
                                    @"religion": nfcResult.nfcInfo.religion,
                                    @"hometown" : nfcResult.nfcInfo.hometown,
                                    @"address": nfcResult.nfcInfo.address,
                                    @"character" : nfcResult.nfcInfo.character,
                                    @"expiredDate" : nfcResult.nfcInfo.expiredDate,
                                    @"fatherName" : nfcResult.nfcInfo.fatherName,
                                    @"motherName": nfcResult.nfcInfo.motherName,
                                   // @"partnerName": nfcResult.nfcInfo.partnerName,
                                    @"mrz" : nfcResult.nfcInfo.mrz
                                };
                        }
                    callback(@[res]);
                }
            }];
          
        }
        else {
            [self showAlert:@"trueID doesn't support iOS less than 11"];
        }
    });
}

RCT_EXPORT_METHOD(startNFCNoExtract:(NSString *)idnumber
                  dob:(NSString *)dob
                  doe:(NSString *)doe
                  callback:(RCTResponseSenderBlock)callback)
{
    dispatch_async(dispatch_get_main_queue(), ^{
        if (@available(iOS 11, *)) {
            [TrueID startNFCNoExtractWithIdnumber:idnumber
                                              dob:dob
                                              doe:doe
                             listenerNFCNoExtract:^(NfcResultNoExtract * _Nonnull nfcResult) {
                if (callback) {
                    NSMutableDictionary *res = [NSMutableDictionary new];
                    
                    res[@"code"] = nfcResult.code;
                    res[@"errorMessage"] = nfcResult.errorMessage;
                    res[@"nfcInfo"] = nfcResult.nfcData ? : @"";
                    
                    callback(@[res]);
                }
            }];
          
        }
        else {
            [self showAlert:@"trueID doesn't support iOS less than 11"];
        }
    });
}

RCT_EXPORT_BLOCKING_SYNCHRONOUS_METHOD(requestId) {
    return [TrueID requestId];
}
    

RCT_EXPORT_METHOD(setLanguage:(NSDictionary*)data) {
NSString *language = [data objectForKey:@"language"];
 [TrueID setLanguageWithLanguage: language];
}

- (void)showAlert:(NSString*)message {
    UIViewController *root = [UIApplication sharedApplication].delegate.window.rootViewController;
    if (root) {
        UIAlertController *alert = [UIAlertController alertControllerWithTitle:@"trueID" message:message preferredStyle:UIAlertControllerStyleAlert];
        [alert addAction:[UIAlertAction actionWithTitle:@"OK" style:UIAlertActionStyleCancel handler:nil]];
        
        [root presentViewController:alert animated:YES completion:nil];
    }
}

@end

package vng.trueidsdk;

import android.app.AlertDialog;
import android.content.DialogInterface;
import android.os.Build;
import android.util.Log;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableMap;

import vng.com.vn.trueid.TrueID;
import vng.com.vn.trueid.models.ConfigEndPoint;
import vng.com.vn.trueid.models.ConfigInfo;

public class TrueIdModule extends ReactContextBaseJavaModule {

    private final ReactApplicationContext reactContext;

    public TrueIdModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
    }

    @Override
    public String getName() {
        return "TrueId";
    }

    @ReactMethod
    public void setLanguage(ReadableMap data) {
        String language = data.getString("language");
        if (null != language)
            TrueID.setLanguage(getCurrentActivity(), language);
    }

    @ReactMethod
    public void configure(ReadableMap data) {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
            ConfigEndPoint configEndPoint = new ConfigEndPoint(data.getString("domain"));
            configEndPoint.setAccesstoken(data.getMap("configEndPoint").getString("accesstoken"));
            configEndPoint.setBack(data.getMap("configEndPoint").getString("back"));
            configEndPoint.setComplete(data.getMap("configEndPoint").getString("complete"));
            configEndPoint.setCreaterequest(data.getMap("configEndPoint").getString("createrequest"));
            configEndPoint.setFront(data.getMap("configEndPoint").getString("front"));
            configEndPoint.setNfcbshield(data.getMap("configEndPoint").getString("nfcbshield"));
            configEndPoint.setNfcqrverify(data.getMap("configEndPoint").getString("nfcqrverify"));
            configEndPoint.setNfcrar(data.getMap("configEndPoint").getString("nfcqrverify"));
            configEndPoint.setOcr(data.getMap("configEndPoint").getString("ocr"));
            configEndPoint.setSelfie(data.getMap("configEndPoint").getString("selfie"));

            ConfigInfo configInfo = new ConfigInfo(data.getString("domain"),
                    data.getString("appId"),
                    data.getString("appSecret"),
                    data.getString("zoomLicenseKey"),
                    data.getString("zoomPublicKey"),
                    data.getString("zoomServerBaseURL"),
                    data.getString("appId"),
                    configEndPoint
            );

            Log.e("trueid","configUI : "+data.getString("configUI"));

            TrueID.configure(getCurrentActivity(), configInfo, data.getString("configUI"), data.getString("accessToken"));

            String language = data.getString("language");
            if (null != language)
                TrueID.setLanguage(getCurrentActivity(), language);
        } else {
            this.showAlert("trueID doesn't support Android less than 6");
        }
    }

    @ReactMethod
    public void start(final Callback callback) {
        TrueID.start(getCurrentActivity(), cardInfo -> {
            if (callback != null) {
                WritableMap returnMap = kUtils.convertMapToWritableMap(cardInfo.toMap());
                callback.invoke(returnMap);
            }
        });
    }

    @ReactMethod
    public void startNFCNoExtract(String id,String dob,String doe,final Callback callback) {
        TrueID.startNFCNoExtract(getCurrentActivity(),id,dob,doe, cardInfo -> {
            if (callback != null) {
                WritableMap returnMap = kUtils.convertMapToWritableMap(cardInfo.toMap());
                callback.invoke(returnMap);
            }
        });
    }

    @ReactMethod
    public void startNFC(String id,String dob,String doe,final Callback callback) {
        TrueID.startNFCC06(getCurrentActivity(),id,dob,doe, cardInfo -> {
            if (callback != null) {
                WritableMap returnMap = kUtils.convertMapToWritableMap(cardInfo.toMap());
                callback.invoke(returnMap);
            }
        });
    }

    private void showAlert(String message) {
        AlertDialog.Builder builder = new AlertDialog.Builder(getCurrentActivity());
        builder.setTitle("trueID");
        builder.setMessage(message);
        builder.setPositiveButton("OK", new DialogInterface.OnClickListener() {
            @Override
            public void onClick(DialogInterface dialogInterface, int i) {
                dialogInterface.cancel();
            }
        });

        AlertDialog alert = builder.create();
        alert.show();
    }
}

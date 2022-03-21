package com.example.rollingdicegame;

import android.content.Context;
import android.webkit.JavascriptInterface;
import android.widget.Toast;

public class WebAppInterface {
    int score;
    Context mContext;
    public WebAppInterface(Context c) {
        mContext = c;
        this.score = 0;
    }

    public int getScore() {
        return score;
    }

    @JavascriptInterface
    public int getscore(int score){
        this.score = score;
        return score;
    }

    @JavascriptInterface
    public void receiveValueFromJs(String str) {
    //do something useful with str
        Toast.makeText(mContext, "Received Value from JS: " + str,Toast.LENGTH_SHORT).show();
        Toast.makeText(mContext, "Received Value from JS: ",Toast.LENGTH_SHORT).show();
    }
}

package com.example.rollingdicegame;

import androidx.appcompat.app.AlertDialog;
import androidx.appcompat.app.AppCompatActivity;

import android.content.DialogInterface;
import android.os.Bundle;
import android.view.View;
import android.webkit.JsResult;
import android.webkit.ValueCallback;
import android.webkit.WebChromeClient;
import android.webkit.WebView;
import android.widget.Button;
import android.widget.TextView;
import android.widget.Toast;

public class MainActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        WebView mywebview = findViewById(R.id.webView);
        mywebview.getSettings().setJavaScriptEnabled(true);
        mywebview.loadUrl("file:///android_asset/main.html");

        mywebview.addJavascriptInterface(new WebAppInterface(this),"App");

        TextView score_text_view = findViewById(R.id.score_display);
        Button score_display = findViewById(R.id.score_display);

        score_display.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                //mywebview.loadUrl("javascript:sendScore();");

                // JS method calls must be made on a separate thread (otherwise they cannot be called)
                mywebview.post(new Runnable() {
                    @Override
                    public void run() {
                        mywebview.loadUrl("javascript:sendScore();");
                        //Toast.makeText(MainActivity.this,"Acess: Denied",Toast.LENGTH_SHORT).show();
                    }
                });
            }
        });

/*        mywebview.setWebChromeClient(new WebChromeClient(){
            public boolean onJsAlert(WebView view, String url, String message, final JsResult result) {
                AlertDialog dialog = new AlertDialog.Builder(view.getContext()).
                        setTitle("Wrong number of dice!").
                        setMessage(message).
                        setPositiveButton("OK", new DialogInterface.OnClickListener() {
                            public void onClick(DialogInterface dialog, int which) {

                            }
                        }).create();
                dialog.show();
                result.confirm();
                return true;
            }
        });*/
    }
}
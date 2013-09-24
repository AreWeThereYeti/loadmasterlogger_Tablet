package dk.pyemus.wakeup;

import android.os.Bundle;
import android.os.PowerManager;
import android.app.Activity;
import android.content.Context;
import android.view.View;
import android.widget.Button;
import android.widget.Toast;

public class MainActivity extends Activity {

	PowerManager.WakeLock wl;
	@Override
	protected void onCreate(Bundle savedInstanceState) {
		PowerManager pm = (PowerManager) getSystemService(Context.POWER_SERVICE);
		wl = pm.newWakeLock(PowerManager.SCREEN_DIM_WAKE_LOCK
						  | PowerManager.ON_AFTER_RELEASE, "wakelock___123");
		wl.acquire();
		// ... do work...
		//wl.release();
		}
	}
}
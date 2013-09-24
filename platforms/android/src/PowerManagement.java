import android.os.Bundle;
import android.os.PowerManager;
import android.app.Activity;
import android.content.Context;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.Toast;

public class PowerManagement extends Activity {

	PowerManager.WakeLock wl;
	public void onPower() {
		PowerManager pm = (PowerManager) getSystemService(Context.POWER_SERVICE);
		wl = pm.newWakeLock(PowerManager.FULL_WAKE_LOCK
						  | PowerManager.ON_AFTER_RELEASE, "wakelock___123");
		wl.acquire();
		// ... do work...
		//wl.release();
		Log.d("Wakelog", "It woooorks");
	}
}
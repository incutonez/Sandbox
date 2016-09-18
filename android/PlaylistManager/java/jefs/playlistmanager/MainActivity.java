package jefs.playlistmanager;

import android.Manifest;
import android.content.ContentResolver;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.database.Cursor;
import android.net.Uri;
import android.provider.MediaStore;
import android.support.v4.app.ActivityCompat;
import android.support.v4.content.ContextCompat;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.AdapterView;
import android.widget.ListView;

public class MainActivity extends AppCompatActivity {
    private static final String LOGGING_TAG = "PlaylistManager";
    final private int REQUEST_CODE_ASK_PERMISSIONS = 123;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        readPlaylists();
    }

    public void readPlaylists() {
        int hasReadExtStorage = ContextCompat.checkSelfPermission(this, Manifest.permission.READ_EXTERNAL_STORAGE);
        if (hasReadExtStorage != PackageManager.PERMISSION_GRANTED) {
            ActivityCompat.requestPermissions(this, new String[] {Manifest.permission.READ_EXTERNAL_STORAGE}, REQUEST_CODE_ASK_PERMISSIONS);
            return;
        }

        // Get a cursor over all playlists.
        final ContentResolver resolver = this.getContentResolver();
        final Uri uri = MediaStore.Audio.Playlists.EXTERNAL_CONTENT_URI;
        final String idKey = MediaStore.Audio.Playlists._ID;
        final String nameKey = MediaStore.Audio.Playlists.NAME;
        final String countKey = MediaStore.Audio.Playlists._COUNT;
        final String[] columns = { idKey, nameKey };
        final Cursor playLists = resolver.query(uri, columns, null, null, null);
        if (playLists == null) {
            Log.e(LOGGING_TAG, "Found no playlists.");
            return;
        }

        // Log a list of the playlists.
        Log.i(LOGGING_TAG, "Playlists:");
        MyCursor playlistAdapter = new MyCursor(this, playLists);
        ListView playlistView = (ListView) findViewById(R.id.playlistsGrid);
        playlistView.setAdapter(playlistAdapter);
        playlistView.setOnItemClickListener(new AdapterView.OnItemClickListener() {
            @Override
            public void onItemClick(AdapterView<?> parent, View view, int position, long id) {
                Cursor item = (Cursor) parent.getItemAtPosition(position);
                int playListID = Integer.parseInt(item.getString(item.getColumnIndex(idKey)));
                showPlaylistSongActivity(playListID);
            }
        });
    }

    public void showPlaylistSongActivity(int playlistId) {
        Intent intent = new Intent(this, PlaylistSongActivity.class);
        intent.putExtra("playlistId", playlistId);
        startActivity(intent);
    }
}

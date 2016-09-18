package jefs.playlistmanager;

import android.content.ContentResolver;
import android.content.Intent;
import android.database.Cursor;
import android.net.Uri;
import android.provider.MediaStore;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.widget.ListView;

public class PlaylistSongActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_playlist);
        final ContentResolver resolver = this.getContentResolver();
        Intent intent = getIntent();
        // grab the ID that was passed from our Main view
        int playlistId = intent.getExtras().getInt("playlistId");
        Uri playlistUri = MediaStore.Audio.Playlists.Members.getContentUri("external", playlistId);
        // An ID column is required
        final String[] songColumns = {MediaStore.Audio.AudioColumns._ID, MediaStore.Audio.AudioColumns.ARTIST, MediaStore.Audio.AudioColumns.TITLE};
        final Cursor playlistSongs = resolver.query(playlistUri, songColumns, null, null, null);
        setContentView(R.layout.activity_playlist);

        ListView playlistSongsView = (ListView) findViewById((R.id.playlistItems));
        PlaylistSongCursor playlistSongsAdapter = new PlaylistSongCursor(playlistSongsView.getContext(), playlistSongs);
        playlistSongsView.setAdapter((playlistSongsAdapter));
    }
}

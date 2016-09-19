package jefs.playlistmanager;

import android.content.ContentResolver;
import android.content.Intent;
import android.database.Cursor;
import android.net.Uri;
import android.provider.MediaStore;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.util.Log;
import android.view.View;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.ListView;
import android.widget.Spinner;

import java.util.List;

public class PlaylistSongActivity extends AppCompatActivity {
    final String SONG_ID_KEY  = MediaStore.Audio.AudioColumns._ID;
    final String SONG_ARTIST_KEY  = MediaStore.Audio.AudioColumns.ARTIST;
    final String SONG_ALBUM_KEY = MediaStore.Audio.AudioColumns.ALBUM;
    final String SONG_TITLE_KEY  = MediaStore.Audio.AudioColumns.TITLE;
    final String SONG_TRACK_NO_KEY = MediaStore.Audio.AudioColumns.TRACK;
    final String CASE_INSENTIVE = " COLLATE NOCASE ";
    final String[] PLAYLIST_QUERY_COLUMNS = {SONG_ID_KEY, SONG_ARTIST_KEY, SONG_TITLE_KEY, SONG_ALBUM_KEY, SONG_TRACK_NO_KEY};

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_playlist);
        // Spinner values
        final Spinner playlistSettingsDropdown = (Spinner) findViewById(R.id.playlistSettingsDropdown);
        ArrayAdapter<CharSequence> adapter = ArrayAdapter.createFromResource(this, R.array.playlist_settings_array, android.R.layout.simple_spinner_item);
        adapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
        playlistSettingsDropdown.setAdapter(adapter);
        playlistSettingsDropdown.setOnItemSelectedListener(new AdapterView.OnItemSelectedListener() {
            public void onItemSelected(AdapterView<?> parent, View view, int pos, long id) {
                sortGrid(pos);
            }

            public void setId(int pos) {
                playlistSettingsDropdown.setSelection(pos);
            }

            public void onNothingSelected(AdapterView<?> parent) {
                // Another interface callback
            }
        });

        // Song grid
        ListView playlistSongsView = getSongGrid();
        final Cursor playlistSongs = createPlaylistCursor(null);
        PlaylistSongCursor playlistSongsAdapter = new PlaylistSongCursor(playlistSongsView.getContext(), playlistSongs);
        playlistSongsView.setAdapter((playlistSongsAdapter));
    }

    public void sortGrid(int sortType) {
        ListView songGrid = getSongGrid();
        PlaylistSongCursor songGridAdapter = (PlaylistSongCursor) songGrid.getAdapter();
        String sort = SONG_ARTIST_KEY + CASE_INSENTIVE + " ASC," +
                SONG_ALBUM_KEY + CASE_INSENTIVE + " ASC," +
                SONG_TRACK_NO_KEY + " ASC";
        switch (sortType) {
            case 1:
                sort = SONG_ARTIST_KEY + CASE_INSENTIVE + " DESC," +
                        SONG_ALBUM_KEY + CASE_INSENTIVE + " DESC," +
                        SONG_TRACK_NO_KEY + " DESC";
        }
        songGridAdapter.changeCursor(createPlaylistCursor(sort));
    }

    public ListView getSongGrid() {
        return (ListView) findViewById((R.id.playlistItems));
    }

    public Uri getPlaylistUri() {
        int playlistId = getIntent().getExtras().getInt("playlistId");
        return MediaStore.Audio.Playlists.Members.getContentUri("external", playlistId);
    }

    public Cursor createPlaylistCursor(String sort) {
        return getContentResolver().query(getPlaylistUri(), PLAYLIST_QUERY_COLUMNS, null, null, sort);
    }
}

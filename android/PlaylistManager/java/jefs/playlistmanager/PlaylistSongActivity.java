package jefs.playlistmanager;

import android.content.ContentResolver;
import android.content.ContentValues;
import android.database.Cursor;
import android.database.DatabaseUtils;
import android.net.Uri;
import android.provider.MediaStore;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.util.Log;
import android.view.View;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.ListView;
import android.widget.Spinner;

import java.util.ArrayList;

public class PlaylistSongActivity extends AppCompatActivity {
    final String SONG_ID_KEY  = MediaStore.Audio.AudioColumns._ID;
    final String SONG_ARTIST_KEY  = MediaStore.Audio.AudioColumns.ARTIST;
    final String SONG_ALBUM_KEY = MediaStore.Audio.AudioColumns.ALBUM;
    final String SONG_TITLE_KEY  = MediaStore.Audio.AudioColumns.TITLE;
    final String SONG_TRACK_NO_KEY = MediaStore.Audio.AudioColumns.TRACK;
    final String DEFAULT_SORT_KEY = MediaStore.Audio.Playlists.Members.DEFAULT_SORT_ORDER;
    final String PLAYLIST_ID_KEY = MediaStore.Audio.Playlists.Members.PLAYLIST_ID;
    final String AUDIO_ID_KEY = MediaStore.Audio.Playlists.Members.AUDIO_ID;
    final String PLAY_ORDER_KEY = MediaStore.Audio.Playlists.Members.PLAY_ORDER;
    final String DATE_ADDED_KEY = MediaStore.Audio.Playlists.Members.DATE_ADDED;
    final String DATE_MODIFIED_KEY = MediaStore.Audio.Playlists.Members.DATE_MODIFIED;
    final String CASE_INSENSITIVE = " COLLATE NOCASE ";
    final String[] PLAYLIST_QUERY_COLUMNS = {DATE_MODIFIED_KEY, AUDIO_ID_KEY, PLAYLIST_ID_KEY, DEFAULT_SORT_KEY, SONG_ID_KEY, SONG_ARTIST_KEY, SONG_TITLE_KEY, SONG_ALBUM_KEY, SONG_TRACK_NO_KEY};
    String sort;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_playlist);
        Log.d("BLAH", getPlaylistUri().getPath());
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
        if (playlistSongs != null) {
            playlistSongs.moveToFirst();
            PlaylistSongCursor playlistSongsAdapter = new PlaylistSongCursor(playlistSongsView.getContext(), playlistSongs);
            playlistSongsView.setAdapter((playlistSongsAdapter));
        }
        getSaveButton().setOnClickListener(new AdapterView.OnClickListener() {
            public void onClick(View view) {
                Cursor myCursor = createPlaylistCursor(sort);
                int i = 0;
                if(myCursor.moveToFirst()) {
                    Uri playListUri = getPlaylistUri();
                    ContentValues[] values = new ContentValues[myCursor.getCount()];
                    ContentResolver contentResolver = getContentResolver();
                    do {
                        ContentValues map = new ContentValues();
                        map.put(PLAY_ORDER_KEY, Long.valueOf(i + 1));
                        map.put(AUDIO_ID_KEY, myCursor.getInt(myCursor.getColumnIndexOrThrow(AUDIO_ID_KEY)));
                        values[i++] = map;
                    } while(myCursor.moveToNext());
                    contentResolver.delete(playListUri, null, null);
                    contentResolver.bulkInsert(playListUri, values);
                    Log.d("BLA", "done");
                }
            }
        });
    }

    public void sortGrid(int sortType) {
        ListView songGrid = getSongGrid();
        PlaylistSongCursor songGridAdapter = (PlaylistSongCursor) songGrid.getAdapter();
        switch (sortType) {
            case 1:
                sort = SONG_ARTIST_KEY + CASE_INSENSITIVE + "ASC, " +
                        SONG_ALBUM_KEY + CASE_INSENSITIVE + "ASC, " +
                        SONG_TRACK_NO_KEY + " ASC";
                break;
            default:
                sort = SONG_ARTIST_KEY + CASE_INSENSITIVE + "DESC, " +
                        SONG_ALBUM_KEY + CASE_INSENSITIVE + "DESC, " +
                        SONG_TRACK_NO_KEY + " DESC";
                break;
        }
        songGridAdapter.changeCursor(createPlaylistCursor(sort));
    }

    public Button getSaveButton() {
        return (Button) findViewById(R.id.saveButton);
    }

    public ListView getSongGrid() {
        return (ListView) findViewById((R.id.playlistItems));
    }

    public int getPlaylistId() {
        return getIntent().getExtras().getInt("playlistId");
    }

    public Uri getPlaylistUri() {
        return MediaStore.Audio.Playlists.Members.getContentUri("external", getPlaylistId());
    }

    public Cursor createPlaylistCursor(String sort) {
        return getContentResolver().query(getPlaylistUri(), null, null, null, sort);
    }
}

package jefs.playlistmanager;

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
    final String CASE_INSENSITIVE = " COLLATE NOCASE ";
    final String[] PLAYLIST_QUERY_COLUMNS = {DEFAULT_SORT_KEY, SONG_ID_KEY, SONG_ARTIST_KEY, SONG_TITLE_KEY, SONG_ALBUM_KEY, SONG_TRACK_NO_KEY};
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
        PlaylistSongCursor playlistSongsAdapter = new PlaylistSongCursor(playlistSongsView.getContext(), playlistSongs);
        playlistSongsView.setAdapter((playlistSongsAdapter));
    }

    public void sortGrid(int sortType) {
        ListView songGrid = getSongGrid();
        PlaylistSongCursor songGridAdapter = (PlaylistSongCursor) songGrid.getAdapter();
        Cursor currentCursor = songGridAdapter.getCursor();
        sort = currentCursor.getString(currentCursor.getColumnIndexOrThrow(DEFAULT_SORT_KEY));
        Log.d("BLAH", sort);
        switch (sortType) {
            case 1:
                sort = SONG_ARTIST_KEY + CASE_INSENSITIVE + "ASC, " +
                        SONG_ALBUM_KEY + CASE_INSENSITIVE + "ASC, " +
                        SONG_TRACK_NO_KEY + " ASC";
                break;
            case 2:
                sort = SONG_ARTIST_KEY + CASE_INSENSITIVE + "DESC, " +
                        SONG_ALBUM_KEY + CASE_INSENSITIVE + "DESC, " +
                        SONG_TRACK_NO_KEY + " DESC";
                break;
        }
        songGridAdapter.changeCursor(createPlaylistCursor(sort));
    }

    public void onClickSaveButton(View view) {
        ListView songGrid = getSongGrid();
        PlaylistSongCursor songGridAdapter = (PlaylistSongCursor) songGrid.getAdapter();
        Cursor myCursor = songGridAdapter.getCursor();
        ContentValues[] retVal = new ContentValues[myCursor.getCount()];
        int i = 0;
        if(myCursor.moveToFirst()) {
            do {
                ContentValues map = new ContentValues();
                DatabaseUtils.cursorRowToContentValues(myCursor, map);
                retVal[i++] = map;
            } while(myCursor.moveToNext());
        }
        // Empties db
        getContentResolver().delete(getPlaylistUri(), null, null);
        // Logs 2 (as that's how many items are in my list)
        Log.d("BLA", String.valueOf(retVal.length));
        /* Threw an error once saying:
         * Uncaught remote exception!  (Exceptions are not yet supported across processes.)
         * java.lang.ClassCastException: java.lang.String cannot be cast to java.lang.Number */
        final int retInt = getContentResolver().bulkInsert(getPlaylistUri(), retVal);
        // Logs 0
        Log.d("DONE", String.valueOf(retInt));
    }

    // doesn't persist to other apps
    public void onClickSaveButton2(View view) {
        //Create empty values
        ContentValues values= new ContentValues();
        Log.d("BLAH", sort);
        //put all you want to update
        values.put(DEFAULT_SORT_KEY, sort);
        //call update method on ContentResolver
        int rows = getContentResolver().update(
                getPlaylistUri(), //uri to modify
                values, //new values for
                PLAYLIST_ID_KEY + "=?", //selection clause
                new String[] {String.valueOf(getPlaylistId())} //selection args
        );
        Log.d("BLA", String.valueOf(rows));
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

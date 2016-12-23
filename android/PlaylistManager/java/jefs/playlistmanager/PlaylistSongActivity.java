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
import android.widget.TextView;
import com.maxmpz.poweramp.player.PowerampAPI;

import java.util.ArrayList;

public class PlaylistSongActivity extends AppCompatActivity {
    final String SONG_ID_KEY  = "folder_files._id";
    final String SONG_ARTIST_KEY  = "artists.artist";
    final String SONG_ALBUM_KEY = "albums.album";
    final String SONG_TITLE_KEY  = "folder_files.name";
    final String SONG_TRACK_NO_KEY = "folder_files.track_number";
    final String DEFAULT_SORT_KEY = MediaStore.Audio.Playlists.Members.DEFAULT_SORT_ORDER;
    final String PLAYLIST_ID_KEY = "folder_playlists._id";
    final String AUDIO_ID_KEY = MediaStore.Audio.Playlists.Members.AUDIO_ID;
    final String PLAY_ORDER_KEY = MediaStore.Audio.Playlists.Members.PLAY_ORDER;
    final String DATE_ADDED_KEY = MediaStore.Audio.Playlists.Members.DATE_ADDED;
    final String DATE_MODIFIED_KEY = MediaStore.Audio.Playlists.Members.DATE_MODIFIED;
    final String CASE_INSENSITIVE = " COLLATE NOCASE ";
    final String[] columns = { SONG_ID_KEY, SONG_TITLE_KEY, SONG_ARTIST_KEY, SONG_ALBUM_KEY, SONG_TRACK_NO_KEY };
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
        Log.d("BLAH", "DONE");
        TextView playlistCount = (TextView) findViewById(R.id.playlistCount);
        if (playlistSongs != null) {
            if (playlistCount != null) {
                playlistCount.append(Integer.toString(playlistSongs.getCount()));
            }
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
                    ContentResolver contentResolver = getContentResolver();
                    ContentValues map;
                    do {
                        map = new ContentValues();
                        map.put("sort", i++);
                        // The table this updates is folder_playlist_entries and folder_file_id is the folder_files._id (SONG_ID_KEY) for that song
                        // playlistUri = Uri.parse("content://com.maxmpz.audioplayer.data/playlists/" + Long.toString(getPlaylistId()) + "/files");
                        contentResolver.update(playListUri, map, "folder_file_id=" + myCursor.getInt(myCursor.getColumnIndexOrThrow(SONG_ID_KEY)), null);
                    } while(myCursor.moveToNext());
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
        return Uri.parse("content://com.maxmpz.audioplayer.data/playlists/" + Long.toString(getPlaylistId()) + "/files");
//        return PowerampAPI.ROOT_URI.buildUpon().appendEncodedPath("playlists").appendEncodedPath(Long.toString(getPlaylistId())).build();
//        return MediaStore.Audio.Playlists.Members.getContentUri("external", getPlaylistId());
    }

    // http://forum.powerampapp.com/index.php?/topic/4679-how-to-update-the-poweramp-playlist-in-android/
    public Cursor createPlaylistCursor(String sort) {
        Log.d("BLAH", getPlaylistUri().toString());
        return getContentResolver().query(getPlaylistUri(), columns, null, null, sort);
    }
}

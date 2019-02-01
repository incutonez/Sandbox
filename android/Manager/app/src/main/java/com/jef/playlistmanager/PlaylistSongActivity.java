package com.jef.playlistmanager;

import android.content.ContentProviderOperation;
import android.database.Cursor;
import android.net.Uri;
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
import java.util.ArrayList;

public class PlaylistSongActivity extends AppCompatActivity {
    final String SONG_ID_KEY  = "folder_files._id";
    final String SONG_ARTIST_KEY  = "artist";
    final String SONG_ALBUM_KEY = "album";
    final String SONG_TITLE_KEY  = "folder_files.name";
    final String SONG_TRACK_NO_KEY = "folder_files.track_number";
    final String CASE_INSENSITIVE = " COLLATE NOCASE ";
    final String[] columns = { SONG_ID_KEY, SONG_TITLE_KEY, SONG_ARTIST_KEY, SONG_ALBUM_KEY, SONG_TRACK_NO_KEY, "folder_files.shuffle_order", "playlist_id" };
    String sort;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_playlist);
        Log.d("BLAH", getPlaylistUri().getPath());
        // Spinner values
        final Spinner playlistSettingsDropdown = findViewById(R.id.playlistSettingsDropdown);
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
        TextView playlistCount = findViewById(R.id.playlistCount);
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
                Cursor songs = createPlaylistCursor(sort);
                if (songs.moveToFirst()) {
                    int i = 0;
                    Uri playListUri = getPlaylistUri();
                    // Update in bulk fashion https://stackoverflow.com/a/54471557/1253609
                    ArrayList<ContentProviderOperation> cs = new ArrayList<ContentProviderOperation>();
                    do {
                        cs.add(ContentProviderOperation.newUpdate(playListUri)
                                .withSelection("folder_file_id=" + songs.getInt(songs.getColumnIndexOrThrow("folder_files._id")), null)
                                .withValue("sort", i++)
                                .build());
                    } while (songs.moveToNext());
                    try {
                        getContentResolver().applyBatch("com.jef.playlistmanager", cs);
                    }
                    catch (Exception e) {

                    }
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
    }

    // http://forum.powerampapp.com/index.php?/topic/4679-how-to-update-the-poweramp-playlist-in-android/
    public Cursor createPlaylistCursor(String sort) {
        Log.d("BLAH", getPlaylistUri().toString());
        return getContentResolver().query(getPlaylistUri(), columns, null, null, sort);
    }
}

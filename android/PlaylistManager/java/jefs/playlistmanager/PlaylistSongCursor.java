package jefs.playlistmanager;

import android.content.Context;
import android.database.Cursor;
import android.provider.MediaStore;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.CursorAdapter;
import android.widget.TextView;

/**
 * Created by Jef on 9/18/2016.
 */
public class PlaylistSongCursor extends CursorAdapter {
    final String songNameKey = MediaStore.Audio.AudioColumns.TITLE;
    final String artistKey = MediaStore.Audio.AudioColumns.ARTIST;
    final String SONG_ALBUM_KEY = MediaStore.Audio.AudioColumns.ALBUM;

    public PlaylistSongCursor(Context context, Cursor cursor) {
        super(context, cursor, 0);
    }

    // The newView method is used to inflate a new view and return it,
    // you don't bind any data to the view at this point.
    @Override
    public View newView(Context context, Cursor cursor, ViewGroup parent) {
        return LayoutInflater.from(context).inflate(R.layout.activity_playlistrow, parent, false);
    }

    // The bindView method is used to bind all data to a given view
    // such as setting the text on a TextView.
    @Override
    public void bindView(View view, Context context, Cursor cursor) {
        // Find fields to populate in inflated template
        TextView songName = (TextView) view.findViewById(R.id.songName);
        TextView artistName = (TextView) view.findViewById(R.id.artistName);
        TextView albumName = (TextView) view.findViewById(R.id.albumName);
        // Extract properties from cursor
        String name = cursor.getString(cursor.getColumnIndexOrThrow(songNameKey));
        String artist = cursor.getString(cursor.getColumnIndexOrThrow(artistKey));
        String album = cursor.getString(cursor.getColumnIndexOrThrow(SONG_ALBUM_KEY));
        // Populate fields with extracted properties
        songName.setText(name);
        artistName.setText(artist);
        albumName.setText(album);
    }
}
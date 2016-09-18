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
public class MyCursor extends CursorAdapter {
    final String nameKey = MediaStore.Audio.Playlists.NAME;
//    final String countKey = MediaStore.Audio.Playlists._COUNT;

    public MyCursor(Context context, Cursor cursor) {
        super(context, cursor, 0);
    }

    // The newView method is used to inflate a new view and return it,
    // you don't bind any data to the view at this point.
    @Override
    public View newView(Context context, Cursor cursor, ViewGroup parent) {
        return LayoutInflater.from(context).inflate(R.layout.activity_main_playlistrow, parent, false);
    }

    // The bindView method is used to bind all data to a given view
    // such as setting the text on a TextView.
    @Override
    public void bindView(View view, Context context, Cursor cursor) {
        // Find fields to populate in inflated template
        TextView playlistName = (TextView) view.findViewById(R.id.playlistName);
//        TextView songCount = (TextView) view.findViewById(R.id.songCount);
        // Extract properties from cursor
        String name = cursor.getString(cursor.getColumnIndexOrThrow(nameKey));
        //int count = cursor.getInt(cursor.getColumnIndexOrThrow(countKey));
        // Populate fields with extracted properties
        playlistName.setText(name);
        //songCount.setText(String.valueOf(count));
    }
}
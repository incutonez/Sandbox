package com.jef.playlistmanager;

import android.content.Context;
import android.database.Cursor;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.CursorAdapter;
import android.widget.TextView;

/**
 * Created by Jef on 9/18/2016.
 */
public class MyCursor extends CursorAdapter {
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
        TextView playlistName = view.findViewById(R.id.playlistName);
        // Extract properties from cursor
        String name = cursor.getString(cursor.getColumnIndexOrThrow("playlist"));
        // Populate fields with extracted properties
        playlistName.setText(name);
    }
}
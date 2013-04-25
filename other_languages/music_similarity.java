//  Jef Harkay               CMSC 676 Final Project
//  December 2010
package desktopapplication1;

import java.io.IOException;
import java.util.logging.Level;
import java.util.logging.Logger;
import org.jdesktop.application.Action;
import org.jdesktop.application.ResourceMap;
import org.jdesktop.application.SingleFrameApplication;
import org.jdesktop.application.FrameView;
import org.jdesktop.application.TaskMonitor;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.io.File;
import java.io.FileWriter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.Map;
import javax.sound.sampled.*;
import javax.swing.Timer;
import javax.swing.Icon;
import javax.swing.JDialog;
import javax.swing.JFileChooser;
import javax.swing.JFrame;
import org.apache.commons.math.complex.Complex;
import org.apache.commons.math.transform.FastFourierTransformer;
import org.jfree.chart.ChartFactory;
import org.jfree.chart.ChartUtilities;
import org.jfree.chart.JFreeChart;
import org.jfree.chart.plot.PlotOrientation;
import org.jfree.data.statistics.HistogramDataset;
import org.jfree.data.statistics.HistogramType;

/**
 * The application's main frame.
 */
public class DesktopApplication1View extends FrameView {
    // Please excuse the global variables...
    // I've been doing a lot of bad Perl programming.
    static Clip clip = null;

    // LinkedList keeps track of all of the songs,
    // with most similar at the top.
    static LinkedList final_songs = new LinkedList();
    static HistogramDataset histogram = new HistogramDataset();

    // Hash map helps me store the differences
    // and corresponding names of the songs
    static Map hash = new HashMap();
    static String dir = "C:\\Users\\Jef\\Downloads\\wavshite22";

    // Sample size (22.05 kHz).
    static final int N = 22050;

    // Array of complex numbers for main song.
    static ArrayList<Complex[]> main_song = new ArrayList<Complex[]>();

    // Counter to access main's array of complex numbers.
    static int j = 0;

    // Total time of audio to process, so 30 seconds in this case.
    static int time = 30;

    // Window of 256 samples.
    static int window = 256;

    /* x is shifted to a power of 2 later on...
    / This is used primarily when dealing with the Fast Fourier Transform
    / function because the FFT only takes an array of doubles that's a power
    / of 2.
    */
    static int x = N;


    public DesktopApplication1View(SingleFrameApplication app) {
        super(app);

        initComponents();

        // status bar initialization - message timeout, idle icon and busy animation, etc
        ResourceMap resourceMap = getResourceMap();
        int messageTimeout = resourceMap.getInteger("StatusBar.messageTimeout");
        messageTimer = new Timer(messageTimeout, new ActionListener() {
            public void actionPerformed(ActionEvent e) {
                statusMessageLabel.setText("");
            }
        });
        messageTimer.setRepeats(false);
        int busyAnimationRate = resourceMap.getInteger("StatusBar.busyAnimationRate");
        for (int i = 0; i < busyIcons.length; i++) {
            busyIcons[i] = resourceMap.getIcon("StatusBar.busyIcons[" + i + "]");
        }
        busyIconTimer = new Timer(busyAnimationRate, new ActionListener() {
            public void actionPerformed(ActionEvent e) {
                busyIconIndex = (busyIconIndex + 1) % busyIcons.length;
                statusAnimationLabel.setIcon(busyIcons[busyIconIndex]);
            }
        });
        idleIcon = resourceMap.getIcon("StatusBar.idleIcon");
        statusAnimationLabel.setIcon(idleIcon);
        progressBar.setVisible(false);

        // connecting action tasks to status bar via TaskMonitor
        TaskMonitor taskMonitor = new TaskMonitor(getApplication().getContext());
        taskMonitor.addPropertyChangeListener(new java.beans.PropertyChangeListener() {
            public void propertyChange(java.beans.PropertyChangeEvent evt) {
                String propertyName = evt.getPropertyName();
                if ("started".equals(propertyName)) {
                    if (!busyIconTimer.isRunning()) {
                        statusAnimationLabel.setIcon(busyIcons[0]);
                        busyIconIndex = 0;
                        busyIconTimer.start();
                    }
                    progressBar.setVisible(true);
                    progressBar.setIndeterminate(true);
                } else if ("done".equals(propertyName)) {
                    busyIconTimer.stop();
                    statusAnimationLabel.setIcon(idleIcon);
                    progressBar.setVisible(false);
                    progressBar.setValue(0);
                } else if ("message".equals(propertyName)) {
                    String text = (String)(evt.getNewValue());
                    statusMessageLabel.setText((text == null) ? "" : text);
                    messageTimer.restart();
                } else if ("progress".equals(propertyName)) {
                    int value = (Integer)(evt.getNewValue());
                    progressBar.setVisible(true);
                    progressBar.setIndeterminate(false);
                    progressBar.setValue(value);
                }
            }
        });
    }

    @Action
    public void showAboutBox() {
        if (aboutBox == null) {
            JFrame mainFrame = DesktopApplication1.getApplication().getMainFrame();
            aboutBox = new DesktopApplication1AboutBox(mainFrame);
            aboutBox.setLocationRelativeTo(mainFrame);
        }
        DesktopApplication1.getApplication().show(aboutBox);
    }

    /** This method is called from within the constructor to
     * initialize the form.
     * WARNING: Do NOT modify this code. The content of this method is
     * always regenerated by the Form Editor.
     */
    @SuppressWarnings("unchecked")
    // <editor-fold defaultstate="collapsed" desc="Generated Code">//GEN-BEGIN:initComponents
    private void initComponents() {

        mainPanel = new javax.swing.JPanel();
        OpenMainSong = new javax.swing.JButton();
        songfield = new javax.swing.JTextField();
        PlayMainSong = new javax.swing.JButton();
        StopMainSong = new javax.swing.JButton();
        GetSimSongs = new javax.swing.JButton();
        blah = new javax.swing.JComboBox();
        PlayOtherSong = new javax.swing.JButton();
        StopOtherSong = new javax.swing.JButton();
        ClearAllSongs = new javax.swing.JButton();
        menuBar = new javax.swing.JMenuBar();
        javax.swing.JMenu fileMenu = new javax.swing.JMenu();
        javax.swing.JMenuItem exitMenuItem = new javax.swing.JMenuItem();
        javax.swing.JMenu helpMenu = new javax.swing.JMenu();
        javax.swing.JMenuItem aboutMenuItem = new javax.swing.JMenuItem();
        statusPanel = new javax.swing.JPanel();
        javax.swing.JSeparator statusPanelSeparator = new javax.swing.JSeparator();
        statusMessageLabel = new javax.swing.JLabel();
        statusAnimationLabel = new javax.swing.JLabel();
        progressBar = new javax.swing.JProgressBar();

        mainPanel.setName("mainPanel"); // NOI18N

        org.jdesktop.application.ResourceMap resourceMap = org.jdesktop.application.Application.getInstance(desktopapplication1.DesktopApplication1.class).getContext().getResourceMap(DesktopApplication1View.class);
        OpenMainSong.setText(resourceMap.getString("OpenMainSong.text")); // NOI18N
        OpenMainSong.setName("OpenMainSong"); // NOI18N
        OpenMainSong.addMouseListener(new java.awt.event.MouseAdapter() {
            public void mouseClicked(java.awt.event.MouseEvent evt) {
                OpenMainSongMouseClicked(evt);
            }
        });

        songfield.setEditable(false);
        songfield.setText(resourceMap.getString("songfield.text")); // NOI18N
        songfield.setName("songfield"); // NOI18N
        songfield.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                songfieldActionPerformed(evt);
            }
        });

        PlayMainSong.setText(resourceMap.getString("PlayMainSong.text")); // NOI18N
        PlayMainSong.setName("PlayMainSong"); // NOI18N
        PlayMainSong.addMouseListener(new java.awt.event.MouseAdapter() {
            public void mouseClicked(java.awt.event.MouseEvent evt) {
                PlayMainSongMouseClicked(evt);
            }
        });

        StopMainSong.setText(resourceMap.getString("StopMainSong.text")); // NOI18N
        StopMainSong.setName("StopMainSong"); // NOI18N
        StopMainSong.addMouseListener(new java.awt.event.MouseAdapter() {
            public void mouseClicked(java.awt.event.MouseEvent evt) {
                StopMainSongMouseClicked(evt);
            }
        });

        GetSimSongs.setText(resourceMap.getString("GetSimSongs.text")); // NOI18N
        GetSimSongs.setName("GetSimSongs"); // NOI18N
        GetSimSongs.addMouseListener(new java.awt.event.MouseAdapter() {
            public void mouseClicked(java.awt.event.MouseEvent evt) {
                GetSimSongsMouseClicked(evt);
            }
        });

        blah.setMaximumRowCount(10);
        blah.setName("blah"); // NOI18N
        blah.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                blahActionPerformed(evt);
            }
        });

        PlayOtherSong.setText(resourceMap.getString("PlayOtherSong.text")); // NOI18N
        PlayOtherSong.setName("PlayOtherSong"); // NOI18N
        PlayOtherSong.addMouseListener(new java.awt.event.MouseAdapter() {
            public void mouseClicked(java.awt.event.MouseEvent evt) {
                PlayOtherSongMouseClicked(evt);
            }
        });

        StopOtherSong.setText(resourceMap.getString("StopOtherSong.text")); // NOI18N
        StopOtherSong.setName("StopOtherSong"); // NOI18N
        StopOtherSong.addMouseListener(new java.awt.event.MouseAdapter() {
            public void mouseClicked(java.awt.event.MouseEvent evt) {
                StopOtherSongMouseClicked(evt);
            }
        });

        ClearAllSongs.setText(resourceMap.getString("ClearAllSongs.text")); // NOI18N
        ClearAllSongs.setName("ClearAllSongs"); // NOI18N
        ClearAllSongs.addMouseListener(new java.awt.event.MouseAdapter() {
            public void mouseClicked(java.awt.event.MouseEvent evt) {
                ClearAllSongsMouseClicked(evt);
            }
        });

        javax.swing.GroupLayout mainPanelLayout = new javax.swing.GroupLayout(mainPanel);
        mainPanel.setLayout(mainPanelLayout);
        mainPanelLayout.setHorizontalGroup(
            mainPanelLayout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGroup(javax.swing.GroupLayout.Alignment.TRAILING, mainPanelLayout.createSequentialGroup()
                .addContainerGap(443, Short.MAX_VALUE)
                .addComponent(GetSimSongs)
                .addGap(265, 265, 265))
            .addGroup(mainPanelLayout.createSequentialGroup()
                .addGap(47, 47, 47)
                .addGroup(mainPanelLayout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                    .addGroup(mainPanelLayout.createSequentialGroup()
                        .addComponent(OpenMainSong)
                        .addGap(27, 27, 27)
                        .addComponent(songfield, javax.swing.GroupLayout.PREFERRED_SIZE, 240, javax.swing.GroupLayout.PREFERRED_SIZE)
                        .addGap(33, 33, 33)
                        .addComponent(PlayMainSong)
                        .addGap(18, 18, 18)
                        .addComponent(StopMainSong))
                    .addGroup(mainPanelLayout.createSequentialGroup()
                        .addComponent(blah, javax.swing.GroupLayout.PREFERRED_SIZE, 488, javax.swing.GroupLayout.PREFERRED_SIZE)
                        .addGap(51, 51, 51)
                        .addGroup(mainPanelLayout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                            .addComponent(StopOtherSong)
                            .addComponent(PlayOtherSong))
                        .addGap(31, 31, 31)
                        .addComponent(ClearAllSongs)))
                .addContainerGap(68, Short.MAX_VALUE))
        );
        mainPanelLayout.setVerticalGroup(
            mainPanelLayout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGroup(mainPanelLayout.createSequentialGroup()
                .addGap(36, 36, 36)
                .addGroup(mainPanelLayout.createParallelGroup(javax.swing.GroupLayout.Alignment.BASELINE)
                    .addComponent(OpenMainSong)
                    .addComponent(songfield, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE)
                    .addComponent(PlayMainSong)
                    .addComponent(StopMainSong))
                .addGap(18, 18, 18)
                .addComponent(GetSimSongs)
                .addGap(90, 90, 90)
                .addGroup(mainPanelLayout.createParallelGroup(javax.swing.GroupLayout.Alignment.BASELINE)
                    .addComponent(blah, javax.swing.GroupLayout.PREFERRED_SIZE, 30, javax.swing.GroupLayout.PREFERRED_SIZE)
                    .addComponent(PlayOtherSong))
                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.UNRELATED)
                .addComponent(StopOtherSong)
                .addContainerGap(124, Short.MAX_VALUE))
            .addGroup(javax.swing.GroupLayout.Alignment.TRAILING, mainPanelLayout.createSequentialGroup()
                .addContainerGap(214, Short.MAX_VALUE)
                .addComponent(ClearAllSongs)
                .addGap(141, 141, 141))
        );

        menuBar.setName("menuBar"); // NOI18N

        fileMenu.setText(resourceMap.getString("fileMenu.text")); // NOI18N
        fileMenu.setName("fileMenu"); // NOI18N

        javax.swing.ActionMap actionMap = org.jdesktop.application.Application.getInstance(desktopapplication1.DesktopApplication1.class).getContext().getActionMap(DesktopApplication1View.class, this);
        exitMenuItem.setAction(actionMap.get("quit")); // NOI18N
        exitMenuItem.setName("exitMenuItem"); // NOI18N
        fileMenu.add(exitMenuItem);

        menuBar.add(fileMenu);

        helpMenu.setText(resourceMap.getString("helpMenu.text")); // NOI18N
        helpMenu.setName("helpMenu"); // NOI18N

        aboutMenuItem.setAction(actionMap.get("showAboutBox")); // NOI18N
        aboutMenuItem.setName("aboutMenuItem"); // NOI18N
        helpMenu.add(aboutMenuItem);

        menuBar.add(helpMenu);

        statusPanel.setName("statusPanel"); // NOI18N

        statusPanelSeparator.setName("statusPanelSeparator"); // NOI18N

        statusMessageLabel.setName("statusMessageLabel"); // NOI18N

        statusAnimationLabel.setHorizontalAlignment(javax.swing.SwingConstants.LEFT);
        statusAnimationLabel.setName("statusAnimationLabel"); // NOI18N

        progressBar.setName("progressBar"); // NOI18N

        javax.swing.GroupLayout statusPanelLayout = new javax.swing.GroupLayout(statusPanel);
        statusPanel.setLayout(statusPanelLayout);
        statusPanelLayout.setHorizontalGroup(
            statusPanelLayout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addComponent(statusPanelSeparator, javax.swing.GroupLayout.DEFAULT_SIZE, 823, Short.MAX_VALUE)
            .addGroup(statusPanelLayout.createSequentialGroup()
                .addContainerGap()
                .addComponent(statusMessageLabel)
                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED, 653, Short.MAX_VALUE)
                .addComponent(progressBar, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE)
                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                .addComponent(statusAnimationLabel)
                .addContainerGap())
        );
        statusPanelLayout.setVerticalGroup(
            statusPanelLayout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGroup(statusPanelLayout.createSequentialGroup()
                .addComponent(statusPanelSeparator, javax.swing.GroupLayout.PREFERRED_SIZE, 2, javax.swing.GroupLayout.PREFERRED_SIZE)
                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED, javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE)
                .addGroup(statusPanelLayout.createParallelGroup(javax.swing.GroupLayout.Alignment.BASELINE)
                    .addComponent(statusMessageLabel)
                    .addComponent(statusAnimationLabel)
                    .addComponent(progressBar, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE))
                .addGap(3, 3, 3))
        );

        setComponent(mainPanel);
        setMenuBar(menuBar);
        setStatusBar(statusPanel);
    }// </editor-fold>//GEN-END:initComponents

    // This function is for when I want to choose the main audio file.
    private void OpenMainSongMouseClicked(java.awt.event.MouseEvent evt) {//GEN-FIRST:event_OpenMainSongMouseClicked
        JFileChooser fc = new JFileChooser(dir);
        int rc = fc.showDialog(null, "Select Data File");
        if (rc == JFileChooser.APPROVE_OPTION) {
            File file = fc.getSelectedFile();
            String filename = file.getAbsolutePath();
            System.out.print(filename);
            songfield.setText(filename);
        }
        else {
            System.out.print("File chooser cancel button clicked.");
        }
    }//GEN-LAST:event_OpenMainSongMouseClicked

    private void songfieldActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_songfieldActionPerformed
    }//GEN-LAST:event_songfieldActionPerformed

    // Playing the main song.
    private void PlayMainSongMouseClicked(java.awt.event.MouseEvent evt) {//GEN-FIRST:event_PlayMainSongMouseClicked
        try {
            AudioInputStream audioIn = null;
            File audio = new File(songfield.getText());
            audioIn = AudioSystem.getAudioInputStream(audio);
            AudioFormat format = audioIn.getFormat();
           
            try {
                DataLine.Info info = new DataLine.Info(
                        Clip.class, audioIn.getFormat(), ((int)audioIn.getFrameLength()*format.getFrameSize()));
            clip = (Clip) AudioSystem.getLine(info);

            // To get the total bytes to read, multiply the sample size by
            // the total time desired and the total number of bytes per sample.
            byte[] data = new byte[N*time*4];
            audioIn.read(data);
            clip.open(audioIn.getFormat(), data, 0, N*time*4);
            clip.start();
            }
            catch (LineUnavailableException ex) {
                Logger.getLogger(DesktopApplication1View.class.getName()).log(Level.SEVERE, null, ex);
            }
        }
        catch (UnsupportedAudioFileException ex) {
            Logger.getLogger(DesktopApplication1View.class.getName()).log(Level.SEVERE, null, ex);
        }
        catch (IOException ex) {
            Logger.getLogger(DesktopApplication1View.class.getName()).log(Level.SEVERE, null, ex);
        }
    }//GEN-LAST:event_PlayMainSongMouseClicked

        private void StopMainSongMouseClicked(java.awt.event.MouseEvent evt) {//GEN-FIRST:event_StopMainSongMouseClicked
            clip.stop();
        }//GEN-LAST:event_StopMainSongMouseClicked

        // Get Similar Songs button.
        private void GetSimSongsMouseClicked(java.awt.event.MouseEvent evt) {//GEN-FIRST:event_GetSimSongsMouseClicked
        // Need to clear some things when I run for a 2nd time.
        blah.removeAllItems();
        hash.clear();
        final_songs.clear();
        File directory = new File(dir);
        File[] files = directory.listFiles();
        File main = new File(songfield.getText());
        File text = new File("C:\\Users\\Jef\\Downloads\\out.txt");
        FileWriter fw;

        try {
            double diff;
            fw = new FileWriter(text);
            FileWriter f2 = new FileWriter(new File("C:\\Users\\Jef\\Downloads\\finals.txt"));

            // Calculates the main song's array of complex numbers and stores it in memory.
            computeMain(main);           

            // Looping over all of the songs.
            for (int i = 0; i < files.length; i++) {
                if (!files[i].toString().equals(songfield.getText())) {

                    // Calculate the overall difference between
                    // the song we're comparing and the main song.
                    diff = computeAudio(files[i]);
                    
                    // These writes are just writing the output values.
                    f2.write(files[i].toString());
                    f2.write("\t");
                    f2.write(String.valueOf(diff));
                    f2.write("\r\n");

                    // Appends the difference to the linked list and hash.
                    check(diff, files[i].toString());
                }
            }
            f2.close();

            // Just throwing the top 10 songs into the drop down box.
            for (int i = 0; i < 10; i++) {
                blah.addItem(hash.get(final_songs.get(i)));
                fw.write(hash.get(final_songs.get(i)).toString());
                fw.write("\t");
                fw.write(final_songs.get(i).toString());
                fw.write("\r\n");
            }
            fw.close();

        } catch (IOException ex) {
            Logger.getLogger(DesktopApplication1View.class.getName()).log(Level.SEVERE, null, ex);
        } catch (UnsupportedAudioFileException ex) {
            Logger.getLogger(DesktopApplication1View.class.getName()).log(Level.SEVERE, null, ex);
        } catch (LineUnavailableException ex) {
            Logger.getLogger(DesktopApplication1View.class.getName()).log(Level.SEVERE, null, ex);
        } catch (InterruptedException ex) {
            Logger.getLogger(DesktopApplication1View.class.getName()).log(Level.SEVERE, null, ex);
        }

        // Creating a histogram graph using JFreeChart library.
       histogram.setType(HistogramType.RELATIVE_FREQUENCY);
       String plotTitle = "Histogram";
       String xaxis = "number";
       String yaxis = "value";
       PlotOrientation orientation = PlotOrientation.VERTICAL;
       boolean show = false;
       boolean toolTips = false;
       boolean urls = false;
       JFreeChart chart = ChartFactory.createHistogram( plotTitle, xaxis, yaxis,
                histogram, orientation, show, toolTips, urls);
       int width = 500;
       int height = 300;
       try {
           ChartUtilities.saveChartAsPNG(new File("right.PNG"), chart, width, height);
       }
       catch (IOException e) {}
}

        // Calculating the difference between the main song
        // and the current song up for comparison.
        public static double difference (Complex[] b) {
        
            double fin = 0;
            // Looping over the size of the window because that's how big
            // each array of complex numbers is.
            for (int i = 0; i < window; i++) {
                fin += Math.abs(main_song.get(j)[i].abs() - b[i].abs());
            }

            // Increment the index of the main song's array
            // for next time this function is visited.
            j++;
            return fin;     // Return the window's difference
    }

        // This function "checks" the current difference to see where
        // it stands amongst the other differences and appends
        // it to the correct position in the linked list.
    public static void check (double fin, String filename) {
        int added = 0;

        // Empty list, this is the first song that was compared.
        if (final_songs.isEmpty()) {
            final_songs.add(new Double(fin));
        }
        else {
            // Otherwise loop over all of the elements seen until the right
            // position is found.
            for (int i = 0; i < final_songs.size(); i++) {
                if ((Double) final_songs.get(i) > fin) {
                    final_songs.add(i, fin);
                    added++;
                    break;
                }
            }
            // If it's not found in the loop, then it's the current least
            // similar song that we've seen.
            if (added == 0) {
                final_songs.add(fin);
            }
        }
        // Add this difference and the file name to the hash.
        hash.put(fin, filename);
    }


    public static void computeMain (File main) throws UnsupportedAudioFileException, IOException {
        // Calculating the closest power of 2 to x, and x is the sample rate.
        x--;
        x |= x >> 1;
        x |= x >> 2;
        x |= x >> 4;
        x |= x >> 8;
        x |= x >> 16;
        x++;

        // Creating a new empty array of 4 bytes.
        byte[] main_data = new byte[4];
        
        // Creating the array of doubles with the appropriate window size.
        double[] main_d = new double[window];

        // I was using some sort of skipping mechanism to create overlapping
        // windows, which is why I decided to keep this count here.
        //int count = 0;

        AudioInputStream main_aud;
        FastFourierTransformer transform = new FastFourierTransformer();
        main_aud = AudioSystem.getAudioInputStream(main);

        for (int r = 0; r < time * x / window; r++) {

            /* Here's that skip mechanism that I was talking about.
            /  Count gets increased by the window size times 2, which is
            /  half the amount of total bytes (4) that's being read.  If we used
            /  4 instead of 2, we wouldn't be overlapping windows, we'd be right
            /  up against the next section of data.
            */
            //main_aud = AudioSystem.getAudioInputStream(main);
            //main_aud.skip(count);
            
            for (int i = 0; i < window; i++) {
                main_aud.read(main_data, 0, main_data.length);
                /*  Switching Tubbs' method as described in the paper.
                 byte swap = main_data[0];
                 main_data[0] = main_data[1];
                 main_data[1] = swap;
                 byte swap = main_data[0];
                 main_data[0] = main_data[1];
                 main_data[1] = swap;
                 short left = (short) ((0xff & main_data[1]) | ((0xff & main_data[0])<<8));
                 short right = (short) ((0xff & main_data[3]) | ((0xff & main_data[2])<<8));
                 main_d[i] = (left + right) / 2.0;
               */

                /* Some other method using ints as the bytes (found on the web).
                 int b1 = main_data[0];
                 int b2 = main_data[1];
                 int b3 = main_data[2];
                 int b4 = main_data[3];
                 if (b1 < 0) b1 += 0x100;
                 if (b2 < 0) b2 += 0x100;
                 if (b3 < 0) b3 += 0x100;
                 if (b4 < 0) b4 += 0x100;

                 int value1, value2;
                 value1 = (b1 << 8) + b2;
                 value2 = (b3 << 8) + b4;
                 main_d[i] = (value1 + value2) / 2.0;
               */

                // Tubbs' method for converting Little Endian bytes
                // to Big Endian ints and storing as an averaged channel double.
                short left = (short) ((0xff & main_data[1])<<8 | ((0xff & main_data[0])));
                short right = (short) ((0xff & main_data[3])<<8 | ((0xff & main_data[2])));
                main_d[i] = (left + right) / 2.0;
            }
            // Adding the array of complex numbers (Power Spectrum) to the
            // main song's array of array of complex numbers.
            main_song.add(transform.transform(main_d));

            //count += window * 2;  // Incrementing that count variable.
        }
        histogram.addSeries("histo", main_d, main_d.length);
    }

    // Computing the current song's Power Spectrum.
    public static double computeAudio(File songfile) throws IOException, UnsupportedAudioFileException, LineUnavailableException, InterruptedException {
        // Everytime we come in here, we need to reset the main song's index.
        j = 0;
        
        // The rest is basically the same as the main song's function, except
        // we only store the window amount of this song in memory, not the whole
        // thing.
        byte[] song_data = new byte[4];
        double[] song_d = new double[window];
        double val = 0.;
        Complex[] s;
        
        AudioInputStream song_aud;
        FastFourierTransformer transform = new FastFourierTransformer();
        song_aud = AudioSystem.getAudioInputStream(songfile);
        
        // Calculating for x amount of seconds of the song being compared.
        int count = 0;
        for (int y = 0; y < time * x / window; y++) {
            for (int i = 0; i < window; i++) {
                song_aud.read(song_data, 0, song_data.length);
                short left = (short) ((0xff & song_data[1])<<8 | ((0xff & song_data[0])));
                short right = (short) ((0xff & song_data[3])<<8 | ((0xff & song_data[2])));
                song_d[i] = (left + right) / 2.0;
            }
            s = transform.transform(song_d);

            // Adding to the overall difference variable.
            val += difference(s);
        }
        // Return the overall difference variable so we can add it to the lists.
        return val;
        }//GEN-LAST:event_GetSimSongsMouseClicked

    private void blahActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_blahActionPerformed
    }//GEN-LAST:event_blahActionPerformed

    // Just playing the other music file (same as the main song).
    private void PlayOtherSongMouseClicked(java.awt.event.MouseEvent evt) {//GEN-FIRST:event_PlayOtherSongMouseClicked
        try {
            AudioInputStream audioIn = null;
            File audio = new File((String)blah.getSelectedItem());
            audioIn = AudioSystem.getAudioInputStream(audio);
            AudioFormat format = audioIn.getFormat();

            try {
                DataLine.Info info = new DataLine.Info(
                        Clip.class, audioIn.getFormat(), ((int)audioIn.getFrameLength()*format.getFrameSize()));
                clip = (Clip) AudioSystem.getLine(info);
                byte[] data = new byte[N*time*4];
                audioIn.read(data);
                clip.open(audioIn.getFormat(), data, 0, N*time*4);
                clip.start();
            }
            catch (LineUnavailableException ex) {
                Logger.getLogger(DesktopApplication1View.class.getName()).log(Level.SEVERE, null, ex);
            }
        }
        catch (UnsupportedAudioFileException ex) {
            Logger.getLogger(DesktopApplication1View.class.getName()).log(Level.SEVERE, null, ex);
        } catch (IOException ex) {
            Logger.getLogger(DesktopApplication1View.class.getName()).log(Level.SEVERE, null, ex);
        }
    }//GEN-LAST:event_PlayOtherSongMouseClicked

    private void StopOtherSongMouseClicked(java.awt.event.MouseEvent evt) {//GEN-FIRST:event_StopOtherSongMouseClicked
        clip.stop();
    }//GEN-LAST:event_StopOtherSongMouseClicked

    private void ClearAllSongsMouseClicked(java.awt.event.MouseEvent evt) {//GEN-FIRST:event_ClearAllSongsMouseClicked
        blah.removeAllItems();
    }//GEN-LAST:event_ClearAllSongsMouseClicked
        
    // Variables declaration - do not modify//GEN-BEGIN:variables
    private javax.swing.JButton ClearAllSongs;
    private javax.swing.JButton GetSimSongs;
    private javax.swing.JButton OpenMainSong;
    private javax.swing.JButton PlayMainSong;
    private javax.swing.JButton PlayOtherSong;
    private javax.swing.JButton StopMainSong;
    private javax.swing.JButton StopOtherSong;
    private javax.swing.JComboBox blah;
    private javax.swing.JPanel mainPanel;
    private javax.swing.JMenuBar menuBar;
    private javax.swing.JProgressBar progressBar;
    private javax.swing.JTextField songfield;
    private javax.swing.JLabel statusAnimationLabel;
    private javax.swing.JLabel statusMessageLabel;
    private javax.swing.JPanel statusPanel;
    // End of variables declaration//GEN-END:variables

    private final Timer messageTimer;
    private final Timer busyIconTimer;
    private final Icon idleIcon;
    private final Icon[] busyIcons = new Icon[15];
    private int busyIconIndex = 0;

    private JDialog aboutBox;
}

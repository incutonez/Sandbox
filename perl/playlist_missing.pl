use warnings;
use strict;
use HTML::Entities;
use Data::Dumper;

# 1st param
my %listToCompare;
# 2nd param... the one you'd like to modify
my %listToChange;
my $extensions = '(1?|ph)\.(mp3|wma|m4a)$';
my $removeChars = '\(|\)|\.|\*|\\?';
my $debug = 0;
foreach my $file (@ARGV) {
  my $currHash = \%listToCompare;
  # wpl format
  my $patt = '.*Shared Music\\\([^"]*)';
  my $splitExp = '\\\\';
  open (my $fh, '<', $file) or die "Can't open file $file.\n";
  if ($ARGV[1] && $file eq $ARGV[1]) {
    $currHash = \%listToChange;
  }
  if ($file =~ /lastfm/) {
    $patt = '(.*)';
    $splitExp = ',,';
  }
  # format from Android playlist
  elsif ($file =~ /m3u8/) {
    $patt = qq(../(.*));
    $splitExp = '\\/';
  }
  while (my $line = <$fh>) {
    if ($line =~ qr/$patt/) {
      my $str = lc $1;
      chomp $str;
      $str =~ s/$extensions//;
      $str =~ s/$removeChars//g;
      $str =~ s/-|_/ /g;
      $str =~ s/reissue|digitalremaster|dc\d+$//g;
      my @splits = split(/$splitExp/, decode_entities($str));
      my $first = $splits[0];
      my $second = $splits[1];
      my $song = $splits[2];
      $song = $splits[1] unless $song;
      if ($song && $song =~ /cd|disc$/ && $splits[3]) {
        $song = $splits[3];
      }
      if ($song) {
        $song =~ s/$first\s?//;
        $song =~ s/^\d\d\d?\s//;
        $song =~ s/\s|:|\///g;
        $song = substr($song, 0, 25);
        $first =~ s/^the\s//;
        $currHash->{$first}->{$song} = 1;
      }
    }
  }
}

if ($debug) {
  $Data::Dumper::Sortkeys = 1;
  print Dumper(\%listToCompare);
}
foreach my $artist (sort keys %listToCompare) {
  foreach my $song (sort keys %{$listToCompare{$artist}}) {
    if ($listToChange{$artist}) {
      my $found = $listToChange{$artist}{$song};
      if ($found) {
        delete $listToChange{$artist}{$song};
      }
      else {
        if (!$debug) {
          print "$artist - $song\n";
        }
      }
    }
    else {
      if (!$debug) {
        print "$artist - $song\n";
      }
    }
  }
}
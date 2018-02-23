use warnings;
use strict;
use HTML::Entities;
use Data::Dumper;

open(my $fh, '<', $ARGV[0]) or die "Can't open file $ARGV[0].";
open(my $fh2, '<', $ARGV[1]) or die "Can't open file $ARGV[1].";

my %artistsToCompare;
my %artistsToCheck;
my $extensions = '\.(mp3|wma|m4a)$';
my $removeChars = '-|\(|\)|\s|\d|\.|_';
while (my $line = <$fh>) {
  if ($line =~ /src="D\:\\Music\\([^"]*)"/) {
    my $str = lc $1;
    chomp $str;
    $str =~ s/$extensions//;
    $str =~ s/$removeChars//g;
    $str =~ s/reissue|digitalremaster|dc$//g;
    my @splits = split(/\\/, decode_entities($str));
    my $first = $splits[0];
    my $second = $splits[1];
    my $song = $splits[2];
    if ($song) {
      $song = substr($song, 0, 25);
    }
    if ($song && $song =~ /cd/i && $splits[3]) {
      $song = substr($splits[3], 0, 25);
    }
    if ($song && $song ne '') {
      $artistsToCompare{$first}{$second}{$song} = 1;
    }
  }
}
while (my $line = <$fh2>) {
  if ($line =~ /\/storage\/3066-6539\/Music\/(.*)/) {
    my $str = lc $1;
    chomp $str;
    $str =~ s/$extensions//;
    $str =~ s/$removeChars//g;
    $str =~ s/reissue|dc$//g;
    my @splits = split(/\//, decode_entities($str));
    my $first = $splits[0];
    my $second = $splits[1];
    my $song = $splits[2];
    if ($song) {
      $song = substr($song, 0, 25);
    }
    if ($song && $song ne '') {
      $artistsToCheck{$first}{$second}{$song} = 1;
    }
  }
}

foreach my $artist (sort keys %artistsToCompare) {
  foreach my $album (sort keys %{$artistsToCompare{$artist}}) {
    foreach my $song (sort keys %{$artistsToCompare{$artist}{$album}}) {
      if ($artistsToCheck{$artist}{$album}) {
        my $found = $artistsToCheck{$artist}{$album}{$song};
        if ($found) {
          delete $artistsToCheck{$artist}{$album}{$song};
          #print "$found\n";
        }
        else {
          print "$artist - $album - $song\n";
        }
      }
    }
  }
}
#print Dumper(\%artistsToCheck);
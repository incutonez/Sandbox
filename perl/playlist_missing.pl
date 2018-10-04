use warnings;
use strict;
use HTML::Entities;
use Data::Dumper;

# 1st param
my %artistsToCompare;
# 2nd param... the one you'd like to modify
my %artistsToCheck;
my $extensions = '(1?|ph)\.(mp3|wma|m4a)$';
my $removeChars = '\(|\)|\.|\*|\\?';
foreach my $file (@ARGV) {
  my $currHash = \%artistsToCompare;
  # wpl format
  my $patt = qq(src="..\\\\([^"]*)");
  my $splitExp = '\\\\';
  open (my $fh, '<', $file) or die "Can't open file $file.\n";
  if ($ARGV[1] && $file eq $ARGV[1]) {
    $currHash = \%artistsToCheck;
  }
  if ($file =~ /lastfm/) {
    $patt = '(.*)';
    $splitExp = ',,';
  }
  # format from Android playlist
  elsif ($file =~ /Favorites|Bike/) {
    $patt = qq(\\/storage\\/3066-6539\\/Music\\/(.*));
    $splitExp = '\\/';
  }
  while (my $line = <$fh>) {
    if ($line =~ /$patt/) {
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
foreach my $artist (sort keys %artistsToCompare) {
  foreach my $song (sort keys %{$artistsToCompare{$artist}}) {
    if ($artistsToCheck{$artist}) {
      my $found = $artistsToCheck{$artist}{$song};
      if ($found) {
        delete $artistsToCheck{$artist}{$song};
      }
      else {
        print "$artist - $song\n";
      }
    }
    else {
      print "$artist - $song\n";
    }
  }
}
#print Dumper(\%artistsToCompare);
use strict;
use warnings;
use Regexp::Assemble;
use Algorithm::Loops qw(NestedLoops);

my $dictionary = 'dict';
open my $dh, '<', $dictionary or die "Can't open $dictionary!  $!\n";
my %dict = ();
# my @dict = ();
#my $ra = Regexp::Assemble->new;
# $ra->add('that', 'have', 'of', 'and', 'the', 'is');
while (my $line = <$dh>) {
  chomp $line;
  $dict{$line} = 1;
  #$ra->add($line);
  # push @dict, $line;
}
# $ra->add(@dict); 

my $file = 'b';
open my $fh, '<', $file or die "Can't open $file!  $!\n";
my $thresh = 50;

my $depth = 100;
while (my $line = <$fh>) {
  chomp $line;
  # if ($line =~ /key:\s(.*),/) {
    # print "$1\n";
  # }
  if ($line =~ /plaintext:\s(.*)/g) {
    my $b = $1;
    NestedLoops(
      [
        ( [2..10] ) x $depth
      ],
      sub {
        #print "@_\n";
        my $prev = 0;
        my $ok = 0;
        for my $i (@_) {
          my $str = substr($b, $prev, $i);
          if ($dict{$str}) {
            $ok++;
          }
          $prev += $i;
        }
        if ($ok > $thresh) {
          print "$b\n";
        }
      }
    );
  }
  #if ($line =~ /plaintext:\s(.*)/) {
  #  my $number =()= $1 =~ /$ra/g;
  #  if ($number > $thresh) {
  #    print "plaintext: $line\n\n";
  #  }
  #}
}

#!/usr/bin/env perl

use warnings;
use strict;
use Getopt::Long;

my $x;
my $y;
my $n;
my $m;
GetOptions( 'x=i' => \$x,
            'y=i' => \$y,
            'n=i' => \$n,
            'm=i' => \$m );

$m = $n unless $m;

print "arr = [\n";
for (my $i = 0; $i < $n; $i++) {
  if ($i != 0) {
    print ",\n";
  }
  print "  [";
  for (my $j = 0; $j < $m; $j++) {
    if ($j != 0) {
      print ", ";
    }
    print rand_range($x, $y);
  }
  print "]";
}
print "\n];";

sub rand_range {
  my ($x, $y) = @_;
  return int(rand($y - $x + 1));
}
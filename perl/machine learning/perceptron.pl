use strict;
use warnings;
use Pod::Usage;
use Getopt::Long;

use constant e => 2.718281828459045;
my $class;
my $alpha;
my @x = ();
my @deltas = ();
GetOptions( "class=s" => \$class,
            "learn=f" => \$alpha
          );
pod2usage(1) unless $class and $alpha and $class =~ /linear|logistic/i;


my $file = "coords.txt";
#my $file = "test.txt";
open my $fh, '<', $file or die "Can't open $file!  $!\n";

while (my $line = <$fh>) {
  chomp $line;
  my @split = split(/\,\s/, $line);
  push @x, [1, $split[0], $split[1]];
  push @deltas, $split[2];
}

my @weights = (0, 0, 0);
my $gamma = 0;
my $thresh = 0;
my $correct = 0;
my $counter = 1;

print "run, w_0, w_1, w_2\n";
while (1) {
  my $correct = 0;
  for (my $i = 0; $i < scalar @x; $i++) {
    my $sum = 0;
    my $count = 0;
    
    print $counter++, ", ";
    foreach my $weight (@weights) {
      if ($count == 0) {
        print "$weight";
        $count = 1;
      }
      else {
        print ", $weight";
      }
    }
    print "\n";
    
    for (my $j = 0; $j < scalar @{$x[$i]}; $j++) {
      $sum += $weights[$j] * $x[$i][$j];
    }
    
    if ($class =~ /linear/i) {
      $sum -= 12;
      if ($sum > $thresh) {
        $gamma = 1;
      }
      else {
        $gamma = 0;
      }
      my $error = $deltas[$i] - $gamma;
      $correct++ if $error != 0;
      for (my $j = 0; $j < scalar @{$x[$i]}; $j++) {
        $weights[$j] += $alpha * $x[$i][$j] * $error;
      }
    }
    elsif ($class =~ /logistic/i) {
      $sum = 1 / (1 + (e ** (-1 * ($sum - 12))));
      if ($sum > $thresh) {
        $gamma = 1;
      }
      else {
        $gamma = 0;
      }
      my $delta = $deltas[$i] - $gamma;
      for (my $j = 0; $j < scalar @{$x[$i]}; $j++) {
        $weights[$j] += $alpha * $x[$i][$j] * $delta;
      }
      $correct++ if $delta != 0;
    }
  }
  last if $correct == 0;
}

__END__

=head1 SYNOPSIS

[perl|./] perceptron.pl

=head1 OPTIONS

=item B<-class>

The classifier that you want to use, either type "linear" or "logistic".

=item B<-learn>

The learning rate that you would like to use.  Value is between 0 and 1.

=head1 DESCRIPTION

This program creates a bag of words from the 20 newsgroups folder.  It performs

some normalization features like lower casing all words and stripping out any

characters that aren't a-z or spaces.  It then uses a multinomial Naive Bayes

algorithm to calculate which newsgroup the given test document belongs to.

=cut
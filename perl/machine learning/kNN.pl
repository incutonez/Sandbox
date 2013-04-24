use warnings;
use strict;
use POSIX;
use Pod::Usage;
use Getopt::Long;
use Math::Complex;
use List::Util 'shuffle';

my $file;
my $folds;
my $index;
my $k;
GetOptions( "f=s" => \$file,
            "folds=i" => \$folds,
            "i=i" => \$index,
            "k=i" => \$k);            
pod2usage(1) unless $file and $folds and $index and $k;

my %sets = ();
my @data = ();

open my $fh, "<", $file or die "Can't open that!  $!\n";
setup($folds);

#<$fh>;  # Skips first 2 lines of the file... the attribute names,
#<$fh>;  # followed by a blank line.
while (my $line = <$fh>) {
  $line =~ s/\p{IsC}//g;
  next if !$line;
  #chomp $line;
  my @items = split(/,\s*/, $line);
  push(@data, [@items]);
}

@data = shuffle(@data); # randomizing data
split_data(\@data, $folds);
my $chosen = 1;
my $overall_acc = 0;
for (my $chosen = 1; $chosen <= $folds; $chosen++) {
  print "Chosen test set is $chosen...\n";
  $overall_acc += euclid($chosen, $index, $folds);
  print "\n";
}
print "Overall accuracy ~", ceil($overall_acc / $folds), "%\n";

# Splits the data in the number of folds... if the fold divides evenly,
# then all arrays will be same number, otherwise, the beginning sets will have more.
sub split_data {
  my ($data, $fold) = @_;
  my $set_number = 1;
  for (my $i = 0; $i < scalar(@{$data}); $i++) {
    push(@{$sets{"set$set_number"}}, @{$data}[$i]);
    $set_number = 1 if $set_number++ == $fold;
  }
}

sub setup {
  my $fold = shift;
  for (my $i = 1; $i <= $fold; $i++) {
    $sets{"set$i"} = ();
  }
}

sub euclid {
  my ($chosen, $indexes, $folds) = @_;
  my $num_attr = scalar(@{$sets{"set$chosen"}[0]});
  my $test_rows = scalar(@{$sets{"set$chosen"}});
  my $train_attr;
  my $count = 0;
  my $accuracy = 0;
  for (my $train = 1; $train <= $folds; $train++) {
    next if $train == $chosen;
    print "Training set $train...\n";
    my $train_rows = scalar(@{$sets{"set$train"}});
    my $right = 0;
    for (my $test_row = 0; $test_row < $test_rows; $test_row++) {
      my @out;
      my $test_attr = $sets{"set$chosen"}[$test_row][$index-1];
      for (my $train_row = 0; $train_row < $train_rows; $train_row++) {
        my $sum = 0;
        for (my $col = 0; $col < $num_attr; $col++) {
          if ($index == $col+1) {
            $train_attr = $sets{"set$train"}[$train_row][$col];
            next;
          }
          $sum += ($sets{"set$chosen"}[$test_row][$col] - $sets{"set$train"}[$train_row][$col]) ** 2;
        }
        push (@out, [sqrt($sum), $train_attr]);
      }
      @out = sort {$a->[0] <=> $b->[0]} @out;
      @out = splice(@out, 0, $k);
      my $decision = decide(@out);
      $right++ if $decision eq $test_attr;
    }
    print "Right: $right, Wrong: ", $test_rows - $right, "\n";
    $count++;
    $accuracy += ($right / $test_rows) * 100;
    print "Accuracy: ", ($right / $test_rows) * 100, "%\n";
    print "\n";
  }
  return $accuracy / $count;
}

sub decide {
  my @top_k = @_;
  my %top_k;
  for (my $i = 0; $i < $k; $i++) {
    if ($top_k{$top_k[$i][1]}) {
      $top_k{$top_k[$i][1]}++;
    }
    else {
      $top_k{$top_k[$i][1]} = 1;
    }
  }
  my @top = sort {$top_k{$a} < $top_k{$b}} keys %top_k;
  return $top[0];
}

__END__

=head1 SYNOPSIS

[perl|./] kNN.pl -f [/path/to/file] -i [#] -folds [#] -k [#]

=head1 OPTIONS

=over 4

=item B<-f>

The file that has your testing and training data.

=item B<-i>

The position in your row attributes that contains the classification name.

=begin text

        Ex:
          Our data looks like this: (dog, 4, 5, 6)
          You would enter 1 on the command line.
          Note: first position starts at 1, not 0!

=end text

=item B<-folds>

The number of folds you want for your cross validation.

=item B<-k>

The number of neighbor values.

=back

=head1 DESCRIPTION

This program is an implementation of the k-Nearest Neighbor algorithm.

=cut

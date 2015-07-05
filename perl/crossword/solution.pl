# take the WordList and put it into a hash...
# go line by line and:
  # search each hashed words against this line
  # reverse the line and search the hashed words
# When all lines are done do:
  # columns
  # diagonals/reverse diagonals

use strict;
use warnings;

my $file = 'WordList.txt';
open my $fh, '<', $file or die "Can't open file $file!  $!\n";

my %wordListHash = ();

while (my $line = <$fh>) {
  chomp($line);
  $line = uc $line;
  $wordListHash{uc $line} = 1;
}
print %wordListHash;
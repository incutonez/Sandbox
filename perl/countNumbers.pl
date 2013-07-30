use strict;
use warnings;
use Getopt::Long;
use Pod::Usage;

my $file;
GetOptions( 'f|file=s' => \$file);
pod2usage(1) unless ($file);
open my $fh, '<', $file or die "Can't open $file!  $!\n";

my $sum = 0;
# Loop over each line
while (my $line = <$fh>) {
  # Grab each line's match and add it to the sum
  while ($line =~ m/([\d]+)/g) {
    $sum += $1;
  }
}
print "The sum of all of the numbers in $file is: $sum\n";

__END__

=head1 NAME

countNumbers.pl
 
=head1 SYNOPSIS


    perl countNumbers.pl -f file
		
Examples:

# Returns "The sum of all of the numbers in test1 is: 10000000038"

perl countNumbers.pl -f test1

# Returns "The sum of all of the numbers in sample-input.txt is: 324"

perl countNumbers.pl -f sample-input.txt
 
=head1 OPTIONS
 
=over 1
 
=item B<-f>

The file that you would like to parse.  THIS IS REQUIRED.
 
=back

=head1 DESCRIPTION

    This program will sum all of the integer numbers in a file.  It's a simple
    regex that looks for any sort of digit character, and once it finds a match,
    it will add it to the running sum.
 
=cut
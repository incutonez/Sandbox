use strict;
use warnings;
use Getopt::Long;

my $letters;
my $word;
my $not;
my $len;
my %hash;

GetOptions( 'l|letters=s' => \$letters,
            'w|word=s' => \$word,
            'n|not=s' => \$not,
            'len=i' => \$len );
open my $fh, '<', 'corncob_lowercase.txt' or die "Can't open that file!  $!\n";

while (my $line = <$fh>) {
  $line =~ s/\p{IsC}|['"-]//g;
  $hash{$line} = 1;
}

if ($letters) {
  my @letters = split('', $letters);
  foreach my $key (sort keys %hash) {
    my $all = 0;
    my $original = $key;
    foreach my $letter (@letters) {
      if ($key =~ /$letter/) {
        $all = 1;
        $key =~ s/$letter//;
      }
      else {
        $all = 0;
        last;
      }
    }
    if ($all) {
      if ($not) {
        if ($len && length $original <= $len && $original !~ /[$not]/) {
          print "$original\n";
        }
        elsif (!$len && $original !~ /[$not]/) {
          print "$original\n";
        }
      }
      else {
        if ($len && length $original <= $len) {
          print "$original\n";
        }
        elsif (!$len) {
          print "$original\n";
        }
      }
    }
  }
}
elsif ($word) {
  foreach my $key (sort keys %hash) {    
    print "$key\n" if $key =~ /^$word$/ && $key !~ /[$not]/;
  }
}
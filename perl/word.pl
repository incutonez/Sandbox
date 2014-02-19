use strict;
use warnings;
use Getopt::Long;
use Pod::Usage;

my $letters;
my $word;
my $not = '';
my $len;
my %hash;
my $last_vowel;
my $vowels = '[^aeiou]';

GetOptions( 'l|letters=s' => \$letters,
            'w|word=s' => \$word,
            'n|not=s' => \$not,
            'len=i' => \$len,
            'last|lv' => \$last_vowel );
pod2usage(1) unless ($letters || $word);
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
  my %letters = ();
  if ($last_vowel) {
  #s/(\w+)\.+(\w*)$/$1$vowels$2/g
    my @splits = split(/(\w+)/, $word);
    my $length = scalar @splits;
    if ($splits[$length - 1] =~ /\./) {
      $splits[$length - 1] =~ s/\./$vowels/g;
    }
    $word = '';
    for (my $i = 0; $i < $length; $i++) {
      $word .= $splits[$i];
    }
    print $word, "\n";
    #$word =~ s/\.*\w+$/$vowels/g;
  }
  foreach my $key (sort keys %hash) {
    my @splits = ();
    if ($key =~ /^$word$/) {
      if ($not) {
        if ($key !~ /[$not]/) {
          print "$key\n";
          @splits = split('', $key);
        }
      }
      else {
        print "$key\n";
        @splits = split('', $key);
      }
      foreach my $split (@splits) {
        $letters{$split}++;
      }
		}
  }
  foreach my $letter (sort { $letters{$b} <=> $letters{$a} } keys %letters) {
    print "$letter: $letters{$letter}\n";
  }
}

=head1 NAME

word.pl
 
=head1 SYNOPSIS

Use:

    perl word.pl [--help] -w regex_word -n exclude_letters | -l letters [-n exclude_letters] [-len max_word_length]
		
Examples:

		perl word.pl --help
		
		# Returns alined, clinch, clinic, flinch, plinth
		perl word.pl -w .lin..
		
		# Returns beery and berry
		perl word.pl -w be.r. -n osd
		
		# Returns beery, berry, beryl, buyer, and derby
		perl word.pl -l brye
		
		# Returns beery and berry
		perl word.pl -l brye -len 5 -n dlu
 
=head1 DESCRIPTION
 
 
=head2 Features
 
=over
 
=item
 
=item
 
=item
 
=back
 
=cut
use strict;
use warnings;
use Getopt::Long;
use Pod::Usage;

my $letters;
my $word;
my $not = '';
my $len;
my %outputTotals;
my $last_vowel;
my $strict_match;
my $vowels = '[^aeiou]';
my $debug;
my $threshold = 0;
my $available;
my $count;
my %letter_values = (
  'a' => 1,
  'b' => 4,
  'c' => 4,
  'd' => 2,
  'e' => 1,
  'f' => 4,
  'g' => 3,
  'h' => 3,
  'i' => 1,
  'j' => 10,
  'k' => 5,
  'l' => 2,
  'm' => 4,
  'n' => 2,
  'o' => 1,
  'p' => 4,
  'q' => 10,
  'r' => 1,
  's' => 1,
  't' => 1,
  'u' => 2,
  'v' => 5,
  'w' => 4,
  'x' => 8,
  'y' => 3,
  'z' => 10
);
GetOptions( 'l|letters=s' => \$letters,
            'w|word=s' => \$word,
            'n|not=s' => \$not,
            'len=i' => \$len,
            'last|lv' => \$last_vowel,
            's|strict' => \$strict_match,
            'd|debug' => \$debug,
            't|threshold=i' => \$threshold,
            'a|available' => \$available,
            'c|count' => \$count);
pod2usage(1) unless ($letters || $word);
open my $fh, '<', 'dictionary.txt' or die "Can't open that file!  $!\n";
# If we want to pick from the available letters list, we need to add the word expression letters as well
$letters .= join('', $word =~ /([a-z])/gi) if $word && $letters && $available;
my $word_letters = $word =~ /([a-z])/gi if $word;
# Need to sort, so we put the periods at the end, so they don't consume known letters
my @letters = sort {$b cmp $a} split('', $letters) if $letters;
if ($word) {
  if ($last_vowel) {
    my @splits = split(/(\w+)/, $word);
    my $length = scalar @splits;
    for (my $i = $length - 1; $i > 0; $i--) {
      if ($splits[$i] =~ /[aeiou]/) {
        last;
      }
      elsif ($splits[$i] =~ /\./) {
        $splits[$i] =~ s/\./$vowels/g;
      }
    }
    $word = '';
    for (my $i = 0; $i < $length; $i++) {
      $word .= $splits[$i];
    }
  }
}
while (my $line = <$fh>) {
  my $output;
  $line =~ s/\p{IsC}|['"-]//g;
  next if $len && length $line != $len;
  next if $strict_match && length $letters ne length $line;
  next if $word && $line !~ /^$word$/;
  if ($available && $word) {
    $output = process_available($line);
  }
  elsif ($letters) {
    $output = process_letters($line);
  }
  else {
    $output = process_word($line);
  }
  if ($output) {
    my $total = 0;
    foreach my $char (split('', $output)) {
      $total += $letter_values{$char};
    }
    $outputTotals{$output} = $total;
  }
}

if (!$debug) {
  if ($count) {
    foreach my $word (sort { $outputTotals{$b} <=> $outputTotals{$a} } keys %outputTotals) {
      print "$outputTotals{$word}: $word\n" if $outputTotals{$word} > $threshold;
    }
  }
  else {
    foreach my $word (sort keys %outputTotals) {
      print "$word: $outputTotals{$word}\n" if $outputTotals{$word} > $threshold;
    }
  }
}

sub process_available {
  my ($key) = @_;
  my $all = 0;
  my $original = $key;
  foreach my $letter (@letters) {
    if ($key =~ /$letter/) {
      $key =~ s/$letter//;
    }
    last if length $key == 0;
  }
  return $original if length $key == 0;
}

sub process_word {
  my ($key) = @_;
  if ($key =~ /^$word$/) {
    if ($not) {
      if ($key !~ /[$not]/) {
        return $key;
      }
    }
    else {
      return $key;
    }
  }
}

sub process_letters {
    my ($key) = @_;
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
          return $original;
        }
        elsif (!$len && $original !~ /[$not]/) {
          return $original;
        }
      }
      else {
        if ($len && length $original <= $len) {
          return $original;
        }
        elsif (!$len) {
          return $original;
        }
      }
    }
}

=head1 NAME

word.pl
 
=head1 SYNOPSIS

Use:

    perl word.pl [--help] -w regex_word -n exclude_letters [-t threshold] | -l letters [-n exclude_letters] [-len max_word_length] [-s strict_match]
		
Examples:

		perl word.pl --help
    
    # Option -t is used for printing words that are greater than a certain
    # number, so you can see higher values
    
    # Options -d is used to suppress any printing for debugging purposes
		
		# Returns alined, clinch, clinic, flinch, plinth
		perl word.pl -w .lin..
		
		# Returns beery and berry
		perl word.pl -w be.r. -n osd
		
		# Returns beery, berry, beryl, buyer, and derby
		perl word.pl -l brye
		
		# Returns beery and berry
		perl word.pl -l brye -len 5 -n dlu
    
    # Returns byre
    perl word.pl -s -l brye
    
    # Returns abye, gybe, obey
    perl word.pl -s -l b.ye
 
=head1 DESCRIPTION
 
 
=head2 Features
 
=over
 
=item
 
=item
 
=item
 
=back
 
=cut
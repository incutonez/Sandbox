use strict;
use warnings;
use Getopt::Long;
use Pod::Usage;
use POSIX qw(ceil);
use Algorithm::Loops qw(NestedLoops);
use List::MoreUtils qw(part);
use Regexp::Assemble;

my $file = 'hello';
open my $fh, '<', $file or die "Can't open $file!  $!\n";

my @freqs = (0.08, 0.015, 0.03, 0.04, 0.13, 0.02, 0.015, 0.06, 0.065, 0.005, 0.005, 0.035, 0.03, 0.07, 0.08, 0.02,
             0.002, 0.065, 0.06, 0.09, 0.03, 0.01, 0.015, 0.005, 0.02, 0.002);

my %freqs = ('a' => 0.08, 'b' => 0.015, 'c' => 0.03, 'd' => 0.04, 'e' => 0.13, 'f' => 0.02, 'g' => 0.015, 'h' => 0.06,
             'i' => 0.065, 'j' => 0.005, 'k' => 0.005, 'l' => 0.035, 'm' => 0.03, 'n' => 0.07, 'o' => 0.08, 'p' => 0.02,
             'q' => 0.002, 'r' => 0.065, 's' => 0.06, 't' => 0.09, 'u' => 0.03, 'v' => 0.01, 'w' => 0.015, 'x' => 0.005, 'y' => 0.02, 'z' => 0.002);
             
my %hash = ('a' => 0, 'b' => 0, 'c' => 0, 'd' => 0, 'e' => 0, 'f' => 0, 'g' => 0, 'h' => 0,
            'i' => 0, 'j' => 0, 'k' => 0, 'l' => 0, 'm' => 0, 'n' => 0, 'o' => 0, 'p' => 0,
            'q' => 0, 'r' => 0, 's' => 0, 't' => 0, 'u' => 0, 'v' => 0, 'w' => 0, 'x' => 0,
            'y' => 0, 'z' => 0);
            
my %alphabet = (0 => 'a', 1 => 'b', 2 => 'c', 3 => 'd', 4 => 'e', 5 => 'f', 6 => 'g', 7 => 'h',
                8 => 'i', 9 => 'j', 10 => 'k', 11 => 'l', 12 => 'm', 13 => 'n', 14 => 'o', 15 => 'p',
                16 => 'q', 17 => 'r', 18 => 's', 19 => 't', 20 => 'u', 21 => 'v', 22 => 'w', 23 => 'x',
                24 => 'y', 25 => 'z');

my $content = '';
while (my $line = <$fh>) {
  $line = lc $line;
  $line =~ s/\p{IsC}|\s*//g;
  $content .= $line;
}
my $N = length $content;
# my %divs = ();

my $dictionary = 'dict';
open my $dh, '<', $dictionary or die "Can't open $dictionary!  $!\n";
my $ra = Regexp::Assemble->new;
while (my $line = <$dh>) {
  chomp $line;
  $ra->add($line);
}

# my $dictionary = 'dict';
# open $fh, '<', $dictionary or die "Can't open $dictionary!  $!\n";
# my %dict = <$fh>;
# my @dict = ();
# while (my $line = <$fh>) {
  # chomp $line;
  # $line =~ s/\p{IsC}//g;
  # push @dict, $line;
# }

# my @divisors;
# for (my $i = 3; $i < $N / 2; $i++) {
  # for (my $j = 0; $j < $N; $j++) {
    # my $match = substr $content, $j, $i;
    # for (my $k = $j+1; $k < $N; $k++) {
      # my $next = substr $content, $k, $i;
      # if ($next eq $match) {
        # my $number = $k - $j;
        # push @divisors, $number;
        # push @divisors, map {$number == $_*$_ ? () : $number/$_} reverse @divisors;
        # print "MATCH!!!!  $match, distance: ", $k - $j, "\n";
        #push @divisors, $k - $j;
        #print "Key lengths are: ";
        # foreach my $a (@divisors) {
          
        # }
        #print "\n";
      # }
    # }
  # }
# }
# my @fin = ();
# my $ct = 0;
# foreach my $div (sort {$b <=> $a} @divisors) {
  # push @fin, $div;
  # last if ++$ct > 4;
# }
# my $gcd = gcd($divisors[0], $divisors[1]);
# for (my $i = 2; $i < scalar @divisors; $i++) {
  # $gcd = gcd($divisors[$i], $gcd);
# }
# my $key_len = ceil(friedman(%hash));
# print "GCD: $gcd, Friedman: $key_len\n";

# sub gcd {
  # my ($a, $b) = ($_[0], $_[1]);
  # my $m;
  # while ($b != 0) {
    # $m = $a % $b;
    # $a = $b;
    # $b = $m;
  # }
  # return $a;
# }
# $key_len = $gcd;

# $key_len = 5;
# my @keys;
# my %columns;
my $thresh = 50;
foreach my $key_len (3..7) {
  my @keys = ();
  my %columns = ();
  %columns = ();
  for (my $i = 0; $i < $N; $i += $key_len) {
    my $str = substr($content, $i, $key_len);
    for (my $i = 0; $i < $key_len; $i++) {
      my $st = substr($str, $i, 1) if length $str >= $i;
      $columns{$i} .= $st if $st;
    }
  }

  for (my $i = 0; $i < $key_len; $i++) {
    my %final = ();
    my @col = split(//, $columns{$i});
    my $length = scalar @col;
    
    # counting frequency of letters in column
    foreach my $letter (@col) {
      $final{$letter}++;
    }
    # setting letters with no frequencies in column
    for (my $a = 0; $a < 26; $a++) {
      $final{$alphabet{$a}} = 0 unless $final{$alphabet{$a}};
    }

    my %phi = ();
    for (my $i = 0; $i < 26; $i++) {
      my $sum = 0;
      for (my $c = 0; $c < 26; $c++) {
        my $mod = ($c - $i) % 26;
        $sum += ($final{$alphabet{$c}} / $length) * $freqs[$mod];
      }
      $phi{$alphabet{$i}} = $sum;
    }
    my $count = 0;
    my $keys = '';
    foreach my $key (sort {$phi{$b} <=> $phi{$a}} keys %phi) {
      # print "val: $phi{$key}, key: $key\n";
      # print "$key";
      push @keys, $key;
      # $keys .= $key;
      foreach my $letter (@col) {
        my $subt = ord($letter) - ord($key) + 97;
        if ($subt < 97) {
          $subt += 26;
        }
        # print chr($subt);
      }
      # print "\n";
      last if ++$count > 4;
    }
    # push @keys, $keys;
    # print "\n";
  }
                  
  # my $depth = $key_len - 1;
  my $length = scalar @keys / $key_len;
  my $index;
  NestedLoops(
    [
      part {
        $index++ / $length;
      } @keys
    ],
    sub {
      my @ind = @_;
      my $key = '';
      foreach my $i (@ind) {
        $key .= $i;
      }
      my $pad_key = '';
      my $to = $N % $key_len;
      for (my $i = 0; $i < $N - $to; $i += $key_len) {
        $pad_key .= $key;
      }
      $pad_key .= substr($key, 0, $to);
      my @pad_key = split(//, $pad_key);
      my @key = split(//, $content);

      my $plaintext = '';
      for (my $i = 0; $i < scalar @key; $i++) {
        my $a = ord($pad_key[$i]) - 97;
        my $b = ord($key[$i]) - 97;
        my $subtract = ($b - $a) % 26;
        $plaintext .= $alphabet{$subtract};
      }
      #my $number =()= $plaintext =~ /this|that|the|and|is|are|was|were|when|which|about|or|but|you|your|there/g;
      my $number =()= $plaintext =~ /$ra/g;
      if ($number > $thresh) {
        print "key: $key, plaintext: $plaintext\n\n";
      }
    }
  );

  print "blah\n";
}
sub friedman {
  %hash = @_;
  foreach my $letter (split //, $content) {
    $hash{$letter}++;
  }

  my $sum = 0;
  foreach my $key (keys %hash) {
    $sum += $hash{$key} * ($hash{$key} - 1);
  }
  my $k_o = $sum / ($N * ($N - 1));
  my $k_p = 0.067;
  my $k_r = 0.0385;
  my $key_len = ($k_p - $k_r) / ($k_o - $k_r);
  #print "incidence of coincidence: $k_o\n";
  return abs($key_len);
}

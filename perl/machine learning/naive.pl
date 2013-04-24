use warnings;
use strict;
use Pod::Usage;
use Getopt::Long;
use List::Util 'shuffle';

my $folds;
GetOptions( "folds=i" => \$folds);
pod2usage(1) unless $folds;

my $root = '20/';
opendir my $dh, $root or die "Cannot open $root: $!";
my @dirs = grep { ! -d } readdir $dh;
closedir $dh;

open my $stop, "<", "stops.txt" or die "Can't open that file!  $!\n";
my %stops = ();
foreach my $sword (<$stop>) {
  chomp $sword;
  $stops{$sword} = 1;
}

my @hash = ();
# Getting each directory.
foreach my $dir (@dirs) {
  my @files = <$root$dir/*>;
  # Getting each file.
  foreach my $file (@files) {
    my %words = ();
    open my $fh, '<', "$file" or die "Can't open that file!  $!\n";
    
    my $next = 0;
    # Getting the lines of the file.
    foreach my $line (<$fh>) {
      chomp $line;
      # Trying to skip lines that are irrelevant with the email's content.
      next if $line =~ /(^(from|subject):)|in article \<|wr(i|o)tes*:$/i;
      # Trying to strip out signatures in the emails.
      #if ($line =~ /^\s*-{1,4}$/) {
      #  print $file, "\n\n\n";
      #}
      last if $line =~ /^\s*-{1,4}\s*$|^-+begin.*signature-+/i;
      $line = lc $line;   # lowercasing words
      #$line =~ s/\'|\"|\,|\.|\[|\]|\?|\!//g;
      # Only reserves spaces and letters... gets rid of numbers and anything else.
      $line =~ s/[^a-z\s]+//g;
      my @line = split(/\s+/, $line);
      foreach my $word (@line) {
        next if $stops{$word};
        
        # Binary weighting.
        $words{$word} = 1 if $word and !$words{$word};
        
        # This is for tf weighting the words...
        #if ($word and $words{$word}) {
        #  $words{$word}++;
        #}
        #elsif ($word) {
        #  $words{$word} = 1;
        #}
        
        # Splits apart @ symbols and the words.
        #if ($word =~ /\@/) {
          #my @words = split(/\@/, $word);
          #foreach my $sub_word (@words) {
          #  print $sub_word, "\n";
          #}
        #}
        #print $word, "\n";
      }
    }
    #print "$dir: <";
    $words{1} = $dir;
    my $beg = 0;
    push @hash, {%words};
    #foreach my $key (keys %words) {
    #  if ($beg == 0) {
    #    print "$key: $words{$key}";
    #    $beg = 1;
    #  }
    #  else {
    #    print ", $key: $words{$key}";
    #  }
    #}
    #print ">\n";
  }
}
@hash = shuffle(@hash);

my %sets = ();
my @test = ();
setup($folds);
split_data(\@hash, $folds);
undef @hash; # Free some memory.

# Going through each training set.
my $right = 0;
my $total = 0;
for (my $test_num = 0; $test_num < scalar @test; $test_num++) {
  my %test = %{$test[$test_num]};
  for (my $i = 1; $i <= $folds; $i++) {
    my %prob = ();
    # Going through each vector in the training set.
    for (my $j = 0; $j < scalar @{$sets{"set$i"}}; $j++) {
      my $class = $sets{"set$i"}[$j]{1};  # Grabs training set's classification.
      
      # Initiliaze the number of classes seen in training set.
      if ($prob{$class}{1}) {
        $prob{$class}{1}++;
      }
      else {
        $prob{$class}{1} = 1;
      }
      # Going through each word in our test set.
      foreach my $word (keys %test) {
        if ($sets{"set$i"}[$j]{$word}) {
          if ($prob{$class}{$word}) {
            $prob{$class}{$word}++;
          }
          else {
            $prob{$class}{$word} = 1;
          }
        }
        elsif (!$prob{$class}{$word}) {
          $prob{$class}{$word} = 0;
        }
      }
    }
    
    my $tot_class = scalar @{$sets{"set$i"}};
    my %probs = ();
    print "The actual class was: $test{1}\n";
    print "Its words:", %test, "\n";
    foreach my $key (keys %prob) {
      my $cond_prob = 1;
      my $class_size = $prob{$key}{1} + 2;
      my $priori = log($class_size / $tot_class);
      my $test = 1;
      my $how = 0;
      foreach my $word_prob (keys %{$prob{$key}}) {
        next if ($word_prob cmp "1") == 0;
        my $term_prob = $prob{$key}{$word_prob};
        if ($term_prob == 0) {
          #$term_prob = 1;
          $how++;
        }
        $cond_prob += log($term_prob + 1) / ($class_size + 2);
        $test *= $class_size;
      }
      #print "test: $test, class_size: $class_size, how_many_0: $how, words_in_test: ", scalar keys %{$prob{$key}}, "\n";
      my $probability = $priori + $cond_prob;
      $probs{$key} = $probability;
    }
    #print "tot_size: $total_size\n";
    my $chosen = 0;
    foreach my $p (sort {$probs{$b} <=> $probs{$a}} keys %probs) {
      if (!$chosen) {
      #  $right++ if $p == $test{1};
      #  $total++;
        $chosen = 1;
      }
      print "class: $p, value: $probs{$p}\n";
    }
    print "\n";
  }
}
#print "Accuracy: ", $right / $total * 100, "%\n";

# Splits the data in the number of folds... if the fold divides evenly,
# then all arrays will be same number, otherwise, the beginning sets will have more.
sub split_data {
  my ($data, $fold) = @_;
  my $set_number = 1;
  my $num_tests = 20;
  # Creating test data set.
  for (my $i = 0; $i < $num_tests; $i++) {
    push @test, @{$data}[$i];
  }
  
  # Creating training data set.
  for (my $i = $num_tests; $i < scalar(@{$data}); $i++) {
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

__END__

=head1 SYNOPSIS

[perl|./] naive.pl -f /path/to/file

=head1 OPTIONS

=item B<-f>

The file that contains your boolean function.

=head1 DESCRIPTION

This program creates a bag of words from the given file.

a 0 or 1.

=cut
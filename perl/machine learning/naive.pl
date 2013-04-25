use warnings;
use strict;
use Pod::Usage;
use Getopt::Long;
use List::Util 'shuffle';

my $folds;
my $root;
GetOptions( "folds=i" => \$folds,
            "dir=s" => \$root );
pod2usage(1) unless $folds and $root;

opendir my $dh, "$root/" or die "Cannot open $root: $!";
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
  my @files = <$root/$dir/*>;
  # Getting each file.
  foreach my $file (@files) {
    my %words = ();
    open my $fh, '<', "$file" or die "Can't open that file!  $!\n";
    
    my $next = 0;
    my $begin = 0;
    # Getting the lines of the file.
    foreach my $line (<$fh>) {
      chomp $line;
      # Trying to skip subjects that are just attached files.
      last if $line =~ /^subject.*\w+\.(zip|bmp|jpg|exe)/i;
      
      # Stripping out long path names (mainly in computer text files)...
      next if $line =~ /\>*path:\s*[\w.!]+/i;
      
      # Trying to skip lines in the document that appear to be attachments.
      if ($line =~ /^begin.*(zip|bmp|jpg|exe)|part\s*\d+\s*of\s*\d+/i) {
        $begin = 1;
        next;
      }
      elsif ($line =~ /^end(.*-{4,}.*|)$|end\s*of\s*part\s*\d+\s*of\s*\d+/i) {
        $begin = 0;
        next;
      }
      next if $begin;
      next if $line =~ /(^(from|subject):)|\<|wr(i|o)tes*:$/i;
      last if $line =~ /^\s*-{1,4}\s*$|^-+begin.*signature-+/i;
      $line = lc $line;   # lowercasing words
      # Only reserves spaces and letters... gets rid of numbers and anything else.
      $line =~ s/[^a-z\s]+//g;
      my @line = split(/\s+/, $line);
      foreach my $word (@line) {
        next if $stops{$word};
        
        # This is for tf weighting the words...
        if ($word and $words{$word}) {
          $words{$word}++;
        }
        elsif ($word) {
          $words{$word} = 1;
        }
      }
    }
    $words{1} = $dir;
    my $beg = 0;
    push @hash, {%words};
  }
}
@hash = shuffle(@hash);

my @test = ();
my %sets = ();
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
    
    my $doc_count = scalar @{$sets{"set$i"}};
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
    foreach my $key (keys %test) {
      print "$key\t" if ($key cmp 1) != 0;
    }
    print "\n";
    foreach my $key (keys %prob) {
      my $cond_prob = 1;
      my $class_size = $prob{$key}{1} + 2;
      my $priori = log($class_size / $tot_class);
      my $vocab_total = 0;
      foreach my $word_prob (keys %{$prob{$key}}) {
        $vocab_total += $prob{$key}{$word_prob};
      }
      foreach my $word_prob (keys %{$prob{$key}}) {
        next if ($word_prob cmp "1") == 0;
        my $term_prob = $prob{$key}{$word_prob};
        $cond_prob += log(($term_prob + 1) / ($vocab_total + scalar keys %{$prob{$key}}));
      }
      $probs{$key} = $cond_prob + $priori;
    }
    my $chosen = 0;
    foreach my $p (sort {$probs{$b} <=> $probs{$a}} keys %probs) {
      if (!$chosen) {
        $right++ if ($p cmp $test{1}) == 0;
        $total++;
        $chosen = 1;
      }
      print "class: $p, value: $probs{$p}\n";
    }
    print "\n";
  }
}
print "Accuracy: ", $right / $total * 100, "%\n";

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

[perl|./] naive.pl -f num_of_folds -dir /path/to/newgroups

=head1 OPTIONS

=item B<-f>

The number of folds for cross validation.

=item B<-dir>

The directory where all of the newsgroups live.

=head1 DESCRIPTION

This program creates a bag of words from the 20 newsgroups folder.  It performs

some normalization features like lower casing all words and stripping out any

characters that aren't a-z or spaces.  It then uses a multinomial Naive Bayes

algorithm to calculate which newsgroup the given test document belongs to.

=cut
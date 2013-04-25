use warnings;
use strict;
use Pod::Usage;
use Getopt::Long;
use List::Util 'shuffle';

my $file;
my $thresh;
my $k;
my $verbose;

GetOptions( "f=s" => \$file,
            "thresh=i" => \$thresh,
            "k=i" => \$k,
            "v|verbose" => \$verbose);  
pod2usage(1) unless $file and $thresh and $k;

open my $fh, '<', $file or die "Can't open $file!  $!\n";
my @x = ();
my @means = ();
my @clusters = ();

while (my $line = <$fh>) {
  chomp $line;
  my @split = split(/\s+/, $line);
  push @x, [@split];
}
@x = shuffle(@x);
my $num_points = (scalar @{$x[0]}) - 1;
my %randos = ();

# Picking a random point in the dataset as our starting means.
my $range = scalar @x;
for (my $i = 0; $i < $k; $i++) {
  my $rand = int(rand($range));
  while (1) {
    if ($randos{$rand}) {
      $rand = int(rand($range));
    }
    else {
      $randos{$rand} = 1;
      last;
    }
  }
  push @means, $x[$rand];
}

my $count = 0;
while ($count++ < $thresh) { 
  @clusters = clusterize();
  @means = remean(\@clusters);
  
  if ($verbose) {
    for (my $i = 0; $i < scalar @clusters; $i++) {
      for (my $j = 0; $j < scalar @{$clusters[$i]}; $j++) {
        for (my $k = 0; $k < scalar @{$clusters[$i][$j]} - 1; $k++) {
          if ($k == 0) {
            print $clusters[$i][$j][$k];
          }
          else {
            print ", ", $clusters[$i][$j][$k];
          }
        }
        print ", ", "cluster", $i + 1, "\n";
      }
    }
    for (my $i = 0; $i < scalar @means; $i++) {
      for (my $j = 0; $j < scalar @{$means[$i]}; $j++) {
        if ($j == 0) {
          print $means[$i][$j];
        }
        else {
          print ", ", $means[$i][$j];
        }
      }
      print "\n";
    }
    print "\n";
  }
  elsif ($count == $thresh - 1) {
    for (my $i = 0; $i < scalar @clusters; $i++) {
      for (my $j = 0; $j < scalar @{$clusters[$i]}; $j++) {
        for (my $k = 0; $k < scalar @{$clusters[$i][$j]} - 1; $k++) {
          if ($k == 0) {
            print $clusters[$i][$j][$k];
          }
          else {
            print ", ", $clusters[$i][$j][$k];
          }
        }
        print ", ", "cluster", $i + 1, "\n";
      }
    }
  }
}

sub remean {
  my $clusters = $_[0];
  my @means = ();
  for (my $i = 0; $i < scalar @{$clusters}; $i++) {
    my @mean = ();
    my $cluster_size = scalar @{$clusters->[$i]};
    my $num_points = (scalar @{$clusters->[$i][0]}) - 1;
    for (my $k = 0; $k < $num_points; $k++) {
      for (my $j = 0; $j < $cluster_size; $j++) {
        $mean[$k] += $clusters->[$i][$j][$k];
      }
      $mean[$k] /= $cluster_size;
    }
    push @means, [@mean];
  }
  return @means;
}

sub clusterize {
  my @clusters;
  for (my $i = 0; $i < scalar @x; $i++) {
    my $cluster = distance(\@{$x[$i]}, \@means);
    push @{$clusters[$cluster]}, $x[$i];
  }
  return @clusters;
}

sub distance {
  my ($ref_x, $ref_means) = @_;
  my $cluster;
  my $fin_dist = 0;
  for (my $i = 0; $i < $k; $i++) {
    my $dist = 0;
    for (my $j = 0; $j < $num_points; $j++) {
      $dist += abs($ref_x->[$j] - $ref_means->[$i][$j]) ** 2;
    }
    $dist = sqrt($dist);
    if ($fin_dist == 0 || $dist < $fin_dist) {
      $fin_dist = $dist;
      $cluster = $i;
    }
  }
  return $cluster;
}


__END__

=head1 SYNOPSIS

[perl|./] kMeans.pl -f [/path/to/file] -thresh [#] -k [#] [-v|verbose]

=head1 OPTIONS

=over 4

=item B<-f>

The file that has your clustering data.

=item B<-k>

The number of clusters in the data.

=item B<-thresh>

The threshold number for how long the k-Means algorithm will iterate.

=item B<-v|verbose>

The verbose flag will print all of the iterations that occur.  If not specified,
only the final clusters will print out.

=back

=head1 DESCRIPTION

This program is an implementation of the k-Means algorithm.

=cut
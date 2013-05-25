use strict;
use warnings;
use Log::Log4perl qw(:easy);
use Net::Jabber::Bot;

my $forum1 = "blahblahblah";
my @forums = ($forum1);
my $alias = "BeepBot";

my %alerts_sent;
my %next_alert_time;
my %next_alert_increment;

my %forums_and_responses;
foreach my $forum (@forums) {
	my $responses = "bot:|hey you|";
	my @response = split(/\|/, $responses);
  push @response, "" if ($responses =~ m/\|\s*$/);
  $forums_and_responses{$forum} = \@response;
}

my $bot = Net::Jabber::Bot->new({
	server => 'jabber.org',
	conference_server => 'conference.jabber.org',
	username => 'jefharkay',
	password => 'JackJohnson',
	alias => $alias,
	message_function => \&new_bot_message,
	background_function => \&background_checks,
	loop_sleep_time => 20,
	process_timeout => 5000,
	forums_and_responses => \%forums_and_responses,
	ignore_server_messages => 1,
	ignore_self_messages => 1,
	out_messages_per_second => 5,
	max_message_size => 1000,
	max_messages_per_hour => 1000
});

foreach my $forum (@forums) {
	$bot->SendGroupMessage($forum, "$alias logged into forum $forum.");
}

$bot->Start();
DEBUG("Danger Will Robinson, Danger!!");
exit;

sub background_checks {
	my $bot = shift;
	my $counter = shift;
}

sub new_bot_message {
	my %bot_message = @_;

	$bot_message{'sender'} = $bot_message{'from_full'};
	$bot_message{'sender'} =~ s{^.+\/([^\/]+)$}{$1};

	my ($command, @options) = split(' ', $bot_message{body});
	$command = lc($command);

	my %command_actions;
	$command_actions{'subject'} = \&bot_change_subject;
	$command_actions{'say'} = \&bot_say;
	$command_actions{'unknown'} = \&bot_unknown_command;

	if (defined $command_actions{$command}) {
		$command_actions{$command}->(\%bot_message, @options);
	}
	else {
		print "here!";
		$command_actions{'unknown'}->(\%bot_message, @options)
	}
}

sub bot_change_subject {
	my %bot_message = %{shift @_};
	my $new_subject = join " ", @_;

	my $bot = $bot_message{bot_object};
	my $reply_to = $bot_message{reply_to};

	if ($bot_message{type} ne 'groupchat') {
		$bot->SendJabberMessage($reply_to,
														"Sorry, I can't change subject outside a forum!",
														$bot_message{type});
		WARN("Denied subject change from $reply_to ($new_subject)");
		return;
	}

	$bot->SendGroupMessage($reply_to, "Setting forum subject to $new_subject.");
	$bot->SetForumSubject($reply_to, $new_subject);
	return;
}

sub bot_say {
	my %bot_message = %{shift @_};
	my $to_say = join " ", @_;

	my $bot = $bot_message{bot_object};
	$bot->SendJabberMessage($bot_message{reply_to},
													$to_say,
													$bot_message{type});
}

sub bot_unknown_command {
	my %bot_message = %{shift @_};
	my @options = @_;

	my $bot = $bot_message{bot_object};
	my $reply_to = $bot_message{reply_to};
	my $type = $bot_message{type};

	return if ($bot_message{sender} eq $alias);

	my $msg;
	if ($bot_message{body} =~ /do you\s/i) {
		my @split_msg = split(/do you\s/, $bot_message{body});
		$split_msg[1] =~ s/your/my/;
		$split_msg[1] =~ s/\?/\./;
		$msg = "No, I do not $split_msg[1]";
	}
	elsif ($bot_message{body} =~ /$alias/i) {
	  $msg = "Yes, $bot_message{sender}?";
	}
	else {
		$msg = "Sorry, $bot_message{sender}, I don't know what the heck you're asking me.";
	}
	$bot->SendJabberMessage($reply_to,
													$msg,
													$type);
}

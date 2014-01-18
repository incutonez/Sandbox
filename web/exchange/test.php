<?php
  date_default_timezone_set('America/Denver');
  $date = $_POST['date'];
  $file_handle = fopen("creds", "r");
  $login = trim(preg_replace('/\s+/', '', fgets($file_handle)));
  $password = trim(preg_replace('/\s+/', '', fgets($file_handle)));
  fclose($file_handle);
  $client = new SoapClient('Services.wsdl',
                  array('login' => $login,
                        'password' => $password));

  $GetUserAvailability = new stdClass();
  
  // TimeZone definition
  $tz = $GetUserAvailability->TimeZone = new stdClass();
  $tz->Bias = "420";
  
  // StandardTime definition
  $st = $tz->StandardTime = new stdClass();
  $st->Bias = "0";
  $st->Time = "02:00:00";
  $st->DayOrder = "5";
  $st->Month = "10";
  $st->DayOfWeek = "Sunday";
  
  // DaylightTime definition
  $dt = $tz->DaylightTime = new stdClass();
  $dt->Bias = "-60";
  $dt->Time = "02:00:00";
  $dt->DayOrder = "1";
  $dt->Month = "4";
  $dt->DayOfWeek = "Sunday";
  
  
  // Rooms as email addrs here... have to set this
  $rooms = array();
  $emailDomain = '@email.com';
  
  $mbd = array();
  for ($i = 0; $i < count($rooms); $i++) {
    $mbd[] = array(
      'Email' => array(
        'Address' => $rooms[$i] . $emailDomain
      ),
      'AttendeeType' => 'Optional'
    );
  }
  // MailboxDataArray definition (basically what we care about)
  $GetUserAvailability->MailboxDataArray = array(
    'MailboxData' => $mbd
  );

  // FreeBusyViewOptions definition
  $fbvo = $GetUserAvailability->FreeBusyViewOptions = new stdClass();
  $fbvo->MergedFreeBusyIntervalInMinutes = "60";
  $fbvo->RequestedView = "DetailedMerged";
  
  // TimeWindow definition
  $tw = $fbvo->TimeWindow = new stdClass();
  $tw->StartTime = $date . "T00:00:00";
  $tw->EndTime = $date . "T23:59:59";

  // Get the result from the SoapClient WSDL
  $res = $client->GetUserAvailability($GetUserAvailability);
  
  // Go down to what we care about... starting at FreeBusyResponse
  $avail = $res
    ->FreeBusyResponseArray
    ->FreeBusyResponse;
  
  $obj = array();
  // Loop through each room response
  for ($i = 0; $i < count($avail); $i++) {
    $room = array();
    if (property_exists($avail[$i], 'FreeBusyView')) {
      if (property_exists($avail[$i]->FreeBusyView, 'CalendarEventArray')) {
        if (property_exists($avail[$i]->FreeBusyView->CalendarEventArray, 'CalendarEvent')) {
          $events = $avail[$i]->FreeBusyView->CalendarEventArray->CalendarEvent;
          // Loop through all calendar events for that room
          if (!empty($events) && count($events) > 1) {
            for ($j = 0; $j < count($events); $j++) {
              $event = $events[$j];
              $start = $event->StartTime;
              $end = $event->EndTime;
              $subject = $event->CalendarEventDetails->Subject;
              $roomObj = array();
              $roomObj['subject'] = $subject;
              $roomObj['startDate'] = $start;
              $roomObj['endDate'] = $end;
              $room[] = $roomObj;
            }
          }
          else {
            $start = strtotime($events->StartTime);
            $end = strtotime($events->EndTime);
            $subject = $events->CalendarEventDetails->Subject;
          }
        }
      }
    }
    $obj[] = array("name" => $rooms[$i], "info" => $room);
  }
  echo json_encode($obj);

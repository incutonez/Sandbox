<?php
  $file_handle = fopen("creds", "r");
  $login = trim(preg_replace('/\s+/', '', fgets($file_handle)));
  $password = trim(preg_replace('/\s+/', '', fgets($file_handle)));
  fclose($file_handle);
  $client = new SoapClient('Services.wsdl',
                  array('login' => $login,
                        'password' => $password));
  
  $FindItem->Traversal = "Shallow";
  $FindItem->ItemShape->BaseShape = "AllProperties";
  $FindItem->ParentFolderIds->DistinguishedFolderId->Id = "calendar";
  $FindItem->CalendarView->StartDate = "2013-09-01T00:00:00Z";
  $FindItem->CalendarView->EndDate = "2013-09-30T00:00:00Z";
  $result = $client->FindItem($FindItem);
  //$Room->TimeZone
  //echo $client->GetUserAvailability();
  #$calendaritems = $result
  #  ->ResponseMessages
  #  ->FindItemResponseMessage
  #  ->RootFolder
  #  ->Items
  #  ->CalendarItem;

  $GetUserAvailability->TimeZone->Bias = "360";

  $GetUserAvailability->TimeZone->StandardTime->Bias = "0";
  $GetUserAvailability->TimeZone->StandardTime->Time = "02:00:00";
  $GetUserAvailability->TimeZone->StandardTime->DayOrder = "5";
  $GetUserAvailability->TimeZone->StandardTime->Month = "10";
  $GetUserAvailability->TimeZone->StandardTime->DayOfWeek = "Sunday";

  $GetUserAvailability->TimeZone->DaylightTime->Bias = "-60";
  $GetUserAvailability->TimeZone->DaylightTime->Time = "02:00:00";
  $GetUserAvailability->TimeZone->DaylightTime->DayOrder = "1";
  $GetUserAvailability->TimeZone->DaylightTime->Month = "4";
  $GetUserAvailability->TimeZone->DaylightTime->DayOfWeek = "Sunday";

  $email = "insert_email_addr_here";

  $GetUserAvailability->MailboxDataArray->MailboxData->Email->Address = $email;
  $GetUserAvailability->MailboxDataArray->MailboxData->AttendeeType = "Optional";

  $GetUserAvailability->FreeBusyViewOptions->TimeWindow->StartTime = "2013-09-26T00:00:00";
  $GetUserAvailability->FreeBusyViewOptions->TimeWindow->EndTime = "2013-09-26T23:59:59";
  $GetUserAvailability->FreeBusyViewOptions->MergedFreeBusyIntervalInMinutes = "60";
  $GetUserAvailability->FreeBusyViewOptions->RequestedView = "DetailedMerged";

  $res = $client->GetUserAvailability($GetUserAvailability);

  $avail = $res
    ->FreeBusyResponseArray
    ->FreeBusyResponse
    ->FreeBusyView
    ->CalendarEventArray;

  #foreach($calendaritems as $item) { 
   # echo $item->Subject, "<br />";
  #}

  foreach ($avail as $item) {
    for ($i = 0; $i < count($item); $i++) {
      echo $item[$i]->CalendarEventDetails->Subject, "<br />";
    }
  }

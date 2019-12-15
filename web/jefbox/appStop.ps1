function killTask($processId) {
  if ($processId -eq $null) {
    "Please enter a pid."
    return
  }
  taskkill.exe /F /PID $processId
}

function findTaskByPort($portNumber) {
  if ($portNumber -eq $null) {
    "Please enter a port number."
    return
  }
  netstat -ano | findstr $portNumber
}

function killTaskByPort($portNumber) {
  $netStat = findTaskByPort($portNumber)
  $PortNumRegex = [regex]"(\d+)$";
  $portnum = $PortNumRegex.Match($netstat);
  killTask $portnum.captures[0].Value;
}

killTaskByPort(1337)
killTaskByPort(7777)
killTaskByPort(8888)
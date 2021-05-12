$workspace = "$home\workspace"
$sandbox = "$workspace\Sandbox"
$vueApp = "$sandbox\typescript-node-vue"
$zeldaU = "$workspace\ZeldaU"
$jefbox = "$workspace\applications\web\jefbox"

function pruneGit() {
  git fetch --prune origin
}

function branchCreate($branch) {
  git checkout -b $branch
}

function branchDelete($branch, $force = $false) {
  git branch -d $branch
  if ($force -eq $true) {
    git push origin --delete $branch
  }
}

function branchRename($branch) {
  git branch -m $branch
}

function SenchaCmdProps() {
  sencha ant .props
}

function AppWatch {
  param
  (
    [string]$dir,
    [string]$env,
    [string]$port
  )
  if ($dir -eq '') {
    $dir = "$jefbox\ui"
  }
  if ($port -ne '') {
    $port = "--port $port"
  }
  cd $dir
  Invoke-Expression "sencha app watch $port $env"
}

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
  if ($netStat -eq $null -Or $netStat.length -lt 0) {
    return;
  }
  $PortNumRegex = [regex]"(\d+)$";
  $portnum = $PortNumRegex.Match($netstat[$netStat.length -1]);
  killTask $portnum.captures[0].Value;
}

function playlistGta($playlist) {
  foreach($line in Get-Content $playlist) {
    if ($line -match 'MyCloudEx2Ultra') {
      $path = $line -replace '\\\\MyCloudEx2Ultra\\Public\\Shared Music\\', ''
      $path = $path -replace '\\', '_'
      $path = "C:\Users\incut\Documents\Rockstar Games\GTA V\User Music\$path"
      echo $path
      New-Item -ItemType SymbolicLink -Path "$path" -Target $line
    }
  }
}
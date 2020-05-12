# In order to run, you may have to allow custom scripts... Set-ExecutionPolicy -ExecutionPolicy RemoteSigned
# Taken from https://superuser.com/questions/108207/how-to-run-a-powershell-script-as-administrator
param([switch]$Elevated)

function Test-Admin {
  $currentUser = New-Object Security.Principal.WindowsPrincipal $([Security.Principal.WindowsIdentity]::GetCurrent())
  $currentUser.IsInRole([Security.Principal.WindowsBuiltinRole]::Administrator)
}

if ((Test-Admin) -eq $false)  {
    if ($elevated) 
    {
        # tried to elevate, did not work, aborting
    } 
    else {
        Start-Process powershell.exe -Verb RunAs -ArgumentList ('-noprofile -noexit -file "{0}" -elevated' -f ($myinvocation.MyCommand.Definition))
}

exit
}

'running with full privileges'

# Taken from https://stackoverflow.com/a/25690250/1253609
Function FileBrowser([string] $initialDirectory = 'Desktop', [bool] $foldersOnly = $false, [string] $description) {
    [System.Reflection.Assembly]::LoadWithPartialName("System.windows.forms") | Out-Null
    if ($foldersOnly -eq $true) {
      $Browser = New-Object System.Windows.Forms.FolderBrowserDialog
      if ($initialDirectory) {
        $Browser.SelectedPath = $initialDirectory
      }
      if ($description) {
        $Browser.Description = $description
      }
    }
    else {    
      $Browser = New-Object System.Windows.Forms.OpenFileDialog
      $Browser.filter = 'All files (*.*)|*.*'
      if ($initialDirectory) {
        $Browser.initialDirectory = $initialDirectory
      }
    }
    [void] $Browser.ShowDialog()
    if ($foldersOnly) {
      return $Browser.SelectedPath
    }
    return $Browser.FileName
}

function playlistGta($playlist) {
  foreach($line in Get-Content $playlist) {
    # Winamp adds some weird metadata to m3u8 files
    if (!($line -match "^#")) {
      $a = Get-Item -LiteralPath $line
      # Replace any slashes, so we don't attempt to create new dirs
      $path = $a.FullName.Replace('\', "_")
      # Unfortunately, we have to replace [ and ] with three tildas before it... -Target doesn't use literal pathing like -Path
      # See also https://github.com/PowerShell/PowerShell/issues/6232
      $a = $a.FullName.Replace('[', "```[")
      $a = $a.Replace(']', "```]")
      New-Item -ItemType SymbolicLink -Path "$path" -Target "$a"
    }
  }
}

# Make sure admin user can access network drive... https://stackoverflow.com/a/4777229
net use Z: '\\MyCloudEx2Ultra\Public'
$gtaLocation = FileBrowser "$env:userprofile\Documents" $true 'Select GTA V User Music Directory'
$playlist = FileBrowser 'Z:\Shared Music\Playlists\Playlists'
cd $gtaLocation
playlistGta "$playlist"
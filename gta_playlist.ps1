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
Function Get-Folder([string] $initialDirectory = 'Desktop') {
    [System.Reflection.Assembly]::LoadWithPartialName("System.windows.forms") | Out-Null
    $Browser = New-Object System.Windows.Forms.OpenFileDialog
    if ($initialDirectory) {
      $Browser.initialDirectory = $initialDirectory
    }
    $Browser.filter = 'All files (*.*)|*.*'
    [void] $Browser.ShowDialog()
    return $Browser.FileName
}

function playlistGta($playlist) {
  foreach($line in Get-Content $playlist) {
    if ($line -match 'MyCloudEx2Ultra') {
      $a = Get-Item -LiteralPath $line
      $path = $a.FullName -replace '\\\\MyCloudEx2Ultra\\Public\\Shared Music\\', ""
      $path = $path.Replace('\', "_")
      $a = $a.FullName.Replace('[', "```[")
      $a = $a.Replace(']', "```]")
      New-Item -ItemType SymbolicLink -Path "$path" -Target "$a"
    }
  }
}

$playlist = Get-Folder('Z:\Shared Music\Playlists\Playlists')
cd 'C:\Users\incut\Documents\Rockstar Games\GTA V\User Music'
playlistGta "$playlist"
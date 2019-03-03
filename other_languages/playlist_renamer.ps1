$playlistFile = 'Faves.wpl'
$masterList = Get-Content -Path 'rename_list.txt'
$playlist = Get-Content -Path $playlistFile
$outFilePath = 'blah2.txt'
$wStream = New-Object IO.FileStream $outFilePath,'Create','Write'
$sWriter = New-Object System.IO.StreamWriter $wStream
for($i = 0; $i -le $masterList.Length; $i++) {
  $line = $masterList[$i]
  if ($line -match '^Rewriting\.\.\.') {
    $old = [Security.SecurityElement]::Escape($masterList[++$i])
    $new = [Security.SecurityElement]::Escape($masterList[++$i])
    $found = $playlist | Select-String -Pattern $old -SimpleMatch -AllMatches
    if ($found) {
      if ($found.count -gt 1) {
        $dupes = ("$found" | Select-String -Pattern 'tid="\{(\w{8}-\w{4}-\w{4}-\w{4}-\w{12})\}"' -AllMatches).Matches.Value | Select -uniq
        if ($dupes.count -eq 1) {
          "Duplicate $old"
        }
        else {
          "Manual change required $old`n"
        }
      }
      elseif ("$found" -ne "$new") {
        $playlist = $playlist.replace("$old", "$new")
        $sWriter.WriteLine("Renaming...`n$old`n$new`n")
      }
    }
  }
}
$sWriter.close()
$playlist | Set-Content $playlistFile
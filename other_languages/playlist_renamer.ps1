$currentDir = (Get-Item -Path ".\").FullName
$fileNames = @('80s.wpl', 'Dance Dance.wpl', 'emo.wpl', 'Faves.wpl', 'Get Ready.wpl', 'Morning.wpl')
$masterList = Get-Content -Path 'C:\Users\jharkay\Desktop\music_renamed.txt'
$outFilePath = "$currentDir\blah2.txt"
$wStream = New-Object IO.FileStream $outFilePath,'Create','Write'
$sWriter = New-Object System.IO.StreamWriter $wStream
$files = @{}

foreach($file in $fileNames) {
  $files[$file] = Get-Content -Path "$currentDir\$file" -Raw
}
$newFiles = $files.Clone()

for($i = 0; $i -le $masterList.Length; $i++) {
  $line = $masterList[$i]
  if ($line -match '^Rewriting\.\.\.') {
    $old = [Security.SecurityElement]::Escape($masterList[++$i])
    $new = [Security.SecurityElement]::Escape($masterList[++$i])
    foreach ($file in $files.Keys) {
      $playlist = $files[$file]
      $found = $playlist.Contains($old)
      if ($found) {
        if ($found.count -gt 1) {
          $dupes = ("$found" | Select-String -Pattern 'tid="\{(\w{8}-\w{4}-\w{4}-\w{4}-\w{12})\}"' -AllMatches).Matches.Value | Select -uniq
          if ($dupes.count -eq 1) {
            "Duplicate $file : $old"
          }
          else {
            "Manual change required $file : $old`n"
          }
        }
        elseif ("$found" -ne "$new") {
          $newFiles[$file] = $playlist.replace("$old", "$new")
          $sWriter.WriteLine("Renaming...`n$old`n$new`n")
        }
      }
    }
    $files = $newFiles.Clone()
  }
}
$sWriter.close()
foreach ($file in $files.Keys) {
  $files[$file] | Set-Content "$file"
}
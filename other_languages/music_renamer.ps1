# if it includes the explicit, album version, lp version, yyyy digital remaster
# can't have \ / : * ? " < > |
# spaces at end of title name
# not having track number... might be able to fix that
# noDRM not stripping out [NoDRM]-Bitch Went Nuts 
Import-Module taglib
$include=@("*.mp3","*.m4a", "*.wma", "*.wav", "*.m4p", "*.flac", "*.mp4")
$badTitleChars='\s*\(?\[?(original)?(album version|lp version|(\d\d\d\d)*\s*digital remaster|explicit|dc[\d]+)\]?\)?|\s+$'
$replaceChars='[\\/:*?"<>|]'
$sw = [Diagnostics.Stopwatch]::StartNew()
$objShell = New-Object -ComObject Shell.Application
$missingTitles = @()
$badTitles = @()
$FormatEnumerationLimit=-1
$outFilePath = "C:\Users\jef\Desktop\blah.txt"
$inFilePath = "F:\Shared Music"
#$inFilePath = "C:\Users\jharkay\Desktop\music"
$wStream = New-Object IO.FileStream $outFilePath,'Create','Write'
$sWriter = New-Object System.IO.StreamWriter $wStream
echo "Starting loading files..."
foreach($file in Get-ChildItem $inFilePath -file -recurse -include $include) 
{
  $objFolder = $objShell.namespace($file.directory.fullname)
  $item = $objFolder.items().item($file.name)
  $trackName = $objFolder.getDetailsOf($item, 21);
  $fileNameOriginal = $file.name
  if ($trackName) {
    $trackNumber = $item.ExtendedProperty("track")
    $extension = $file.Extension
    $trackName = $trackName -replace $replaceChars,''
    if ($trackNumber) {
      if ([convert]::ToInt32($trackNumber, 10) -lt 10) {
        $trackNumber = "0$trackNumber"
      }
      $trackNumber = "$trackNumber "
    }
    $output = "$trackNumber$trackName$extension"
    if ($trackName -match $badTitleChars) {
      $trackName = $trackName -replace $badTitleChars,''
      $output = "$trackNumber$trackName$extension"
      $tag = [TagLib.File]::Create($file.FullName)
      if ($tag) {
        $tag.tag.title = $trackName
        #$tag.save()
      }
      $badTitles += "$fileNameOriginal`n$output`n$trackName`n"
    }
    elseif ($fileNameOriginal -ne $output) {
      $sWriter.WriteLine("$fileNameOriginal`n$output`n")
    }
  }
  else {
    $trackName = $fileNameOriginal -replace $badTitleChars,''
    $tag = [TagLib.File]::Create($file.FullName)
    if ($tag) {
      $tag.tag.title = $trackName
      #$tag.save()
    }
    $missingTitles += "$fileNameOriginal`n$trackName`n"
  }
}
$sWriter.WriteLine("BAD TITLES`n$($badTitles -join "`n")")
$sWriter.WriteLine("MISSING TITLES`n$($missingTitles -join "`n")")
$sWriter.close()
echo "Done processing files..."
$sw.stop()
$sw.elapsed
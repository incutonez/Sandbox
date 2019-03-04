# if it includes the explicit, album version, lp version, yyyy digital remaster
# can't have \ / : * ? " < > |
# spaces at end of title name
# not having track number... might be able to fix that
# Fix issue with using Track x, etc.
# 01 Symphonie No. 5 1. Allegro Con Brio.wma
# 01 Track 1.wma
# also look for (album)
# (stereo) and (the stereo mix)
# (Digitally Remastered
# (Remastered
Import-Module taglib
$include=@("*.mp3","*.m4a", "*.wma", "*.wav", "*.m4p", "*.flac", "*.mp4")
$badTitleChars='\s*\(?\[?(original)?(album(\sversion)?|(full)?\s?lp version|\((the\s)?stereo(\smix)?\)|\(.*remaster.*|explicit|dc[\d]+)\]?\)?|\s+$'
$replaceChars='[\\/:*?"<>|]'
$extensions = '\.(mp3|m4a|wma|wav|m4p|flac|mp4)$'
$sw = [Diagnostics.Stopwatch]::StartNew()
$objShell = New-Object -ComObject Shell.Application
$missingTitles = @()
$badTitles = @()
$badTitlesAndTracks = @()
$FormatEnumerationLimit=-1
$outFilePath = "C:\Users\jharkay\Desktop\music_renamed.txt"
$inFilePath = "Z:\Shared Music"
#$inFilePath = "C:\Users\jharkay\workspace\personal\applications\other_languages\test"
$wStream = New-Object IO.FileStream $outFilePath,'Create','Write'
$sWriter = New-Object System.IO.StreamWriter $wStream
$shouldSave = $true
echo "Starting loading files..."
$startingWrite = 0
function doSave($file, $trackName, $output) {
  if ($shouldSave -eq $true) {
    $tag = [TagLib.File]::Create($file.FullName)
    if ($tag) {
      $tag.tag.title = $trackName
      try {
        $startingWrite = 0
        $tag.save()
        if ($output) {
          doRename $file $output
        }
      }
      catch {
        # Prevent infinite looping
        if ($startingWrite -ne 1) {
          $startingWrite = 1
          $tag.TagTypes
          $tag.tag
          $tag.RemoveTags($tag.TagTypes)
          $tag.save()
          doSave $file $trackName $output
        }
        else {
          $startingWrite = 0
        }
      }
    }
  }
}

function doRename($file, $trackName) {
  if ($shouldSave -eq $true) {
    Rename-Item -LiteralPath $file.FullName -NewName "$trackName"
  }
}

foreach($file in Get-ChildItem $inFilePath -file -recurse -include $include) 
{
  $directory = $file.directory
  # Ignore what's in the Mix CDs dir
  if ($directory.parent.name -notcontains 'Mix CDs' -and $directory.parent.parent -and $directory.parent.parent.name -notcontains 'Mix CDs') {
    $objFolder = $objShell.namespace($directory.fullname)
    $item = $objFolder.items().item($file.name)
    $trackName = $objFolder.getDetailsOf($item, 21);
    $fileNameOriginal = $file.name
    if ($trackName) {
      $trackNumber = $item.ExtendedProperty("track")
      $trackName = $trackName -replace $replaceChars,''
      $trackName = $trackName -replace $extensions,''
      $extension = $file.Extension
      if ($trackNumber) {
        if ([convert]::ToInt32($trackNumber, 10) -lt 10) {
          $trackNumber = "0$trackNumber"
        }
        $trackNumber = "$trackNumber "
      }
      $output = "$trackNumber$trackName$extension"
      if ($trackName -match "Track \d+") {
        if ($fileNameOriginal -match "Track \d+") {
          #$sWriter.WriteLine("Rewriting Bad Title and Track...`n$fileNameOriginal`n$output`n")
          $badTitlesAndTracks += "$($item.ExtendedProperty('artist')) - $fileNameOriginal"
        }
        else {
          $trackName = $fileNameOriginal -replace "^\d\d\s|\.(wma|mp3)$"
          $output = "$trackNumber$trackName$extension"
          doSave $file $trackName $output
          $sWriter.WriteLine("Rewriting Bad Title with Track...`n$fileNameOriginal`n$output`n")
          #$badTitles += "$fileNameOriginal`n$output`n$trackName`n"
        }
      }
      elseif ($trackName -match $badTitleChars) {
        $trackName = $trackName -replace $badTitleChars,''
        $output = "$trackNumber$trackName$extension"
        doSave $file $trackName $output
        #$badTitles += "$fileNameOriginal`n$output`n$trackName`n"
        $sWriter.WriteLine("Rewriting Bad Title...`n$fileNameOriginal`n$output`n")
      }
      elseif ($fileNameOriginal -ne $output) {
        $sWriter.WriteLine("Rewriting...`n$fileNameOriginal`n$output`n")
        doRename $file $output
      }
    }
    else {
      $trackName = $fileNameOriginal -replace $badTitleChars,''
      $trackName = $trackName -replace $extension,''
      doSave $file $trackName
      $sWriter.WriteLine("Rewriting Missing Title...`n$fileNameOriginal`n$trackName`n")
      #$missingTitles += "$fileNameOriginal`n$trackName`n"
    }
  }
}
#$sWriter.WriteLine("BAD TITLES`n$($badTitles -join "`n")")
#$sWriter.WriteLine("MISSING TITLES`n$($missingTitles -join "`n")")
$sWriter.WriteLine("BAD TITLES AND TRACKS`n$($badTitlesAndTracks -join "`n")")
$sWriter.close()
echo "Done processing files..."
$sw.stop()
$sw.elapsed
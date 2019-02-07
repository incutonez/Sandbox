# if it includes the album name, artist name, (dc), nodrm, album version, lp version, digital remaster
$include=@("*.mp3","*.m4a", "*.wma", "*.wav", "*.m4p", "*.flac", "*.mp4")
$sw = [Diagnostics.Stopwatch]::StartNew()
$objShell = New-Object -ComObject Shell.Application
$table = @()
$FormatEnumerationLimit=-1
$outFilePath = "C:\Users\jharkay\Desktop\blah2.txt"
$inFilePath = "C:\Users\jharkay\Desktop\music"
$wStream = New-Object IO.FileStream $outFilePath,'Create','Write'
$sWriter = New-Object System.IO.StreamWriter $wStream
$i = 0
echo "Starting loading files..."
foreach($file in Get-ChildItem $inFilePath -file -recurse -include $include) 
{
  if ($i++ -eq 0) {
    echo "Done loading files..."
    $sw.elapsed
  }
  $objFolder = $objShell.namespace($file.directory.fullname)
  $item = $objFolder.items().item($file.name)
  # artist name
  #$artist = $objFolder.getDetailsOf($item, 13);
  # works, but I'm not sure if it's valid?
  #$artist = $item.ExtendedProperty('artist')
  # album name
  #$album = $objFolder.getDetailsOf($item, 14);
  # works, but I'm not sure if it's valid?
  #$album = $item.ExtendedProperty("album")
  # track name
  $trackName = $objFolder.getDetailsOf($item, 21);
  $fileNameOriginal = $file.name
  $fileName = $fileNameOriginal -replace [regex]::escape($trackName),""
  #if ($fileName -match "$artist|$album|album|nodrm|\(dc[^)]*|lp version|remaster") {
  # Doesn't seem to work?
  #$trackName = $item.ExtendedProperty("title")
  # track number
  #$trackNumber = $objFolder.getDetailsOf($item, 26);
  # Doesn't seem to work?
  $trackNumber = $item.ExtendedProperty("track")
  $extension = $file.Extension
  if ($trackNumber) {
    if ([convert]::ToInt32($trackNumber, 10) -lt 10) {
      $trackNumber = "0$trackNumber"
    }
    $trackNumber = "$trackNumber "
  }
  #$table += @{Before="$fileNameOriginal"; After="$trackNumber$trackName$extension"}
  $sWriter.WriteLine("$fileNameOriginal`n$trackNumber$trackName$extension`n")
  #}
}
$sWriter.close()
echo "Done processing files..."
#$(foreach ($ht in $table) {
#  New-Object psobject -Property $ht
#})| Format-Table -Wrap -AutoSize | Out-File "blah.txt"
#$table | Out-File "blah2.txt"
#echo "done"
$sw.stop()
$sw.elapsed
$(document).ready(function() {
  var reader = new FileReader();
  var digits = /[\d]+/g;
  
  $('#file').on('change', function(event) {
    var file = event.target.files[0];
    reader.onload = function(event) {
      if (event.target.readyState == FileReader.DONE) {
        var content = event.target.result;
        var match = content.match(digits);
        var sum = 0;
        for (var i = 0; i < match.length; i++) {
          sum += parseInt(match[i], 10);
        }
        $('#output').text(sum);
      }      
    };
    reader.readAsText(file);
  });
});
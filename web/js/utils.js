var isObjectEmpty = function(obj) {
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
      return false;
    }
  }
  return true;
};

// polling function... basically an example for me to keep
/*(function poll() {
  setTimeout(function() {
    $.ajax({
      url: 'index.php/api/users',
      type: 'GET',
      dataType: 'XML',
      success: function(data) {
        console.log(data);
      },
      complete: poll,
      timeout: 10000  // only sets the timeout for response from the server
    });
  }, 10000);
})();*/
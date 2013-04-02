$(document).ready(function() {
  $('.iconContainer').on('mouseover', '.trashIcon', function(e) {
    $(e.target).addClass('border');
  });
  
  $('.iconContainer').on('mouseout', '.trashIcon', function(e) {
    $(e.target).removeClass('border');
  });
  
  $('.iconContainer').on('click', '.trashIcon', function(e) {
    $(e.target).parent().remove();
  });
});
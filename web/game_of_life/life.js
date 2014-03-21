$(document).ready(function() {
  var arr;
  // block... no change
  arr = [
    [0, 0, 0, 0],
    [0, 1, 1, 0],
    [0, 1, 1, 0],
    [0, 0, 0, 0]
  ];

  // boat... no change
  arr = [
    [0, 0, 0, 0, 0],
    [0, 1, 1, 0, 0],
    [0, 1, 0, 1, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 0, 0, 0]
  ];

  // loaf... no change
  arr = [
    [0, 0, 0, 0, 0, 0],
    [0, 0, 1, 1, 0, 0],
    [0, 1, 0, 0, 1, 0],
    [0, 0, 1, 0, 1, 0],
    [0, 0, 0, 1, 0, 0],
    [0, 0, 0, 0, 0, 0]
  ];

  // blinker (period 2)... change
  arr = [
    [0, 0, 0, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 0, 0, 0]
  ];

  // toad (period 2)... change
  arr = [
    [0, 0, 0, 0, 0, 0],
    [0, 0, 1, 1, 1, 0],
    [0, 1, 1, 1, 0, 0],
    [0, 0, 0, 0, 0, 0]
  ];

  arr = [
    [1, 1, 1, 0, 0, 1, 1, 0, 0, 0],
    [0, 1, 0, 0, 0, 1, 1, 0, 0, 0],
    [0, 0, 0, 0, 1, 1, 0, 1, 1, 1],
    [1, 1, 1, 1, 0, 0, 1, 0, 0, 0],
    [0, 0, 1, 1, 0, 0, 1, 0, 0, 0],
    [0, 1, 1, 1, 0, 0, 1, 0, 0, 0],
    [1, 0, 1, 1, 1, 0, 0, 1, 1, 0],
    [0, 1, 1, 0, 0, 0, 1, 1, 1, 0],
    [0, 1, 1, 0, 1, 0, 1, 0, 0, 0],
    [1, 0, 1, 1, 1, 0, 1, 1, 0, 1]
  ];
  var n = 50;
  arr = [];
  for (var i = 0; i < n; i++) {
    var arr2 = [];
    for (var j = 0; j < n; j++) {
      arr2.push(Math.floor(Math.random() * 2));
    }
    arr.push(arr2);
  }
  
  function getNeighborCount(neighbors) {
    var count = 0;
    for (var i = 0; i < neighbors.length; i++) {
      var neighbor = neighbors[i];
      if (neighbor) {
        count++;
      }
    }
    return count;
  }
  
  function renderNeighbors(arr) {
    var newArr = [];  
    for (var i = 0; i < arr.length; i++) {
      newArr[i] = [];
      for (var j = 0; j < arr[i].length; j++) {
        var topLeft, topMiddle, topRight,
            midLeft, mid, midRight,
            botLeft, botMiddle, botRight;
        var top = arr[i - 1];
        var middle = arr[i];
        var bottom = arr[i + 1];
        var right = j + 1;
        var left = j - 1;
        if (top) {
          topLeft = top[left];
          topMiddle = top[j];
          topRight = top[right];
        }
        if (middle) {
          middleLeft = middle[left];
          mid = middle[j];
          middleRight = middle[right];
        }
        if (bottom) {
          bottomLeft = bottom[left];
          bottomMiddle = bottom[j];
          bottomRight = bottom[right];
        }
        var count = getNeighborCount([topLeft, topMiddle, topRight, middleLeft, middleRight, bottomLeft, bottomMiddle, bottomRight]);

        // 1. Any live cell with fewer than two live neighbours dies, as if caused by under-population.
        if (count < 2) {
          newArr[i][j] = 0;
        }
        // 2. Any live cell with two or three live neighbours lives on to the next generation.
        else if (count <= 3 && mid) {
          newArr[i][j] = 1;
        }
        // 3. Any live cell with more than three live neighbours dies, as if by overcrowding.
        else if (count > 3) {
          newArr[i][j] = 0;
        }
        // 4. Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.
        else if (count === 3) {
          newArr[i][j] = 1;
        }
        // Otherwise, dead cell
        else {
          newArr[i][j] = 0;
        }
      }
    }
    var rows = [];
    for (var i = 0; i < newArr.length; i++) {
      var row = '';
      for (var j = 0; j < newArr[i].length; j++) {
        if (newArr[i][j] === 0) {
          row += '<span class="cell white"></span>';
        }
        else {
          row += '<span class="cell black"></span>';
        }
      }
      rows.push('<div class="row">' + row + '</div>');
    }
    setTimeout(function() {
      $('#board').html(rows);
      renderNeighbors(newArr);
    }, 500);
  }
  renderNeighbors(arr);
});
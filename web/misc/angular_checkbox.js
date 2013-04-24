function Blah($scope) {
  $scope.allChecks = {
    id: 'ALL',
    isChecked: true,
    children: [{
      id: 'Child 1',
      isChecked: true,
      children: [{
        id: 'Grandchild 1',
        isChecked: true
      }, {
        id: 'Grandchild 2',
        isChecked: true
      }, {
        id: 'Grandchild 1',
        isChecked: true
      }]
    }, {
      id: 'Child 2',
      isChecked: true
    }, {
      id: 'Child 3',
      isChecked: true
    }, {
      id: 'Child 4',
      isChecked: true
    }, {
      id: 'Child 5',
      isChecked: true,
      children: [{
        id: 'Grandchild 1',
        isChecked: true
      }, {
        id: 'Grandchild 2',
        isChecked: true
      }]
    }]
  };
  
  function Node(id, isChecked, parent) {
    this.id = id;
    this.isChecked = isChecked;
    this.parent = parent;
    this.children = [];
  }
  
  var parent = new Node('ALL', true, "");
  var child1 = new Node('Child 1', true, parent);
  var gchild1 = new Node('Grandchild 1', true, child1);
  var gchild2 = new Node('Grandchild 2', true, child1);
  var gchild3 = new Node('Grandchild 3', true, child1);
  child1.children.push(gchild1, gchild2, gchild3);
  var child2 = new Node('Child 2', true, parent);
  var child3 = new Node('Child 3', true, parent);
  var child4 = new Node('Child 4', true, parent);
  var gchild4 = new Node('Grandchild 4', true, child4);
  var gchild5 = new Node('Grandchild 5', true, child4);
  var gchild6 = new Node('Grandchild 6', true, child4);
  child4.children.push(gchild4, gchild5, gchild6);
  var child5 = new Node('Child 5', true, parent);
  parent.children.push(child1, child2, child3, child4, child5);
  $scope.parent = parent;
  
  function parentCheckChange(item) {
    for (var i in item.children) {
      item.children[i].isChecked = item.isChecked;
      if (item.children[i].children) {
        parentCheckChange(item.children[i]);
      }
    }
  }
  
  function childCheckChange(parent) {
    console.log(parent);
    var allChecks = true;
    for (var i in parent.children) {
      if (!parent.children[i].isChecked) {
        allChecks = false;
        break;
      }
    }
    if (allChecks) {
      parent.isChecked = true;
    }
    else {
      parent.isChecked = false;
    }
  }
  
  $scope.checkChange = function(item, parent) {
    console.log($scope.parent);
    // We're handling the ALL checkbox
    if (item.id === $scope.allChecks.id) {
      parentCheckChange(item);
    }
    // We're handling a checkbox that's getting checked
    else {
      if (item.children) {
        parentCheckChange(item);
      }
      else {
      }
      childCheckChange(parent);
    }
  };
}
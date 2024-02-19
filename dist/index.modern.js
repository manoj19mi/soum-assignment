import { useState, createElement, useEffect } from 'react';
import { v4 } from 'uuid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinusCircle, faPlusCircle } from '@fortawesome/free-solid-svg-icons';

function _extends() {
  _extends = Object.assign ? Object.assign.bind() : function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends.apply(this, arguments);
}
function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}
function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
  return arr2;
}
function _createForOfIteratorHelperLoose(o, allowArrayLike) {
  var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];
  if (it) return (it = it.call(o)).next.bind(it);
  if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
    if (it) o = it;
    var i = 0;
    return function () {
      if (i >= o.length) return {
        done: true
      };
      return {
        done: false,
        value: o[i++]
      };
    };
  }
  throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

var styles = {"treerow":"_3MASb","commonpadding":"_2VxIj"};

var TreeNode = function TreeNode(_ref) {
  var _data$isChecked, _data$isChecked2;
  var data = _ref.data,
    handleCheckboxClick = _ref.handleCheckboxClick,
    checkboxScale = _ref.checkboxScale,
    wrapperClass = _ref.wrapperClass,
    rowClass = _ref.rowClass,
    expandIconColor = _ref.expandIconColor,
    collapseIconColor = _ref.collapseIconColor,
    selectedItemClass = _ref.selectedItemClass,
    itemClass = _ref.itemClass;
  var _React$useState = useState(false),
    expanded = _React$useState[0],
    setExpanded = _React$useState[1];
  var handleToggle = function handleToggle() {
    setExpanded(!expanded);
  };
  return createElement("div", {
    className: [styles.commonpadding, wrapperClass].join(' ')
  }, createElement("div", {
    className: [styles.treerow, rowClass, data.isChecked ? selectedItemClass : itemClass].join(' ')
  }, data.values.length > 0 && createElement("div", {
    id: "toggle_" + data.label.replaceAll(" ", "_"),
    onClick: handleToggle
  }, expanded ? createElement(FontAwesomeIcon, {
    icon: faMinusCircle,
    color: expandIconColor
  }) : createElement(FontAwesomeIcon, {
    icon: faPlusCircle,
    color: collapseIconColor
  })), createElement("div", {
    className: styles.treerow,
    style: {
      paddingLeft: data.values.length == 0 ? 30 : 10
    }
  }, createElement("input", {
    type: 'checkbox',
    alt: data.label,
    checked: (_data$isChecked = data.isChecked) != null ? _data$isChecked : false,
    style: {
      transform: 'scale(' + checkboxScale + ')'
    },
    onChange: function onChange() {
      return handleCheckboxClick(data.id);
    }
  }), createElement("div", null, data.label))), expanded && createElement("div", null, data.values.length > 0 ? data.values.map(function (child, index) {
    return createElement(TreeNode, {
      key: index,
      data: child,
      handleCheckboxClick: handleCheckboxClick,
      checkboxScale: checkboxScale,
      wrapperClass: wrapperClass,
      rowClass: rowClass,
      expandIconColor: expandIconColor,
      collapseIconColor: collapseIconColor,
      selectedItemClass: selectedItemClass,
      itemClass: itemClass
    });
  }) : createElement("div", {
    className: styles.treerow
  }, createElement("input", {
    type: 'checkbox',
    alt: data.label,
    style: {
      transform: 'scale(' + checkboxScale + ')'
    },
    checked: (_data$isChecked2 = data.isChecked) != null ? _data$isChecked2 : false,
    onChange: function onChange() {
      return handleCheckboxClick(data.id);
    }
  }), createElement("div", null, data.label))));
};

var TreeView = function TreeView(_ref) {
  var data = _ref.data,
    showSelection = _ref.showSelection,
    checkboxScale = _ref.checkboxScale,
    wrapperClass = _ref.wrapperClass,
    rowClass = _ref.rowClass,
    expandIconColor = _ref.expandIconColor,
    collapseIconColor = _ref.collapseIconColor,
    selectedItemClass = _ref.selectedItemClass,
    itemClass = _ref.itemClass,
    onDataUpdated = _ref.onDataUpdated;
  var _React$useState = useState(_extends({}, data, {
      isChecked: false
    })),
    treeData = _React$useState[0],
    setTreeData = _React$useState[1];
  useEffect(function () {
    onDataUpdated(treeData);
  }, [treeData]);
  useEffect(function () {
    var addDefaultProperties = function addDefaultProperties(node) {
      node.isChecked = false;
      node.id = v4();
      node.values.forEach(function (childNode) {
        return addDefaultProperties(childNode);
      });
    };
    addDefaultProperties(treeData);
  }, []);
  var handleCheckboxClick = function handleCheckboxClick(nodeId) {
    var updateCheckedState = function updateCheckedState(node) {
      if (node.id === nodeId) {
        node.isChecked = !node.isChecked;
        node.values.forEach(function (childNode) {
          var _node$isChecked;
          return updateChildState(childNode, (_node$isChecked = node.isChecked) != null ? _node$isChecked : false);
        });
      }
      node.values.forEach(function (childNode) {
        return updateCheckedState(childNode);
      });
    };
    var updateChildState = function updateChildState(node, state) {
      node.isChecked = state;
      node.values.forEach(function (childNode) {
        return updateChildState(childNode, state);
      });
    };
    var correctParents = function correctParents(nodeId, node) {
      var parentNode = getParentNode(node, nodeId);
      while (parentNode !== null) {
        var _parentNode$id;
        parentNode.isChecked = allChildrenChecked(parentNode);
        parentNode = getParentNode(node, (_parentNode$id = parentNode.id) != null ? _parentNode$id : '');
      }
    };
    var allChildrenChecked = function allChildrenChecked(node) {
      for (var _iterator = _createForOfIteratorHelperLoose(node.values), _step; !(_step = _iterator()).done;) {
        var child = _step.value;
        if (!child.isChecked) {
          return false;
        }
      }
      return true;
    };
    var getParentNode = function getParentNode(node, childNodeId) {
      if (node.id === childNodeId) {
        return null;
      }
      for (var _iterator2 = _createForOfIteratorHelperLoose(node.values), _step2; !(_step2 = _iterator2()).done;) {
        var child = _step2.value;
        if (child.id === childNodeId) {
          return node;
        }
        var parentOfChild = getParentNode(child, childNodeId);
        if (parentOfChild !== null) {
          return parentOfChild;
        }
      }
      return null;
    };
    var updatedTreeData = _extends({}, treeData);
    updateCheckedState(updatedTreeData);
    correctParents(nodeId, updatedTreeData);
    setTreeData(updatedTreeData);
  };
  var getSelectedItems = function getSelectedItems(node, parentLabel, selectedItems) {
    if (node.isChecked) {
      if (node.values.length > 0) {
        selectedItems.push('All ' + node.label);
      } else {
        selectedItems.push((parentLabel != '' ? parentLabel + ' / ' : '') + node.label);
      }
    } else {
      node.values.forEach(function (child) {
        selectedItems = getSelectedItems(child, (parentLabel != '' ? parentLabel + ' / ' : '') + node.label, selectedItems);
      });
    }
    return selectedItems;
  };
  return createElement("div", null, createElement(TreeNode, {
    key: -1,
    data: treeData,
    handleCheckboxClick: handleCheckboxClick,
    checkboxScale: checkboxScale,
    wrapperClass: wrapperClass,
    rowClass: rowClass,
    expandIconColor: expandIconColor,
    collapseIconColor: collapseIconColor,
    selectedItemClass: selectedItemClass,
    itemClass: itemClass
  }), showSelection && createElement("div", null, createElement("ul", null, getSelectedItems(treeData, '', []).map(function (selectedItem, index) {
    return createElement("li", {
      key: index
    }, selectedItem);
  }))));
};

export { TreeView };
//# sourceMappingURL=index.modern.js.map

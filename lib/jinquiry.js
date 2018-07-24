/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./lib/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./lib/dom_node_collection.js":
/*!************************************!*\
  !*** ./lib/dom_node_collection.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("class DomNodeCollection{\n  constructor(nodes){\n    this.nodes = nodes;\n    return this;\n  }\n\n  html(string){\n    if (!string) {\n      for (let i = 0; i < this.nodes.length; i++) {\n        this.nodes[i].innerHTML = string;\n      }\n    } else {\n      return this.nodes[0].innerHTML;\n    }\n  }\n\n  empty() {\n    this.html.call(this, \"\");\n  }\n\n  append(arg){\n    for (let i = 0; i < this.nodes.length; i++) {\n      if (arg instanceof DomNodeCollection) {\n        for (let j = 0; j < arg.nodes.length; j++) {\n          this.nodes[i].innerHTML += arg.nodes[j].outerHTML;\n        }\n      } else if (arg instanceof String){\n        this.nodes[i].innerHTML += arg;\n      } else {\n        this.nodes[i].innerHTML += arg.outerHTML;\n      }\n    }\n  }\n\n  attr(attrName, value) {\n    if (!value) {\n      return this.nodes[0].getAttribute(attrName);\n    } else {\n      for (let i = 0; i < this.nodes.length; i++) {\n        this.nodes[i].setAttribute(attrName, value);\n      }\n    }\n  }\n\n  addClass(className){\n    for (let i = 0; i < this.nodes.length; i++) {\n      const oldClasses = this.nodes[i].getAttribute(\"class\");\n      let newClasses;\n      if (oldClasses === null) {\n        newClasses = className;\n      } else {\n        newClasses = oldClasses + \" \" + className;\n      }\n      this.nodes[i].setAttribute(\"class\", newClasses);\n    }\n  }\n\n  removeClass(className) {\n    for (let i = 0; i < this.nodes.length; i++) {\n      if (!className) {\n        this.nodes[i].removeAttribute('class');\n      } else {\n        const classString = this.nodes[i].getAttribute('class');\n        const oldClasses = classString.split(' ');\n        const removeClasses = className.split(' ');\n        const newClasses = [];\n\n        for (let j = 0; j < oldClasses.length; j++) {\n\n          if (!removeClasses.includes(oldClasses[j])) {\n            newClasses.push(oldClasses[j]);\n          }\n        }\n        this.nodes[i].setAttribute('class', newClasses.join(' '));\n      }\n    }\n  }\n\n  children(selector) {\n    let child = [];\n    for (let i = 0; i < this.nodes.length; i++) {\n      if (selector === undefined ) {\n        child = child.concat(Array.from(this.nodes[i].children));\n      } else {\n        let immediateChildren =  Array.from(this.nodes[i].children);\n        for (let j = 0; j < immediateChildren.length; j++) {\n          if (immediateChildren[j].matches(selector)) {\n            child.push(immediateChildren[j]);\n          }\n        }\n\n      }\n    }\n    return new DomNodeCollection(child);\n  }\n\n  parent(selector) {\n    let parents = [];\n    for (let i = 0; i < this.nodes.length; i++) {\n      const node = this.nodes[i];\n      // debugger\n      if (!parents.includes(node.parentNode)) {\n        if (!selector || node.parentNode.matches(selector)){\n          parents.push(node.parentNode);\n        }\n      }\n    }\n    return new DomNodeCollection(parents);\n  }\n\n  find(selector) {\n    let found =[];\n\n    for (let i = 0; i < this.nodes.length; i++) {\n      const node = this.nodes[i];\n      found = found.concat(Array.from(node.querySelectorAll(selector)));\n\n    }\n    return new DomNodeCollection(found);\n  }\n\n  remove(selector) {\n    let i = 0;\n    while (i < this.nodes.length ) {\n      const node = this.nodes[i];\n      if (selector === undefined || node.matches(selector)) {\n        node.remove();\n        this.nodes.splice(i,1);\n        i--;\n      }\n      i++;\n    }\n  }\n\n  on(eventType, callback) {\n    for (let i = 0; i < this.nodes.length; i++) {\n      const node = this.nodes[i];\n      node.addEventListener(eventType, callback);\n      if (node.callbacks) {\n        node.callbacks.push(callback);\n      } else {\n        node.callbacks = [callback];\n      }\n    }\n  }\n\n  off(eventType, callback) {\n    for (let i = 0; i < this.nodes.length; i++) {\n      const node = this.nodes[i];\n      if (callback) {\n        const cbIdx = node.callbacks.indexOf(callback);\n        node.removeEventListener(eventType, node.callbacks[cbIdx]);\n      } else {\n        for (let j = 0; j < node.callbacks.length; j++) {\n          node.removeEventListener(eventType, node.callbacks[j]);\n          node.callbacks = [];\n        }\n      }\n    }\n  }\n\n}\nmodule.exports = DomNodeCollection;\n\n\n//# sourceURL=webpack:///./lib/dom_node_collection.js?");

/***/ }),

/***/ "./lib/main.js":
/*!*********************!*\
  !*** ./lib/main.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const DomNodeCollection = __webpack_require__(/*! ./dom_node_collection.js */ \"./lib/dom_node_collection.js\");\n\nwindow.$l = function(arg){\n  let elementArray;\n\n  if (typeof arg === 'function') {\n    if (!window.fnArr) {\n      window.fnArr = [arg];\n    } else {\n      window.fnArr.push(arg);\n    }\n    if (document.readyState === \"interactive\" ||\n    document.readyState === 'complete') {\n      arg();\n    } else {\n      document.addEventListener(\"DOMContentLoaded\", arg);\n    }\n  } else if (typeof arg === 'string') {\n    const nodeList = document.querySelectorAll(arg);\n    elementArray = Array.from(nodeList);\n    return new DomNodeCollection(elementArray);\n\n  } else if (arg.instanceof(HTMLElement)) {\n    elementArray = Array.from(arg);\n    return new DomNodeCollection(elementArray);\n  }\n\n\n};\n\nwindow.$l.extend = function (...objects) {\n  let firstObject = objects[0];\n  for (var i = 1; i < objects.length; i++) {\n    const keys = Object.keys(objects[i]);\n    for (var j = 0; j < keys.length; j++) {\n      firstObject[keys[j]] = objects[i][keys[j]];\n    }\n  }\n  return firstObject;\n};\n\nwindow.$l.ajax = function (options) {\n\n  const defaults = {\n    success: () => {},\n    error: () => {},\n    url: window.location.href,\n    method: 'GET',\n    data: {},\n    contentType: \"application/x-www-form-urlencoded; charset=UTF-8\"\n    };\n\n  window.$l.extend(defaults, options);\n\n  const xhr = new XMLHttpRequest();\n  xhr.open(defaults.method, defaults.url);\n  xhr.onload = function () {\n\n\n  };\n  xhr.send(defaults.data);\n};\n\n\n//# sourceURL=webpack:///./lib/main.js?");

/***/ })

/******/ });
class DomNodeCollection{
  constructor(nodes){
    this.nodes = nodes;
    return this;
  }

  html(string){
    if (!string) {
      for (let i = 0; i < this.nodes.length; i++) {
        this.nodes[i].innerHTML = string;
      }
    } else {
      return this.nodes[0].innerHTML;
    }
  }

  empty() {
    this.html.call(this, "");
  }

  append(arg){
    for (let i = 0; i < this.nodes.length; i++) {
      if (arg instanceof DomNodeCollection) {
        for (let j = 0; j < arg.nodes.length; j++) {
          this.nodes[i].innerHTML += arg.nodes[j].outerHTML;
        }
      } else if (arg instanceof String){
        this.nodes[i].innerHTML += arg;
      } else {
        this.nodes[i].innerHTML += arg.outerHTML;
      }
    }
  }

  attr(attrName, value) {
    if (!value) {
      return this.nodes[0].getAttribute(attrName);
    } else {
      for (let i = 0; i < this.nodes.length; i++) {
        this.nodes[i].setAttribute(attrName, value);
      }
    }
  }

  addClass(className){
    for (let i = 0; i < this.nodes.length; i++) {
      const oldClasses = this.nodes[i].getAttribute("class");
      let newClasses;
      if (oldClasses === null) {
        newClasses = className;
      } else {
        newClasses = oldClasses + " " + className;
      }
      this.nodes[i].setAttribute("class", newClasses);
    }
  }

  removeClass(className) {
    for (let i = 0; i < this.nodes.length; i++) {
      if (!className) {
        this.nodes[i].removeAttribute('class');
      } else {
        const classString = this.nodes[i].getAttribute('class');
        const oldClasses = classString.split(' ');
        const removeClasses = className.split(' ');
        const newClasses = [];

        for (let j = 0; j < oldClasses.length; j++) {

          if (!removeClasses.includes(oldClasses[j])) {
            newClasses.push(oldClasses[j]);
          }
        }
        this.nodes[i].setAttribute('class', newClasses.join(' '));
      }
    }
  }

  children(selector) {
    let child = [];
    for (let i = 0; i < this.nodes.length; i++) {
      if (selector === undefined ) {
        child = child.concat(Array.from(this.nodes[i].children));
      } else {
        let immediateChildren =  Array.from(this.nodes[i].children);
        for (let j = 0; j < immediateChildren.length; j++) {
          if (immediateChildren[j].matches(selector)) {
            child.push(immediateChildren[j]);
          }
        }

      }
    }
    return new DomNodeCollection(child);
  }

  parent(selector) {
    let parents = [];
    for (let i = 0; i < this.nodes.length; i++) {
      const node = this.nodes[i];
      // debugger
      if (!parents.includes(node.parentNode)) {
        if (!selector || node.parentNode.matches(selector)){
          parents.push(node.parentNode);
        }
      }
    }
    return new DomNodeCollection(parents);
  }

  find(selector) {
    let found =[];

    for (let i = 0; i < this.nodes.length; i++) {
      const node = this.nodes[i];
      found = found.concat(Array.from(node.querySelectorAll(selector)));

    }
    return new DomNodeCollection(found);
  }

  remove(selector) {
    let i = 0;
    while (i < this.nodes.length ) {
      const node = this.nodes[i];
      if (selector === undefined || node.matches(selector)) {
        node.remove();
        this.nodes.splice(i,1);
        i--;
      }
      i++;
    }
  }

  on(eventType, callback) {
    for (let i = 0; i < this.nodes.length; i++) {
      const node = this.nodes[i];
      node.addEventListener(eventType, callback);
      if (node.callbacks) {
        node.callbacks.push(callback);
      } else {
        node.callbacks = [callback];
      }
    }
  }

  off(eventType, callback) {
    for (let i = 0; i < this.nodes.length; i++) {
      const node = this.nodes[i];
      if (callback) {
        const cbIdx = node.callbacks.indexOf(callback);
        node.removeEventListener(eventType, node.callbacks[cbIdx]);
      } else {
        for (let j = 0; j < node.callbacks.length; j++) {
          node.removeEventListener(eventType, node.callbacks[j]);
          node.callbacks = [];
        }
      }
    }
  }

}
module.exports = DomNodeCollection;

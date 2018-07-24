class DomNodeCollection {
  constructor(nodes) {
    this.nodes = nodes
  }


  html(str) {
    if (str) {
      for (let i = 0; i < this.nodes.length; i++) {
        this.nodes[i].innerHTML = str;
      }
    } else {
      return this.nodes[0].innerHTML
    }
  }

  empty() {
    this.html('')
  }

  append(child){
    for (var i = 0; i < this.nodes.length; i++) {
      if (child instanceof DomNodeCollection) {
        for (var j = 0; j < child.nodes.length; j++) {
          this.nodes[i].innerHTML += child.nodes[j].outerHTML;
        }
      } else if (child instanceof String){
        this.nodes[i].innerHTML += child;
      } else {
        this.nodes[i].innerHTML += child.outerHTML;
      }
    }
  }

  attr(attrName, value) {
    if (!value) {
      return this.nodes[0].getAttribute(attrName);
    } else {
      for (var i = 0; i < this.nodes.length; i++) {
        this.nodes[i].setAttribute(attrName, value);
      }
    }
  }

  addClass(className){
   for (var i = 0; i < this.nodes.length; i++) {
     const oldClasses = this.nodes[i].getAttribute("class");

     let newClasses;
     if (!oldClasses) {
       newClasses = className;
     } else {
       newClasses = oldClasses + " " + className;
     }
     this.nodes[i].setAttribute("class", newClasses);
   }
 }


 removeClass(className) {
     for (var i = 0; i < this.nodes.length; i++) {
       if (!className) {
         this.nodes[i].removeAttribute('class');
       } else {
         const classString = this.nodes[i].getAttribute('class');
         const oldClasses = classString.split(' ');
         const removeClasses = className.split(' ');
         const newClasses = [];

         for (var j = 0; j < oldClasses.length; j++) {

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
     for (var i = 0; i < this.nodes.length; i++) {
       if (!selector) {
         child = child.concat(Array.from(this.nodes[i].children));
       } else {
         let immediateChildren = Array.from(this.nodes[i].children);
         for (var j = 0; j < immediateChildren.length; j++) {
           if (immediateChildren[j].matches(selector)) {
             child.push(immediateChildren[j]);
           }
         }
       }
     }
     return new DOMNodeCollection(child);
   }


  parent(selector) {
    const parents = [];
    for (var i = 0; i < this.nodes.length; i++) {
      const node = this.nodes[i];
    if (!parents.includes(node.parentNode)) {
      if (!selector || node.parentNode.matches(selector)){
        parents.push(node.parentNode);
      }
    }
  }
  return new DomNodeCollection(parents);
}

find(selector) {
  const found = [];

  for (var i = 0; i < this.nodes.length; i++) {
    const node = this.nodes[i];
    found.concat(Array.from(node.querySelectorAll(selector)));

  }
  return new DOMNodeCollection(found);
}


remove(selector) {
  let i = 0;
  while (i < this.nodes.length ) {
    const node = this.nodes[i];
    if (!selector || node.matches(selector)) {
      node.remove();
      this.nodes.splice(i, 1);
      i--;
    }
    i++;
  }
}


on(eventType, callback) {
  for (var i = 0; i < this.nodes.length; i++) {
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
   for (var i = 0; i < this.nodes.length; i++) {
     const node = this.nodes[i];
     if (callback) {
       const cbIdx = node.callbacks.indexOf(callback);
       node.removeEventListener(eventType, node.callbacks[cbIdx]);
     } else {
       for (var j = 0; j < node.callbacks.length; j++) {
         node.removeEventListener(eventType, node.callbacks[j]);
         node.callbacks = [];
       }
     }
   }
 }

}




module.exports = DomNodeCollection;

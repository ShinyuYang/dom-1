window.dom = {
  create(string) {
    const container = document.createElement("template"); //template可以容纳任何内容,div不行
    container.innerHTML = string.trim(); //trim避免空格出现影响,如果有空格,空格会被视为文本元素;trim可以自动剔除空格
    return container.content.firstChild;
    //以上是创建节点操作
  },
  after(node, node2) {
    console.log(node.nextSibling);
    node.parentNode.insertBefore(node2, node.nextSibling);
    //用于新增弟弟
  },
  before(node, node2) {
    node.parentNode.insertBefore(node2, node);
    //用于新增哥哥
  },
  append(parent, node) {
    parent.appendChild(node);
    //用于新增儿子
  },
  wrap(node, parent) {
    dom.before(node, parent);
    dom.append(parent, node);
    //用于新增爸爸,先把parent放在node的前面.再把node放到parent后面,这是appendChild的属性
  },
  remove(node) {
    node.parentNode.removeChild(node);
    return node;
    //用于删除节点
  },
  empty(node) {
    const array = [];
    let x = node.firstChild;
    while (x) {
      array.push(dom.remove(node.firstChild));
      x = node.firstChild;
      //回车,空格视为文本删除
    }
    return array;
    //用于删除所有儿子
  },
  attr(node, name, value) {
    //重载
    if (arguments.length === 3) {
      node.setAttribute(name, value);
    } else if (arguments.length === 2) {
      return node.getAttribute(name);
    }

    //增加(读写)属性
  },
  text(node, string) {
    //这里用if else是为了适配所有浏览器
    if (arguments.length === 2) {
      if ("innerText" in node) {
        node.innerText = string; //ie
      } else {
        node.textContent = string; //firefox chrome
      } //修改text
    } else if (arguments.length === 2) {
      if ("innerText" in node) {
        return (node.innerText = string); //ie
      } else {
        return (node.textContent = string); //firefox chrome
      } //修改text
    }
  },
  html(node, string) {
    if (arguments.length === 2) {
      node.innerHTML = string;
    } else if (arguments.length === 1) {
      return node.innerHTML;
    } //修改html
  },
  style(node, name, value) {
    if (arguments.length === 3) {
      node.style[name] = value;
      //dom.style(div,'color','red') 设置值
    } else if (arguments.length === 2) {
      if (typeof name === "string") {
        return node.style[name];
        //dom.style(div,'color') 读值
      } else if (name instanceof Object) {
        const object = name;
        for (let key in object) {
          node.style[key] = object[key];
          //dom.style(div,{color:'red'})设置值

        }
      }
    }//修改or读style
  },
  class:{
    add(node,className){
        node.classList.add(className)//添加class
    },
    remove(node,className){
        node.classList.remove(className)//删除class
    },
    has(node,className){
        return node.classList.contains(className)
    }//确认是否有某个类
  },
  on(node,eventName,fn){
    node.addEventListener(eventName,fn)
    //添加事件监听
},
  off(node,eventName,fn){
    node.removeEventListener(eventName,fn)
    //删除事件监听
},
  find(selector,scope){
    return (scope || document).querySelectorAll(selector)
    //获取标签
  },
  parent(node){
    return node.parentNode
  },//获取自己的父元素

  children(node){
    return node.children
  },//获取自己的子元素
  siblings(node){
    return Array.from(node.parentNode.children)
    .filter(n=>n!==node)
  },//获取所有兄弟节点(除去自己)
  next(node){
    let x=node.nextSibling
    while(x && x.nodeType===3){
        x=x.nextSibling
    }
    return x
  },//获取弟弟节点
  previous(node){
    let x=node.previousSibling
    while(x && x.nodeType===3){
        x=x.previousSibling
    }
    return x
  },//获取哥哥节点
  each(nodeList,fn){
    for(let i=0;i<nodeList.length;i++){
        fn.call(null,nodeList[i])
    }//遍历所有节点
},
index(node){
    const list=dom.children(node.parentNode)
    let i
    for(i=0;i<list.length;i++){
        if(list[i]===node){
            break
        }
    }
    return i//返回元素是第几个,获取排行
}
};

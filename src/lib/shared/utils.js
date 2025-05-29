/*
 * @description:
 * @param:
 * @return:
 * @Date: 2025-05-27 22:01:58
 */
// 存放工具方法的文件

/**
 * 对 fiber 对象要做的操作进行的标记
 */

// 没有任何操作
export const NoFlags = 0b00000000000000000000;
// 节点新增、插入、移动
export const Placement = 0b0000000000000000000010; // 2
// 节点更新属性
export const Update = 0b0000000000000000000100; // 4
// 删除节点
export const Deletion = 0b0000000000000000001000; // 8

/**
 * 判断参数 s 是否为字符串
 * @param {*} s
 * @returns
 */
export function isStr(s) {
  return typeof s === "string";
}

/**
 * 判断参数 fn 是否为函数
 * @param {*} fn
 * @returns
 */
export function isFn(fn) {
  return typeof fn === "function";
}

/**
 * 判断参数 s 是否为 undefined
 * @param {*} s
 * @returns
 */
export function isUndefined(s) {
  return s === undefined;
}

export function updateNode(node, prevVal, nextVal) {
  console.log(
    "-> ~ updateNode ~ node, prevVal, nextVal:",
    node,
    prevVal,
    nextVal
  );
  // 这里其实要做的事情就分为两个部分：
  // 1. 对旧值的处理
  // 2. 对新值的处理

  Object.keys(prevVal).forEach((key) => {
    if (key === "children") {
      // 如果 children 是字符串，说明是文本节点
      if (isStr(prevVal[key])) {
        node.textContent = "";
      }
    } else if (key.startsWith("on")) {
      // 如果是事件处理函数，则需要移除事件监听
      const eventName = key.toLowerCase().slice(2);
      if (eventName === "change") {
        eventName = "input";
      }
      node.removeEventListener(eventName, prevVal[key]);
    } else {
      // 如果新值中没有这个属性，则需要删除旧值中的属性
      if (!(key in nextVal)) {
        node[key] = "";
      }
    }
  });

  // 2. 对新值的处理
  Object.keys(nextVal).forEach((key) => {
    if (key === "children") {
      // 如果 children 是字符串，说明是文本节点
      if (isStr(nextVal[key])) {
        node.textContent = nextVal[key];
      }
    } else if (key.startsWith("on")) {
      // 如果是事件处理函数，则需要移除事件监听
      let eventName = key.toLowerCase().slice(2);
      if (eventName === "change") {
        eventName = "input";
      }
      node.addEventListener(eventName, prevVal[key]);
    } else {
      node[key] = nextVal[key];
    }
  });
}

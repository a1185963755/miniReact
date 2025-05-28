/*
 * @description:
 * @param:
 * @return:
 * @Date: 2025-05-27 21:59:03
 */
import { Placement, isStr, isFn, isUndefined } from "../shared/utils";
import {
  FunctionComponent,
  ClassComponent,
  HostComponent,
  HostText,
  Fragment,
} from "./ReactWorkTags";
/**
 *
 * @param {*} vnode 当前的 vnode 节点
 * @param {*} returnFiber 父 Fiber 节点
 */
export function createFiber(vnode, retrunFiber) {
  const { type, key, props } = vnode;
  const fiber = {
    // 节点的类型
    type,
    key,
    props,
    //当前节点对应的真实 DOM 节点
    stateNode: null,
    // 整个 fiber 树是以链表的形式串联起来的，因此需要 child、sibling 之类的
    child: null,
    sibling: null,
    return: retrunFiber,
    // 该 fiber 对象要做的具体操作
    flag: Placement,
    // 记录当前节点在当前层级下的位置
    index: null,
    // 存储旧的 fiber 对象
    alternate: null,
  };
  // 实际上 fiber 对象上面还有一个 tag 值
  // 这个 tag 值是什么取决于 fiber 的 type 值
  // 不同的 vnode 类型，type 是有所不同的
  if (isStr(type)) {
    fiber.tag = HostComponent;
  } else if (isFn(type)) {
    // 函数组件
    fiber.tag = type.prototype.isReactComponent
      ? ClassComponent
      : FunctionComponent;
  } else if (isUndefined(type)) {
    fiber.tag = HostText;
    fiber.props = {
      children: vnode,
    };
  } else {
    fiber.tag = Fragment;
  }
  return fiber;
}

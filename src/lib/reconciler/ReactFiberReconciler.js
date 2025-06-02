/*
 * @description:
 * @param:
 * @return:
 * @Date: 2025-05-29 21:10:02
 */
import { renderWithHooks } from "../react/ReactHooks";
import { updateNode } from "../shared/utils";
import { reconcileChildren } from "./ReactChildFiber.js";

export function updateHostComponent(fiber) {
  // 更新 HostComponent 的逻辑
  if (!fiber.stateNode) {
    // 如果 stateNode 还没有被创建，说明是初次渲染
    fiber.stateNode = document.createElement(fiber.type);
    updateNode(fiber.stateNode, {}, fiber.props);
  }
  // 处理子节点了
  reconcileChildren(fiber, fiber.props.children);
}

export function updateHostTextComponent(fiber) {
  fiber.stateNode = document.createTextNode(fiber.props.children);
}

/**
 * 更新函数组件
 * @param {*} wip 需要处理的 fiber 对象节点
 */
export function updateFunctionComponent(wip) {
  renderWithHooks(wip); // 初始化 hooks
  const { type, props } = wip;
  // 这里从当前的 wip 上面获取到的 type 是一个函数
  // 那么我们就直接执行这个函数，获取到它的返回值
  const children = type(props);
  // 有了 vnode 节点之后，就调用 reconcileChildren 方法，来处理子节点
  reconcileChildren(wip, children);
}

/**
 * 更新类组件
 * @param {*} wip 需要处理的 fiber 对象节点
 */
export function updateClassComponent(wip) {
  const { type, props } = wip;
  // 这里从当前的 wip 上面获取到的 type 是一个类
  // 那么我们就 new 一个实例出来
  const instance = new type(props);
  // 接下来我们就可以调用 render 方法，获取到它的返回值
  const children = instance.render();
  // 有了 vnode 节点之后，就调用 reconcileChildren 方法，来处理子节点
  reconcileChildren(wip, children);
}

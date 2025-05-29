import { updateNode } from "../shared/utils";

export function updateHostComponent(fiber) {
  // 更新 HostComponent 的逻辑
  if (!fiber.stateNode) {
    // 如果 stateNode 还没有被创建，说明是初次渲染
    fiber.stateNode = document.createElement(fiber.type);
    updateNode(fiber.stateNode, {}, fiber.props);
    console.log(fiber.stateNode);
  }
}

export function updateHostTextComponent(fiber) {
  fiber.stateNode = document.createTextNode(fiber.props.children);
}

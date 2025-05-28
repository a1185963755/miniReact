/*
 * @description:
 * @param:
 * @return:
 * @Date: 2025-05-27 21:48:18
 */
import { createFiber } from "../reconciler/ReactFiber";
import { scheduleUpdateOnFiber } from "../reconciler/ReactFiberWorkLoop";

function updateContainer(element, container) {
  const fiber = createFiber(element, {
    type: container.nodeName.toLowerCase(),
    stateNode: container,
  });
  console.log("-> ~ updateContainer ~ fiber:", fiber);
  scheduleUpdateOnFiber(fiber);
}

class ReactDOMRoot {
  constructor(container) {
    // 将拿到的根 DOM 节点在内部保存一份
    this._internalRoot = container;
  }

  render(element) {
    console.log("-> ~ ReactDOMRoot ~ render ~ element:", element);
    updateContainer(element, this._internalRoot);
  }
}

export function createRoot(container) {
  return new ReactDOMRoot(container);
}

const ReactDOM = {
  createRoot,
};

export default ReactDOM;

import { createFiber } from "../reconciler/ReactFiber";

function updateContainer(element, container) {
  const fiber = createFiber(element, container);
  console.log("-> ~ updateContainer ~ fiber:", fiber);
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

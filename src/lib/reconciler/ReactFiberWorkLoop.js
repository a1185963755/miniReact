let wip = null;
let wipRoot = null;

export function scheduleUpdateOnFiber(fiber) {
  wip = fiber;
  wipRoot = fiber;
  requestIdleCallback(workLoop);
}

function workLoop(deadline) {
  while (wip && deadline.timeRemaining() > 0) {
    //有剩余时间，继续处理fiber,进入reconciler阶段
    performUnitOfWork();
  }
  if (!wip) {
    // 说明整个 fiber 树都处理完了
    // 我们需要将 wipRoot 提交到 DOM 节点上
    commitRoot();
  }
}

//深度优先遍历
function performUnitOfWork() {
  beginWork(wip);
  // 如果当前 fiber 有子节点，则将其作为下一个 wip 进行处理
  if (wip.child) {
    wip = wip.child;
    return;
  }

  completeWork(wip);

  // 如果当前 fiber 没有子节点，则需要处理兄弟节点
  let next = wip;
  while (next) {
    // 如果有兄弟节点，则将其作为下一个 wip 进行处理
    if (next.sibling) {
      wip = next.sibling;
      return;
    }
    // 如果没有兄弟节点，则需要返回到父节点
    next = next.return;
    completeWork(next);
  }
  // 如果没有兄弟节点，说明当前 fiber 已经处理完了
  wip = null; // 重置 wip，表示当前没有正在处理的 fiber
}
function beginWork(fiber) {
  console.log("-> ~ beginWork ~ beginWork:", fiber);
}
function completeWork(fiber) {
  console.log("-> ~ completeWork ~ completeWork:", fiber);
}
function commitRoot() {
  console.log("-> ~ commitRoot ~ commitRoot:", "commitRoot");
}

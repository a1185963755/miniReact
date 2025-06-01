import { isStr } from "../shared/utils";
import { createFiber } from "./ReactFiber";

export function reconcileChildren(fiberRetrun, children) {
  if (isStr(children)) {
    return;
  }

  const newChildren = Array.isArray(children) ? children : [children];
  let previousNewFiber = null; // 上一个 fiber 对象
  let i = 0;
  let lastPlacedIndex = 0; // 上一次 DOM 节点插入的最远位置
  let shouldTrackSideEffects = true; // 是否需要记录节点位置
  let oldFiber = fiberRetrun.alternate?.child;
  for (; oldFiber && i < newChildren.length; i++) {
    //进入到此循环，存在oldFiber,说明是更新节点
  }
  if (i === newChildren.length) {
    //说明老节点已经处理完了,还存在老节点的还就要删除
  }

  // 初次渲染情况
  if (!oldFiber) {
    for (; i < newChildren.length; i++) {
      const newChildVNode = newChildren[i];
      if (newChildVNode === null) continue;
      const newFiber = createFiber(newChildVNode, fiberRetrun);
      // 接下来我们需要去更新 lastPlacedIndex 这个值
      lastPlacedIndex = placeChild(
        newFiber,
        lastPlacedIndex,
        i,
        shouldTrackSideEffects
      );
      // 接下来非常重要了，接下来我们要将新生成的 fiber 加入到 fiber 链表里面去
      if (previousNewFiber === null) {
        // 说明你是第一个子节点
        fiberRetrun.child = newFiber;
      } else {
        // 进入此分支，说明当前生成的 fiber 节点并非父 fiber 的第一个节点
        previousNewFiber.sibling = newFiber;
      }
      // 将 previousNewFiber 设置为 newFiber
      // 从而将当前 fiber 更新为上一个 fiber
      previousNewFiber = newFiber;
    }
  }
}

/**
 * 该方法专门用于更新 lastPlacedIndex
 * @param {*} newFiber  上面刚刚创建的新的 fiber 对象
 * @param {*} lastPlacedIndex 上一次的 lastPlacedIndex，也就是上一次插入的最远位置，初始值是 0
 * @param {*} newIndex 当前的下标，初始值也是 0
 * @param {*} shouldTrackSideEffects // 用于判断 returnFiber 是初次渲染还是更新
 */
function placeChild(
  newFiber,
  lastPlacedIndex,
  newIndex,
  shouldTrackSideEffects
) {
  // 更新 fiber 对象上面的 index
  // fiber 对象上面的 index 记录当前 fiber 节点在当前层级下的位置
  newFiber.index = newIndex;
  if (!shouldTrackSideEffects) {
    // 进入此 if，说明当前是初次渲染
    // 那么我们就不需要记录节点位置了
    return lastPlacedIndex;
  }
}

import {
  updateHostComponent,
  updateHostTextComponent,
} from "./ReactFiberReconciler";
import {
  FunctionComponent,
  ClassComponent,
  HostComponent,
  HostText,
  Fragment,
} from "./ReactWorkTags";

export function beginWork(fiber) {
  const tag = fiber.tag;

  switch (tag) {
    case HostComponent:
      updateHostComponent(fiber);
      break;
    case HostText:
      updateHostTextComponent(fiber);
      break;
    case FunctionComponent:
      // updateFunctionComponent(fiber);
      break;
    case ClassComponent:
      // updateClassComponent(fiber);
      break;
    case Fragment:
      // updateFragment(fiber);
      break;
    default:
      break;
  }
}

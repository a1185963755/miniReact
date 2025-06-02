/**
 * 该文件为最小堆的实现
 * 首先需要你对最小堆有一定的了解
 */

/**
 * 返回任务队列的第一个任务
 * @param {*} heap 任务队列
 */
export function peek(heap) {
  return heap.length === 0 ? null : heap[0];
}

/**
 * 向任务队列中添加一个任务
 * @param {*} heap 任务队列
 * @param {*} task 任务
 */
export function push(heap, task) {
  // 获取任务队列的长度
  const index = heap.length;
  // 将当前任务直接推入到任务队列的末尾，目前不一定在合适的位置
  heap.push(task);
  // 将当前任务进行上浮操作，使其在合适的位置
  siftUp(heap, task, index);
}

/**
 * 负责从任务队列里面删除堆顶的任务
 * 在 React 的调度器（Scheduler）中，peek 方法用于获取堆顶（即优先级最高的任务），而 pop 方法在移除堆顶任务后，会将堆的最后一个任务移动到堆顶，然后执行下沉（siftDown）​操作。这种设计的核心原因是为了维护堆的结构性质​（通常是最小堆或最大堆），同时保证操作的高效性（时间复杂度为 O(log n)）。以下是具体解释：
 *​为什么选择最后一个元素？​​
 *将最后一个元素移动到堆顶的原因包括：

 *​O(1) 的移动成本​：直接取数组末尾元素不需要遍历或额外计算。
 *​避免结构破坏​：如果直接删除堆顶后不填补，堆会分裂成两个子树，修复成本更高。
 *​简化下沉逻辑​：从堆顶开始下沉可以保证堆的完全二叉树性质（所有层级填满，最后一层左对齐）。
 * @param {*} heap 任务队列
 */
export function pop(heap) {
  // 说明任务队列为空
  if (heap.length === 0) return null;

  // 首先取出堆顶的任务
  const first = heap[0];
  // 接下来再取出堆底的最后一个任务
  const last = heap.pop();

  if (first !== last) {
    // 进入此 if，说明第一个任务不等于最后一个任务
    // 也就是任务队列里面的任务数大于 1
    heap[0] = last; // 将最后一个任务放到堆顶
    // 但是该任务可能不在合适的位置，因此需要进行下沉操作
    siftDown(heap, last, 0);
  }

  // 如果没有进入上面的 if，说明当前队列里面只有一个任务
  return first;
}

/**
 * 上浮操作
 * @param {*} heap 任务队列
 * @param {*} heap 当前推入的任务
 * @param {*} i 任务队列的长度
 */
function siftUp(heap, node, i) {
  let index = i; // index 保存也就是任务队列的长度
  while (index > 0) {
    // 这里涉及到了二进制里面的移位操作的知识，每右移一位，相当于除以 2，每左移一位，相当于乘以 2
    // 这里之所以要除以 2，是因为我们要获取到父节点的索引，要找上一层的节点
    const parentIndex = (index - 1) >> 1; // 获取父节点的索引
    // 通过父节点的索引，就可以获取到父节点的任务
    const parent = heap[parentIndex];
    // 接下来两者之间进行一个比较
    if (compare(parent, node) > 0) {
      // 如果父节点的过期时间大于子节点的过期时间，说明子节点的过期时间更小
      // 子节点的过期时间更紧急，那么就需要将子节点上浮
      // 那么就需要交换父节点和子节点的位置
      heap[parentIndex] = node;
      heap[index] = parent;
      // 接下来需要将 index 更新为父节点的索引
      index = parentIndex;
    } else {
      return;
    }
  }
}

/**
 * 下沉操作
 * @param {*} heap 任务队列
 * @param {*} node 之前的最后一个任务，但是现在已经被放置到堆顶了
 * @param {*} i 该任务的下标，也就是 0
 */
function siftDown(heap, node, i) {
  // 记录任务的下标，也是从 0 开始的
  let index = i;
  // 当前任务队列的长度
  let len = heap.length;
  // 获取当前任务队列一半的下标
  const halfLen = len >> 1;

  // 因为我们是使用的数组来实现的二叉树，那么首先第一个条件就是数组不能越界
  // 因为是二叉树，我们要么比较左树，要么比较右树
  // 堆是用完全二叉树实现的数组结构，其特点是：
  // 所有层级除最后一层外必须填满，最后一层靠左对齐。
  // ​非叶子节点的范围​：索引 0 到 Math.floor(len / 2) - 1。
  // 叶子节点没有子节点，无法继续下沉。
  // ​叶子节点的范围​：索引 Math.floor(len / 2) 到 len - 1。
  while (index < halfLen) {
    // 得到左边子节点的索引
    const leftIndex = index * 2 + 1; // 得到左边节点的索引
    const rightIndex = index * 2 + 2; // 得到右边节点的索引
    // 左右的索引有了之后，我们就可以得到左右节点对应的任务
    const left = heap[leftIndex];
    const right = heap[rightIndex];

    if (compare(left, node) < 0) {
      // 如果进入此分支，说明左节点的过期时间更紧急
      // 接下来还需要进行左右节点的比较，谁小谁才能上去
      // 为什么要做 rightIndex < len 的判断呢？
      // 因为右边的树可能存在节点缺失的情况，所以需要判断一下索引值是否超出了数组的长度，防止数组越界
      if (rightIndex < len && compare(right, left) < 0) {
        // 如果进入此分支，说明右边节点的过期时间更紧急
        heap[index] = right;
        heap[rightIndex] = node;
        index = rightIndex;
      } else {
        // 如果进入此分支，说明左边节点的过期时间更紧急
        heap[index] = left;
        heap[leftIndex] = node;
        index = leftIndex;
      }
    } else if (compare(right, node) < 0 && rightIndex < len) {
      // 如果进入此分支，说明右节点的过期时间更紧急
      // 但是这里还需要判断一下，右节点的索引不能越界
      heap[index] = right;
      heap[rightIndex] = node;
      index = rightIndex;
    } else {
      // 当前的任务就是最小的
      return;
    }
  }
}

/**
 * 比较函数，接收两个任务
 * @param {*} a
 * @param {*} b
 */
function compare(a, b) {
  // 每个任务都有一个 sortIndex 属性，表示该任务的过期时间
  // 假设父节点的过期时间为 10，子节点的过期时间为 1
  const diff = a.sortIndex - b.sortIndex;
  // 如果通过过期时间比较不出来先后，那么就根据 id 来比较
  return diff !== 0 ? diff : a.id - b.id;
}

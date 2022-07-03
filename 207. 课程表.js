// 207. 课程表
// 你这个学期必须选修 numCourses 门课程，记为 0 到 numCourses - 1 。

// 在选修某些课程之前需要一些先修课程。 先修课程按数组 prerequisites 给出，其中 prerequisites[i] = [ai, bi] ，表示如果要学习课程 ai 则 必须 先学习课程  bi 。

// 例如，先修课程对 [0, 1] 表示：想要学习课程 0 ，你需要先完成课程 1 。
// 请你判断是否可能完成所有课程的学习？如果可以，返回 true ；否则，返回 false 。



// 示例 1：

// 输入：numCourses = 2, prerequisites = [[1,0]]
// 输出：true
// 解释：总共有 2 门课程。学习课程 1 之前，你需要完成课程 0 。这是可能的。
// 示例 2：

// 输入：numCourses = 2, prerequisites = [[1,0],[0,1]]
// 输出：false
// 解释：总共有 2 门课程。学习课程 1 之前，你需要先完成​课程 0 ；并且学习课程 0 之前，你还应先完成课程 1 。这是不可能的。


// 提示：

// 1 <= numCourses <= 105
// 0 <= prerequisites.length <= 5000
// prerequisites[i].length == 2
// 0 <= ai, bi < numCourses
// prerequisites[i] 中的所有课程对 互不相同
/**
 * @param {number} numCourses
 * @param {number[][]} prerequisites
 * @return {boolean}
 */
 var canFinish = function (numCourses, prerequisites) {
    const nums = Array(numCourses).fill(0); // 每一个课程的入度数量(入度数)
    const map = Array(numCourses); // 当前课程有几门课程依赖它的(出度数)
    const queue = []; // 入度为0的临时队列
    for(let i=0;i<prerequisites.length;i++){
        const [a,b] = prerequisites[i]
        nums[a]++ // 因为a有依赖b 所以对应的入度数+1
        if(map[b]) map[b].push(a) 
        else map[b] = [a]
    }
    // 找出入度为0的放进queue队列中
    for(let i=0;i<numCourses;i++){
        if(nums[i]===0){
            queue.push(i)
        }
    }
    let count = 0 // 修课程的数量
    while(queue.length){
        const cur = queue.shift(); // 拿出当前修的课程
        const list = map[cur] // 获取依赖它的课程
        count++ // 拿出入度为0的值 说明已经休完了
        if(list){
            for(let i =0;i<list.length;i++){
                nums[list[i]]-- // 修完当前的课程，依赖它的课程入度-- 所以是nums
                if(nums[list[i]]===0) queue.push(list[i])
 
            }
        }
 
    }
    return count === numCourses
 }
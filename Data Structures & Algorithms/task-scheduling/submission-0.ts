// You are given an array of CPU tasks tasks, where tasks[i] is an uppercase english character from A to Z. You are also given an integer n.

// Each CPU cycle allows the completion of a single task, and tasks may be completed in any order.

// The only constraint is that identical tasks must be separated by at least n CPU cycles, to cooldown the CPU.

// Return the minimum number of CPU cycles required to complete all tasks.

class Solution {
  /**
   * @param {character[]} tasks
   * @param {number} n
   * @return {number}
   */
  leastInterval(tasks: string[], n: number): number {
    if (tasks.length === 0) {
      return 0;
    }

    // Add add tasks to freq map to determine which task is most popular.
    const freq = new Map<string, number>();

    let mostPopularTask = "";
    let mostPopularTaskPopularity = 0;
    let tasksTiedToMostPopularTask = 0;

    for (const task of tasks) {
      freq.set(task, (freq.get(task) ?? 0) + 1);

      const taskPopularity = freq.get(task)!;

      // Keep track of the most popular task.
      // And also how many tasks are tied to the most popular.
      if (taskPopularity === mostPopularTaskPopularity) {
        tasksTiedToMostPopularTask++;
      } else if (taskPopularity > mostPopularTaskPopularity) {
        mostPopularTask = task;
        mostPopularTaskPopularity = taskPopularity;
        tasksTiedToMostPopularTask = 0;
      }
    }

    // If there are only unique tasks, then we need tasks.length.
    // Also, if there's only very few repeat tasks.
    // eg. AAABCDEFGHIJKLMOPQR, we need no idle cycles, result=19
    const cyclesUniqueTasks = tasks.length;

    // If we only have repeat tasks, then we need to idle.
    // We need (mostPopularTaskFreq - 1) * n idle cycles and mostPopularTaskFreq cycles to complete.
    // eg. AAA and n=2 means A--A--A, result=7.

    // If we have few uniques in there, then these won't make a difference.
    // eg. AAABC and n=2 means ABCA--A, result=7.

    // If there are ties to most popular, then we need to add the number of ties too.
    // eg. AABB and n=2 means A--A + B--B = AB-AB, so +1 cycle, result=5.
    // eg. AABBCC and n=3 means A---A + B---B + C---C = ABC-ABC, so +2 cycles, result=7.
    const mostPopularTaskFreq = freq.get(mostPopularTask)!;
    const cyclesRepeatTasks =
      (mostPopularTaskFreq - 1) * n +
      mostPopularTaskFreq +
      tasksTiedToMostPopularTask;

    // Result is the maximum of number of tasks (with few repeats) vs only repeats and lots of idle.
    return Math.max(cyclesUniqueTasks, cyclesRepeatTasks);
  }
}

new Solution().leastInterval(["A", "A", "B", "B"], 2);

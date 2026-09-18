// There are n cars traveling to the same destination on a one-lane highway.

// You are given two arrays of integers position and speed, both of length n.

// position[i] is the position of the ith car (in miles)
// speed[i] is the speed of the ith car (in miles per hour)
// The destination is at position target miles.

// A car can not pass another car ahead of it.
// It can only catch up to another car and then drive at the same speed as the car ahead of it.

// A car fleet is a non-empty set of cars driving at the same position and same speed.
// A single car is also considered a car fleet.

// If a car catches up to a car fleet the moment the fleet reaches the destination,
// then the car is considered to be part of the fleet.

// Return the number of different car fleets that will arrive at the destination.

interface car {
  position: number;
  speed: number;
  ttt: number; // time to target
}

class Solution {
  /**
   * @param {number} target
   * @param {number[]} position
   * @param {number[]} speed
   * @return {number}
   */
  carFleet(target: number, position: number[], speed: number[]): number {
    // Store cars in array and calculate "time to target" for each car.
    const cars: car[] = [];
    for (let i = 0; i < position.length; i++) {
      cars.push({
        position: position[i]!,
        speed: speed[i]!,
        ttt: (target - position[i]!) / speed[i]!,
      });
    }

    // Sort the array so that closest car is the 1st element.
    // This makes this O(nlogn)
    cars.sort((a: car, b: car) => {
      return b.position - a.position;
    });

    // The first car is always a fleet.
    // Rest of the cars may merge with it or merge with the car in front of them.
    const fleet: car[] = [cars[0]!];
    for (let i = 1; i < cars.length; i++) {
      // If this car arrives faster (or at the same time) than the last fleet,
      // then this car becomes part of the last fleet and we can skip it.
      if (cars[i]!.ttt <= fleet[fleet.length - 1]!.ttt) {
        continue;
      }
      // If this car arrives slower than the last fleet,
      // then it itself becomes a new fleet and is now the last fleet.
      // Rest of the cars may merge with it.
      fleet.push(cars[i]!);
    }
    return fleet.length;
  }
}

const solution = new Solution();
solution.carFleet(10, [4, 1, 0, 7], [2, 2, 1, 1]);

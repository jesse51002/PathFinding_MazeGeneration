# PathFinding_MazeGeneration
Made a website to visualize the Randomized depth-first search maze creating algorithm and the DFS, BFS and A* pathfinding algorithms

**Randomized depth-first search**

The Maze Generator used a "Randomized depth-first search" also known as "recursive backtracker". In this algorithm each cell has 4 walls on each side of the cell. Starting from any cell the computer goes to another cell removing the wall seperating the movement. It then markes the cell as visited so that it won't go to the cell again. When the computer reaches a dead end it backtracks until it can go then an unvisted cell. This is looped until all the cells are visited.

**Depth First Search**

To do a depth first search you must have a starting point. Once you have the starting point, you then expand to the possible surrounding cells and mark the start cell as visited. Whenever you expand you save the previous cells inorder to save the path. Then you expand the most recently added cell to cells that haven't been visited. This means that if in your algorithm you expand to the left last, the left cell will always be your most recently added cell. You do this until you reach the target cell. This means the algorithm will always try to expand left. This means that if the target point was right above the starting point this algorithm might take a longer route to get there.

**Breath First Search**

To do a breath first search you must have a starting point. Once you have the starting point, you then expand to the possible surrounding cells and mark the start cell as visited. Whenever you expand you save the previous cells inorder to save the path. Then you expand the least recently added cell to cells that haven't been visited. This makes this algorithm always find the fastest path at the cost of speed. That is beacuse it checks every possible way to get to the target location, making it unrealisitc to use for larget mazes.

**A Star Search**

To do a A* first search you must have a starting point. Once you have the starting point, you then expand to the possible surrounding cells and mark the start cell as visited. Whenever you expand you save the previous cells inorder to save the path. Then you expand the cell that is closest to the target. This makes the algorithm is usually the fastest. This is because it attempts to get closer to the target as quickly as possible.

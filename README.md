# PathFinding_MazeGeneration
Made a website to visualize the Randomized depth-first search maze creating algorithm and the DFS, BFS and A* pathfinding algorithms

**Randomized depth-first search**

The Maze Generator used a "Randomized depth-first search" also known as "recursive backtracker". In this algorithm each cell has 4 walls on each side of its sides. Starting from an arbitary cell the program expands to a random cell around it removing the wall seperating the movement. It then markes the cell as visited because you can not expand to a cell twice. When the computer reaches a dead end it backtracks until it reaches a cell that is expandable. This is looped until all the cells have been fully expanded.

**Depth First Search**

To do a depth first search you must have a starting point. Once you have the starting point, you then expand to the possible surrounding cells and mark the start cell as visited. Whenever you expand you save the previous cells inorder to save the path it took to get to that cell. Then you expand the most recently added cell to all the unvisited cells around it and mark the cell visited. You do this until you reach the target cell. This means that if in your algorithm you expand to the left last, the left cell will always be your most recently added cell. This means the algorithm will always try to expand left. This means that if the target point was right above the starting point this algorithm might take a longer route to get there since it will attempt to go left until it can't.

**Breath First Search**

To do a breath first search you must have a starting point. Once you have the starting point, you then expand to the possible surrounding cells and mark the start cell as visited. Whenever you expand you save the previous cells inorder to save the path it took to get to that cell. Then you expand the least recently added cell to all the unvisited cells around it and mark the cell visited. This makes this algorithm always find the fastest path at the cost of speed. That is beacuse it checks every possible path to get to the target location although this makes it unrealisitc to use for larger mazes.

**A Star Search**

To do a A* first search you must have a starting point. Once you have the starting point, you then expand to the possible surrounding cells and mark the start cell as visited. Whenever you expand you save the previous cells inorder to save the path it took to get to that cell. Then you expand the cell that has the lowest cost to all the unvisited cells around it and mark the cell visited. The cost is calculated by adding the distance from the start(G cost) to the distance from the end(H Cost). This algorithm will always find the fastest route because it finds the path with the lowest cost. This makes the A* Algorithm the most practical out of the 3 because its essentially a smarter Breath First search algorithm.

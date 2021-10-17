//A* Pathfinding algorithm

class AStar{
  constructor(grid, startPoint, endPos, gridSize, canvasX, canvasY, canvasCellSize){
  
    //Where on the screen the canvas will be drawn
    this.canvasX = canvasX;
    this.canvasY = canvasY;
    //Size of each cell in the canvas
    this.canvasCellSize = canvasCellSize;
    //Size of the maze grid
    this.gridSize = gridSize;
  
    //Makes a personal copy of the maze grid
    
    this.grid = [];
    for(i = 0 ; i < gridSize; i++){
      this.grid[i] = [];
      for(j = 0; j < gridSize; j++){
        this.grid[i][j] = new cell(createVector(i,j));
        this.grid[i][j].cloneCell(grid[i][j]);
      }
    }
    
    //Stores open expandable cells
    this.openSet = [];
    
    //Puts the starting point in openSet so it can be expanded
    this.grid[startPoint.x][startPoint.y].openSet = true;
    this.openSet[this.openSet.length] = this.grid[startPoint.x][startPoint.y];
    
    //Sets end position
    this.endPos = endPos;
    
    this.completedPathCell = null;
  }

  //Returns the closest open cell index
  //Uses a^2 + b^2 = c^2 to get the distance
  FindCheapestNode(){
    if(this.openSet.length <= 0){
      return -1;
    }
    
    //H cost(distance from end node)
    let XDiff = Math.abs(this.endPos.x - this.openSet[0].pos.x);
    let YDiff = Math.abs(this.endPos.y - this.openSet[0].pos.y);
    let distance = XDiff + YDiff;
    
    //G Cost(distance from start node)
    let pathLength = this.openSet[0].previousCells.length;
    
    //Cost H cost + G cost
    let cost = distance + pathLength;

    //Intializes cost of the first node to be the cheapest
    let cheapestCost = cost;
    let closestIndex = 0;

    if(this.openSet.length > 1){
      //H cost(distance from end node)
      for(i = 1; i < this.openSet.length; i++){
        //H cost(distance from end node)
        let XDiff = Math.abs(this.endPos.x - this.openSet[i].pos.x);
        let YDiff = Math.abs(this.endPos.y - this.openSet[i].pos.y);
        let distance = XDiff + YDiff;
        
        //G Cost(distance from start node)
        let pathLength = this.openSet[i].previousCells.length;

        //Cost H cost + G cost
        let cost = distance + pathLength;
       
        //If it lower than the current cheaper cost then this is the new current cheapest cost
        if(cost < cheapestCost){
          cheapestCost = cost;
          closestIndex = i;
        }
      }
    }
    
    
    return closestIndex;
  }
  
  //Master function for pathfinding
  Update(){
    //If completed there is no need to continue running
    if(this.completedPathCell){
      return;
    }
    
    //Gets the index of the closest expandable grid
    let closestOpenSetIndex = this.FindCheapestNode();
    
    //If it's -1 that means there no grid to expand meaning the maze is unsolvable
    if(closestOpenSetIndex == -1){
      print("Unsolvable maze AStar");
      return;
    }
    //If the closest open set is on the target cell means path has been found
    else if(this.openSet[closestOpenSetIndex].pos.x == this.endPos.x && this.openSet[closestOpenSetIndex].pos.y == this.endPos.y){
      print("Solved Astar");
      this.completedPathCell = this.openSet[closestOpenSetIndex];
      return;
    }
    
    //Expands the cell closest to target cell
    this.MakeNewCells(this.openSet[closestOpenSetIndex]);
  }

  //Checks to see if a position can be expanded on to
  CheckPos(pos){
    //If it's out of bouce of the grid position is invalid
    if(pos.x < 0 || pos.y < 0 || pos.x >= this.gridSize || pos.y >= this.gridSize)
      return false;

    let checkCell = this.grid[pos.x][pos.y];
    //If cell has been expanded from already or is an unpassable grid it's invalid
    if(checkCell.isObstacle || checkCell.closeSet){
      return false;
    }
    //Otherwise the cell can be expanded on to
    else{
      return true;
    }
  }

  MakeNewOpenSet(pos, oldCell){
    //Makes a expandable cell
    let NewOpenCell = this.grid[pos.x][pos.y];

    //If the position is already an open set and has a lower cost than this new move
    //then keep the open set already there
    if(NewOpenCell.openSet && oldCell.previousCells.length + 1 > NewOpenCell.previousCells.length){
      return;
    }

    NewOpenCell.openSet = true;
    //Gets the path from the cell it's expanded from
    NewOpenCell.previousCells = [...oldCell.previousCells];
    //Adds the previous cell to the path
    NewOpenCell.previousCells[NewOpenCell.previousCells.length] = oldCell;
    //Adds it ot the list of expandable cells
    this.openSet[this.openSet.length] = NewOpenCell;
  }

  MakeNewCells(expandingCell){
    //Makes new expandable cells in all position possible to expand to.
    
    let CheckingPos = createVector(expandingCell.pos.x + 1, expandingCell.pos.y);
    if(this.CheckPos(CheckingPos)){
      this.MakeNewOpenSet(CheckingPos, expandingCell);
    }

    CheckingPos = createVector(expandingCell.pos.x, expandingCell.pos.y + 1);
    if(this.CheckPos(CheckingPos)){
      this.MakeNewOpenSet(CheckingPos, expandingCell);
    }

    CheckingPos = createVector(expandingCell.pos.x, expandingCell.pos.y - 1);
    if(this.CheckPos(CheckingPos)){
      this.MakeNewOpenSet(CheckingPos, expandingCell);
    }

    CheckingPos = createVector(expandingCell.pos.x - 1, expandingCell.pos.y);
    if(this.CheckPos(CheckingPos)){
      this.MakeNewOpenSet(CheckingPos, expandingCell);
    }
  
    //Makes the expanded cell closed so it won't be expanded again
    expandingCell.closeSet = true;
    expandingCell.openSet = false;
    
    //Removes the expanded cell from the expandable cell list
    for(i = 0; i < this.openSet.length; i++){
      if(this.openSet[i] == expandingCell){
          this.openSet.splice(i,1);
          break;
      }
    }
  }

  drawAStar(){
    //Calls the pathfind master functoin
    this.Update();
     
    //Fills the background
    fill(150);
    rect(this.canvasX, this.canvasY, this.gridSize * this.canvasCellSize, this.gridSize * this.canvasCellSize);
    
    //Fills the cells
    //yellow for closed cells
    //Greed for open cells
    //Black for wall cells
    for(i = 0; i < this.grid.length; i++){
      for(j = 0 ; j < this.grid[0].length; j++){
        if(this.grid[i][j].openSet){
          let c = color(0, 128, 0);
          fill(c);
          rect(this.canvasX + this.canvasCellSize * i, this.canvasY +  this.canvasCellSize * j, this.canvasCellSize, this.canvasCellSize);
        }
        else if(this.grid[i][j].closeSet){
          let c = color(255, 255, 0);
          fill(c);
          rect(this.canvasX + this.canvasCellSize * i, this.canvasY +  this.canvasCellSize * j, this.canvasCellSize, this.canvasCellSize);
        }
        else if(this.grid[i][j].isObstacle){
          let c = color(0,0,0);
          fill(c);
          rect(this.canvasX + this.canvasCellSize * i, this.canvasY +  this.canvasCellSize * j, this.canvasCellSize, this.canvasCellSize);
        }
      }
    }
    
    if(this.completedPathCell){
      for(i = 0; i < this.completedPathCell.previousCells.length; i++){
        let c = color(0,0,255);
            fill(c);
            rect(this.canvasX + this.canvasCellSize * this.completedPathCell.previousCells[i].pos.x,
               this.canvasY + this.canvasCellSize * this.completedPathCell.previousCells[i].pos.y,
                this.canvasCellSize,  this.canvasCellSize
              );
      }
    }
    //Draws the target point purple
    fill(125,0,255);
    rect(this.canvasX + this.canvasCellSize * this.endPos.x, this.canvasY + this.canvasCellSize * this.endPos.y, this.canvasCellSize,  this.canvasCellSize);
    

  }
}
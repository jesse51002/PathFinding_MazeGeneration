//Breath First Pathfinding algorithm

class BreathFirst{
  constructor(gridGive, startPoint, endPos, gridSize, canvasX, canvasY, canvasCellSize){
  
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
        this.grid[i][j].isObstacle = grid[i][j].isObstacle;
        //print(grid[i][j].isObstacle)
      }
    }
  
    //Stores open expandable cells
    this.openSet = [];
    
    this.completedPathCell = null;
    
    //Puts the starting point in openSet so it can be expanded
    this.grid[startPoint.x][startPoint.y].openSet = true;
    this.openSet[this.openSet.length] = this.grid[startPoint.x][startPoint.y];
    
    //Sets end position
    this.endPos = endPos;
  }
  
  //Master function for pathfinding
  Update(){    
    if(this.completedPathCell){
      return;
    }
    
    //This means there is nothing to expand, meaning the maze is unsolvable
    if(this.openSet.length <= 0){
      print("Unsolvable maze BreathFirst");
      return;
    }
    
    //If path has not been found check all expandable cells to find out whether it's completed
    if(!this.completedPathCell){
      for(i = 0; i < this.openSet.length; i++){
        //If the open index is on the target cell means path has been found
        if(this.openSet[i].pos.x == this.endPos.x && this.openSet[i].pos.y == this.endPos.y){
          this.completedPathCell = this.openSet[i];
          
          print("Solved BreathFirst");
          return;
        }
      }
    }
  
    //Expands the least recently added cell
    this.MakeNewCells(this.openSet[0]);
  }

  //Checks to see if a position can be expanded on to
  CheckPos(pos){
    //If it's out of bouce of the grid position is invalid
    if(pos.x < 0 || pos.y < 0 || pos.x >= this.gridSize || pos.y >= this.gridSize)
      return false;

    let checkCell = this.grid[pos.x][pos.y];
    //If cell has been expanded to already or is an unpassable grid it's invalid
    if(checkCell.isObstacle || checkCell.closeSet || checkCell.openSet){
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
    this.openSet.splice(0,1);
  }

  drawBreathFirst(){
    //Calls the pathfind master functoin
    this.Update();
     
    //Fills the background
    fill(150);
    rect(this.canvasX, this.canvasY, this.gridSize * this.canvasCellSize, this.gridSize * this.canvasCellSize);
    
    //Fills the cells
    //Yellow for closed cells
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
    
    //Draws the path of the cell that was being expaned blue
    if(this.completedPathCell){
      let c = color(0,0,255);
      fill(c);
      rect(this.canvasX + this.canvasCellSize * this.completedPathCell.pos.x, this.canvasY + this.canvasCellSize * this.completedPathCell.pos.y, this.canvasCellSize,  this.canvasCellSize);
      for(i = 0; i < this.completedPathCell.previousCells.length; i++){
        
            
            rect(this.canvasX + this.canvasCellSize * this.completedPathCell.previousCells[i].pos.x, this.canvasY + this.canvasCellSize * this.completedPathCell.previousCells[i].pos.y, this.canvasCellSize,  this.canvasCellSize);

      }
    }
    
    //Draws the target point purple
    fill(125,0,255);
    rect(this.canvasX + this.canvasCellSize * this.endPos.x, this.canvasY + this.canvasCellSize * this.endPos.y, this.canvasCellSize,  this.canvasCellSize);
  }
}
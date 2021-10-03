 //Randomized depth-first search Maze Generator
 
 class Maze {
   constructor(grid, startPoint, gridSize, canvasX, canvasY, canvasCellSize){
     this.grid = grid;
     this.gridSize = gridSize;
     
     //Makes a seperate grid where we won't have extra indexes for the wall tiles
     this.generateGrid = [];
     for(i = 0; i < floor(gridSize/2); i++){
       this.generateGrid[i] = [];
       for(j = 0; j < floor(gridSize/2); j++){
         this.generateGrid[i][j] = new cell(createVector(i,j));
       }
     }
     //Sets a random position as the end position
     this.endPos = createVector(floor(random(3,floor(gridSize/2))) * 2, floor(random(3,floor(gridSize/2))) * 2) ;
     
     //Sets the wall cells
     for(i = 0; i < gridSize; i++){
       for(j = 0; j < gridSize; j++){
         grid[i][j].reset(); 
         if(i %2 == 1 || j % 2 == 1){
           grid[i][j].isObstacle = true;           
         }

       }
     }
     //Where on the screen the canvas will be drawn
     this.canvasX = canvasX;
     this.canvasY = canvasY;

     //Size of each cell on the screen
     this.canvasCellSize = canvasCellSize; 
    
     //History for the Randomized depth-first search algorithm
     this.history = [startPoint];
     
     //Is set to true once the maze has finished generating
     this.generated = false;
   }
   
   CheckCell(pos){
     //If cell is out of range of the grid then it's invalid
     if(pos.x < 0 || pos.y < 0 || pos.x >= this.generateGrid.length || pos.y >= this.generateGrid.length)
      return false;

    let checkCell = this.generateGrid[pos.x][pos.y];
    //Can not go to a cell twice, so if it's already been checked it's invalid
    if(checkCell.generatorCheck){
      return false;
    }
    //Otherwise can move to cell
    else{
      return true;
    }
   }
   
   GetMove(pos){
    //Checks cells in all directions around it and chooses a random valid index 
    let validMoves = [];
     
     if(this.CheckCell(createVector(pos.x + 1, pos.y))){
       validMoves[validMoves.length] = createVector(1,0);
     }
     if(this.CheckCell(createVector(pos.x - 1, pos.y))){
       validMoves[validMoves.length] = createVector(-1,0);
     }
     if(this.CheckCell(createVector(pos.x, pos.y + 1))){
       validMoves[validMoves.length] = createVector(0,1);
     }
     if(this.CheckCell(createVector(pos.x, pos.y - 1))){
       validMoves[validMoves.length] = createVector(0,-1);
     }
     
     //If there are no valid index return null
     if(validMoves.length == 0){
       return null;
     }
     else{
       let randIndex = floor(random(0,validMoves.length));
       return validMoves[randIndex];
     }
   }
   
   MakeMove(){
     while(true){
       let curPos = this.history[this.history.length - 1];
       let curGrid =  this.generateGrid[curPos.x][curPos.y];
       
       //Marks the current Grid as checked so it won't be rechecked
       curGrid.generatorCheck = true;
       
       //Gets a valid move
       let move = this.GetMove(this.history[this.history.length - 1]);
       
       if(move){
         //Gets the cell of the valid move
         let moveToPos = createVector(curPos.x + move.x, curPos.y + move.y)
         let moveToGrid = this.generateGrid[moveToPos.x][moveToPos.y];
         
         //Removes the wall in the needed direction

         if(move.x == 1){
           curGrid.walls[3] = false;
           moveToGrid.walls[1] = false;
           
           this.grid[curPos.x * 2 + 1][curPos.y *2].isObstacle = false;
         }
         else if(move.x == -1){
           curGrid.walls[1] = false;
           moveToGrid.walls[3] = false;
           this.grid[curPos.x * 2 - 1][curPos.y * 2].isObstacle = false;
         }
         else if(move.y == 1){
           curGrid.walls[2] = false;
           moveToGrid.walls[0] = false;
           
           this.grid[curPos.x * 2][curPos.y * 2 + 1].isObstacle = false;
         }
         else if(move.y == -1){
           curGrid.walls[0] = false;
           moveToGrid.walls[2] = false;
           
           this.grid[curPos.x * 2][curPos.y * 2 - 1].isObstacle = false;
         }
         
         this.history[this.history.length] = moveToPos;
         
         break;
       }

       //If there no valid positoin then go back until there's a cell with a valid position
       else{
         this.history.splice(this.history.length - 1,1);
          
         //If you go back and there is no cell with a valid position then the maze is complete
         if(this.history.length == 0){
           this.generated = true;
           break;
         }
       }
     }
   }
   
   DrawMazeGenerator(){
     //If maze has already been generated then doesn't run
     if(this.generated){
       return;
     }
     //Makes the next move
     this.MakeMove();
     
     //fills the canvas area background to erase past frames
     fill(150);
      rect(this.canvasX, this.canvasY, this.gridSize * this.canvasCellSize, this.gridSize * this.canvasCellSize);
     
      //Draws obstacles as black squares
     for(i = 0; i < grid.length; i++){
      for(j = 0 ; j < grid[0].length; j++){
        if(grid[i][j].isObstacle){
          let c = color(0,0,0);
          fill(c);
          rect(this.canvasX + this.canvasCellSize * i, this.canvasY +  this.canvasCellSize * j, this.canvasCellSize, this.canvasCellSize);
        }
      }
    }
     
   }
   
 }
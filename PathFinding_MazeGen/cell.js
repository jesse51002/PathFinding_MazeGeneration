class cell{  
  constructor(pos){
    this.isObstacle = false;
    this.isEnd = false;
    
    this.previousCells = [];
    this.closeSet = false;
    this.openSet = false;
    
    this.pos = pos;
    
    this.generatorCheck = false;
    this.walls = [true, true, true, true];
  }
  
  reset(){
    this.isObstacle = false;
    this.isEnd = false;
    
    this.previousCells = [];
    this.closeSet = false;
    this.openSet = false;
        
    this.generatorCheck = false;
    this.walls = [true, true, true, true];
  }
  
  cloneCell(otherCell){
    this.isObstacle = otherCell.isObstacle;
    this.isEnd = otherCell.isEnd;
    
    this.previousCells = [...otherCell.previousCells];
    this.closeSet = otherCell.closeSet;
    this.openSet = otherCell.openSet;
        
    this.generatorCheck = otherCell.generatorCheck;
    this.walls = [...otherCell.walls];
  }
}
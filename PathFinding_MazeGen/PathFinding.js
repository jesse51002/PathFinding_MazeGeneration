var input = document.getElementById("myInput");

var targetSize = 400;
var minSize = 300;
var gridSize = 30;

var grid = [];

var openSet = [];
var closedSet = [];

var obstacleDec = 0.35;

var maxFrameRate = 60;

var MazeGenerator;
var AStarAlg;
var BreathFirstAlg;
var DepthFirstAlg;

var updatedFinders = false;
var myCanvas;

var generating = false;
var pathFinding = false;

function setup() {
  //Sets the speed to the value of the speed slider
  frameRate(Math.max(0.1,pow(document.getElementById("SpeedSlider").value / 100, 2) * maxFrameRate));
  
  //Creates the canvas
  myCanvas = createCanvas(targetSize,targetSize);
  
  //Make a 2d arrat of cells to be the grid
  for(i = 0;i < gridSize; i++){
    grid[i] = [];
    for(j = 0; j < gridSize; j++){         
      grid[i][j] = new cell(createVector(i,j));
    }
  }
  
  //Puts the p5js canvas into a div so it can be moved around freely
  myCanvas.parent("P5Canvas");
}

function draw() {
  //Checks if screen is active
  if(!generating && !pathFinding){
    return;
  }
  
  //If maze has been generated and not currently pathfinding then makes screen inactive
  if(MazeGenerator.generated && !pathFinding){
    generating = false;
    return;
  }

  //Sets the background to erase past drawing so new things can be redrawn
  background(150);
  
  //If maze hasn't finished generating the generate
  if(!MazeGenerator.generated){
    MazeGenerator.DrawMazeGenerator();
  }
  //If maze has been generating then start pathfinding once user asks
  else if(pathFinding){
    //If the pathfinding algorithms haven't been initiated or needes to be reinitiated
    if(!updatedFinders){
      AStarAlg = new AStar(
        grid, //grid
        createVector(0,0), //start pos
        MazeGenerator.endPos, //endpos
        gridSize, //grid size
        25, //canvas x
        50, //canvas y
        (targetSize - 100) / gridSize / 2 //cell size
      );
      BreathFirstAlg = new BreathFirst(
        grid, //grid
        createVector(0,0), //start pos
        MazeGenerator.endPos, //endpos
        gridSize, //grid size
        targetSize/2 + 25, //canvas x
        50, //canvas y
        (targetSize - 100) / gridSize / 2 //cell size
      );
      DepthFirstAlg = new DepthFirst(
        grid, //grid
        createVector(0,0), //start pos
        MazeGenerator.endPos, //endpos
        gridSize, //grid size
        targetSize/4 + 25, //canvas x
        targetSize/2 + 50, //canvas y
        (targetSize - 100) / gridSize / 2 //cell size
      );
      updatedFinders = true;
    }
    
    //Puts titles above the alogrithsm and runs each algorithm for 1 frame
    textAlign(CENTER);
    textSize(32);
    
    fill(0);
    text('A*', targetSize/4, 40);
    AStarAlg.drawAStar();
    
    fill(0);
    text('Breath First', targetSize* 3/4, 40);
    BreathFirstAlg.drawBreathFirst();
    
    fill(0);
    text('Depth First', targetSize/2, targetSize /2 + 40);
    DepthFirstAlg.drawDepthFirst();
  }
}

//If the generate maze button is pressed then generte or regerate the maze
var element = document.getElementById("GenerateMazeButton");
element.onclick = function(event) {
  //Makes the maze genreator object
  MazeGenerator = new Maze(grid, createVector(0,0), gridSize, 0,0, targetSize / gridSize);
  //Makes it so that the search algorithms have to be reinitialized
  updatedFinders = false;
  //Makes the screen active
  generating = true;
  //So it doesn't start pathfinding once the maze generation is over
  pathFinding = false;
}

var element = document.getElementById("PathFindButton");
element.onclick = function(event) {
  //Makes genearting true since can find a path without a maze
  generating = true;
  //Starts pahtfinding
  pathFinding = true;
  //Makes the search algorithms be reinitialized so it can restart if needed
  updatedFinders = false;
}

document.getElementById("SpeedSlider").oninput = function() {
  //Adjusts the speed using a square function in order to make it easier to control lower speeds
  frameRate(Math.max(0.1,pow(document.getElementById("SpeedSlider").value / 100, 2) * maxFrameRate));
  document.getElementById("SliderSpeed").innerText = "Speed: " + Math.max(0.01,pow(document.getElementById("SpeedSlider").value / 100, 2)).toFixed(2);
};
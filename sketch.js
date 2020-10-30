var ghost,ghostImage;
var ground,groundImage;
var doorGroup,clGroup1,iGroup;
var doorImage,clImage;
var gamestate="play";
function preload(){
  ghostImage=loadImage("ghost-standing.png");
  groundImage=loadImage("tower.png");
  doorImage=loadImage("door.png");
  clImage=loadImage("climber.png");
}
function setup(){
  createCanvas(600,600);
  ground=createSprite(300,300);
  ground.addImage(groundImage);
  ground.velocityY=1;
  ghost=createSprite(300,300,10,10);
  ghost.addImage(ghostImage);
  ghost.scale=0.3;
  doorGroup =new Group();
  clGroup1 =new Group();
  iGroup=new Group()
}
function draw(){
  background("black");
  if(gamestate==="play"){
    if(keyDown(LEFT_ARROW)){
      ghost.x=ghost.x-2;
    }
    if(keyDown(RIGHT_ARROW)){
      ghost.x=ghost.x+2;
    }
    if(keyDown("space")){
      ghost.velocityY=-7;
    }
    ghost.velocityY=ghost.velocityY+1;
    if (ground.y>400){
      ground.y=300;
    }
    spawnDoor();
    if (clGroup1.isTouching(ghost)){
     ghost.velocityY=0;
    }
    if (iGroup.isTouching(ghost)){
      gamestate="end"
    }
  }
  drawSprites()
 if(gamestate==="end") {
   ghost.destroy()
   ground.visible=false;
   doorGroup.setVisibleEach(false);
   clGroup1.setVisibleEach(false);
   iGroup.setVisibleEach(false);
   textSize(30);
   fill("red");
   text("gameover",200,200);
 }
}
function spawnDoor(){
  if (frameCount%200===0){
    var door=createSprite(200,0);
    door.x=Math.round(random(200,400));
    door.addImage(doorImage);
    door.velocityY=1;
    var cl=createSprite(200,50);
    cl.x=door.x
    cl.addImage(clImage);
    cl.velocityY=1;
    var inv=createSprite(200,10,50,2);
    inv.x=door.x;
    inv.velocityY=1;
    iGroup.add(inv);
    door.lifetime=600;
    cl.lifetime=800;
   doorGroup.add(door);
    clGroup1.add(cl);
    ghost.depth=door.depth;
    ghost.depth+=1;
  }
}
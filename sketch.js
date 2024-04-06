var splashScreen;
var backgroundImg;
var playB, infoB;
var gameState = "wait";
var player,playerImg;
var enemy1,enemy2,enemy3;
var enemy , enemyGroup;
var fireball, fireballImg, fireballGroup;
var ground;
var score = 0;
var enemy;
var dragonPlayer;
var dragonEnemy
var playerHealth = 200
var maxHealth = 200
 
function preload(){
    splashScreen = loadImage("./assets/Splashscreen.gif");
    backgroundImg = loadImage("./assets/Backround.jpeg");
    playerImg = loadImage("./assets/Dragon.png");
    fireballImg = loadImage("./assets/fireball.png");
    enemyImg = loadImage("./assets/enemy.gif");
    dragonEnemyImg = loadImage("./assets/dragonEnemy.gif");
    enemy1 = loadImage("./assets/enemy1.gif")
    enemy2 = loadImage("./assets/enemy2.gif");
    enemy3 = loadImage("./assets/enemy3.gif");
}

function setup(){
    createCanvas(windowWidth,windowHeight); //createCanvas(800,800);

    playB=createImg("./assets/play.png");
    playB.position(windowWidth/3,windowHeight/2);
    playB.size(100,100);
    playB.hide();

    infoB=createImg("./assets/About.png");
    infoB.position(windowWidth/2+100,windowHeight/2);
    infoB.size(100,100);
    infoB.hide();

    player = createSprite(windowWidth/8,windowHeight-110);
    player.addImage(playerImg);
    player.scale=0.9;
    player.visible = false;

    ground = createSprite(windowWidth/2,windowHeight-50,windowWidth,20);
    ground.visible = false;

    fireballGroup= new Group();

    enemyGroup = new Group();
    
}

function draw(){
    if(gameState == "wait"){
        background(splashScreen);
        playB.show();
        infoB.show();
    }

    playB.mousePressed(() => {
        playB.hide();
        infoB.hide();
        gameState = "level1";
    })

    infoB.mousePressed(()=>{
        playB.hide();
        infoB.hide();
        gameState= 'about';
    })

    if(gameState == "about"){
       aboutGame(); 
    }

    if(gameState == "level1"){
        background(backgroundImg);
        player.visible = true;
        playerMovement();
        healthLevel();
        spawnEnemies1();
        
        spawnFireball();
    }


   drawSprites();
   if(gameState == "level1"){
    fill("White");
    textSize(30);
    text("SCORE: "+score,windowWidth/2+300,windowHeight/12);
   }
   
  
   
}
function playerMovement(){
    if(player.x < 30){
        player.x = 30;
    }
    if(player.x > windowWidth-50){
        player.x = windowWidth-50;
    }

    if(player.y < 50){
        player.y = 50;
    }
    if(player.y > windowHeight-110){
        player.y = windowHeight-110;
    }
    player.collide(ground);

    if(keyDown("UP_ARROW")){
        player.y -= 25;
    }
    player.y +=15;
    
    if(keyDown("DOWN_ARROW")){
        player.y += 25;
    }
   
    if(keyDown("LEFT_ARROW")){
        player.x -=25;
    }
    
    if(keyDown("RIGHT_ARROW")){
        player.x +=25;
    }
}


function aboutGame(){
  swal({
    title : "About Game",
    text : "Use Spacebar to shoot the fireballs and arrow keys to move the dragon",
    textAlign : 'center',
    imageUrl : "./assets/Splashscreen.gif",
    imageSize : "200x200",
    confirmButtonText : "Go back to mainscreen",
    confirmButtonColor : "Green"
  },
  function(){
    gameState = "wait"
  })
}

function healthLevel(){
    noFill()
    stroke("DarkGreen")
    strokeWeight(2)
    rect(windowWidth/12,windowHeight/12,maxHealth,20)

    fill("darkGreen")
    noStroke()
    rect(windowWidth/12,windowHeight/12,playerHealth,20)
}

function spawnEnemies1(){
    enemy = createSprite(windowWidth+200, windowHeight-110);

    var ran = Math.round(Math.random()*2+1); //0.00011, 0.5, 0, 1 ,0.1

    //1,2,3
// case A: case B: (A,B,C)   case Parv: case Rohan: (Parv, Rohan)
if(frameCount % 100 == 0){
    switch(ran){
        case 1:
            enemy.addImage(enemy1);
            enemy.scale = 0.8;
            enemy.velocityX = -5;
            break;

        case 2:
            enemy.addImage(enemy2);
            enemy.scale = 0.8;
            enemy.velocityX = -5;
            break;
        case 3:
            enemy.addImage(enemy3);
            enemy.scale = 0.8;
            enemy.velocityX = -5;
            break;
        default:
            break;
    }
    enemyGroup.add(enemy);
}
    

}

function spawnFireball(){
    fireball=createSprite(windowWidth/8, windowHeight-50)

    fireball.addImage(fireballImg);
    fireball.velocityX = 5;
    fireballGroup.add(fireball);
}
var police, policeIMG; policeAnimation, thief, thiefIMG, obstacle, obstacleIMG, gameOver, gameOverIMG;
var invisibleGround;
var background, backgroundIMG;
var gameState;
var score;


function preload(){
   
    policeAnimation = loadAnimation("1police.png","2police.png","3Police.png","4Police.png","5Police.png","1police.png","2police.png","3Police.png","4Police.png","5Police.png","1police.png","2police.png","3Police.png","4Police.png","5Police.png","1police.png","2police.png","3Police.png","4Police.png","5Police.png");
    policeIMG = loadAnimation("3Police.png");
    backgroundIMG = loadImage("Bacground.png");
    obstacleIMG = loadImage("Obstacle.png");
    gameOverIMG = loadImage("gameOver.png");
}

function setup() {
    createCanvas(1000,600);


    background = createSprite(500,140);
    background.addImage(backgroundIMG);
    background.scale = 2.5;
    background.velocityX = -5

    police = createSprite(150,260);
    police.addAnimation("standing",policeIMG)
    police.addAnimation("running",policeAnimation);
    police.setCollider("rectangle",0,0,120,430)
    police.scale = 0.4;

    obstacle = createSprite(1000,330,100,100);
    obstacle.addImage(obstacleIMG);
    obstacle.velocityX = -5;
    obstacle.depth = background.depth + 1;
    obstacle.scale = 0.29;

    invisibleGround = createSprite(500,370,1000,20);
    invisibleGround.visible = false

    // police.debug = true;
    // obstacle.debug = true;

    gameOver = createSprite(500,200,10,10)
    gameOver.addImage("game",gameOverIMG);
    gameOver.visible = false;
    gameOver.scale = 0.5;


    gameState = "play";
    score = 0;
}
    
    

function draw() {


    if(gameState == "play"){

        police.changeAnimation("running",policeAnimation)

        if(background.x <-2000){
            background.x = 495
        }
    
        if(obstacle.x <= -100){
            obstacle.x = 1000
        }
    
        if(keyDown("space") && police.y >= 265){
            police.velocityY = -12
        }
        if(police.isTouching(obstacle)){
            gameState="end";
        }
        police.velocityY += 0.3;

        if(frameCount%30===0){
            ++score
        }
    }

    if(gameState ==="end"){
        obstacle.velocityX = 0;
        background.velocityX = 0;
        police.changeAnimation("standing",policeIMG)
        police.velocityY += 3;
        gameOver.visible = true;
    }

    police.collide(invisibleGround);
    drawSprites();

    fill("black")
    textSize(21)
    text("Score: "+score,900,20);
}
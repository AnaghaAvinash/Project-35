var dogI,dog,happyDog,database,foodS,foodStock;

function preload()
{
  dogI = loadImage("dogImg.png");
  happyDog = loadImage("dogImg1.png");
}

function setup() {
  database = firebase.database();
  createCanvas(500, 500);

  dog = createSprite(250,250,10,10);
  dog.addImage(dogI);
  dog.scale = 0.2;

  foodStock = database.ref("Food");
  foodStock.on("value",readStock);

  
}


function draw() {  
background(46,139,87);

if(keyWentDown(UP_ARROW)){
  writeStock(foodS);
  dog.addImage(happyDog);
}
  drawSprites();
  textSize(20);
  fill("white");
  text("Press 'up arrow' to Feed Drago milk",100,20);
  text("Bottles left: "+foodS,190,400);

}

function readStock(data){
  foodS = data.val();
}

function writeStock(x){
  if(x<0){
    x=0
  }else{
    x=x-1
  }
  database.ref('/').update({
    Food:x
  })
}




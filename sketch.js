//Create variables here
var dog, dogImg, happyDogImg, database,foodS,foodStock;


function preload()
{
	//load images here
  dogImg = loadImage("iamges/dogImg.png");
  happyDogImg = loadImage("images/dogImg1.png");
}

function setup() {
  database = firebase.database();
	createCanvas(500, 500);

  foodStock = database.ref("food");
  foodStock.on("value", readStock);
  foodStock.set(20);
  
  dog = createSprite(250,350,10,60);
  dog.addImage(dogImg);
  dog.scale = 0.2;

}


function draw() {  
  background("green");
  if(foodS!== undefined){
    textSize(20);
    fill(255);
    text("note: press UP ARROW to feed DRAGO MILK" , 50,50);
    text("food remaining: "+foodS, 150,150);

    if(keyWentDown(UP_ARROW)){
      writeStock(foodS);
      dog.addImage(happyDogImg);
    }
    if(keyWentUP(UP_ARROW)){
      dog.addImage(dogImg);
    }

    if(foodS === 0){
      foodS = 20;
    }
   

    drawSprites();

  }
}

function writeStock(x){
  if(x<=0){
    x = 0;
  }
  else{
    x=x-1;
  }
  database.ref("/").update({
    Food:x
  });
}

function readStock(data){
  foodS = data.val();
}



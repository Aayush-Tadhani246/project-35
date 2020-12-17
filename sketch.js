var dog, happyDog,database,foodS,foodStock;
var feedTime, lastFed;

function preload()
{
  dog = loadImage("dogImg.png");
  happyDog = loadImage("dogImg1.png");
}

function setup() {
  database=firebase.database();
  createCanvas(800, 500);

  foodObj = new Food();

  foodStock = database.ref('Food');
  foodStock.on("value", readStock) ;
  
  Dog = createSprite(700,250,25,25);
  Dog.addImage(dog);
  Dog.scale=0.15;
 
  feed = createButton('Feed Pet');
  feed.position(850,85);
  feed.mousePressed(feedDog);
  
  addFood=createButton("Add food");
  addFood.position(925,85);
  addFood.mousePressed(addFoods);
}

function draw() { 
 background(46,139,87);

  foodObj.display();

  fedTime = database.ref('FeedTime');
  fedTime.on("value", function(data){
    lastFed=data.val();
  })
 
  fill(255,255,254);
  textSize(15);
  if (lastFed>=12){
    text("Last Fed : " + lastFed%12 + "pm",350,30);
  } else if (lastFed==0){
    text("Last Feed : 12 AM", 350,30);
  }else{
    text("Last Feed :"+ lastFed + " AM", 350,30 );
  }

  drawSprites();
}


function readStock (data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}

function feedDog(){
  Dog.addImage(happyDog);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food: foodObj.getFoodStock(),
    FeedTime:hour()
  })
}

function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}


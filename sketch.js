var dog,happyDog,sadDog,database,foodS,foodStock;
var sadDogImg,happyDogImg;
var feedButton,addFoodButton;
var food;
var fedTime;
var readState,gameState;
function preload()
{
  sadDogImg = loadImage("dogImg.png");
  happyDogImg = loadImage("dogImg1.png");
}

function setup() {
  database = firebase.database();
  createCanvas(900,500);
  dog = createSprite(850,250,15,15);
  dog.addImage(sadDogImg);
  dog.scale = 0.25;
  foodStock = database.ref('Food');
  foodStock.on("value",readStock);
  food = new Food();
  fedTime = database.ref('fedTime');
  fedTime.on("value",function(data){
    fedTime = data.val();
  });
  readState = database.ref('gameState');
  readState.on("value",function(data){
    gameState = data.val();
  });
  feedButton = createButton("Feed The Dog");
  feedButton.position(685,100);
  feedButton.mousePressed(feedDog);
  addFoodButton = createButton("Add Food");
  addFoodButton.position(795,100);
  addFoodButton.mousePressed(addFood);

}
function draw() 
{
  currentTime = hour();
  background(46,139,87);  
  food.display();
  drawSprites();
  textSize(20);
  fill("white");
  text("Food Remaining: "+foodS,170,100);
  if(fedTime>=12)
        {
        fill("white");
        textSize(15); 
        text("Last Fed : "+ fedTime%12 + " PM", 350,30);
        }
        else if(fedTime==0)
        {
            fill("white");
            textSize(15); 
             text("Last Fed : 12 AM",350,30);
        }
        else
        {
            fill("white");
            textSize(15); 
            text("Last Fed : "+ fedTime + " AM", 350,30);
        }
}
function readStock(data)
{
  foodS = data.val();
  food.updateFoodStock(foodS);
}
function feedDog()
{
    dog.addImage(happyDogImg);
    foodS--;
    database.ref('/').update({
      Food : foodS
    })
    fedTime = hour(); 
}
function addFood()
{
  dog.addImage(sadDogImg);
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}
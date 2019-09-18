window.onload = function(){
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');
    const height = canvas.offsetHeight;
    const width = canvas.offsetWidth;
    let dir = 'right'; // Sparar vilken riktining ormen rör sig. 
    ctx.strokeRect(0, 0, width, height);
    var foodX;
    var foodY;
    let score = 0;

    let snake = [  
        {x: 150, y: 150},  
        {x: 140, y: 150},  
        {x: 130, y: 150},  
        {x: 120, y: 150},  
        {x: 110, y: 150},
    ]; // Ormens startposition. 
    function clearCanvas(){
        ctx.fillStyle = 'white';
        ctx.strokestyle = 'black';
        ctx.fillRect(0,0, width, height)
        ctx.strokeRect(0,0, width,height)
    }
    function drawSnakePart(snakePart) {  // För att visa ormen
        ctx.fillStyle = 'lightgreen';  
        ctx.strokestyle = 'darkgreen';
        ctx.fillRect(snakePart.x, snakePart.y, 10, 10);  ctx.strokeRect(snakePart.x, snakePart.y, 10, 10);
    }
    function drawSnake() {  // Funktion som skapar ormen i canvas 
       // snake.forEach(drawSnakePart);
       for(i = 0; i < snake.length; i++){
           drawSnakePart(snake[i]);
       }
    }
    function collision(newHead){
        if(newHead.y < 0 /* Förhindrar ormen från att inte åka över canvasen*/ || newHead.y >= height /*Förhindrar ormen från att inte åka under canvasen*/){ 
            return true
        }
        if(newHead.x < 0 || newHead.x >= width){
            return true;
        }
    }
    
    function advanceSnake(){
        let newHead ={...snake[0]}; // placerar ormens huvud. 
        if(dir === 'up'){
         
            newHead.y -= 10;
        }
       else if(dir === 'down'){
       
            newHead.y += 10;
        }
        else if(dir === 'left'){
           
            newHead.x -= 10;
        }
        else if(dir === 'right'){
            
            newHead.x += 10;
        }
       // if(collisionSnake(newHead)) return
        //Kontrollera kollision med väggen
        if(collision(newHead)) return 
        

        
        snake.unshift(newHead) //Lägger till nytt huvud i början av arayen. 
        if(collisionFood(newHead)){
             score += 10;    document.getElementById('score').innerHTML = "Poäng " + score;
             return
        }

        snake.pop(); // Pop tar bort sista delen av ormen (array). 

        
    }
    function checkKey(e) 
    {   
        e = e || window.event;
        if(e.keyCode == '38' && dir != 'down')
        dir = 'up';
        else if (e.keyCode == '40' && dir != 'up')
        dir = 'down';
        else if (e.keyCode == '37' && dir != 'right')
        dir ='left';
        else if (e.keyCode == '39' && dir != 'left')
        dir = 'right';
    }
    function randomTen(min, max) 
    {  
        return Math.round((Math.random() * (max-min) + min) / 10) * 10;
    }
    function createFood() { // Skapar maten. 
        foodX = randomTen(0, gameCanvas.width - 10);  foodY = randomTen(0, gameCanvas.height - 10);
            snake.forEach(function isFoodOnSnake(part){    
            const foodIsOnSnake = part.x == foodX && part.y == foodY    
            if (foodIsOnSnake)      createFood();  });
        }
    function drawFood() 
    { 
        ctx.fillStyle = 'red'; ctx.strokestyle = 'darkred'; 
        ctx.fillRect(foodX, foodY, 10, 10); 
        ctx.strokeRect(foodX, foodY, 10, 10);
    }
    function collisionFood(snakeHead){

            if(snakeHead.y == foodY && snakeHead.x == foodX){
                createFood();
                return true;

            }
            
    }
    /* Påbörjad funktion för att se om ormen slår i sig själv
    function collisionSnake(){ 
        if(snakeHead.y == snakeHead.y || snakeHead.x == snakeHead.x)return true;
    }*/
    
    document.addEventListener("keydown", checkKey)
    createFood()
    setInterval(function(){
        clearCanvas()
        drawFood()
        advanceSnake()
        drawSnake()
        
       
    },50)
    

    
    
    
    
}


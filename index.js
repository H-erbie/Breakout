let sectionBody = document.querySelector('.section-body');
const blockWidth = 30;
let timerid;
const blockHeight = 20;
let statInfo = document.querySelector('.stat-info');
let score = document.querySelector('.score');
scoreCount = 0;
const userStart = [200, 5];
let currentPosition = userStart;
const ballStart = [200, 10];
let ballCurrentPosition = ballStart;
let xDirection = 2;
let yDirection = 2;
const ballDiameter = 20;
const boardHeight = 500;
const boardWidth = 450;
let stat = document.querySelector('.stat')
class Block{
    constructor(xAxis, yAxis){
    this.bottomLeft = [xAxis, yAxis];
    this.bottomRight = [xAxis + blockWidth, yAxis];
    this.topLeft = [];
    this.topLeft = [xAxis, yAxis + blockHeight];
    this.topRight = [xAxis + blockWidth, yAxis + blockHeight];
}
}
//blocks' coordinates
const blocks = [
    new Block(20, 450),
    new Block(80, 450),
    new Block(140, 450),
    new Block(200, 450),
    new Block(260, 450),
    new Block(320, 450),
    new Block(380, 450),
    new Block(20, 400),
    new Block(80, 400),
    new Block(140, 400),
    new Block(200, 400),
    new Block(260, 400),
    new Block(320, 400),
    new Block(380, 400),
    new Block(80, 350),
    new Block(140, 350),
    new Block(200, 350),
    new Block(260, 350),
    new Block(320, 350),
    new Block(380, 350),
    new Block(20, 350),
]
const breakOut = {
    //add blocks
    loadBlocks: function(){
        for(let i = 0; i < blocks.length; i++){
          let block = document.createElement('div');
             block.className = 'block';
             block.style.left = blocks[i].bottomLeft[0] + 'px';
             block.style.bottom = blocks[i].bottomLeft[1] + 'px';
            sectionBody.append(block);
        }
    },
    //add user
    User: function(){
        const user = document.createElement('div');
        user.className = 'user';
        sectionBody.append(user);
        this.showUser();
    },
    //show user
    showUser: function (){
        let user = document.querySelector('.user');
        user.style.left = currentPosition[0] + 'px';
        user.style.bottom = currentPosition[1] + 'px';
    },
    //show ball
    showBall: function(){
        let ball = document.querySelector('.ball');
        ball.style.left = ballCurrentPosition[0] + 'px';
        ball.style.bottom = ballCurrentPosition[1] + 'px';
    },
    //move user
    moveUser: function(e){
        switch(e.key){
            case 'ArrowLeft':
                if(currentPosition[0] > 10){
                    currentPosition[0] -= 50;
                    breakOut.showUser();
                }
                break;
            case 'ArrowRight':
                if(currentPosition[0] < boardWidth - 50){
                    currentPosition[0] += 50;
                    breakOut.showUser(); 
                }
                break;
        }
    },
    //add ball
    ball: function(){
        const ball = document.createElement('div');
        ball.className = 'ball';
        sectionBody.append(ball);
        this.showBall();
    },
    //move ball
    moveBall: function(){
        ballCurrentPosition[0] += xDirection;
        ballCurrentPosition[1] += yDirection;
        breakOut.showBall();
        breakOut.checkForCollision();
        if(ballCurrentPosition[1] <= 0){
            clearInterval(timerid);
            statInfo.textContent = 'Game Over';
            score.textContent = `Score: ${scoreCount}`;
            stat.classList.add('showStat');
            document.removeEventListener('keydown', breakOut.moveUser)
        }
    },
    //check for collisions
    checkForCollision: function(){
        for(let i = 0; i < blocks.length; i++){
            //block collisions
            if(ballCurrentPosition[0] > blocks[i].bottomLeft[0] &&
                ballCurrentPosition[0] < blocks[i].bottomRight[0] &&
                (ballCurrentPosition[1] + 30) > blocks[i].bottomLeft[1] &&
                ballCurrentPosition[1] < blocks[i].topLeft[1]){
                    console.log(blocks[i], i, ballCurrentPosition);
                    const allBlocks = Array.from(document.querySelectorAll('.block'));
                    allBlocks[i].classList.remove('block');
                    blocks.splice(i, 1);
                    scoreCount ++;
                    //for win
                    if(blocks.length === 0){
                        statInfo.textContent = 'You win! You deserve booze🍺';
                        score.textContent = `Score: ${scoreCount}`;
                        stat.classList.add('showStat');
                        clearInterval(timerid)
                        document.removeEventListener('keydown', breakOut.moveUser)
                    }
            }
            //user collisions
             if(ballCurrentPosition[0] > currentPosition[0] && ballCurrentPosition[0] < 
                currentPosition [0] + 50 && ballCurrentPosition[1] < currentPosition [1] + 50 &&
                ballCurrentPosition[1] < currentPosition[1] + 20){
                breakOut.changeDirection();
             }
        }
        if(ballCurrentPosition[0] >= (boardWidth - ballDiameter)||
        ballCurrentPosition[1] >= (boardHeight - ballDiameter) ||
        ballCurrentPosition[0] <= 0 || ballCurrentPosition[1] < 0){
            breakOut.changeDirection();
        };
    },
    changeDirection: function(){
        if(xDirection == 2 && yDirection == 2){
            xDirection -= 4;
            return;
        }
        if(xDirection == -2 && yDirection == 2){
            yDirection -= 4;
            return;
        }
        if(xDirection == -2 && yDirection == -2){
            xDirection += 4
            return;
        }
        if(xDirection == 2 && yDirection == -2){
            yDirection += 4;
            return;
        }
    },
    // onBallCollision: function(){
    //     if (ballCurrentPosition[0] = currentPosition[0]){
    //         xDirection -= 4;
    //     }
    // }
}

breakOut.loadBlocks();
breakOut.User();

breakOut.ball();

timerid = setInterval(breakOut.moveBall, 0);
document.addEventListener('keydown', breakOut.moveUser);
var player = document.getElementById("player");
var pxSprPlayerX = 0;
var pxsSprPlayerContainerSprs = [0, 100, 200, 300], pxsCountSprPlayerContainerX=0;

var isLeft = false, isRight = false;

var px = 0;
var py = 0;
var spd = 2;
var jumpForce = 5;

var rb = 0.00;
var gravityScale = 1;

var isGrounded = false;
var isJumping = false;
var canJump = false;

function drawObj(x, y, w, h, brdColor, bgColor) {
    var obj = document.createElement("div");
    obj.style.position = "absolute";
    obj.style.backgroundColor = bgColor;
    obj.style.border = brdColor;
    obj.style.width = w + "px";
    obj.style.height = h + "px";
    obj.style.marginLeft = x + "px";
    obj.style.marginTop = y + "px";
    document.body.appendChild(obj);
}

class Ball {
    constructor(x, y) {
        this.xx = x;
        this.yy = y;

        this.hspd = 1;
        this.vspd = 1;

        this.speed = 2;

        this.color = "#ffffff";

        this.started = false;

        var obj = document.createElement("div");

        this.init = () => {
            this.started = true;
            obj.style.position = "absolute";
            obj.style.backgroundColor = this.color;
            // obj.style.border = brdColor;
            obj.style.borderRadius="100%";
            obj.style.width = 25 + "px";
            obj.style.height = 25 + "px";
            obj.style.marginLeft = x + "px";
            obj.style.marginTop = y + "px";
            document.body.appendChild(obj);
        }

        this.update = () => {
            if(this.started) {
                this.xx+=this.hspd*this.speed;
                this.yy+=this.vspd*this.speed;

                obj.style.marginLeft = this.xx + "px";
                obj.style.marginTop = this.yy + "px";
                obj.style.backgroundColor = this.color;
            }
        }
    }
}

var ball1 = new Ball(150, 50);

class Block {
    constructor(x, y, id) {
        this.upCorner = {
            xx: x,
            yy: y,
            init: function() {
                drawObj(this.xx, this.yy, 50, 0.1, "1px solid #ff00ff");
            },
            update: function() {
                if(px < this.xx + 50 && px > this.xx - 50 
                    && py < this.yy - 64 && py > this.yy - 78
                ) {
                    isGrounded = true;
                }

                if(ball1.xx < this.xx + 35 && ball1.xx > this.xx - 35 
                    && ball1.yy > this.yy - 25 && ball1.yy < this.yy - 20
                ) {
                    ball1.vspd = -1;
                    ball1.speed += 0.005;
                }
            }
        }

        this.downCorner = {
            xx: x,
            yy: y+50,
            init: function() {
                drawObj(this.xx, this.yy, 50, 0.1, "1px solid #ff00ff");
            },
            update: function() {
                if(px < this.xx + 35 && px > this.xx - 35 &&
                    py > this.yy && py < this.yy + 10
                ) {
                    jumpForce = 0;
                }

                if(ball1.xx < this.xx + 50 && ball1.xx > this.xx - 50
                    && ball1.yy < this.yy && ball1.yy > this.yy - 5
                ) {
                    ball1.vspd = 1;
                    ball1.speed += 0.005;
                }
            }
        }

        this.leftCorner = {
            xx: x,
            yy: y,
            init: function() {
                drawObj(this.xx, this.yy, 0.1, 50, "1px solid #ff00ff");
            },
            update: function() {
                if(px < this.xx  && px > this.xx - 55 &&
                    py < this.yy + 50 && py > this.yy - 50
                ) {
                    px = px - spd;
                }else {
                }

                if(ball1.xx < this.xx + 25 && ball1.xx > this.xx - 25
                    && ball1.yy > this.yy - 15 && ball1.yy < this.yy + 40
                ) {
                    ball1.hspd=-1;
                    ball1.speed += 0.005;
                }
            }
        }

        this.rightCorner = {
            xx: x+50,
            yy: y,
            init: function() {
                drawObj(this.xx, this.yy, 0.1, 50, "1px solid #ff00ff");
            },
            update: function() {
                if(px > this.xx && px < this.xx + 5 &&
                    py < this.yy + 50 && py > this.yy - 50
                ) {
                    px = px + spd;
                }else {
                }

                if(ball1.xx < this.xx + 2 && ball1.xx > this.xx - 2
                    && ball1.yy > this.yy - 15 && ball1.yy < this.yy + 40
                ) {
                    ball1.hspd = 1;
                    ball1.speed += 0.005;
                }
            }
        }

        // this.upCorner.init();
        // this.downCorner.init();
        // this.leftCorner.init();
        // this.rightCorner.init();

        if(id == 0) {
            this.upCorner.init();
            this.downCorner.init();
            this.leftCorner.init();
            this.rightCorner.init();
        }
        
        if(id == 1) {
            var obj = document.createElement("div");
            obj.style.position = "absolute";
            obj.style.backgroundImage = `url("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4wab2n628aQuXAkUlGrqxSoHUaKaR2Wtz4g&s")`;
            obj.style.width = 50 + "px";
            obj.style.height = 50 + "px";
            obj.style.marginLeft = x + "px";
            obj.style.marginTop = y + "px";
            document.body.appendChild(obj);
        }

        if(id == 2) {
            var obj = document.createElement("div");
            obj.style.position = "absolute";
            obj.style.backgroundImage = `url("https://pt.quizur.com/_image?href=https://img.quizur.com/f/img61b9014f18d5a9.58248829.jpg?lastEdited=1639514451?o=feed&w=250&h=300&f=webp")`;
            obj.style.backgroundSize = "60px 40px";
            obj.style.width = 50 + "px";
            obj.style.height = 50 + "px";
            obj.style.marginLeft = x + "px";
            obj.style.marginTop = y + "px";
            document.body.appendChild(obj);
        }

        if(id == 3) {
            var obj = document.createElement("div");
            obj.style.position = "absolute";
            obj.style.backgroundImage = `url("https://bugs.mojang.com/secure/thumbnail/199082/_thumb_199082.png")`;
            obj.style.backgroundSize = "50px 50px";
            obj.style.width = 50 + "px";
            obj.style.height = 50 + "px";
            obj.style.marginLeft = x + "px";
            obj.style.marginTop = y + "px";
            document.body.appendChild(obj);
        }

        this.update = () => {
            this.upCorner.update();
            this.downCorner.update();
            this.leftCorner.update();
            this.rightCorner.update();
        }
    }
}

// addEventListener("mousemove", function(e) {
//     px = e.x;
//     py = e.y;
// })

function playerUpdate() {
    if(isLeft || isRight) {
        pxsCountSprPlayerContainerX++;
        pxSprPlayerX = pxsSprPlayerContainerSprs[pxsCountSprPlayerContainerX];
        
        if(pxsCountSprPlayerContainerX > pxsSprPlayerContainerSprs.length - 1) {
            pxSprPlayerX = 0;
            pxsCountSprPlayerContainerX=0;
        }

        if(isLeft) {
            px-=spd;
            player.style.transform = "rotateY(180deg)";
        }
        if(isRight) {
            px+=spd;
            player.style.transform = "rotateY(0)";
        }
    }else {
        pxSprPlayerX = 450;
    }

    if(px<0){px=0}if(px>=1250){px=1250}

    if((ball1.xx < px + 25 && ball1.xx > px - 25
        && ball1.yy > py - 50 && ball1.yy < py + 50) && ball1.started) {
        window.location.reload();
    }

    if(isJumping && canJump) {
        isGrounded = false;
        rb = 0;
        py -= jumpForce;
        setTimeout(() => {
            isJumping = false;
        }, 100);   
    }else {
        canJump = false;
        rb += gravityScale;
        py += rb / 4;
    }

    if(py >= 440) {
        isGrounded = true;
    }

    if(isGrounded) {
        rb = -gravityScale;
        canJump = true;
    }

    player.style.backgroundPositionX = `${pxSprPlayerX}px`;
    player.style.marginLeft = `${px}px`;
    player.style.marginTop = `${py}px`;
}

var blocks = [
    // new Block(0, 0),
]

var map = [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 
    1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 

    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 1, 

    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 
    1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 

    0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 
]

let layers = [
    1,
    1,
    1,
    2,
    2,
    2,
    2,
    3,
    3,
    3,
];
let variationLevel = 19.1;
for(let xx = 0;xx<map.length/10;xx++) {
    for(let yy=0;yy<map.length/10;yy++) {
        if((Math.random() * 20) >= variationLevel){
            map[10*2] = 0;
            map[10*2+1] = 0;
            map[10*8] = 0;map[10*8+1] = 0;map[10*8+2] = 0;map[10*8+3] = 0;
            map[1-xx+yy+xx*10] = Math.floor(Math.random()*3);
        }
    }
}

for(let i = 0; i < 26; i++) {
    if(map[i]==1) {
        blocks.push(new Block(-0 + i * 50, 0, layers[0]));
    }
}

for(let i = 26; i < 52; i++) {
    if(map[i]==1) {
        blocks.push(new Block(-1300 + i * 50, 50, layers[1]));
    }
}

for(let i = 52; i < 78; i++) {
    if(map[i]==1) {
        blocks.push(new Block(-2600 + i * 50, 100, layers[2]));
    }
}

for(let i = 78; i < 104; i++) {
    if(map[i]==1) {
        blocks.push(new Block(-3900 + i * 50, 150, layers[3]));
    }
}

for(let i = 104; i < 130; i++) {
    if(map[i]==1) {
        blocks.push(new Block(-5200 + i * 50, 200, layers[4]));
    }
}


for(let i = 130; i < 156; i++) {
    if(map[i]==1) {
        blocks.push(new Block(-6500 + i * 50, 250, layers[5]));
    }
}

for(let i = 156; i < 182; i++) {
    if(map[i]==1) {
        blocks.push(new Block(-7800 + i * 50, 300, layers[6]));
    }
}

for(let i = 182; i < 208; i++) {
    if(map[i]==1) {
        blocks.push(new Block(-9100 + i * 50, 350, layers[7]));
    }
}

for(let i = 208; i < 234; i++) {
    if(map[i]==1) {
        blocks.push(new Block(-10400 + i * 50, 400, layers[8]));
    }
}

for(let i = 234; i < 260; i++) {
    if(map[i]==1) {
        blocks.push(new Block(-11700 + i * 50, 450, layers[9]));
    }
}

// for(let i = 10; i < 20; i++) {
//     if(map[i]==1) {
//         blocks.push(new Block(-500+i*50, 50, layers[1]));
//     }
// }

// for(let i = 20; i < 30; i++) {
//     if(map[i]==1) {
//         blocks.push(new Block(-1000+i*50, 100, layers[2]));
//     }
// }

// for(let i = 30; i < 40; i++) {
//     if(map[i]==1) {
//         blocks.push(new Block(-1500+i*50, 150, layers[3]));
//     }
// }

// for(let i = 40; i < 50; i++) {
//     if(map[i]==1) {
//         blocks.push(new Block(-2000+i*50, 200, layers[4]));
//     }
// }

// for(let i = 50; i < 60; i++) {
//     if(map[i]==1) {
//         blocks.push(new Block(-2500+i*50, 250, layers[5]));
//     }
// }

// for(let i = 60; i < 70; i++) {
//     if(map[i]==1) {
//         blocks.push(new Block(-3000+i*50, 300, layers[6]));
//     }
// }

// for(let i = 70; i < 80; i++) {
//     if(map[i]==1) {
//         blocks.push(new Block(-3500+i*50, 350, layers[7]));
//     }
// }

// for(let i = 80; i < 90; i++) {
//     if(map[i]==1) {
//         blocks.push(new Block(-4000+i*50, 400, layers[8]));
//     }
// }

// for(let i = 90; i < 100; i++) {
//     if(map[i]==1) {
//         blocks.push(new Block(-4500+i*50, 450, layers[9]));
//     }
// }

for(let xx = 0;xx<map.length/10;xx++) {
    for(let yy=0;yy<map.length/10;yy++) {
        // << 128
    }
}

var hoverMouseDown = false;

addEventListener("mousedown", function(e) {
    let x = e.x-30;
    let y = e.y-30;
    blocks.push(new Block(x, y, idHover));
    console.log("x: "+ x + " y: " + y);

    if(hoverEsterEgg == 1){
        hoverMouseDown = true;
    }
});
addEventListener("mouseup", function(e) {
    if(hoverEsterEgg == 1) {
        hoverMouseDown = false;
    }
});
var hover=document.getElementById("hover");
addEventListener("mousemove", function(e) {
    hover.style.marginLeft=e.x-30+"px";
    hover.style.marginTop=e.y-30+"px";

    // ball1.xx = e.x;
    // ball1.yy = e.y;

    if(hoverMouseDown) {
        blocks.push(new Block(e.x-30, e.y-30, idHover));
    }
});

function update() {
    if(idHover == 1) {
        hover.style.backgroundImage = `url("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4wab2n628aQuXAkUlGrqxSoHUaKaR2Wtz4g&s")`;
        hover.style.border = "0px solid #000";
        hover.style.backgroundSize = "100px 100px";
    }

    if(idHover == 2) {
        hover.style.backgroundImage = `url("https://pt.quizur.com/_image?href=https://img.quizur.com/f/img61b9014f18d5a9.58248829.jpg?lastEdited=1639514451?o=feed&w=250&h=300&f=webp")`;
        hover.style.border = "0px solid #000";
        hover.style.backgroundSize = "60px 40px";
    }

    if(idHover == 3) {
        hover.style.backgroundImage = `url("https://bugs.mojang.com/secure/thumbnail/199082/_thumb_199082.png")`;
        hover.style.border = "0px solid #000";
        hover.style.backgroundSize = "50px 50px";
    }

    if(idHover == 0) {
        hover.style.backgroundImage = null;
        hover.style.border = "3px solid #ff00ff";
    }

    if(idHover == -1) {
        hover.style.backgroundImage = null;
        hover.style.border = "0px solid #000";
    }

    jumpForce = 5;
    isGrounded = false;

    for(let i=0;i<blocks.length;i++){
        blocks[i].update();
    }
    if(py < 0) {
        jumpForce = 0;
    }

    if(ball1.xx >= 1300-25-1) {
        ball1.hspd = -1;
    }
    if(ball1.yy >= 500-25) {
        ball1.vspd = -1;
    }
    if(ball1.yy <= 0) {
        ball1.vspd = 1;
    }
    if(ball1.xx <= 0){
        ball1.hspd = 1;
    }
    
    playerUpdate();

    ball1.update();
}

setInterval(update, 1000 / 120);

var idHover = 1;
var hoverEsterEgg = 0;

setInterval(() => {
    if(hoverEsterEgg) {
        idHover ++;
        if(idHover >= 4) {
            idHover = 0;
        }
    }
}, 100);

addEventListener("keydown", function(e) {
    if(e.key == "a") {
        isLeft = true;
    }
    if(e.key == "d") {
        isRight = true;
    }
    if(e.keyCode == 32) {
        isJumping = true;
    }

    if(e.key == "1") {idHover = 1;}
    if(e.key == "2") {idHover = 2;}
    if(e.key == "3") {idHover = 3;}
    if(e.key == "4") {idHover = 0;}
    if(e.key == "0") {idHover = -1;}
    if(e.key == "g") {
        hoverEsterEgg ++;
        if(hoverEsterEgg > 1) {
            hoverEsterEgg = 0;
        }
    }

    if(e.key == "b") {
        ball1.init();
        ball1.started = true;
    }

    if(e.key == "e") {
        this.window.location.reload();
    }
});

addEventListener("keyup", function(e) {
    if(e.key == "a") {
        isLeft = false;
    }
    if(e.key == "d") {
        isRight = false;
    }
    if(e.keyCode == 32) {
    }
});
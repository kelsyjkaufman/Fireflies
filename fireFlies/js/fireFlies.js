function init() {
    
    canvas = document.querySelector('#myCanvas');
    ctx = canvas.getContext('2d');
    
    fireFlies = [];   // same as fireFlies = new Array();
    numFlies = 250;
    angleX = 0;
    angleY = 0;
    range = 1.2;
    xSpeed = .7;
    ySpeed = .1;
    fps = 15;   // (frame per second)
    
    //
    // Create a batch of Firefly particles and add
    // each new particle to fireFlies array
    //
    for (var i = 0; i < numFlies; i++) {
        
        xVelocity = randRange(-4, 2);
        yVelocity = randRange(-4, 2);
        
        // We don't really want our velocity values to be near 0
        if (xVelocity < 1 && xVelocity > -1) {
            xVelocity = -1;
        }
        
        if (yVelocity < 1 && yVelocity > -1) {
            yVelocity = -1;
        }
        
        
        // Create a new Firefly particle object and add it to 
        // fireFlies array
        fireFlies.push(new FireFly(10, canvas.height - 10, 10, canvas.width - 10, xVelocity, yVelocity));
        
    }  // end for
    
    // 
    // Get the firefly animation started using a timer...
    // and have it run repeatedly at our framerate until
    // the user leaves the page.
    //
    window.requestAnimationFrame = window.requestAnimationFrame ||
                                   window.mozRequestAnimationFrame ||
                                   window.webkitRequestAnimationFrame ||
                                   window.msRequestAnimationFrame;
    
    // run update() function (heartbeat) to get it started
    requestAnimationFrame(update);
    
}   // end init()


//
// Constructor function to build a new FireFly particle object
//
function FireFly(topEdge, bottomEdge, leftEdge, rightEdge, xVel, yVel) {
    
    // Save the passed-in parameters in properties for later use
    this.top = topEdge;
    this.bottom = bottomEdge;
    this.left = leftEdge;
    this.right = rightEdge;
    this.xVelocity = xVel;
    this.yVelocity = yVel;
    
    // initial position
    this.x = Math.random() * canvas.width / 2;
    this.y = Math.random() * canvas.height;
    
    this.alpha = randRange(.2, .9);
    
    this.color = 'rgba(153, 255, 51, ' + this.alpha + ')';
    
    // set size of particle
    this.radius = randRange(.2, .9);
    
}


// 
// Draw and animate the FireFly particle objects
//
function update() {
    
    // Use setTimeout() to set the framerate
    setTimeout(function() {
        
        // clear the canvas so it can be refreshed (redrawn)
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Let's draw the FireFly particles from our fireFlies
        // array onto the canvas
        for (var i = 0; i < fireFlies.length; i++) {
            
            // get and store the next FireFly particle from the array
            fly = fireFlies[i];
            
            // start drawing the particle
            ctx.beginPath();
            
            // set up a radial gradient
            var gradient = ctx.createRadialGradient(fly.x, fly.y, 0, fly.x, fly.y, fly.radius);
            
            // Set up color stops for our radial gradient
            gradient.addColorStop(0, '#fff');
            gradient.addColorStop(.4, '#00ff00');
            gradient.addColorStop(.4, fly.color);
            gradient.addColorStop(1, '#aaa');
            
            ctx.fillStyle = gradient;
            
            // make em blink
            if (Math.random() < .9) {
                
                // draw the circle
                ctx.arc(fly.x, fly.y, fly.radius, 0, Math.PI*2, false);
                
                ctx.fill();
                
            }
            
            ctx.closePath();
            
            //animate each firefly particle
            //
            //apply a velocity to change their x and y positions
            //
            fly.x += fly.xVelocity + Math.cos(angleX) + range;
            fly.y += fly.yVelocity + Math.sin(angleY) + range;
            
            //Alter the angles
            angleX += xSpeed;
            angleY += ySpeed;
            
            //collision detection for our boundaries
            //
            //check bottom edge
            if (fly.y >= fly.bottom + 25 && fly.yVelocity > 0) {
                
                fly.y = fly.bottom + 5;
                fly.yVelocity *= -1;
                
            }
            //check top
            else if (fly.y <= fly.top - 25 && fly.yVelocity < 0) {
                
                fly.y = 5;
                fly.yVelocity *= -1;
                
            }
            //check right
            else if (fly.x >= fly.right + 25 && fly.xVelocity > 0) {
                fly.x = fly.right + 5;
                fly.xVelocity *= -1;
            }
            //check left
            else if (fly.x <= fly.left - 25 && fly.xVelocity < 0) {
                fly.x = 5;
                fly.xVelocity *= -1;
            };
        } //end for
        
        requestAnimationFrame(update);
        
    }, 1000/fps);
    
}


function randRange(min, max) {
    
    return Math.random() * (max - min) + min;
    
}
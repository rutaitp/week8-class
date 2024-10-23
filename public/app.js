console.log('The page is working!');

//10. Socket connection on the client-side
let socket = io();
let r;
let g;
let b;
let size;

//11. Log when someone connects
socket.on('connect', () => {
  console.log('Client connected: ' + socket.id);
});

//15. listen for data from the server
socket.on('data', (data) => {
  console.log(data);

  //16. draw ellipses with the data
  noStroke();
  fill(data.r, data.g, data.b);
  ellipse(data.x, data.y, data.size, data.size);
});

//20. listen for a color change ping
socket.on('colorChange', () => {
  r= random(255);
  g = random(255);
  b = random(255);
  size = random(10, 20);
})

//STEP 3. p5 setup
function setup(){
  createCanvas(windowWidth, windowHeight);
  background(255);

  r= random(255);
  g = random(255);
  b = random(255);
  size = random(10, 20);
}

function mouseMoved(){
  // fill(0);
  // ellipse(mouseX, mouseY, 10, 10);

  //12. emit the data
  let ellipseInfo = {
    x: mouseX,
    y: mouseY,
    r: r,
    g: g,
    b: b,
    size: size
  }
  socket.emit('data', ellipseInfo);
}

//20. change color and size on mouse press
function mousePressed(){
  //ping the server
  socket.emit('colorChange');
}

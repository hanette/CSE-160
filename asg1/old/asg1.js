// Hanette Le (hanle)
// asg1

// Global Variables
var gl;
var g_points = []; // The array for the position of a mouse press
var g_colors = []; // The array to store color of a point
var shape = 0; // 0 is square, 1 is triangles, 2 is circles
var size = 10;
var sCount = 5.5;
var drag = false;

// Vertex shader program ==========================================
var VSHADER_SOURCE =
    'attribute vec4 a_Position;\n' +
    'attribute float a_PointSize; \n' +
    'void main() {\n' +
    ' gl_Position = a_Position;\n' +
    ' gl_PointSize = a_PointSize;\n' +
    '}\n';

// Fragment shader program ========================================
var FSHADER_SOURCE =
    'precision mediump float;\n' +
    'uniform vec4 u_FragColor;\n' +
    'void main() {\n' +
    '  gl_FragColor = u_FragColor;\n' + // Set the point color (red)
    '}\n';

function main() {
  // Retrieve <canvas> element =================================
  var canvas = document.getElementById('asg1');

  // Send message if retrieving canvas fails
  if (!canvas) {
      console.log('Failed to retrieve the <canvas> element');
      return;
  }

  // Rendering context for WebGL ===============================
  gl = getWebGLContext(canvas);
  if(!gl){
      console.log('Failed to get the rendering context for WebGL');
      return;
  }

  // Initialize shaders ========================================
  if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
      console.log('Failed to intialize shaders.');
      return;
  }

  // Get the storage location of attribute variable =============
  var a_PointSize = gl.getAttribLocation(gl.program, 'a_PointSize');
  var a_Position = gl.getAttribLocation(gl.program, 'a_Position');
  if (a_Position < 0) {
      console.log('Failed to get the storage location of a_Position');
      return;
  }

  // Get the storage location of attribute variable =============
  var u_FragColor = gl.getUniformLocation(gl.program, 'u_FragColor');
  if (!u_FragColor) {
      console.log('Failed to get u_FragColor');
      return;
  }

  // Register function (event handler) to be
  // called on a mouse press ====================================
  canvas.onmousedown = function(ev){
     click(ev, gl, canvas, a_Position, a_PointSize, u_FragColor);
     drag = true;
  };

  canvas.onmouseup = function(ev){
     drag = false;
  };

  canvas.onmousemove = function(ev){
     if(drag){
        click(ev, gl, canvas, a_Position, a_PointSize, u_FragColor);
     }
  };

  // Specify the color for clearing <canvas> ===================
  gl.clearColor(0.0, 0.0, 0.0, 1.0);

  // Clear <canvas>
  gl.clear(gl.COLOR_BUFFER_BIT);

} // end of main

function click(ev, gl, canvas, a_Position, a_PointSize, u_FragColor) {
   var x = ev.clientX; // x coordinate of a mouse pointer
   var y = ev.clientY; // y coordinate of a mouse pointer
   var rect = ev.target.getBoundingClientRect() ;
   size = 11 - (Math.round(document.getElementById('size').value)); // helps adjust size
   sCount = document.getElementById('sCount').value; // helps adjust size
   var red = document.getElementById('red').value * 0.1;
   var green = document.getElementById('green').value * 0.1;
   var blue = document.getElementById('blue').value * 0.1;

   gl.vertexAttrib1f(a_PointSize, size); // size of shape

   // set coordinates based on origin
   x = ((x - rect.left) - canvas.width/2)/(canvas.width/2);
   y = (canvas.height/2 - (y - rect.top))/(canvas.height/2);

   // Store color coordinates to g_colors array
   g_colors.push([red, green, blue, 1.0]);

   // Store the coordinates into g_points array
   g_points.push([x, y, shape, size, sCount]);

   // Print coordinate in console
   // console.log("("+x+","+y+")");

   // Clear <canvas>
   gl.clear(gl.COLOR_BUFFER_BIT);

   // Color & Draw ========================

   var len = g_points.length;
   for (var a = 0; a < len; a += 1) {
     var rgba = g_colors[a];

     // If shape == 0, draw square
     if(g_points[a][2] == 0){
        // Pass the color of a point to u_FragColor variable
        gl.uniform4f(u_FragColor, rgba[0], rgba[1], rgba[2], rgba[3]);
        // Write the positions of vertices to a vertex shader
        var n = initVertexBuffers_square(gl,g_points[a][0],g_points[a][1], a_Position, g_points[a][3]);
        if (n < 0) {
            console.log('Failed to set the positions of the vertices');
            return;
        }
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, n);
     }
     // If shape == 1, draw triangle
     if(g_points[a][2] == 1){
         // Pass the color of a point to u_FragColor variable
         gl.uniform4f(u_FragColor, rgba[0], rgba[1], rgba[2], rgba[3]);
         // Write the positions of vertices to a vertex shader
         var n = initVertexBuffers_triangle(gl,g_points[a][0],g_points[a][1], a_Position, g_points[a][3]);
         if (n < 0) {
             console.log('Failed to set the positions of the vertices');
             return;
         }
         gl.drawArrays(gl.TRIANGLES, 0, n);
     }
     // If shape == 2, draw circle
     if(g_points[a][2] == 2){
         // Pass the color of a point to u_FragColor variable
         gl.uniform4f(u_FragColor, rgba[0], rgba[1], rgba[2], rgba[3]);
         // Write the positions of vertices to a vertex shader
         var n = initVertexBuffers_circle(gl,g_points[a][0],g_points[a][1], g_points[a][3], a_Position, g_points[a][4]);
         if (n < 0) {
             console.log('Failed to set the positions of the vertices');
             return;
         }
         gl.drawArrays(gl.TRIANGLE_FAN, 0, n);
     }
     // If shape == 3, draw circle outline
     if(g_points[a][2] == 3){
         // Pass the color of a point to u_FragColor variable
         gl.uniform4f(u_FragColor, rgba[0], rgba[1], rgba[2], rgba[3]);
         // Write the positions of vertices to a vertex shader
         var n = initVertexBuffers_circle(gl,g_points[a][0],g_points[a][1], g_points[a][3], a_Position, g_points[a][4]);
         if (n < 0) {
             console.log('Failed to set the positions of the vertices');
             return;
         }
         gl.drawArrays(gl.LINE_LOOP, 0, n);
     }
     // If shape == 4, draw triangle outline
     if(g_points[a][2] == 4){
        // Pass the color of a point to u_FragColor variable
        gl.uniform4f(u_FragColor, rgba[0], rgba[1], rgba[2], rgba[3]);
        // Write the positions of vertices to a vertex shader
        var n = initVertexBuffers_triangle(gl,g_points[a][0],g_points[a][1], a_Position, g_points[a][3]);
        if (n < 0) {
            console.log('Failed to set the positions of the vertices');
            return;
        }
        gl.drawArrays(gl.LINE_LOOP, 0, n);
     }
     // If shape == 5, draw square outline
     if(g_points[a][2] == 5){
        // Pass the color of a point to u_FragColor variable
        gl.uniform4f(u_FragColor, rgba[0], rgba[1], rgba[2], rgba[3]);
        // Write the positions of vertices to a vertex shader
        var n = initVertexBuffers_square(gl,g_points[a][0],g_points[a][1], a_Position, g_points[a][3]);
        if (n < 0) {
            console.log('Failed to set the positions of the vertices');
            return;
        }
        gl.drawArrays(gl.LINE_LOOP, 0, n);
     }
     // If shape == 6, draw outline flower
     if(g_points[a][2] == 6){
        // center
        gl.uniform4f(u_FragColor, rgba[0], rgba[1], rgba[2], rgba[3]);
        multiple_Circle(gl,g_points[a][0], g_points[a][1], g_points[a][3], a_Position, 0);
     }
     // If shape == 6, draw flower
     if(g_points[a][2] == 7){
        // center
        gl.uniform4f(u_FragColor, rgba[0], rgba[1], rgba[2], rgba[3]);
        multiple_Circle(gl,g_points[a][0], g_points[a][1], g_points[a][3], a_Position, 1);
     }
   }
}

// ================================================================

// Creates the buffer and vertices for circle
function initVertexBuffers_circle(gl, x, y, size, a_Position, sCount) {
    var theta = Math.PI/sCount;
    var count = 0; // add to array
    var n = 0; // The number of vertices
    var vertices = new Float32Array(98);

    // creating the vertices for circle
    for(var circle = 0; circle <= (2*Math.PI); circle += theta){
        vertices[count] = (x+(1/(2*size))*Math.cos(n*theta));
        count++;
        vertices[count] = (y+(1/(2*size))*Math.sin(n*theta));
        count++;
        n++;
    }
    n--;

    // Create a buffer object
    var vertexBuffer = gl.createBuffer();
    if (!vertexBuffer) {
        console.log('Failed to create the buffer object');
        return -1;
    }

    // Bind the buffer object to target
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    // Write date into the buffer object
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    // Assign the buffer object to a_Position variable
    gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0);

    // Enable the assignment to a_Position variable
    gl.enableVertexAttribArray(a_Position);

    return n;
}

// ==============================================================

// Creates the buffer and vertices for square
function initVertexBuffers_square(gl, x, y, a_Position, size) {
    var n = 4; // The number of vertices
    // creating the vertices for square
    var vertices = new Float32Array([
        x-(1/size)*0.5, y-(1/size)*0.5,
        x+(1/size)*0.5, y-(1/size)*0.5,
        x-(1/size)*0.5, y+(1/size)*0.5,
        x+(1/size)*0.5, y+(1/size)*0.5]);

  // Create a buffer object
  var vertexBuffer = gl.createBuffer();
  if (!vertexBuffer) {
    console.log('Failed to create the buffer object');
    return -1;
  }
  // Bind the buffer object to target
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
  // Write date into the buffer object
  gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
  // Assign the buffer object to a_Position variable
  gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0);
  // Enable the assignment to a_Position variable
  gl.enableVertexAttribArray(a_Position);
  return n;
}

// ==============================================================
// Creates the buffer and vertices for triangle
function initVertexBuffers_triangle(gl, x, y, a_Position, size) {
    var n = 3; // The number of vertices
    // creating the vertices for square
    var vertices = new Float32Array([
      x, y+(1/size)*0.5,
      x-(1/size)*0.5, y-(1/size)*0.5,
      x+(1/size)*0.5, y-(1/size)*0.5]);

  // Create a buffer object
  var vertexBuffer = gl.createBuffer();
  if (!vertexBuffer) {
    console.log('Failed to create the buffer object');
    return -1;
  }
  // Bind the buffer object to target
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
  // Write date into the buffer object
  gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
  // Assign the buffer object to a_Position variable
  gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0);
  // Enable the assignment to a_Position variable
  gl.enableVertexAttribArray(a_Position);
  return n;
}

// ==============================================================
function multiple_Circle(gl, x, y, size, a_Position, shape){
   var beta = Math.PI/2;
   var count = 0; // add to array
   var counter = 0; // add to array
   var base = new Float32Array(10);
   var n = 0;

   // Creating the vertices for base
   for(var circle = 0; circle <= (2*Math.PI); circle += beta){
      base[count] = (x+(1/(2*size))*Math.cos(n*beta));
      count++;
      base[count] = (y+(1/(2*size))*Math.sin(n*beta));
      count++;
      n++;
   }
   while(counter <= base.length){
      x = base[counter++];
      y = base[counter++];
      initVertexBuffers_flower(gl, x, y, size, a_Position, shape);
   }
}
// Creates the buffer and vertices for flower outline
function initVertexBuffers_flower(gl, x, y, size, a_Position, shape) {
   var theta = Math.PI/6.5;
   var count = 0; // add to array
   var n = 0; // The number of vertices
   var vertices = new Float32Array(96);

   for(var circle = 0; circle <= (2*Math.PI); circle += theta){
      vertices[count] = (x+(1/(2*size))*Math.cos(n*theta));
      count++;
      vertices[count] = (y+(1/(2*size))*Math.sin(n*theta));
      count++;
      n++;
   }
   n--;

   // Create a buffer object
   var vertexBuffer = gl.createBuffer();
   if (!vertexBuffer) {
      console.log('Failed to create the buffer object');
      return -1;
   }

   // Bind the buffer object to target
   gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
   // Write date into the buffer object
   gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

   // Assign the buffer object to a_Position variable
   gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0);

   // Enable the assignment to a_Position variable
   gl.enableVertexAttribArray(a_Position);

   if (n < 0) {
      console.log('Failed to set the positions of the vertices');
      return;
   }
   if (shape == 0){
      gl.drawArrays(gl.LINE_LOOP, 0, n);
   } else if (shape == 1) {
      gl.drawArrays(gl.TRIANGLE_FAN, 0, n);
   }
}

// ==============================================================
// Change Shape
function drawSquare() {
   console.log("square");
   shape = 0;
}

function drawTriangle() {
   console.log("triangle");
   shape = 1;
}

function drawCircle() {
   console.log("circle");
   shape = 2;
}

function drawOCircle() {
   console.log("outline circle");
   shape = 3;
}

function drawOTriangle() {
   console.log("outline triangle");
   shape = 4;
}

function drawOSquare() {
   console.log("outline square");
   shape = 5;
}

function drawOFlower() {
   console.log("outline flower");
   shape = 6;
}

function drawFlower() {
   console.log("flower");
   shape = 7;
}
// ==============================================================
// Reset arrays and canvas
function clearCanvas(){
   g_colors = [];
   g_points = [];
   // Specify the color for clearing <canvas> ===================
   gl.clearColor(0.0, 0.0, 0.0, 1.0);

   // Clear <canvas>
   gl.clear(gl.COLOR_BUFFER_BIT);
}

// Hanette Le (hanle)
// lab1: script.js

// Retrieve <canvas> element (HelloCanvas)
// Recognize mouse clicks on canvas (ClickedPoints)
// Recognize left and right mouse clicks (w3school's GLobal Event Attributes)
// Echo the mouse positions for each mouse click (use console.log)
    // change color of shapes (ColoredPoints)
    // left, create centered red circle with radius of 10 at mouse position
    // right, create centered blue square with side length of 10 at mouse position
    // if both clicks are on same position, the newest one will overlap.
// Maintain a list of points representing positions of mouse clicks (both left and right).
// ===================================================================

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
    var canvas = document.getElementById('lab1');

    // Send message if retrieving canvas fails
    if (!canvas) {
        console.log('Failed to retrieve the <canvas> element');
        return;
    }

    // Rendering context for WebGL ===============================
    var gl = getWebGLContext(canvas);
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
    };

    // Specify the color for clearing <canvas> ===================
    gl.clearColor(1.0, 1.0, 1.0, 1.0);

    // Clear <canvas>
    gl.clear(gl.COLOR_BUFFER_BIT);

} // end of main

// =================================================================
// Other Functions =================================================

var g_points = []; // The array for the position of a mouse press
var g_colors = []; // The array to store color of a point

function click(ev, gl, canvas, a_Position, a_PointSize, u_FragColor) {
    var x = ev.clientX; // x coordinate of a mouse pointer
    var y = ev.clientY; // y coordinate of a mouse pointer
    var rect = ev.target.getBoundingClientRect() ;
    var radius = 10; // helps adjust circle size
    var z = 3; // determine if left or right

    gl.vertexAttrib1f(a_PointSize, 10.0); // size of shape is 10

    // set coordinates based on origin
    x = ((x - rect.left) - canvas.width/2)/(canvas.width/2);
    y = (canvas.height/2 - (y - rect.top))/(canvas.height/2);

    // IF LEFT CLICK ======================
    // Set the color and make z = 0
    if(ev.button == 0) {

        // Store blue coordinates to g_colors array
        g_colors.push([1.0, 0.0, 0.0, 1.0]);
        z = 0;
    } // end of if left

    // IF RIGHT CLICK ======================
    // Set the color and make z = 1
    if(ev.button == 2) {

        // Store red coordinates to g_colors array
        g_colors.push([0.0, 0.0, 1.0, 1.0]);
        z = 1; // show that its a left

    } //end of if right

    // Store the coordinates and z into g_points array
    g_points.push([x,y,z]);

    // Print coordinate in console
    console.log("("+x+","+y+")");

    // Color & Draw ========================

    var len = g_points.length;
    for (var a = 0; a < len; a += 1) {
        var rgba = g_colors[a];

        // If z == 0, draw circle
        if(g_points[a][2] == 0){
            // Pass the color of a point to u_FragColor variable
            gl.uniform4f(u_FragColor, rgba[0], rgba[1], rgba[2], rgba[3]);

            // Write the positions of vertices to a vertex shader
            var n = initVertexBuffers_circle(gl,g_points[a][0],g_points[a][1], radius, a_Position);
            if (n < 0) {
                console.log('Failed to set the positions of the vertices');
                return;
            }
            gl.drawArrays(gl.TRIANGLE_FAN, 0, n);
        }

        // If z == 1, draw square
        if(g_points[a][2] == 1){
            // Pass the color of a point to u_FragColor variable
            gl.uniform4f(u_FragColor, rgba[0], rgba[1], rgba[2], rgba[3]);

            // Write the positions of vertices to a vertex shader
            var n = initVertexBuffers_square(gl,g_points[a][0],g_points[a][1], a_Position);
            if (n < 0) {
                console.log('Failed to set the positions of the vertices');
                return;
            }
            gl.drawArrays(gl.TRIANGLE_STRIP, 0, n);
        }
    }
}

// ================================================================

// Creates the buffer and vertices for circle
function initVertexBuffers_circle(gl, x, y, radius, a_Position) {
    var theta = Math.PI/24;
    var count = 0; // add to array
    var n = 0; // The number of vertices
    var vertices = new Float32Array(96);

    // creating the vertices for circle
    for(var circle = 0; circle <= (2*Math.PI); circle += theta){
        vertices[count] = (x+(1/(2*radius))*Math.cos(n*theta));
        count++;
        vertices[count] = (y+(1/(2*radius))*Math.sin(n*theta));
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

// Creates the buffer and vertices for circle
function initVertexBuffers_square(gl, x, y, a_Position) {
    var n = 4; // The number of vertices

    // creating the vertices for square
    var vertices = new Float32Array([
        x-(1/10)*0.3, y-(1/10)*0.3,
        x+(1/10)*0.3, y-(1/10)*0.3,
        x-(1/10)*0.3, y+(1/10)*0.3,
        x+(1/10)*0.3, y+(1/10)*0.3]);

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

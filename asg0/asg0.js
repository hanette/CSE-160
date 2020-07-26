// Hanette Le
// asg0
var ctx;
var canvas;

function main() {
  // Retrieve <canvas> element
  canvas = document.getElementById('asg0');
  if (!canvas) {
    console.log('Failed to retrieve the <canvas> element');
    return false;
  }

  ctx = canvas.getContext('2d');

  // Black blackground
  ctx.fillStyle = 'black'; // Set color to black
  ctx.fillRect(0, 0, 400, 400);
}

function drawVector(v, color){
   ctx.strokeStyle = color; // Set color
   ctx.beginPath();
   ctx.moveTo(canvas.width/2, canvas.height/2);
   ctx.lineTo(200+v.elements[0]*20, 200-v.elements[1]*20, v.elements[2]*20);
   ctx.stroke();
}

function handleDrawEvent(){
   var x = document.getElementById('xcoord').value;
   var y = document.getElementById('ycoord').value;
   var x2 = document.getElementById('xcoord2').value;
   var y2 = document.getElementById('ycoord2').value;
   // Clear Canvas
   ctx.clearRect(0, 0, canvas.width, canvas.height);

   // Black blackground
   ctx.fillStyle = 'black'; // Set color to black
   ctx.fillRect(0, 0, 400, 400);

   // Draw new lines
   var v1 = new Vector3([x, y, 0.0]);
   drawVector(v1, "red");
   var v2 = new Vector3([x2, y2, 0.0]);
   drawVector(v2, "blue");
}

function handleDrawOperationEvent(){
   var x = document.getElementById('xcoord').value;
   var y = document.getElementById('ycoord').value;
   var x2 = document.getElementById('xcoord2').value;
   var y2 = document.getElementById('ycoord2').value;

   // Clear Canvas
   ctx.clearRect(0, 0, canvas.width, canvas.height);

   // Black blackground
   ctx.fillStyle = 'black'; // Set color to black
   ctx.fillRect(0, 0, 400, 400);

   // Draw lines
   var v1 = new Vector3([x, y, 0.0]);
   drawVector(v1, "red");
   var v2 = new Vector3([x2, y2, 0.0]);
   drawVector(v2, "red");

   var operator = document.getElementById('opt').value;
   // Add or Subtract
   if (operator == "Add"){
      v1.add(v2);
      drawVector(v1, "green");
   } else if (operator == "Subtract"){
      v1.sub(v2);
      drawVector(v1, "green");
   } else if (operator == "Multiply"){
      var s = document.getElementById('scalar').value;
      v1.mul(s);
      drawVector(v1, "green");
      v2.mul(s);
      drawVector(v2, "green");
   } else if (operator == "Divide"){
      var s = document.getElementById('scalar').value;
      v1.div(s);
      drawVector(v1, "green");
      v2.div(s);
      drawVector(v2, "green");
   } else if (operator == "Mag"){
      console.log("Magnitude v1: "+ v1.magnitude());
      console.log("Magnitude v2: "+ v2.magnitude());
   } else if (operator == "Norm"){
      var v1n = v1.normalize();
      drawVector(v1n, "green");
      var v2n = v2.normalize();
      drawVector(v2n, "green");
   } else if (operator == "Ang"){
      console.log("Angle: " + (angleBetween(v1, v2)).toFixed(2));
   } else if (operator == "Area"){
      console.log("Area of this triangle: " + (areaTriangle(v1, v2)).toFixed(2));
   }
}

function angleBetween(v1, v2){
   var m1 = v1.magnitude();
   var m2 = v2.magnitude();
   var d = Vector3.dot(v1, v2);

   var alpha = Math.acos(d/(m1*m2)); // Radians
   alpha *= 180/Math.PI;
   return alpha;
}

function areaTriangle(v1, v2){
   var a = Vector3.cross(v1, v2);
   var v1 = new Vector3([a[0], a[1], a[2]]);

   var b = v1.magnitude()/2;

   return b;
}

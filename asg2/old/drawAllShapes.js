function drawAllShapes(){
   var body = new Cube();
   body.color = [1.0, 0.0, 0.0, 1.0];
   body.matrix.translate(-.25, -.75, 0.0);
   body.matrix.rotate(-5, 1, 0, 0);
   body.matrix.scale(0.5, 0.3, 0.5);
   body.render();

   var leftArm = new Cube();
   leftArm.color = [1, 1, 0, 1];
   leftArm.matrix.setTranslate(0, -0.5, 0.0);
   leftArm.matrix.rotate(-5, 1, 0, 0);
   leftArm.matrix.rotate(-g_jointAngle, 0, 0, 1); // Joint 1

   var armCoord = new Matrix4(leftArm.matrix);
   leftArm.matrix.scale(0.25, 0.7, 0.5);
   leftArm.matrix.translate(-0.5, 0, 0);
   leftArm.render();

   var box = new Cube();
   box.color = [1, 0, 1, 1];
   box.matrix = armCoord;
   box.matrix.translate(0, .65, 0, 0);
   box.matrix.rotate(g_jointAngle2,0,0,1);
   box.matrix.scale(.3,.3,.3);
   box.matrix.translate(-.5,0,-0.001);
   box.render();
}

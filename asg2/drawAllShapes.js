function drawAllShapes(){
   var wool = [.62, .77, .64, 1.0];
   var skin = [1, .91, .65, 1.0];

   // body =====================================
   var body = new Cube();
   body.color = wool;
   // body.matrix.rotate(-10, 1, 0, 0);
   body.matrix.scale(.25, 0.25, 0.35);
   body.matrix.translate(-.5, 0, -0.25);
   body.render();

   // head =====================================

   var head = new Cube();
   head.color = wool;
   // head.matrix.rotate(-10, 1, 0, 0);
   head.matrix.rotate(-head_animation, 1, 0, 0);
   head.matrix.scale(0.35, 0.35, 0.35);
   head.matrix.translate(-.5, 0.25, -1.25);
   head.render();

   var face = new Cube();
   face.color = skin;
   // face.matrix.rotate(-10, 1, 0, 0);
   face.matrix.rotate(-head_animation, 1, 0, 0);
   face.matrix.scale(0.30, 0.30, 0.03);
   face.matrix.translate(-.5, 0.35, -15.5);
   face.render();

   var tophair = new Cube();
   tophair.color = wool;
   // tophair.matrix.rotate(-10, 1, 0, 0);
   tophair.matrix.rotate(-head_animation, 1, 0, 0);
   tophair.matrix.scale(0.32, 0.071, 0.04);
   tophair.matrix.translate(-.5, 4.85, -11.95);
   tophair.render();

   var botlefthair = new Cube();
   botlefthair.color = wool;
   // botlefthair.matrix.rotate(-10, 1, 0, 0);
   botlefthair.matrix.rotate(-head_animation, 1, 0, 0);
   botlefthair.matrix.scale(0.05, 0.071, 0.04);
   botlefthair.matrix.translate(-3.01, 1.5, -11.95);
   botlefthair.render();

   var botrighthair = new Cube();
   botrighthair.color = wool;
   // botrighthair.matrix.rotate(-10, 1, 0, 0);
   botrighthair.matrix.rotate(-head_animation, 1, 0, 0);
   botrighthair.matrix.scale(0.05, 0.071, 0.04);
   botrighthair.matrix.translate(2.01, 1.5, -11.95);
   botrighthair.render();

   var lefteye = new Cube();
   lefteye.color = [1,1,1,1];
   // lefteye.matrix.rotate(-10, 1, 0, 0);
   lefteye.matrix.rotate(-head_animation, 1, 0, 0);
   lefteye.matrix.scale(0.1, 0.061, 0.04);
   lefteye.matrix.translate(-1.5, 3.5, -11.95);
   lefteye.render();

   var lefteyeblack = new Cube();
   lefteyeblack.color = [0,0,0,1];
   // lefteyeblack.matrix.rotate(-10, 1, 0, 0);
   lefteyeblack.matrix.rotate(-head_animation, 1, 0, 0);
   lefteyeblack.matrix.scale(0.05, 0.061, 0.04);
   lefteyeblack.matrix.translate(-3.001, 3.5, -12);
   lefteyeblack.render();

   var righteye = new Cube();
   righteye.color = [1,1,1,1];
   // righteye.matrix.rotate(-10, 1, 0, 0);
   righteye.matrix.rotate(-head_animation, 1, 0, 0);
   righteye.matrix.scale(0.1, 0.061, 0.04);
   righteye.matrix.translate(0.5, 3.5, -11.95);
   righteye.render();

   var righteyeblack = new Cube();
   righteyeblack.color = [0,0,0,1];
   // righteyeblack.matrix.rotate(-10, 1, 0, 0);
   righteyeblack.matrix.rotate(-head_animation, 1, 0, 0);
   righteyeblack.matrix.scale(0.05, 0.061, 0.04);
   righteyeblack.matrix.translate(2.001, 3.5, -12.05);
   righteyeblack.render();

   var mouth = new Cube();
   mouth.color = [1,.79,.69,1];
   // mouth.matrix.rotate(-10, 1, 0, 0);
   mouth.matrix.rotate(-head_animation, 1, 0, 0);
   mouth.matrix.scale(0.1, 0.071, 0.04);
   mouth.matrix.translate(-0.47, 1.5, -11.95);
   mouth.render()

   var tongue = new Cube();
   tongue.color = [.89,.69,.64,1];
   // tongue.matrix.rotate(-10, 1, 0, 0);
   tongue.matrix.rotate(-head_animation, 1, 0, 0);
   tongue.matrix.scale(0.1, 0.035, 0.04);
   tongue.matrix.translate(-0.4701, 3, -12);
   tongue.render()

   // upper legs ============================
   var frontleft = new Cube();
   frontleft.color = wool;
   // frontleft.matrix.rotate(-10, 1, 0, 0);
   frontleft.matrix.setTranslate(0, 0, 0);
   frontleft.matrix.rotate(-g_jointAngle, 0, 0, 1); // Joint 1
   var frontleftCoord = new Matrix4(frontleft.matrix);
   frontleft.matrix.scale(.10, -0.10, 0.10);
   frontleft.matrix.translate(-1.15, -.25, -0.75);
   frontleft.render();

   var frontright = new Cube();
   frontright.color = wool;
   // frontright.matrix.rotate(-10, 1, 0, 0);
   frontright.matrix.setTranslate(0, 0, 0);
   frontright.matrix.rotate(g_jointAngle, 0, 0, 1); // Joint 1
   var frontrightCoord = new Matrix4(frontright.matrix);
   frontright.matrix.scale(.10, -0.10, 0.10);
   frontright.matrix.translate(.2, -.25, -0.75);
   frontright.render();

   var backleft = new Cube();
   backleft.color = wool;
   // backleft.matrix.rotate(-10, 1, 0, 0);
   backleft.matrix.setTranslate(0, 0, 0);
   backleft.matrix.rotate(-g_jointAngle, 0, 0, 1); // Joint 1
   var backleftCoord = new Matrix4(backleft.matrix);
   backleft.matrix.scale(.10, -0.10, 0.10);
   backleft.matrix.translate(-1.15, -.25, 1.5);
   backleft.render();

   var backright = new Cube();
   backright.color = wool;
   // backright.matrix.rotate(-10, 1, 0, 0);
   backright.matrix.setTranslate(0, 0, 0);
   backright.matrix.rotate(g_jointAngle, 0, 0, 1); // Joint 1
   var backrightCoord = new Matrix4(backright.matrix);
   backright.matrix.scale(.10, -0.10, 0.10);
   backright.matrix.translate(.2, -.25, 1.5);
   backright.render();



   // lower leg =======================================
   var frontleftlow = new Cube();
   frontleftlow.color = skin;
   frontleftlow.matrix = frontleftCoord;
   // frontleftlow.matrix.rotate(-10, 1, 0, 0);
   frontleftlow.matrix.rotate(-g_jointAngle2, 0, 0, 1);
   frontleftlow.matrix.scale(0.08, 0.08, 0.08);
   frontleftlow.matrix.translate(-1.25, -1.75, -.8);
   frontleftlow.render();

   var frontrightlow = new Cube();
   frontrightlow.color = skin;
   frontrightlow.matrix = frontrightCoord;
   // frontrightlow.matrix.rotate(-10, 1, 0, 0);
   frontrightlow.matrix.rotate(g_jointAngle2, 0, 0, 1);
   frontrightlow.matrix.scale(0.08, 0.08, 0.08);
   frontrightlow.matrix.translate(.37, -1.75, -.8);
   frontrightlow.render();

   var backleftlow = new Cube();
   backleftlow.color = skin;
   backleftlow.matrix = backleftCoord;
   // backleftlow.matrix.rotate(-10, 1, 0, 0);
   backleftlow.matrix.rotate(-g_jointAngle2, 0, 0, 1);
   backleftlow.matrix.scale(0.08, 0.08, 0.08);
   backleftlow.matrix.translate(-1.25, -1.75, 2);
   backleftlow.render();

   var backrightlow = new Cube();
   backrightlow.color = skin;
   backrightlow.matrix = backrightCoord;
   // backrightlow.matrix.rotate(-10, 1, 0, 0);
   backrightlow.matrix.rotate(g_jointAngle2, 0, 0, 1);
   backrightlow.matrix.scale(0.08, 0.08, 0.08);
   backrightlow.matrix.translate(.37, -1.75, 2);
   backrightlow.render();
}

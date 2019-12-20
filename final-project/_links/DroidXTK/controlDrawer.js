var drawerWidth = 0.45;
function makeControls()
{
var layDebug = app.CreateLayout("linear", "VTop");
var edt = app.CreateTextEdit("", drawerWidth, 0.18, "nospell,mono");
 btnDebug = app.CreateButton("Execute Code");
 btnDebug.SetOnTouch(function() {
var code = edt.GetText();
 app.Execute(code);
 app.Execute('r.render();');
 app.CloseDrawer("left");
 app.SetClipboardText( edt.GetText());
 edt.SetText( "" );
 });
 layDebug.AddChild(edt);
 layDebug.AddChild(btnDebug);

var txtXPos = app.CreateTextEdit("0", drawerWidth / 3, null, "singleline,numbers");
txtXPos.SetHint("X-Pos");
var txtYPos = app.CreateTextEdit("0", drawerWidth / 3, null, "singleline,numbers");
txtYPos.SetHint("Y-Pos");
var txtZPos = app.CreateTextEdit("0", drawerWidth / 3, null, "singleline,numbers");
txtZPos.SetHint("Z-Pos");
var layXYZPos = app.CreateLayout("linear", "horizontal");
layXYZPos.AddChild(txtXPos);
layXYZPos.AddChild(txtYPos);
layXYZPos.AddChild(txtZPos);
layDebug.AddChild(layXYZPos);
var labelRed = app.CreateText("Red:0.0");
var skbRed = app.CreateSeekBar(drawerWidth, -1);
skbRed.SetRange(1.0);
skbRed.SetValue(0);
skbRed.SetOnChange(function() {
   labelRed.SetText("Red:" + skbRed.GetValue());
});
var labelGreen = app.CreateText("Green:0.0");
var skbGreen = app.CreateSeekBar(drawerWidth, -1);
skbGreen.SetRange(1.0);
skbGreen.SetValue(0);
skbGreen.SetOnChange(function() {
   labelGreen.SetText("Green:" + skbGreen.GetValue());
});
var labelBlue = app.CreateText("Blue:0.0");
var skbBlue = app.CreateSeekBar(drawerWidth, -1);
skbBlue.SetRange(1.0);
skbBlue.SetValue(0);
skbBlue.SetOnChange(function() {
   labelBlue.SetText("Blue:" + skbBlue.GetValue());
});
var createHexagon = app.CreateButton("Make Hexagon Array");
createHexagon.SetOnTouch(function() {
   var items = [
      "HexagonA", "HexagonB", "HexagonC",
      "HexagonD", "HexagonE", "HexagonF",
      "HexagonG", "HexagonH", "HexagonI",
      "HexagonJ", "HexagonK", "HexagonL"
   ]
   var xpos = [
      0, -9, -12, -9, 0, 3,
   ];
   // 0,-36,-48,
   // -36,0,12
   var ypos = [
      0, 0, 4.5,
      9, 9, 4.5,
   ];
   // 0, 0, 18,
   // 36,36,18
   var zpos = [
      0, 0, 0,
      0, 0, 0,
   ];
   // 0,0,0,
   // 0,0,0,
   for (var i in xpos) {
      var x = xpos[i]
      x *= 3;
      var y = ypos[i];
      y *= 3;
      var z = zpos[i];
      z *= 3;
      var code = ""
      code += (items[i] + " = new X.cube();")
      code += (items[i] + ".scale" + " = [3,3,3];");
      code += (items[i] + ".center" + " = [" + x + "," + y + "," + z + "];")
      code += (items[i] + ".color" + " = [" + 0 + "," + 0 + "," + 1 + " ];")
      code += ("r.add( " + items[i] + ");")
      app.Execute(code);
   }
   app.Execute("r.render()");
})
layDebug.AddChild(createHexagon);
btnspch = app.CreateButton("start speech");
btnspch.SetOnTouch(function() {
   speech = app.CreateSpeechRec();
   speech.SetOnReady(function() {
      app.ShowPopup("Listening...", "Short");
   });
   speech.SetOnResult(function(results) {
      if (results[0].split(",")[0] == "Cube") {
         var rVal = skbRed.GetValue();
         var gVal = skbGreen.GetValue();
         var bVal = skbBlue.GetValue();
         var xpos = txtXPos.GetText();
         var ypos = txtYPos.GetText();
         var zpos = txtZPos.GetText();
         var name = results[0].split(",")[1] || "voicecube";
         var rVal = skbRed.GetValue();
         var gVal = skbGreen.GetValue();
         var bVal = skbBlue.GetValue();
         app.Execute(xtkds.cube(name, 1, xpos, ypos, zpos, rVal, gVal, bVal));
         app.ShowPopup(name);
      }
   });
   speech.SetOnError(function() {
      app.ShowPopup("Please speak more clearly!");
   });
   speech.Recognize();
});
layDebug.AddChild(btnspch);
txtDebug = app.CreateTextEdit("", drawerWidth, 0.18, "log");
layDebug.AddChild(txtDebug);
layRGB = app.CreateLayout("linear", "Vertical");
layRGB.AddChild(labelRed);
layRGB.AddChild(skbRed);
layRGB.AddChild(labelGreen);
layRGB.AddChild(skbGreen);
layRGB.AddChild(labelBlue);
layRGB.AddChild(skbBlue);
layDebug.AddChild(layRGB);

var btnCube = app.CreateButton("Add Cube +");
btnCube.SetOnTouch(function() {
   var xpos = txtXPos.GetText();
   var ypos = txtYPos.GetText();
   var zpos = txtZPos.GetText();
   var rVal = skbRed.GetValue();
   var gVal = skbGreen.GetValue();
   var bVal = skbBlue.GetValue();
   app.Execute(xtkds.cube(null, 0, xpos, ypos, zpos, rVal, gVal, bVal));
});
layDebug.AddChild(btnCube);
var btnSphere = app.CreateButton("Add Sphere +");
btnSphere.SetOnTouch(function() {
   var xpos = txtXPos.GetText();
   var ypos = txtYPos.GetText();
   var zpos = txtZPos.GetText();
   var rVal = skbRed.GetValue();
   var gVal = skbGreen.GetValue();
   var bVal = skbBlue.GetValue();
   var sphereName = "sphere" + countSphere;
   var code = ""
   code += (sphereName + " = new X.sphere();")
   code += (sphereName + ".center" + " = [" + xpos + "," + ypos + "," + zpos + "];")
   code += (sphereName + ".color" + " = [" + rVal + "," + gVal + "," + bVal + " ];")
   code += ("r.add( " + sphereName + ");")
   app.SaveText("sphereVar", code);
   countSphere++;
   app.Execute(app.LoadText("sphereVar"))
   app.Execute("r.render();")
});
layDebug.AddChild(btnSphere);
// set camera further away!
r.camera.position = [0, 0, 1000];
// render everything!
r.render();
 
return layDebug
}
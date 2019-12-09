app.SetOptions("ignoreerrors")
var countCube = 1;
var countSphere = 1;

function OnStart()
{
//   app.CreateDebug()
   web = app.CreateWebView(1, 1, "ignoreerrors,autozoom");
   web.LoadUrl('index.html');
   layD = app.CreateLayout("Linear", "VTop");
   
   function xd ()
   {
       xd.CreateSettingsUI = function ()
       {
       xd.txtXPos = app.CreateTextEdit("0", null, null, "number");
       xd.txtXPos.SetHint("X-Pos");
       xd.txtYPos = app.CreateTextEdit("0", null, null, "number");
       xd.txtYPos.SetHint("Y-Pos");
       xd.txtZPos = app.CreateTextEdit("0", null, null, "number");
       xd.txtZPos.SetHint("Z-Pos");
       }
       
      xd.CreateControl = function (geometryType,)
       {
           this.geometryType = geometryType || "cube";
           this.counterName = "count" + this.geometryType;
            this.counterName = 0;
           var geometryName = this.geometryType + this.counter;
           
           alert(this.counterName);
           (
           
       }
       
   }
   
   txtXPos = 
   txtXPos.SetHint("X-Pos");
   txtYPos = app.CreateTextEdit("0", null, null, "number");
   txtYPos.SetHint("Y-Pos");
   txtZPos = app.CreateTextEdit("0", null, null, "number");
   txtZPos.SetHint("Z-Pos");
  
   btnCube = app.CreateButton("Add Cube +");
   btnCube.SetOnTouch(function()
   {
      var xpos = txtXPos.GetText()
      var ypos = txtYPos.GetText()
      var zpos = txtZPos.GetText()
      
      var cubeName = "cube" + countCube;
      var code = ''
      code += (cubeName + " = new X.cube();")
      code += (cubeName + ".center" + " = [" + xpos + "," + ypos + "," + zpos + "];")
      code += ("r.add( " + cubeName + ");")
      app.SaveText("cubeVar", code);
      countCube++;
      web.Execute(app.LoadText("cubeVar"))
      web.Execute("r.render();")
   });
   btnSphere = app.CreateButton("Add Sphere +");
   btnSphere.SetOnTouch(function()
   {
      var xpos = txtXPos.GetText()
      var ypos = txtYPos.GetText()
      var zpos = txtZPos.GetText()
      
      var sphereName = "sphere" + countSphere;

      var code = ''
      code += ( sphereName + " = new X.sphere();")
      code += (sphereName + ".center" + " = [" + xpos + "," + ypos + "," + zpos + "];")
      code += ("r.add( " + sphereName + ");")
      app.SaveText("sphereVar", code);
      countSphere++;
      web.Execute(app.LoadText("sphereVar"))
      web.Execute("r.render();")
   });
   layXYZPos = app.CreateLayout("linear", "Vertical");
   layXYZPos.SetBackColor("gray");
   layXYZPos.AddChild(btnCube);
   layXYZPos.AddChild(btnSphere);
   layXYZPos.AddChild(txtXPos);
   layXYZPos.AddChild(txtYPos);
   layXYZPos.AddChild(txtZPos);
   layD.AddChild(layXYZPos);
   txtExecCode = app.CreateTextEdit("");
   //  layD.AddChild(txtExecCode);
   layExec = app.CreateLayout("linear", "Vertical");
   layExec.SetBackColor("silver");
   layExec.AddChild(txtExecCode)
   btnExecCode = app.CreateButton("Execute Code");
   layExec.AddChild(btnExecCode);
   btnExecCode.SetOnTouch(function()
   {
      var code = txtExecCode.GetText();
      web.Execute(code);
      /* var color = txtExecCode.GetText() || "1,0.5,.25";
         var code = "cube.color = [" + color + "]; r.render();"
         web.Execute(code);
         */
   });
   layD.AddChild(layExec);
   app.AddDrawer(layD, "left", -1);
   app.AddLayout(web)
}
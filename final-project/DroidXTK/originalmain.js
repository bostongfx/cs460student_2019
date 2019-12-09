   var xtkds =  new dsx();
        var countCube = 0;
        var countSphere = 0;
        var drawerWidth = 0.45;
        var r;
        // this gets called when the site is ready
        app.SetOptions( "ignoreerrors" );
        function OnStart ()
        {
     // app.CreateDebug();
     //app.SetOptions("ignoreerrors");
        // create a new scene and renderer
        r = new X.renderer3D();
        r.init();
        /*
         app.SetOnDebug( function (debug,error)
{
if(error){
	txtDebug.InsertText( error.toString() + " \n " );
	}
}
 );
   */
             //debug cube
       /* c = new X.cube();
        c.color = [0,1,0];
        c.center = [0,0,0];
        r.add(c);*/
        
        
        //layout for settings UI
//        app.ShowDebug(  );
        layDebug = app.CreateLayout("linear", "VTop");
        var edt = app.CreateTextEdit("",drawerWidth,null,"nospell");
        btnGetObjs = app.CreateButton("Debug Objects");
        btnGetObjs.SetOnTouch(function()
        {
            var tmp = [];
            var objlsttmp = xtkds.getobjlst();
            for(var i in objlsttmp)
            {
                tmp.push(objlsttmp[i]);
            }
            alert(tmp);
            //  alert(xtkds.objlstget("cube0"));
        })
        
        
        layDebug.AddChild(btnGetObjs);
        btnDebug = app.CreateButton( "Execute Code" );
        btnDebug.SetOnTouch(function()
        {
            var code = edt.GetText() 
            app.Execute(code);
            app.Execute('\n r.render(); \n');
             app.Execute('console.log(hello)');
            app.CloseDrawer("left");
            
            
        });

        //layDebug.AddChild(edt);
        layDebug.AddChild( btnDebug );
        
       var txtXPos = app.CreateTextEdit("0", drawerWidth/3,null, "singleline,numbers");
       txtXPos.SetHint("X-Pos");
       
       var txtYPos = app.CreateTextEdit("0", drawerWidth/3, null, "singleline,numbers");
       txtYPos.SetHint("Y-Pos");
       
       var txtZPos = app.CreateTextEdit("0", drawerWidth/3, null, "singleline,numbers");
       txtZPos.SetHint("Z-Pos");
       
       var layXYZPos = app.CreateLayout("linear", "horizontal");
        layXYZPos.AddChild(txtXPos);
        layXYZPos.AddChild(txtYPos);
        layXYZPos.AddChild(txtZPos);
       
       layDebug.AddChild(layXYZPos);
       var labelRed = app.CreateText("Red:0.0");
       var skbRed = app.CreateSeekBar(drawerWidth,-1);
       skbRed.SetRange(1.0);
       skbRed.SetValue(0);
         skbRed.SetOnChange(function () 
      { 
         labelRed.SetText("Red:" + skbRed.GetValue());
      });
    
    //   skbRed.Method("setRotation","float",90);
    
       var labelGreen = app.CreateText("Green:0.0");
       var skbGreen = app.CreateSeekBar(drawerWidth,-1);
       skbGreen.SetRange(1.0);
       skbGreen.SetValue(0);
        skbGreen.SetOnChange(function () 
      { 
         labelGreen.SetText("Green:" + skbGreen.GetValue());
      });
    //   skbGreen.Method("setRotation","float",90);
    
       var labelBlue = app.CreateText("Blue:0.0");
       var skbBlue = app.CreateSeekBar(drawerWidth,-1);
       skbBlue.SetRange(1.0);
       skbBlue.SetValue(0);
      skbBlue.SetOnChange(function () 
      { 
         labelBlue.SetText("Blue:" + skbBlue.GetValue());
      });
      
      var createHexagon = app.CreateButton("Make Hexagon Array");
      createHexagon.SetOnTouch(function()
      { 
          var items = [
              "HexagonA","HexagonB","HexagonC",
              "HexagonD","HexagonE","HexagonF",
              
              "HexagonG","HexagonH","HexagonI",
              "HexagonJ","HexagonK","HexagonL"]
          var xpos = [
                        0,-9,-12,
                        -9, 0,  3,
                    
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
              0,0,0,
              0,0,0,
              ];
              
            //   0,0,0,
            //   0,0,0,
                    
          for (var i in xpos)
          {
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
    //   skbBlue.Method("setRotation","float",90);

btnspch = app.CreateButton( "start speech" );
btnspch.SetOnTouch( function ()
{ 

   
    speech = app.CreateSpeechRec();
    speech.SetOnReady(  function (){app.ShowPopup( "Listening...", "Short" );});
    speech.SetOnResult( function (results)
    {
//alert(results[0])
if (results[0].split(",")[0]=="Cube")
 {
    var rVal  = skbRed.GetValue();
    var gVal  = skbGreen.GetValue();
    var bVal  = skbBlue.GetValue();
    var xpos = txtXPos.GetText();
    var ypos = txtYPos.GetText();
    var zpos = txtZPos.GetText();
    
    var name = results[0].split(",")[1] || "voicecube";

    var rVal  = skbRed.GetValue();
    var gVal  = skbGreen.GetValue();
    var bVal  = skbBlue.GetValue();
 
    app.Execute(xtkds.cube(name,1,xpos,ypos,zpos,rVal,gVal,bVal));
//  new dsxtk();
// app.Execute( dsxtk.cube(name));
app.ShowPopup( name );
}

 });
 
 
    speech.SetOnError( function (){    app.ShowPopup( "Please speak more clearly!" );	} );

        speech.Recognize();	} );

 layDebug.AddChild( btnspch );
 txtDebug = app.CreateTextEdit( "" ,drawerWidth, 0.18,"log");
 layDebug.AddChild( txtDebug );

       layRGB = app.CreateLayout("linear", "Vertical");
       layRGB.AddChild(labelRed);
       layRGB.AddChild(skbRed);
       layRGB.AddChild(labelGreen);
       layRGB.AddChild(skbGreen);
       layRGB.AddChild(labelBlue);
       layRGB.AddChild(skbBlue);
       
       layDebug.AddChild(layRGB);
      app.AddDrawer(   layDebug,"left",drawerWidth);

              
       
       var btnCube = app.CreateButton("Add Cube +");
       btnCube.SetOnTouch(function()
       {
        
           var xpos = txtXPos.GetText();
           var ypos = txtYPos.GetText();
           var zpos = txtZPos.GetText();
           
           var rVal  = skbRed.GetValue();
           var gVal  = skbGreen.GetValue();
           var bVal  = skbBlue.GetValue();
           app.Execute(xtkds.cube(null,0,xpos,ypos,zpos,rVal,gVal,bVal));
           
});
layDebug.AddChild(btnCube);

       
       var btnSphere = app.CreateButton("Add Sphere +");
       btnSphere.SetOnTouch(function()
       {
           var xpos = txtXPos.GetText();
           var ypos = txtYPos.GetText();
           var zpos = txtZPos.GetText();
           
           var rVal  = skbRed.GetValue();
           var gVal  = skbGreen.GetValue();
           var bVal  = skbBlue.GetValue();
           
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
        
        
        };
 
 
 
function dsx () 
{
    dsx.objectsarray = [];   
/*    	dsxtk.cube = function (name)
	{
	   
	      var code = ""
          code += (name  + " = new X.cube();")
        //   code += (this.name  + ".center" + " = [" + xpos + "," + ypos + "," + zpos + "];")
//           code += (cubeName + ".color" + " = [" + rVal + "," + gVal + "," + bVal + " ];")
          code += ("r.add( " + name + ");")
          return code;
          alert(name)
   
	}
	*/
	
    dsx.cubecounter = 0;
    dsx.spherecounter = 0;
    dsx.generalcounter = 0;
    
    this.cube = function (name,type,x,y,z,r,g,b)
    {
       this.x = x || 0;
       this.y = y || 0;
       this.z = z || 0;
       this.r = r || 1;
       this.g = g || 1;
       this.b = b || 1;
       this.name = name || "cube";
      this.type = type || 0;
      if (this.type == 0)
      {
       this.name = (this.name + dsx.cubecounter);
       dsx.cubecounter++;
      }
      
     if (this.type == 1)
     {
         
         this.name = this.name + dsx.generalcounter;
        //  dsx.objlstput(this.name, "xcube");

         dsx.generalcounter++;
     }
       
       var code = ""
       code += (this.name + " = new X.cube(); \n ")
       code += (this.name + ".center" + " = [" + this.x + "," + this.y + "," + this.z + "]; \n ")
       code += (this.name + ".color" + " = [" + this.r + "," + this.g + "," + this.b + " ]; \n ")
       code += ("r.add( " + this.name + "); \n ")
       code += ("r.render(); \n ");
       // app.SaveText("cubeVar", code);
        // dsx.cubecounter++;
        // app.Execute(code);
        // app.Execute("r.render();")
        dsx.objlstput(this.name, "xcube");
        return code;
    }
    
    dsx.objlstput = function (item, type)
    {
        this.item = item;
        this.type = type;
        dsx.objectsarray.push(this.item + ":" + this.type);
    }
    
    this.getobjlst = function ()
    {
        return dsx.objectsarray;
    }
 
      this.objlstget = function(name)
    {
        this.name = name;
        this.idx = 0;
        
        if (dsx.objectsarray.includes(this.name))
        {
            this.idx = dsx.objectsarray.indexOf(this.name);
        }
        return dsx.objectsarray[this.idx];
    }
    
    
}


</script>
<script>
/*
new xd();
    function OnStart()
    {
        // alert(var CreateX());
       var CreateXWeb()
        
    }
    
    
    
    function xd ()
    {
        var CreateX = function()
        {
            var html = app.ReadFile("templates/indexTemplate.txt");
            return var html;
        }
        
        var CreateXWeb = function (w, h, options)
        {
            this.w = w || -1;
            this.h = h || -1;
            this.options = options || "ignoreerrors,autozoom";
            
            var web = app.CreateWebView(this.w, this.h, this.options);
            var html = var CreateX();
            // alert(html);
            var web.LoadUrl(html);
            // return var web;
        }
    }
    
    
*/
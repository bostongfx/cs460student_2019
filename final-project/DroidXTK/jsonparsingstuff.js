//Called when application is started.
function OnStart()
{
    //Create a layout with objects vertically centered.
    var lay = app.CreateLayout( "linear", "VCenter,FillXY" );    
 
    //Create a text label and add it to layout.
    var txt = app.CreateTextEdit( "Hello" );
    txt.SetTextSize(32);
    lay.AddChild( txt );
    
    //Add layout to app.    
    app.AddLayout( lay );
    test(txt);
}
 
function test(display)
{
   // file to store data 
   var fil="/sdcard/jsontest.txt";
   //build a test object
   var stuff =
  {
  "name": "cube",
  "color": {
    "r": "0.0",
    "g": "0.0",
    "b": "0.0",
    "a": "1.0"
  },
  "position": {
    "x": "0.0",
    "y": "0.0",
    "z": "0.0"
  }
}
   //save object in a file
   writeAsJson(fil,stuff);
   //get copy of the object from the file
   var newobj = readAsJson(fil);
   //display data from the copy
   display.SetText("name-" + newobj.name 
   + "\n" + "name-" + newobj.name + "\n"
   + "\n" + "color\n" 
   + "red-" +  newobj.color.r + "\n"
   + "green-" + newobj.color.g + "\n"
   + "blue-" + newobj.color.b + "\n")

newobj.color.r = 1.0
display.SetText("name-" + newobj.name 
   + "\n" + "name-" + newobj.name + "\n"
   + "\n" + "color\n" 
   + "red-" +  newobj.color.r+ "\n"
   + "green-" + newobj.color.g + "\n"
   + "blue-" + newobj.color.b + "\n"


   );
}
 
function writeAsJson(path,obj)
{
    app.WriteFile(path,JSON.stringify(obj));
}
 
function readAsJson(path)
{
    if (app.FileExists(path))
      return JSON.parse(app.ReadFile(path));
    app.ShowPopup(path+" does not exist");
    return undefined;
}
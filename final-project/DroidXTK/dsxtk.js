function dsxtk()
{
	dsxtk.cube = function (name)
	{
	   
	      var code = ""
           code += (name  + " = new X.cube();")
  //         code += (this.name  + ".center" + " = [" + xpos + "," + ypos + "," + zpos + "];")
//           code += (cubeName + ".color" + " = [" + rVal + "," + gVal + "," + bVal + " ];")
           code += ("r.add( " + name + ");")
           return code;
           alert(name)
   
	}
	
/*	dsxtk.sphere = function ()
{
	
}
*/

 
 }
           
        /*
           var rVal  = skbRed.GetValue();
           var gVal  = skbGreen.GetValue();
           var bVal  = skbBlue.GetValue();
           
           
           var cubeName =
           
           var code = ""
           code += (cubeName + " = new X.cube();")
           code += (cubeName + ".center" + " = [" + xpos + "," + ypos + "," + zpos + "];")
           code += (cubeName + ".color" + " = [" + rVal + "," + gVal + "," + bVal + " ];")
           code += ("r.add( " + cubeName + ");")
           
app.SaveText("cubeVar", code);
countCube++;
app.Execute(app.LoadText("cubeVar"))
app.Execute("r.render();")
*/
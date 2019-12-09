function OnStart (){
var xhr = new XMLHttpRequest();
xhr.addEventListener("load", function() {
 
  var lines = this.responseText;
alert(lines);
  // now you can loop through the lines and run the gltf conversion
  // to test if the mesh was loaded, try console.log(lines);

});
xhr.open("GET", app.ReadFile("Armadillo.ply"))
xhr.send();
}
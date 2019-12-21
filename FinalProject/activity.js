Activity = function(DayName, DayPosition, Activity_Description, Duration, Start_Act, End_Act, Color) {

  this.Day_Name = DayName;
  this.act_desc = Activity_Description;
  this.cubeSize = Duration;
  this.start_time = Start_Act;
  this.end_time = End_Act;

  function timeConvert(n) {
    var num = n;
    var hours = (num / 60);
    var rhours = Math.floor(hours);
    var minutes = (hours - rhours) * 60;
    var rminutes = Math.round(minutes);
    return rhours + ":" + rminutes;
    }
  // console.log("this.start_time: " + this.start_time);
  // console.log("this.end_time: " + this.end_time);
  // console.log("/////////////");
  var MinInDay = 1440;
  if ((Start_Act && End_Act) != null){
    this.max_height = MinInDay - Start_Act;
    this.min_height = MinInDay - End_Act;
    // console.log("this.max_height: " + this.max_height);
    // console.log("this.min_height: " + this.min_height);
  }
  else {
    this.min_height = 0;
  }
  var cubeGeo = new THREE.BoxBufferGeometry(120, this.cubeSize, 120);
  var cubeMat = new THREE.MeshPhongMaterial({color: '#FF0000'});
  var mesh = new THREE.Mesh(cubeGeo, cubeMat);

  // console.log("this.max_height is: " + this.max_height);
  // console.log("this.min_height is: " + this.min_height);
  this.offset = this.cubeSize/2;
  this.starting_height = this.offset + this.min_height;
  mesh.position.set(DayPosition, this.starting_height , 0);

  ///////////
  // COLOR //
  ///////////

  if (Color == null){
    // console.log(Color);
    cubeMat.color.setHex('0x'+Math.floor(Math.random()*16777215).toString(16));
  }

  else {
    cubeMat.color.setHex(Color.replace('#', '0x'));
  }

  //////////////////////////
  // ACTIVITY_DESCRIPTION //
  //////////////////////////

  if (Activity_Description == null){
    mesh.userData.tooltipText = "Default";
  }

  else {

    mesh.userData.tooltipText = Activity_Description + ": " + timeConvert(Start_Act) + " to " + timeConvert(End_Act);
  }
  // console.log("What is the mesh.userData.tooltipText?: " + mesh.userData.tooltipText);

  this.currentMesh = mesh;
  mesh.userData.Day = this.Day_Name;
  mesh.userData.Start = Start_Act;
  mesh.userData.End = End_Act;
  scene.add(mesh);

  this.removeActivity = function() {
    scene.remove(mesh);
    mesh.geometry.dispose();
    mesh.material.dispose();
    mesh = undefined;
    // console.log("///removeActivity() Called///")
  }

};
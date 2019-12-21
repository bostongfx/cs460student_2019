Robot = function(x, y, z){

  // create head, neck, and torso
  var fromhelper = HELPER.cylinderSkeletonMesh( 3, 5, 'blue');
  var geometry = fromhelper[0];
  var material = fromhelper[1];
  var bones = fromhelper[2];
 
  var mesh = new THREE.SkinnedMesh( geometry, material );
  var skeleton = new THREE.Skeleton( bones );
  mesh.add( bones[0] );
  mesh.bind( skeleton );
 
  this.root = (bones[0]); // invisible anchor point
  this.root.position.set(x, y, z);
 
  this.head = bones[ 1 ];
  this.neck = bones[ 2 ];
  this.neck.position.y = -10;
  this.torso = bones[ 3 ];
  this.torso.position.y = -60;
 
  this.body_mesh = mesh;
  // end of head, neck, torso
 
  // start of left arm
  var fromhelper = HELPER.cylinderSkeletonMesh( 3, 5, 'blue');
  var geometry = fromhelper[0];
  var material = fromhelper[1];
  var bones = fromhelper[2];
 
  var mesh = new THREE.SkinnedMesh( geometry, material );
  var skeleton = new THREE.Skeleton( bones );
  mesh.add( bones[0] );
  mesh.bind( skeleton );
 
  this.neck.add( bones[ 0 ] ); // invisible anchor point
 
  this.left_upper_arm = bones[ 1 ];
  this.left_upper_arm.position.x = 10;
  this.left_upper_arm.position.y = -5;
 
  this.left_lower_arm = bones[ 2 ];
  this.left_lower_arm.position.x = 5;
  this.left_lower_arm.position.y = -5;
 
  this.left_hand = bones[ 3 ];
  this.left_hand.position.x = 5;
  this.left_hand.position.y = -2.5;
 
  this.left_arm_mesh = mesh;
  // end of left arm
 
  // start of right arm
  var fromhelper = HELPER.cylinderSkeletonMesh( 3, 5, 'blue');
  var geometry = fromhelper[0];
  var material = fromhelper[1];
  var bones = fromhelper[2];
 
  var mesh = new THREE.SkinnedMesh( geometry, material );
  var skeleton = new THREE.Skeleton( bones );
  mesh.add( bones[0] );
  mesh.bind( skeleton );
 
  this.neck.add( bones[ 0 ] ); // invisible anchor point
 
  this.right_upper_arm = bones[ 1 ];
  this.right_upper_arm.position.x = -10;
  this.right_upper_arm.position.y = -5;
 
  this.right_upper_arm = bones[ 2 ];
  this.right_upper_arm.position.x = -5;
  this.right_upper_arm.position.y = -5;
 
  this.right_hand = bones[ 3 ];
  this.right_hand.position.x = -5;
  this.right_hand.position.y = -2.5;
 
  this.right_arm_mesh = mesh;
  // end of right arm

  // start of left leg
  var fromhelper = HELPER.cylinderSkeletonMesh( 3, 5, 'blue');
  var geometry = fromhelper[0];
  var material = fromhelper[1];
  var bones = fromhelper[2];
 
  var mesh = new THREE.SkinnedMesh( geometry, material );
  var skeleton = new THREE.Skeleton( bones );
  mesh.add( bones[0] );
  mesh.bind( skeleton );
 
  this.torso.add( bones[ 0 ] ); // invisible anchor point
 
  this.left_upper_leg = bones[ 1 ];
  this.left_upper_leg.position.x = 10;
  this.left_upper_leg.position.y = -10;
 
  this.left_lower_leg = bones[ 2 ];
  this.left_lower_leg.position.x = 5;
  this.left_lower_leg.position.y = -10;
 
  this.left_foot = bones[ 3 ];
  this.left_foot.position.x = 5;
  this.left_foot.position.y = -5;
 
  this.left_leg_mesh = mesh;
  // end of left leg

  // start of right leg
  var fromhelper = HELPER.cylinderSkeletonMesh( 3, 5, 'blue');
  var geometry = fromhelper[0];
  var material = fromhelper[1];
  var bones = fromhelper[2];
 
  var mesh = new THREE.SkinnedMesh( geometry, material );
  var skeleton = new THREE.Skeleton( bones );
  mesh.add( bones[0] );
  mesh.bind( skeleton );
 
  this.torso.add( bones[ 0 ] ); // invisible anchor point
 
  this.right_upper_leg = bones[ 1 ];
  this.right_upper_leg.position.x = -10;
  this.right_upper_leg.position.y = -10;
 
  this.right_lower_leg = bones[ 2 ];
  this.right_lower_leg.position.x = -5;
  this.right_lower_leg.position.y = -10;
 
  this.right_foot = bones[ 3 ];
  this.right_foot.position.x = -5;
  this.right_foot.position.y = -5;
 
  this.right_leg_mesh = mesh;
  //end of right leg

  this.movement = null;
}

Robot.prototype.show = function(scene){
    scene.add(this.body_mesh);
    scene.add(this.left_arm_mesh);
    scene.add(this.right_arm_mesh);
    scene.add(this.left_leg_mesh);
    scene.add(this.right_leg_mesh);
//   var rGroup = new THREE.Group();
//   rGroup.add(this.head);

//   var helper = new THREE.SkeletonHelper(rGroup);
//   helper.material.linewidth = 3;  //make the skeleton thick

//   scene.add(rGroup);
//   scene.add(helper);
}

Robot.prototype.raise_left_arm = function(){
  this.movement = 'raise left arm';
}

Robot.prototype.lower_left_arm = function(){
  this.movement = 'lower left arm';
}

Robot.prototype.raise_right_arm = function(){
    this.movement = 'raise right arm';
}

Robot.prototype.lower_right_arm = function(){
    this.movement = 'lower right arm';
}

Robot.prototype.kick = function(){
  this.movement = 'kick';
}

Robot.prototype.dance = function(){
  this.movement = 'dance';
}

Robot.prototype.stop = function(){
  this.movement = 'null';
}

Robot.prototype.onAnimate = function(){
  // gets called on each animate loop
  // meaning on every frame

  //check which movement is requested
  if (this.movement == 'raise left arm'){

    //raise the left arm
    T = Math.PI;
    this.left_upper_arm.quaternion.slerp(new THREE.Quaternion(Math.sin(T/2),
                                0, 
                                0, 
                                Math.cos(T/2)), 0.1);
  }else if(this.movement == 'lower left arm'){
    T = -Math.PI;
    this.left_upper_arm.quaternion.slerp(new THREE.Quaternion(Math.cos(T/2),
                                0, 
                                0, 
                                Math.sin(T/2)), 0.1);
  }else if(this.movement == 'raise right arm'){

    //raise the left arm
    T = Math.PI;
    this.right_upper_arm.quaternion.slerp(new THREE.Quaternion(Math.sin(T/2),
                                0, 
                                0, 
                                Math.cos(T/2)), 0.1);
  }else if(this.movement == 'lower right arm'){
    T = -Math.PI;
    this.right_upper_arm.quaternion.slerp(new THREE.Quaternion(Math.cos(T/2),
                                0, 
                                0, 
                                Math.sin(T/2)), 0.1);
  }
  else if(this.movement == 'kick'){
  
    // check if slerp reached almost the end
    if (this.right_upper_leg.quaternion.w < 0.72) {
  
    // signal that the kick is done and the leg should move back
    this.movement = 'kick done';
  
    } else {
  
    var T = -Math.PI/2;
    this.right_upper_leg.quaternion.slerp( new THREE.Quaternion( Math.sin( T / 2 ),   // x
                                  0,                   // y
                                  0,                   // z
                                  Math.cos( T / 2 ) ), // w
                                  0.1 );               
    }
  }else if (this.movement == 'kick done') {
  
    // reset leg back to identity
    this.right_upper_leg.quaternion.slerp( new THREE.Quaternion(0,0,0,1), 0.1 );
  
  }else if (this.movement == 'dance'){           

        var that = this;
      setInterval(function() {
        var random = Math.floor(Math.random() * 5);
        switch(random) {
        case 0:
            that.raise_left_arm();
            break;
        case 1:
            that.lower_left_arm();
            break;
        case 2:
            that.raise_right_arm();
            break;
        case 3:
            that.lower_right_arm();
            break;
        case 4:
            that.kick();
            break;
        }
      }, 150);

  }else if(this.movement == 'null'){
    return;
  }
}
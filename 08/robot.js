
Robot = function(x, y, z){

  var fromhelper = HELPER.cylinderSkeletonMesh( 3, 5, '#359f91');
  var geometry = fromhelper[0];
  var material = fromhelper[1];
  var bones = fromhelper[2];

  var mesh = new THREE.SkinnedMesh( geometry, material );
  var skeleton = new THREE.Skeleton( bones );
  mesh.add( bones[0] );
  mesh.bind( skeleton );

  this.root = bones[ 0 ]; // invisible anchor point
  this.root.position.set( x, y, z );

  this.head = bones[ 1 ];
  this.neck = bones[ 2 ];
  this.neck.position.y = -10;
  this.torso = bones[ 3 ];
  this.torso.position.y = -30;

  this.body_mesh = mesh;
  // end of head, neck, torso

  // start of left arm
  var fromhelper = HELPER.cylinderSkeletonMesh( 3, 5, '#359f91');
  var geometry = fromhelper[0];
  var material = fromhelper[1];
  var bones = fromhelper[2];

  var mesh = new THREE.SkinnedMesh( geometry, material );
  var skeleton = new THREE.Skeleton( bones );
  mesh.add( bones[0] );
  mesh.bind( skeleton );

  this.neck.add( bones[ 0 ] ); // invisible anchor point

  this.left_upper_arm = bones[1];
  this.left_upper_arm.position.x = 15
  this.left_upper_arm.position.y = -10

  this.left_lower_arm = bones[2];
  this.left_lower_arm.position.x = 10
  this.left_lower_arm.position.y = -15

  this.left_hand = bones[3];
  this.left_hand.position.x = 5
  this.left_hand.position.y = -10

  this.leftarm_mesh = mesh;

  // start of right arm
  var fromhelper = HELPER.cylinderSkeletonMesh( 3, 5, '#359f91');
  var geometry = fromhelper[0];
  var material = fromhelper[1];
  var bones = fromhelper[2];

  var mesh = new THREE.SkinnedMesh( geometry, material );
  var skeleton = new THREE.Skeleton( bones );
  mesh.add( bones[0] );
  mesh.bind( skeleton );

  this.neck.add( bones[ 0 ] ); // invisible anchor point

  this.right_upper_arm = bones[1];
  this.right_upper_arm.position.x = -15
  this.right_upper_arm.position.y = -10

  this.right_lower_arm = bones[2];
  this.right_lower_arm.position.x = -10
  this.right_lower_arm.position.y = -15

  this.right_hand = bones[3];
  this.right_hand.position.x = -5
  this.right_hand.position.y = -10

  this.rightarm_mesh = mesh;

  // start of left leg
  var fromhelper = HELPER.cylinderSkeletonMesh( 3, 5, '#359f91');
  var geometry = fromhelper[0];
  var material = fromhelper[1];
  var bones = fromhelper[2];

  var mesh = new THREE.SkinnedMesh( geometry, material );
  var skeleton = new THREE.Skeleton( bones );
  mesh.add( bones[0] );
  mesh.bind( skeleton );

  this.torso.add( bones[ 0 ] ); // invisible anchor point

  this.left_upper_leg = bones[1];
  this.left_upper_leg.position.x = 10
  this.left_upper_leg.position.y = -25

  this.left_lower_leg = bones[2];
  this.left_lower_leg.position.x = 10
  this.left_lower_leg.position.y = -35

  this.left_foot = bones[3];
  this.left_foot.position.x = 5
  this.left_foot.position.y = -5

  this.leftleg_mesh = mesh;

  // start of right leg
  var fromhelper = HELPER.cylinderSkeletonMesh( 3, 5, '#359f91');
  var geometry = fromhelper[0];
  var material = fromhelper[1];
  var bones = fromhelper[2];

  var mesh = new THREE.SkinnedMesh( geometry, material );
  var skeleton = new THREE.Skeleton( bones );
  mesh.add( bones[0] );
  mesh.bind( skeleton );

  this.torso.add( bones[ 0 ] ); // invisible anchor point

  this.right_upper_leg = bones[1];
  this.right_upper_leg.position.x = -10
  this.right_upper_leg.position.y = -25

  this.right_lower_leg = bones[2];
  this.right_lower_leg.position.x = -10
  this.right_lower_leg.position.y = -35

  this.right_foot = bones[3];
  this.right_foot.position.x = -5
  this.right_foot.position.y = -5

  this.rightleg_mesh = mesh;

  this.movement = null;
};


Robot.prototype.show = function(scene){
  scene.add(this.body_mesh);
  scene.add(this.leftarm_mesh);
  scene.add(this.rightarm_mesh);
  scene.add(this.leftleg_mesh);
  scene.add(this.rightleg_mesh);
};

Robot.prototype.walk = function() {
  this.movement = 'walk';
};
Robot.prototype.walk2 = function() {
  this.movement = 'walk2';
};

Robot.prototype.onStep = function() {
for (var a in robots) {
  a = robots[a];

  if(this.root.position.distanceTo({x:0, y:0, z:0}) < 75) {
      this.root.rotateY(Math.PI/2);
    }

  if(a.root.position.equals(this.root.position)){
    continue;
  }

  if(a.root.position.distanceTo(this.root.position) < 10) {
    this.root.rotateY(Math.PI/2);
  }



}

  if (this.root.position.z > 490  ||
      this.root.position.z < -490 ||
      this.root.position.x > 490 ||
      this.root.position.x < -490 ) {
        this.root.rotateY(Math.PI/2);
      }
  this.root.translateZ(10);
}

Robot.prototype.onAnimate = function() {

  if (this.movement == 'walk') {
    if(this.right_upper_leg.quaternion.w < 0.93){
         this.movement = 'walk2';

    }
    this.left_upper_leg.quaternion.slerp( new THREE.Quaternion(0, 0, 0, 1), 0.5);

    var T = -Math.PI/4;
    this.right_upper_leg.quaternion.slerp( new THREE.Quaternion(Math.sin(T/2), 0,
                                                               0, Math.cos(T/2)), 0.2);
    this.onStep();

  } else if (this.movement == 'walk2') {
    if(this.left_upper_leg.quaternion.w < 0.93){
         this.movement = 'walk';

    }
    this.right_upper_leg.quaternion.slerp( new THREE.Quaternion(0, 0, 0, 1), 0.5);

    var T = -Math.PI/4;
    this.left_upper_leg.quaternion.slerp( new THREE.Quaternion(Math.sin(T/2), 0,
                                                               0, Math.cos(T/2)), 0.2);
     this.onStep();

  }

};

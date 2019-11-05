Robot = function(x, y, z) {
  // create head, neck, torso
  var fromhelper = HELPER.cylinderSkeletonMesh(3, 5, 'blue')
  var geometry = fromhelper[0];
  var material = fromhelper[1];
  var bones = fromhelper[2];

  var mesh = new THREE.SkinnedMesh( geometry, material );
  var skeleton = new THREE.Skeleton( bones );
  mesh.add( bones[ 0 ] );
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

  // left arm
  var fromhelper = HELPER.cylinderSkeletonMesh(3, 5, 'blue')
  var geometry = fromhelper[0];
  var material = fromhelper[1];
  var bones = fromhelper[2];

  var mesh = new THREE.SkinnedMesh( geometry, material );
  var skeleton = new THREE.Skeleton( bones );
  mesh.add( bones[ 0 ] );
  mesh.bind( skeleton );

  this.neck.add( bones[ 0 ] ); // invisible anchor point

  this.left_upperarm = bones[ 1 ];
  this.left_upperarm.position.x = 5;
  this.left_upperarm.position.y = -5;

  this.left_lowerarm = bones[ 2 ];
  this.left_lowerarm.position.x = 5;
  this.left_lowerarm.position.y = -15;

  this.left_hand = bones[ 3 ];
  this.left_hand.position.x = 5;
  this.left_hand.position.y = -5;


  this.leftarm_mesh = mesh;
  // end of left arm





  // this.head = new THREE.Bone();
  // this.head.position.set( x, y, z );

  // this.neck = new THREE.Bone();
  // this.neck.position.y = -10;

  // this.head.add(this.neck);

  // this.torso = new THREE.Bone();
  // this.torso.position.y = -30;

  // this.neck.add(this.torso);


  // this.left_upperarm = new THREE.Bone();
  // this.left_upperarm.position.y = -5;
  // this.left_upperarm.position.x = 5;

  // this.left_lowerarm = new THREE.Bone();
  // this.left_lowerarm.position.y = -15;
  // this.left_lowerarm.position.x = 5;

  // this.left_hand = new THREE.Bone();
  // this.left_hand.position.x = 5;
  // this.left_hand.position.y = -5;

  // this.neck.add(this.left_upperarm);
  // this.left_upperarm.add(this.left_lowerarm)
  // this.left_lowerarm.add(this.left_hand);


  // this.left_upperleg = new THREE.Bone();
  // this.left_upperleg.position.x = 5;
  // this.left_upperleg.position.y = -5;

  // this.left_lowerleg = new THREE.Bone();
  // this.left_lowerleg.position.x = 5;
  // this.left_lowerleg.position.y = -15;

  // this.left_foot = new THREE.Bone();
  // this.left_foot.position.x = 5;
  // this.left_foot.position.y = -5;

  // this.torso.add(this.left_upperleg);
  // this.left_upperleg.add(this.left_lowerleg)
  // this.left_lowerleg.add(this.left_foot);





  // this.right_upperarm = new THREE.Bone();
  // this.right_upperarm.position.y = -5;
  // this.right_upperarm.position.x = -5;

  // this.right_lowerarm = new THREE.Bone();
  // this.right_lowerarm.position.y = -15;
  // this.right_lowerarm.position.x = -5;

  // this.right_hand = new THREE.Bone();
  // this.right_hand.position.x = -5;
  // this.right_hand.position.y = -5;

  // this.neck.add(this.right_upperarm);
  // this.right_upperarm.add(this.right_lowerarm)
  // this.right_lowerarm.add(this.right_hand);


  // this.right_upperleg = new THREE.Bone();
  // this.right_upperleg.position.x = -5;
  // this.right_upperleg.position.y = -5;

  // this.right_lowerleg = new THREE.Bone();
  // this.right_lowerleg.position.x = -5;
  // this.right_lowerleg.position.y = -15;

  // this.right_foot = new THREE.Bone();
  // this.right_foot.position.x = -5;
  // this.right_foot.position.y = -5;

  // this.torso.add(this.right_upperleg);
  // this.right_upperleg.add(this.right_lowerleg)
  // this.right_lowerleg.add(this.right_foot);


  this.movement = null;

};


Robot.prototype.show = function(scene) {

  scene.add(this.body_mesh);
  scene.add(this.leftarm_mesh);

  // var rGroup = new THREE.Group();
  // rGroup.add( this.head );

  // var helper = new THREE.SkeletonHelper( rGroup );
  // helper.material.linewidth = 3;

  // scene.add(rGroup);
  // scene.add(helper);

};

Robot.prototype.raise_left_arm = function() {

  this.movement = 'raise left arm';

};

Robot.prototype.lower_left_arm = function() {

  this.movement = 'lower left arm';

};

Robot.prototype.kick = function() {

  this.movement = 'kick';

};

Robot.prototype.dance = function() {
  
  this.movement = 'dance';

};

Robot.prototype.onAnimate = function() {

  if (this.movement == 'raise left arm') {

    var T = Math.PI;
    this.left_upperarm.quaternion.slerp( new THREE.Quaternion(Math.sin(-T/2),  // w
                                                              0,               // x
                                                              0,               // y
                                                              Math.cos(-T/2)), // z
                                        0.1 );

  } else  if (this.movement == 'lower left arm') {

    this.left_upperarm.quaternion.slerp( new THREE.Quaternion(0, 0, 0, 1),
                                        0.1 );

  } else if (this.movement == 'kick') {
  
    // check if slerp reached almost the end
    if (this.right_upperleg.quaternion.w < 0.72) {
  
      // signal that the kick is done and the leg should move back
      this.movement = 'kick done';
  
    } else {
  
      var T = -Math.PI/2;
      this.right_upperleg.quaternion.slerp( new THREE.Quaternion( Math.sin( T / 2 ),   // x
                                                                  0,                   // y
                                                                  0,                   // z
                                                                  Math.cos( T / 2 ) ), // w
                                            0.1 );
  
    }
  
  } else if (this.movement == 'kick done') {
  
    // reset leg back to identity
    this.right_upperleg.quaternion.slerp( new THREE.Quaternion(0,0,0,1), 0.1 );
  
  } else if (this.movement == 'dance') {

    if (typeof dancer === 'undefined') {

      dancer = setInterval(function() {

        // 
        // some random translation
        //
        var shakehead = 3*Math.random();
        if (Math.random() < .5) {
          shakehead *= -1;
        }

        var shakeneck = 3*Math.random();
        if (Math.random() < .5) {
          shakeneck *= -1;
        }

        var shaketorso = 3*Math.random();
        if (Math.random() < .5) {
          shaketorso *= -1;
        }

        this.head.position.x += shakehead;

        this.neck.position.x += shakeneck;

        this.torso.position.x += shaketorso;


        //
        // use actions
        //
        if (Math.random() < .3) {
          this.raise_left_arm();
        }

        if (Math.random() < .3) {
          this.lower_left_arm();
        }

        if (Math.random() < .3) {
          this.kick();
        }

        if (Math.random() < .3) {
          this.movement = 'kick done';
        }

      }.bind(this), 500);

    }

  }

};
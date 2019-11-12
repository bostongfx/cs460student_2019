Robot = function(x, y, z) {



// create head, neck and torso

var fromhelper = HELPER.cylinderSkeletonMesh( 3, 5, 'blue');
var geometry = fromhelper[0];
var material = fromhelper[1];
var bones = fromhelper[2];

var mesh = new THREE.SkinnedMesh( geometry, material);
var skeleton = new THREE.Skeleton( bones );
mesh.add( bones[0] );
mesh.bind( skeleton );


this.root = bones[ 0 ]; //invisible anchor point
this.root.position.set( x, y, z );

this.head = bones[ 1 ];
this.head.position = 0;
this.neck = bones[ 2 ];
this.neck.position.y = -10;
this.torso = bones[ 3 ];
this.torso.position.y = -30;

this.body_mesh = mesh;

//end of head, neck torso

//left upper arm

var fromhelper = HELPER.cylinderSkeletonMesh( 3, 5, 'blue');
var geometry = fromhelper[0];
var material = fromhelper[1];
var bones = fromhelper[2];

var mesh = new THREE.SkinnedMesh( geometry, material);
var skeleton = new THREE.Skeleton( bones );
mesh.add( bones[0] );
mesh.bind( skeleton );

this.neck.add( bones[0]); // invisible anchor point

this.left_upperarm = bones[1];
this.left_upperarm.position.x = 5
this.left_upperarm.position.y = -5

this.left_lowerarm = bones[2];
this.left_lowerarm.position.x = 5
this.left_lowerarm.position.y = -15

this.left_hand = bones[3];
this.left_hand.position.x = 5
this.left_hand.position.y = -5

this.leftarm_mesh = mesh;

//end of left arm

//right upper arm

var fromhelper = HELPER.cylinderSkeletonMesh( 3, 5, 'blue');
var geometry = fromhelper[0];
var material = fromhelper[1];
var bones = fromhelper[2];

var mesh = new THREE.SkinnedMesh( geometry, material);
var skeleton = new THREE.Skeleton( bones );
mesh.add( bones[0] );
mesh.bind( skeleton );

this.neck.add( bones[0] ); // invisible anchor point

this.right_upperarm = bones[1];
this.right_upperarm.position.x = -5
this.right_upperarm.position.y = -5

this.right_lowerarm = bones[2];
this.right_lowerarm.position.x = -10
this.right_lowerarm.position.y = -15

this.right_hand = bones[3];
this.right_hand.position.x = -5
this.right_hand.position.y = 5

this.rightarm_mesh = mesh;

//end of right arm



//right leg

var fromhelper = HELPER.cylinderSkeletonMesh( 3, 5, 'blue');
var geometry = fromhelper[0];
var material = fromhelper[1];
var bones = fromhelper[2];

var mesh = new THREE.SkinnedMesh( geometry, material);
var skeleton = new THREE.Skeleton( bones );
mesh.add( bones[0] );
mesh.bind( skeleton );

this.torso.add( bones[0] ); // invisible anchor point

this.right_upperleg = bones[1];
this.right_upperleg.position.x = 5
this.right_upperleg.position.y = -5

this.right_lowerleg = bones[2];
this.right_lowerleg.position.x = 10
this.right_lowerleg.position.y = -15

this.right_footleg = bones[3];
this.right_footleg.position.x = 10
this.right_footleg.position.y = -5

this.rightleg_mesh = mesh;

//end of right leg



//left leg

var fromhelper = HELPER.cylinderSkeletonMesh( 3, 5, 'blue');
var geometry = fromhelper[0];
var material = fromhelper[1];
var bones = fromhelper[2];

var mesh = new THREE.SkinnedMesh( geometry, material);
var skeleton = new THREE.Skeleton( bones );
mesh.add( bones[0] );
mesh.bind( skeleton );

this.torso.add( bones[0] ); // invisible anchor point

this.left_upperleg = bones[1];
this.left_upperleg.position.x = -10
this.left_upperleg.position.y = -5

this.left_lowerleg = bones[2];
this.left_lowerleg.position.x = -10
this.left_lowerleg.position.y = -15

this.left_footleg = bones[3];
this.left_footleg.position.x = -10
this.left_footleg.position.y = -5

this.leftleg_mesh = mesh;

//end of left leg




  this.movement = null; // for instance 'raise left arm', 
                        // raises the left arm


};

Robot.prototype.show = function(scene) {

  scene.add(this.body_mesh);
  scene.add(this.leftarm_mesh);
    scene.add(this.rightarm_mesh);
    scene.add(this.leftleg_mesh);
       scene.add(this.rightleg_mesh);
 



};

Robot.prototype.raiseLeftArm = function() {

  this.movement = 'raise left arm';

};

Robot.prototype.lowerLeftArm = function() {

  this.movement = 'lower left arm';

};

Robot.prototype.kick = function() {

  this.movement = 'kick';

};
Robot.prototype.dance = function() {

  this.movement = 'dance';

};
Robot.prototype.onAnimate = function() {

  // gets called on each animate loop
  // meaning on every frame

  // check which movement is requested
  if( this.movement == 'raise left arm') {

    // raise the left arm
    T=Math.PI;
    var x = Math.sin(T/2)
    var y = 0
    var z = 0
    var w = Math.cos(T/2)    

    r.left_upperarm.quaternion.slerp( new THREE.Quaternion(
                                          x,
                                          y,
                                          z,
                                          w
      ), 0.1 );


  } else if( this.movement == 'lower left arm') {

    // lower the left arm
    T=Math.PI;
    var x = Math.cos(T/2)
    var y = 0
    var z = 0
    var w = 0    

    r.left_upperarm.quaternion.slerp( new THREE.Quaternion(
                                          x,
                                          y,
                                          z,
                                          w
      ), 0.1 );


  } else if (this.movement == 'kick') {

    // check if slerp reached almost the end
    if (this.right_upperleg.quaternion.w < 0.72 ) {

      // signal that the kick is done and the leg should move back
      this.movement = 'kick done';

    }else {

      var T = -Math.PI/2;
    var x = Math.sin( T / 2 )
    var y = 0
    var z = 0
    var w = Math.cos( T / 2 )    

      r.right_upperleg.quaternion.slerp( new THREE.Quaternion( Math.sin( T / 2 ),   // x
                                                                  0,                   // y
                                                                  0,                   // z
                                                                  Math.cos( T / 2 ) ), // w
                                            0.1 );
                                      
    }

  } else if (this.movement == 'kick done') {

    // reset leg back to identity
    this.right_upperleg.quaternion.slerp( new THREE.Quaternion(0,0,0,1), 0.1 );

  } else if (this.movement == 'dance') {

    if (typeof this.dancer == 'undefined') {

      this.dancer = setInterval(function() {
  // start the music
        var music = document.getElementById('music');
        music.autoplay = true;
        music.load();
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
          this.raiseLeftArm();
        }

        if (Math.random() < .3) {
          this.lowerLeftArm();
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


// works for raising 
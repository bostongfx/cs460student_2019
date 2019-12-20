Robot = function(x, y, z) {

	var fromhelper = HELPER.cylinderSkeletonMesh(3, 5, '#4d250f');
    var geometry = fromhelper[0];
    var material = fromhelper[1];
    var bones = fromhelper[2];

    var mesh = new THREE.SkinnedMesh( geometry, material );
    var skeleton = new THREE.Skeleton( bones );
    mesh.add( bones[0] );
    mesh.bind( skeleton );

    this.root = bones[0];
    this.root.position.set( x, y, z );

    this.head = bones[1];

    this.neck = bones[2];
    this.neck.position.y = -10;



    this.torso = bones[3];
    this.torso.position.y = -30

    this.bodymesh = mesh;



    //start of left arm
    var fromhelper = HELPER.cylinderSkeletonMesh(3, 5, '#4d250f');
    var geometry = fromhelper[0];
    var material = fromhelper[1];
    var bones = fromhelper[2];
    cube_geometry = new THREE.BoxBufferGeometry( 20, 20, 20);
    	var cubetexture =  new THREE.TextureLoader().load( 'vilager.png' );
        cube_material = new THREE.MeshStandardMaterial({ 
        	map: cubetexture });
        this.cube = new THREE.Mesh( cube_geometry, cube_material);
        scene.add(this.cube);

    var mesh = new THREE.SkinnedMesh( geometry, material );
    var skeleton = new THREE.Skeleton( bones );
    mesh.add( bones[0] );
    mesh.bind( skeleton );

    this.neck.add( bones[0] ) ;
    this.neck.add(this.cube);

    this.left_upperarm = bones[1];
    this.left_upperarm.position.x = 8;
    this.left_upperarm.position.y = -5;

    this.left_lowerarm = bones[2];
    this.left_lowerarm.position.x = 8;
    this.left_lowerarm.position.y = -15;

    this.left_hand = bones[3];
    this.left_hand.position.x = -1;
    this.left_hand.position.y = -5;

    this.leftarm_mesh = mesh;
    //end of left arm

        //start of left arm
    var fromhelper = HELPER.cylinderSkeletonMesh(3, 5, '#4d250f');
    var geometry = fromhelper[0];
    var material = fromhelper[1];
    var bones = fromhelper[2];

    var mesh = new THREE.SkinnedMesh( geometry, material );
    var skeleton = new THREE.Skeleton( bones );
    mesh.add( bones[0] );
    mesh.bind( skeleton );

    this.neck.add( bones[0] ) ;

    this.right_upperarm = bones[1];
    this.right_upperarm.position.x = -8;
    this.right_upperarm.position.y = -5;

    this.right_lowerarm = bones[2];
    this.right_lowerarm.position.x = -8;
    this.right_lowerarm.position.y = -15;

    this.right_hand = bones[3];
    this.right_hand.position.x = 1;
    this.right_hand.position.y = -5;

    this.rightarm_mesh = mesh;
    //end of left arm

   //start of left arm
    var fromhelper = HELPER.cylinderSkeletonMesh(3, 5, '#4d250f');
    var geometry = fromhelper[0];
    var material = fromhelper[1];
    var bones = fromhelper[2];

    var mesh = new THREE.SkinnedMesh( geometry, material );
    var skeleton = new THREE.Skeleton( bones );
    mesh.add( bones[0] );
    mesh.bind( skeleton );

    this.torso.add( bones[0] ) ;

    this.right_upperleg = bones[1];
    this.right_upperleg.position.x = -5;
    this.right_upperleg.position.y = -5;

    this.right_lowerleg = bones[2];
    this.right_lowerleg.position.x = -5;
    this.right_lowerleg.position.y = -25;

    this.right_foot = bones[3];
    this.right_foot.position.x = -5;
    this.right_foot.position.y = -3;

    this.rightfoot_mesh = mesh;
    //end of left arm

    //start of left arm
    var fromhelper = HELPER.cylinderSkeletonMesh(3, 5, '#4d250f');
    var geometry = fromhelper[0];
    var material = fromhelper[1];
    var bones = fromhelper[2];

    var mesh = new THREE.SkinnedMesh( geometry, material );
    var skeleton = new THREE.Skeleton( bones );
    mesh.add( bones[0] );
    mesh.bind( skeleton );

    this.torso.add( bones[0] ) ;

    this.left_upperleg = bones[1];
    this.left_upperleg.position.x = 5;
    this.left_upperleg.position.y = -5;

    this.left_lowerleg = bones[2];
    this.left_lowerleg.position.x = 5;
    this.left_lowerleg.position.y = -25;

    this.left_foot = bones[3];
    this.left_foot.position.x = 5;
    this.left_foot.position.y = -3;

    this.leftfoot_mesh = mesh;
    //end of left arm

  


  this.movement = null;

};


Robot.prototype.show = function(scene) {

  scene.add(this.bodymesh);
  scene.add(this.leftarm_mesh);
  scene.add(this.rightarm_mesh);
  scene.add(this.rightfoot_mesh);
  scene.add(this.leftfoot_mesh);

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
  	if(this.left_upperleg.quaternion.w < 0.72){
			this.movement = 'reset';
		}
		else{
			var T = -Math.PI/2;
			this.left_upperleg.quaternion.slerp( new THREE.Quaternion( Math.sin( T / 2 ),   // x
                                                                  0,                   // y
                                                                  0,                   // z
                                                                  Math.cos( T / 2 ) ), // w
                                            0.1 );
	var P = -Math.PI/3;
	this.right_upperleg.quaternion.slerp(new THREE.Quaternion(0,
														Math.sin(P/2),
														0,
														Math.cos(P/2)),
											0.1);
	var S = 1.5 *Math.PI;
	this.right_upperarm.quaternion.slerp(new THREE.Quaternion(Math.sin(S/2),
														0,
														0,
														Math.cos(S/2)),
											0.1);

	var R = Math.PI/2;
	this.left_upperarm.quaternion.slerp(new THREE.Quaternion(0,
														0,
														Math.sin(R/2),
														Math.cos(R/2)),
											0.1);

		}
			
	}
	else if(this.movement == 'reset'){
		if(this.left_upperarm.quaternion.z < .1){
			this.movement = 'dance';
		}
		else{
	this.right_upperleg.quaternion.slerp(new THREE.Quaternion(0,
														0,
														0,
														1),
											0.1);
	this.right_upperarm.quaternion.slerp(new THREE.Quaternion(0,
														0,
														0,
														1),
											0.1);

	this.left_upperarm.quaternion.slerp(new THREE.Quaternion(0,
														0,
														0,
														1),
											0.1);
	this.left_upperleg.quaternion.slerp( new THREE.Quaternion(0,   // x
                                                        0,                   // y
                                                        0,                   // z
                                                        1), // w
                                            0.1 );
		}




	}

    

    


};
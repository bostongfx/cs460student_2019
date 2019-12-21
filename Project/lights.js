lights = function(x, y, z) {
// create lights
  var fromhelper = HELPER.cylinderSkeletonMesh(3, 5, 'white')
  var geometry = fromhelper[0];
  var material = fromhelper[1];
  var bones = fromhelper[2];
	
var mesh = new THREE.SkinnedMesh( geometry, material );
  var skeleton = new THREE.Skeleton( bones );
  mesh.add( bones[ 0 ] );
  mesh.bind( skeleton );

  this.root = bones[ 0 ];
  this.root.position.set(x, y, z);

  this.head = bones[ 1 ];
  this.head.position.y = 300;
  this.neck = bones[ 2 ];
  this.neck.position.x = -30;


   this.torso = bones[ 3 ];
  this.torso.position.y = -10;
  this.body_mesh = mesh;


};

lights.prototype.show = function(scene) {

  scene.add(this.body_mesh);

};
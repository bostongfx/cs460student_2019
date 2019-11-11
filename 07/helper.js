HELPER = {};

/**
 * This method returns [geometry, material, bones] to create a skeleton mesh
 * based on a cylinder.
 *
 * @param howmany: Number of bones.
 * @param howwide: Radius of the cylinder.
 * @param color: Color of the cylinder.
 */
HELPER.cylinderSkeletonMesh = function(howmany, howwide, color) {
  
  var segmentheight = 10; // just a temporary value but it needs to match for geometry and bones
  var height = segmentheight * howmany;

  //
  // inspired by https://threejs.org/docs/scenes/bones-browser.html
  //

  // step1: geometry
  var geometry = new THREE.CylinderBufferGeometry(
    howwide, // radiusTop
    howwide, // radiusBottom
    height, // height
    8, // radiusSegments
    howmany * 3, // heightSegments
    true // openEnded
  );

  var position = geometry.attributes.position;

  var vertex = new THREE.Vector3();

  var skinIndices = [];
  var skinWeights = [];

  for ( var i = 0; i < position.count; i ++ ) {

    vertex.fromBufferAttribute( position, i );

    var y = ( vertex.y + height / 2 );

    var skinIndex = Math.floor( y / segmentheight );
    var skinWeight = ( y % segmentheight ) / segmentheight;

    skinIndices.push( skinIndex, skinIndex + 1, 0, 0 );
    skinWeights.push( 1 - skinWeight, skinWeight, 0, 0 );

  }

  geometry.setAttribute( 'skinIndex', new THREE.Uint16BufferAttribute( skinIndices, 4 ) );
  geometry.setAttribute( 'skinWeight', new THREE.Float32BufferAttribute( skinWeights, 4 ) );

  // step 2: setup material
  var material = new THREE.MeshStandardMaterial( {
    skinning: true, // IMPORTANT!
    color: color,
    side: THREE.DoubleSide,
    flatShading: true
  } );

  // step 3: setup bones
  var bones = [];

  // we always need a dummy parent bone as the anchor point
  var parentbone = new THREE.Bone();
  // parentbone.position.y = -height / 2; // weeeeird
  bones.push(parentbone);

  for (var i=0; i< howmany; i++) {

    var currentbone = new THREE.Bone();
    currentbone.position.y = segmentheight;

    parentbone.add(currentbone);
    bones.push(currentbone); // add the bone
    parentbone = currentbone;
    
  }

  return [geometry, material, bones];

};
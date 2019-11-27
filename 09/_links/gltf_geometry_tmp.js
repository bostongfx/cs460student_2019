// add to head of html file
// <script src="https://threejs.org/examples/js/loaders/GLTFLoader.js"></script>
// 

var gltfloader = new THREE.GLTFLoader();

//loads gltf cow 

// Load a glTF resource
 gltfloader.load(
  // resource URL
  'meshes/cow_textured.gltf',
  // called when the resource is loaded
  function ( gltf ) {

    scene.add( gltf.scene );


    gltf.animations; // Array<THREE.AnimationClip>
    gltf.scene; // THREE.Scene
    gltf.scenes; // Array<THREE.Scene>
    gltf.cameras; // Array<THREE.Camera>
    gltf.asset; // Object
  },
    // called while loading is progressing
  function ( xhr ) {

    console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

  },
  // called when loading has errors
  function ( error ) {

    console.log( 'An error happened' );

  }
);

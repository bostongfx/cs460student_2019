function voxelPlacerMain(){
	console.log("Entered Main");
	
	//Scene + Renderer setup
	scene = new THREE.Scene();
	renderer = new THREE.WebGLRenderer();
	renderer.setSize(window.innerWidth, window.innerHeight);
	document.body.appendChild(renderer.domElement);
	
	//Camera Setup
	var camFov = 90;
	var camRatio = window.innerWidth / window.innerHeight;;
	var camzNear = 1;
	var camzFar = 1000;
	sceneCamera = new THREE.PerspectiveCamera(camFov, camRatio, camzNear, camzFar);
	sceneCamera.position.set(0, 0, 100);
	//Control Setup
	controls = new THREE.TrackballControls(sceneCamera, renderer.domElement);
	
	//Light Scene Setup
	var ambientLight = new THREE.AmbientLight();
	scene.add(ambientLight);
	var directionalLight = new THREE.DirectionalLight(0xffffff, 1);
	directionalLight.position.set(45, 60, 30);
	scene.add(directionalLight);

	
	//Geometry
	var firstCubeBuffer = new THREE.BoxBufferGeometry(10, 10, 10);
	var baseMaterial = new THREE.MeshStandardMaterial({
		color : 0xff0000,
	}); 
	var firstGeometry = new THREE.Mesh(firstCubeBuffer, baseMaterial);
	scene.add(firstGeometry);
	
	var cubeCursor = new THREE.BoxBufferGeometry(10, 10, 10);
	var cubeCursorMat = new THREE.MeshBasicMaterial({
		color : 0xffffff,
		transparent : true,
		opacity : .5
	});
	var cursorObject = new THREE.Mesh(cubeCursor, cubeCursorMat);
	cursorObject.position.set(0, 10, 0);
	scene.add(cursorObject);
	
	
	
	//Mouse Listener
	renderer.domElement.onmousemove = function(e){
		var pixCord = new THREE.Vector2(e.clientX, e.clientY);		
		var viewCord = new THREE.Vector2((pixCord.x / window.innerWidth) * 2 - 1, -(pixCord.y / window.innerHeight) * 2 + 1);
		var viewCordNear = new THREE.Vector3(viewCord.x, viewCord.y, 0);

		var raycaster = new THREE.Raycaster();
		raycaster.setFromCamera(viewCordNear, sceneCamera);
		intersects = raycaster.intersectObjects(scene.children);
		
		//If not intersecting anything

		
		var firstObject;
		var objectFace;
		for (var i = 0; i < intersects.length; i++){
			if(intersects[i].object == cursorObject){
				continue;
			};
			firstObject = intersects[i].object;
			objectFace = intersects[i].face;
			break;
		}
		if(firstObject == null){
			return false;
		}
		
		var newPosition = new THREE.Vector3(firstObject.position.x + objectFace.normal.x * 10,
											firstObject.position.y + objectFace.normal.y * 10,
											firstObject.position.z + objectFace.normal.z * 10);
		cursorObject.position.copy(newPosition);
	};
	renderer.domElement.onmousedown = function(e){
		if(!e.shiftKey){
			e.preventDefault();
			return false;
		}
		var newCubeGeom = new THREE.BoxBufferGeometry(10, 10, 10);
		var newCube = new THREE.Mesh(newCubeGeom, baseMaterial);
		newCube.position.copy(cursorObject.position);
		scene.add(newCube);
		console.log("Click");
	}
	
	
	//GUI Setup
	var gui = dat.GUI();
	
	
	animate();
	
}
function animate(){
	requestAnimationFrame(animate);
	controls.update();
	renderer.render(scene, sceneCamera);
}
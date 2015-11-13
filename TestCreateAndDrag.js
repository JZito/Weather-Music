// standard global variables
var container, scene, camera, renderer, controls, stats;
//var keyboard = new THREEx.KeyboardState();
var clock = new THREE.Clock();

// custom global variables
var cube;
var plane;
var offset = new THREE.Vector3();
var raycaster = new THREE.Raycaster();
var projector, mouse = new THREE.Vector2(), mousePoint = new THREE.Vector2(),
INTERSECTED;
var ballSprite;

init();
animate();

// FUNCTIONS 		
function init() 
{
	// SCENE
	scene = new THREE.Scene();
	// CAMERA
	var SCREEN_WIDTH = window.innerWidth, SCREEN_HEIGHT = window.innerHeight;
	var VIEW_ANGLE = 45, ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT, NEAR = 0.1, FAR = 20000;
	camera = new THREE.PerspectiveCamera( VIEW_ANGLE, ASPECT, NEAR, FAR);
	scene.add(camera);
	camera.position.set(0,150,400);
	camera.lookAt(scene.position);	
	// RENDERER
//	if ( Detector.webgl )
		renderer = new THREE.WebGLRenderer( {antialias:true} );
//	else
//		renderer = new THREE.CanvasRenderer(); 
	renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
	container = document.getElementById( 'container' );
	container.appendChild( renderer.domElement );
	// EVENTS
	THREEx.WindowResize(renderer, camera);
	//THREEx.FullScreen.bindKey({ charCode : 'm'.charCodeAt(0) });
	// LIGHT
	var light = new THREE.PointLight(0xffffff);
	light.position.set(0,250,0);
	scene.add(light);
	// FLOOR
	var floorTexture = new THREE.ImageUtils.loadTexture( 'images/checkerboard.jpg' );
	floorTexture.wrapS = floorTexture.wrapT = THREE.RepeatWrapping; 
	floorTexture.repeat.set( 10, 10 );
	var floorMaterial = new THREE.MeshBasicMaterial( { map: floorTexture, side: THREE.DoubleSide } );
	var floorGeometry = new THREE.PlaneGeometry(1000, 1000, 10, 10);
	var floor = new THREE.Mesh(floorGeometry, floorMaterial);
	floor.position.y = -0.5;
	floor.rotation.x = Math.PI / 2;
	scene.add(floor);
	// SKYBOX/FOG
	var skyBoxGeometry = new THREE.CubeGeometry( 10000, 10000, 10000 );
	var skyBoxMaterial = new THREE.MeshBasicMaterial( { color: 0x9999ff, side: THREE.BackSide } );
	var skyBox = new THREE.Mesh( skyBoxGeometry, skyBoxMaterial );
    skyBox.flipSided = true; // render faces from inside of the cube, instead of from outside (default).
	scene.add(skyBox);
	
	////////////
	// CUSTOM //
	////////////
	var cubeGeometry = new THREE.CubeGeometry( 50, 50, 50 );
	var cubeMaterial = new THREE.MeshBasicMaterial( { color: 0x000088 } );
	cube = new THREE.Mesh( cubeGeometry, cubeMaterial );
	cube.position.set(0,26,0);
	scene.add(cube);
	
	// initialize object to perform world/screen calculations
	
	
	// when the mouse moves, call the given function
	document.addEventListener( 'mousedown', onDocumentMouseDown, false);
	document.addEventListener( 'mousemove', onDocumentMouseMove, false );
	
	var ballTexture = THREE.ImageUtils.loadTexture( '/p5/mi/images/redball.png' );
	console.log(ballTexture);
	// suggested- alignment: THREE.SpriteAlignment.center  for targeting-style icon
	//			  alignment: THREE.SpriteAlignment.topLeft for cursor-pointer style icon
	var ballMaterial = new THREE.SpriteMaterial( { map: ballTexture } );
	ballSprite = new THREE.Sprite( ballMaterial );
	ballSprite.scale.set( 32, 32, 1.0 );
	ballSprite.position.set( 50, 50, 0 );
	scene.add( ballSprite );

	plane = new THREE.Mesh(
        new THREE.PlaneBufferGeometry( 2000, 2000, 8, 8 ),
        new THREE.MeshBasicMaterial( { visible: false } )
    );
    scene.add( plane );	
}

function onDocumentMouseDown( event ) {
	offset.copy( ballSprite.point ).sub( plane.position )
}

function onDocumentMouseMove( event ) 
{
	raycaster.setFromCamera( mouse, camera );

	mousePoint.x =  (( event.clientX / window.innerWidth ) * 2 - 1 ) * window.innerWidth;
    mousePoint.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

    var intersects = raycaster.intersectObject( plane );

    ballSprite.position.copy( intersects[0].point.sub( offset ) );
	// the following line would stop any other event handler from firing
	// (such as the mouse's TrackballControls)
	// event.preventDefault();

	// update sprite position
	//ballSprite.position.set( mousePoint.x, event.clientY, 0 );

	console.log(mousePoint.x + " . " + ballSprite.position.x + " . " + ballSprite.position.y + " . " + " yo ");
}

function animate() 
{
    requestAnimationFrame( animate );
	render();		
	//update();
}

function update()
{
	// if ( keyboard.pressed("z") ) 
	// { 
	// 	// do something
	// }
	
	// controls.update();
	// stats.update();
}

function render() 
{
	renderer.render( scene, camera );
}






var started = false;
// document.addEventListener("click", function(){
// 	console.log("hello");
// 	Disappear();
    
// });

var WIDTH =  window.innerWidth,
    HEIGHT =  window.innerHeight;

var start = false;

var plane, cleanScale, audioRotationVar = 0.1;
// set some camera attributes
var VIEW_ANGLE = 45,
    ASPECT = WIDTH / HEIGHT,
    NEAR = 0.1,
    FAR = 10000;

var targetRotation = 0;
var targetRotationOnMouseDown = 0;

var mouseX = 0;
var mouseXOnMouseDown = 0;

var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;
  

// get the DOM element to attach to
// - assume we've got jQuery to hand
var $container = $('#container');
var objects = [], transObjects = [];
var colors = [ [0x50b0cf, 0xffd55d, 0xff655d], [ 0x5E76D6, 0xFFED5D, 0xFFA65D ], [ 0x775FD8, 0xFFC15D, 0xF8FE5C ], [ 0xA355D5, 0xbcf659, 0xFFDC5D ], 
				[ 0XE754A4, 0x50DD80, 0xFFFB5D ] ];
// opaquefloor determines amount of opacity volume sensitivity
var opaqueFloor = 0;
var theta;

// create a WebGL renderer, camera
// and a scene
var renderer = new THREE.WebGLRenderer( { alpha: true });
renderer.setClearColor( 0x000000, 0 );

var camera = new THREE.PerspectiveCamera(  VIEW_ANGLE,
                                ASPECT,
                                NEAR,
                                FAR  );

//camera.lookAt(new THREE.Vector3(0, 0, 0));
camera.position.x = 0;
camera.position.y = 0;
camera.position.z = 50;
var scene = new THREE.Scene();
var rain = true;
var night = true;
var cloudy = false;
var theta = 0;
var renderPass = new THREE.RenderPass(scene, camera);
var composer = new THREE.EffectComposer(renderer);
var windowResize = THREEx.WindowResize(renderer, camera);

composer.addPass(renderPass);

// start the renderer
renderer.setSize(WIDTH, HEIGHT);

var bloomPass = new THREE.BloomPass(5, 48, 24, 50);
composer.addPass(bloomPass);
bloomPass.clear = true;



// hblur = new THREE.ShaderPass(THREE.HorizontalTiltShiftShader);
var effectFilm = new THREE.FilmPass(1, .05, 128, false);
effectFilm.renderToScreen = true;
composer.addPass(effectFilm);



// attach the render-supplied DOM element
$container.append(renderer.domElement);


// set up the sphere vars
var radius = 50, segments = 5, rings = 16;

var col = new THREE.Color(0xFF0000);

//Create plane
var mesh = new THREE.SphereGeometry(50,5,12);
var direction;
var bgCol = new THREE.Color(0xffffff);
var vat = new THREE.MeshPhongMaterial({color: bgCol, shininess: 3, transparent:true, shading: THREE.FlatShading});
vat.blending = THREE.AdditiveBlending;
plane = new THREE.Mesh(mesh, vat);
plane.material.opacity = 0;
plane.position.z = - 500;
plane.position.x = -50;
plane.position.y = 0;
plane.scale.x = 5;
plane.scale.y = 5;
plane.scale.z = 5;
scene.add(plane);


//transObjects.push(plane);

var light = new THREE.DirectionalLight( colors[0][1]);
light.distance = 3000;
light.intensity = 0;
light.position.y = 0;
light.position.z = 1200;
light.position.x = -2000;

var light2 = new THREE.DirectionalLight(colors[0][2]);
light.distance = 3000;
light2.intensity = 0;
light2.position.y = 0;
light2.position.z = 1200;
light2.position.x = 2000;


var ambientLight = new THREE.PointLight(colors[0][0]);
ambientLight.intensity = 0;

scene.add(light);
scene.add(light2);
camera.add(ambientLight);
scene.add(ambientLight);

//////////////// MUSIC

var looping;
var ranNotes = [12,11,9,7,5,4,2,0,-1], f,
beets = [, , , 1, 1/1.5, 1/2, 1/2, 1/2,1/2,1/3, 1/6, 1/4, 1/6, 1/4,1/3, 1/3,1/6], beepEM = 60,
bR, nR, bR2, nR2, repeatCount = 1, stopper, syns = [], triggerNewMelody = false, busses = [],
effectsTypes = [], effectsProperties = [], follow0, follow1, follow2, followMain;

function init () {
	document.addEventListener( 'mousedown', onDocumentMouseDown, false );
	document.addEventListener( 'touchstart', onDocumentTouchStart, false );
	document.addEventListener( 'touchmove', onDocumentTouchMove, false );
}
init();

var leadSynthPresets = ['bleepEcho', 'bleep', 'rhodesFade', 'rhodes', 'warble', 'triLead' ];

function setup () {
	effectsTypes = [ [LPF, 'rising']  , [Delay, 'endless', 'wobbler', 'nightChill'],
		[Schizo, 'sane', 'borderline', 'pitchless'], [Vibrato, 'light'], [Distortion, 'rip']];
	effectsProperties = [ ['LPF', ['cutoff',0,1], ['resonance', 0,5] ]  , ['Delay', ['time',0,1], ['feedback', .4,.95]],
		['Schizo', ['chance', 0,1], ['reverseChance',0,1], ['mix',0, 1],
    	['length', 1/4,1/3,1/8,1/16,1/2]], ['Vibrato', ['rate',.01,5], ['offset',25,1250 ], ['amount', 25,100]], ['Distortion', ['amount', 5, 10]] ];
	bR = WholeBeetsReturn(.5, floor(random(1,12))),
			nR = NotesReturn(bR.length), bR2 = WholeBeetsReturn(.5, floor(random(1,16))),
			nR2 = NotesReturn(bR2.length);
	canvas = createCanvas( windowWidth, windowHeight );
	Gibber.Clock.bpm(beepEM)
	songBus = Bus().fx.add( 
		Delay({time:1/3, feedback:.95, dry:.5, wet:.5}),StereoVerb({roomsize:.99,dry:1, damping:.05, wet:0}),Distortion(2),
		Delay('endless'),LPF({cutoff:.2, amp:1, resonance:4}), Crush({ sampleRate: 1, bitDepth:16 })  );
	syn0Bus = Bus().fx.add( Distortion(5), Delay('endless') );
	syn1Bus = Bus().fx.add ( Distortion(5), Delay('endless') );
	syn0Bus.pan(.35);
	syn0Bus.amp(1);
	syn1Bus.pan(-.35);
	syn1Bus.amp(1);
	
	//drum = XOX('x       *               *       x       *               *     -*', 1/32);
	// sine = Sine(.05, 2);
	// sine._;
	// drum.fx.add(Delay({time:1/16, feedback:.65, wet:.4}), HPF({cutoff:sine}))
	// drum.connect(songBus)
	//drum._;
	m = Synth('rhodes')
	//m.fx.add();
	m2 = Synth('rhodes')
	m3 = Synth('rhodes')
	// kick = Kick().note.seq( 55,1/4 )
	m2.fx.add();
	m.pan(.25);
	m2.pan(-.25);
	//m1 = Synth('bleep')
	
	m.connect(syn0Bus)
	m2.connect(syn1Bus)
	m3.send(songBus, .65);
	syn0Bus.connect(songBus);
	syn1Bus.connect(songBus);
	busses.push(syn0Bus);
	busses.push(syn1Bus);
	//busses.push(m2);
   // f = Follow();
	syns.push(m);
	syns.push(m2);
	follow2 = Follow(songBus);
	follow1 = Follow(syn1Bus);
	follow0 = Follow(syn0Bus);
	followMain = Follow(Gibber.Master);
	

	//createOriginalObjects();
	//syns.push(m1);

}
var scaler;

var SphereCreate = function (mX, mY) {

	//var i5 = (i*225) - 350;
	//console.log(parent);
	var tweenDir;
	//color of object that called it
		//partially transparent?
	var col = plane.material.color.getHex();
	//console.log("col" + col);
	var sph = plane.clone();
	
	//position of object that called it
	sph.scale.y = plane.scale.y;
	sph.scale.x = plane.scale.x;
	sph.position.z = floor(random(-8000,-10000));
	sph.position.x = floor(random(-4000,4000));
	sph.rotation.z = random(1);

	// sph.scale.x = parent.scale.x;
	//sph.scale.y = window.innerHeight;
	scene.add(sph);
	//transObjects.push(sph);
	//console.log(sph.position.x + sph + "sphere");
	//var p = 12;
	
	// TweenMax.to(sph.material, 2, { opacity:.25,
	// 	ease:  SteppedEase.config(24)} );
	// TweenMax.to(sph.position, 6, {x:-1500 + (Math.random() * 3000),
	// 	ease: SteppedEase.config(72),
	// 	 } );
	//TweenMax.to(sph.material, 3, { opacity:0 , onComplete:KillSphere, onCompleteParams:[sph]} )
	 TweenMax.to(sph.scale, 6, { x: sph.scale.x * 25, y: sph.scale.y * 25,
	 	ease: SteppedEase.config(36), onComplete:KillSphere, onCompleteParams:[sph]});


	
	
	// TweenMax.to(sph.rotation, .5, {x: -300 + Math.random() * 1000, y:p++,
 //  	ease: SteppedEase.config(5),
 //  	yoyo:false, } );

	

}

function KillSphere(s) {
	var spher = s;
	scene.remove(s);
	//remove sphere from scene
	// TweenMax.to(spher.material, 1, { opacity:0,
	// 	ease:  SteppedEase.config(12), onComplete:AlsoKillSPhere , onCompleteParams:[spher]} );
	
	//transObjects.remove(s);
}


function inverse(number) {
    return (10 - (Math.round(number/100)));
}



function add(a, b) {
	return a + b;
}

function MoveLights (l) {
	// make lights move in relation to each other, light moves one number, light2 moves its additive inverse
	//i think the math works so y should never be larger than x but I have check both just in case
	var lxPosition = light.position.x;
	var lyPosition = light2.position.y;
	var xAxisAmount, yAxisAmount, X2AxisAmount, y2AxisAmount, amount, amount2;
	
	if (lxPosition >= 10000 || lyPosition >= 10000) { 
		console.log ("grater than");
		amount = Math.random() * -10000 ;
		amount2 = amount + 10000;
		

	}
	else if (lxPosition <= -10000 || lyPosition <= -10000 ) {
		console.log("less than");
		amount = Math.random() * -10000 ;
		amount2 = amount + 10000;

	}
	else {
		var destination = random(-12000, 12000);
		console.log(destination);
		amount = Math.random() * destination;
		amount2 = (-1 * amount);
	}
		xAxisAmount = amount;
		yAxisAmount = amount * .85;
		x2AxisAmount = amount2;
		y2AxisAmount = amount2 * .85;
	// l.position.axis <= -10000)  {
	//  add numbers to negative, subtract numbers from positive
// } 
	//l is light.position to move
	TweenMax.to(light.position, 10, { x: xAxisAmount, y: yAxisAmount,
			 ease: RoughEase.ease.config({template:Quad.easeIn}) } );
	TweenMax.to(light2.position, 10, { x: x2AxisAmount, y: y2AxisAmount,
			 ease: RoughEase.ease.config({template:Quad.easeIn}) } );
}

function ChangeColors () {
	var tick = floor(random(colors.length));
	light.color.setHex (colors[tick][1] );
	light2.color.setHex ( colors[tick][2] );
	ambientLight.color.setHex ( colors[tick][0] );
}

function ChangeEffects (place) {

	var clear = false, coin = CoinReturn(), theBus = busses[place], anotherCoin = CoinReturn(),
	boop =	floor(random(theBus.fx.length));
	//	if (anotherCoin == 1) {
	var effector = theBus.fx[boop];
	if (effector){
		var index, n = effector.name, fxPL=effectsProperties.length;
		//get the place of the effector.name in the presets/properties array
		for (var i = 0; i < fxPL; i++) {
			// 
			if (effectsProperties[i][0] == n) {
		    	index = i;
		    	break;
		  	}	
		}
		// get random number length of the effects properties of this particular effect
		var g = floor(random(1,effectsProperties[index].length)),
		// it is the property to change
		low = effectsProperties[index][g][1], high = effectsProperties[index][g][2];
		it = effectsProperties[index][g][0];
		// if this only has two entries (min, max ((plus its name at [0]))
		if (effectsProperties[index][g].length <= 3){
			q = random(low, high) ;
		}
		//if it has more than two, it's probably specific/time based so choose a specific entry
		else if (effectsProperties[index][g].length >= 4) {
			q = effectsProperties[index][g][4];
		//	q = random(effectsProperties[index][g][1],effectsProperties[index][g][2]) ;

		}
		console.log(effector + " . " + it + " it")
		effector.it =q;
		//fols[place] = Follow(busses[place]);
	}
	else if (!effector) {
		console.log ("no effector     " + boop)
	}
}

function NewScore() {
	var count = 0;
	var killSeq = false;
	var oldSyns = [];
	var llll, lll;
	var aSeq, aSeq1;
	console.log(" new score");
	synsLength = syns.length;
	a = Seq( function() { 
		
		// array of objects to change, objects to stop and objcts to leave alone?
		//Updater();

		if (count == 0) {
			MoveLights();
			ChangeColors();	
			syn0Bus.amp(1);
			syn1Bus.amp(1);
			//songBus.pan(1);
			//llll = new Line(0, .75, 3);
			//TweenMax.to(songBus.amp, 6,{ value:1} );
			

			songBus.fx[2].time = beets[floor(random(3, beets.length))];
			songBus.fx[3].time = beets[floor(random(3, beets.length))];
			for (var i = 0; i < synsLength; i++) {
				var tick = i;
				
				//console.log(o);
				
				bR = WholeBeetsReturn(2, 3);
	 			nR = melodyReturn( floor(random(-2,2)), bR.length,   bR.length);
	 			
				syns[i].note.seq(nR, bR);
				syns[i].note.seq.repeat( 1 )
				syns[i].note.values.filters.push( function( args, pattern ) {
				 //  	
				    return args
				})
 			}
		}
		// else if (count == 3) {
		// 	lll = new Line (.75, 0, 1);
		// 	for (i = 0; i < synsLength; i++) {
		// 		console.log ("stopper" + syns[i])
		// 		//syns[i].amp(0);
		// 		syns[i].seq.stop();
				
				
		// 		//syns[i].fx[i].amp(lll);
		// 		//syns[i].amp(lll);
		// 		//oldSyns.push(syns[i]);
		// 	}
			
		// 	//llll.kill();
		// }
		else if (count == 4) {
			console.log("4" + " . " + synsLength)
			for (i = 0; i < synsLength; i++) {

				syns[i].kill();	
			}
			//lll.kill();
			syns.length = 0;
		}
		else if (count == 5) {
			var s = leadSynthPresets[floor(random(leadSynthPresets.length))];
			
			//oldSyns.length = 0;
			syn0Bus.amp(0);
			syn1Bus.amp(0);
			for (i = 0; i < synsLength; i++) {
				ChangeEffects(i);
				
				var syn = Synth(s);
				//syn.amp = .25;
				syn.attack = 1/4;
				syns.push(syn); 
				if (i == 0) {

					//syn.pan(.25);
					//console.log("follow 0");
					syn.connect(syn0Bus);
					console.log(" 0 " + syn.pan) 
				}
				else if (i == 1) {
					//syn.pan (-.25);
					console.log("follow 1");
					syn.connect(syn1Bus);
				}
				//syn.send(songBus, .85)
				console.log(s + i);
			}
			a.stop();
			//StopScore();
		}

		
	count++  }, repeatCount ) // every one measures
}



function CoinReturn() {
	var coin = Math.round(Math.random()*2);
	return coin;
}

function StartScore() { 
	looping = setInterval(NewScore, 60000);
}

function StopScore () {
	console.log("WebCamTexture.Stop()");
	clearInterval(looping);
}
 
//setInterval(NewScore, 30000)

function WholeBeetsReturn(mul, len) {
	//multiplier is to double, quadruple etc beat lengths
	//len(gth) is how many beets you want returned
	var scoreBeets = [], sum;
	
  	for (var i = 0; i < len; i ++){
  		//grab some beets
  		scoreBeets.push(beets[floor(random(beets.length))] * mul);	
  	}
	//add contents of beets array
  	sum = scoreBeets.reduce(add, 0);
  	//if the sum is an odd number
  	if (sum %2 != 0) {
  	//sumRound is difference between sum and a whole set of measures
  		var sumRound;
  	// if sum will not round to 1, is short phrase
  		if (sum < .5){
  			sumRound = .5 - sum;
  			scoreBeets.push(sumRound);
  		}
  		else {
  	// if odd and >= 1,
  	//don't just round but ceiling the amount up by by one for simplicity 
  	//(no more negatives to deal with)
			sumRound = Math.ceil(sum) - sum; 
  			if (Math.abs(sum + sumRound) % 2 == 1 && (sum + sumRound) >= 3) {
  				//if this new, larger sumround plus sum 
  				//will add up to an odd number like 3, 5, etc add one more to it
  				sumRound = sumRound + 1;
 				}
  	//add the time to the array to make it a full even measure count
  			scoreBeets.push(sumRound);
  		}
  	//	return scoreBeets;
  	}
  	return scoreBeets;
};

function WholeBeetsReturnn(mul) {

	var scoreBeets = [], sum;

	for (var i = 0; i < 36; i++) {
		scoreBeets.push(beets[floor(random(3, beets.length))] * mul);

		sum = scoreBeets.reduce(add, 0 );
		console.log(sum);
		if (sum >= 2.5) { 


		 break;  
		} ;
	}

	return scoreBeets;
}

function NotesReturn (len){
	var notes = [];
	for (var i = 0; i < len; i++){
		notes.push(ranNotes[floor(random(ranNotes.length))])
	}
	return notes;
};

var melodyReturn = function (oct, lowRange, highRange) {
  		var scoreNotes = [], lastNumber;
    	for (var i = 0; i < floor(random(lowRange,highRange)); i++) {
    		lastPos = 0;
    		var coin = Math.round(Math.random()*2);
    		if (coin == 1) {
    			var uOrD = [-1,0,1];
    			if (ranNotes[lastPos + uOrD]){
    				scoreNotes[i] = ranNotes[lastPos + uOrD];
    				//console.log(scoreNotes[i])
    			}
    			else {
    				scoreNotes[i] = ranNotes[floor(random(ranNotes.length))] + oct;
    			}
    			lastPos = i;
    		}
    		else {
      			scoreNotes[i] = ranNotes[floor(random(0,ranNotes.length))] + oct;
      			lastPos = i;
      		}
    	}

    	return scoreNotes;
    	    	//console.log(scoreNotes);
    // public
};

var rewriteMelodyReturn = function (p) {
  		
	var inNotes = [], coin = Math.round(Math.random()*2),
	y = floor(p.length/2) ;
	//console.log (p.length + " nR length " + (y * coin) + " y + coin ");
	inNotes = p.slice(0);
	for (i = (y * coin); i <(y*coin)+y; i++){
			inNotes[i] = ranNotes[floor(random(ranNotes.length))];
			//console.log (inNotes[i] + "in score for" + i);
		}
	return inNotes;
				  						
};

// function transparencyUpdate (objects, camera){
// 	// update camera matrices
// 	camera.updateMatrixWorld()
// 	camera.matrixWorldInverse.getInverse( camera.matrixWorld )

// 	var screenMatrix= new THREE.Matrix4().multiplyMatrices(camera.projectionMatrix, camera.matrixWorldInverse)
// 	var position	= new THREE.Vector3()
	
// 	// traverse the object
// 	objects.forEach(function(object){
// 		// update the matrixWorld of the object and its children
// 		object.updateMatrixWorld()
// 		// compute its position in screen space 
// 		position.setFromMatrixPosition( object.matrixWorld );
// 		position.applyProjection( screenMatrix );
// 		// use the position.x as renderDepth
// 		object.renderDepth	= position.z;
// 	})
// }

// draw!

var clock = new THREE.Clock()

function animate () {
	if (start) {
		plane.material.opacity = followMain.getValue() + .1;
	  	light.intensity = follow0.getValue() * 10 ;
	  	light2.intensity = follow1.getValue() * 10;
	  	ambientLight.intensity = ( follow2.getValue() * .8 ) + .25;
	  	theta += .00125 ;
	  	//console.log(light.position.x + " . " + light.position.y + " . " + light2.position.x + " . " + light2.position.y + " . " );
	  	//plane.rotation.z = theta;
	  	plane.rotation.y = theta ;
	  	plane.rotation.x = theta * .5;
	  	plane.rotation.z = theta + ( followMain.getValue() * .15 );
	  	
	  	//switch statement?
	  	scaler = ( plane.scale.x += ( targetRotation * .45 ) - plane.scale.x ) < 10 ? plane.scale.x :10;
	  	
	  	if ( scaler < -10 ) {
	  		scaler = -10;
	  	}
	  	
	  	plane.scale.x = scaler;
	  	//plane.scale.y = scaler * .5 + 10;
	  	
	  	cleanScale = (scaler * 5 ) < 50 ? ( scaler * 5 ) : 50;
		

		//cleanscale flips to preven negatives
		if (cleanScale < 0 ) {
	  	 	cleanScale = (-1 * cleanScale);
	  	}
	  	
	  	
	  	
	  	m3.fx[0].gain = cleanScale * .5;
	  	songBus.fx[3].feedback = (cleanScale * .0195) < .98 ? (cleanScale * .0195) : .98;
	  	
	  	songBus.fx[1].dry = 1 - (cleanScale * .02);
	  	songBus.fx[1].wet = 0 + (cleanScale * .02);
	  	//songBus.fx[4].sampleRate = 1 - (cleanScale  * .02);
	  
	  	songBus.fx[4].sampleRate = (cleanScale * .035);
	  	songBus.fx[4].bitDepth = 16 - (cleanScale * .32);

	  	//bloomPass.uniforms[ "resolution" ].value = 50 - cleanScale ;
	  	//bloomPass.uniforms[ "kernelSize" ].value = 25 - (cleanScale * .5) ;
	  	//bloomPass.sigma = bloomPass.kernelSize * .2;
	  	//bloomPass.uniforms[ "strength" ].value = cleanScale + 3 ;
	  	//bloomPass.strength = cleanScale + 3;
	  	//effectFilm.uniforms.["scanLinesIntensity"].value = 1 - (cleanScale * .02 );

	  	//console.log(effectFilm.scanLinesIntensity );
	}  
}

function render() {
	//transparencyUpdate(transObjects, camera);

    var delta = clock.getDelta();

    camera.lookAt( new THREE.Vector3(0, 0, 0));
    
    renderer.clear();

    composer.render(.01);
    
    setTimeout( function() {
    	animate();
    	requestAnimationFrame( render );

    }, 3750/60 );
}
render();

function onDocumentMouseDown( event ) {

	if (start == false) {
		start=true;
		Disappear();
	}
	else if (start == true) {
		SphereCreate(mouseX, mouseY);
		m3.note.seq(ranNotes[floor(random(ranNotes.length))], beets[floor(random(beets.length))]);
		m3.note.seq.repeat(1);
		
		event.preventDefault();

		document.addEventListener( 'mousemove', onDocumentMouseMove, false );
		document.addEventListener( 'mouseup', onDocumentMouseUp, false );
		document.addEventListener( 'mouseout', onDocumentMouseOut, false );

		mouseXOnMouseDown = event.clientX - windowHalfX;
		targetRotationOnMouseDown = targetRotation;
	}
	

}

function onDocumentMouseMove( event ) {

	mouseX = event.clientX - windowHalfX;

	targetRotation = targetRotationOnMouseDown + ( mouseX - mouseXOnMouseDown ) * 0.02;

}

function onDocumentMouseUp( event ) {

	document.removeEventListener( 'mousemove', onDocumentMouseMove, false );
	document.removeEventListener( 'mouseup', onDocumentMouseUp, false );
	document.removeEventListener( 'mouseout', onDocumentMouseOut, false );

}

function onDocumentMouseOut( event ) {

	document.removeEventListener( 'mousemove', onDocumentMouseMove, false );
	document.removeEventListener( 'mouseup', onDocumentMouseUp, false );
	document.removeEventListener( 'mouseout', onDocumentMouseOut, false );

}

function onDocumentTouchStart( event ) {

	if ( event.touches.length === 1 ) {

		if (!start) {
			//start=true;
			Disappear();
		}

		else if (start) {
			SphereCreate(mouseX, mouseY);
			m3.note.seq(ranNotes[floor(random(ranNotes.length))], beets[floor(random(beets.length))]);
			m3.note.seq.repeat(1);

			event.preventDefault();

			mouseXOnMouseDown = event.touches[ 0 ].pageX - windowHalfX;
			targetRotationOnMouseDown = targetRotation;
		}

		

	}

}

function onDocumentTouchMove( event ) {

	if ( event.touches.length === 1 ) {

		event.preventDefault();

		mouseX = event.touches[ 0 ].pageX - windowHalfX;
		targetRotation = targetRotationOnMouseDown + ( mouseX - mouseXOnMouseDown ) * 0.05;

	}

}
var score;
function Disappear(){
	
	var nR = melodyReturn( floor(random(-2,2)), 2,   2);
	var nr2 = rewriteMelodyReturn(nR);
	var element = document.getElementById("textContainer2");
	element.parentNode.removeChild(element);
	document.getElementById('wordOne').innerHTML = "O N E";
	document.getElementById('wordOne').className ='classname';
	score = Score([0,
		function(){
			
			
			
			
			m.note.seq(nR[0], 1/3);
			m.note.seq.repeat( 1 )
			
			console.log("hi111");
		}, measures (1),
		function() {
			document.getElementById("wordOne").innerHTML = " ";
			document.getElementById('wordTwo').innerHTML = "M I N U T E";
	    	document.getElementById('wordTwo').className ='classname';
	    	
	    	m2.note.seq((nR2[0]), 1/2);
			m2.note.seq.repeat( 1 );
			console.log("hi222");
		}, measures (1),
		function () {
			document.getElementById("wordTwo").innerHTML = " ";
			document.getElementById('wordThree').innerHTML = "M O R E";
    		document.getElementById('wordThree').className ='classname';
    		
    		m.note.seq(nR[2], 1/3);
			m.note.seq.repeat( 1 )
			m2.note.seq(nR2[1], 1/2);
			m2.note.seq.repeat( 1 );
			m3.note.seq(nR2[2],1/3)
			m3.note.seq.repeat(1)
			console.log("hhii333")
		}, measures(1),
		function () {

			start = true;
			document.getElementById("wordTwo").innerHTML = " ";
			var element = document.getElementById("textContainer");
			element.parentNode.removeChild(element);
			NewScore();
			StartScore();

			score.stop();
		}, measures(1)
		]).start()
	score.seq.repeat(1);
	
	// var nR = melodyReturn( floor(random(-2,2)), 2,   2);
	// var nr2 = rewriteMelodyReturn(nR);
	// document.getElementById('wordOne').className ='classname';
	// m.note.seq(nR[0], 1/3);
	// m.note.seq.repeat( 1 )
	// m2.note.seq(nR2[0], 1/2);
	// m2.note.seq.repeat( 1 );
// set timer to start next action a certain time after the sound starts
	// setTimeout(function() {
	// 	// document.getElementById("wordOne").innerHTML = " ";
 //  //   	document.getElementById('wordTwo').className ='classname';
 //  //   	m.note.seq(nR[1], 1/3);
	// 	// m.note.seq.repeat( 1 )
	// 	// m2.note.seq(nR2[1], 1/2);
	// 	// m2.note.seq.repeat( 1 );
 //    	setTimeout (function() {
 //   //  		document.getElementById("wordTwo").innerHTML = " ";
 //   //  		document.getElementById('wordThree').className ='classname';
 //   //  		m.note.seq(nR[2], 1/3);
	// 		// m.note.seq.repeat( 1 )
	// 		// m2.note.seq(nR2[2], 1/2);
	// 		// m2.note.seq.repeat( 1 );
 //    		setTimeout (function () {
    			
    			
	// 			// start = true;
	// 			// var element = document.getElementById("textContainer");
	// 			// element.parentNode.removeChild(element);
	// 			// setTimeout (function () {
 //    // 				NewScore();
	// 			// 	StartScore();
 //    			}, 30000);
 //    			//load the new gibbber content
 //    			//destroy the whole div textcontainer
    			
 //    		}, 3000);
        	
 //    	}, 3000);   // set this time for how long you want to wait after bigger, before hide
	// }, 3000);   // set the time here for how long you want to wait after starting the sound before making it bigger
}

// function setMute () { 
// 	if (isMute) {
// 		TweenMax.to (Gibber.Master, .25 {amp:0, ease:Power1.easeOut });
// 		stopSequence();
// 	}
// 	else {
// 		TweenMax.to (Gibber.Master, .25 { amp:0, ease:Power1.easeOut  });

// 	}	

// }
//  sketch.setMute = (function(_this) {
//     return function(isMute) {
//       if (isMute) {
//         TweenLite.to(_this.gibber.Master, .3, {
//           amp: 0
//         });
//         sketch.noLoop();
//         return sketch.mute = true;
//       } else {
//         TweenLite.to(_this.gibber.Master, .3, {
//           amp: 1
//         });
//         sketch.loop();
//         return sketch.mute = false;
//       }
//     };
//   })(this);
//   return sketch.isMobile = (function(_this) {
//     return function() {
//       if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
//         console.log('is mobile');
//         return true;
//       }
//       return false;
//     };
//   })(this);
// };
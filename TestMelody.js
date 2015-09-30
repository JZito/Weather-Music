var WIDTH =  window.innerWidth,
    HEIGHT =  window.innerHeight;

// set some camera attributes
var VIEW_ANGLE = 45,
    ASPECT = WIDTH / HEIGHT,
    NEAR = 0.1,
    FAR = 10000;

  

// get the DOM element to attach to
// - assume we've got jQuery to hand
var $container = $('#container');
var objects = [], transObjects = [];
// opaquefloor determines amount of opacity volume sensitivity
var opaqueFloor = 0;

// create a WebGL renderer, camera
// and a scene
var renderer = new THREE.WebGLRenderer();

var camera = new THREE.PerspectiveCamera(  VIEW_ANGLE,
                                ASPECT,
                                NEAR,
                                FAR  );

camera.lookAt(new THREE.Vector3(0, 0, 0));
var scene = new THREE.Scene();
var rain = true;
var night = true;
var cloudy = false;
var theta = 0;
var renderPass = new THREE.RenderPass(scene, camera);
var composer = new THREE.EffectComposer(renderer);

// create a point light
//var spotLight = new THREE.PointLight( 0xFFFFFF );
// var pointLight = new THREE.PointLight( 0x99FFFF);
// pointLight.intensity = .15;
// //var ambientLight = new THREE.AmbientLight( 0x00bfff);
// camera.add(spotLight);


// set its position
// spotLight.position.x = 10;
// spotLight.position.y = 60;
// spotLight.position.z = 500;
//pointLight.position.z = 3;

// add to the scene
// scene.add(pointLight);
// scene.add(spotLight);
//scene.add(ambientLight);
composer.addPass(renderPass);
// the camera starts at 0,0,0 so pull it back
camera.position.z = 0;
camera.position.x = 0;
camera.position.y = 0;


// start the renderer
renderer.setSize(WIDTH, HEIGHT);

//1. BloomPass: blurry, glowing effect
var bloomPass = new THREE.BloomPass(5, 25, 10, 130);
composer.addPass(bloomPass);
bloomPass.clear = true;

// var mirrorPass = new THREE.ShaderPass( THREE.MirrorShader );
// composer.addPass(mirrorPass);
// mirrorPass.uniforms.side.value = 1;

// 2. EffectFilm, which output the result in an old style TV screen fashion (with thin colourful stripes):
var effectFilm = new THREE.FilmPass(0.8, 0.325, 256, false);
effectFilm.renderToScreen = true;
composer.addPass(effectFilm);



// attach the render-supplied DOM element
$container.append(renderer.domElement);

var bgCol = new THREE.Color(0xff8f75);
var vat = new THREE.MeshLambertMaterial({color: bgCol});
var geometry = new THREE.PlaneBufferGeometry(1800*2, 1600 * 2,1,1);
var bgPlane = new THREE.Mesh(geometry, vat);
bgPlane.position.z = - 100;
bgPlane.material.transparent	= true;
		bgPlane.material.opacity = 0;
scene.add(bgPlane);

// set up the sphere vars
var radius = 50, segments = 16, rings = 16;

//try a background mesh
//var boxBack = new Three.Mesh( new THREE.Plane)

// create a new mesh with sphere geometry -
// we will cover the sphereMaterial next!
var col = new THREE.Color(0xFF0000);

// function createOriginalObjects () {
// 	for (i = 0; i < 2; i++) {
// 		var i5 = (i*525) - 750;
// 		var mesh = new THREE.SphereGeometry(50,5,20);
// 		var mat = new THREE.MeshPhongMaterial( {color:col});
// 		var sphere = new THREE.Mesh( mesh, mat );
// 		sphere.position.x = i * 299;
// 		sphere.scale.y = i5;
// 		sphere.position.z = 800;
// 		sphere.material.color.setHSL(.14,i,.5);
// 		sphere.material.transparent	= true;
// 		sphere.material.opacity = 0;
// 		sphere.material.depthWrite	= false;
// 		//sphere.mesh.geometry.dynamic = true;
// 		objects.push(sphere);
// 		scene.add(sphere);
// 		transObjects.push(sphere);
// 		//sphere.material.color.b = (i*.05);
// 	}
	
	
// }

//Define camera

//Plane material
var uniforms = {
    resolution: { type: "v2", value: new THREE.Vector2(window.innerWidth,window.innerHeight) }
};

var planeMaterial = new THREE.ShaderMaterial( { 
    uniforms: uniforms,
    vertexShader: document.getElementById('vertexShader').textContent,
    fragmentShader: document.getElementById('fragmentShader').textContent
} );

//Create plane
var geometry = new THREE.PlaneGeometry(2800*2, 2600,1,1);
var bgCol = new THREE.Color(0xfe8f22);
var vat = new THREE.MeshLambertMaterial({color: bgCol});
var plane = new THREE.Mesh(geometry, planeMaterial);
plane.position.z = - 2000;
scene.add(plane);

var light = new THREE.SpotLight(0xfefe22);
light.intensity = 2;
light.position.y = 0;
light.position.z = 1500;

TweenMax.to(light, 5, { intensity: Math.random(),  ease: RoughEase.ease.config({template:Quad.easeIn}), onComplete:LightMove } );
function LightMove () {
	TweenMax.to(light, 5, { intensity: Math.random() * 3 , 
  	 ease: RoughEase.ease.config({template:Quad.easeIn}),
  	repeat:-1, onComplete:LightMove})
}
// TweenMax.to(camera.position, 5, {y: -800 + Math.random() * 800, x: -800 + Math.random() * 800, ease: SteppedEase.config(6), onComplete:CameraMove});
// function CameraMove () {
// 	TweenMax.to(camera.position, 5, { x: -800 + Math.random() * 800, y:  -800 + Math.random() * 800,
//   	ease: SteppedEase.config(24),
//   	repeat:-1, yoyo:true, onComplete:CameraMove})
// }
scene.add(light);

var SphereCreate = function (parent) {

	
	//var i5 = (i*225) - 350;
	//console.log(parent);
	var tweenDir;
	//color of object that called it
		//partially transparent?
	//	console.log(parent);
	var col = parent.material.color.getHex();
	//console.log("col" + col);
	var sph = parent.clone();
	sph.material.opacity = 0;
	//position of object that called it
	sph.scale.y = parent.scale.y;
	sph.scale.x = parent.scale.x;
	sph.position.x = parent.position.x;
	sph.rotation.z = parent.rotation.z;

	sph.scale.x = parent.scale.x;
	//sph.scale.y = window.innerHeight;
	if (rain) {
		tweenDir = parent.position.z + Math.random() * 2000 - 1000;
	}
	else if (!rain) {
		tweenDir = -800 + Math.random() * 800;
	}

	scene.add(sph);
	transObjects.push(sph);
	//console.log(sph.position.x + sph + "sphere");
	//var p = 12;
	if (cloudy) {
		TweenMax.to(sph.material, .1, {opacity:.1,
  		ease:  SteppedEase.config(6)} );
  		TweenMax.to(sph.position, 2, {z: -300 + Math.random() * 1000, y:-30 + Math.random() * 100,
  		ease: SteppedEase.config(24),
  		yoyo:false, onComplete:KillSphere, onCompleteParams:[sph] } );
	}if (rain) {
		TweenMax.to(sph.material, (7000/beepEM) * .01 , {opacity:.5,
  		ease:  SteppedEase.config(6)} );
		TweenMax.to(sph.position, (7000/beepEM) * .01, {z: -Math.random() * 3000, y: Math.random() * 500 - 1000,
  		ease: SteppedEase.config(24),
  		yoyo:false, onComplete:KillSphere, onCompleteParams:[sph] } );
	}
	else if (!cloudy && ! rain) {
		TweenMax.to(sph.material, .1, {opacity:.75,
  		ease:  SteppedEase.config(6), yoyo:true} );
		TweenMax.to(sph.position, 2, {z: -300 + Math.random() * 1000, x:-1000 + Math.random() * 1500,
  		ease: SteppedEase.config(24),
  		yoyo:false, onComplete:KillSphere, onCompleteParams:[sph] } );
	}
	
	// TweenMax.to(sph.rotation, .5, {x: -300 + Math.random() * 1000, y:p++,
 //  	ease: SteppedEase.config(5),
 //  	yoyo:false, } );

	

}

var FadeInPad = function (parent, time) {
	var wholeBeat = 60/beepEM;

	TweenMax.to(parent.material, wholeBeat * time, {opacity:.65,
  	ease:RoughEase.ease.config({template:Quad.easeIn}), onComplete:tweenToZero, onCompleteParams: [parent, time] });
  	console.log( "fade in pad" + parent + " " + time)
}

function tweenToZero (parent, time) {
	//console.log(parent)
	var wholeBeat = 60/beepEM;
	TweenMax.to(parent.material, wholeBeat * time, {opacity:0,
  	ease:RoughEase.ease.config({template:Quad.easeIn}) });
  	console.log( "fade in pad" + parent + " " + time)
}

function BloomFade () {
	TweenMax.to(bloomPass, 15, {strength: 1, kernelSize : 25,
		sigma: 4, resolution: 256,

  	ease: SteppedEase.config(240),
  	repeat:-1, yoyo:true, onComplete:BloomFade})
}

function KillSphere(s) {
	//remove sphere from scene, stop 'seek'uence
	scene.remove(s);
	//seek.stop();
}

function FadeOutPad (parent, time) {
	var wholeBeat = 60/beepEM;
	TweenMax.to(parent.material, wholeBeat * time, {opacity:0,
  	ease:  SteppedEase.config(24)} );
}



// sandbox
var ranNotes = [12,11,9,7,5,4,2,0,-1], f,
beets = [, , , 1, 1/1.5, 1/2, 1/2, 1/2,1/2,1/3, 1/6, 1/4, 1/6, 1/4,1/3, 1/3,1/6, 1/4, 1/4, 1/4,1/8, 1/8,1/8], beepEM = 60,
bR, nR, bR2, nR2, repeatCount = 1, stopper, syns = [], triggerNewMelody = false;

var leadSynthPresets = ['bleepEcho', 'bleep', 'rhodesFade', 'rhodes', 'warble', 'squareLead', 'triLead' ];

function setup () {
	bR = WholeBeetsReturn(.5, floor(random(1,12))),
			nR = NotesReturn(bR.length), bR2 = WholeBeetsReturn(.5, floor(random(1,16))),
			nR2 = NotesReturn(bR2.length);
	canvas = createCanvas( windowWidth, windowHeight );
	Clock.bpm(beepEM)
	songBus = Bus().fx.add( HPF({cutoff:.2}),StereoVerb('space'),Schizo('borderline'),Delay({time:1/2, feedback:.95, dry:0, wet:1}),StereoVerb('large'))
	//drum = XOX('x       *               *       x       *               *     -*', 1/32);
	// sine = Sine(.05, 2);
	// sine._;
	// drum.fx.add(Delay({time:1/16, feedback:.65, wet:.4}), HPF({cutoff:sine}))
	// drum.connect(songBus)
	//drum._;
	m = Synth('bleep')
	m.fx.add(Delay('nightChill'));
	m2 = Synth('rhodesFade')
	m2.fx.add(Delay('wobbler'));
	m.pan(.25);
	m2.pan(-.25);
	//m1 = Synth('bleep')
	
	m.send(songBus, 1)
	m2.send(songBus, .85)
	songBus.amp(1);
   // f = Follow();
	syns.push(m);
	syns.push(m2);
	NewScore();
	//createOriginalObjects();
	//syns.push(m1);

}

function draw () {
	//console.log(f);
	//CheckTheTime(minute());
	//console.log(m.frequency)
	var x = mouseX / windowWidth,
        y = mouseY / windowHeight,
        ww2 = windowWidth / 2,
        wh2 = windowHeight / 2 ;
  
  	songBus.fx[1].roomsize = (1 - x);
  	//console.log(songBus.fx[1].roomsize + "room 1")
  	songBus.fx[4].roomsize = ((1 - y) * .5) + .5 ;

  	songBus.fx[3].feedback = x < .99 ? x : .99;
  	console.log(light.position.z);
  	//console.log(songBus.fx[4].roomsize + "room 2");
  	//console.log(songBus.fx[3].feedback + "feedback");
}
function add(a, b) {
	return a + b;
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

			llll = new Line(0, .75, 3);
			
			songBus.amp(llll);
			songBus.fx[2].time = beets[floor(random(3, beets.length))];
			songBus.fx[3].time = beets[floor(random(3, beets.length))];
			for (var i = 0; i < synsLength; i++) {
				var tick = i;
				
				//console.log(o);
				
				bR = WholeBeetsReturnn(1);
	 			nR = melodyReturn( floor(random(-2,2)), bR.length,   bR.length);
	 			
				syns[i].note.seq(nR, bR);				
 			}
		}
		else if (count == 3) {
			lll = new Line (.75, 0, 1);
			for (i = 0; i < synsLength; i++) {
				console.log ("stopper" + syns[i])
				//syns[i].amp(0);
				syns[i].seq.stop();
				
				
				//syns[i].fx[i].amp(lll);
				syns[i].amp(lll);
				//oldSyns.push(syns[i]);
			}
			
			llll.kill();
		}
		else if (count == 4) {
			for (i = 0; i < synsLength; i++) {
				syns[i].kill();	
			}
			lll.kill();
			syns.length = 0;
		}
		else if (count == 5) {
			//oldSyns.length = 0;
			for (i = 0; i < synsLength; i++) {
				var s = leadSynthPresets[floor(random(leadSynthPresets.length))];
				var syn = Synth(s);
				//syn.amp = .25;
				syn.attack = 1/4;
				syns.push(syn); 
				if (i == 0) {
					syn.pan(.25);
				}
				else if (i == 1) {
					syn.pan (-.25);
				}
				syn.send(songBus, .85)
				console.log(s + i);
			}
			a.stop();
		}

		
	count++  }, repeatCount ) // every one measures
}



// function SingleRotationScore() {
// 	a = Seq( function() {

// 		for (i = 0; i < syns.lenth; i++) {
// 			if (triggerNewMelody) {
// 				bR = WholeBeetsReturn(2, floor(random(1,8)));
// 	 			nR = NotesReturn(bR2.length);
// 				syns[i].note.seq.set(nR, bR2);
// 				newSeq = false;
// 			}
// 			else if (!triggerNewMelody) {
// 				syns[i].seq.stop();
// 			}
// 		}
// 	}, 2	)
// }

function CoinReturn() {
	var coin = Math.round(Math.random()*2);
	return coin;
}

function Stopper () {

}
// function Updater () {
// 	stopper = -1;
// 	if (CoinReturn() == 1){
// 		console.log('coinreturned 1');
// 		if (CoinReturn()== 1){
// 			console.log("coin returned 1 again!")
// 			bR = WholeBeetsReturn(.25, floor(random(1,6)));
// 			nR = NotesReturn(bR.length); 
// 		}
// 		else {
// 			console.log("should have stopped")
// 			//a.seq.stop();
// 			stopper = floor(random(2));
// 		}
	
// 	}
// 	else {
// 			bR2 = WholeBeetsReturn(2, floor(random(1,8)));
// 			nR2 = NotesReturn(bR2.length);
// 	}
// 	randomCount = floor(random(1,3));
// 	console.log("random count" + randomCount);
// }

// function CheckTheTime(time) //function check the time
//  {
//     var previousTime; 
//     var min = time;
//     // if time does not equal previous time
//     // trigger new melody
//     //console.log(time);
//   //  else if (time != 1 || time != 15 || time !=  30 || time != 45)
//     if (previousTime != min ) {
//     	console.log("trigger new melody");
//     	//new melody bool is true
//     	triggerNewMelody = true;
//     }
//     previousTime = min;

//     console.log(time + " . " + previousTime);
// };
setInterval(NewScore, 30000)

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

function transparencyUpdate (objects, camera){
	// update camera matrices
	camera.updateMatrixWorld()
	camera.matrixWorldInverse.getInverse( camera.matrixWorld )

	var screenMatrix= new THREE.Matrix4().multiplyMatrices(camera.projectionMatrix, camera.matrixWorldInverse)
	var position	= new THREE.Vector3()
	
	// traverse the object
	objects.forEach(function(object){
		// update the matrixWorld of the object and its children
		object.updateMatrixWorld()
		// compute its position in screen space 
		position.setFromMatrixPosition( object.matrixWorld );
		position.applyProjection( screenMatrix );
		// use the position.x as renderDepth
		object.renderDepth	= position.z;
	})
}
scene.add(camera);



// draw!

renderer.shadowMapEnabled = false;
 var clock = new THREE.Clock()

function render() {

	//var theta;
	//CheckTheTime(minute());
	// noStroke();
 //    fill(bgCol);
 //    rect(0, 0, width, height); 
 	transparencyUpdate(transObjects, camera);
 //    if (go) {
  //    	var p0 = pieces[0], p1 = pieces[1];
  //    	if (cubeGo == 0){
  //    		theta += .01;
  //    		//camera.rotation.z = theta;
  //    		//var hug;
  //    		 // console.log();
  //    		bgPlane.material.opacity = .1 +  (p0.publicBusFol[0].getValue() * .25);
  //    		  //	camera.rotation. = theta / i;
  //   		for (var i = 0; i < p0.publicFols.length; i++){
				
		// 		//var value = p0.publicFols[i].getValue() * mult[i], col = colors[i],
		// 		//        if width greater than height, use wh * value, otherwise use ww2 * value
		// 	  	//objects[i].scale.x = 6 + p0.publicFols[i].getValue() * 10;
		// 	  //	console.log(p0.publicBusFol.getValue());

		// 	  	objects[i].scale.x = 1 + i + p0.publicFols[i].getValue() * 25;
		// 	  	objects[i].scale.y = 1 + i + p0.publicFols[i].getValue() * 100;
		// 	    objects[i].material.opacity = opaqueFloor + p0.publicFols[i].getValue() * 4.5;
		// 	    //objects[i].position.y = 500 - (p0.publicFols[i].getValue() * 3200);
		// 	     //objects[i].rotation.z = (theta * i) * Math.PI/180 ;
		// 	    // if (!cloudy && !rain) {
			     	
		// 	     	// if (i > 1) {
		// 	     	// 	objects[i].scale.z = 1 + p0.publicFols[i].getValue() * 50;
		// 	     	// 	objects[i].rotation.x = theta;
		// 	     	// }
		// 	    	//objects[i].rotation.x = theta * i;
			     
		// 	    // }
		// 	    //objects[i].rotation.z = theta;
		// 	 //    radius = ( ww2 > wh ? wh * value: ww2 * value);
		// 		// CoolSquare(col, value, ww2, wh, radius  );
		// 	}
		// }
	//	else if (cubeGo == 1){
	//		for (var i = 0; i < p1.publicFols.length; i++) {
				// var value = p1.publicFols[i].getValue() * mult[i], col = colors[i],
			 //    radius = ( ww2 > wh ? wh * value: ww2 * value);
			// objects[i].scale.x = .125 + p1.publicFols[i].getValue() * 10;
			 //    console.log(p1.publicFols[i].value + i);
				//CoolSquare(col, value, ww2, wh, radius  );
	//		}
	//	}
//	}
    var delta = clock.getDelta();
    composer.render(delta);
   // requestAnimationFrame(render);
     setTimeout( function() {
    	
    	
//     	//var fr = frameRate.fr;
//     	 //parameter must be set with render
         requestAnimationFrame( render );

    }, 3750/60 );
}
render();



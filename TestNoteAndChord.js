

//TweenMax.to(theObject)
//THREE.JS SECTION
// set the scene size
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
var rain = false;
var night = false;
var cloudy = false;
var theta = 0;
var renderPass = new THREE.RenderPass(scene, camera);
var composer = new THREE.EffectComposer(renderer);

// create a point light
var spotLight = new THREE.PointLight( 0xFFFFFF );
var pointLight = new THREE.PointLight( 0x99FFFF);
var ambientLight = new THREE.AmbientLight( 0x8A458A);
camera.add(spotLight);


// set its position
// spotLight.position.x = 10;
// spotLight.position.y = 60;
// spotLight.position.z = 500;
pointLight.position.z = 3;

// add to the scene
scene.add(pointLight);
scene.add(spotLight);
scene.add(ambientLight);
composer.addPass(renderPass);
// the camera starts at 0,0,0 so pull it back
camera.position.z = 1000;


// start the renderer
renderer.setSize(WIDTH, HEIGHT);

//1. BloomPass: blurry, glowing effect
var bloomPass = new THREE.BloomPass(5, 25, 10, 130);
composer.addPass(bloomPass);
bloomPass.clear = true;

// 2. EffectFilm, which output the result in an old style TV screen fashion (with thin colourful stripes):
var effectFilm = new THREE.FilmPass(0.8, 0.325, 256, false);
effectFilm.renderToScreen = true;
composer.addPass(effectFilm);

// attach the render-supplied DOM element
$container.append(renderer.domElement);

var bgCol = new THREE.Color("rgb(40,20,250)");
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
var col = new THREE.Color(0x39506B);

function createOriginalObjects () {
	for (i = 0; i < 4; i++) {
		var i5 = (i*525) - 750;
		var sphere = new THREE.Mesh(
		   			new THREE.TorusGeometry(radius, segments, rings, 100),
		    		new THREE.MeshLambertMaterial( { color: col } )
		    	);
		//sphere.position.x = i5;
		sphere.material.transparent	= true;
		sphere.material.opacity = 1;
		sphere.material.depthWrite	= false;
		objects.push(sphere);
		scene.add(sphere);
		transObjects.push(sphere);
		sphere.material.color.r = (i*.75);
	}
	
	
}

var windowResize = THREEx.WindowResize(renderer, camera);

function changeVisualsFull () {

	}

function changeVisualsPartial() {

}

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
//position of object calling it should be passed in
var SphereCreate = function (parent, beats) {

	var q = 0;
	aSong = Seq( function() { 
				q++;
				console.log("sequence" + q)
				//SphereCreate(o);
	


	}, beats );
	//var i5 = (i*225) - 350;
	//console.log(parent);
	var tweenDir;
	//color of object that called it
		//partially transparent?
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
		tweenDir = parent.position.x + Math.random() * 1000;
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
		TweenMax.to(sph.position, (7000/beepEM) * .01, {z: Math.random() * 3000, x:-100 + Math.random() * 150,
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

function KillSphere(s, seek ) {
	//remove sphere from scene, stop 'seek'uence
	scene.remove(s);
	seek.stop();
}

function FadeOutPad (parent, time) {
	var wholeBeat = 60/beepEM;
	TweenMax.to(parent.material, wholeBeat * time, {opacity:0,
  	ease:  SteppedEase.config(24)} );
}


function GenericTween () {

}

// function FadeColor(object, hH, sS, vV) {
// 	var hsvCol = object.material.color.getHSV();
// 	var newCol = object.material.color.setHSV();
// 	TweenMax.to(hsvCol, 6, {
// 		h: hH, s: sS, v: vV, ease:  Power2.easeOut,
// 		yoyo: false,  onUpdate: applyValue, onUpdateParams:[newCol]
// 	});
	
// }

function applyValue (tween){

	 console.log(tween.h); 
};

function animateObj(obj, ez) {
  TweenMax.to(obj, 3, {y: -900 + Math.random() * 600, 
  	ease: ez,
  	yoyo:true, onComplete:animateObj, onCompleteParams:[obj]})
}

function visualizeMusic () {

}


// add the sphere to the scene
//scene.add(objects);

// and the camera
scene.add(camera);



// draw!

renderer.shadowMapEnabled = false;
 var clock = new THREE.Clock()



// var frameRate = { fR: 6, };
// console.log(frameRate.fR);
// //TweenMax.to(frameRate, 6, {fr:60, yoyo:true, ease: Power2.easeOut})
// frameRateChange(frameRate);
// function frameRateChange(obj) {
//   TweenMax.to(obj, 30, {fR: 60, 
//   	ease: RoughEase.ease.config({ template: Power0.easeNone, strength: 1, points: 20, taper: "none", randomize: true, clamp: false}),
//   	repeat:-1, yoyo:true, onComplete:frameRateChange, onCompleteParams:[obj]})
// }
// function animate() {

//     setTimeout( function() {
    	
    	
//     	//var fr = frameRate.fr;
//     	 //parameter must be set with render
//         requestAnimationFrame( animate );

//     }, 3750 / beepEM  );
// 	var delta = clock.getDelta();
// 	composer.render(delta);
//     renderer.render(scene, camera);

// }
// animate();
// setInterval( function () {
    
//         render();
    
//     }, 1000 / 60 );

// init ();
// function init (){
// 	container = document.createElement( 'div' );
// 	document.body.appendChild( container );
// 	container.append(renderer.domElement);

// }
// attach the render-supplied DOM element



// MUSIC SECTION

// to do--- fix for loop in score- set it back to individual score for each instrument
// 
var state = 'noChange', tempDivP5, radiuses = [], go = false, col, currentSong, mouseHit = false, bgCol, values = [], 
lerpVar, radius, a = 0, countdown = 140, ticker = 0, cubeGo = 2, str = "74",
vanillaNotes = [7,4,2,0,-11,-9,-7], vanillaMeasures = [1,1,2,2,2,4,4,4,8,8,6,6,8,8,12,12,16], effectsTypes = [], effectsProperties = [],
beets = [1, 1/1.5, , , , 1/2, 1/2, 1/3, 1/3,1/6, 1/4, 1/4, 1/4,1/8, 1/8,1/8,1/16, 1/16, 1/32],
//beets = [1, 1/2, 1/4, 1/8,1/16, 1/32], 
beepEM = 67, rotations = [2,4,6,8, 16], pieces = [], thetas = [-0.2, -0.1, 0.1, 0.2],
measureCount = 0, prevColor1, newColor1, prevColor6, newColor6, mainScore;
// brass-- CLOUDY DAY TIME- brass only acceptable if octave is kept low 0  or lower. 
// 

function mousePressed () {
	mouseHit = true;
}
function setup() {
	effectsTypes = [ [LPF, 'rising']  , [Delay, 'endless', 'wobbler', 'nightChill'],
	[Schizo, 'sane', 'borderline', 'pitchless'], [Vibrato, 'light']];
	effectsProperties = [ ['LPF', ['cutoff',0,1], ['resonance', 0,5] ]  , ['Delay', ['time',0,1], ['feedback', 0,5]],
	['Schizo', ['chance', 0,1], ['reverseChance',0,1], ['mix',0, 1],
    ['length', 1/4,1/3,1/8,1/16,1/2]], ['Vibrato', ['rate',.01,5], ['offset',25,1250 ], ['amount', 25,100]]];
	NewSong(0);
	createOriginalObjects();
	//BloomFade();

};

// XOX DRUMS SECTION



function CheckTheTime(time) //function check the time
 {
    var previousState = state; 
    
    //console.log(time);
    if (time == 17 || time == 30 || time == 32 || time == 32) { 
    
    	state = 'change';

    	//console.log('change');
    }
  //  else if (time != 1 || time != 15 || time !=  30 || time != 45)
	else
    {
    	state = 'noChange';
    }

    if (state != previousState && state == 'change'){
    	//state = 'noChange';
    	console.log('state !=')
    	
    	if (ticker == 0){
    		pieces[0].scoreFadeOut(1);
    		//go = false;
    		ticker = 1;	
    	}
    	else if (ticker == 1){
    		pieces[1].scoreFadeOut(0);
    		//go = false;
    		ticker = 0;	
    	}
    }
};

function MoveAround() {
	for (var i =0; i < objects.length; i++) {
		var mover = floor(random(500)) - floor(random(1000));
		var q = objects[i].position;
		console.log(i + " " + q)
		animateObj(q, SteppedEase.config(36));
		//TweenLite.to(q, 12, {x:mover, ease: SteppedEase.config(36)});
	}
}

function ChangeVisuals () {

}

function NewSong(t) {
	var date = new Date();
	var h = date.getHours();
	var d;
	if (h <= 5 || h >= 19) {
		d = 'night';
	}
	else if (h > 5 && h < 7) {
		d = 'dawn';
	}
	else if (h >= 7 && h < 17) {
		d = 'day';
	}
	else if (h >= 17 && h < 19) {
		d = 'twilight';
	}
	song = new Song('o', t, d);
	song.make();
	pieces[t].groupSynths(3);
	pieces[t].scoreCreate();
	//pieces[t].NewFollow();
	//MoveAround();
};


// function DrawWeather() {
// 	var // weatherID = String(floor(random()));
// 	temperature = floor(random(-12,98));
// 	temperatureC = floor((temperature  -  32)  *  5/9);
// 	print (temperature + 'temp');
// 	tempDivP5.innerHTML = temperature + " / " + temperatureC;
// }
////////// HARMONY /////////////////////

var Harmony = (function () {

  	var notesReturn = function (oct, lowRange, highRange) {
  		var scoreNotes = [];
    	for (var i = 0; i < floor(random(lowRange,highRange)); i++) {
      		scoreNotes[i] = vanillaNotes[floor(random(0,vanillaNotes.length))] + oct;
      	//	console.log(scoreNotes[i] + "basic notes return")
    	}

    	return scoreNotes;
    	    	//console.log(scoreNotes);
    // public
  	};

  	var melodyReturn = function (oct, lowRange, highRange) {
  		var scoreNotes = [], lastNumber;
    	for (var i = 0; i < floor(random(lowRange,highRange)); i++) {
    		lastPos = 0;
    		var coin = Math.round(Math.random()*2);
    		if (coin == 1) {
    			var uOrD = [-1,0,1];
    			if (vanillaNotes[lastPos + uOrD]){
    				scoreNotes[i] = vanillaNotes[lastPos + uOrD];
    				//console.log(scoreNotes[i])
    			}
    			else {
    				scoreNotes[i] = vanillaNotes[floor(random(vanillaNotes.length))] + oct;
    			}
    			lastPos = i;
    		}
    		else {
      			scoreNotes[i] = vanillaNotes[floor(random(0,vanillaNotes.length))] + oct;
      			lastPos = i;
      		}
    	}

    	return scoreNotes;
    	    	//console.log(scoreNotes);
    // public
  	};

  	var beetsReturn = function (mul, len) {
  		var scoreBeets = [];
    	for (var i = 0; i < len; i++) {
      		scoreBeets[i] = beets[floor(random(1,beets.length))] * mul;
    	}
    	return scoreBeets;
  	};

  	var bassLineReturn = function() {
  		var scoreNotes = [],note, bassLineMeasures = [2, 4, 8], bunchOfNotes = [2,4,8,16],
  		bLM = bassLineMeasures[floor(random(bassLineMeasures.length))], 
  		bunchNote = bunchOfNotes[floor(random(bunchOfNotes.length))];
  		//create bass lines that work in cycles of 2, 4, 8, 16, 32
		// for loop inside of for loop

		for (var i = 0; i < bLM; i++){
			note = vanillaNotes[floor(random(vanillaNotes.length))];
			for (var j = 0; j < bunchNote; j++ ) {
				scoreNotes.push(note);
				//console.log(i + j + ' n o t e . . ' + note)
		  	}
  		}
  		return scoreNotes;
  	};

  	var rewriteMelodyReturn = function (p) {
  		
		var inNotes = [], coin = Math.round(Math.random()*2),
		y = floor(p.length/2) ;
		//console.log (p.length + " nR length " + (y * coin) + " y + coin ");
		inNotes = p.slice(0);
		for (i = (y * coin); i <(y*coin)+y; i++){
				inNotes[i] = vanillaNotes[floor(random(vanillaNotes.length))];
				//console.log (inNotes[i] + "in score for" + i);
			}
		return inNotes;
				  						
  	};

  	var wholeBeetsReturn = function (mul, len) {
		var scoreBeets = [], sum;
		
	  	for (var i = 0; i < len; i ++){
	  		//grab some beets
	  		scoreBeets.push(beets[floor(random(1, beets.length))]);	
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
	  	//not just round but floor the amount to round up by by one for simplicity. 
				sumRound = Math.ceil(sum) - sum; 
	  			if (Math.abs(sum + sumRound) % 2 == 1 && (sum + sumRound) >= 3) {
	  				//if this new, larger sum to round plus sum 
	  				//gonna add up to an odd number like 3, 5, etc add one more to it
	  				sumRound = sumRound + 1;
	 				}
	  	//add the time to the array to make it a full even measure count
	  			scoreBeets.push(sumRound);
	  		}
	  	//	return scoreBeets;
	  	}
	  	return scoreBeets;
	};

	var supportBeetsReturn = function (mul, len) {
			var scoreBeets = [], sum;
		
	  	for (var i = 0; i < len; i ++){
	  		//grab some beets
	  		scoreBeets.push(beets[floor(random(0, (beets.length - 2) ))]);	
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
	  	//not just round but floor the amount to round up by by one for simplicity. 
				sumRound = Math.ceil(sum) - sum; 
	  			if (Math.abs(sum + sumRound) % 2 == 1 && (sum + sumRound) >= 3) {
	  				//if this new, larger sum to round plus sum 
	  				//gonna add up to an odd number like 3, 5, etc add one more to it
	  				sumRound = sumRound + 1;
	 				}
	  	//add the time to the array to make it a full even measure count
	  			scoreBeets.push(sumRound);
	  		}
	  	//	return scoreBeets;
	  	}
	  	return scoreBeets;	
	};


// chordsreturn might need a type argument to specify behavior. 
  	var chordsReturn = function (c, cLength) {
  		var chords = [], oct = [-12,-12,-12,0,0,0,12,12], pedalPoint = vanillaNotes[floor(random(vanillaNotes.length))];
		for (var i = 0; i < c; i++){
			var innerChord= [];
			if (i == 0){
				for (var j = 0; j < cLength; j++) {
					//first note is pedal point
					if (j==0){
						innerChord.push(pedalPoint)
					}
					else if (j >= 1){
						var n = vanillaNotes[floor(random(vanillaNotes.length))];
						innerChord.push(n + oct[floor(random(oct.length))]);
					}
				}
			}
			// create additional chords
			else if( i >= 1) {
				for (var j = 0; j < cLength; j++) {
					// first note is pedal point
					if (j==0){
						innerChord.push(pedalPoint)
					}
					else if (j >= 1) {
						var n = vanillaNotes[floor(random(vanillaNotes.length))];
						//if this note is the same as the note in the same spot of the last chord
						if (n == chords[(i - 1)][j]) {
							//o is new note
							var o = n - 1;
							//if new note o is in key
							if (vanillaNotes.indexOf(o) >= 0){
								innerChord.push(o + oct[floor(random(oct.length))]);
							}
							//else if new note o is not in key, move it down one more step
							else if (vanillaNotes.indexOf(o) == -1){
								o = o -1;
								innerChord.push(o);
							}
						}

						else if (n != chords[(i-1)] [j]) {
							innerChord.push(n + oct[floor(random(oct.length))]);
						}
					}
				}
			
			}
				chords.push(innerChord);
		}
		return chords;

  	}
  
  	return {
    	notesReturn: notesReturn,
    	bassLineReturn: bassLineReturn,
    	melodyReturn: melodyReturn,
    	rewriteMelodyReturn: rewriteMelodyReturn,
    	beetsReturn: beetsReturn,
    	supportBeetsReturn: supportBeetsReturn,
    	wholeBeetsReturn: wholeBeetsReturn,
    	chordsReturn: chordsReturn
  	};

})();


/////////////// SONG ////////////////////


var Song = function (n, place, timeOfDay) { //enclose song
	this.name = n;		   
	this.make = function() {
		beepEM = floor(random(56,79));
		Clock.bpm(beepEM);
		var innerSong = (function () {
			var inScore, arp, arps = [], busFol = [], score,  mezhure, mezhures = [], 
			mezhuresAlreadyAdded = [], scores = [], syn, kindsAlreadyAdded = [], 
			fols = [], busses = [], syns = [], m = 4, scorePhrases = floor(random(32,112)), 
			innerSongBus,
			bassPresets = [], leadSynthPresets = [], leadFMPresets = [], leadMonoPresets = [],
			pluckPresets = [], padPresets = []. pad2Presets = [],
			// presets = ['bleep', 'bleepEcho', 'rhodes', 'warble', 'calvin', 'squareLead', 'triLead'], 
			// bassDayPresets = [],
			// bassNightPresets = [],
			// // warble is a night sound
			// //triTest is a night sound
			// leadFMPresets = ['bong', 'bong','glockenspiel', 'glockenspiel', 'glockenspiel'],
			// leadMonoPresets = ['sunAccordion', 'preTester', 'sighTri', 'steelSine', 'steelSineNight'];
			// padPresets = ['cascade', 'calvin'],
			 arpPatternArray = ['updown2', 'updown', 'down', 'up'];
			// //pad2Presets = ['pad2','pad4', 'rainTri' ];
			// pad2Presets = ['triTest', 'pad2', 'pad4', 'sunriseTri', 'sinePad'];
			if (timeOfDay == 'day') {
				bassPresets = ['eitherBass', 'dayBass', 'dayBass', 'waveBass'];
				leadSynthPresets = ['bleep', 'rhodes', 'calvin', 'squareLead'];
				leadFMPresets = ['bong', 'glockenspiel', 'brass'];
				leadMonoPresets = ['steelSine', 'sunAccordion', 'sighTri'];
				pluckPresets = ['simple'];
				padPresets = ['cascade', 'calvin'];
				pad2Presets = ['pad4', 'sunriseTri'];
			}
			else if (timeOfDay == 'night') {
				bassPresets = ['waveBass', 'waveBass', 'eitherBass'];
				leadSynthPresets = ['bleepEcho', 'rhodes', 'warble', 'calvin', 'triLead'];
				leadFMPresets = ['bong', 'glockenspiel', 'brass', 'magicBong'];
				leadMonoPresets = ['steelSineNight'];
				padPresets = ['cascade', 'calvin'];
				pad2Presets = ['triTest', 'pad2', 'pad4'];
			}
			else if (timeOfDay == 'twilight') {
				bassPresets = ['eitherBass', 'dayBass'];
				leadSynthPresets = ['bleepEcho', 'rhodes', 'squareLead'];
				leadFMPresets = ['clarinet', 'magicBong' ];
				leadMonoPresets = ['steelSine'];
				padPresets = ['cascade'];
				pluckPresets = ['simple'];
				pad2Presets = ['triTest', 'pad2', 'pad4'];
			}
			else if (timeOfDay == 'dawn') {
				bassPresets = ['eitherBass', 'waveBass'];
				leadSynthPresets = [];
				leadFMPresets = ['stabs', 'brass', 'magicBong'];
				leadMonoPresets = ['sunAccordion'];
				pluckPresets = ['simple'];
				padPresets = ['calvin'];
				pluckPresets = ['simple'];
				pad2Presets = ['pad2', 'sunriseTri', 'sinePad'];
			}
			//it can all happen in here. handle each score, handle each instrument
			// array of syn objects can live here but be changed by a public method
			// syns = [];
			// public method to restart clears objects
			// syn is the object to be effected... how to assign?
			// privtely fill details of score
		    // check the time function will be calling module.clear method to start over
		    // use a circle ? for each follow... needs to be referenced from draw. call method from draw? how
		    // will that work?
			var scoreDetails = function(m, scoreType) {
				// there's array scores... if scores[i] index of blah blah, do blah blah, else do blah blah?
				//an additional array, if the rotations are brief, if there are less than x notes, classify as
				// blah blah, if conditions are otherwise, clsassify it as blah blah bloo
				// good for things like arp?? if afternoon or night, arp .. if more than two arps, no more arps
				// if midnight no arp, if 6 am- noon one arp only... things like that?
				//if pad exists twice, one be chords, one be slow lead for tensions
				// if rhodes exists twice, have one return chords (intervals maybe), one return melody

				var arpie, functions = [], oct = [-12,-12,-12,0,0,0,12,12], steps = [], 
				newM, newS, newF, newC, pm, sto, beetsVar; 
				var o = objects[m];
				var syn = syns[m];
				if (syn[1] == 'bass'){
				  	var aSong;
				  //	if(syns[m][1].pre = 'xx') {
				  		newM = function() {
				  			//console.log('bass line' + syns[m][1] + syns[m][0]);
				  			var nR = Harmony.bassLineReturn();
				  			bV = Harmony.beetsReturn(2, floor(random(1,2)));
				  			syns[m][0].note.seq(nR, bV);
				  	// 		var q =0;
				  	// 		aSong = Seq( function() { 
				  	// 			console.log(q + " q " )
				  	// 			if (q >= bV.length) {

				  	// 				q = 0;
				  					
				  	// 			}
				  	// 			FadeInPad(objects[m], bV[q]);
				  	// 			q++;
				  				
							// }, bV );

				  			
				  		},
				  		newF = function() {
				  			//console.log('bass line newF melody style' + syns[m][1] + syns[m][0])
				  			var nR = Harmony.notesReturn(0, 1, 8);
				  			bV = Harmony.beetsReturn(4, floor(random(2,4)));
				  			syns[m][0].note.seq(nR, bV);
				  		},
				  		pm = function() {
				  			var nR = Harmony.notesReturn(floor(random(2,4)), 2);
				  			bV = Harmony.beetsReturn(2, floor(random(1,3)));
				  			syns[m][0].note.seq(nR, bV);
				  		},
				  		sto = function(){
					  		syns[m][0].note.seq.stop()
					  ;}
				//  	}
				  	 functions = [newM, newF, pm, sto];
				  }
				 
				else if (syn[1] == 'lead') {
				  	if (!scores[m-1]) { 
				  		var sSong = Seq ( function() {

				  		}, 1);

				  	  	arper = function(){
				  	  		aSong.stop();
				  			//console.log("arper arper bb");
				  			//var arpie = arps[m];
				  			var time = Harmony.beetsReturn(2, floor(random(1,2)));
				  			var nR = Harmony.notesReturn(0,1,8),
				  			arpie = Arp(nR, time, arpPatternArray[floor(random(arpPatternArray.length))], 2);
				  			bV = Harmony.beetsReturn(4, 1);
				  			arpie.target = syns[m][0];
				  			//arpie.chord.seq([12,11,7], 1);
				  			//arpie.seq.start();
				  			//syns[m][0].note.seq([12,12,12], 1/2)

				  		},
				  		arperStop = function(){
				  			//var arpie = arps[m];
				  			console.log("arp stop other")
				  			arpie.seq.stop();
				  			
				  		},
				  		
						newM = function(){
							aSong.stop();
							//console.log('lead newM' + syns[m][1] + syns[m][0]);
							var bV = Harmony.wholeBeetsReturn(rotations[floor(random(rotations.length))], floor(random(1,8)));
							var nR = Harmony.melodyReturn(oct[floor(random(oct.length))], bV.length, bV.length);
				  			syns[m][0].note.seq(nR, bV)
				  	// 		var q = 0;
				  	// 		aSong = Seq( function() { 
				  	// 			q++;
							// 	//console.log("sequence" + q)
							// 	SphereCreate(o);
							// }, bV );
					  ;}, 
					  /// function for series of melodies
				  		newS = function () {
				  			aSong.stop();
				  			var count = 0, rot = rotations[floor(random(rotations.length))], 
				  			bV = Harmony.wholeBeetsReturn(.5, floor(random(1,16))), 
				  			nR = Harmony.melodyReturn(oct[floor(random(oct.length))], bV.length, bV.length),
				  			nR2 = Harmony.rewriteMelodyReturn(nR);
				  			s = Score([0,
				  				function(){
				  					syns[m][0].note.seq(nR, bV)
				  				}, measures(rot),
				  				function(){
				  					syns[m][0].note.seq(nR2, bV)
				  				}, measures(rot)]).start() ;
				  	// 		var q = 0;
				  	// 		aSong = Seq( function() { 
				  	// 			q++;
							// 	//console.log("sequence" + q);
							// 	SphereCreate(o);
							// }, bV );
				  		}, 
					 	newF = function(){
					 		aSong.stop();
					 		//console.log('lead newmelody return' + syns[m][1] + syns[m][0]);
					  		var bV = Harmony.wholeBeetsReturn(rotations[floor(random(rotations.length))], floor(random(1,8)));
							var nR = Harmony.melodyReturn(oct[floor(random(oct.length))], 1, bV.length);
					  		syns[m][0].note.seq(nR, bV);
					  		var q = 0;
				  	// 		aSong = Seq( function() { 
				  	// 			q++;
							// 	console.log("sequence" + q);
								
							// 	SphereCreate(o);
							// }, bV );
				        ;}, 
					    pm = function(){
					    	aSong.stop();
					    	console.log('notes lead pm' + syns[m][1] + syns[m][0]);
					    	var bV = Harmony.wholeBeetsReturn(rotations[floor(random(rotations.length))], floor(random(1,8)));
							var nR = Harmony.notesReturn(oct[floor(random(oct.length))], 4, bV.length);
					  		syns[m][0].note.seq(nR, bV)
					  		var q = 0;
				  	// 		aSong = Seq( function() { 
				  	// 			q++;
							// 	console.log("sequence" + q)
							// 	SphereCreate(o);
							// }, bV );
				        ;}, 
					    sto = function(){
					  		syns[m][0].note.seq.stop()
					  		aSong.stop();
					    ;};	
					
					functions = [arper, arperStop, pm, newF, newS, newM, sto]; 
				}// if scores[i] does not exist
				else {
					if (kindsAlreadyAdded.indexOf('lead') > -1) { 
						var aSong;
				  		//if lead already exists, use supportBeetsReturn
				  	
					  	arper = function(){
				  			//var arpie = arps[0];
				  			arpie = Arp([24,24], 1/12, 'down', 2)
				  			console.log("arper arper gg");
				  			var nR = Harmony.notesReturn(0,1,8),
				  			bV = Harmony.beetsReturn(4, 1);
				  			arpie.target = syns[m][0];
				  			arpie.chord.seq([nR, nR], 2);
				  			var spee = beets[floor(random(8,beets.length))];
				  			arpie.seq.speed = spee;
				  			var q = 0;
				  	// 		aSong = Seq( function() { 
				  	// 			q++;
							// 	//console.log("sequence" + q)
							// 	SphereCreate(o);
							// }, spee );
				  			//syns[m][0].note.seq([-12,-12,-12], 1/32);

				  		},
				  		arperStop = function(){
				  			//var arpie = arps[0];
				  			console.log("arp stop working")
				  			arpie.seq.stop();
				  			aSong.stop();
				  		},

						newM = function(){
							console.log('lead newM' + syns[m][1] + syns[m][0]);
							var bV = Harmony.supportBeetsReturn(rotations[floor(random(rotations.length))], floor(random(1,4)));
							var nR = Harmony.melodyReturn(oct[floor(random(oct.length))], bV.length, bV.length);
				  			syns[m][0].note.seq(nR, bV);
				  	// 		var q = 0;
				  	// 		aSong = Seq( function() { 
				  	// 			q++;
							// 	//console.log("sequence" + q)
							// 	SphereCreate(o);
							// }, bV );
					  ;}, 
					  /// function for series of melodies
				  		newS = function () {
				  			console.log("new s bro")
				  			var count = 0, rots = [2,2,3,4,4,6], 
				  			rot = rots[floor(random(rots.length))],
				  			bV = Harmony.supportBeetsReturn(1, floor(random(1,8))), 
				  			nR = Harmony.melodyReturn(oct[floor(random(oct.length))], bV.length, bV.length),
				  			nR2 = Harmony.rewriteMelodyReturn(nR);
				  			s = Score([0,
				  				function(){
				  					syns[m][0].note.seq(nR, bV)
				  				}, measures(rot),
				  				function(){
				  					syns[m][0].note.seq(nR2, bV)
				  				}, measures(rot)]).start().loop()
				  	// 		var q = 0;
				  	// 		aSong = Seq( function() { 
				  	// 			q++;
							// 	//console.log("sequence" + q)
							// 	SphereCreate(o);
							// }, bV );
				  		}, 
					 	newF = function(){
					 		var bV = Harmony.supportBeetsReturn(rotations[floor(random(rotations.length))], floor(random(1,3)));
							var nR = Harmony.melodyReturn(oct[floor(random(oct.length))], 1, bV.length);
					  		syns[m][0].note.seq(nR, bV);
					  		var q = 0;
				  	// 		aSong = Seq( function() { 
				  	// 			q++;
							// 	//console.log("sequence" + q)
							// 	SphereCreate(o);
							// }, bV );
				      ;}, 
					    pm = function(){
					    	console.log('notes lead pm' + syns[m][1] + syns[m][0]);
					    	var bV = Harmony.supportBeetsReturn(rotations[floor(random(rotations.length))], floor(random(1,8)));
							
					  		var nR = Harmony.notesReturn(oct[floor(random(oct.length))], 4, bV.length);
					  		
					  		syns[m][0].note.seq(nR, bV);
					  		//SphereCreate(bV);
					  		//var q = 0;
				  	// 		aSong = Seq( function() { 
				  	// 			q++;
							// 	//console.log("sequence" + q)
							// 	SphereCreate(o);
							// }, bV );
				      ;}, 
					    sto = function(){
					  		syns[m][0].note.seq.stop()
					  		//aSong.stop();
					  ;};
				  	functions = [arper, arperStop, newM, newS, newF, sto]; 
					} // if lead exists enclosure  
				  	else {	
				  		var sSong;
					  	arper = function(){
				  			console.log("arper arper bb");
				  			var nR = Harmony.notesReturn(0,1,8),
				  			bV = Harmony.beetsReturn(4, 1);
				  			//arp.target = syns[m][0];
				  			syns[m][0].note.seq(nR, bV);
				  	// 		var q = 0;
				  	// 		aSong = Seq( function() { 
				  	// 			q++;
							// 	//console.log("sequence" + q)
							// 	SphereCreate(o);
							// }, bV );
				  			//syns[m][0].note.seq([12,12,12], 1/2)

				  		},
				  		arperStop = function(){
				  			console.log("arp stop other")
				  			arp.seq.stop();
				  			//aSong.stop();
				  		},
				  		
						newM = function(){
							console.log('lead newM' + syns[m][1] + syns[m][0]);
							var bV = Harmony.wholeBeetsReturn(rotations[floor(random(rotations.length))], floor(random(1,8)));
							var nR = Harmony.melodyReturn(oct[floor(random(oct.length))], bV.length, bV.length);
				  			syns[m][0].note.seq(nR, bV)
				  	// 		var q = 0;
				  	// 		aSong = Seq( function() { 
				  	// 			q++;
							// 	//console.log("sequence" + q)
							// 	SphereCreate(o);
							// }, bV );
					  ;}, 
					  /// function for series of melodies
				  		newS = function () {
				  			var count = 0, rot = rotations[floor(random(rotations.length))], 
				  			bV = Harmony.wholeBeetsReturn(.5, floor(random(1,16))), 
				  			nR = Harmony.melodyReturn(oct[floor(random(oct.length))], bV.length, bV.length),
				  			nR2 = Harmony.rewriteMelodyReturn(nR);
				  			s = Score([0,
				  				function(){
				  					syns[m][0].note.seq(nR, bV)
				  				}, measures(rot),
				  				function(){
				  					syns[m][0].note.seq(nR2, bV)
				  				}, measures(rot)]).start()
				  	// 		var q = 0;
				  	// 		aSong = Seq( function() { 
				  	// 			q++;
							// 	//console.log("sequence" + q)
							// 	SphereCreate(o);
							// }, bV );
				  		}, 
					 	newF = function(){
					 		console.log('lead newmelody return' + syns[m][1] + syns[m][0]);
					  		var bV = Harmony.wholeBeetsReturn(rotations[floor(random(rotations.length))], floor(random(1,8)));
							var nR = Harmony.melodyReturn(oct[floor(random(oct.length))], 1, bV.length);
					  		syns[m][0].note.seq(nR, bV)
					  // 		var q = 0;
				  	// 		aSong = Seq( function() { 
				  	// 			q++;
							// 	//console.log("sequence" + q)
							// 	SphereCreate(o);
							// }, bV );
				      ;}, 
					    pm = function(){
					    	console.log('notes lead pm' + syns[m][1] + syns[m][0]);
					    	var bV = Harmony.wholeBeetsReturn(rotations[floor(random(rotations.length))], floor(random(1,8)));
							
					  		var nR = Harmony.notesReturn(oct[floor(random(oct.length))], 4, bV.length);
					  		
					  		syns[m][0].note.seq(nR, bV)
					  // 		var q = 0;
				  	// 		aSong = Seq( function() { 
				  	// 			q++;
							// 	//console.log("sequence" + q)
							// 	SphereCreate(o);
							// }, bV );
				      ;}, 
					    sto = function(){
					  		syns[m][0].note.seq.stop()
					  		//aSong.stop();
					  ;};
				} // else lead does not exist
				   functions = [arper, newS, pm, newF, newM, sto, arperStop]; 

			}
				// 	else if (scores[m-1]){
				// 		console.log("boo boo");
				// 		if (scores[m-1].indexOf(newS) > -1) {

				// 		console.log("scores i - 1")
				// 	}
				// } 
				// elsse if syns is a lead enclosure
			}
				else if (syn[1] == 'pad'){ 
					var sSong;
						newM = function(){
							var nR = Harmony.notesReturn(-12,2,4),
					    	bV = Harmony.wholeBeetsReturn(floor(random(8)), floor(random(1,8)));
	
				  			syns[m][0].note.seq(nR, bV)
				  		

							
					  ;}, 
					 	newC = function(){
					 		console.log('chords' + syns[m][1] + syns[m][0])
					  		nR = Harmony.chordsReturn(random(floor(2,5)), floor(random(3,6))), 
					  		bV = Harmony.beetsReturn(4, floor(random(1,4)));
					  		syns[m][0].chord.seq(nR, bV)
					  		

							
				      ;}, 
					    pm = function(){
					  		var nR = [0,0,0,0,-1,-1,-1,-1], 
					  		bV = Harmony.beetsReturn(4, floor(random(1,4)));
					  		syns[m][0].note.seq(nR, bV)
					  		


				      ;}, 
					    sto = function(){
					  		syns[m][0].note.seq.stop()
					  		//FadeOutPad(objects[m]);
					  		//aSong.stop();
					  ;};
				   functions = [newM, newC, pm, sto]; 
				}
				// else if (syns[m][1] == 'noise'){
				// 	newN = function(){
				// 		var bV = Harmony.wholeBeetsReturn(rotations[floor(random(rotations.length))], floor(random(1,8)));
				// 		syns[m][0].note.seq(floor(random(-12,36)), bV * 8);
				// 	},
				// 	sto = function(){
				// 		syns[m][0].note.seq.stop();
				// 	}

				// 	functions = [newN, sto];
				// }
				//CREATE AN ARRAY FILLED WITH THE ROTATION COUNTS THEN SUM THE ARRAY
				//
				for (var i = 0; i < scorePhrases; i++){

				    if (i == 0){
				    	steps.push(0);
				     // console.log(steps[i] + i);
				    }
				    
				    else if (i == 1) {
				    	var n = function(){
				    		go = true;
				    	};
				    	steps.push(n);
				    }
				    else if (i == 2) {

				    	steps.push(measures(1));
				    }
				    //prevent seq from hitting stop twice (but this is not accounting for all circumstances, must solve )
				    //sto must always be last ?
				    else if ( steps[i-2] == sto || i-2 == 1) {
				    	var n =  functions[floor(random((functions.length - 2)))] ;
				    	steps.push(n)
				    }
				    else if ((i+2)%2==0 && i !=2 ) {
				      //length of each step

				      	var mezh = measures(vanillaMeasures[floor(random(vanillaMeasures.length))]);
				    	steps.push(mezh);
				    	mezhures.push(mezh);
				    //  console.log(steps[i] + i);
				    }
				    
				    else {
				    	var n =  functions[floor(random(functions.length))] ;
				    	steps.push(n);

				    //  console.log(n + i + mm);
				    }
				}
				//mezhuresAlreadyAdded.push(mezhures);
				//console.log(mezhuresAlreadyAdded[i]);
				kindsAlreadyAdded.push(syns[m][1])
				return steps;
			};

			return {
				publicSyns: syns,
				publicFols: fols,
				publicBusFol: busFol,
				// groupsynths is create a whole group of individual synthcreates
				groupSynths: function(q) {
					// opportunity to return different bus effects based on circumstance
					// bass must be last entry in kinds
					//if weather is x, y or z
					var b, kinds = ['pad', 'lead', 'bass'], synthKinds = [], fxAmount;
					// q is number of instruments to create
					for (var i = 0; i <= q; i++){
						var b;
						b = Bus();
						// if one bass exists already
						if (synthKinds.indexOf('bass') > -1) {
							//var k = kinds[floor(random((kinds.length - 1)))];
							var k = kinds[floor(random((kinds.length -1)))];
							synth = new innerSong.synthCreate(i, k, 'oo');
							synth.make(k);
							synthKinds.push(k);
							console.log(k + synthKinds[i]);

						}
						else {
							//var k = kinds[floor(random(kinds.length))];
							var k = 'pad';
							fxAmount = floor(random(3));
							console.log(fxAmount + "fxamount");
							synth = new innerSong.synthCreate(i, k, 'oo');
							synth.make(k);
							synthKinds.push(k);
							console.log(synthKinds[i]);
						}
						for (var j = 0; j < fxAmount; j++){
							var e = floor(random(effectsTypes.length));
				
							effect = new innerSong.EFXCreate(i, effectsTypes[e][0], effectsTypes[e][floor(random(1,effectsTypes[e].length))], b);
							effect.make()
							//b.fx.add (effect);
						}
						console.log(b.fx[0] + "b.fx");
						busses.push(b);
					};
				},
				EFXCreate : function (name, kind, kindPre, buss) {
				// 	var efX = [presetLPFArray = ['rising'], presetDelayArray = , 
				// presetSchizoArray = , presetVibratoArray = ,
				//  presetCrushArray = ['clean', 'lowSamp', 'dirty']], pre;
					this.name = name;
					   
					this.make = function() {
						var efxKind, pre;
						efxKind = kind;
						pre = kindPre;
						name = efxKind(pre)
						buss.fx.add(name);
						console.log (pre + " pre " + name + "name" + kind + " kind");//
					}
				},
				synthCreate: function (name, kind, pre) {
					var ampVar = .5, 
					leadInstruments = [FM, Synth, Mono], padInstruments = [Synth, Synth2];
					  // name - name object, kind - role of instrument (lead, pad etc), pre- preset,
					  //reference item by spot in syns array... current plan is to assign each to specific
					  // spot. syns[0] = lead, 1 = pad, 2 = bass, 4 = lead2, 5 = noise, 6 = drums
					this.name = name;
					   
					this.make = function() {
						//SphereCreate();
					var instrumentKind;
					if (kind == 'lead') {
					   	instrumentKind = leadInstruments[floor(random(leadInstruments.length))];
					   	if (instrumentKind == FM){
					   		//pre =  'brass'
					   		pre = leadFMPresets[floor(random(leadFMPresets.length))];

					   		ampVar = .2
					   }
					  else if (instrumentKind == Synth){
					   		pre = leadSynthPresets[floor(random(leadSynthPresets.length))];
					   		if (pre == 'cascade' || pre == 'warble') {
					   			ampVar = .2
					   		}
					   		else if (pre == 'calvin') {
					   			ampVar = .15
					   		}
					   		else {
					   			ampVar = .5
					   		}
					   }
					   else if (instrumentKind == Mono){
					   		pre = leadMonoPresets[floor(random(leadMonoPresets.length))];
					   		ampVar = .25
					   }
					}
					else if (kind == 'pad') {
						ampVar = .2;
						instrumentKind = padInstruments[floor(random(padInstruments.length))];
						//var coin = Math.round(Math.random()*2);
    					//if (coin == 1) {
						if (instrumentKind == Synth) {
							pre = padPresets[floor(random(padPresets.length))]
							if (pre == 'cascade' || pre == 'warble' || pre == 'calvin') {
					   			ampVar = .1
					   		}
					   		else {
					   			ampVar = .4
					   		}

						}
						else if (instrumentKind == Synth2) {
							//pre = 'triTest';
							pre = pad2Presets[floor(random(pad2Presets.length))]
							ampVar = .4
					   		
						}
							
						//}
						// else {
						// 	instrumentKind = Synth2;
					 //    	pre = pad2Presets[floor(random(pad2Presets.length))]
					 //    	ampVar = .4	
						// };
						
					}
					else if (kind == 'bass'){
						// if day, dayBass
						//if night, waveBass
						// eitherBass for both
					  	instrumentKind = Mono;
					   	pre = bassPresets[floor(random(bassPresets.length))];;
					}
					
					name = instrumentKind(pre)
					name.amp (ampVar)
					
					console.log(name + ' . ' + instrumentKind + ' . ' + pre + ' . ' + name)
					// if want to add fx, call fxObj = new FX(blah blah)
					//fxObj.make();
					//name.fx.add(fxObj);
					var valueToPush = new Array();
							valueToPush[0] = name;
							valueToPush[1] = kind;
					syns.push(valueToPush);
					//name._;
					    // pluck is very quiet
				  }
				},
				NewFollow : function () {
					var s = syns.length;
					for (k = 0; k < s; k++ ) {
						console.log(syns[k][0] + k);
						//assign each synth to its respective follow for visual representation
						syns[k][0]._
						syns[k][0].send(busses[k], 1);
						f = Follow (busses[k]);
						fols.push(f);
						//console.log(f);
					}
					busFol.push(Follow(innerSongBus));
				},
				// FX: function(name, kind, syn) {
  		// 			var effects = [];
				// 	this.name = name;
				// 	this.make = function() {
				//     var bd = 'bitDepth:' + 2,
				//        sr= 'sampleRate:' + Math.round(random(0.01,0.05) * 100) / 100,
				//        t = {'time:' + 1/8}
				//     //Gibber formatting
				// //ex  synthName =  Synth('preset')
				// // 
				//     name = kind(t);
				//     effects.push(name);
				//  //push effects array to new, third slot in syns array
				//    // console.log(bd + sr)
				//   };
				// },
				
				scoreCreate: function() {
					var beeps = floor((60/beepEM) *1000);
					console.log(beeps + 'bpm');
					innerSongBus = Bus().fx.add( 
					
					//Schizo({chance:.95, pitchChance: 0, rate:ms(beeps/4), length:ms(beeps)}), 
					Reverb('space') ) // right
					// a = XOX( 'x***o***x***o*-*', 1/16 );
					// a.send(busses[floor(random(4))], .5);
					// a.send(innerSongBus, .5);
					innerSongBus.connect();
					innerSongBus.amp(0)
					
					l = Line(0, 1, 4)
					score= Score([0,
						function(){ 
							//drum = XOX('x*x*', 1/16);
							//drum.fadeIn(4, 1);
							innerSong.NewFollow();
							//busFol = Follow(busses[2]);
							for (var i = 0; i < syns.length; i++){
								//assign each synth it's own score via scoredetails
								//console.log("creating score details");
								//syns[i][0]._;
								//syns[i][0].connect(innerSongBus);
								var ss = scoreDetails(i);
								scores.push(ss);
		  						inScore = Score(ss).start();
		  						busses[i].connect(innerSongBus);
		  					}
		  					innerSongBus.amp = l;
						}, measures(4),
		  				function(){
		  					l.kill();
		  				}, measures(6800)]).start();
		  			},
		  		scoreFadeOut: function(tick) {
		  			var b, llll, ll, lll;
		  			scoreFade = Score([0,
		  				function () {
		  					b = Bus().fx.add (Delay(1/6,.95 ));
		  					llll = new Line(0, .75, 1)
		  					for (var i = 0; i < syns.length; i++) {
		  						busses[i].send(b, llll);
		  						ll = new Line(.5, 0, 2)
		  					//
		  					//drum.fadeOut(4);
		  						innerSongBus.amp(ll);
		  						//syns[i][0].send(b, llll)
		  					}
		  				}, measures(2),
		  				function(){
		  					score.stop();
		  					inScore.stop();
		  					for (var j = 0; j < fols.length; j++) {
 		  						fols[j].remove();
 		  					};
		  					for (var i = 0; i < syns.length; i++){
 		  						syns[i][0].kill();
 		  					};
 		  					for (var m = 0; m < busses.length; m++) {
 		  						busses[m].kill();
 		  					}
 		  					fols.length = 0;
		  					NewSong(tick);	
		  				}, measures(4),
		  				function(){
		  					//go = false;
							
 		  					
		  					lll = new Line(.5, 0, 2)
 		  					//drum.kill();
 		  					
		  					b.fx[0].feedback = .45;
		  					b.fx[0].feedback = lll;
		  					
		  					
		  					scores.length = 0;
		  					
		  				}, measures(1),
		  				function(){
		  					inScore.stop();
		  					score.stop();
 		  					innerSongBus.kill();
 		  					b.kill();
		  					l.kill();
		  					
		  					llll.kill();
		  					ll.kill();
		  					lll.kill();
		  				}, measures(1)]).start();
		  			}
		  		};
			})();//inner song enclosure
		pieces[place] = innerSong;
		cubeGo  = place;

		//currentSong = pieces[place];
		//SquareDraw(pieces[place]);
	}

}; //new enclosure 

function add(a, b) {
	return a + b;
}

 function closest (num, arr) {
    var curr = arr[0];
    var diff = Math.abs (num - curr);
    for (var val = 0; val < arr.length; val++) {
        var newdiff = Math.abs (num - arr[val]);
        if (newdiff < diff) {
            diff = newdiff;
            curr = arr[val];
        }
    }
    return curr;
}

function render() {

	//var theta;
	//CheckTheTime(minute());
	// noStroke();
 //    fill(bgCol);
 //    rect(0, 0, width, height); 
 	transparencyUpdate(transObjects, camera);
     if (go) {
     	var p0 = pieces[0], p1 = pieces[1];
     	if (cubeGo == 0){
     		theta += .01;
     		//camera.rotation.z = theta;
     		//var hug;
     		 // console.log();
     		  bgPlane.material.opacity = .1 +  (p0.publicBusFol[0].getValue() * .5);
    		for (var i = 0; i < p0.publicFols.length; i++){
				
				//var value = p0.publicFols[i].getValue() * mult[i], col = colors[i],
				//        if width greater than height, use wh * value, otherwise use ww2 * value
			  	//objects[i].scale.x = 6 + p0.publicFols[i].getValue() * 10;
			  //	console.log(p0.publicBusFol.getValue());

			  	objects[i].scale.y = 1 + p0.publicFols[i].getValue() * 100;
			  	objects[i].scale.x = 1 + p0.publicFols[i].getValue() * 10;
			    objects[i].material.opacity = opaqueFloor + p0.publicFols[i].getValue() * 4.5;
			    //objects[i].position.y = 500 - (p0.publicFols[i].getValue() * 3200);
			    // objects[i].rotation.x = theta * i;
			    // if (!cloudy && !rain) {
			     	objects[i].rotation.y = theta * i;
			    	//objects[i].rotation.x = theta * i;
			     	//objects[i].rotation.z = theta / i ;
			    // }
			    //objects[i].rotation.z = theta;
			 //    radius = ( ww2 > wh ? wh * value: ww2 * value);
				// CoolSquare(col, value, ww2, wh, radius  );
			}
		}
		else if (cubeGo == 1){
			for (var i = 0; i < p1.publicFols.length; i++) {
				// var value = p1.publicFols[i].getValue() * mult[i], col = colors[i],
			 //    radius = ( ww2 > wh ? wh * value: ww2 * value);
			// objects[i].scale.x = .125 + p1.publicFols[i].getValue() * 10;
			 //    console.log(p1.publicFols[i].value + i);
				//CoolSquare(col, value, ww2, wh, radius  );
			}
		}
	}
    var delta = clock.getDelta();
    composer.render(delta);
   // requestAnimationFrame(render);
     setTimeout( function() {
    	
    	
//     	//var fr = frameRate.fr;
//     	 //parameter must be set with render
         requestAnimationFrame( render );

    }, 3750 / beepEM  );
}
render();



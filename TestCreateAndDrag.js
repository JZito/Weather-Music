// standard global variables
var container, scene, camera, renderer, controls, stats;
//var keyboard = new THREEx.KeyboardState();
var clock = new THREE.Clock();

// custom global variables
var cube;
var plane;
var tracer;
var offset = new THREE.Vector3();
var vector = new THREE.Vector3();
var raycaster = new THREE.Raycaster();
var projector, mouse = new THREE.Vector2(), mousePoint = new THREE.Vector2(),
INTERSECTED;
var composer;
var ballSprite;
var objects = [], countersA = [], countersB = [], countersC = [];
var light, light2, ambientLight;
var follow;
var start;


var colors = [ [0x50b0cf, 0xffd55d, 0xff655d], [ 0x5E76D6, 0xFFED5D, 0xFFA65D ], [ 0x775FD8, 0xFFC15D, 0xF8FE5C ], [ 0xA355D5, 0xbcf659, 0xFFDC5D ], 
				[ 0XE754A4, 0x50DD80, 0xFFFB5D ] ];

/// audio vars
var syns = [];
var repeatTicker = -1;
var repeatPoint = 7;
var counterA = 0, counterB = 0, counterC = 0;
var colorTicker = 2;
var previousValue;
var mouseX = 0;
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
	camera.position.set(0,25,500);
	camera.lookAt(scene.position);	
	// RENDERER
//	if ( Detector.webgl )
	renderer = new THREE.WebGLRenderer( {antialias:true} );
//	else
//		renderer = new THREE.CanvasRenderer(); 
	renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);

	var renderPass = new THREE.RenderPass(scene, camera);
	composer = new THREE.EffectComposer(renderer);
	var windowResize = THREEx.WindowResize(renderer, camera);

	composer.addPass(renderPass);

	// start the renderer
	//renderer.setSize(WIDTH, HEIGHT);

	var bloomPass = new THREE.BloomPass(25, 64, 16, 25);
	composer.addPass(bloomPass);
	bloomPass.clear = true;



	// hblur = new THREE.ShaderPass(THREE.HorizontalTiltShiftShader);
	var effectFilm = new THREE.FilmPass(1, .05, 128, false);
	effectFilm.renderToScreen = true;
	composer.addPass(effectFilm);
	container = document.getElementById( 'container' );
	container.appendChild( renderer.domElement );
	// EVENTS
	//THREEx.WindowResize(renderer, camera);
	//THREEx.FullScreen.bindKey({ charCode : 'm'.charCodeAt(0) });
	// LIGHT
	var col = new THREE.Color(0xFF0000);

	light = new THREE.DirectionalLight( colors[0][1]);
	light.distance = 500;
	light.intensity = .75;
	light.position.y = 0;
	light.position.z = 120;
	light.position.x = -500;

	light2 = new THREE.DirectionalLight(colors[0][2]);
	light.distance = 500;
	light2.intensity = .75;
	light2.position.y = 0;
	light2.position.z = 120;
	light2.position.x = 500;


	ambientLight = new THREE.PointLight(colors[0][0]);
	ambientLight.intensity = .65;

	scene.add(light);
	scene.add(light2);
	camera.add(ambientLight);
	scene.add(ambientLight);
	// FLOOR
	

	
	document.addEventListener( 'mousedown', onDocumentMouseDown, false);
	

 //    var geometry = new THREE.CylinderGeometry( 0, 20, 100, 3 );
 //    geometry.applyMatrix( new THREE.Matrix4().makeTranslation( 0, 50, 0 ) );
 //    geometry.applyMatrix( new THREE.Matrix4().makeRotationX( Math.PI / 2 ) );
	// tracer = new THREE.Mesh( geometry, new THREE.MeshNormalMaterial() );
	// scene.add( tracer );

	var geometry = new THREE.CylinderGeometry( 0, 20, 100, 3 );
	var vat = new THREE.MeshPhongMaterial({color: 0xffffff, shininess: 20, transparent:true, shading: THREE.FlatShading});
	vat.blending = THREE.AdditiveBlending;
	tracer = new THREE.Mesh(geometry, vat);
	tracer.material.opacity = 0;
	tracer.scale.x = .5;
	tracer.scale.y = .5;
	tracer.scale.z = .5;
	scene.add ( tracer );

	var mesh = new THREE.SphereGeometry(50,5,12);
	var vat2 = new THREE.MeshPhongMaterial({color: 0xffffff, shininess: 3, transparent:true, shading: THREE.FlatShading});
	vat2.blending = THREE.AdditiveBlending;
	blast = new THREE.Mesh(mesh, vat2);
}

 function CreateObject (type, beat) {

	var tweenDir;
	var mesh = new THREE.SphereGeometry(50,5,12);
	var vat = new THREE.MeshPhongMaterial({color: 0xffffff, shininess: 3, transparent:true, shading: THREE.FlatShading});
	vat.blending = THREE.AdditiveBlending;
	var sph = new THREE.Mesh(mesh, vat);
	sph.scale.x = .05;
	sph.scale.y = 2;
	
	//position of object that called it
	sph.position.z = -1000;

	//sph.position.z = floor(random(-10000,-2000));
	if (type == 'counterA') {
		
		sph.position.y = -100 ;
		//+(counter * 100);
		sph.position.x = 1200 ;
		sph.material.color.setHex(colors[colorTicker][1]);
		AdvanceObjects('counterA', beat);
		countersA.push(sph);		
	}
	else if (type == 'counterB') {
		AdvanceObjects('counterB', beat);
		sph.position.y = -500 ;
		//+(counter * 100); 
		sph.position.x = 1200 ;
		sph.material.color.setHex(colors[colorTicker][2]);
		countersB.push(sph);
		//console.log(colors[2][counter]);

	}
	else if (type == 'counterC') {
		AdvanceObjects('counterC', beat);
		sph.position.y = 300 ;
		//+(counter * 100); 
		sph.position.x = 1200 ;
		sph.material.color.setHex(colors[colorTicker][0]);
		countersC.push(sph);
		//console.log("c" + counter + " . " + counterC + type)
	}
	objects.push(sph);
	//sph.scale.y = window.innerHeight;
	scene.add(sph);
	// TweenMax.to(sph.position, 2, { x: -1500,
	//  	ease: Power0.easeNone, onComplete:KillObject, onCompleteParams:[sph]});
}

function AdvanceObjects(family, beat) {
	if (family == 'counterA') {
		countersA.forEach(function(obj) {
			if (obj.position.x < -10000) {
				KillObject(obj);
				var i = countersA.indexOf(obj);
				if(i != -1) {
					objects.splice(i, 1);
				}
			}
			else {
				var distance = obj.position.x - (10000 * (beat / 8) );
				console.log(distance);
				TweenMax.to(obj.position, (beat / 4), { x: distance,
	 			ease: Power4.easeIn });
			}   
		}) ;
	}
	else if (family == 'counterB') {
		countersB.forEach(function(obj) {
			if (obj.position.x < -10000) {
				KillObject(obj);
				var i = countersB.indexOf(obj);
				if(i != -1) {
					objects.splice(i, 1);
				}
			}
			else {
				var distance = obj.position.x - (10000 * (beat / 8) );
				TweenMax.to(obj.position, (beat / 4), { x: distance,
	 			ease: Power2.easeIn });
			} 
		}) ;
	}
	else if (family == 'counterC') {
		countersC.forEach(function(obj) {
			if (obj.position.x < -10000) {
				KillObject(obj);
				var i = countersC.indexOf(obj);
				if(i != -1) {
					objects.splice(i, 1);
				}
			}
			else {
				var distance = obj.position.x - (10000 * (beat / 8) );
				TweenMax.to(obj.position, (beat / 4), { x: distance,
	 			ease: Power4.easeOut });
			}  
		}) ;
	}
}

function KillObject(s) {
	var i = objects.indexOf(s);
	if(i != -1) {
		objects.splice(i, 1);
	}
	// /var j = 
	scene.remove(s);
}

function ChangeColors () {
	colorTicker = floor(random(colors.length));
}

function onDocumentMouseDown( event ) {
	tracer.material.opacity = 1;
	// offset.copy( ballSprite.point ).sub( plane.position )
	document.addEventListener( 'mousemove', onDocumentMouseMove, false );
	document.addEventListener( 'mouseup', onDocumentMouseUp, false  );
	document.addEventListener( 'mouseout', onDocumentMouseOut, false );
	
}

function onDocumentMouseMove( event ) 
{
	var x = mouseX / windowWidth,
     	y = mouseY / windowHeight;
    vector.set( ( event.clientX / window.innerWidth ) * 2 - 1, - ( event.clientY / window.innerHeight ) * 2 + 1, 0.5 );

    vector.unproject( camera );

    var dir = vector.sub( camera.position ).normalize();

    var distance = - camera.position.z / dir.z;

    tracer.position.copy( camera.position ).add( dir.multiplyScalar( distance ) );

    // mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    // mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
    mouse.x = x;
	mouse.y = (-1 * y) * .5;
    syns[3].resonance = (1 - x) * 4;      
   	syns[3].cutoff = (1 - y) / 3;
	var value = floor( mouseX / ( window.innerWidth / 10  )  ) + 5 ;
	if (value != previousValue) {
		ChangeLead(value);
	}
	previousValue = value;
}

function onDocumentMouseUp( event ) {
	syns[3].seq.stop();
	tracer.material.opacity = 0;
	document.removeEventListener( 'mousemove', onDocumentMouseMove, false );
	document.removeEventListener( 'mouseup', onDocumentMouseUp, false );
	document.removeEventListener( 'mouseout', onDocumentMouseOut, false );

}

function onDocumentMouseOut( event ) {

	syns[3].seq.stop();
	tracer.material.opacity = 0;
	document.removeEventListener( 'mousemove', onDocumentMouseMove, false );
	document.removeEventListener( 'mouseup', onDocumentMouseUp, false );
	document.removeEventListener( 'mouseout', onDocumentMouseOut, false );

}

// function animate() 
// {
//     requestAnimationFrame( animate );
// 	render();		
// 	//update();
// }

function update()
{
	// if ( keyboard.pressed("z") ) 
	// { 
	// 	// do something
	// }
	
	// controls.update();
	// stats.update();
}


var theta = 0;
function animate () {
	//console.log(mouseX + " . "+ mouseY);
	if (start) {
	 	//theta += .001;
	 	light.intensity = follow.getValue() * 2;
		ambientLight.intensity = (follow.getValue() * .5) + .5;
	 	light2.intensity = follow.getValue() * 2;
		//camera.rotation.z = theta;
	 }
}

function render() {
	//transparencyUpdate(transObjects, camera);

    var delta = clock.getDelta();

    //camera.lookAt( new THREE.Vector3(0, 0, 0));
    
    renderer.clear();

    composer.render(.01);
    
    setTimeout( function() {
    	animate();
    	requestAnimationFrame( render );

    }, 1375/60 );
}
render();
// function render() 
// {
// 	renderer.render( scene, camera );
// }

////////////////////
function setup () {
	
	

	var time = [1/2];
	
	drum = Kick().note.seq( 55,1/4 )
	follow = Follow(drum);
	var nR = Harmony.melodyReturn(0,2,3);
	var nR2 = Harmony.melodyReturn(0,2,3);
	var nR3 = Harmony.melodyReturn(0,2,3);
	var bR0 = Harmony.beets[floor(random(2))];
	var bR1 = Harmony.beets[floor(random(2))];
	var bR2 = Harmony.beets[floor(random(2))];
	
	
	//var arpPattern = Harmony.arpPatterns[floor(random(Harmony.arpPatterns.length))];
	//arpie = Arp([12,12], 1/3);
	
	var notesLength = nR.length;
	bV = Harmony.beetsReturn(1,3);
	
	a = FM('glockenspiel')
	.note.seq(nR, [1/16])
	a.pan(-1);
	a.fx.add(Delay(1/6, .65));
	syns.push(a);

	b = FM('glockenspiel')
	.note.seq(nR2, [1/2])
	b.pan(1);
	a.fx.add(Delay(1/6, .65));
	syns.push(b);

	c = FM('glockenspiel')
	.note.seq(nR3, [1/8])
	a.fx.add(Delay(1/6, .65));
	syns.push(c);

	d = Synth2('sunriseTri')
	.note.seq(nR3, [1/8])
	
	syns.push(d);

	d.seq.stop();

	a.note.values.filters.push( function( args, pattern ) {
		//TrackChanges(args, nR.length, "a", bR0);
		//counterA++;
		CreateObject('counterA', bR0);
		return args
	})

	b.note.values.filters.push( function( args, pattern ) {
  		CreateObject('counterB', bR1);
		return args
	})

	c.note.values.filters.push( function( args, pattern ) {
  		CreateObject('counterC', bR2);
		return args
	})

	drum.note.values.filters.push( function( args, pattern) {
		KickTracker();
		return args;
	})
	
	start = true;

}

function ChangeLead (n) {
	syns[3].seq.stop();
	var chordNotes = [ -4, -1, 2, 5, 8, 11, 14, 15, 20, 23 ];
	// n is note passed from mousemove
	syns[3].note.seq(Harmony.vanillaNotes[n], 1)
	syns[3].note.seq.repeat(0);
}

function KickTracker() {
	//2, 3 or 4 or 6 measures, switch
	var amounts = [7, 11,11, 15,15, 23];
	if (repeatTicker >= repeatPoint) {
		ChangeNotes();
		ChangeColors();
		repeatTicker = -1;
		repeatPoint = amounts[floor(random(amounts.length))];
	}
	repeatTicker++;
}

function ChangeNotes () {

	var time = [1/2];
	var nR0 = Harmony.melodyReturn(0,2,3);
	var nR1 = Harmony.melodyReturn(1,2,3);
	var nR2 = Harmony.melodyReturn(-1,2,3);
	//can be compositional here, have beets react to other beats to form pleaseing poly rhythms
	var bR0 = Harmony.beets[floor(random(2))];
	var bR1 = Harmony.beets[floor(random(2))];
	var bR2 = Harmony.beets[floor(random(2))];
	
	
	var notesLength = nR0.length;
	//bV = Harmony.beetsReturn(1,3);
	a.note.seq(nR0, bR0 );
	b.note.seq(nR1, bR1 );
	c.note.seq(nR2,  bR2 );

	a.note.values.filters.push( function( args, pattern ) {
		CreateObject('counterA', bR0);
		return args
	})

	b.note.values.filters.push( function( args, pattern ) {
  		CreateObject('counterB', bR1);
		return args
	})

	c.note.values.filters.push( function( args, pattern ) {
  		CreateObject('counterC', bR2);
		return args
	})

}

var Harmony = (function () { 
	var vanillaNotes = [-1, -3, -4, 0, 2, 3, 5, 6, 8, 9, 11, 12, 14, 15], vanillaMeasures = [1,1,2,2,2,4,4,4,8,8,6,6,8,8,12,12,16],
	beets = [1/3,1/6, 1/4, 1/4, 1/4,1/8, 1/8,1/8,1/16, 1/16, 1/32],
	arpPatternArray = ['updown2', 'updown', 'down', 'up'] ;
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
  		//vars
  		vanillaNotes: vanillaNotes,
  		arpPatterns: arpPatternArray,
  		beets: beets,
  		// functions
    	notesReturn: notesReturn,
    	bassLineReturn: bassLineReturn,
    	melodyReturn: melodyReturn,
    	rewriteMelodyReturn: rewriteMelodyReturn,
    	beetsReturn: beetsReturn,
    	supportBeetsReturn: supportBeetsReturn,
    	wholeBeetsReturn: wholeBeetsReturn,
    	chordsReturn: chordsReturn
  	};
} ) ();




var WIDTH =  window.innerWidth,
    HEIGHT =  window.innerHeight;

var VIEW_ANGLE = 70,
    ASPECT = WIDTH / HEIGHT,
    NEAR = 0.1,
    FAR = 10000;

var syns = [];
var objects = [];
var planes = [];
var previousValue;
var start = false;
var plane;
var planeCounter = -1;
var mouse = new THREE.Vector2(),
offset = new THREE.Vector3(),
raycaster = new THREE.Raycaster();
var INTERSECTED, SELECTED;
var mouseX = 0;
var mouseXOnMouseDown = 0;

var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;

var particleMaterial;


var colors = [ [0x50b0cf, 0xffd55d, 0xff655d], [ 0x5E76D6, 0xFFED5D, 0xFFA65D ], [ 0x775FD8, 0xFFC15D, 0xF8FE5C ], [ 0xA355D5, 0xbcf659, 0xFFDC5D ], 
				[ 0XE754A4, 0x50DD80, 0xFFFB5D ] ];

var renderer = new THREE.WebGLRenderer( { alpha: true });
renderer.setClearColor( 0x000000, 0 );
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(  VIEW_ANGLE,
                                ASPECT,
                                NEAR,
                                FAR  );

// like a break point
//debugger;
//

var renderPass = new THREE.RenderPass(scene, camera);
var composer = new THREE.EffectComposer(renderer);
var windowResize = THREEx.WindowResize(renderer, camera);

composer.addPass(renderPass);

// start the renderer
renderer.setSize(WIDTH, HEIGHT);

var bloomPass = new THREE.BloomPass(25, 64, 16, 25);
composer.addPass(bloomPass);
bloomPass.clear = true;



// hblur = new THREE.ShaderPass(THREE.HorizontalTiltShiftShader);
var effectFilm = new THREE.FilmPass(1, .05, 128, false);
effectFilm.renderToScreen = true;
composer.addPass(effectFilm);
// start the renderer
renderer.setSize(WIDTH, HEIGHT);



//camera.lookAt(new THREE.Vector3(0, 0, 0));
camera.position.x = 0;
camera.position.y = 500;
camera.position.z = 1000;



renderer.setSize(WIDTH, HEIGHT);


var radius = 50, segments = 5, rings = 16;

var col = new THREE.Color(0xFF0000);

var light = new THREE.DirectionalLight( colors[0][1]);
light.distance = 3000;
light.intensity = .75;
light.position.y = 0;
light.position.z = 1200;
light.position.x = -2000;

var light2 = new THREE.DirectionalLight(colors[0][2]);
light.distance = 3000;
light2.intensity = .75;
light2.position.y = 0;
light2.position.z = 1200;
light2.position.x = 2000;


var ambientLight = new THREE.PointLight(colors[0][0]);
ambientLight.intensity = .65;

scene.add(light);
scene.add(light2);
camera.add(ambientLight);
scene.add(ambientLight);
var $container = $('#container');
$container.append(renderer.domElement);

particleMaterial = new THREE.SpriteMaterial( {
					color: 0x002fBe,
					
				} );


var counterA = 0, counterB = 0, counterC = 0;
var colorTicker = 2;

function ChangeColors () {
	colorTicker = floor(random(colors.length));
}

var CreatePlayerObject =  function () {
	var mesh = new THREE.SphereGeometry(50,5,12);
	var vat = new THREE.MeshPhongMaterial({color: 0xffffff, shininess: 3, transparent:true, shading: THREE.FlatShading});
	vat.blending = THREE.AdditiveBlending;
	sph = new THREE.Mesh(mesh, vat);
	
    sph.position.x = Math.random() * 3000 - 6000;
    sph.position.y = Math.random() * 600 - 300;
    sph.position.z = -9000;

    sph.scale.x = 50;
    sph.scale.y = Math.random() * 20 + 10;
    sph.scale.z = Math.random() * 30 + 15;

    
    scene.add( sph );

    objects.push( sph );


    plane = new THREE.Mesh(
        new THREE.PlaneBufferGeometry( 2000, 2000, 8, 8 ),
        new THREE.MeshBasicMaterial( { visible:false } )
    );
    scene.add( plane );
    planes.push( plane );
}

var CreateSphere = function (counter, type) {

	//var i5 = (i*225) - 350;
	//console.log(parent);
	var tweenDir;
	//color of object that called it
		//partially transparent?
	//console.log("col" + col);
	var mesh = new THREE.SphereGeometry(50,5,12);
	var vat = new THREE.MeshPhongMaterial({color: 0xffffff, shininess: 3, transparent:true, shading: THREE.FlatShading});
	vat.blending = THREE.AdditiveBlending;
	sph = new THREE.Mesh(mesh, vat);
	sph.scale.x = 40;
	 sph.scale.y = 10;
	
	//position of object that called it
	sph.position.z = -9000;

	//sph.position.z = floor(random(-10000,-2000));
	if (type == 'counterA') {
		sph.position.y = 0 +(counter * 500);
		sph.position.x = 6000 ;
		sph.material.color.setHex(colors[colorTicker][1]);
		
	}
	else if (type == 'counterB') {
		sph.position.y = -2500 +(counter * 500); ;
		sph.position.x = 6000 ;
		sph.material.color.setHex(colors[colorTicker][2]);
		//console.log(colors[2][counter]);

	}
	else if (type == 'counterC') {
		sph.position.y = 2500 +(counter * 500); ;
		sph.position.x = 6000 ;
		sph.material.color.setHex(colors[colorTicker][0]);
		//console.log("c" + counter + " . " + counterC + type)
	}
	
	
	
	//sph.rotation.z = random(1);

	 
	 objects.push(sph);

	//sph.scale.y = window.innerHeight;
	scene.add(sph);
	TweenMax.to(sph.position, 1, { x: -12000,
	 	ease: SteppedEase.config(12), onComplete:KillSphere, onCompleteParams:[sph]});
	

	

}

function KillSphere(s) {
	var i = objects.indexOf(s);
	if(i != -1) {
		objects.splice(i, 1);
	}
	scene.remove(s);
}

var theta = 0;

function animate () {
	//console.log(mouseX + " . "+ mouseY);
	if (start) {
		theta += .001;
		light.intensity = follow.getValue() * .5;
		ambientLight.intensity = follow.getValue() * .25;
		light2.intensity = follow.getValue() *.25;
		camera.rotation.z = theta;
	}
}

var clock = new THREE.Clock()

function render() {
	//transparencyUpdate(transObjects, camera);

    var delta = clock.getDelta();

    //camera.lookAt( new THREE.Vector3(0, 0, 0));
    
    renderer.clear();

    composer.render(.01);
    
    setTimeout( function() {
    	animate();
    	requestAnimationFrame( render );

    }, 3750/60 );
}


//check the mouse x
// if mousex doesn't equal mousex

render();


//var a, b, c, d;
var follow;





function setup () {
	
	
	var time = [1/2];
	drum = Kick().note.seq( 55,1/4 )
	follow = Follow(drum);
	var nR = Harmony.melodyReturn(0,2,3);
	var nR2 = Harmony.melodyReturn(0,2,3);
	var nR3 = Harmony.melodyReturn(0,2,3);
	
	
	//var arpPattern = Harmony.arpPatterns[floor(random(Harmony.arpPatterns.length))];
	//arpie = Arp([12,12], 1/3);
	
	var notesLength = nR.length;
	bV = Harmony.beetsReturn(1,3);
	
	a = FM('glockenspiel')
	.note.seq(nR, [1/16])
	a.pan(-1);
	syns.push(a);

	b = FM('glockenspiel')
	.note.seq(nR2, [1/2])
	b.pan(1);
	syns.push(b);

	c = FM('glockenspiel')
	.note.seq(nR3, [1/8])
	syns.push(c);

	d = Synth2('sunriseTri')
	.note.seq(nR3, [1/8])
	
	syns.push(d);

	d.seq.stop();

	a.note.values.filters.push( function( args, pattern ) {
  		doSomeOtherStuff(args, nR.length, "a")
		return args
	})

	b.note.values.filters.push( function( args, pattern ) {
  		doSomeOtherStuff(args, nR2.length, "b")
		return args
	})

	c.note.values.filters.push( function( args, pattern ) {
  		doSomeOtherStuff(args, nR3.length, "c")
		return args
	})

	drum.note.values.filters.push( function( args, pattern) {
		KickTracker();
		return args;
	})
	
	start = true;

}



function NewNotes () {
	
}

function ChangeNotes () {

	var time = [1/2];
	var nR = Harmony.melodyReturn(0,2,3);
	var nR2 = Harmony.melodyReturn(1,2,3);
	var nR3 = Harmony.melodyReturn(-1,2,3);
	//var arpPattern = Harmony.arpPatterns[floor(random(Harmony.arpPatterns.length))];
	//arpie = Arp([12,12], 1/3);
	
	var notesLength = nR.length;
	bV = Harmony.beetsReturn(1,3);
	a.note.seq(nR, Harmony.beets[floor(random(Harmony.beets.length))]);
	b.note.seq(nR2, [1/4]);
	c.note.seq(nR3, [1/6]);

	a.note.values.filters.push( function( args, pattern ) {
  		doSomeOtherStuff(args, nR.length, "a")

	    
  		return args
	})

	b.note.values.filters.push( function( args, pattern ) {
  		doSomeOtherStuff(args, nR2.length, "b")

	    
  		return args
	})

	c.note.values.filters.push( function( args, pattern ) {
  		doSomeOtherStuff(args, nR3.length, "c")

	    
  		return args
	})

	
	//a.noteOriginal = a.note

}

var repeatTicker = -1;
var repeatPoint = 7;

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

function doSomeOtherStuff (arg, l, obj)  { 
// l is length of pattern for counter
	//console.log(repeatTicker);
	// if (repeatTicker >=16) {
	// 	ChangeColors();
	// 	ChangeNotes();//a.noteOriginal = a.note;
	// 	repeatTicker = 0;

	// }
	
	if (obj == "a") {
		counterA++;
		CreateSphere(counterA, 'counterA');
		if (counterA >= l) {
			counterA = 0;
			
			//repeatTicker++;
		}
		//console.log('a note!' + arg + "." + counterA + " . " + obj) 
	}
	else if (obj == "b") {
		counterB++
		CreateSphere(counterB, 'counterB');
		if (counterB >= l) {
			counterB = 0;
			
		}
		//console.log('a note!' + arg + "." + counterB + " . " + obj) 
	}
	else if (obj == "c") {
		counterC++
		CreateSphere(counterC, 'counterC');
		if (counterC >= l) {
			counterC = 0;
		}
		//console.log('a note!' + arg + "." + counterC + " . " + obj) 
	}
}

function draw () {

	//console.log(follow.getValue())
}

function onWindowResize() {
				camera.aspect = window.innerWidth / window.innerHeight;
				camera.updateProjectionMatrix();
				renderer.setSize( window.innerWidth, window.innerHeight );
			}

function onDocumentMouseDown( event ) {

	event.preventDefault();
	CreatePlayerObject();
	planeCounter++;
	var thisPlane = planes[planeCounter];
	console.log(thisPlane);
	//Click();
	

	raycaster.setFromCamera( mouse, camera );

    var intersects = raycaster.intersectObjects( objects );

    if ( intersects.length > 0 ) {

//                  controls.enabled = false;

        SELECTED = intersects[ 0 ].object;

        var intersects = raycaster.intersectObject( thisPlane);

        if ( intersects.length > 0 ) {

            offset.copy( intersects[ 0 ].point ).sub( thisPlane.position );

        }

        container.style.cursor = 'move';

    }
	



	mouseXOnMouseDown = event.clientX - windowHalfX;
	document.addEventListener( 'mousemove', function() {
    	onDocumentMouseMove(planes[planeCounter]);
	}, false );
	document.addEventListener( 'mouseup', onDocumentMouseUp, false );
	document.addEventListener( 'mouseout', onDocumentMouseOut, false );
	//targetRotationOnMouseDown = targetRotation;
		//mouseXOnMouseDown = event.clientX - windowHalfX;

		
		

		//syns[3].note.seq.repeat(1);





	
	// syns[3].note.seq(0, 1);
	// syns[3].note.seq.repeat(1);

	//event.preventDefault();
	//targetRotationOnMouseDown = targetRotation;
//	}
	

}



function ChangeLead (n) {
	syns[3].seq.stop();
	var chordNotes = [ -4, -1, 2, 5, 8, 11, 14, 15, 20, 23 ];
	// n is note passed from mousemove
	syns[3].note.seq(Harmony.vanillaNotes[n], 1)
	syns[3].note.seq.repeat(0);
}

function onDocumentMouseMove( thisPlane ) {
	//event.preventDefault();
	console.log(thisPlane);
	mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

    //

    raycaster.setFromCamera( mouse, camera );

    if ( SELECTED ) {

        var intersects = raycaster.intersectObject( thisPlane );

        if ( intersects.length > 0 ) {

            SELECTED.position.copy( intersects[ 0 ].point.sub( offset ) );

        }

        return;

    }

    var intersects = raycaster.intersectObjects( objects );

    if ( intersects.length > 0 ) {

        if ( INTERSECTED != intersects[ 0 ].object ) {

            if ( INTERSECTED ) INTERSECTED.material.color.setHex( INTERSECTED.currentHex );

            INTERSECTED = intersects[ 0 ].object;
            INTERSECTED.currentHex = INTERSECTED.material.color.getHex();

            plane.position.copy( INTERSECTED.position );
            plane.lookAt( camera.position );

        }

        container.style.cursor = 'pointer';

    } else {

        if ( INTERSECTED ) INTERSECTED.material.color.setHex( INTERSECTED.currentHex );

        INTERSECTED = null;

        container.style.cursor = 'auto';

    }
    mouse.x = x;
	mouse.y = (-1 * y) * .5;
  	//console.log (x + " . " + y);
	syns[3].resonance = (1 - x) * 4;      
   	syns[3].cutoff = (1 - y) / 3;

   	


	var value = floor( mouseX / ( window.innerWidth / 10  )  ) + 5 ;
	//console.log(value + " . . . . value");

	if (value != previousValue) {
		ChangeLead(value);
	}

	previousValue = value;

	//targetRotation = targetRotationOnMouseDown + ( mouseX - mouseXOnMouseDown ) * 0.02;

}

function onDocumentMouseUp( event ) {
	syns[3].seq.stop();

	document.removeEventListener( 'mousemove', onDocumentMouseMove, false );
	document.removeEventListener( 'mouseup', onDocumentMouseUp, false );
	document.removeEventListener( 'mouseout', onDocumentMouseOut, false );

}

function onDocumentMouseOut( event ) {

	syns[3].seq.stop();

	document.removeEventListener( 'mousemove', onDocumentMouseMove, false );
	document.removeEventListener( 'mouseup', onDocumentMouseUp, false );
	document.removeEventListener( 'mouseout', onDocumentMouseOut, false );

}



var Harmony = (function () { 
	var vanillaNotes = [-1, -3, -4, 0, 2, 3, 5, 6, 8, 9, 11, 12, 14, 15], vanillaMeasures = [1,1,2,2,2,4,4,4,8,8,6,6,8,8,12,12,16],
	beets = [1, 1/1.5,1/2, 1/2, 1/3, 1/3,1/6, 1/4, 1/4, 1/4,1/8, 1/8,1/8,1/16, 1/16, 1/32],
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


function init () {
	document.addEventListener( 'mousedown', onDocumentMouseDown, false );
}
init();
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

var windowResize = THREEx.WindowResize(renderer, camera);

// create a point light
//var spotLight = new THREE.PointLight( 0xFFFFFF );
// var pointLight = new THREE.PointLight( 0x99FFFF);
// pointLight.intensity = .15;


composer.addPass(renderPass);

// start the renderer
renderer.setSize(WIDTH, HEIGHT);
renderer.autoClear = false;
renderer.shadowMapEnabled = false;


//1. BloomPass: blurry, glowing effect
var bloomPass = new THREE.BloomPass(5, 125, 20, 64);
composer.addPass(bloomPass);
bloomPass.clear = true;

// hblur = new THREE.ShaderPass(THREE.HorizontalTiltShiftShader);
// vblur = new THREE.ShaderPass(THREE.VerticalTiltShiftShader);
// var bluriness = 5;

// hblur.uniforms['h'].value = bluriness / window.innerWidth;
// vblur.uniforms['v'].value = bluriness / window.innerHeight;
// hblur.uniforms['r'].value = vblur.uniforms['r'].value = 0.5;

// composer.addPass(hblur);
// composer.addPass(vblur);

// var mirrorPass = new THREE.ShaderPass( THREE.MirrorShader );
// composer.addPass(mirrorPass);
// mirrorPass.uniforms.side.value = 3;

// vignettePass = new THREE.ShaderPass(THREE.VignetteShader);
// vignettePass.uniforms["darkness"].value = .95;
// vignettePass.uniforms["offset"].value = 1.5;
// composer.addPass(vignettePass);

// 2. EffectFilm, which output the result in an old style TV screen fashion (with thin colourful stripes):
var effectFilm = new THREE.FilmPass(1, 0.325, 256, false);
effectFilm.renderToScreen = true;
composer.addPass(effectFilm);



// attach the render-supplied DOM element
$container.append(renderer.domElement);

// var bgCol = new THREE.Color(0xff8f75);
// var vat = new THREE.MeshLambertMaterial({color: bgCol});
// var geometry = new THREE.PlaneBufferGeometry(1800*2, 1600 * 2,1,1);
// vat.blending = THREE.SubtractiveBlending;
// var bgPlane = new THREE.Mesh(geometry, vat);
// bgPlane.position.z = - 100;
// bgPlane.material.transparent	= true;
// 		bgPlane.material.opacity = 0;
// scene.add(bgPlane);

// set up the sphere vars
var radius = 50, segments = 16, rings = 16;

var col = new THREE.Color(0xFF0000);


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
var mesh = new THREE.SphereGeometry(50,16,16);
var bgCol = new THREE.Color(0x00ffff);
var vat = new THREE.MeshPhongMaterial({color: bgCol, shininess: 30, shading: THREE.FlatShading});
vat.blending = THREE.AdditiveBlending;
var plane = new THREE.Mesh(mesh, vat);
plane.position.z = - 500;
plane.position.x = -100;
plane.position.y = 0;
plane.scale.x = 5;
plane.scale.y = 5;
plane.scale.z = 5;
scene.add(plane);

var light = new THREE.DirectionalLight(0xA67A33);
light.distance = 6000;
light.intensity = .25;
light.position.y = 9500;
light.position.z = 1200;
light.position.x = 3000;

var light2 = new THREE.DirectionalLight(0x205D66);
light.distance = 6000;
light2.intensity = .25;
light2.position.y = -9500;
light2.position.z = 1200;
light2.position.x = -3000;


var ambientLight = new THREE.PointLight( 0x2E3573);

ambientLight.intensity = .2;

scene.add(light);
scene.add(light2);
camera.add(ambientLight);
scene.add(ambientLight);

// sandbox
var ranNotes = [12,11,9,7,5,4,2,0,-1], f,
beets = [, , , 1, 1/1.5, 1/2, 1/2, 1/2,1/2,1/3, 1/6, 1/4, 1/6, 1/4,1/3, 1/3,1/6], beepEM = 60,
bR, nR, bR2, nR2, repeatCount = 1, stopper, syns = [], triggerNewMelody = false;

var leadSynthPresets = ['bleepEcho', 'bleep', 'rhodesFade', 'rhodes', 'warble', 'triLead' ];

function setup () {
	bR = WholeBeetsReturn(.5, floor(random(1,12))),
			nR = NotesReturn(bR.length), bR2 = WholeBeetsReturn(.5, floor(random(1,16))),
			nR2 = NotesReturn(bR2.length);
	canvas = createCanvas( windowWidth, windowHeight );
	Clock.bpm(beepEM)
	songBus = Bus().fx.add( HPF({cutoff:.2, amp:1}),StereoVerb('totalWet'),Schizo('borderline'),
		Delay({time:1/2, feedback:.95, dry:0, wet:1}),StereoVerb('space'),Distortion(50)  )
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
	m = Synth('bleep')
	//m.fx.add();
	m2 = Synth('rhodesFade')
	m2.fx.add();
	m.pan(.25);
	m2.pan(-.25);
	//m1 = Synth('bleep')
	
	m.send(syn0Bus, 1)
	m2.send(syn1Bus, 1)
	syn0Bus.connect(songBus);
	syn1Bus.connect(songBus);
	songBus.amp(1);
   // f = Follow();
	syns.push(m);
	syns.push(m2);
	NewScore();
	follow2 = Follow(songBus);
	follow1 = Follow(syn1Bus);
	follow0 = Follow(syn0Bus);

	//createOriginalObjects();
	//syns.push(m1);

}

function draw () {
	//console.log(f);
	//CheckTheTime(minute());
	//console.log(m.frequency)
	// var x = mouseX / windowWidth,
 //        y = mouseY / windowHeight,
 //        ww2 = windowWidth / 2,
 //        wh2 = windowHeight / 2 ;
  
 //  	songBus.fx[1].roomsize = (1 - x);
 //  	//console.log(songBus.fx[1].roomsize + "room 1")
 //  	songBus.fx[4].roomsize = ((1 - y) * .5) + .5 ;

 //  	songBus.fx[3].feedback = x < .99 ? x : .99;
 //  	console.log(light.position.z);
  	//console.log(songBus.fx[4].roomsize + "room 2");
  	//console.log(songBus.fx[3].feedback + "feedback");
  	light.intensity = follow0.getValue() * 20;
  	light2.intensity = follow1.getValue() * 20;
  	ambientLight.intensity = follow2.getValue() * 2 + .25;
 //  	if (notes) {
 //  		light.position.y = -4000 + (followSyn0.getValue() * 2000);
	// light2.position.y = -4000 + (followSyn1.getValue() * 2000);
 //  	}
  	
  	//console.log (" . . " + light.intensity + " . . " + light2.intensity + " . . " + ambientLight.intensity);
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
				
				bR = WholeBeetsReturn(2, 3);
	 			nR = melodyReturn( floor(random(-2,2)), bR.length,   bR.length);
	 			
				syns[i].note.seq(nR, bR);
				syns[i].note.seq.repeat( 1 )				
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
			var s = leadSynthPresets[floor(random(leadSynthPresets.length))];
			//oldSyns.length = 0;
			for (i = 0; i < synsLength; i++) {
				
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
		}

		
	count++  }, repeatCount ) // every one measures
}



function CoinReturn() {
	var coin = Math.round(Math.random()*2);
	return coin;
}


setInterval(NewScore, 60000)

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

// draw!

var clock = new THREE.Clock()

function render() {
	transparencyUpdate(transObjects, camera);

    var delta = clock.getDelta();
    
    renderer.clear();

    composer.render(delta);
    
    setTimeout( function() {
    	
        requestAnimationFrame( render );

    }, 3750/60 );
}
render();



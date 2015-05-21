// to do--- fix for loop in score- set it back to individual score for each instrument
// 
var state = 'noChange', tempDivP5, radiuses = [], go = false, col, currentSong, mouseHit = false, bgCol, values = [], 
lerpVar, radius, a = 0, countdown = 140, ticker = 0, cubeGo = 2, str = "74",
vanillaNotes = [12,11,9,7,4,2,0], vanillaMeasures = [1,2,4,6,8,12,16], 
beets = [1, 1/2, 1/4, 1/8,1/16, 1/32], beepEM = 67, rotations = [2,4,6,8, 16], pieces = [],
measureCount = 0, prevColor1, newColor1, prevColor6, newColor6, mainScore;
// brass-- CLOUDY DAY TIME- brass only acceptable if octave is kept low 0  or lower. 
// 

function mousePressed () {
	mouseHit = true;
}
function setup() {
	canvas = createCanvas( windowWidth, windowHeight );
	newColor0 = color(247, 75, 43, 127);
	newColor1 = color (200, 38, 8, 127);
	newColor2 = color(255, 214, 147, 127);
	newColor3 = color (247, 169, 43, 127);
	newColor4 = color(247, 218, 43, 127);
	newColor5 = color (14, 168, 70, 127);
	bgCol = color(255,14,14,255);
	bgColA = color(175,14,14,255);
	colors = [newColor0, newColor1, newColor2, newColor3, newColor4, newColor5];
	NewSong(0);
};

function CheckTheTime(time) //function check the time
 {
    var previousState = state; 
    if (ticker == 0){
    		ticker = 1;
    }
    //console.log(time);
    if (time == 1 || time == 15 || time == 30 || time == 45) 
    {
    	state = 'change';
    	//console.log('change');
    }
    else if (time != 1 || time != 15 || time !=  30 || time != 45)
    {
    	state = 'noChange';
    }

    if (state != previousState) {
    	console.log('state !=')
    	
    	if (ticker == 1){
    		pieces[0].scoreFadeOut(1);
    		//go = false;
    		ticker = 2;	
    	}
    	else if (ticker == 2){
    		pieces[1].scoreFadeOut(0);
    		//go = false;
    		ticker = 1;	
    	}
    }
};

function NewSong(t) {
	song = new Song('ho', t);
	song.make();
	pieces[t].groupSynths(floor(random(2,5)));
	pieces[t].scoreCreate();
};

function draw() {
	//console.log(go + "go")
	var mult = [10,20,14,16], ww2 = windowWidth / 2, wh = windowHeight,
	p0 = pieces[0], p1 = pieces[1];
	CheckTheTime(minute());
	noStroke();
    fill(bgCol);
    rect(0, 0, width, height); 
    if (go) {
    	if (cubeGo == 0){
			for (var i = 0; i < p0.publicFols.length; i++){
				var value = p0.publicFols[i].getValue() * mult[i], col = colors[i],
				//        if width greater than height, use wh * value, otherwise use ww2 * value
			    radius = ( ww2 > wh ? wh * value: ww2 * value);
				CoolSquare(col, value, ww2, wh, radius  );
			}
		}
		else if (cubeGo == 1){
			for (var i = 0; i < p1.publicFols.length; i++) {
				var value = p1.publicFols[i].getValue() * mult[i], col = colors[i],
			    radius = ( ww2 > wh ? wh * value: ww2 * value);
				CoolSquare(col, value, ww2, wh, radius  );
			}
		}
	}
    if (a < countdown)
  	{
  		lerpVar = (lerpVar += a % countdown) * .0001;
  	}
  	textSize(38)
  	fill(0)
  	text(str,0,24,48,48)
};

function CoolSquare(c, v, w, h, r){
	rectMode(CENTER)
	fill(c);
	strokeWeight(v);
	rect(w, h, r, h);
}

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

// chordsreturn might need a type argument to specify behavior. it is product horrible frequencies with
// one of the synths right now
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
    	wholeBeetsReturn: wholeBeetsReturn,
    	chordsReturn: chordsReturn
  	};

})();


/////////////// SONG ////////////////////


var Song = function (n, place) { //enclose song
	this.name = n;		   
	this.make = function() {
		beepEM = floor(random(56,79));
		Clock.bpm(beepEM);
		var innerSong = (function () {
			var inScore, score, scores = [], syn, fols = [], busses = [], syns = [], m = 4, scorePhrases = floor(random(32,112)), innerSongBus,
			presets = ['bleep', 'bleepEcho', 'rhodes', 'warble', 'calvin'], bassWaveform = ['Saw','Sine','Triangle', 'Square'], 
			presetLeadFMArray = ['bong', 'bong','clarinet', 'glockenspiel', 'glockenspiel', 'glockenspiel'],
			presetLeadMonoArray = ['lead', 'semiHorn', 'preTester'];
			padPresets = ['cascade', 'calvin'],
			//pad2Presets = ['pad2','pad4', 'rainTri' ];
			pad2Presets = ['triTest'];
			//it can all happen in here. handle each score, handle each instrument
			// array of syn objects can live here but be changed by a public method
			// syns = [];
			// public method to restart clears objects
			// syn is the object to be effected... how to assign?
			// privtely fill details of score
		    // check the time function will be calling module.clear method to start over
		    // use a circle ? for each follow... needs to be referenced from draw. call method from draw? how
		    // will that work?
			var scoreDetails = function(m) {
				  var functions = [], oct = [-12,-12,-12,0,0,0,12,12], steps = [], 
				  newM, newS, newF, newC, pm, sto, beetsVar; 
				  //= Harmony.beetsReturn(1);
				  if (syns[m][1] == 'bass'){
				  //	if(syns[m][1].pre = 'xx') {
				  		newM = function() {
				  			//console.log('bass line' + syns[m][1] + syns[m][0]);
				  			var nR = Harmony.bassLineReturn();
				  			bV = Harmony.beetsReturn(2, floor(random(1,2)));
				  			syns[m][0].note.seq(nR, bV);
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
				 
				  else if (syns[m][1] == 'lead') {
				  	if (syns[m][1].pre == 'brass') {
				  		newM = function() {
				  			console.log('brass lead newM' + syns[m][1] + syns[m][0])
				  			var nR = Harmony.notesReturn(0, 1, 4);
				  			bV = Harmony.beetsReturn(2, floor(random(1,3)));
				  			syns[m][0].note.seq(nR, bV);
				  		},
				  		newF = function() {
				  			console.log('brass lead newF' + syns[m][1] + syns[m][0])
				  			var nR = Harmony.notesReturn(0, 1, 8);
				  			bV = Harmony.beetsReturn(4, floor(random(2,4)));
				  			syns[m][0].note.seq(nR, bV);
				  		},
				  		pm = function() {
				  			var nR = Harmony.chordsReturn(floor(random(2,24)), 2);
				  			bV = Harmony.beetsReturn(2, floor(random(1,3)));
				  			syns[m][0].note.seq(nR, bV);
				  		}

				  		
				  	}
				  	else {
				  		
						newM = function(){
							console.log('lead newM' + syns[m][1] + syns[m][0]);
							var bV = Harmony.wholeBeetsReturn(rotations[floor(random(rotations.length))], floor(random(1,8)));
							var nR = Harmony.melodyReturn(oct[floor(random(oct.length))], bV.length, bV.length);
				  			syns[m][0].note.seq(nR, bV)
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
				  		}, 
					 	newF = function(){
					 		console.log('lead newmelody return' + syns[m][1] + syns[m][0]);
					  		var bV = Harmony.wholeBeetsReturn(rotations[floor(random(rotations.length))], floor(random(1,8)));
							var nR = Harmony.melodyReturn(oct[floor(random(oct.length))], 1, bV.length);
					  		syns[m][0].note.seq(nR, bV)
				      ;}, 
					    pm = function(){
					    	console.log('notes lead pm' + syns[m][1] + syns[m][0]);
					    	var bV = Harmony.wholeBeetsReturn(rotations[floor(random(rotations.length))], floor(random(1,8)));
							
					  		var nR = Harmony.notesReturn(oct[floor(random(oct.length))], 4, bV.length);
					  		
					  		syns[m][0].note.seq(nR, bV)
				      ;}, 
					    sto = function(){
					  		syns[m][0].note.seq.stop()
					  ;};
					}
				   functions = [newS, sto]; 
				}
				else if (syns[m][1] == 'pad'){ 
						newM = function(){
							var nR = Harmony.notesReturn(-12,2,4),
					    	bV = Harmony.wholeBeetsReturn(floor(random(8)), floor(random(1,8)));
	
				  			syns[m][0].note.seq(nR, bV)
					  ;}, 
					 	newC = function(){
					 		console.log('chords' + syns[m][1] + syns[m][0])
					  		var cR = Harmony.chordsReturn(random(floor(2,5)), floor(random(3,6))), 
					  		bV = Harmony.beetsReturn(4, floor(random(1,4)));
					  		syns[m][0].chord.seq(cR, bV)
				      ;}, 
					    pm = function(){
					  		var nR = [0,0,0,0,-1,-1,-1,-1], 
					  		bV = Harmony.beetsReturn(4, floor(random(1,4)));
					  		syns[m][0].note.seq(nR, bV)
				      ;}, 
					    sto = function(){
					  		syns[m][0].note.seq.stop()
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
				for (var i = 0; i < scorePhrases; i++){
				    if (i == 0){
				    	steps.push(0);
				     // console.log(steps[i] + i);
				    }
				    
				    else if (i == 1) {
				    	var n = function(){
				    		 fS = Follow (syns[m][0]);
    						 fols.push(fS);
    						 go = true;
    						// if (syns[m][1] == 'rainTri')
				    	};
				    	steps.push(n);
				    }
				    else if (i == 2) {
				    	steps.push(measures(1));
				    }
				    //prevent seq from hitting stop twice (but this is not accounting for all circumstances, must solve )
				    //sto must always be last ?
				    else if ( steps[i-2] == sto || i-2 == 1) {
				    	var n =  functions[floor(random((functions.length - 1)))] ;
				    	steps.push(n)
				    }
				    else if ((i+2)%2==0 && i !=2 ) {
				      //length of each step
				    	steps.push(measures(vanillaMeasures[floor(random(vanillaMeasures.length))]));
				    //  console.log(steps[i] + i);
				    }
				    
				    else {
				    	var n =  functions[floor(random(functions.length))] ;
				    	steps.push(n);
				    //  console.log(n + i + mm);
				    }
				  }
				return steps;
			};

			return {
				publicSyns: syns,
				publicFols: fols,
				// groupsynths is create a whole group of individual synthcreates
				groupSynths: function(q) {
					// opportunity to return different bus effects based on circumstance
					// bass must be last entry in kinds
					var kinds = ['pad', 'lead', 'bass'], synthKinds = [];
					// q is number of instruments to create
					for (var i = 0; i <= q; i++){
						// if one bass exists already
						if (synthKinds.indexOf('bass') > -1) {
							var k = kinds[floor(random((kinds.length - 1)))];
							synth = new innerSong.synthCreate(i, k, 'oo');
							synth.make(k);
							synthKinds.push(k);
							console.log(k + synthKinds[i]);

						}
						 else {
							var k = kinds[floor(random(kinds.length))];
							synth = new innerSong.synthCreate(i, k, 'oo');
							synth.make(k);
							synthKinds.push(k);
							console.log(synthKinds[i]);
						}
					};
				},
				synthCreate: function (name, kind, pre) {
					var ampVar = .5, 
					leadInstruments = [FM, Synth, Mono], padInstruments = [Synth2];
					  // name - name object, kind - role of instrument (lead, pad etc), pre- preset,
					  //reference item by spot in syns array... current plan is to assign each to specific
					  // spot. syns[0] = lead, 1 = pad, 2 = bass, 4 = lead2, 5 = noise, 6 = drums
					this.name = name;
					   
					this.make = function() {
					var instrumentKind;
					if (kind == 'lead') {
					   	instrumentKind = leadInstruments[floor(random(leadInstruments.length))];
					   	if (instrumentKind == FM){
					   		//pre =  'brass'
					   		pre = presetLeadFMArray[floor(random(presetLeadFMArray.length))];

					   		ampVar = .2
					   }
					  else if (instrumentKind == Synth){
					   		pre = presets[floor(random(presets.length))];
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
					   		pre = presetLeadMonoArray[floor(random(presetLeadMonoArray.length))];
					   		ampVar = .25

					   }
					   


					   // else if (instrumentKind == Pluck){
					   // 		pre = ''
					   // }
					}
					else if (kind == 'pad') {
						ampVar = .2
						var coin = Math.round(Math.random()*2);
    					if (coin == 1) {
							instrumentKind = Synth;
							pre = padPresets[floor(random(padPresets.length))]
							if (pre == 'cascade' || pre == 'warble' || pre == 'calvin') {
					   			ampVar = .1
					   		}
					   		else {
					   			ampVar = .4
					   		}
						}
						else {
							instrumentKind = Synth2;
					    	pre = pad2Presets[floor(random(pad2Presets.length))]
					    	ampVar = .4
					   		
						}

					   	;
					}
					else if (kind == 'bass'){
					  	instrumentKind = Mono;
					   	pre = 'waveBass';
					}

					// else if (kind == 'noise'){
					// 	instrumentKind = Noise;
					// 	pre = 'good';
					// }
					
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
					innerSongBus = Bus().fx.add( //Schizo({chance:.95, pitchChance: 0, rate:ms(beeps/4), length:ms(beeps)}), 
					Reverb('large') ) // right
					innerSongBus.connect();
					innerSongBus.amp(0)
					l = Line(0, 1, 4)
					score= Score([0,
						function(){ 
							//drum = XOX('x*x*', 1/16);
							//drum.fadeIn(4, 1);
							for (var i = 0; i < syns.length; i++){
								syns[i][0]._;
								syns[i][0].connect(innerSongBus);
								var ss = scoreDetails(i);
								scores.push(ss);
		  						inScore = Score(ss).start();
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
		  					llll = new Line(0, .5, 1)
		  					for (var i = 0; i < syns.length; i++) {
		  						syns[i][0].send(b, llll)
		  					}
		  				}, measures(2),
		  				function(){
		  					score.stop();
		  					inScore.stop();
		  					ll = new Line(.5, 0, 2)
		  					//
		  					//drum.fadeOut(4);
		  					innerSongBus.amp(ll);	
		  				}, measures(4),
		  				function(){
		  					go = false;
							for (var j = 0; j < fols.length; j++) {
 		  						fols[j].remove();
 		  					};
		  					for (var i = 0; i < syns.length; i++){
 		  						syns[i][0].kill();
 		  					};
 		  					
		  					lll = new Line(.5, 0, 2)
 		  					//drum.kill();
 		  					
		  					b.fx[0].feedback = .45;
		  					b.fx[0].feedback = lll;
		  					
		  					fols.length = 0;
		  					scores.length = 0;
		  					NewSong(tick);
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
		  				}, measures(10000)]).start();
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


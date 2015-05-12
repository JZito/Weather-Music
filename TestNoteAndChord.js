// to do--- fix for loop in score- set it back to individual score for each instrument
// 
var state, radiuses = [], go = false, fols = [], col, currentSong, mouseHit = false, bgCol, values = [], lerpVar, radius, a = 0, countdown = 140, ticker = 0, uno, vanillaNotes = [12,11,9,7,4,2,0], vanillaMeasures = [1,2,4,6,8,12,16], 
beets = [1, 1/2, 1/4, 1/8,1/16, 1/32], beepEM = 67, rotations = [2,4,6,8], pieces = [],
measureCount = 0, prevColor1, newColor1, prevColor6, newColor6, mainScore, bassWaveform = ['Saw','Sine','Triangle', 'Square'], 
presetLeadArray = ['bass', 'bass','clarinet', 'glockenspiel', 'glockenspiel', 'glockenspiel'];
// brass-- CLOUDY DAY TIME- brass only acceptable if octave is kept low 0  or lower. 
// 

function mousePressed () {
	mouseHit = true;
}
function setup() {
	canvas = createCanvas( windowWidth, windowHeight );
	newColor0 = color(255, 204, 0, 127);
	newColor1 = color (14, 168, 70, 127);
	bgCol = color(175,14,14,255);
	bgColA = color(175,14,14,255);
	colors = [newColor0, newColor1];
	NewSong(0);
};

function CheckTheTime(time) //function check the time
 {
    var previousState = state; 
    state = time;
    if (state != previousState) 
    {
    	console.log('state !=')
    	if (ticker == 0){
    		ticker = 1;
    	}
    	else if (ticker == 1){
    		pieces[0].scoreFadeOut(1);
    		ticker = 2;	
    	}
    	else if (ticker == 2){
    		pieces[1].scoreFadeOut(0);
    		ticker = 1;	
    	}
    }
};

function NewSong(t) {
	song = new Song('ho', t);
	song.make();
	pieces[t].groupSynths(1);
	pieces[t].scoreCreate();

};

function draw() {
	var mult = [10,20,14,16], ww2 = windowWidth / 2, wh2 = windowHeight / 2;
	CheckTheTime(minute());
	noStroke();
    fill(bgCol);
    rect(0, 0, width, height); 
    if (go) {
		for (var i = 0; i < fols.length; i++){
			var value = fols[i].getValue() * mult[i], col = colors[i],
		    radius = ( ww2 > wh2 ? wh2 * value: ww2 * value);
			fill(colors[i])
			strokeWeight(value)
			rect(ww2, wh2, radius, radius);
			CoolSquare(colors[i], value, ww2, wh2, radius  );
		}
	}
    if (a < countdown)
  	{
  		lerpVar = (lerpVar += a % countdown) * .0001;
  	}
};

function CoolSquare(c, v, w, h, r){
	rectMode(CENTER)
	fill(c);
	strokeWeight(v);
	rect(w, h, r, r);
}

////////// HARMONY /////////////////////

var Harmony = (function () {

  	var notesReturn = function (oct, lowRange, highRange) {
  		var scoreNotes = [];
    	for (var i = 0; i < floor(random(lowRange,highRange)); i++) {
      		scoreNotes[i] = vanillaNotes[floor(random(0,vanillaNotes.length))] + oct;
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
    	melodyReturn: melodyReturn,
    	beetsReturn: beetsReturn,
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
			var score, scores = [], syn, busses = [], syns = [], m = 4, scorePhrases = 9, innerSongBus,
			presets = ['bleep', 'bleepEcho', 'rhodes', 'warble'], 
			padPresets = ['cascade']
			pad2Presets = ['pad2','pad4', 'rainTri' ];
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
				  var functions = [], it = syns[m][1], oct = [-12,-12,-12,0,0,0,12,12], steps = [], newM, newF, newC, pm, sto, beetsVar; 
				  //= Harmony.beetsReturn(1);
				  console.log (it + syns[m][0])
				  
				 
				  if (it == 'lead') {
				  	if (it.pre == 'brass') {
				  		newM = function() {
				  			console.log('brass lead newM' + it + syns[m][0])
				  			var nR = Harmony.notesReturn(0, 1, 4);
				  			bV = Harmony.beetsReturn(2, floor(random(1,3)));
				  			syns[m][0].note.seq(nR, bV);
				  		},
				  		newF = function() {
				  			console.log('brass lead newF' + it + syns[m][0])
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
				  		bV = Harmony.beetsReturn(rotations[floor(random(rotations.length))], floor(random(2,4)));
						newM = function(){
							console.log('lead newM' + it + syns[m][0]);
							var nR = Harmony.melodyReturn(oct[floor(random(oct.length))], 1, 4);

				  			syns[m][0].note.seq(nR, bV)
					  ;}, 
					 	newF = function(){
					 		console.log('lead newmelody return' + it + syns[m][0]);
					  		var nR = Harmony.melodyReturn(oct[floor(random(oct.length))], 1, 4)
					  		syns[m][0].note.seq(nR, bV)
				      ;}, 
					    pm = function(){
					    	console.log('notes lead pm' + it + syns[m][0]);
					  		var nR = Harmony.notesReturn(oct[floor(random(oct.length))], 4, 8);
					  		
					  		syns[m][0].note.seq(nR, bV)
				      ;}, 
					    sto = function(){
					  		syns[m][0].note.seq.stop()
					  ;};
					}
				   functions = [newM, newF, pm, sto]; 
				}
				else if (it == 'pad'){ 
						newM = function(){
							var nR = Harmony.notesReturn(-12,2,4),
							bV = Harmony.beetsReturn(2, floor(random(1,8)));	  							
				  			syns[m][0].note.seq(nR, bV)
					  ;}, 
					 	newC = function(){
					 		console.log('chords' + it + syns[m][0])
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
				for (var i = 0; i < scorePhrases; i++){
				    if (i == 0){
				    	steps.push(0);
				     // console.log(steps[i] + i);
				    }
				    //prevent seq from hitting stop twice (but this is not accounting for all circumstances, must solve )
				    else if (i == 1) {
				    	var n = function(){
				    		followLead = Follow (syns[m][0]);
    						fols.push(followLead);
    						go = true;
				    	};
				    	steps.push(n);
				    }
				    else if (i == 2) {
				    	steps.push(measures(1));
				    }

				    else if ( steps[i-2] == sto) {
				    	var n =  functions[floor(random(functions.length - 1))] ;
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
				// groupsynths is create a whole group of individual synthcreates
				groupSynths: function(q) {
					// opportunity to return different bus effects based on circumstance
					
					// q is number of instruments to create
					for (var i = 0; i <= q; i++){
						var coin = Math.round(Math.random()*2);
						if (coin == 1){
							synth = new innerSong.synthCreate(i, 'pad', 'oo');
							synth.make();
						}
						else {
							synth = new innerSong.synthCreate (i, 'lead', 'oo');
							synth.make();
						}
					};
				},
				testReturn: function(){
					console.log(n + 'testReturn');
				},
				synthCreate: function (name, kind, pre) {
					var ampVar = .5, 
					leadInstruments = [FM, Synth], padInstruments = [Synth2];
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
					   		pre = presetLeadArray[floor(random(presetLeadArray.length))];
					   }
					   else if (instrumentKind == Synth){
					   		pre = presets[floor(random(presets.length))];
					   		if (pre = 'cascade' || 'warble') {
					   			ampVar = .1
					   		}
					   		else {
					   			ampVar = .5
					   		}
					   }
					   // else if (instrumentKind == Pluck){
					   // 		pre = ''
					   // }
					}
					else if (kind == 'pad') {
					   	instrumentKind = Synth2;
					    pre = pad2Presets[floor(random(pad2Presets.length))];
					}
					else if (kind == 'bass'){
					  	instrumentKind = Mono;
					   	pre = 'waveBass';
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
					name._;
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
				clearr: function(c) {
					console.log (syns[c][0] + "kill")
					syns[c][0].kill();

				}, 
				scoreCreate: function() {
					var beeps = floor((60/beepEM) *1000);
					console.log(beeps);
					innerSongBus = Bus().fx.add( //Schizo({chance:.95, pitchChance: 0, rate:ms(beeps/4), length:ms(beeps)}), 
					Reverb('large') ) // right
					innerSongBus.connect();
					innerSongBus.amp(0)
					l = Line(0, 1, 4)
					score= Score([0,
						function(){ 
							drum = XOX('x*x*', 1/16);
							drum.fadeIn(4, 1);
							for (var i = 0; i < syns.length; i++){
								syns[i][0].connect(innerSongBus);
								console.log ("still running for some reason" + syns[i][0])
								var ss = scoreDetails(i);
								scores.push(ss);
		  						inScore = Score(ss).start();
		  					}
		  					innerSongBus.amp = l;
						}, measures(4),
		  				function(){
		  					l.kill();
		  					//innerSongBus.amp = 1;
		  				}, measures(6800)]).start().loop();
		  			},
		  		scoreFadeOut: function(tick) {
		  			var b, lllll, ll, lll;
		  			scoreFade = Score([0,
		  				function () {
		  					b = Bus().fx.add (Delay(1/6,.95 ));
		  					llll = new Line(0, .5, 1)
		  					for (var i = 0; i < syns.length; i++) {
		  						syns[i][0].send(b, l)
		  					}
		  				}, measures(2),
		  				function(){
		  					ll = new Line(.5, 0, 2)
		  					drum.fadeOut(4);
		  					innerSongBus.amp(ll);
		  					
		  				}, measures(4),
		  				function(){
		  					
		  					for (var i = 0; i < syns.length; i++){
		  						innerSong.clearr(i);
		  					}

		  					lll = new Line(.5, 0, 2)
		  					drum.kill();
		  					NewSong(tick);
		  					b.fx[0].feedback = lll;
		  				}, measures(8),
		  				function(){
		  					score.stop();
		  					inScore.stop();
		  					innerSongBus.kill();
		  					b.kill();
		  					llll.kill();
		  					ll.kill();
		  					lll.kill();
		  				}, measures(1)]).start();
		  			}
		  		};
			})();//inner song enclosure
		pieces[place] = innerSong;
		//currentSong = pieces[place];
		//SquareDraw(pieces[place]);
	}

}; //new enclosure 


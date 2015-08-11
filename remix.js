//GLOBAL VARIABLES
//START FUNCTION
//DRAW FUNCTION
// SONG CHANGER / TIME CHECKER
// SONG OBJECT

//EFFECTS UPDATER

function start () {
	var beeps = floor((60/beepEM) *1000);
	console.log(beeps + 'bpm');
	innerSongBus = Bus().fx.add( //Schizo({chance:.95, pitchChance: 0, rate:ms(beeps/4), length:ms(beeps)}), 
	Reverb('large') ) // right
	innerSongBus.connect();
	innerSongBus.amp(0)
	l = Line(0, 1, 4);
	s = syns.length;
	for (p = 0; p > s; p++){ 
		syns[i][0]._;
		syns[i][0].connect(innerSongBus);
	}
	innerSongBus.amp = l;
	var count = 0,
	// aSong = Seq( function() { 
	// //have a count to determine how many synth gets switched and which doesn't, not just length of array
	// // array of objects to change, objects to stop and objcts to leave alone?
	// 	for (i = 0; i < s; i++){
	// 		Updater(i, count);
	// 		randomCount = 4;
	// 		done = false;
	// 	}
	// 	noteLog.push(currentSeqs)
	// 	count++;
	// 	}, randomCount ); // every one measures
	scoreInSong = Score([0,
		function(){
			for (i = 0; i < s; i++){
				Updater(i, count);
				randomCount = 4;
				done = false;
		}
		noteLog.push(currentSeqs)
		count++;
		}, measures(randomCount)
		]).start().loop();
}


// function EffectsUpdater (place) {
// 	var clear = false, coin = CoinReturn(), theBus = busses[place], anotherCoin = CoinReturn(),
// 	boop =	floor(random(theBus.fx.length));
// 	//	if (anotherCoin == 1) {
// 		var effector = theBus.fx[boop];
// 		if (effector){
// 			var index, n = effector.name, fxPL=effectsProperties.length;
// 			//get the place of the effector.name in the presets/properties array
// 			for (var i = 0; i < fxPL; i++) {
// 				if (effectsProperties[i][0] == n) {
// 			    	index = i;
// 			    	break;
// 			  	}	
// 			}
// 			// get random number length of the effects properties of this particular effect
// 			var g = floor(random(1,effectsProperties[index].length)),
// 			// it is the property to change
// 			low = effectsProperties[index][g][1], high = effectsProperties[index][g][2];
// 			it = effectsProperties[index][g][0];
// 			// if this only has two entries (min, max ((plus its name at [0]))
// 			if (effectsProperties[index][g].length <= 3){
// 				q = random(low, high) ;
// 			}
// 			//if it has more than two, it's probably specific/time based so choose a specific entry
// 			else if (effectsProperties[index][g].length >= 4) {
// 				q = effectsProperties[index][g][4];
// 			//	q = random(effectsProperties[index][g][1],effectsProperties[index][g][2]) ;

// 			}
// 			effector.it =q;
// 			fols[place] = Follow(busses[place]);
// 		}
// 	else if (!effector) {
// 		console.log ("no effector     " + boop)
// 	}

// }

// var Song = function (n, place) { //enclose song
// 	this.name = n;		   
// 	this.make = function() {
// 		beepEM = floor(random(56,79));
// 		Clock.bpm(beepEM);
// 		var innerSong = (function () {
// 			var inScore, arp, arps = [],score,  mezhure, mezhures = [], mezhuresAlreadyAdded = [], scores = [], syn, kindsAlreadyAdded = [], fols = [], busses = [], syns = [], m = 4, scorePhrases = floor(random(32,112)), innerSongBus,
// 			presets = ['bleep', 'bleepEcho', 'rhodes', 'warble', 'calvin'], bassWaveform = ['Saw','Sine','Triangle', 'Square'], 
// 			presetLeadFMArray = ['bong', 'bong','clarinet', 'glockenspiel', 'glockenspiel', 'glockenspiel'],
// 			presetLeadMonoArray = ['semiHorn', 'preTester'];
// 			padPresets = ['cascade', 'calvin'],
// 			arpPatternArray = ['updown2', 'updown', 'down', 'up'],
// 			//pad2Presets = ['pad2','pad4', 'rainTri' ];
// 			pad2Presets = ['triTest'];
// 			//it can all happen in here. handle each score, handle each instrument
// 			// array of syn objects can live here but be changed by a public method
// 			// syns = [];
// 			// public method to restart clears objects
// 			// syn is the object to be effected... how to assign?
// 			// privtely fill details of score
// 		    // check the time function will be calling module.clear method to start over
// 			var scoreDetails = function(m, scoreType) {
// 				// there's array scores... if scores[i] index of blah blah, do blah blah, else do blah blah?
// 				//an additional array, if the rotations are brief, if there are less than x notes, classify as
// 				// blah blah, if conditions are otherwise, clsassify it as blah blah bloo
// 				// good for things like arp?? if afternoon or night, arp .. if more than two arps, no more arps
// 				// if midnight no arp, if 6 am- noon one arp only... things like that?
// 				//if pad exists twice, one be chords, one be slow lead for tensions
// 				// if rhodes exists twice, have one return chords (intervals maybe), one return melody

// 				  var arpie, functions = [], oct = [-12,-12,-12,0,0,0,12,12], steps = [], 
// 				  newM, newS, newF, newC, pm, sto, beetsVar; 
// 				  if (syns[m][1] == 'bass'){
// 				  //	if(syns[m][1].pre = 'xx') {
// 				  		newM = function() {
// 				  			//console.log('bass line' + syns[m][1] + syns[m][0]);
// 				  			var nR = Harmony.bassLineReturn();
// 				  			bV = Harmony.beetsReturn(2, floor(random(1,2)));
// 				  			syns[m][0].note.seq(nR, bV);
// 				  		},
// 				  		newF = function() {
// 				  			//console.log('bass line newF melody style' + syns[m][1] + syns[m][0])
// 				  			var nR = Harmony.notesReturn(0, 1, 8);
// 				  			bV = Harmony.beetsReturn(4, floor(random(2,4)));
// 				  			syns[m][0].note.seq(nR, bV);
// 				  		},
// 				  		pm = function() {
// 				  			var nR = Harmony.notesReturn(floor(random(2,4)), 2);
// 				  			bV = Harmony.beetsReturn(2, floor(random(1,3)));
// 				  			syns[m][0].note.seq(nR, bV);
// 				  		},
// 				  		sto = function(){
// 					  		syns[m][0].note.seq.stop()
// 					  ;}
// 				//  	}
// 				  	 functions = [newM, newF, pm, sto];
// 				  }
				 
// 				else if (syns[m][1] == 'lead') {
// 				  	if (!scores[m-1]) { 
// 				  	  	arper = function(){
// 				  			console.log("arper arper bb");
// 				  			//var arpie = arps[m];
// 				  			arpie = Arp([12,24,12,19], 1/12, 'down', 2)
// 				  			var nR = Harmony.notesReturn(0,1,8),
// 				  			bV = Harmony.beetsReturn(4, 1);
// 				  			arpie.target = syns[m][0];
// 				  			//arpie.chord.seq([12,11,7], 1);
// 				  			//arpie.seq.start();
// 				  			//syns[m][0].note.seq([12,12,12], 1/2)

// 				  		},
// 				  		arperStop = function(){
// 				  			//var arpie = arps[m];
// 				  			console.log("arp stop other")
// 				  			arpie.seq.stop();
// 				  		},
				  		
// 						newM = function(){
// 							console.log('lead newM' + syns[m][1] + syns[m][0]);
// 							var bV = Harmony.wholeBeetsReturn(rotations[floor(random(rotations.length))], floor(random(1,8)));
// 							var nR = Harmony.melodyReturn(oct[floor(random(oct.length))], bV.length, bV.length);
// 				  			syns[m][0].note.seq(nR, bV)
// 					  ;}, 
// 					  /// function for series of melodies
// 				  		newS = function () {
// 				  			var count = 0, rot = rotations[floor(random(rotations.length))], 
// 				  			bV = Harmony.wholeBeetsReturn(.5, floor(random(1,16))), 
// 				  			nR = Harmony.melodyReturn(oct[floor(random(oct.length))], bV.length, bV.length),
// 				  			nR2 = Harmony.rewriteMelodyReturn(nR);
// 				  			s = Score([0,
// 				  				function(){
// 				  					syns[m][0].note.seq(nR, bV)
// 				  				}, measures(rot),
// 				  				function(){
// 				  					syns[m][0].note.seq(nR2, bV)
// 				  				}, measures(rot)]).start()
// 				  		}, 
// 					 	newF = function(){
// 					 		console.log('lead newmelody return' + syns[m][1] + syns[m][0]);
// 					  		var bV = Harmony.wholeBeetsReturn(rotations[floor(random(rotations.length))], floor(random(1,8)));
// 							var nR = Harmony.melodyReturn(oct[floor(random(oct.length))], 1, bV.length);
// 					  		syns[m][0].note.seq(nR, bV)
// 				        ;}, 
// 					    pm = function(){
// 					    	console.log('notes lead pm' + syns[m][1] + syns[m][0]);
// 					    	var bV = Harmony.wholeBeetsReturn(rotations[floor(random(rotations.length))], floor(random(1,8)));
// 							var nR = Harmony.notesReturn(oct[floor(random(oct.length))], 4, bV.length);
// 					  		syns[m][0].note.seq(nR, bV)
// 				        ;}, 
// 					    sto = function(){
// 					  		syns[m][0].note.seq.stop()
// 					    ;};	
					
// 					functions = [arper, arperStop, pm, newF, newS, newM, sto]; 
// 				}// if scores[i] does not exist
// 				else {
// 					if (kindsAlreadyAdded.indexOf('lead') > -1) { 
// 				  		//if lead already exists, use supportBeetsReturn
				  	
// 					  	arper = function(){
// 				  			//var arpie = arps[0];
// 				  			arpie = Arp([24,24], 1/12, 'down', 2)
// 				  			console.log("arper arper gg");
// 				  			var nR = Harmony.notesReturn(0,1,8),
// 				  			bV = Harmony.beetsReturn(4, 1);
// 				  			arpie.target = syns[m][0];
// 				  			arpie.chord.seq([nR, nR], 2)
// 				  			arpie.seq.speed = 1/32;
// 				  			//syns[m][0].note.seq([-12,-12,-12], 1/32);

// 				  		},
// 				  		arperStop = function(){
// 				  			//var arpie = arps[0];
// 				  			console.log("arp stop working")
// 				  			arpie.seq.stop();
// 				  		},

// 						newM = function(){
// 							console.log('lead newM' + syns[m][1] + syns[m][0]);
// 							var bV = Harmony.supportBeetsReturn(rotations[floor(random(rotations.length))], floor(random(1,4)));
// 							var nR = Harmony.melodyReturn(oct[floor(random(oct.length))], bV.length, bV.length);
// 				  			syns[m][0].note.seq(nR, bV)
// 					  ;}, 
// 					  /// function for series of melodies
// 				  		newS = function () {
// 				  			console.log("new s bro")
// 				  			var count = 0, rots = [2,2,3,4,4,6], 
// 				  			rot = rots[floor(random(rots.length))],
// 				  			bV = Harmony.supportBeetsReturn(1, floor(random(1,8))), 
// 				  			nR = Harmony.melodyReturn(oct[floor(random(oct.length))], bV.length, bV.length),
// 				  			nR2 = Harmony.rewriteMelodyReturn(nR);
// 				  			s = Score([0,
// 				  				function(){
// 				  					syns[m][0].note.seq(nR, bV)
// 				  				}, measures(rot),
// 				  				function(){
// 				  					syns[m][0].note.seq(nR2, bV)
// 				  				}, measures(rot)]).start().loop()
// 				  		}, 
// 					 	newF = function(){
// 					 		var bV = Harmony.supportBeetsReturn(rotations[floor(random(rotations.length))], floor(random(1,3)));
// 							var nR = Harmony.melodyReturn(oct[floor(random(oct.length))], 1, bV.length);
// 					  		syns[m][0].note.seq(nR, bV)
// 				      ;}, 
// 					    pm = function(){
// 					    	console.log('notes lead pm' + syns[m][1] + syns[m][0]);
// 					    	var bV = Harmony.supportBeetsReturn(rotations[floor(random(rotations.length))], floor(random(1,8)));
							
// 					  		var nR = Harmony.notesReturn(oct[floor(random(oct.length))], 4, bV.length);
					  		
// 					  		syns[m][0].note.seq(nR, bV)
// 				      ;}, 
// 					    sto = function(){
// 					  		syns[m][0].note.seq.stop()
// 					  ;};
// 				  	functions = [arper, arperStop, newM, newS, newF, sto]; 
// 					} // if lead exists enclosure  
// 				  	else {	
// 					  	arper = function(){
// 				  			console.log("arper arper bb");
// 				  			var nR = Harmony.notesReturn(0,1,8),
// 				  			bV = Harmony.beetsReturn(4, 1);
// 				  			//arp.target = syns[m][0];
// 				  			syns[m][0].note.seq(nR, bV);
// 				  			//syns[m][0].note.seq([12,12,12], 1/2)

// 				  		},
// 				  		arperStop = function(){
// 				  			console.log("arp stop other")
// 				  			arp.seq.stop();
// 				  		},
				  		
// 						newM = function(){
// 							console.log('lead newM' + syns[m][1] + syns[m][0]);
// 							var bV = Harmony.wholeBeetsReturn(rotations[floor(random(rotations.length))], floor(random(1,8)));
// 							var nR = Harmony.melodyReturn(oct[floor(random(oct.length))], bV.length, bV.length);
// 				  			syns[m][0].note.seq(nR, bV)
// 					  ;}, 
// 					  /// function for series of melodies
// 				  		newS = function () {
// 				  			var count = 0, rot = rotations[floor(random(rotations.length))], 
// 				  			bV = Harmony.wholeBeetsReturn(.5, floor(random(1,16))), 
// 				  			nR = Harmony.melodyReturn(oct[floor(random(oct.length))], bV.length, bV.length),
// 				  			nR2 = Harmony.rewriteMelodyReturn(nR);
// 				  			s = Score([0,
// 				  				function(){
// 				  					syns[m][0].note.seq(nR, bV)
// 				  				}, measures(rot),
// 				  				function(){
// 				  					syns[m][0].note.seq(nR2, bV)
// 				  				}, measures(rot)]).start()
// 				  		}, 
// 					 	newF = function(){
// 					 		console.log('lead newmelody return' + syns[m][1] + syns[m][0]);
// 					  		var bV = Harmony.wholeBeetsReturn(rotations[floor(random(rotations.length))], floor(random(1,8)));
// 							var nR = Harmony.melodyReturn(oct[floor(random(oct.length))], 1, bV.length);
// 					  		syns[m][0].note.seq(nR, bV)
// 				      ;}, 
// 					    pm = function(){
// 					    	console.log('notes lead pm' + syns[m][1] + syns[m][0]);
// 					    	var bV = Harmony.wholeBeetsReturn(rotations[floor(random(rotations.length))], floor(random(1,8)));
							
// 					  		var nR = Harmony.notesReturn(oct[floor(random(oct.length))], 4, bV.length);
					  		
// 					  		syns[m][0].note.seq(nR, bV)
// 				      ;}, 
// 					    sto = function(){
// 					  		syns[m][0].note.seq.stop()
// 					  ;};
// 				} // else lead does not exist
// 				   functions = [arper, arperStop, newS, pm, newF, newM, sto]; 

// 			}
// 				// 	else if (scores[m-1]){
// 				// 		console.log("boo boo");
// 				// 		if (scores[m-1].indexOf(newS) > -1) {

// 				// 		console.log("scores i - 1")
// 				// 	}
// 				// } 
// 				// elsse if syns is a lead enclosure
// 			}
// 				else if (syns[m][1] == 'pad'){ 
// 						newM = function(){
// 							var nR = Harmony.notesReturn(-12,2,4),
// 					    	bV = Harmony.wholeBeetsReturn(floor(random(8)), floor(random(1,8)));
	
// 				  			syns[m][0].note.seq(nR, bV)
// 					  ;}, 
// 					 	newC = function(){
// 					 		console.log('chords' + syns[m][1] + syns[m][0])
// 					  		nR = Harmony.chordsReturn(random(floor(2,5)), floor(random(3,6))), 
// 					  		bV = Harmony.beetsReturn(4, floor(random(1,4)));
// 					  		syns[m][0].chord.seq(nR, bV)
// 				      ;}, 
// 					    pm = function(){
// 					  		var nR = [0,0,0,0,-1,-1,-1,-1], 
// 					  		bV = Harmony.beetsReturn(4, floor(random(1,4)));
// 					  		syns[m][0].note.seq(nR, bV)
// 				      ;}, 
// 					    sto = function(){
// 					  		syns[m][0].note.seq.stop()
// 					  ;};
// 				   functions = [newM, newC, pm, sto]; 
// 				}
// 				// else if (syns[m][1] == 'noise'){
// 				// 	newN = function(){
// 				// 		var bV = Harmony.wholeBeetsReturn(rotations[floor(random(rotations.length))], floor(random(1,8)));
// 				// 		syns[m][0].note.seq(floor(random(-12,36)), bV * 8);
// 				// 	},
// 				// 	sto = function(){
// 				// 		syns[m][0].note.seq.stop();
// 				// 	}

// 				// 	functions = [newN, sto];
// 				// }
// 				//CREATE AN ARRAY FILLED WITH THE ROTATION COUNTS THEN SUM THE ARRAY
// 				//
// 				for (var i = 0; i < scorePhrases; i++){
// 				    if (i == 0){
// 				    	steps.push(0);
// 				     // console.log(steps[i] + i);
// 				    }
				    
// 				    else if (i == 1) {
// 				    	var n = function(){
// 				    		 fS = Follow (syns[m][0]);
//     						 fols.push(fS);
//     						 go = true;
//     						// if (syns[m][1] == 'rainTri')
// 				    	};
// 				    	steps.push(n);
// 				    }
// 				    else if (i == 2) {

// 				    	steps.push(measures(1));
// 				    }
// 				    //prevent seq from hitting stop twice (but this is not accounting for all circumstances, must solve )
// 				    //sto must always be last ?
// 				    else if ( steps[i-2] == sto || i-2 == 1) {
// 				    	var n =  functions[floor(random((functions.length - 2)))] ;
// 				    	steps.push(n)
// 				    }
// 				    else if ((i+2)%2==0 && i !=2 ) {
// 				      //length of each step
// 				      	var mezh = measures(vanillaMeasures[floor(random(vanillaMeasures.length))]);
// 				    	steps.push(mezh);
// 				    	mezhures.push(mezh);
// 				    //  console.log(steps[i] + i);
// 				    }
				    
// 				    else {
// 				    	var n =  functions[floor(random(functions.length))] ;
// 				    	steps.push(n);
// 				    //  console.log(n + i + mm);
// 				    }
// 				}
// 				mezhuresAlreadyAdded.push(mezhures)
// 				kindsAlreadyAdded.push(syns[m][1])
// 				return steps;
// 			};

// 			return {
// 				publicSyns: syns,
// 				publicFols: fols,
// 				// groupsynths is create a whole group of individual synthcreates
// 				groupSynths: function(q) {
// 					// opportunity to return different bus effects based on circumstance
// 					// bass must be last entry in kinds
// 					var kinds = ['pad', 'lead', 'bass'], synthKinds = [];
// 					// q is number of instruments to create
// 					for (var i = 0; i <= q; i++){
// 						// if one bass exists already
// 						if (synthKinds.indexOf('bass') > -1) {
// 							//var k = kinds[floor(random((kinds.length - 1)))];
// 							var k = 'pad';
// 							synth = new innerSong.synthCreate(i, k, 'oo');
// 							synth.make(k);
// 							synthKinds.push(k);
// 							console.log(k + synthKinds[i]);

// 						}
// 						 else {
// 							var k = 'pad';
// 							synth = new innerSong.synthCreate(i, k, 'oo');
// 							synth.make(k);
// 							synthKinds.push(k);
// 							console.log(synthKinds[i]);
// 						}
// 					};
// 				},
// 				synthCreate: function (name, kind, pre) {
// 					var ampVar = .5, 
// 					leadInstruments = [FM, Synth, Mono], padInstruments = [Synth2];
// 					  // name - name object, kind - role of instrument (lead, pad etc), pre- preset,
// 					  //reference item by spot in syns array... current plan is to assign each to specific
// 					  // spot. syns[0] = lead, 1 = pad, 2 = bass, 4 = lead2, 5 = noise, 6 = drums
// 					this.name = name;
					   
// 					this.make = function() {
// 					var instrumentKind;
// 					if (kind == 'lead') {
// 					   	instrumentKind = leadInstruments[floor(random(leadInstruments.length))];
// 					   	if (instrumentKind == FM){
// 					   		//pre =  'brass'
// 					   		pre = presetLeadFMArray[floor(random(presetLeadFMArray.length))];

// 					   		ampVar = .2
// 					   }
// 					  else if (instrumentKind == Synth){
// 					   		pre = presets[floor(random(presets.length))];
// 					   		if (pre == 'cascade' || pre == 'warble') {
// 					   			ampVar = .2
// 					   		}
// 					   		else if (pre == 'calvin') {
// 					   			ampVar = .15
// 					   		}
// 					   		else {
// 					   			ampVar = .5
// 					   		}
// 					   }
// 					   else if (instrumentKind == Mono){
// 					   		pre = presetLeadMonoArray[floor(random(presetLeadMonoArray.length))];
// 					   		ampVar = .25
// 					   }
// 					}
// 					else if (kind == 'pad') {
// 						ampVar = .2
// 						var coin = Math.round(Math.random()*2);
//     					if (coin == 1) {
// 							instrumentKind = Synth;
// 							pre = padPresets[floor(random(padPresets.length))]
// 							if (pre == 'cascade' || pre == 'warble' || pre == 'calvin') {
// 					   			ampVar = .1
// 					   		}
// 					   		else {
// 					   			ampVar = .4
// 					   		}
// 						}
// 						else {
// 							instrumentKind = Synth2;
// 					    	pre = pad2Presets[floor(random(pad2Presets.length))]
// 					    	ampVar = .4	
// 						};
// 					}
// 					else if (kind == 'bass'){
// 					  	instrumentKind = Mono;
// 					   	pre = 'waveBass';
// 					}
					
// 					name = instrumentKind(pre)
// 					name.amp (ampVar)
					
// 					console.log(name + ' . ' + instrumentKind + ' . ' + pre + ' . ' + name)
// 					// if want to add fx, call fxObj = new FX(blah blah)
// 					//fxObj.make();
// 					//name.fx.add(fxObj);
// 					var valueToPush = new Array();
// 							valueToPush[0] = name;
// 							valueToPush[1] = kind;
// 					syns.push(valueToPush);
// 					//name._;
// 					    // pluck is very quiet
// 				  }
// 				},
// 				// FX: function(name, kind, syn) {
//   		// 			var effects = [];
// 				// 	this.name = name;
// 				// 	this.make = function() {
// 				//     var bd = 'bitDepth:' + 2,
// 				//        sr= 'sampleRate:' + Math.round(random(0.01,0.05) * 100) / 100,
// 				//        t = {'time:' + 1/8}
// 				//     //Gibber formatting
// 				// //ex  synthName =  Synth('preset')
// 				// // 
// 				//     name = kind(t);
// 				//     effects.push(name);
// 				//  //push effects array to new, third slot in syns array
// 				//    // console.log(bd + sr)
// 				//   };
// 				// },
				
// 				scoreCreate: function() {
// 					var beeps = floor((60/beepEM) *1000);
// 					console.log(beeps + 'bpm');
// 					innerSongBus = Bus().fx.add( //Schizo({chance:.95, pitchChance: 0, rate:ms(beeps/4), length:ms(beeps)}), 
// 					Reverb('large') ) // right
// 					innerSongBus.connect();
// 					innerSongBus.amp(0)
// 					l = Line(0, 1, 4)
// 					score= Score([0,
// 						function(){ 
// 							//drum = XOX('x*x*', 1/16);
// 							//drum.fadeIn(4, 1);
// 							for (var i = 0; i < syns.length; i++){
// 								//assign each synth it's own score via scoredetails

// 								syns[i][0]._;
// 								syns[i][0].connect(innerSongBus);
// 								var ss = scoreDetails(i);
// 								scores.push(ss);
// 		  						inScore = Score(ss).start();
// 		  					}
// 		  					innerSongBus.amp = l;
// 						}, measures(4),
// 		  				function(){
// 		  					l.kill();
// 		  				}, measures(6800)]).start();
// 		  			},
// 		  		scoreFadeOut: function(tick) {
// 		  			var b, llll, ll, lll;
// 		  			scoreFade = Score([0,
// 		  				function () {
// 		  					b = Bus().fx.add (Delay(1/6,.95 ));
// 		  					llll = new Line(0, .5, 1)
// 		  					for (var i = 0; i < syns.length; i++) {
// 		  						syns[i][0].send(b, llll)
// 		  					}
// 		  				}, measures(2),
// 		  				function(){
// 		  					score.stop();
// 		  					inScore.stop();
// 		  					ll = new Line(.5, 0, 2)
// 		  					//
// 		  					//drum.fadeOut(4);
// 		  					innerSongBus.amp(ll);
// 		  					NewSong(tick);	
// 		  				}, measures(4),
// 		  				function(){
// 		  					go = false;
// 							for (var j = 0; j < fols.length; j++) {
//  		  						fols[j].remove();
//  		  					};
// 		  					for (var i = 0; i < syns.length; i++){
//  		  						syns[i][0].kill();
//  		  					};
 		  					
// 		  					lll = new Line(.5, 0, 2)
//  		  					//drum.kill();
 		  					
// 		  					b.fx[0].feedback = .45;
// 		  					b.fx[0].feedback = lll;
		  					
// 		  					fols.length = 0;
// 		  					scores.length = 0;
		  					
// 		  				}, measures(1),
// 		  				function(){
// 		  					inScore.stop();
// 		  					score.stop();
//  		  					innerSongBus.kill();
//  		  					b.kill();
// 		  					l.kill();
		  					
// 		  					llll.kill();
// 		  					ll.kill();
// 		  					lll.kill();
// 		  				}, measures(1)]).start();
// 		  			}
// 		  		};
// 			})();//inner song enclosure
// 		pieces[place] = innerSong;
// 		cubeGo  = place;

// 		//currentSong = pieces[place];
// 		//SquareDraw(pieces[place]);
// 	}

// }; //new enclosure 
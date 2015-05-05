var vanillaNotes = [12,11,9,7,4,2,0], vanillaMeasures = [1,2,4,6,8,12,16], beets = [1, 1/2, 1/4, 1/8,1/16, 1/32], beepEM = 77, rotations = [2,4,6,8], measureCount = 0, mainScore;

function setup() {
	canvas = createCanvas( windowWidth, windowHeight );
	Clock.bpm(beepEM);
}

function draw() {
	// background( follow.getValue() * 255 )
	// if (measureCount >= 8){
	// 	mainScore.stop()
	// 	measureCount = 0;
	// }
}
//name = instrumentKind(pre)

var Harmony = (function () {

  	var notesReturn = function (oct, lowRange, highRange) {
  		var scoreNotes = [];
    	for (var i = 0; i < floor(random(lowRange,highRange)); i++) {
      		scoreNotes[i] = vanillaNotes[floor(random(0,vanillaNotes.length))] + oct;
    	}
    	return scoreNotes;
    // public
  	};

  	var beetsReturn = function (mul) {
  		var scoreBeets = [];
    	for (var i = 0; i < floor(random(1,8)); i++) {
      		scoreBeets[i] = beets[floor(random(1,beets.length))] * mul;
    	}
    	return scoreBeets;
  	};

  	var chordsReturn = function (c, cLength) {
  		var chords = [], oct = [-12,-12,-12,0,0,0,12,12,24], pedalPoint = vanillaNotes[floor(random(vanillaNotes.length))];
		console.log(pedalPoint + "returnChordsArray");
		for (var i = 0; i < c; i++){
			var innerChord= [];
			console.log("every loop")
			//create first chord
			if (i == 0){
				for (var j = 0; j < cLength; j++) {
					//first note is pedal point
					if (j==0){
						innerChord.push(pedalPoint)
					}
					else if (j >= 1){
						var n = vanillaNotes[floor(random(vanillaNotes.length))];
						innerChord.push(n + oct[floor(random(oct.length))]);
						console.log("inside first loop")
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
								console.log("o " + " if indexof(o) >= 0 " + o)
								innerChord.push(o + oct[floor(random(oct.length))]);
							}
							//else if new note o is not in key, move it down one more step
							else if (vanillaNotes.indexOf(o) == -1){
								o = o -1;
								console.log("o " + " else " + o)
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
				console.log(innerChord);
		}
		return chords;

  	}
  
  	return {
    	notesReturn: notesReturn,
    	beetsReturn: beetsReturn,
    	chordsReturn: chordsReturn
  	};

})();

var Song = (function () {

	var syn, syns = [], m = 4, scorePhrases = 9,
	presets = ['cascade', 'bleep', 'bleepEcho', 'rhodes', 'warble'],
	padPresets = ['pad2','pad4', 'rainTri' ];
	//it can all happen in here. handle each score, handle each instrument
	// array of syn objects can live here but be changed by a public method
	// syns = [];
	// public method to restart clears objects
	// syn is the object to be effected... how to assign?
	// privtely fill details of score
    // check the time function will be calling module.clear method to start over
    // use a circle ? for each follow... needs to be referenced from draw. call method from draw? how
    // will that work?
	var scoreDetails = function(mm) {
		  var steps = [], 
		  nm = function(){syns[mm].note.seq(varInSeqPar, beetsVar);}, 
		  sp = function(){syns[mm].note.seq(Harmony.notesReturn(-12, 4, 8), beetsVar);}, 
		  pm = function(){syns[mm].note.seq(Harmony.notesReturn(0, 4, 8), Harmony.beetsReturn(1));}, 
		  sto = function(){syns[mm].note.seq.stop();},
		  functions = [nm, sp, pm, sto];
		 // if (rain){
		    varInSeqPar = Harmony.notesReturn(0,16,17);
		    beetsVar = Harmony.beetsReturn(2);
		//  }
		  // else if (mm = musicMakers[2]) {
		  //   varInSeqPar = ReturnBassNotesArray(0,1,2, 2);
		  //   beetsVar = [4,4,4,4,2,2,2,2];
		  // }
		  // else {
		  //   varInSeqPar = Harmony.notesReturntesArray();
		  // }
		  //going to need object score will be referencing
		  for (var i = 0; i < scorePhrases; i++){
		    if (i == 0){
		      steps.push(0);
		     // console.log(steps[i] + i);
		    }
		    //prevent seq from repeating itself (but this is not accounting for all circumstances, must solve )
		    else if (i == 1 || steps[i-2] == sto) {
		      var n =  functions[floor(random(functions.length - 1))] ;
		      steps.push(n)
		    }
		    else if ((i+2)%2==0 ) {
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
		//need a for loop to create each instrument and add to the syn array
		// groupsynths is create a whole group of individual synthcreates
		groupSysnths: function(q) {
			// q is number of instruments to create

		for (var i = 0; i <= q; i++){
			songG = new Song.synthCreate (i, 'lead', 'oo')
			songG.make()
			//Song.scoreCreate(i);
		}
		Song.scoreCreate(0);
		Song.scoreCreate(1);
		Song.scoreCreate(2);
		},
		synthCreate:	  function (name, kind, pre) {
		  var leadInstruments = [FM, Pluck, Synth], padInstruments = [Synth2];
		  // name - name object, kind - role of instrument (lead, pad etc), pre- preset,
		  //reference item by spot in syns array... current plan is to assign each to specific
		  // spot. syns[0] = lead, 1 = pad, 2 = bass, 4 = lead2, 5 = noise, 6 = drums
		  this.name = name;
		   
		  this.make = function() {
		   if (kind == 'lead') {
		    var instrumentKind = leadInstruments[0];
		    // if (instrumentKind == Pluck){
		    //     pre = {};
		    //   }
		    // else if (instrumentKind == Synth){
		    //     pre = presets[floor(random(3))];
		    //   }
		    // else if (instrumentKind != Synth || Pluck){
		    pre = 'glockenspiel';
		      //}
		        //create the synth object 
		    console.log( this.name + " is born " + pre + ' pre ' )
		    name = instrumentKind(pre)
		    if (instrumentKind == Pluck) {
		      name.amp(2.25)
		    }
		    if (!syns[0]){
		      syns.push(name);
		  }
		    else {
		      syns[0] = name;
		    }
		  }

		  // else if (kind == 'pad') {
		  //   var instrumentKind = padInstruments[0],
		  //   pre = padPresets[floor(random(padPresets.length))];
		  //     //create the synth object 
		  //   console.log( this.name + " is born " + pre + ' pre ' )
		  //   name = instrumentKind(pre)
		  //   if (!syns[1]){
		  //     syns.push(name);
		  // }
		  //   else {
		  //     syns[1] = name;
		  //   }
		  // }

		  // else if (kind == 'bass'){
		  //   console.log( this.name + " is born " + pre + ' pre ')
		  //   name = Mono('waveBass')
		  //   syns.push(name);
		  //   }
		  }
		},
		clear: function(c) {
			syns[c].kill();

		}, 
		scoreCreate: function(q) {
			var ss = scoreDetails(q);
  			score = Score(ss).start().loop()
			//s = Score([scoreDetails(syns[q])]).start().loop();
			console.log(q + " . q ")
		}
	} ;

})();
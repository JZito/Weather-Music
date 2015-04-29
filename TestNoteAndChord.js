var vanillaNotes = [12,11,9,7,4,2,0], beets = [1, 1/2, 1/4, 1/8,1/16, 1/32], beepEM = 77, rotations = [2,4,6,8], measureCount = 0, mainScore;

function setup() {
	// var strum = Score([0, function(){
	// 		console.log("struuuummmmmmmmm");
	// 		p.note.seq(notesArray(0, 4,4), [1/59, 1/64, 1/62]);
	// 	}, measures(1/16), function(){
 //  			p.note.seq.stop();
	// 	}, measures(5.9375)]).loop(); 

	// var lovelyGuitar = Score([0, function(){
	// 		console.log("func one")
	// 		pp.note.seq(notesArray(12, 2, 12), ReturnBeetsArray(4))
	// 		ppp.note.seq(notesArray(12,1,2), ReturnBeetsArray(8))
	// 	}, measures(3), function(){
	// 		console.log("function two");
	// 		strum.start()
	// 	}, measures(1)]).loop();

	// var stopper = Score([0, function(){
	// 	lovelyGuitar.stop();

	// }, measures(1)]).loop();

canvas = createCanvas( windowWidth, windowHeight );
Clock.bpm(beepEM);

//GIT
p = Pluck()
pp = Pluck()
ppp = Pluck()
ppp.fx.add(Delay({time:1/16.005, feedback:.5, dry: .45, wet:.75}, Reverb('space')))
//pp.fx.add(Delay({time:.503, feedback:.4, dry: .75, wet:.25}),Reverb({preset:'small', wet:.5, dry:.65}))
//PAD
pad = FM({preset:'radio', maxVoices:4, useADSR:'true', attack:.1, decay:.5, sustain:.25, release:2})
pad.fx.add(Tremolo({amp:.55, frequency:(beepEM / 120.1)}), Reverb('space'))
pad.chord.seq(LeadMelody.chordsReturn(4,4), 4)



// a chord series could pick a pedal point
// for length of chord 1
// choose pedal point
// if next number chosen is = pedal point
// choose a different number 
// 


// score length equals number of chords * random square mult like 2 4 8 16
// next function
// pad.chord.seq.stop




 var strum = function() {
 	strumScore = Score([0, function(){
 			p.note.seq([-12,-8,-5,2], [1/56, 1/64, 1/52]);
 	}, measures(1/16), function(){
  			p.note.seq.stop();
	}, measures(measures[floor(random(measures.length))] + (1-1/16))]).start().loop();
 },
 	lovelyGuitar = function(){
 		l = Score([0, function(){
			pp.note.seq(LeadMelody.notesReturn(-12, 2, 12), LeadMelody.beetsReturn(4))
			ppp.note.seq(LeadMelody.notesReturn(-12,1,2), LeadMelody.beetsReturn(8))
		}, measures(3), strum, measures(1)]).start().loop();
 	}, 

 	stopper = function() {
	 	s = Score([0, function(){
		 	l.stop();
		 	pp.note.seq.stop();
		 	ppp.note.seq.stop();
		 }, measures(1)]).start().loop();
 	},

	parentScore = function() {
	 	 s = Score([0, lovelyGuitar, measures(3), stopper, measures(1)]).start().loop();
	 	//p.note.seq([-1,2,9], 1/16)
 	};

 	score = Score([0, parentScore, measures(654)]).start().loop();
	follow = Follow( pad )
}

function draw() {
	background( follow.getValue() * 255 )
	// if (measureCount >= 8){
	// 	mainScore.stop()
	// 	measureCount = 0;
	// }
}

var LeadMelody = (function () {

  	var privateMethod = function () {
    // private
  	};

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

// function ReturnBeetsArray(mul) {
//   // can declare beat multiplier here by passing it in ()

// }

// function notesArray(oct, lowRange, highRange) {

// }

// function chordArray(oct, lowRange, highRange) {
//     var scoreChord = [];
//     for (var i = 0; i < floor(random(lowRange,highRange)); i++) {
//       scoreChord[i] = vanillaNotes[floor(random(0,vanillaNotes.length))] + oct;
//     }
//     return scoreChord;
// }
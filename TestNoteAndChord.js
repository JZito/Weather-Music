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
p.fx.add(Delay({time:1/16.005, feedback:.5, dry: .45, wet:.75}, Reverb('space')))
//pp.fx.add(Delay({time:.503, feedback:.4, dry: .75, wet:.25}),Reverb({preset:'small', wet:.5, dry:.65}))
//PAD
pad = FM({preset:'radio', maxVoices:4, useADSR:'true', attack:.5, decay:2, sustain:.5, release:.5})
pad.fx.add(Tremolo({amp:.55, frequency:(beepEM / 120.1)}), Reverb('space'))
pad.chord.seq([[-12,-8, -3], [-15, -8, -5], [-10,-5, 4], [2,7,11]], 4)



// a chord series could pick a pedal point
// for length of chord 1
// choose pedal point
// if next number chosen is = pedal point


// score length equals number of chords * random square mult like 2 4 8 16
// next function
// pad.chord.seq.stop




 var strum = function() {
 	strumScore = Score([0, function(){
 		p.note.seq(notesArray(-12, 4,4), [1/78, 1/74, 1/72]);
 	}, measures(1/16), function(){
  			p.note.seq.stop();
		}, measures(measures[floor(random(measures.length))] + (1-1/16))]).start().loop();
 },
 	lovelyGuitar = function(){
 		l = Score([0, function(){
			console.log("func one")
			pp.note.seq(notesArray(-12, 2, 12), ReturnBeetsArray(4))
			ppp.note.seq(notesArray(-12,1,2), ReturnBeetsArray(8))
		}, measures(3), strum, measures(1)]).start().loop();
 	}, 

 	stopper = function() {
 	s = Score([0, function(){
 		console.log('silence')
 	l.stop();
 	pp.note.seq.stop();
 	ppp.note.seq.stop();
 }, measures(1)]).start();

 	},


 // mainS = function() {
 // 	mainScore = Score([0,
 // 	function(){
 		
 // 		p.note.seq([0,4,7], 1/12)
 // 		//lovelyGuitar.start()
 // 		console.log(measureCount);
 // 	}, measures(1),
 // 	function () {
 // 		measureCount++;
 // 		p.note.seq([-1,2,9], 1/12)
 // 		//console.log('here we are');
 // 		console.log(measureCount);
 // 		//stopper.start()
 // 	}, measures(1), 
 // 	function() {
 // 		measureCount++;
 // 		p.note.seq([-3,4,11], 1/12)
 // 		console.log(measureCount);
 // 	//	console.log('stop stopper');
 // 	//	stopper.stop();
 // 	}, measures(1)]).start().loop() }, 
 	
 // stopS = function() {
 // 	s = Score([0, function(){
 // 		console.log('silence')
 // 	mainScore.stop();
 // 	p.note.seq.stop();
 // }, measures(1)]).start();
 // },

parentScore = function() {
	 	 s = Score([0, lovelyGuitar, measures(3), stopper, measures(1)]).start().loop();
	 	//p.note.seq([-1,2,9], 1/16)
 	};

 	score = Score([0, parentScore, measures(654)]).start().loop();

	follow = Follow( pad )





//k = Seq({ note:notesArray(12,2,4), durations:1/16, target:p})
//kk = Seq({ note:notesArray(-12,2,4), durations:[1/8], target:p})
	
}

function draw() {
	background( follow.getValue() * 255 )
	// if (measureCount >= 8){
	// 	mainScore.stop()
	// 	measureCount = 0;
	// }
}

function ReturnBeetsArray(mul) {
  // can declare beat multiplier here by passing it in ()
    var scoreBeets = [];
    for (var i = 0; i < floor(random(1,8)); i++) {
      scoreBeets[i] = beets[floor(random(1,beets.length))] * mul;
    }
    return scoreBeets;
}

function notesArray(oct, lowRange, highRange) {
    var scoreNotes = [];
    for (var i = 0; i < floor(random(lowRange,highRange)); i++) {
      scoreNotes[i] = vanillaNotes[floor(random(0,vanillaNotes.length))] + oct;
    }
    return scoreNotes;
}

function chordArray(oct, lowRange, highRange) {
    var scoreChord = [];
    for (var i = 0; i < floor(random(lowRange,highRange)); i++) {
      scoreChord[i] = vanillaNotes[floor(random(0,vanillaNotes.length))] + oct;
    }
    return scoreChord;
}
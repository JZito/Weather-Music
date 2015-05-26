// sandbox
var ranNotes = [12,11,9,7,5,4,2,0,-1],
beets = [1, 1/1.5, 1/2, 1/2, 1/3, 1/3,1/6, 1/4, 1/4, 1/4,1/8, 1/8,1/8,1/16, 1/16, 1/32],
bR, nR, bR2, nR2, randomCount = 4, stopper, syns = [], busses = [], effector, fols= [];
function setup () {
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
	Clock.bpm(floor(random(55,75)))
	//songBus = Bus().fx.add( Reverb('large'))
	drum = XOX('x*x*x*x-x*x*x*xox*x*x*x-x*x*xxxo', 1/16);
	drum.fx.add(Crush('lowSamp'))
	// m = Mono('semiHorn')
	// m2 = Synth('bleep')
	// m1 = Synth2('rainTri')
	// //drum.send(songBus, .25)
	// m.send(songBus, .45)
	// m2.send(songBus, 1)
	// songBus.amp(1);
 
	// syns.push(m);
	// syns.push(m2);
	// syns.push(m1);
	GroupSynths(4);
	NewScore();

}

function CoolSquare(w, h, r, c, v){
	rectMode(CENTER)
	fill(c);
	strokeWeight(v);
	rect(w, h, r, h);
}

function draw () {
	var mult = [10,20,14,16], ww2 = windowWidth , wh = windowHeight / 2;
		noStroke();
    fill(bgCol);
    rect(0, 0, width, height); 
	for (var i = 0; i < fols.length; i++){
		var value = fols[i].getValue() * mult[i], col = colors[i],

		//        if width greater than height, use wh * value, otherwise use ww2 * value
	    radius = ( wh > ww2 ? ww2 * value: wh * value);
		CoolSquare(ww2, wh, radius, col, value  );
	}
}

 function CheckTheTime(time) //function check the time
 {
    var previousState = state; 
    if (time == 29) 
    {
      state = 'change'; 
    }
    else if (time == 59) 
    {
      state = 'change'; 
    }
    else if (time != 29 || time != 59) 
    {
     state = 'noChange'; 
    }
    if (state != previousState) //state != previousState
    {
     // call weather function
     //loadJSON('http://api.openweathermap.org/data/2.5/weather?q=New%20York,NY&units=imperial', gotWeather);
    print ("call weather change function")
   }
 }

function add(a, b) {
	return a + b;
}

function NewScore() {
	var count = 0, bussed = [];
	a = Seq( function() { 
// array of objects to change, objects to stop and objcts to leave alone?
	for (i = 0; i < syns.length; i++){
		var syn = syns[i][0];
		fS = Follow (syn);
    	fols.push(fS);
		Updater(syn, i);
		//updater should be changer of music, 
		//should also be an effects updater

		//check where each follow is at and revise it as necessary
		//there's a music update function as well as an effects update
		//if the effects has updated, change it
		//follow moves to the follow (fx[fx.length])
	}
	randomCount = floor(random(1,3));
	console.log( count++ ) }, randomCount ) // every one measures
}

function CoinReturn() {
	var coin = Math.round(Math.random()*2);
	return coin;
}

function Stopper () {

}
function Updater (synth, place) {
	var stop = false;
	// stopper is value of synth to get stopped, calling it randomly right now
	stopper = -1;
	// flip a coin
	if (CoinReturn() == 1){
		if (CoinReturn()== 1){
			console.log("hi")
			// if coin is 1, still return notes
			// can be wholebeetsreturn OR supportbeetsreturn OR something else, based on conditions
			bR = Harmony.wholeBeetsReturn(.25, floor(random(1,6)));
			nR = Harmony.melodyReturn(0, bR.length, bR.length); 
			
		}
		else {
			//if coin is 0, stop that randomly chosen sequences
			//a.seq.stop();
			stop = true;
			synth.seq.stop();
			// stopper = floor(random(syns.length));
			// effector = floor(random(syns.length));
			//console.log("should have stopped" + "effector" + effector)
		}
		// bR2 = Harmony.beetsReturn(2, floor(random(1,8)));
		// nR2 = Harmony.notesReturn(0, bR2.length, bR2.length);
		// effector = floor(random(syns.length));

	}
	else {
		bR = Harmony.wholeBeetsReturn(2, floor(random(1,8)));
		nR = Harmony.melodyReturn(bR.length);
		effector = floor(random(syns.length));
		
	}
	if (stop){
		synth.seq.stop();
	}
	else {
		synth.note.seq(nR, bR)
	}
}
// if (i == stopper) {
				
// 		 	}

////////// begin effects mixer and follow function /////////
		// 	else if (i == effector) {
		// 		if( bussed.indexOf(syn) > -1) {
		// 			// if the synth is already bussed,
		// 			// j is the place of synth in bussed
		// 			// might be able to just use i here
		// 			// 
		// 			var j = bussed.indexOf(syn), k = busses[j];
		// 			syn.send(k, 0)
		// 			fols[i] = Follow(syn);
		// 			delete bussed[j];
		// 		}
		// 		else {
		// 			//k is the bus at i
		// 			var k = busses[i];
		// 			// send synth to k
		// 			syn.send(k, 1)
		// 			// change this follow to the bus k
		// 			fols[i] = Follow(k);
		// 			// store the synth in the 'bussed' array
		// 			bussed[i] = syn;
		// 		}
		// 	}
		// 	else {
		// // 		console.log("else")
		// 		syn.note.seq(nR2, bR2);
		// 	}


////////////// end of effects mixer function			// 

// function WholeBeetsReturn(mul, len) {
// 	//multiplier is to double, quadruple etc beat lengths
// 	//len(gth) is how many beets you want returned
// 	var scoreBeets = [], sum;
	
//   	for (var i = 0; i < len; i ++){
//   		//grab some beets
//   		scoreBeets.push(beets[floor(random(beets.length))] * mul);	
//   	}
// 	//add contents of beets array
//   	sum = scoreBeets.reduce(add, 0);
//   	//if the sum is an odd number
//   	if (sum %2 != 0) {
//   	//sumRound is difference between sum and a whole set of measures
//   		var sumRound;
//   	// if sum will not round to 1, is short phrase
//   		if (sum < .5){
//   			sumRound = .5 - sum;
//   			scoreBeets.push(sumRound);
//   		}
//   		else {
//   	// if odd and >= 1,
//   	//don't just round but ceiling the amount up by by one for simplicity 
//   	//(no more negatives to deal with)
// 			sumRound = Math.ceil(sum) - sum; 
//   			if (Math.abs(sum + sumRound) % 2 == 1 && (sum + sumRound) >= 3) {
//   				//if this new, larger sumround plus sum 
//   				//will add up to an odd number like 3, 5, etc add one more to it
//   				sumRound = sumRound + 1;
//  				}
//   	//add the time to the array to make it a full even measure count
//   			scoreBeets.push(sumRound);
//   		}
//   	//	return scoreBeets;
//   	}
//   	return scoreBeets;
// };

// function NotesReturn (len){
// 	var notes = [];
// 	for (var i = 0; i < len; i++){
// 		notes.push(ranNotes[floor(random(ranNotes.length))])
// 	}
// 	return notes;
// };

function GroupSynths(q) {
	var effectsTypes = ['delay', 'schizo', 'vibrato']
	// opportunity to return different bus effects based on circumstance
	// bass must be last entry in kinds
	var kinds = ['pad', 'lead', 'bass'], synthKinds = [];
	// q is number of instruments to create
	for (var i = 0; i <= q; i++){
		// if one bass exists already
		if (synthKinds.indexOf('bass') > -1) {
			//var k = kinds[floor(random((kinds.length - 1)))];
			var k = 'lead';
			synth = new SynthCreate(i, k, 'oo');
			synth.make(k);
			synthKinds.push(k);
			console.log(k + synthKinds[i]);

		}
		 else {
			var k = 'lead';
			synth = new SynthCreate(i, k, 'oo');
			synth.make(k);
			synthKinds.push(k);
			effect = new EFXCreate(i, effectsTypes[floor(random(effectsTypes.length))]);
			effect.make()
			console.log(synthKinds[i]);
		}
	};
}

function SynthCreate(name, kind, pre) {
	var ampVar = .5, 
	presetLeadFMArray = ['bong', 'bong','clarinet', 'glockenspiel', 'glockenspiel', 'glockenspiel'],
	presetLeadMonoArray = ['semiHorn', 'preTester'],
	presetLeadSynthArray = ['bleep', 'bleepEcho', 'rhodes', 'warble', 'calvin'],
	leadInstruments = [FM, Synth, Mono], padInstruments = [Synth2];
	  // name - name object, kind - role of instrument (lead, pad etc), pre- preset,
	  //reference item by spot in syns array... 
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
	   		pre = presetLeadSynthArray[floor(random(presetLeadSynthArray.length))];
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
		};
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
	//name._;
	    // pluck is very quiet
  }
}

function EFXCreate(name, kind) {
	console.log('efxcreate ' + name + kind)
	
	//var ampVar = .5, 
	var efX = [Delay, Schizo, Crush, Tremolo, Vibrato];
	  // name - name object, kind - role of instrument (lead, pad etc), pre- preset,
	  //reference item by spot in syns array... 
	  presetVibratoArray = ['light', 'warped'],
	  presetCrushArray = ['clean', 'lowSamp', 'dirty'],
	  presetDelayArray = ['endless', 'wobbler', 'nightChill'], 
	  presetSchizoArray = ['sane', 'borderline', 'pitchless'];
	this.name = name;
	   
	this.make = function() {
		var efxKind, pre;
		if (kind == 'delay') {
	   		pre = presetDelayArray[floor(random(presetDelayArray.length))];
		//ampVar = .2
			efxKind = Delay;
			//maybe push an array full of variables to declare post creation? 
			//.time, .length, .blah blah custom stuff ?
		}
		else if (kind == 'schizo') {
			pre = presetSchizoArray[floor(random(presetSchizoArray.length))]
			efxKind = Schizo;
		}
		else if (kind == 'vibrato'){
			pre = presetVibratoArray[floor(random(presetVibratoArray.length))]
			efxKind = Vibrato;
		}
		name = efxKind(pre)
		//name.time = [1/4,1/12,1/12,1/4,1/12,1/12];

	
		console.log(name + ' . ' + efxKind + ' . ' + pre + ' . ' + name)
	// if want to add fx, call fxObj = new FX(blah blah)
	//fxObj.make();
	//name.fx.add(fxObj);
		b = Bus().fx.add (name)
		console.log(b + ' b b b b ');
		busses.push(b);
	//name._;
	    // pluck is very quiet
	}
}

Harmony = (function () {

  	var notesReturn = function (oct, lowRange, highRange) {
  		var scoreNotes = [];
    	for (var i = 0; i < floor(random(lowRange,highRange)); i++) {
      		scoreNotes[i] = ranNotes[floor(random(0,ranNotes.length))] + oct;
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
    			if (ranNotes[lastPos + uOrD]){
    				scoreNotes[i] = ranNotes[lastPos + uOrD];
    				console.log(scoreNotes[i])
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
			note = ranNotes[floor(random(ranNotes.length))];
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
				inNotes[i] = ranNotes[floor(random(ranNotes.length))];
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


// chordsreturn might need a type argument to specify behavior. it is product horrible frequencies with
// one of the synths right now
  	var chordsReturn = function (c, cLength) {
  		var chords = [], oct = [-12,-12,-12,0,0,0,12,12], pedalPoint = ranNotes[floor(random(ranNotes.length))];
		for (var i = 0; i < c; i++){
			var innerChord= [];
			if (i == 0){
				for (var j = 0; j < cLength; j++) {
					//first note is pedal point
					if (j==0){
						innerChord.push(pedalPoint)
					}
					else if (j >= 1){
						var n = ranNotes[floor(random(ranNotes.length))];
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
						var n = ranNotes[floor(random(ranNotes.length))];
						//if this note is the same as the note in the same spot of the last chord
						if (n == chords[(i - 1)][j]) {
							//o is new note
							var o = n - 1;
							//if new note o is in key
							if (ranNotes.indexOf(o) >= 0){
								innerChord.push(o + oct[floor(random(oct.length))]);
							}
							//else if new note o is not in key, move it down one more step
							else if (ranNotes.indexOf(o) == -1){
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




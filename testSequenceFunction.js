function setup () {
	var time = [1/2];
	var nR = Harmony.notesReturn(0,1,8);
	var counter = 0;
	var arpPattern = Harmony.arpPatterns[floor(random(Harmony.arpPatterns.length))];
	arpie = Arp([12,12], 1/3);
	
	var notesLength = nR.length;
	bV = Harmony.beetsReturn(4, 6);
	
	a = Synth('bleep')
	arpie.target = a;
	arpie.chord.seq ('c4maj7', 2);
	arpie.seq.speed =bV;
	
	a.noteOriginal = a.note

a.note = function() {

    var args = Array.prototype.slice.call( arguments, 0 )

    a.noteOriginal.apply( a, args )
    
    doSomeOtherStuff(args, notesLength, arpPattern)

}

Gibber.createProxyMethods( a, ['note'] )

function doSomeOtherStuff (arg, l, pattern)  { 

	

	console.log('a note!' + arg + "." + counter + " . " + pattern) 
	counter++;
	if (pattern == "updown") {
		if (counter >= (l * 2) ) {
		//OR... || startOver bool is marked true
			counter = 0;
		}
	}
	else if (pattern == "updown2"){
		if (counter >= (l * 2) - 2 ) {
		//OR... || startOver bool is marked true
			counter = 0;
		}
	}
	else {
		if (counter >= l ) {
		//OR... || startOver bool is marked true
			counter = 0;
		}
	}
	
}

//a.note.seq([0,1], 1/4) // outputs 'a note!' to the console

}

function draw () {

	//console.log(follow.getValue())
}



var Harmony = (function () { 
	var vanillaNotes = [7,4,2,0,-11,-9,-7], vanillaMeasures = [1,1,2,2,2,4,4,4,8,8,6,6,8,8,12,12,16],
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
  		arpPatterns: arpPatternArray,
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

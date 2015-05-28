// sandbox
var ranNotes = [12,11,9,7,5,4,2,0,-1],
beets = [1, 1/1.5, 1/2, 1/2, 1/3, 1/3,1/6, 1/4, 1/4, 1/4,1/8, 1/8,1/8,1/16, 1/16, 1/32],
bR, nR, bR2, nR2, randomCount = 4, stopper, syns = [], busses = [], effector, fols= [],
effectsTypes = [], effectsProperties = [];
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
	Clock.bpm(floor(random(55,75)));
	effectsTypes = [ [LPF, 'rising']  , [Delay, 'endless', 'wobbler', 'nightChill'],
	[Schizo, 'sane', 'borderline', 'pitchless'], [Vibrato, 'light', 'warped']];
	effectsProperties = [ ['LPF', ['cutoff',0,1], ['resonance', 0,5] ]  , ['Delay', ['time',0,1], ['feedback', 0,5]],
	['Schizo', ['chance', 0,1], ['reverseChance',0,1], ['pitchChance', 0,1], ['mix',0, 1],
      ['length', 1/4,1/3,1/8,1/16,1/2]], ['Vibrato', ['rate',.01,20], ['offset',25,2500 ], ['amount', 25,300]]];
	//can set it up so if only two numbers, treat it as range, otherwise, treat it as multi option specific picker
	//songBus = Bus().fx.add( Reverb('large'))
	 drum = XOX('x*x*x*x-x*x*x*xox*x*x*x-x*x*xxxo', 1/16);
	 drum.fx.add(Crush('lowSamp'))
	// // m = Mono('semiHorn')
	// m2 = Synth('bleep')
	// m1 = Synth2('rainTri')
	// //drum.send(songBus, .25)
	// m.send(songBus, .45)
	// m2.send(songBus, 1)
	// songBus.amp(1);
 
	// syns.push(m);
	// syns.push(m2);
	// syns.push(m1);
	GroupSynths(2);
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
		var gV = fols[i].getValue(), m = mult[i],
		value = gV * m, col = colors[i],

		//        if width greater than height, use wh * value, otherwise use ww2 * value
	    radius = ( wh > ww2 ? ww2 * value: wh * value);
		CoolSquare(ww2, wh, radius, col, value  );
	}
}

 // function CheckTheTime(time) //function check the time
 // {
 //    var previousState = state; 
 //    if (time == 29) 
 //    {
 //      state = 'change'; 
 //    }
 //    else if (time == 59) 
 //    {
 //      state = 'change'; 
 //    }
 //    else if (time != 29 || time != 59) 
 //    {
 //     state = 'noChange'; 
 //    }
 //    if (state != previousState) //state != previousState
 //    {
 //     // call weather function
 //     //loadJSON('http://api.openweathermap.org/data/2.5/weather?q=New%20York,NY&units=imperial', gotWeather);
 //    print ("call weather change function")
 //   }
 // }

function add(a, b) {
	return a + b;
}

function CoinReturn() {
	var coin = Math.round(Math.random()*2);
	return coin;
}

function Stopper () {

}


// if (i == stopper) {
				
// 		 	}

////////// begin effects mixer and follow function /////////



////////////// end of effects mixer function			// 

function GroupSynths(q) {
	var 
	// opportunity to return different bus effects based on circumstance
	// bass must be last entry in kinds
	kinds = ['pad', 'lead', 'bass'], synthKinds = [];
	// q is number of instruments to create
	for (var i = 0; i <= q; i++){
		var b;
		b = Bus();
		// if one bass exists already
		if (synthKinds.indexOf('bass') > -1) {
			//var k = kinds[floor(random((kinds.length - 1)))];
			var k = 'lead';
			synth = new SynthCreate(i, k);
			synth.make();
			synthKinds.push(k);
		}
		 else {
			var k = 'lead', fxAmount = floor(random(3));
			synth = new SynthCreate(i, k);
			synth.make(k);
			synthKinds.push(k);
			//create the effects bus for each synthesizer
			for (var j = 0; j < fxAmount; j++){
				var e = floor(random(effectsTypes.length));
				//console.log (e + "e");
				effect = new EFXCreate(i, effectsTypes[e][0], effectsTypes[e][floor(random(1,effectsTypes[e].length))], b);
				effect.make()
			//	b.fx.add (name)
			}
			busses.push(b);
		}
	};
}

function SynthCreate(name, kind) {
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
	   			ampVar = .05
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

function EFXCreate(name, kind, kindPre, buss) {
// 	var efX = [presetLPFArray = ['rising'], presetDelayArray = , 
// presetSchizoArray = , presetVibratoArray = ,
//  presetCrushArray = ['clean', 'lowSamp', 'dirty']], pre;
	this.name = name;
	   
	this.make = function() {
		var efxKind, pre;
		efxKind = kind;
		pre = kindPre;
		name = efxKind(pre)
		buss.fx.add(name);
	}
}

function NewScore() {
	var count = 0;

	for (k = 0; k < syns.length; k++ ) {
		var f = k;
		syns[f][0]._
		syns[f][0].send(busses[k], 1);
		f = Follow (busses[k]);
		fols.push(f);
	}
	a = Seq( function() { 
		//have a count to determine how many synth gets switched and which doesn't, not just length of array
// array of objects to change, objects to stop and objcts to leave alone?
	for (i = 0; i < syns.length; i++){
		var syn = syns[i][0];
		Updater(i);
		EffectsUpdater(i);
		//syn.note.seq([12,12,11], [1/2,1/2,1/16])
		//updater should be changer of music, 
		//should also be an effects updater

		//check where each follow is at and revise it as necessary
		//there's a music update function as well as an effects update
		//if the effects has updated, change it
		//follow moves to the follow (fx[fx.length])
	}
	randomCount = floor(random(1,3));
	console.log( count++ + randomCount) }, randomCount ) // every one measures
}

function UpdaterTest (p) {
	var bR = Harmony.wholeBeetsReturn(.5, floor(random(1,6))),
	nR = Harmony.melodyReturn(0, bR.length, bR.length),
	synth = syns[p][0], coin = CoinReturn();
	if (coin == 1){
		console.log (p + 'coin is 1')
		synth.note.seq([12,12,12,11], [1/12])
	}
	else if (coin == 0) {
		synth.note.seq(nR, bR);
	}
}

function Updater (p) {
	var nR, bR;
	//p is place, place in syns index/for loop
	var stop = false, coin = CoinReturn(), synth = syns[p][0],
	synthKind = syns[p][1];
	// flip a coin
	if (coin == 1){
		var anotherCoin = CoinReturn();
		if (anotherCoin == 1){
			bR = Harmony.wholeBeetsReturn(.25, floor(random(1,4)));
			nR = Harmony.melodyReturn(-12, bR.length, bR.length);
		}
		else {
			stop = true;
		}
	}
	else if (coin ==0){
		
		bR = Harmony.wholeBeetsReturn(2, floor(random(1,8)));
		nR = Harmony.melodyReturn(0, bR.length, bR.length);
		console.log("coin 0" + bR + nR)
	}
	if (stop){
		synth.note.seq.stop();
	}
	else if (!stop) {
		synth.note.seq(nR, bR)
	}
}

function isItemInArray(array, item) {
    for (var i = 0; i < array.length; i++) {
        // This if statement depends on the format of your array
        if (array[i][0] == item[0] && array[i][1] == item[1]) {
            return true;   // Found it
        }
    }
    return false;   // Not found
}

function EffectsUpdater (place) {
	var clear = false, coin = CoinReturn(), theBus = busses[place], anotherCoin = CoinReturn(),
	boop =	floor(random(theBus.fx.length));
	//	if (anotherCoin == 1) {
			//console.log("effects" + synth)
			var effector = theBus.fx[boop];
			if (effector){
				var index, n = effector.name;
				for (var i = 0; i < effectsProperties.length; i++) {
					console.log(n + " name " + effectsProperties[i][0] +" properties")
  				if (effectsProperties[i][0] == n) {
				    index = i;
				    break;
				  }
				}
				var g = floor(random(1,effectsProperties[index].length)),
				u = effectsProperties[index][0],
				t = effectsProperties[index][g][0];
				if (effectsProperties[index][g].length <= 2){
					q = random(effectsProperties[index][g][1],effectsProperties[index][g][2]) ;
				}
				else if (effectsProperties[index][g].length >= 3) {
					console.log("it's a long one");
					q = effectsProperties[index][g][floor(random(1,effectsProperties[index][g].length))];

				}
				console.log(u + " " + t + " " + q + "  ");

				effector.t =q;
				console.log(effector.t + " u.t")


				console.log("hi it worked " + index + " index")
				// if(effectsProperties[].indexOf(effector){
				//  console.log(effector.name);
				//  console.log("hi yes, it exists")
				// }

				//console.log(listAllProperties(effector));
				// if effector.name is indexof effects,
				//take effector and choose one of its matching properties arrays
				// if 
				//for some, up to all, of the properties to change
				//differentiate between specific properties and range properties
				//easiest way to do range is add a sine
				//
				if (effector.name == 'LPF')
				{
				//	var rLPFProp = ['cutoff',[0,1], 'resonance',[0,5] ];
				}
				if (effector.name == 'Schizo'){
					console.log("it's a schizo")
				}



			}
			else if (!effector) {
				console.log ("undefined bggiihh" + boop)
			}
			//change effects
	//	}
	//	else {
			//clear effects
	//	}
	// }
	// else {
		//modify existing effects
	// }
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

function listAllProperties(o){     
	var objectToInspect;     
	var result = [];
	
	for(objectToInspect = o; objectToInspect !== null; objectToInspect = Object.getPrototypeOf(objectToInspect)){  
		result = result.concat(Object.getOwnPropertyNames(objectToInspect));  
	}
	
	return result; 
}




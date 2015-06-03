// sandbox
var ranNotes = [12,11,9,7,5,4,2,0,-1], noteLog = [ ],
beets = [1, 1/1.5, 1/2, 1/2, 1/3, 1/3,1/6, 1/4, 1/4, 1/4,1/8, 1/8,1/8,1/16, 1/16, 1/32],
bR, nR, bR2, nR2, sunny = true, bw, columns, space, randomCount = 4, stopper, syns = [], busses = [], currentSeqs = [], effector, fols= [],
effectsTypes = [], effectsProperties = [];
function setup () {
	canvas = createCanvas( windowWidth, windowHeight );
	console.log("windowWidth" + windowWidth + " window height" + windowHeight)
	newColor0 = color(247, 75, 43, 127);
	newColor1 = color (200, 38, 8, 127);
	newColor2 = color(255, 214, 147, 127);
	newColor3 = color (247, 169, 43, 127);
	newColor4 = color(247, 218, 43, 127);
	newColor5 = color (14, 168, 70, 127);
	bgCol = color(100,14,14,255);
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
	GroupSynths(4);
	NewScore();
	mult = [200,200,200,200,2,2,2];
	ww2 = windowWidth; 
	wh = windowHeight / 2;
	bw = 150;
	columns = Math.floor(windowWidth / bw);
	//space = (windowWidth - (bw * columns)) / columns;
	console.log(windowWidth + "w" + columns + "columns" + bw + " bw " + (bw*columns) + " bw * columns");

}

function CoolSquare(w, h, r, c, v, t){
	rectMode(RADIUS);
	fill(c);
	strokeWeight(v);
	rect(bw*(t*2), h, (200 + (v * 5)), (200 - (v * 5) ), 50, 50, 100, 100)
}

function draw () {
	//var ;
	noStroke();
    fill(bgCol);
    rect(0, 0, width, height); 
	for (var i = 0; i < fols.length; i++){
		var gV = fols[i].getValue(), m = mult[i],
		value = gV * m, col = colors[i],

		//        if width greater than height, use wh * value, otherwise use ww2 * value
	    radius = ( ww2 > wh ? wh * value: ww2 * value);
		CoolSquare(ww2, wh, radius, col, value, i  );
	}
}

function add(a, b) {
	return a + b;
}

function CoinReturn() {
	var coin = Math.round(Math.random()*1.5);
	return coin;
}

function Stopper () {

}

function draw() {
      var hue, i, offsetX, track, v, _i, _j, _len, _len1, _ref, _ref1, _results;
      if (lastBeat === 4 && gibber.Clock.currentBeat === 1) {
        sketch.onBarChange();
        if (barIndex % 4 === 0) {
          sketch.onPhraseChange();
        }
      }
      lastBeat = gibber.Clock.currentBeat;
      if (!visualizer) {
        return;
      }
      sketch.noStroke();
      sketch.fill(0, 0, 0, fillValue);
      sketch.rect(0, 0, windowWidth, windowHeight);
      _ref = tracks;
      for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
        track = _ref[i];
        switch (i) {
          case 0:
            xOffsets[i] += data.d;
            break;
          case 1:
            xOffsets[i] += data.e;
            break;
          case 2:
            xOffsets[i] += data.f;
            break;
          case 3:
            xOffsets[i] += data.b[1];
        }
        xOffsets[i] += tracks[i].instrument.frequency / 10;
        hues[i] += tracks[i].follow.getValue() / 10;
        if (hues[i] > 100) {
          hues[i] %= 100;
        }
      }
      sketch.stroke(0, 0, 100, 20);
      sketch.blendMode(sketch.SCREEN);
      _ref1 = tracks;
      _results = [];
      for (i = _j = 0, _len1 = _ref1.length; _j < _len1; i = ++_j) {
        track = _ref1[i];
        v = Math.max(0, track.follow.getValue());
        offsetX = xOffsets[i];
        hue = hues[i];
        _results.push(sketch.renderSynth(v, offsetX, hue, track.instrument.frequency));
      }
      return _results;
    };
  })(this);
function renderSynth(amp, offset, hue, freq) {
      var ellipse1Size, ellipse2Size, i, lineCount, lineLength, radius, tDegrees, theta, varianceFromCenter, x1, x2, y1, y2, _i, _ref, _results;
      sketch.stroke(hue, 100, 50, 255);
      lineCount = 4 + ~~(data.d * 28);
      lineLength = amp * freq;
      radius = ~~(amp * windowWidth);
      varianceFromCenter = amp * 5;
      ellipse1Size = (offset >> 7) * (1 + data.e);
      ellipse2Size = (offset >> 12) * data.a[1];
      _results = [];
      for (i = = 0, ref = lineCount - 1; 0 <= ref ? _i <= ref : i >= ref; i = 0 <= ref ? ++_i : --_i) {
        stroke(hue, 100, 50, 255);
        noFill();
        theta = (i * 360 / lineCount) + offset;
        tDegrees = theta / 180 * Math.PI;
        x1 = middleX + (radius + 5 + lineLength) * Math.cos(tDegrees);
        y1 = middleY + (radius + 5 + lineLength) * Math.sin(tDegrees);
        x2 = middleX + (radius + 5) * Math.cos(tDegrees);
        y2 = middleY + (radius + 5) * Math.sin(tDegrees);
        line(x1, y1, x2, y2);
        if (sunny) {
          noStroke();
          fill(hue, 100, 50, 6);
          ellipse(x1, y1, ellipse1Size, ellipse1Size);
          results.push(ellipse(x2, y2, ellipse2Size, ellipse2Size));
        } else {
          results.push(void 0);
        }
      }
      return results;
    };

function GroupSynths(q) {
	
	// bass must be last entry in kinds
	var kinds = ['pad', 'lead', 'bass'], synthKinds = [];
	// q is number of instruments to create
	for (var i = 0; i <= q; i++){
		var b;
		b = Bus();
		// if one bass exists already
		if (synthKinds.indexOf('bass') > -1) {
			var k = kinds[floor(random((kinds.length - 1)))];
			//var k = 'lead';
			synth = new SynthCreate(i, k);
			synth.make();
			synthKinds.push(k);
		}
		 else {
			var k = 'lead', fxAmount = floor(random(3));
			synth = new SynthCreate(i, k);
			synth.make(k);
			synthKinds.push(k);
			//create the effects for bus for each synthesizer, fxamount is number of effects to add
			for (var j = 0; j < fxAmount; j++){
				var e = floor(random(effectsTypes.length));
				
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
		//assign each synth to its respective follow for visual representation
		var f = k;
		syns[f][0]._
		syns[f][0].send(busses[k], 1);
		f = Follow (busses[k]);
		fols.push(f);
	}
	a = Seq( function() { 
		console.log(count + "count at beginning")
		//have a count to determine how many synth gets switched and which doesn't, not just length of array
// array of objects to change, objects to stop and objcts to leave alone?
	for (i = 0; i < syns.length; i++){
		var syn = syns[i][0];
		Updater(i, count);
		EffectsUpdater(i);
	}
	noteLog.push(currentSeqs)
	randomCount = 4;
	console.log( count++ + " count " + randomCount) }, randomCount ) // every one measures
}

function UpdaterTest (p) {
	var nRbR=[], bR = Harmony.wholeBeetsReturn(.5, floor(random(1,6))),
	nR = Harmony.melodyReturn(0, bR.length, bR.length),
	synth = syns[p][0], coin = CoinReturn();
	if (coin == 1){
		synth.note.seq(nR,bR)
	}
	else if (coin == 0) {
		//synth.note.seq(nR, bR);
	}
}

//synth count notes beats
//

function Updater (p, c) {
	var nR, bR;
	//p is place, place in syns index/for loop
	// c is count
	var stop = false, ignore = false, coin = CoinReturn(), synth = syns[p][0],
	synthKind = syns[p][1];
	// flip a coin
	//console.log(p + " . .  "+ coin)
	if (coin == 1){
		var anotherCoin = CoinReturn();
		if (anotherCoin == 1){
			if (c == 0) {
				bR = Harmony.wholeBeetsReturn(4, floor(random(1,3)));
				nR = Harmony.melodyReturn(0, bR.length, bR.length);
			}
			else if (c >= 1){
				if (!noteLog[c-1][p][0]){
					console.log("it  is undefined ");
					bR = Harmony.wholeBeetsReturn(1, floor(random(3,12)));
					nR = Harmony.melodyReturn(12, bR.length, bR.length);
				}
				else {
					console.log("it is defined");
					ignore = true;
					nR = noteLog[c -1 ][p][0];
					bR =noteLog[c - 1][p][1];
				}
				
				console.log ("ignore " + nR + bR);
			// new entry is previous entry
			//array [bloo][blah] = array [ bloo-1][blah]
			}
		}
		else if (c == 0) {
			bR = Harmony.wholeBeetsReturn(2, floor(random(1,8)));
		nR = Harmony.melodyReturn(0, bR.length, bR.length);

		}
		else if (c >=1 ) {
			stop = true;
		}
	}
	else if (coin ==0){	
		bR = Harmony.wholeBeetsReturn(.5, floor(random(1,8)));
		nR = Harmony.melodyReturn(0, bR.length, bR.length);
	}
	if (stop){
		synth.note.seq.stop();
	}
	else if (ignore) {
		console.log("ignore")	
	}
	else if (!stop && !ignore) {
		synth.note.seq(nR, bR)
	}
	//array now
	//count is the i position, setting the point in the top array
	//bottom array includes everything else, 0 will always be synth
	//1 will aways be nR array, 2 will always be bR array
	var combo = [];
	combo[0] = nR;
	combo[1] = bR;
	console.log(c + " " + ". " + " " + p + " " + " " + combo + " " + " combo");
	var currentSeqsToPush = [];
	currentSeqsToPush[0] = p;
	currentSeqsToPush[1] = combo;
	currentSeqs[p] = currentSeqsToPush;
	//console.log(c + "c" + p + " name " + nR + "nr" + bR + "br")
	//noteLog[c].push([synth.name, nR, bR])
	//console.log(noteLog[c][p][0] + " notelog c p 0 ")

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
			var effector = theBus.fx[boop];
			if (effector){
				var index, n = effector.name;
				//get the place of the effector.name in the presets/properties array
				for (var i = 0; i < effectsProperties.length; i++) {
					if (effectsProperties[i][0] == n) {
				    	index = i;
				    	break;
				  	}	
				}
				// get random number length of the effects properties of this particular effect
				var g = floor(random(1,effectsProperties[index].length)),
				// it is the property to change
				low = effectsProperties[index][g][1], high = effectsProperties[index][g][2];
				it = effectsProperties[index][g][0];
				// if this only has two entries (min, max ((plus its name at [0]))
				if (effectsProperties[index][g].length <= 3){
					q = random(low, high) ;
				}
				//if it has more than two, it's probably specific/time based so choose a specific entry
				else if (effectsProperties[index][g].length >= 4) {
					q = effectsProperties[index][g][4];
				//	q = random(effectsProperties[index][g][1],effectsProperties[index][g][2]) ;

				}
				effector.it =q;
				fols[place] = Follow(busses[place]);
			}
			else if (!effector) {
				console.log ("no effector     " + boop)
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




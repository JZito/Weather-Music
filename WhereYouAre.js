// sandbox
var ranNotes = [12,11,9,7,5,4,2,0,-1], noteLog = [ ], ticker = 0, songs = [],
beets = [1, 1/1.5, , , , 1/2, 1/2, 1/3, 1/3,1/6, 1/4, 1/4, 1/4,1/8, 1/8,1/8,1/16, 1/16, 1/32],
day = true, cloudy = false, rainy = false, changer = false, state = 'noChange', done = false,
effectsTypes = [], effectsProperties = [];
  xOffsets = [0, 0, 0, 0];
  hues = [20, 50, 70, 194 / 255];
  fillValue = 20;
  visualizer = false;

function setup () {
	//var aSong;
	canvas = createCanvas( windowWidth, windowHeight );
	console.log("windowWidth" + windowWidth + " window height" + windowHeight)
	middleX = windowWidth / 2;
    middleY = windowHeight / 2;
	// newColor0 = color(247, 75, 43, 127);
	// newColor1 = color (200, 38, 8, 127);
	// newColor2 = color(255, 214, 147, 127);
	// newColor3 = color (247, 169, 43, 127);
	// newColor4 = color(247, 218, 43, 127);
	// newColor5 = color (14, 168, 70, 127);
	// bgCol = color(100,14,14,255);
	// bgColA = color(175,14,14,255);
	// colors = [newColor0, newColor1, newColor2, newColor3, newColor4, newColor5];
	Clock.bpm(floor(random(55,75)));
	effectsTypes = [ [LPF, 'rising']  , [Delay, 'endless', 'wobbler', 'nightChill'],
	[Schizo, 'sane', 'borderline', 'pitchless'], [Vibrato, 'light']];
	effectsProperties = [ ['LPF', ['cutoff',0,1], ['resonance', 0,5] ]  , ['Delay', ['time',0,1], ['feedback', 0,5]],
	['Schizo', ['chance', 0,1], ['reverseChance',0,1], ['mix',0, 1],
    ['length', 1/4,1/3,1/8,1/16,1/2]], ['Vibrato', ['rate',.01,5], ['offset',25,1250 ], ['amount', 25,100]]];
	//set it up so if only two numbers, treat it as range, otherwise, treat it as multi option specific picker
	//songBus = Bus().fx.add( Reverb('large'))
	// drum = XOX('x*x*x*x-x*x*x*xox*x*x*x-x*x*xxxo', 1/16);
	// drum.fx.add(Crush('lowSamp'))
	RandomWeather();
	NewSong(0);
	count = 0;
	mult = [200,200,200,200,2,2,2];

}

// function CoolSquare(w, h, r, c, v, t){
// 	rectMode(RADIUS);
// 	fill(c);
// 	strokeWeight(v);
// 	rect(bw*(t*2), h, (200 + (v * 5)), (200 - (v * 5) ), 50, 50, 100, 100)
// }

// // function draw () {
// // 	//var ;
// // 	noStroke();
// //     fill(bgCol);
// //     rect(0, 0, width, height); 
// // 	for (var i = 0; i < fols.length; i++){
// // 		var gV = fols[i].getValue(), m = mult[i],
// // 		value = gV * m, col = colors[i],

// // 		//        if width greater than height, use wh * value, otherwise use ww2 * value
// // 	    radius = ( ww2 > wh ? wh * value: ww2 * value);
// // 		CoolSquare(ww2, wh, radius, col, value, i  );
// // 	}
// // }

function add(a, b) {
 	return a + b;
}

function CoinReturn() {
 	var coin = Math.round(Math.random()*1.5);
 	return coin;
 }


function draw() {
    var hue, i, offsetX, track, v, j, len, len1, ref, ref1; 
    CheckTheTime(minute());
     var currentSong = songs[ticker],
    // console.log(songs[ticker]);
       results;
       console.log(currentSong + ticker);

   //    // if (lastBeat === 4 && gibber.Clock.currentBeat === 1) {
   //    //   sketch.onBarChange();
   //    //   if (barIndex % 4 === 0) {
   //    //     sketch.onPhraseChange();
   //    //   }
   //    // }
   //    // lastBeat = gibber.Clock.currentBeat;
   //    // if (!visualizer) {
   //    //   return;
   //    // }
   //    // background and clear old lines
     noStroke();
     if (day){
       	fill(255);
   		}
    else if (!day) {
      	fill(0);
    }
    rect(0, 0, windowWidth, windowHeight);
    ref = currentSong.publicTracks;
    for (i = 0, len = ref.length; i < len; ++i) {
        track = ref[i];
        xOffsets[i] += currentSong.publicFols[i].getValue() * 10  ;
        xOffsets[i] += track.instrument.frequency * 10  ;
      //  console.log(xOffsets[i] + " " + i + " i ");
        hues[i] += track.follow.getValue() * 2;
      //  console.log(hues[i]);
         // if (hues[i] < 100) {
         // 	//set ceiling of hues, over 100 loops back to 1
         //   hues[i] = 100;
         // }
         //console.log(hues[i]);
    }
    ref1 = currentSong.publicTracks;
    ref1L = ref1.length;
    for ( j = 0, len1 = ref1L; j < len1; ++j) {
        track = ref1[j];
        v = Math.max(0, track.follow.getValue());
        offsetX = xOffsets[j];
        hue = hues[j];
        renderSynth(v, offsetX, hue, track.instrument.frequency);
    }
   return results;
};

function CheckTheTime(time) //function check the time
 {
    var previousState = state; 
    
    //console.log(time);
    if (time == 17 || time == 30 || time == 47 || time == 59) 
    {
    	state = 'change';

    	//console.log('change');
    }
  //  else if (time != 1 || time != 15 || time !=  30 || time != 45)
    else
    {
    	state = 'noChange';
    }

    if (state != previousState && state == 'change') {
    	//state = 'noChange';
    	console.log('state !=')
    	changer = true;
    	 if (ticker == 0){
    	 	//aSong.stop();
    	 	songs[0].songFadeOut(1);
    	 	//go = false;
    	 	//ticker = 1;	
    	 }
    	 else if (ticker == 1){
    	 	//bSong.stop();
    	 	songs[1].songFadeOut(0);
    	 	//go = false;
    	 	//ticker = 0;	
    	}
    }
};

function NewSong(t) {
	song = new Song('ho', t);

	song.make();
	console.log(t + " t " + "song " + song.name)
	songs[t].groupSynths(3);
	songs[t].songCreate();
	//songs[t].newFollow();
};

function RandomWeather() {
 	// temperature = floor(random(33,75));
 	// temperatureC = floor((temperature  -  32)  *  5/9);
 	//day = floor(random(0,2));
 	day = 1;
 	// rainy = floor(random(0,2));
 	rainy = 0;
 	cloudy = 1;
 	//cloudy = floor(random(0,2));
 	console.log(day + " day " + rainy + "rainy" + cloudy + "cloudy")
 }

function renderSynth(amp, offset, hue, freq) {
      var ellipse1Size, timeCol, ellipse2Size, i, lineCount, lineLength, radius, tDegrees, theta, varianceFromCenter, x1, x2, y1, y2, _i, ref, results;
      if (day){
      	timeCol = 0;
      }
      else if (!day) {
      	timeCol = 255;
      }
      stroke(0, 100, 50, 255);
      lineCount = 25;
      lineLength = amp * freq;
      radius = (amp * windowWidth);
      varianceFromCenter = amp * 5;
      if (cloudy) {
      	ellipse1Size = (amp * (windowWidth * 100));
	    //  ellipse2Size = (offset >> 2) * 2;
	    lineLength = amp * (windowWidth * 10);
	      results = [];
	      for (i = _i = 0, _ref = lineCount - 1; 0 <= _ref ? _i <= _ref : _i >= _ref; i = 0 <= _ref ? ++_i : --_i) {
	        stroke(timeCol, timeCol, timeCol, hue);
	        noFill();
	        //blendMode(LIGHTEST);
	        theta = (i * 45 / lineCount) + offset;
	        tDegrees = theta / 45 * Math.PI;
	        x1 = windowWidth / i;
	        y1 = windowHeight / i;
	        x2 = x1 + (radius/i * lineLength) * Math.cos(tDegrees);
	        y2 = y1 + (radius/i * lineLength) * Math.sin(tDegrees);
	        line(x1, y1, x2, y2);
	        
	        	//circles at tip of lines
	          noStroke();
	          //fill(0, 0, 50, hue);
	          rect(x1, y1, ellipse1Size, ellipse1Size);
	          results.push(ellipse(x2, y2, ellipse2Size, ellipse2Size));
	        
	      }
	      return results;

      }
      else if (rainy) {
      	ellipse1Size = (amp * (windowWidth / 20));
	      ellipse2Size = (offset >> 1) * data.a[1];
	      results = [];
	      for (i = _i = 0, _ref = lineCount - 1; 0 <= _ref ? _i <= _ref : _i >= _ref; i = 0 <= _ref ? ++_i : --_i) {
	        stroke(timeCol, timeCol, timeCol, hue);
	        noFill();
	        //blendMode(LIGHTEST);
	         theta = (i * 360 / lineCount) + offset;
	         tDegrees = theta / 180 * Math.PI;
	        x1 = windowWidth / (i * (amp / 10)) ;
	        y1 = windowHeight / (i *(amp / 20)) ;
	        x2 = windowWidth * (radius ) * Math.cos(tDegrees);
	        y2 = windowHeight * (radius) * Math.sin(tDegrees);
	        line(y1, x1, x2, y2);
	        strokeWeight(3);
	        //if (sunny) {
	        	//circles at tip of lines
	          noStroke();
	          //fill(0, 0, 50, hue);
	          rect(x1, y1, ellipse1Size, ellipse1Size);
	          ellipse(x2, y2, ellipse2Size, ellipse2Size);
	        // } else {
	        //   results.push(void 0);
	        // }
	      }
      }
      else if (!rainy || !cloudy) {
      	  ellipse1Size = (amp * (windowWidth / 16));
	      ellipse2Size = (offset >> 12) * data.a[1];
	      results = [];
	      for (i = _i = 0, _ref = lineCount - 1; 0 <= _ref ? _i <= _ref : _i >= _ref; i = 0 <= _ref ? ++_i : --_i) {
	        stroke(timeCol, timeCol, timeCol, hue);
	        noFill();
	        //blendMode(LIGHTEST);
	        theta = (i * 360 / lineCount) + offset;
	        tDegrees = theta / 180 * Math.PI;
	        x1 = middleX + (radius * lineLength) * Math.cos(tDegrees);
	        y1 = middleY + (radius * lineLength) * Math.sin(tDegrees);
	        x2 = middleX + (radius / 25) * Math.cos(tDegrees);
	        y2 = middleY + (radius / 25) * Math.sin(tDegrees);
	        line(x1, y1, x2, y2);
	        if (sunny) {
	        	//circles at tip of lines
	          noStroke();
	          //fill(0, 0, 50, hue);
	          ellipse(x1, y1, ellipse1Size, ellipse1Size);
	          results.push(ellipse(x2, y2, ellipse2Size, ellipse2Size));
	        } else {
	          results.push(void 0);
	        }
	      }
	      return results;
  		}
    };

// function GroupSynths(q) {
	
// 	// bass must be last entry in kinds
// 	var kinds = ['pad', 'lead', 'bass'], synthKinds = [],
// 	kindsLength = kinds.length;
// 	// q is number of instruments to create
// 	for (var i = 0; i <= q; i++){
// 		var b;
// 		b = Bus();
// 		// if one bass exists already
// 		if (synthKinds.indexOf('bass') > -1) {
// 			var k = kinds[floor(random((kindsLength -1)))];
// 			synth = new SynthCreate(i, k);
// 			synth.make();
// 			synthKinds.push(k);
// 		}
// 		 else {
// 			var k = kinds[floor(random(kindsLength))],
// 			//var k = 'pad',
// 			fxAmount = floor(random(1,3));
// 			synth = new SynthCreate(i, k);
// 			synth.make();
// 			synthKinds.push(k);
// 			//create the effects for bus for each synthesizer, fxamount is number of effects to add
			
// 		}
// 		for (var j = 0; j < fxAmount; j++){
// 				var e = floor(random(effectsTypes.length));
				
// 				effect = new EFXCreate(i, effectsTypes[e][0], effectsTypes[e][floor(random(1,effectsTypes[e].length))], b);
// 				effect.make()
// 			//	b.fx.add (name)
// 			}
// 			busses.push(b);
// 	};
// }

// function SynthCreate(name, kind) {
// 	var ampVar = .45, 
// 	presetLeadFMArray = ['bong', 'bong','glockenspiel', 'glockenspiel', 'glockenspiel'],
// 	presetLeadMonoArray = ['semiHorn', 'preTester'],
// 	presetLeadSynthArray = ['bleep', 'bleepEcho', 'rhodes', 'warble', 'calvin'],
// 	padPresets = ['cascade', 'calvin'],
// 	pad2Presets = ['triTest'],
// 	leadInstruments = [FM, Synth, Mono], padInstruments = [Synth2];
// 	  // name - name object, kind - role of instrument (lead, pad etc), pre- preset,
// 	  //reference item by spot in syns array... 
// 	this.name = name;
	   
// 	this.make = function() {
// 	var instrumentKind;
// 	if (kind == 'lead') {
// 	   	instrumentKind = leadInstruments[floor(random(leadInstruments.length))];
// 	   	if (instrumentKind == FM){
// 	   		//pre =  'brass'
// 	   		pre = presetLeadFMArray[floor(random(presetLeadFMArray.length))];

// 	   		//ampVar = .2
// 	   }
// 	  else if (instrumentKind == Synth){
// 	   		pre = presetLeadSynthArray[floor(random(presetLeadSynthArray.length))];
// 	   		if (pre == 'cascade' || pre == 'warble') {
// 	   			ampVar = .2
// 	   		}
// 	   		else if (pre == 'calvin') {
// 	   			ampVar = .05
// 	   		}
// 	   		else {
// 	   			ampVar = .25
// 	   		}
// 	   }
// 	   else if (instrumentKind == Mono){
// 	   		pre = presetLeadMonoArray[floor(random(presetLeadMonoArray.length))];
// 	   		ampVar = .25
// 	   }
// 	}
// 	else if (kind == 'pad') {
// 		ampVar = .5
// 		var coin = Math.round(Math.random()*2);
// 		if (coin == 1) {
// 			instrumentKind = Synth;
// 			pre = padPresets[floor(random(padPresets.length))]
// 			if (pre == 'cascade' || pre == 'warble' || pre == 'calvin') {
// 	   			ampVar = .2
// 	   		}
// 	   		else {
// 	   			ampVar = .25
// 	   		}
// 		}
// 		else {
// 			instrumentKind = Synth2;
// 	    	pre = pad2Presets[floor(random(pad2Presets.length))]
// 	    	ampVar = .5	
// 		};
// 	}
// 	else if (kind == 'bass'){
// 	  	instrumentKind = Mono;
// 	   	pre = 'waveBass';
// 	}
	
// 	name = instrumentKind(pre)
// 	name.amp (ampVar)
// 	foll = Follow(name)
// 	console.log(name + " name " + kind + " kind " + instrumentKind + " instrumentKind " + pre + " pre " + foll + " foll")
// 	// if want to add fx, call fxObj = new FX(blah blah)
// 	//fxObj.make();
// 	//name.fx.add(fxObj);
// 	var valueToPush = new Array();
// 			valueToPush[0] = name;
// 			valueToPush[1] = kind;
// 	syns.push(valueToPush);

// 	tracks.push({
//         instrument: name,
//         follow: foll
//       });
// 	//name._;
// 	    // pluck is very quiet
//   }
// }

// function EFXCreate(name, kind, kindPre, buss) {
// // 	var efX = [presetLPFArray = ['rising'], presetDelayArray = , 
// // presetSchizoArray = , presetVibratoArray = ,
// //  presetCrushArray = ['clean', 'lowSamp', 'dirty']], pre;
// 	this.name = name;
	   
// 	this.make = function() {
// 		var efxKind, pre;
// 		efxKind = kind;
// 		pre = kindPre;
// 		name = efxKind(pre)
// 		buss.fx.add(name);
// 	}
// }

// function NewFollow() {
// 	var s = syns.length;
// 	for (k = 0; k < s; k++ ) {
// 		//assign each synth to its respective follow for visual representation
// 		var f = k;
// 		syns[f][0]._
// 		syns[f][0].send(busses[k], 1);
// 		f = Follow (busses[k]);
// 		fols.push(f);
// 	}
// }
// function MainLoop(tic) {
// 	var count = 0,
	
// 	aSong = Seq( function() { 
// 		console.log(count + "count at beginning")
// 		s = syns.length;
// 		//have a count to determine how many synth gets switched and which doesn't, not just length of array
// // array of objects to change, objects to stop and objcts to leave alone?
// 		for (i = 0; i < s; i++){
// 			Updater(i, count);
// 			randomCount = 4;
// 			done = false;
// 		}
// 	noteLog.push(currentSeqs)
// 	count++;
// 	//console.log( count + " count " + randomCount) 
// 	}, randomCount ) // every one measures
// 	pieces[tic] = aSong;

// }

// function Change () {
// 	var b, llll, ll, lll;
// 	synLength = syns.length;
// 	scoreFade = Score([0,
// 		function () {
// 			console.log("first function in fade");
// 			b = Bus().fx.add (Delay(1/6,.95 ));
// 			llll = new Line(0, .5, 1)
// 			// llll send up to .5 in 1 measure
// 			for (var i = 0; i < synLength; i++) {
// 				syns[i][0].send(b, llll)
// 			}
// 		}, measures(2),
// 		function(){
// 			console.log("2nd function in fade");
// 			ll = new Line(.5, 0, 2)
// 			//
// 			//drum.fadeOut(4);
// 			for (var i = 0; i < synLength; i++) {
// 				syns[i][0].amp(ll)
// 			}
// 			//innerSongBus.amp(ll);
// 			//NewSong(tick);	
// 		}, measures(4),
// 		function(){
// 			console.log("3rd function in fade");
// 			go = false;
// 			 for (var j = 0; j < fols.length; j++) {
// 			 	fols[j].remove();
// 			 };
// 			for (var i = 0; i < syns.length; i++){
// 			 	syns[i][0].kill();
// 			};
// 			aSong.kill();
// 			GroupSynths(3);
// 			MainLoop();
// 			NewFollow();
// 			lll = new Line(.5, 0, 2);
// 				//drum.kill();
				
// 			b.fx[0].feedback = .45;
// 			b.fx[0].feedback = lll;
			
// 			//fols.length = 0;
// 			//scores.length = 0;
			
// 		}, measures(1),
// 		function(){
// 			console.log("last function in fade");
// 			//inScore.stop();
// 			//score.stop();
// 			//innerSongBus.kill();
// 			b.kill();
// 			//l.kill();
// 			llll.kill();
// 			ll.kill();
// 			lll.kill();
// 			}, measures(1)]).start();
// }



// function Changer (p, c, m) {
// 	for (synths) {

// 	}
// }
//synth count notes beats
//
// function Changer (p, c, m) {
// 	//p is place in syns index/for loop
// 	//c is count of beat
// 	//m is measures for fade
// 	var ranFader, synth = syns[p][0], synthKind = syns[p][1], fadeDiv = m/floor(random(1,4));
// 	s = Score([0, 
// 		function(){
// 			synth.fadeOut(fadeDiv);
// 		},
// 		measures (fadeDiv),
// 		function() {

// 		}, measures (fadeDiv)
// 		]).start()
	


// }






function EffectsUpdater (place) {
	var clear = false, coin = CoinReturn(), theBus = busses[place], anotherCoin = CoinReturn(),
	boop =	floor(random(theBus.fx.length));
	//	if (anotherCoin == 1) {
			var effector = theBus.fx[boop];
			if (effector){
				var index, n = effector.name, fxPL=effectsProperties.length;
				//get the place of the effector.name in the presets/properties array
				for (var i = 0; i < fxPL; i++) {
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
	  	//sumRound is difference between sum and a whole set of measures,
	  	// necessary to fill in final gap to make a whole measure
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
  		var chords = [], oct = [-12,-12,-12,0,0,0,12,12], 
  		ranLength = ranNotes.length, octLength = oct.length,
  		pedalPoint = ranNotes[floor(random(ranLength))];
		for (var i = 0; i < c; i++){
			var innerChord= [];
			if (i == 0){
				for (var j = 0; j < cLength; j++) {
					//first note is pedal point
					if (j==0){
						innerChord.push(pedalPoint)
					}
					else if (j >= 1){
						var n = ranNotes[floor(random(ranLength))];
						innerChord.push(n + oct[floor(random(octLength))]);
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
						var n = ranNotes[floor(random(ranLength))];
						//if this note is the same as the note in the same spot of the last chord
						if (n == chords[(i - 1)][j]) {
							//o is new note
							var o = n - 1;
							//if new note o is in key
							if (ranNotes.indexOf(o) >= 0){
								innerChord.push(o + oct[floor(random(octLength))]);
							}
							//else if new note o is not in key, move it down one more step
							else if (ranNotes.indexOf(o) == -1){
								o = o -1;
								innerChord.push(o);
							}
						}

						else if (n != chords[(i-1)] [j]) {
							innerChord.push(n + oct[floor(random(octLength))]);
						}
					}
				}
			}
			chords.push(innerChord);
		//	console.log(innerChord + "innerchord")
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

function isItemInArray(array, item) {
    for (var i = 0; i < array.length; i++) {
        // This if statement depends on the format of your array
        if (array[i][0] == item[0] && array[i][1] == item[1]) {
            return true;   // Found it
        }
    }
    return false;   // Not found
}

var Song = function (n, place) { //enclose song
	this.name = n;		   
	this.make = function() {
		beepEM = floor(random(56,79));
		Clock.bpm(beepEM);
		var innerSong = (function () {
			var scoreInSong, bw, columns, space, randomCount = 4, innerSongBus, stopper, 
			tracks = [], syns = [], busses = [], currentSeqs = [], effector, fols= [];
			// var inScore, arp, arps = [],score,  mezhure, mezhures = [], mezhuresAlreadyAdded = [], scores = [], syn, kindsAlreadyAdded = [], fols = [], busses = [], syns = [], m = 4, scorePhrases = floor(random(32,112)), innerSongBus,
			// presets = ['bleep', 'bleepEcho', 'rhodes', 'warble', 'calvin'], bassWaveform = ['Saw','Sine','Triangle', 'Square'], 
			// presetLeadFMArray = ['bong', 'bong','clarinet', 'glockenspiel', 'glockenspiel', 'glockenspiel'],
			// presetLeadMonoArray = ['semiHorn', 'preTester'];
			// padPresets = ['cascade', 'calvin'],
			// arpPatternArray = ['updown2', 'updown', 'down', 'up'],
			// //pad2Presets = ['pad2','pad4', 'rainTri' ];
			// pad2Presets = ['triTest'];

			//it can all happen in here. handle each score, handle each instrument
			// array of syn objects can live here but be changed by a public method
			// syns = [];
			// public method to restart clears objects
			// syn is the object to be effected... how to assign?
			// privtely fill details of score
		    // check the time function will be calling module.clear method to start over
		    // use a circle ? for each follow... needs to be referenced from draw. call method from draw? how
		    // will that work?
			// var scoreDetails = function(m, scoreType) {
				// there's array scores... if scores[i] index of blah blah, do blah blah, else do blah blah?
				//an additional array, if the rotations are brief, if there are less than x notes, classify as
				// blah blah, if conditions are otherwise, clsassify it as blah blah bloo
				// good for things like arp?? if afternoon or night, arp .. if more than two arps, no more arps
				// if midnight no arp, if 6 am- noon one arp only... things like that?
				//if pad exists twice, one be chords, one be slow lead for tensions
				// if rhodes exists twice, have one return chords (intervals maybe), one return melody
			// };
			var Updater = function (p, c) {
				var nR, bR,
				//p is place, place in syns index/for loop
				// c is count
				stop = false, chord = false, ignore = false, coin = CoinReturn(), synth = syns[p][0],
				synthKind = syns[p][1];
				// flip a coin
				//console.log(p + " . .  "+ coin)

				if (synthKind == 'lead') {
					console.log(p + " " + synthKind + " lead ")
					if (coin == 1){
						var anotherCoin = CoinReturn();
						if (anotherCoin == 1){
							if (c == 0) {
								//console.log("c = 0" + syns[p][0])
								bR = Harmony.wholeBeetsReturn(4, floor(random(1,3)));
								nR = Harmony.notesReturn(0, floor(random(2,4)), floor(random(1,3)))
							}
							else if (c >= 1){
								if (!noteLog[c-1][p][0]){
									console.log("it  is undefined ");
									bR = Harmony.wholeBeetsReturn(1, floor(random(3,12)));
									bRL = bR.length;
									nR = Harmony.melodyReturn(12, bRL, bRL);
								}
								else {
									// new entry is just previous entry
									
									ignore = true;
									nR = noteLog[c -1 ][p][0];
									bR =noteLog[c - 1][p][1];
									console.log("it is defined" + nR + " nr "+ bR + " br");
								}
							}
						}
						else if (c == 0) {
							bR = Harmony.wholeBeetsReturn(2, floor(random(1,8)));
							bRL = bR.length;
							nR = Harmony.melodyReturn(0, bRL, bRL);
						}
						else if (c >=1 ) {
							stop = true;
						}
					}
					else if (coin ==0){	
						bR = Harmony.wholeBeetsReturn(.5, floor(random(1,8)));
						bRL = bR.length;
						nR = Harmony.melodyReturn(0, bRL, bRL);
					}
				}
					//if sunny

					//if cloudy

					//if rainy

				else if (synthKind == 'bass') {
				//	newM = function() {
					if (day) {
						//console.log('bass line' + syns[m][1] + syns[m][0]);
						
						if (cloudy) {
							nR = Harmony.notesReturn(0, 1, 8);
								bR = Harmony.beetsReturn(4, floor(random(2,4)));
						}
						else if (rainy) {
							nR = Harmony.notesReturn(0, floor(random(2,4)), 2);
								bR = Harmony.beetsReturn(2, floor(random(1,3)));
						}
						else if (!rainy && !cloudy) {
							bR = Harmony.wholeBeetsReturn(4, floor(random(1,3)));
							nR = Harmony.notesReturn(0, floor(random(2,4)), floor(random(1,3)))
							//syns[m][0].note.seq(nR, bR);
						}
					}
					else if (!day) {
						
						if (cloudy) {
							nR = Harmony.notesReturn(0, 1, 8);
								bR = Harmony.beetsReturn(4, floor(random(2,4)));
						}
						else if (rainy) {
							nR = Harmony.notesReturn(0, floor(random(2,4)), 2);
								bR = Harmony.beetsReturn(2, floor(random(1,3)));
						}
						else if (!rainy && !cloudy) {
							bR = Harmony.wholeBeetsReturn(4, floor(random(1,3)));
							nR = Harmony.notesReturn(0, floor(random(2,4)), floor(random(1,3)))
							//syns[m][0].note.seq(nR, bR);
						}
					}
				}
				else if (synthKind == 'pad') {
					if (day) {
						chord = true;
						if (cloudy) {
							
							bR = Harmony.beetsReturn(4, floor(random(1,3)));
								nR = Harmony.chordsReturn(floor(random(2,4)), floor(random(1,3)))
						}
						else if (rainy) {
							bR = Harmony.beetsReturn(4, floor(random(1,3)));
								nR = Harmony.chordsReturn(floor(random(2,4)), floor(random(1,3)))
						}
						else if (!rainy && !cloudy) {
							
							bR = Harmony.beetsReturn(1, floor(random(1,8)));
						nR = Harmony.chordsReturn(4, floor(random(2,4)));
						}
					}
					else if (!day) {
						chord = false;
						if (cloudy) {
							bR = Harmony.wholeBeetsReturn(.5, floor(random(1,8)));
						nR = Harmony.melodyReturn(0, bR.length, bR.length);
						}
						else if (rainy){
							bR = Harmony.wholeBeetsReturn(.5, floor(random(1,8)));
						nR = Harmony.melodyReturn(0, bR.length, bR.length);
						}
						else if (!rainy && !cloudy) {
							bR = Harmony.wholeBeetsReturn(.5, floor(random(1,8)));
						nR = Harmony.melodyReturn(0, bR.length, bR.length);
						}
					}
				}

					//oif kind lead

				if (stop){
					synth.note.seq.stop();
				}
				else if (ignore) {
					console.log("ignore")	
				}
				else if (chord){
					console.log("chords chosen" + nR + " . " + bR);
					synth.chord.seq(nR, bR);
				}
				else if (!stop && !ignore && !chord) {
					synth.note.seq(nR, bR)
				}
				//array now
				//count is the i position, setting the point in the top array
				//bottom array includes everything else, 0 will always be synth
				//1 will aways be nR array, 2 will always be bR array
				var combo = [];
				combo[0] = nR;
				combo[1] = bR;
				var currentSeqsToPush = [];
				currentSeqsToPush[0] = p;
				currentSeqsToPush[1] = combo;
				currentSeqs[p] = currentSeqsToPush;
				//console.log(c + "c" + p + " name " + nR + "nr" + bR + "br")
				//noteLog[c].push([synth.name, nR, bR])
				//console.log(noteLog[c][p][0] + " notelog c p 0 ")

				}
			return {
				publicSyns: syns,
				publicFols: fols,
				publicTracks: tracks,
				// groupsynths is create a whole group of individual synthcreates
				groupSynths: function(q) {
					// bass must be last entry in kinds to ensure only one
					var kinds = ['pad', 'lead', 'bass'], synthKinds = [],
					kindsLength = kinds.length;
					// q is number of instruments to create
					for (var i = 0; i <= q; i++){
						var b;
						b = Bus();
						// if one bass exists already
						if (synthKinds.indexOf('bass') > -1) {
							var k = kinds[floor(random((kindsLength - 1)))];
							synth = new innerSong.synthCreate(i, k);
							synth.make();
							synthKinds.push(k);
						}
						 else {
							var k = kinds[floor(random(kindsLength))],
							//var k = 'pad',
							fxAmount = floor(random(1,3));
							synth = new innerSong.synthCreate(i, k);
							synth.make();
							synthKinds.push(k);
							//create the effects for bus for each synthesizer, fxamount is number of effects to add
							
						}
						for (var j = 0; j < fxAmount; j++){
								var e = floor(random(effectsTypes.length));
								
								effect = new innerSong.eFXCreate(i, effectsTypes[e][0], effectsTypes[e][floor(random(1,effectsTypes[e].length))], b);
								effect.make()
								b.fx.add (name)
							}
							busses.push(b);
					};
				},
				synthCreate: function(name, kind) {
					var ampVar = .45, 
					presetLeadFMArray = ['bong', 'bong','glockenspiel', 'glockenspiel', 'glockenspiel'],
					presetLeadMonoArray = ['semiHorn', 'preTester'],
					presetLeadSynthArray = ['bleep', 'bleepEcho', 'rhodes', 'calvin'],
					padPresets = ['cascade', 'calvin', 'warble'],
					pad2Presets = ['triTest', 'pad2', 'pad4', 'rainTri'],
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

					   		//ampVar = .2
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
					   			ampVar = .25
					   		}
					   }
					   else if (instrumentKind == Mono){
					   		pre = presetLeadMonoArray[floor(random(presetLeadMonoArray.length))];
					   		ampVar = .25
					   }
					}
					else if (kind == 'pad') {
						ampVar = .5
						var coin = Math.round(Math.random()*2);
						if (coin == 1) {
							instrumentKind = Synth;
							pre = padPresets[floor(random(padPresets.length))]
							if (pre == 'cascade' || pre == 'warble' || pre == 'calvin') {
					   			ampVar = .2
					   		}
					   		else {
					   			ampVar = .25
					   		}
						}
						else {
							instrumentKind = Synth2;
					    	pre = pad2Presets[floor(random(pad2Presets.length))]
					    	ampVar = .5	
						};
					}
					else if (kind == 'bass'){
					  	instrumentKind = Mono;
					   	pre = 'waveBass';
					}
					
					name = instrumentKind(pre)
					name.amp (ampVar)
					foll = Follow(name)
					console.log(name + " name " + kind + " kind " + instrumentKind + " instrumentKind " + pre + " pre " + foll + " foll")
					// if want to add fx, call fxObj = new FX(blah blah)
					//fxObj.make();
					//name.fx.add(fxObj);
					var valueToPush = new Array();
							valueToPush[0] = name;
							valueToPush[1] = kind;
					syns.push(valueToPush);

					tracks.push({
				        instrument: name,
				        follow: foll
				      });
					//name._;
					    // pluck is very quiet
				  }
				},
				songCreate: function() {
					var beeps = floor((60/beepEM) *1000);
					console.log(beeps + 'bpm');
					innerSongBus = Bus().fx.add( //Schizo({chance:.95, pitchChance: 0, rate:ms(beeps/4), length:ms(beeps)}), 
					Reverb('large') ) // right
					innerSongBus.connect();
					innerSongBus.amp(0)
					l = Line(0, 1, 4);
					s = syns.length;
					// for (p = 0; p > s; p++){ 
					// 	syns[i][0]._;
					// 	syns[i][0].connect(innerSongBus);
					// }
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

// OK REPLACE scoreInSong with this system, one long ass function at the end

					// score= Score([0,
						// function(){ 
						// 	//drum = XOX('x*x*', 1/16);
						// 	//drum.fadeIn(4, 1);
						// 	for (var i = 0; i < syns.length; i++){
						// 		//assign each synth it's own score via scoredetails

						// 		syns[i][0]._;
						// 		syns[i][0].connect(innerSongBus);
						// 		var ss = scoreDetails(i);
						// 		scores.push(ss);
		  		// 				inScore = Score(ss).start();
		  		// 			}
		  		// 			innerSongBus.amp = l;
						// }, measures(4),
		  		// 		function(){
		  		// 			l.kill();
		  		// 		}, measures(6800)]).start();

					scoreInSong = Score([0,
						function(){ 
							//drum = XOX('x*x*', 1/16);
							//drum.fadeIn(4, 1);
							for (var i = 0; i < s; i++){
								synth = syns[p][0],
								synthKind = syns[p][1]
								//assign each synth it's own score via scoredetails
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
// replaced by above
					// scoreInSong = Score([0,
					// 	function(){
					// 		for (i = 0; i < s; i++){
					// 			Updater(i, count);
					// 			randomCount = 4;
					// 			done = false;
					// 	}
					// 	noteLog.push(currentSeqs)
					// 	count++;
					// 	}, measures(randomCount)
					// 	]).start().loop();
		  			},
		  		eFXCreate: function(name, kind, kindPre, buss) {
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
					},
				newFollow: function() {
					var s = syns.length;
					for (k = 0; k < s; k++ ) {
						//assign each synth to its respective follow for visual representation
						var f = k;
						syns[f][0]._
						syns[f][0].send(busses[k], 1);
						f = Follow (busses[k]);
						fols.push(f);
					}
				},
		  		songFadeOut: function(tick) {
		  			console.log(tick + "tick");
		  			var b, llll, ll, lll;
		  			scoreFade = Score([0,
		  				function () {
		  					console.log("first function");
		  					b = Bus().fx.add (Delay(1/6,.95 ));
		  					llll = new Line(0, .5, 1)
		  					for (var i = 0, s = syns.length; i < s; i++) {
		  						syns[i][0].send(b, llll)
		  					}
		  				}, measures(2),
		  				function(){
		  					console.log("did it stop?" + "second function");
		  					// if (tick == 1){
		  					// 	songs[0].scoreInSong.stop();
		  					// }
		  					// else if (tick == 0){
		  					// 	songs[1].scoreInSong.stop();
		  					// }
		  					
		  					ll = new Line(.5, 0, 2)
		  					//
		  					//drum.fadeOut(4);
		  					innerSongBus.amp(ll);
		  					NewSong(tick);
		  					if (tick == 0){
		  						ticker = 1;
		  						console.log("ticker now 1" + ticker)
		  					}	
		  					else if (tick == 1) {
		  						ticker = 0;
		  						console.log("ticker now 0" + ticker)
		  					}
		  				}, measures(4),
		  				function(){
		  					console.log("third function");

		  					go = false;
							for (var j = 0; j < fols.length; j++) {
 		  						fols[j].remove();
 		  						console.log("removed" + j)
 		  					};
		  					for (var i = 0; i < syns.length; i++){
 		  						syns[i][0].kill();

 		  					};
 		  					
		  					lll = new Line(.5, 0, 2)
 		  					//drum.kill();
 		  					
		  					b.fx[0].feedback = .45;
		  					b.fx[0].feedback = lll;
		  					
		  					fols.length = 0;
		  					//scores.length = 0;
		  					
		  				}, measures(1),
		  				function(){
		  					console.log("final function");

		  					// inScore.stop();
		  					//scoreInSong.kill();
		  					// score.stop();
 		  					innerSongBus.kill();
 		  					b.kill();
		  					l.kill();
		  					
		  					llll.kill();
		  					ll.kill();
		  					lll.kill();
		  				}, measures(1)]).start();
		  			}
		  		};
			})();//inner song enclosure
			console.log(place);
		songs[place] = innerSong;
		console.log(songs[place] + " " + place + " " + "songs place")
	}

}; //song enclosure 
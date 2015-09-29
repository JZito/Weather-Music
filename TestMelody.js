// sandbox
var ranNotes = [12,11,9,7,5,4,2,0,-1], f,
beets = [1, 1/1.5, 1/2, 1/2, 1/2,1/2,1/3, , , , 1/6, 1/4, 1/6, 1/4,1/3, 1/3,1/6, 1/4, 1/4, 1/4,1/8, 1/8,1/8,1/16, 1/16, 1/32],
bR, nR, bR2, nR2, randomCount = 3, stopper, syns = [], triggerNewMelody = false;

var leadSynthPresets = ['bleepEcho', 'bleep', 'rhodesFade', 'rhodes', 'warble', 'calvin', ];

function setup () {
	bR = WholeBeetsReturn(.5, floor(random(1,12))),
			nR = NotesReturn(bR.length), bR2 = WholeBeetsReturn(.5, floor(random(1,16))),
			nR2 = NotesReturn(bR2.length);
	canvas = createCanvas( windowWidth, windowHeight );
	Clock.bpm(60)
	songBus = Bus().fx.add( StereoVerb('large'),Schizo('borderline'),Delay({time:1/2, feedback:.95}),StereoVerb('space'))
	//drum = XOX('x*x*x*x-x*x*x*xox*x*x*x-x*x*xxxo', 1/16);
	m = Synth('rhodes')
	m.fx.add(Delay('nightChill'));
	m2 = Synth('rhodesFade')
	m2.fx.add(Delay('wobbler'));
	m.pan(.25);
	m2.pan(-.25);
	//m1 = Synth('bleep')
	//drum.send(songBus, .25)
	m.send(songBus, 1)
	m2.send(songBus, .85)
	songBus.amp(1);
   // f = Follow();
	syns.push(m);
	syns.push(m2);
	NewScore();
	//syns.push(m1);

}

function draw () {
	//console.log(f);
	//CheckTheTime(minute());
	//console.log(m.frequency)
}
function add(a, b) {
	return a + b;
}

function NewScore() {
	var count = 0;
	var killSeq = false;
	var llll;
	console.log(" new score");
	a = Seq( function() { 
		// array of objects to change, objects to stop and objcts to leave alone?
		//Updater();
		for (i = 0; i < syns.length; i++) {
			//console.log ("for")
			if (count == 1) {

				console.log ("stopper" + syns[i])
				syns[i].amp(0);
				syns[i].seq.stop();
				llll.kill();
				
			}
			else if (count >= 2) {
				var s = leadSynthPresets[floor(random(leadSynthPresets.length))];
				console.log(s + i);
				syns[i] = Synth(s)
				syns[i].send(songBus, .85)
				killSeq = true;
				
			}
			else if (count == 0) {
				fadeInFX = true;
				
				//console.log("else");
				bR = WholeBeetsReturn(2, floor(random(12,24)));
	 			nR = NotesReturn(bR.length);
	 			
				syns[i].note.seq(nR, bR);
			}
		}
		if (killSeq) {
			a.stop();
			killSeq = false;

		}
		if (fadeInFX) {
			llll = new Line(0, .75, 3);
			songBus.amp(llll);
			fadeInFX = false;
		}
	count++  }, randomCount ) // every one measures
}

// function SingleRotationScore() {
// 	a = Seq( function() {

// 		for (i = 0; i < syns.lenth; i++) {
// 			if (triggerNewMelody) {
// 				bR = WholeBeetsReturn(2, floor(random(1,8)));
// 	 			nR = NotesReturn(bR2.length);
// 				syns[i].note.seq.set(nR, bR2);
// 				newSeq = false;
// 			}
// 			else if (!triggerNewMelody) {
// 				syns[i].seq.stop();
// 			}
// 		}
// 	}, 2	)
// }

function CoinReturn() {
	var coin = Math.round(Math.random()*2);
	return coin;
}

function Stopper () {

}
// function Updater () {
// 	stopper = -1;
// 	if (CoinReturn() == 1){
// 		console.log('coinreturned 1');
// 		if (CoinReturn()== 1){
// 			console.log("coin returned 1 again!")
// 			bR = WholeBeetsReturn(.25, floor(random(1,6)));
// 			nR = NotesReturn(bR.length); 
// 		}
// 		else {
// 			console.log("should have stopped")
// 			//a.seq.stop();
// 			stopper = floor(random(2));
// 		}
	
// 	}
// 	else {
// 			bR2 = WholeBeetsReturn(2, floor(random(1,8)));
// 			nR2 = NotesReturn(bR2.length);
// 	}
// 	randomCount = floor(random(1,3));
// 	console.log("random count" + randomCount);
// }

// function CheckTheTime(time) //function check the time
//  {
//     var previousTime; 
//     var min = time;
//     // if time does not equal previous time
//     // trigger new melody
//     //console.log(time);
//   //  else if (time != 1 || time != 15 || time !=  30 || time != 45)
//     if (previousTime != min ) {
//     	console.log("trigger new melody");
//     	//new melody bool is true
//     	triggerNewMelody = true;
//     }
//     previousTime = min;

//     console.log(time + " . " + previousTime);
// };
setInterval(NewScore, 30000)

function WholeBeetsReturn(mul, len) {
	//multiplier is to double, quadruple etc beat lengths
	//len(gth) is how many beets you want returned
	var scoreBeets = [], sum;
	
  	for (var i = 0; i < len; i ++){
  		//grab some beets
  		scoreBeets.push(beets[floor(random(beets.length))] * mul);	
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
  	//don't just round but ceiling the amount up by by one for simplicity 
  	//(no more negatives to deal with)
			sumRound = Math.ceil(sum) - sum; 
  			if (Math.abs(sum + sumRound) % 2 == 1 && (sum + sumRound) >= 3) {
  				//if this new, larger sumround plus sum 
  				//will add up to an odd number like 3, 5, etc add one more to it
  				sumRound = sumRound + 1;
 				}
  	//add the time to the array to make it a full even measure count
  			scoreBeets.push(sumRound);
  		}
  	//	return scoreBeets;
  	}
  	return scoreBeets;
};

function NotesReturn (len){
	var notes = [];
	for (var i = 0; i < len; i++){
		notes.push(ranNotes[floor(random(ranNotes.length))])
	}
	return notes;
};




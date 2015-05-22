// sandbox
var ranNotes = [12,11,9,7,5,4,2,0,-1],
beets = [1, 1/1.5, 1/2, 1/2, 1/3, 1/3,1/6, 1/4, 1/4, 1/4,1/8, 1/8,1/8,1/16, 1/16, 1/32],
bR, nR, bR2, nR2, randomCount = 4, stopper, syns = [];
function setup () {
	bR = WholeBeetsReturn(.5, floor(random(1,12))),
			nR = NotesReturn(bR.length), bR2 = WholeBeetsReturn(.5, floor(random(1,16))),
			nR2 = NotesReturn(bR2.length);
	canvas = createCanvas( windowWidth, windowHeight );
	Clock.bpm(floor(random(55,75)))
	songBus = Bus().fx.add( Schizo({chance:.65, pitchChance: 0, rate:ms(Clock.bpm.value/2), length:ms(Clock.bpm.value * 2)}), Reverb('large'))
	drum = XOX('x*x*x*x-x*x*x*xox*x*x*x-x*x*xxxo', 1/16);
	m = Mono('semiHorn')
	m2 = Synth('bleep')
	m1 = Synth2('rainTri')
	//drum.send(songBus, .25)
	m.send(songBus, .45)
	m2.send(songBus, 1)
	songBus.amp(1);
    NewScore();
	syns.push(m);
	syns.push(m2);
	syns.push(m1);

}

function add(a, b) {
	return a + b;
}

function NewScore() {
	var count = 0;

	a = Seq( function() { 
		// array of objects to change, objects to stop and objcts to leave alone?
		Updater();
		for (i = 0; i < syns.length; i++){
			console.log ("for")
			if (stopper == i) {
				console.log ("stopper" + syns[i])
				syns[i].seq.stop();
			}
			else {
				console.log("else")
				syns[i].note.seq(nR, bR2);
			}
		}
	console.log( count++ ) }, randomCount ) // every one measures
}

function CoinReturn() {
	var coin = Math.round(Math.random()*2);
	return coin;
}

function Stopper () {

}
function Updater () {
	stopper = -1;
	if (CoinReturn() == 1){
		console.log('coinreturned 1');
		if (CoinReturn()== 1){
			console.log("coin returned 1 again!")
			bR = WholeBeetsReturn(.25, floor(random(1,6)));
			nR = NotesReturn(bR.length); 
		}
		else {
			console.log("should have stopped")
			//a.seq.stop();
			stopper = floor(random(2));
		}
	
	}
	else {
			bR2 = WholeBeetsReturn(2, floor(random(1,8)));
			nR2 = NotesReturn(bR2.length);
	}
	randomCount = floor(random(1,3));
	console.log("random count" + randomCount);
}

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




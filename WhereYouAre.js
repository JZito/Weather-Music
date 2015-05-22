// sandbox
var ranNotes = [12,11,9,7,5,4,2,0,-1],
beets = [1, 1/1.5, 1/2, 1/2, 1/3, 1/3,1/6, 1/4, 1/4, 1/4,1/8, 1/8,1/8,1/16, 1/16, 1/32],
bR, nR, bR2, nR2, randomCount = 4, stopper, syns = [], busses = [], effector;
function setup () {
	
	canvas = createCanvas( windowWidth, windowHeight );
	Clock.bpm(floor(random(55,75)))
	//songBus = Bus().fx.add( Reverb('large'))
	drum = XOX('x*x*x*x-x*x*x*xox*x*x*x-x*x*xxxo', 1/16);
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
	GroupSynths(5);
	   NewScore();

}

function add(a, b) {
	return a + b;
}

function NewScore() {
	var count = 0;

	a = Seq( function() { 
		// array of objects to change, objects to stop and objcts to leave alone?
		
		syns[0][0].note.seq(nR,bR2);
		//syns[1][0].note.seq([12,12,12,12,11,11,11,11], 1/3)
		for (i = 0; i < syns.length; i++){
			Updater();
		// 	console.log("effector");
		// 	console.log ("for");
		 	if (i == stopper) {
				console.log ("stopper" + syns[i])
				syns[i][0].seq.stop();
		 	}
		else if (i == effector) {
			var k = busses[i];
			console.log ("i effector")
			syns[i][0].send(busses[i], 1)
		// 	// 	syns[i][0].note.seq([12,12,12,12,11,11,11,11], 1/2)
		// 	// 	console.log(efx[i][0])
		 }
		else {
		// 		console.log("else")
				syns[i][0].note.seq(nR, bR2);
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
			// can be wholebeetsreturn OR supportbeetsreturn OR something else, based on conditions
			bR = WholeBeetsReturn(.25, floor(random(1,6)));
			nR = NotesReturn(bR.length); 
		}
		else {
			
			//a.seq.stop();
			stopper = floor(random(2));
			effector = floor(random(syns.length));
			console.log("should have stopped" + "effector" + effector)
		}
	bR2 = WholeBeetsReturn(2, floor(random(1,8)));
			nR2 = NotesReturn(bR2.length);
						effector = floor(random(syns.length));
	}
	else {
			bR2 = WholeBeetsReturn(2, floor(random(1,8)));
			nR2 = NotesReturn(bR2.length);
						effector = floor(random(syns.length));

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


function GroupSynths(q) {
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
			effect = EFXCreate(i, 'delay');
			console.log(synthKinds[i]);
		}
	};
}

function SynthCreate(name, kind, pre) {
	var ampVar = .5, 
	presetLeadFMArray = ['bong', 'bong','clarinet', 'glockenspiel', 'glockenspiel', 'glockenspiel'],
	presetLeadMonoArray = ['semiHorn', 'preTester'],
	presetLeadSynthArray = ['bleep', 'rhodes', 'warble', 'calvin'],
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
	
	//var ampVar = .5, 
	efX = [Delay, Tremolo, Vibrato];
	  // name - name object, kind - role of instrument (lead, pad etc), pre- preset,
	  //reference item by spot in syns array... 
	  presetDelayArray = ['endless', 'wobbler', 'nightChill']
	this.name = name;
	   
	this.make = function() {
	var efxKind, pre;
	//if (kind == 'delay') {
	   	pre = presetDelayArray[floor(random(presetDelayArray.length))];
		//ampVar = .2
		efxKind = efx[0];
	name = efxKind(pre)
	name.amp (ampVar)
	
	console.log(name + ' . ' + instrumentKind + ' . ' + pre + ' . ' + name)
	// if want to add fx, call fxObj = new FX(blah blah)
	//fxObj.make();
	//name.fx.add(fxObj);
	b = Bus().fx.add (name)
	busses.push(b);
	//name._;
	    // pluck is very quiet
	}
  }

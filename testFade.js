// sandbox
var go = false, fols = [], beets = [1, 1/1.5, 1/2, 1/2, 1/3, 1/3,1/6, 1/4, 1/4, 1/4,1/8, 1/8,1/8,1/16, 1/16, 1/32];
function setup () {
	canvas = createCanvas( windowWidth, windowHeight );
	newColor0 = color(255, 204, 0, 127);
	newColor1 = color (14, 168, 70, 127);
	bgCol = color(175,14,14,255);
	bgColA = color(175,14,14,255);
	colors = [newColor0, newColor1];
	songBus = Bus().fx.add( Reverb('large'))
	//drum = XOX('x*x*', 1/16);
	//drum = XOX('x*o*x*o-x*o*x*oox*o*x*o-x*o*xxoo', 1/8);
	m = Synth('bleep')
	
	m2 = Synth('bleep')
	
	m.send(songBus, 1)
	m2.send(songBus, 1)
	//drum.send(songBus, 1);
	//m.send(songBus, 1);
        //drum.amp(0);
        songBus.amp(1);
    
    NewScore();
	//songBus.fx[0].amp(0);
        //songBus.fx[0].out(0);
        //songBus.out(0);
}

function TestWhile() {
	var i = -3
	while(i<3) {
  	i++
  	sum = i;
  	if (sum != 0) continue
  console.log(i);
}
}

function draw () {
	var mult = [10,20,14,16], ww2 = windowWidth / 2, wh2 = windowHeight / 2 	;
	noStroke();
    fill(bgCol) ;
    rect(0, 0, width, windowHeight);  
    if (go) {
		for (var i = 0; i < fols.length; i++){
			var value = fols[i].getValue() * mult[i], col = colors[i],
			 radius = ( ww2 > wh2 ? wh2 * value: ww2 * value);
			//fill(colors[i])
			//strokeWeight(value)
			//rect(ww2, wh2, radius, radius);
			CoolSquare(colors[i], value, ww2, wh2, radius  );
		}
	}
}

function CoolSquare(c, v, w, h, r){
	rectMode(CENTER)
	fill(c);
	strokeWeight(v);
	rect(w, h, r, r);
}

function centerSquare() {

	
	

}

function add(a, b) {
	return a + b;
}

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
  		console.log ("odd");
  	// if sum will not round to 1, is short phrase
  		if (sum < .5){
  			console.log("less than .5")
  			sumRound = .5 - sum;
  			console.log(sumRound + "sumRound" + (sum + sumRound) + "sum + sumRound")
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
 				console.log(sumRound + "sumRound" + (sum + sumRound) + "sum + sumRound odd");
  				}
  	//add the time to the array to make it a full even measure count
  			scoreBeets.push(sumRound);
  		}
  	//	return scoreBeets;
  	}
  	return scoreBeets;
};

function mousePressed () {
	
}

function notesReturn (len){
	var notes = [], ranNotes = [12,11,9,7,5,4,2,0,-1];
	for (var i = 0; i < len; i++){
		notes.push(ranNotes[floor(random(ranNotes.length))])
	}
	return notes;
};

function NewScore() {
	console.log("hiii")
	score= Score([0,
				function(){ 
					var bR = wholeBeetsReturn(.5, floor(random(1,6))),
					nR = notesReturn(bR.length), bR2 = wholeBeetsReturn(.5, floor(random(1,4))),
					nR2 = notesReturn(bR2.length);

					m.note.seq(nR, bR);
					m2.note.seq(nR2, bR2);
					console.log(bR + " ---- " + nR + " --- ");
					console.log(bR2 + " ****** " + nR2 + " ******* ")
					followLead = Follow (m);
    				followBackup = Follow (m2);
    				fols[0] = followLead;
    				fols[1] = followBackup;
    				go = true;
					//songBus.amp(1)
  					//innerSongBus.amp = 0;
  			}, measures(2)]).start().loop()
}
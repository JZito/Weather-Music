// sandbox
var go = false, fols = [], beets = [1, 1/2, 1/2, 1/3, 1/6, 1/12, 1/4, 1/4, 1/8, 1/8,1/16, 1/16, 1/32];
function setup () {
	canvas = createCanvas( windowWidth, windowHeight );
	newColor0 = color(255, 204, 0, 127);
	newColor1 = color (14, 168, 70, 127);
	bgCol = color(175,14,14,255);
	bgColA = color(175,14,14,255);
	colors = [newColor0, newColor1];
	songBus = Bus().fx.add( Reverb('large'))
	//drum = XOX('x*x*', 1/16);
	drum = XOX('x*o*x*o-x*o*x*oox*o*x*o-x*o*xxoo', 1/8);
	m = Synth('bleep')
	
	m2 = Synth('cascade')
	
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
  		//grab a bunch of beets
  		scoreBeets[i] = beets[floor(random(1, beets.length))];
  		
  	}
	//add contents of beets array
  		sum = scoreBeets.reduce(add, 0);
  	// if the sum of the beets is an even number (2, 4,6,8) array is all good, return it
  	if (sum %2 == 0) {
  		console.log ("even");
  		return scoreBeets;
  	}

  	else if (sum %2 != 0) {
  		var sumRound;
  		console.log ("odd");
  		if (sum < .5){
  			console.log("less than .5")
  			sumRound = .5 - sum;
  			console.log(sumRound + "sumRound" + (sum + sumRound) + "sum + sumRound")
  			scoreBeets.push(sumRound);
  		}
  		else {
  			sumRound = Math.round(sum) - sum;
  			if (sumRound <= 0 ) {

  				sumRound = Math.ceil(sum) - sum; 
  				console.log(sumRound + "sumRound <=" + (sum + sumRound) + "sum + sumRound bing bon")
  				if (Math.abs(sumRound) % 2 == 1 && (sum + sunRound) >=3) {
  					sum = sum + 1;
  					console.log(sumRound + "sumRound" + (sum + sumRound) + "sum + sumRound % 2 == 1 &");
  				//scoreBeets.push(sumRound);
  				}
  			}
  			else if (Math.abs(sumRound) % 2 == 1 && sum >=3) {
  				sum = sum + 1;
  				console.log(sumRound + "sumRound" + (sum + sumRound) + "sum + sumRound % 2 == 1 &");
  				//scoreBeets.push(sumRound);
  			}
  			
  			else {
  				console.log(sumRound + "sumRound" + (sum + sumRound) + "sum + sumRound elseeee");
  				//scoreBeets.push(sumRound);
  			}
  			scoreBeets.push(sumRound);
  		}
  		return scoreBeets;
  	}
};

function mousePressed () {
	
}

function notesReturn (len){
	var notes = [], ranNotes = [12,11,9,7,4,2,0,-1];
	for (var i = 0; i < len; i++){
		notes.push(ranNotes[floor(random(ranNotes.length))])
	}
	return notes;
};

function NewScore() {
	console.log("hiii")
	score= Score([0,
				function(){ 
					var bR = wholeBeetsReturn(1, 12),
					nR = notesReturn(bR.length);
					m.note.seq(nR, bR);
					m2.note.seq([0,-5,0,-5], 1)
					followLead = Follow (m);
    				followBackup = Follow (m2);
    				fols[0] = followLead;
    				fols[1] = followBackup;
    				go = true;
					//songBus.amp(1)
  					//innerSongBus.amp = 0;
  			}, measures(4),
  				function(){
  					//go =true;
  					followBackup.remove();
  					//l = Line(songBus.fx[1].feedback.value, 0, 1)
  					//songBus.amp(l)
  					//songBus.fx[1].wet = l
  					//m.amp(l)
  					//innerSongBus.amp = 1;
  				}, measures(4)]).start().loop()
}
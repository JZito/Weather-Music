var go = false, fols = [];
function setup () {
	canvas = createCanvas( windowWidth, windowHeight );
	newColor0 = color(255, 204, 0, 127);
	newColor1 = color (225, 168, 24, 127);
	colors = [newColor0, newColor1];
	songBus = Bus().fx.add( Schizo({chance:.95, rate:ms(25), length:ms(500)}), Delay({time:1/6, feedback:.95}) )
	//drum = XOX('x*x*', 1/16);
	m = Synth('bleep')
	m._;
	m2 = Synth('bleepEcho')
	m2._;
	m.send(songBus, 1)
	m2.send(songBus, 1)
	//drum.send(songBus, 1);
	//m.send(songBus, 1);
        //drum.amp(0);
        songBus.amp(1);
    followLead = Follow (m);
    followBackup = Follow (m2);
    fols[0] = followLead;
    fols[1] = followBackup;
    NewScore();

   
	//songBus.fx[0].amp(0);
        //songBus.fx[0].out(0);
        //songBus.out(0);
}

function draw () {
	

	 centerSquare();
}

function centerSquare() {
	var ww2 = windowWidth / 2, wh2 = windowHeight / 2 	;
	if (go) {
		for (var i = 0; i < fols.length; i++){
			var value = fols[i].getValue() * 12,
			 radius = ( ww2 > wh2 ? wh2 * value: ww2 * value);
			fill(colors[i])
			strokeWeight(value)
			rect(ww2, wh2, radius, radius);
		}
	
	
}
}

function mousePressed () {
}

function NewScore() {
	console.log("hiii")
	score= Score([0,
				function(){ 
					m.note.seq([12,11,7,9], [1/4])
					m2.note.seq([24,19,24,19], [1/16])
					//songBus.amp(1)
  					//innerSongBus.amp = 0;
  			}, measures(1),
  				function(){
  					go =true;
  					l = Line(songBus.fx[1].feedback.value, 0, 1)
  					songBus.amp(l)
  					//songBus.fx[1].wet = l
  					//m.amp(l)
  					//innerSongBus.amp = 1;
  				}, measures(4)]).start()
}
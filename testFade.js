var go = false, fols = [];
function setup () {
	canvas = createCanvas( windowWidth, windowHeight );
	newColor0 = color(255, 204, 0, 127);
	newColor1 = color (14, 168, 70, 127);
	bgCol = color(175,14,14,255);
	bgColA = color(175,14,14,255);
	colors = [newColor0, newColor1];
	songBus = Bus().fx.add( Schizo({chance:.95, rate:ms(25), length:ms(500)}), Reverb('large'))
	//drum = XOX('x*x*', 1/16);
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

function mousePressed () {
	
}

function NewScore() {
	console.log("hiii")
	score= Score([0,
				function(){ 
					m.note.seq([12,11,7,9], [1/4])
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
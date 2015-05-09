function setup () {
	songBus = Bus().fx.add( Schizo({chance:.95, rate:ms(25), length:ms(500)}), Delay({time:1/6, feedback:.95}) )
	//drum = XOX('x*x*', 1/16);
	m = Synth('bleep')
	m._
	m.send(songBus, 1)
	//drum.send(songBus, 1);
	//m.send(songBus, 1);
        //drum.amp(0);
        songBus.amp(1);
    NewScore();

   
	//songBus.fx[0].amp(0);
        //songBus.fx[0].out(0);
        //songBus.out(0);
}

function NewScore() {
	console.log("hiii")
	score= Score([0,
				function(){ 
					m.note.seq([12,11,7,9], [1/4])
					//songBus.amp(1)
  					//innerSongBus.amp = 0;
  			}, measures(1),
  				function(){
  					l = Line(songBus.fx[1].feedback.value, 0, 1)
  					songBus.amp(l)
  					//songBus.fx[1].wet = l
  					//m.amp(l)
  					//innerSongBus.amp = 1;
  				}, measures(4)]).start()
}
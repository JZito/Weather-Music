//make giant arrays of notes, of wait times, choose randomly
//if sun, run the specific sun sound or set fx params that way
// if rain, allow the specific rain sound or set fx params that way
// weather api key

// if minute()=29 or 59
//get json data and assign it
//weather
//temp
//pressure
//if weather sunny
// fade out and stop currentInstrument
// call SunnyWeather, which can even just be a list of different settings and
// if calls
//a synth would be like synth(preset, maxvoices, amp, glide)
// A wind direction vector
var canvas, wind, mouseMove = false, url, time, tempDivP5, weatherStringP5, lerpVar = 0, a, countdown = 140, lerpVar = 0, timer, weatherString = 'cloudy',
	plus = 0, q= 0, temperature, temperatureC, night, cloudy, rainy, newWeather, bigScore, lerpVar2, melodyLead, pad, bass, drum, arp, busLeft, busRight,
	state = 'change', 
	measuresRan= [1,1,2,2, 4, 4,8], 
	notes = [0,12,11,9,7,4,2,0,12,11,9,7,4,2,0,12,11,9,7,4,2,4,4,4,4,4,7,7,7,7,7,0,0,0,-1,-1,-1,-1,-1],
	durationz = [1/4, 1/6, 1/4, 1, 1/2,1,1/4,1/4,1/2, 1/16,1/4,1/4], 
	bassWaveform = ['Saw','Sine','Triangle', 'Square'],
	presetLeadArray = ['gong', 'brass', 'bass', 'bass','clarinet', 'glockenspiel', 'glockenspiel', 'glockenspiel'],
	patternArray = ['updown2', 'updown', 'down', 'up'],
	//conditions = [200,201,202,210,211,212,221,230,231,232, 300,301,302,310,311,312,313,314,321,500,501,502,503,504,511,520,521,522,531,600,601,602,611,612,615,616,620
	//				621,622,]
	ranNote1, ranNote2, ranNote3, ranNote4, ranNote5, ranNote6, ranNote7, ranNote8, ranNote9, ranNote10, 
	duration1,duration2,duration3,duration4,duration5,duration6,duration7,duration8,
	prevColor1, prevColor2, prevColor3, prevColor4, prevColor5, prevColor6, newColor1, newColor2, newColor3, newColor4, newColor5, newColor6,
	noteArray1 = [], noteArray2= [], noteArray3= [], noteArray4= [], noteArray5= [], noteArray6 = [],
	durationArray1 = [], durationArray2 = [], durationArray3 = [], durationArray4 = [], durationArray5 = [], 
	weatherCall = false;


function setup() {
  	a = 0, from = color(72, 111, 136, 55),
	to = color(12, 24, 20, 255), 
	tempDivP5 = document.getElementById('head');
	url = 'http://api.openweathermap.org/data/2.5/weather?q=NewYork,USA&units=imperial&APPID=0f10a0d901251b40e147f9232516c2f2';
	//
	//night = true, rainy= true, cloudy = false, 
    ranNote1  = notes[floor(random(notes.length))], ranNote2 = notes[floor(random(notes.length))],
	ranNote3  = notes[floor(random(notes.length))], ranNote4 = notes[floor(random(notes.length))],
	ranNote5  = notes[floor(random(notes.length))], ranNote6 = notes[floor(random(notes.length))],
	ranNote7  = notes[floor(random(notes.length))], ranNote8 = notes[floor(random(notes.length))],
	ranNote9  = notes[floor(random(notes.length))], ranNote10 = notes[floor(random(notes.length))],
	duration1 = durationz[floor(random(durationz.length))], duration2 = durationz[floor(random(durationz.length))],
	duration3 = durationz[floor(random(durationz.length))], duration4 = durationz[floor(random(durationz.length))],
	duration5 = durationz[floor(random(durationz.length))], duration6 = durationz[floor(random(durationz.length))];
 	canvas = createCanvas( windowWidth, windowHeight );
 	//position = createVector(width/2, height/2);
  	loadJSON(url, DrawWeather);
  	//RandomWeather();
  	
  	
  	Clock.bpm(55)
  	score = Score([0,
  		function() {
  			print ('start')
  			Master.amp(0);
  			//NewScore();
  		}, 
  		measures(1)
  		]).start();

  	NewInstruments();
			
	followLead = Follow (melodyLead.fx[1]);
	followPad = Follow(pad.fx[0]);
	followBass = Follow(bass.fx[2]);
	followDrum = Follow(drum.fx[0]);
	//followGit = Follow(git.fx[2]);


	newColor1 = color(255, 204, 0, 127);
	newColor2 = color(255,142,5, 127);
	newColor3 = color(255,55,3, 127);
	newColor4 = color(225,45,75, 127);
	newColor5 = color (225,46,75, 127);
	newColor6 = color(72, 111, 136, 55);
	prevColor1 = color(255, 204, 55, 127);
	prevColor2 = color(255,142,55, 127);
	prevColor3 = color(255,55,222, 127);
	prevColor4 = color(225,45,105, 127);
	prevColor5 = color (225,46,222, 127);
	prevColor6 = color(72, 111, 222, 55);
	
  }

function draw() {
	a++;
	
	var 	  x = mouseX / windowWidth,
		      y = mouseY / windowHeight,
		      ww2 = windowWidth / 2,
		      wh2 = windowHeight / 2,
		      value = followLead.getValue() * 12;
		      value2 = followPad.getValue() * 12,
		      value3 = followBass.getValue() * 12,
		      value4 = followDrum.getValue() * 5,
		     
		     // value5 = followGit.getValue() * 10,
		      radius = ( ww2 > wh2 ? wh2 * value: ww2 * value),
		      radius2 = ( ww2 > wh2 ? wh2 * value2: ww2 * value2),
		      radius3 = ( ww2 > wh2 ? wh2 * value3: ww2 * value3),
		      radius4 = ( ww2 > wh2 ? wh2 * value4: ww2 * value4);
		     // radius5 = ( ww2 > wh2 ? wh2 * value5: ww2 * value5);

	
	col = lerpColor(prevColor1, newColor1, (lerpVar2));
	col2 = lerpColor(prevColor2, newColor2, (lerpVar2));
	col3 = lerpColor(prevColor3, newColor3, (lerpVar2));
	col4 = lerpColor(prevColor4, newColor4, (lerpVar2));
	col5 = lerpColor (prevColor5, newColor5, (lerpVar2));
	bgCol = lerpColor(prevColor6, newColor6, (lerpVar2));
	
	noStroke();
    fill(bgCol) ;
    rect(0, 0, width, height);  
	//stroke[1];
	//background( 96, 119, 163, 5 );
	centerSquare(ww2, wh2, col, radius, value);
	leftSquare(ww2, wh2, col2, radius2, value2);
	rightSquare(ww2, wh2, col3, radius3, value3);
	bottomSquare(ww2, wh2, col4, radius4, value4);
	//topSquare(ww2, wh2, col5, radius5, value5);
	CheckTheTime(minute());

  if (a < countdown)
  {
  	lerpVar2 = (lerpVar += a % countdown) * .0001;
  
  }
}

function centerSquare(width, height, cols, rad, val) {
	rectMode(CENTER)
	
	fill(cols)
	strokeWeight(val)
	if (rainy && !night){
		rect( width , height, rad / 2, rad * rad / 4 );
	}
	else {
		rect(width, height, rad, rad);
	}
}

function leftSquare(width, height, cols, rad, val) {
	noStroke();
	
	fill(cols);
	strokeWeight(val);
	rect( width , height + (height * .5), rad * 10, rad );
}

function rightSquare(width, height, cols, rad, val) {
	
	fill(cols)
	strokeWeight(val)
	rect( width, height + height, rad * 5, rad /2 );
}

function bottomSquare(width, height, cols, rad, val) {
	
	fill(cols)
	strokeWeight(val)
	rect( width, height + (height/1.5), rad * 2, rad / 2);
}

function mousePressed() {
	q++;
	if (q <=1){
		RandomWeather();
		Master.amp(0);		
 		Gibber.clear();
 		Master.amp(0);	
 		//	NewInstruments();
 		NewScore();
		FadeColor();
	}
	else {
          //drum.seq.note = 'xoxx**-o'
         RandomWeather();
         Fade();
         FadeColor();
         print (night + ' night' + rainy + ' rainy' + cloudy + ' cloudy' + clear + 'clear' )
     }
}

$(document).mousemove(function() {
    if (timer) {
        clearTimeout(timer);
        timer = 0;
    }

    $('#tempDiv').fadeIn();
    timer = setTimeout(function() {
        $('#tempDiv').fadeOut()
    }, 3000)
});


function DrawWeather(weather2) {
	var weatherID = String(weather2.weather[0].id);
	temperature = floor(weather2.main.temp);
	temperatureC = floor((temperature  -  32)  *  5/9);
	print (weatherID + "weather id" + temperature + 'temp');
	tempDivP5.innerHTML = temperature + " / " + temperatureC;

}

 function CheckTheTime(time) //function check the time
 {
    var previousState = state; 
    if (time == 29) 
    {
      state = 'change'; 
    }
    else if (time == 59) 
    {
      state = 'change'; 
    }
    else if (time != 29 || time != 59) 
    {
     state = 'noChange'; 
    }
    if (state != previousState) //state != previousState
    {
     // call weather function
     //loadJSON('http://api.openweathermap.org/data/2.5/weather?q=New%20York,NY&units=imperial', gotWeather);
    print ("call weather change function")
   }
 }

 function Fade() {
 	
 	fadeScore = Score([0,
 		function() {
 			//bigScore.next;
 			Master.fadeOut(2);
 		}, measures (2),
 		function() { 	
 			Master.amp(0);		
 			Gibber.clear();
 			Master.amp(0);	
 		//	NewInstruments();
 			NewScore();
 		},
 		measures(.25)
 		]).start();
 }

 function RandomWeather() {
 	temperature = floor(random(33,75));
 	temperatureC = floor((temperature  -  32)  *  5/9);
 	night = floor(random(0,2));
 	//night = 0;
 	rainy = floor(random(0,2));
 	//rainy = 0;
 	//cloudy = 1;
 	cloudy = floor(random(0,2));
 }

var randomBoolean = 
    function(){
        return Math.random()<.5; // Readable, succint
    }
;

//for(var i = 0, l = randomBoolean.length; i < l; i++){
  //  console.log('picking using', i, ' -', randomBoolean[i]() );
//}
// arrays of colors- sunny, night, rainy, cloudy, etc... same order
// array of current colors
// for var i = 0l i <= colors.length; i++
//   FadeColor(currentcolor, tocolor, )
// funtion fadecolor(_fromColor, _toColor )
 function FadeColor() {
 	// for loop
 	prevColor1 = newColor1;
 	prevColor2 = newColor2;
 	prevColor3 = newColor3;
 	prevColor4 = newColor4;
 	prevColor5 = newColor5;
 	prevColor6 = newColor6;
 	a=0;
 	lerpVar = 0;
 	//another
 	if (night){
 		if (rainy || cloudy) {
 			newColor1 = color(152, 164, 102, 55);
			newColor2 = color(152,122,102, 55);
			newColor3 = color(122,35,102, 55);
			newColor4 = color(102,15,102, 55);
			newColor5 = color (75,46,102, 55);
			newColor6 = color( 12, 24, 20, 55);
 		}
 		else {
			newColor1 = color(192, 204, 122, 127);
			newColor2 = color(172,142,122, 127);
			newColor3 = color(142,55,122, 127);
			newColor4 = color(122,45,122, 127);
			newColor5 = color (75,46,122, 127);
			newColor6 = color( 22, 24, 40, 55);

		} 
	}
	else if (!night){
		if (rainy) {
			newColor1 = color(86, 86, 149, 127);
			newColor2 = color(76,103,140, 127);
			newColor3 = color(139,122,174, 127);
			newColor4 = color(43,25,87, 0);
			newColor5 = color (43,25,3, 127);
			newColor6 = color(52, 111, 116, 255);
		}
		else if (cloudy)
		{
			newColor1 = color(170, 104, 57, 127);
			newColor2 = color(118,145,116, 127);
			newColor3 = color(89,22,164, 127);
			newColor4 = color(133,54,0, 127);
			newColor5 = color (110,80,126, 127);
			newColor6 = color(117, 126, 130, 255);
		}
		else 
		{
			newColor1 = color(255, 204, 0, 127);
			newColor2 = color(255,142,5, 127);
			newColor3 = color(255,55,3, 127);
			newColor4 = color(225,45,75, 127);
			newColor5 = color (225,46,75, 127);
			newColor6 = color(72, 111, 136, 255);
		}

	}
	
 }
 														   /////////////// RAINY OR CLOUDY NIGHT night=true////////
function NewInstruments() {
 	if (night){
 		if (rainy || cloudy) {
 			Clock.bpm(53)
			clave = Clave({amp: .2, pan: [-1, 1]}).play( Rndf(2400, 3600), 1/16 );

			melodyLead = Synth('bleep')
		  			melodyLead.amp = .75;
		  			melodyLead.fx.add( Crush({bitDepth:16}),Vibrato(.02),Delay({time:1/4, feedback:.45, wet:.4, dry:.91}))

		  	pad = Synth2({ waveform:'Triangle',
								maxVoices:6, amp:.5, glide:.9, resonance:1, useADSR:true, 
		  														requireReleaseTrigger:false,
		  							attack:ms(4000), decay:ms(12000), sustain:ms(100), release:ms(2000) }) 
		  			.fx.add(Crush({bitDepth:16}), Vibrato(0.05))

		  	drum = EDrums()
		  				drum.fx.add(Crush({bitDepth:22}))
		  			k = Seq({ note:"x.xx.xxxx..x.x..x.xx..x..x.x.x.x".split(""), durations:1/16, target:drum })
		  			kk = Seq({ note:".*".split(""), durations:[1/8], target:drum })

			bass = Mono ({waveform:'Sine', 
								glide:.45, useADSR:true, 
		  													requireReleaseTrigger:false,
		  							attack:ms(400), decay:ms(1000), sustain:ms(300), release:ms(1000)})
					.resonance.seq([0,0.1,0.2,0.4,0.6,0.8].rnd(), [1,4,2,4,8,12,3,1,1,6,8,6].rnd())
					.cutoff.seq( [.1,.2,.3,.4], 1/2 )
		  			.fx.add(Crush({bitDepth:16}), Vibrato(0.05),
		   			Delay({time:1/3, feedback:.9, dry: .05, wet:.9}))
		 
			arp = Arp( [0, 2, 4], 1/2, 'updown', 2 )

			busRight = Bus().fx.add( Schizo('paranoid') ).pan( 1 ) // right
			busLeft = Bus().fx.add( Schizo('paranoid') ).pan( -1 ) // left
 		}
 		else {
			Clock.bpm(58)
			//clave = Clave({amp: .2, pan: [-1, 1]}).play( Rndf(2400, 3600), 1/16 );

			melodyLead = Synth('bleep')
		  			melodyLead.amp = .75;
		  			melodyLead.fx.add( Crush({bitDepth:16}),Vibrato(.02),Delay({time:1/4, feedback:.45, wet:.4, dry:.91}))

		  	pad = Synth2({ waveform:'Triangle',
								maxVoices:6, amp:.5, glide:.9, resonance:1, useADSR:true, 
		  														requireReleaseTrigger:false,
		  							attack:ms(4000), decay:ms(12000), sustain:ms(100), release:ms(2000) }) 
		  			.fx.add(Crush({bitDepth:16}), Vibrato(0.05))

		  	drum = EDrums()
		  				drum.fx.add(Crush({bitDepth:16}))
		  				l = Seq({ note:"x..x..x....x..x..x....x..x.x.x..".split(""), durations:1/16, target:drum })
		  				ll = Seq({ note:"*...*...*...*...*...*...*...*.-.".split(""), durations:1/16, target:drum })
		  	h = HPF()
					h.cutoff = .02 
					drum.fx.add( h )
				
			bass = Mono ({waveform:'Sine', 
								glide:.45, useADSR:true, 
		  													requireReleaseTrigger:false,
		  							attack:ms(400), decay:ms(1000), sustain:ms(300), release:ms(1000)})
					.resonance.seq([0,0.1,0.2,0.4,0.6,0.8].rnd(), [1,4,2,4,8,12,3,1,1,6,8,6].rnd())
					.cutoff.seq( [.1,.2,.3,.4], 1/2 )
		  			.fx.add(Crush({bitDepth:16}), Vibrato(0.05),
		   			Delay({time:1/3, feedback:.9, dry: .05, wet:.9}))
		 
			arp = Arp( [0, 2, 4], 1/2, 'updown', 2 )

			busRight = Bus().fx.add( Schizo({chance:.5, rate:ms(250), length:ms(1000)}) ).pan( 1 ) // right
				drum.send(busRight, random(0.25,0.75))
			busLeft = Bus().fx.add( Schizo('paranoid') ).pan( -1 ) // left
				drum.send(busLeft, random(0.25,0.75))
		} 
		bass.attack = ms(225);
			bass.decay = ms(1100); 
			bass.sustain = ms(1300); 
			bass.release = ms(500);
			bass.resonance = Sine(0.05,.25)._;
			bass.cutoff = Sine(.25,0.05)._;
			bass.amp = 0.25;
			bass.fx[2].feedback = .65;
			bass.fx[2].dry = .55;
			bass.fx[2].wet = .5;
		pad.decay=ms(500);
			pad.amp = .6;
			pad.glide = .93;
		melodyLead.amp = .4;
	}
	else if (!night){
		if (rainy) {
			print ('rainy')  ;                         
			Clock.bpm(49);
			melodyLead = FM('glockenspiel')
	  			melodyLead.amp = .175;
	  			melodyLead.fx.add( Crush({bitDepth:16}),Vibrato(.02),Delay({time:1/4, feedback:.45, wet:.4, dry:.91}))


	  		pad = Synth2({ waveform:'Triangle',
						maxVoices:6, amp:.5, glide:.9, resonance:1, useADSR:true, 
	  				requireReleaseTrigger:false,
	  					attack:ms(4000), decay:ms(12000), sustain:ms(100), release:ms(2000) }) 
	  			
	  			.fx.add(Crush({bitDepth:16}), Vibrato(0.05)
	    		)
	  		
	  		drum = EDrums('x*x*', 1/16)
	  				drum.fx.add(Crush({bitDepth:16}))

			bass = Mono ({waveform:'Sine', glide:.45, useADSR:true, 
	  				requireReleaseTrigger:false,
	  					attack:ms(400), decay:ms(1000), sustain:ms(300), release:ms(1000)})
				
	  			.fx.add(Crush({bitDepth:16}), Vibrato(0.05),
	   			Delay({time:1/3, feedback:.9, dry: .05, wet:.9}))
	 
			arp = Arp( [0, 2, 4], 1/2, 'updown', 2 )

			busRight = Bus().fx.add( Schizo('paranoid') ).pan( 1 ) // right
			busLeft = Bus().fx.add( Schizo('paranoid') ).pan( -1 ) // left
		}
		else if (cloudy)
		{
			print ('cloudy');
			Clock.bpm(46)
			
			melodyLead = Synth({preset:'bleep'})
  				melodyLead.amp = .175;
  				melodyLead.fx.add( Crush({bitDepth:16}),Vibrato(.02),Delay({time:1/4, feedback:.65, wet:.5, dry:.91}))
  				//l = LPF()
				//l.cutoff = Add( .2, Sine(.3, .45)._ )
				//l.resonance = 1.5
				//melodyLead.fx.add(l)

	  		pad = Synth2({ waveform:'Triangle',
						maxVoices:6, amp:.5, glide:.9, resonance:1, useADSR:true, 
	  				requireReleaseTrigger:false,
	  					attack:ms(4000), decay:ms(12000), sustain:ms(100), release:ms(2000) }) 
	  			
	  			.fx.add(Crush({bitDepth:16}), Vibrato(0.05)
	    		)
	  		
	  		drum = EDrums('x*x*x*xx', 1/16)
	  				//drum.note.seq('.*.*.*.o'.split(""))
	  				drum.fx.add(Crush({bitDepth:16}))

			bass = Mono ({waveform:'Sine', glide:.45, useADSR:true, 
	  				requireReleaseTrigger:false,
	  					attack:ms(400), decay:ms(1000), sustain:ms(300), release:ms(1000)})
				
	  			.fx.add(Crush({bitDepth:16}), Vibrato(0.05),
	   			Delay({time:1/3, feedback:.9, dry: .05, wet:.9}))
	 		arp = Arp( [0, 2, 4], 1/2, 'updown', 2 )
	 				arp.target = melodyLead
	 				arp.seq.stop()
			ll = LPF()
			ll.cutoff = Add( .1, Sine(.05, .3)._ )
			//ll.resonance = Add(1,Sine(.01,4)._)
			bass.fx.add(ll);
			busRight = Bus().fx.add( Schizo('paranoid') ).pan( 1 ) // right
			busLeft = Bus().fx.add( Schizo('paranoid') ).pan( -1 ) // left
		}
		else 
		{
			Clock.bpm(59)
			melodyLead = FM('glockenspiel')
  				melodyLead.amp = .75;
  					melodyLead.fx.add( Crush({bitDepth:16}),Vibrato(.02),Delay({time:1/8, feedback:.45, wet:.4, dry:.91}))

  			pad = Synth2({ waveform:'Triangle',
					maxVoices:6, amp:.5, glide:.9, resonance:1, useADSR:true, 
  				requireReleaseTrigger:false,
  					attack:ms(4000), decay:ms(12000), sustain:ms(100), release:ms(2000) }) 
  			
  				pad.fx.add(Crush({bitDepth:16}), Vibrato(0.05)
    		)
  		
  			drum = EDrums('x*x*', 1/16)
  				drum.fx.add(Crush({bitDepth:16}))

			bass = Mono ({waveform:'Sine', glide:.45, useADSR:true, 
		  				requireReleaseTrigger:false,
		  					attack:ms(400), decay:ms(1000), sustain:ms(300), release:ms(1000)})
					
		  		bass.fx.add(Crush({bitDepth:16}), Vibrato(0.05),
		   			Delay({time:1/3, feedback:.9, dry: .05, wet:.9}))
 			
 			arp = Arp( [0, 2, 4], 1/2, 'updown', 2 )
	 				arp.target = melodyLead
	 				arp.seq.stop()
			
			busRight = Bus().fx.add( Schizo('paranoid') ).pan( 1 ) // right
			busLeft = Bus().fx.add( Schizo('paranoid') ).pan( -1 ) // left
		}
	}
	followLead = Follow (melodyLead.fx[1]);
	followPad = Follow(pad.fx[0]);
	followBass = Follow(bass.fx[2]);
	followDrum = Follow(drum.fx[0]);
}


function NewScore() {
	Master.amp(0);
  	
  	NewInstruments();
  	score = Score([0,
  		function() {
  			print ('newScore');
  			Master.fadeIn(2);
  		}, measures(2)
  		]).start();
  
	//drum.seq.stop();
	ranNote1  = notes[floor(random(notes.length))], ranNote2 = notes[floor(random(notes.length))],
	ranNote3  = notes[floor(random(notes.length))], ranNote4 = notes[floor(random(notes.length))],
	ranNote5  = notes[floor(random(notes.length))], ranNote6 = notes[floor(random(notes.length))],
	ranNote7  = notes[floor(random(notes.length))], ranNote8 = notes[floor(random(notes.length))],
	ranNote9  = notes[floor(random(notes.length))], ranNote10 = notes[floor(random(notes.length))],
	duration1 = durationz[floor(random(durationz.length))], duration2 = durationz[floor(random(durationz.length))],
	duration3 = durationz[floor(random(durationz.length))], duration4 = durationz[floor(random(durationz.length))],
	duration5 = durationz[floor(random(durationz.length))], duration6 = durationz[floor(random(durationz.length))];
	for (var i = 0; i <= floor(random(7)); i++)
  	{
    	noteArray1[i] = notes[floor(random(notes.length))];
  	}
  	for (var j = 0; j <= floor(random(7)); j++)
  	{
    	noteArray2[j] = notes[floor(random(notes.length))];
  	}
  	for (var k = 0; k <= floor(random(7)); k++)
  	{
    	noteArray3[k] = notes[floor(random(notes.length))];
  	}
  	for (var l = 0; l <= floor(random(7)); l++)
  	{
    	noteArray4[l] = notes[floor(random(notes.length))];
  	}
  	for (var m = 0; m <= floor(random(7)); m++)
  	{
    	noteArray5[m] = notes[floor(random(notes.length))];
  	}
  	for (var n = 0; n <= floor(random(3)); n++)
  	{
    	durationArray1[n] = durationz[floor(random(durationz.length))];
    }
    for (var o = 0; o <= floor(random(3)); o++)
  	{
    	durationArray2[o] = durationz[floor(random(durationz.length))];
    }
    for (var p = 0; p <= floor(random(3)); p++)
  	{
    	durationArray3[p] = durationz[floor(random(durationz.length))];
    }

	if (night){                          ////////////////// ////////    NIGHT TIME       ///////////////////////
		
		if (rainy || cloudy){
			rainLoopScore = Score([0,
				function() {
					print ('clave')
					clave.duration= 1/64;
				},
				measures(4),
				function() {
					clave.durations(1/16);
				}, measures(64)

				]).start().loop()
		
		}
		else {
		}
	score.stop();
	drum.stop();

  	bigScore = Score([0,
  		function() {
  			Master.amp(0)
  			drum.start();
			Master.fadeIn(2);
  		},
  		measures(2),
  		function(){
			////////lead melody score
			score = Score([0,
				function() {
					
				},
				measures(8),
				function() {
					innerScore = Score([0,
						function(){

							melodyLead.note.seq(ranNote2, [1/2,1/4,1/8,1/12,1/4,1/4,1/2,1,1/3].rnd());
							melodyLead.fx[2].time = duration1;
							drum.resonance = Sine(0.25,5)._;
						}, 
						measures(measuresRan[floor(random(measuresRan.length))]), 
						function() {
							melodyLead.note.seq([ranNote3, ranNote4].rnd(),durationArray2);
						},
						measures(measuresRan[floor(random(measuresRan.length))]),
						function() {
							melodyLead.note.seq.stop();
						},
						measures(measuresRan[floor(random(measuresRan.length))]),
						function() {
							melodyLead.note.seq(ranNote1, duration3);
							melodyLead.fx[2].feedback(random(0.45,0.93));
						},
						measures(floor(random(12))),
						function() {
							melodyLead.note.seq.stop();
						},
						measures(measuresRan[floor(random(measuresRan.length))])
					]).start();
					innerScore.loop();
				},
				measures(measuresRan[floor(random(measuresRan.length))] * 2), 
				function() {
					melodyLead.note.seq.stop();
				},
				measures(measuresRan[floor(random(measuresRan.length))]),
				function() {
					melodyLead.seq.shuffle;
				},
				measures(measuresRan[floor(random(measuresRan.length))]),
				function() {
					melodyLead.note.seq(noteArray5, durationArray1);
				},
				measures(measuresRan[floor(random(measuresRan.length))]),
				function() {
					melodyLead.seq.shuffle;
					melodyLead.note.seq.duration = durationArray2;
				},
				measures(measuresRan[floor(random(measuresRan.length))])
				]).start();
			score.loop();
						//////bass score
			score2 = Score([0,
				function(){
					print ('function 1 bass');
					
					bass.note.seq([ranNote1, ranNote1, ranNote1, ranNote1, ranNote1, ranNote1, ranNote1, ranNote1, 
									ranNote2, ranNote2, ranNote2, ranNote2, ranNote2, ranNote2, ranNote2, ranNote2, 
									ranNote3, ranNote3, ranNote3, ranNote3, ranNote3, ranNote3, ranNote3, ranNote3, 
									ranNote4, ranNote4, ranNote4, ranNote4, ranNote4, ranNote4, ranNote4, ranNote4],
						 		duration2)
					bass.octave = -2;
				},
				measures(measuresRan[floor(random(measuresRan.length))] * floor(random(1,4))),
				function(){
					bass.note.seq([ranNote5, ranNote5, ranNote5, ranNote5, ranNote6, ranNote6, ranNote6, ranNote6, 
									ranNote5, ranNote5, ranNote7, ranNote7, ranNote8, ranNote8, ranNote4, ranNote4], 
								duration3)
					//bass.octave = floor(random(-2,2));
					bass.octave2 = floor(random(-1,1));
					bass.octave3 = floor(random(-1,1));
				},
				measures(measuresRan[floor(random(measuresRan.length))]) * floor(random(1,4)),
				function(){
					
					bass.note.seq.stop();
				},
				measures(measuresRan[floor(random(measuresRan.length))] * floor(random(1,4)))
				]).start()
			score2.loop();
				/////// pad score
			score3 = Score([0,
				function(){
					
					pad.chord.seq([noteArray3,noteArray2],2)
					pad.attack(floor(random(2000,4500)));
					
				},
				measures(measuresRan[floor(random(measuresRan.length))]),
				function(){
					pad.attack(floor(random(40,100)));
					pad.chord.seq([[ranNote1, ranNote3, ranNote5],[ranNote2, ranNote4, ranNote6]],1/2)
					pad.octave = floor(random(-1,3));
				},
				measures(measuresRan[floor(random(measuresRan.length))]),
				function(){
					pad.note.seq(noteArray3, [1/8, 1/4].rnd());
					pad.octave = floor(random(-1,3));
				},
				measures(measuresRan[floor(random(measuresRan.length))]),
				function(){
					print ('chord');
					pad.attack(floor(random(800,2000)));
					xx = Seq({ chord:[ [ranNote1,ranNote2, ranNote3, ranNote4], [ranNote5,ranNote6, ranNote7, ranNote8], 
									[ranNote1, ranNote3, ranNote5, ranNote7], [ranNote6, ranNote4, ranNote10, ranNote9] ].rnd(),
						 			durations:duration7, target:pad})
					pad.octave = floor(random(-1,2));
				},
				measures(measuresRan[floor(random(measuresRan.length))]),
				function(){
					xx.stop();
				},
				measures(measuresRan[floor(random(measuresRan.length))]),
				function(){
					pad.chord.seq([[ranNote6, ranNote5], [ranNote2, ranNote1], [ranNote4, ranNote3], [ranNote10, ranNote9]], durationArray2)
					pad.octave = floor(random(-1,2));
				},
				measures(measuresRan[floor(random(measuresRan.length))]),

				]).start()
			score3.loop();
	}]).start()
}
	else if (!night) {                                           ////////////// DAY TIME night = false //////////////////
		if (rainy) {     
		                                      //////////  RAINY DAY    //////////////////
			Clock.bpm(50);
			score.stop();
			drum.stop();
			bass.resonance.seq([0,0.1,0.2,0.4,0.6,0.8].rnd(), [1,4,2,4,8,12,3,1,1,6,8,6].rnd());
			bass.cutoff.seq([.1,.2,.3,.4], 1/2);
			bass.attack = ms(445);
			bass.decay = ms(1000);
			bass.sustain = (300);
			bass.release = (1000);
			melodyLead.fx[2].wet = .45;
			melodyLead.fx[2].dry = .4;
			melodyLead.fx[2].send( busLeft, .75 ) 
			melodyLead.fx[2].send( busRight, .75 ) 
			busRight.fx[0].chance = .25;
			busRight.fx[0].pitchChance = 0;
			busLeft.fx[0].pitchChance = 0;
			busLeft.fx[0].reverseChange = .4; 
			busRight.fx[0].rate = ms(410);
			busRight.fx[0].length = ms(42500);

		  	bigScore = Score([0,
		  		function() {
		  			Master.amp(0)
  					//drum.start();
					Master.fadeIn(2);
		  		},
		  		measures(0),
		  		function(){
					score = Score([0,
						function() {
							melodyLead.fx[2].feedback = random(.8,.95);
						},
						measures(0),
						function() {
							innerScore = Score([0,
								function(){
									melodyLead.note.seq(noteArray1, duration3);
									melodyLead.useADSR = true;
									melodyLead.sustain = Sine(0, 22050)._;
									melodyLead.index = Sine( .1, 5 )._;
									melodyLead.fx[2].time = duration1;
								}, 
								measures(measuresRan[floor(random(measuresRan.length))]), 
								function() {
									melodyLead.seq.stop();
								},
								measures(measuresRan[floor(random(measuresRan.length))]), 
								function() {
									melodyLead.note.seq(noteArray1,duration2);
								},
								measures(measuresRan[floor(random(measuresRan.length))]),
								
								function() {
									melodyLead.seq.stop();
								},
								measures(measuresRan[floor(random(measuresRan.length))])
							]).start().loop();
						},
						measures(measuresRan[floor(random(measuresRan.length))] * 2), 

						function() {
							melodyLead.seq.stop();
							//melodyLead.preset = presetLeadArray[floor(random(presetLeadArray.length))];
						},
						measures(measuresRan[floor(random(measuresRan.length))]),
					

						function() {
							melodyLead.seq.stop();
						},
						measures(measuresRan[floor(random(measuresRan.length))]),
						function() {

							melodyLead.note.seq(noteArray5, durationArray1)
							melodyLead.seq.shuffle;
							melodyLead.preset = presetLeadArray[floor(random(presetLeadArray.length))];
						},
						measures(measuresRan[floor(random(measuresRan.length))]),
						function() {

							melodyLead.note.seq(noteArray4, duration1)
							melodyLead.preset = presetLeadArray[floor(random(presetLeadArray.length))];
						},
						measures(measuresRan[floor(random(measuresRan.length))])
						]).start();
					score.loop();

					score2 = Score([0,
						function(){
							print ('function 1 bass');
							bass.note.seq(noteArray4, 1)
							bass.octave = floor(random(-1,2));
							bass.octave2 = floor(random(-1,2));
							bass.octave3 = floor(random(-1,2));
							bass.amp (0.25);
							bass.detune2.seq( Rndf(0,.015) )
		    				bass.detune3.seq( Rndf(0,.015) )
						},
						measures(measuresRan[floor(random(measuresRan.length))] * floor(random(1,4))),
						function(){
							print ('function 2 bass');
							bass.note.seq(noteArray5, duration1)
							bass.octave = floor(random(-1,2));
							bass.octave = floor(random(-1,2));
							bass.octave = floor(random(-1,2));
						}]).start().loop();

					score3 = Score([0,
						function(){
							print ('function 1 pad');
							pad.chord.seq( [ [ranNote1,ranNote2, ranNote3, ranNote4], [ranNote5,ranNote6, ranNote7, ranNote8], [ranNote1, ranNote3, ranNote5, ranNote7], [ranNote6, ranNote4, ranNote10, ranNote9] ].rnd(), 2 )
							pad.amp (0.45);
							//pad.attack(500);
						},
						measures(measuresRan[floor(random(measuresRan.length))] * 2),
						function(){
							print ('function 2 pad');
							pad.chord.seq.stop();
							pad.note.seq(noteArray4, 1/8);
							pad.octave = floor(random(-1,3));
						},
						measures(measuresRan[floor(random(measuresRan.length))] * 2),
						function(){
							print ('function 3 pad');
							pad.chord.seq([[ranNote6, ranNote5], [ranNote2, ranNote1], [ranNote4, ranNote3], [ranNote10, ranNote9]], floor(random(2,5)))
							pad.octave = floor(random(-1,2));
						},
						measures(measuresRan[floor(random(measuresRan.length))] * 2),
						function(){
							pad.chord.seq.stop();
							pad.note.seq.stop();
						}, 
						measures(measuresRan[floor(random(measuresRan.length))] * 2)

						]).start().loop();
			}]).start()
		}
		else if (cloudy)                             /////////////////////// CLOUDY DAY ///////////////////////
		{
		//	score.stop();
		//	drum.stop();
  	bigScore = Score([0,
  		function() {
  			Master.amp(0)
  			drum.start();
			Master.fadeIn(2);
  		},
  		measures(2),
  		function(){
			score = Score([0,
				function() {
					melodyLead.attack(floor(random(100,250)));
				},
				measures (measuresRan[floor(random(measuresRan.length))] * 2),
				function() {
					innerScore = Score([0,
						function(){
							//melodyLead.note.seq()
							melodyLead.attack(floor(random(100,250)));
							print('arp1')
							arp.chord.seq([noteArray3,noteArray2,noteArray3,noteArray1,noteArray3,noteArray2,noteArray3,noteArray1], floor(random(1,5)))
							arp.seq.speed = [1/16, 1/16, 1/8, 1/16, 1/16, 1/16, 1/16, 1/16, 1/16, 1/16, 1/2].rnd()
						},
						measures (measuresRan[floor(random(measuresRan.length))] * 2),
						function(){
							print('arp over')
							arp.seq.stop()
							melodyLead.attack(floor(random(100,250)));
							melodyLead.note.seq(noteArray3, durationArray2)
						},
						measures (measuresRan[floor(random(measuresRan.length))] % 2),
						function(){

							melodyLead.seq.stop()
						},
						measures (measuresRan[floor(random(measuresRan.length))] % 2),
						function(){
							melodyLead.attack(floor(random(200,250)));
							melodyLead.note.seq(noteArray3, durationArray2)
						},
						measures (measuresRan[floor(random(measuresRan.length))] % 2),
						function(){
							melodyLead.seq.stop();
						},
						measures(4)
						]).start().loop()
				},
				measures(measuresRan[floor(random(measuresRan.length))] * 2),
				function() {
					melodyLead.attack(floor(random(20,250)));
						
				},
				measures(measuresRan[floor(random(measuresRan.length))]),
				function() {
					melodyLead.attack(floor(random(100,250)));
				},
				measures(measuresRan[floor(random(measuresRan.length))] * 2),
				function() {
					melodyLead.note.seq(noteArray5, durationArray1)
				},
				measures(measuresRan[floor(random(measuresRan.length))]),
				function() {
					melodyLead.seq.stop()
				},
				measures(measuresRan[floor(random(measuresRan.length))]),
				function() {
					melodyLead.attack(floor(random(100,250)));
				},
				measures(measuresRan[floor(random(measuresRan.length))]),
				]).start().loop();

			score2 = Score([0,
				function(){
					bass.note.seq(noteArray4, 1)
					bass.octave = floor(random(-1,2));
					bass.amp (0.3);
					bass.detune2.seq( Rndf(0,.005) )
	    			bass.detune3.seq( Rndf(0,.005) )
						},
				measures(measuresRan[floor(random(measuresRan.length))] * floor(random(1,4))),
				function(){
					print ('bass 2 d, r')
					bass.note.seq(noteArray5, duration1)
					bass.octave = floor(random(-1,2));
				//	bass.octave = floor(random(-1,2));
				//	bass.octave = floor(random(-1,2));
				},
				measures(measuresRan[floor(random(measuresRan.length))] * floor(random(1,4))),
				function(){
					print ('bass 3')
					bass.seq.stop();
					bass.octave = floor(random(-1,2));
				//	bass.octave = floor(random(-1,2));
				//	bass.octave = floor(random(-1,2));
				},
				measures(measuresRan[floor(random(measuresRan.length))] * floor(random(1,4))),
				function(){
					print('bass 4 d, r')
					bass.note.seq(noteArray5, duration1)
					bass.octave = floor(random(-2,2));
				//	bass.octave = floor(random(-1,2));
				//	bass.octave = floor(random(-1,2));
				},
				measures(measuresRan[floor(random(measuresRan.length))] * floor(random(1,4))),
				function(){
					print ('bass5  next to last d, r')
					bass.seq.stop();
					bass.octave = floor(random(-1,2));
				//	bass.octave = floor(random(-1,2));
				//	bass.octave = floor(random(-1,2));
				},
				measures(measuresRan[floor(random(measuresRan.length))] * floor(random(1,4))),
				function(){
					print ('bass final')
					bass.note.seq(noteArray5, duration1)
					bass.octave = floor(random(-2,2));
				//	bass.octave = floor(random(-1,2));
				//	bass.octave = floor(random(-1,2));
				},
				measures(measuresRan[floor(random(measuresRan.length))] * floor(random(1,4))),
						]).start()
					score2.loop();

			score3 = Score([0,
				function(){
					pad.chord.seq( [ [ranNote1,ranNote2, ranNote3, ranNote4], [ranNote5,ranNote6, ranNote7, ranNote8], [ranNote1, ranNote3, ranNote5, ranNote7], [ranNote6, ranNote4, ranNote10, ranNote9] ], 2 )
					pad.amp (0.45);
					print ('pad1')
					//pad.attack(500);
				},
				measures(measuresRan[floor(random(measuresRan.length))] * 2),
				function(){
					pad.note.seq(noteArray4, [1/8,1/4,1/2].rnd());
					pad.octave = floor(random(-1,3));
					print ('pad')
				},
				measures(measuresRan[floor(random(measuresRan.length))] * 2),
				function(){
					pad.seq.shuffle();
					print ('ad 3')
					//pad.octave = floor(random(-1,2));
				},
				measures(measuresRan[floor(random(measuresRan.length))] * 2),
				function(){
					pad.note.seq([ranNote6, ranNote2, ranNote1, ranNote4, ranNote3, ranNote10, ranNote9], durationArray2)
					pad.octave = floor(random(-1,2));
					print ('pad 4')
				},
				measures(measuresRan[floor(random(measuresRan.length))] * 2),
				function(){
					pad.note.seq(noteArray4, durationArray2)
					pad.octave = floor(random(-1,2));
					print ('pad 5')
				},
				measures(measuresRan[floor(random(measuresRan.length))] * 2),

				]).start()
			score3.loop();
	}]).start()
		}
		else                                        ////////////////       CLEAR DAY //////////////////////////////
		{
			
			score.stop();
	//bigScore.stop();
	drum.stop();
	
	//drum.seq.note( 'xoxo');
	//drum = XOX('x*x*', 1/16)
  	//			drum.fx.add(Crush({bitDepth:16}))
  	bigScore = Score([0,
  		function() {
  			Master.amp(0)
  			drum.start();
			Master.fadeIn(2);
  		},
  		measures(2),
  		function(){
			score = Score([0,
				function() {
					melodyLead.seq.stop()	
				},
				measures(0),
				function() {
					innerScore = Score([0,
						function(){
							melodyLead.amp(.25);
							arp.chord.seq([noteArray3,noteArray2,noteArray3,noteArray1,noteArray3,noteArray2,noteArray3,noteArray1], floor(random(1,5)))
							arp.seq.speed = 1/32
							arp.seq.pattern = patternArray[floor(random(0,4))]
							melodyLead.note.seq(noteArray1, duration3);
							melodyLead.sustain = Sine(0, 22050)._;
							melodyLead.index = Sine( .1, 5 )._;
							melodyLead.fx[2].time = duration1;
						}, 
						measures(measuresRan[floor(random(measuresRan.length))]), 
						function() {
							melodyLead.note.seq(noteArray5,duration2);
						},
						measures(floor(random(12))),
						function() {
							melodyLead.note.seq.stop();
						},
						measures(floor(random(12)))
					]).start();
					innerScore.loop();
				},
				measures(measuresRan[floor(random(measuresRan.length))]), 
				
				function() {
					arp.seq.stop();
					melodyLead.note.seq.stop();
				},
				measures(measuresRan[floor(random(measuresRan.length))]),
			

				function() {
					melodyLead.preset = presetLeadArray[floor(random(presetLeadArray.length))];
				},
				measures(measuresRan[floor(random(measuresRan.length))]),
				function() {

					melodyLead.note.seq(noteArray5, durationArray1)
					melodyLead.seq.shuffle;
					melodyLead.preset = presetLeadArray[floor(random(presetLeadArray.length))];
				},
				measures(measuresRan[floor(random(measuresRan.length))]),
				function() {

					melodyLead.note.seq(noteArray4, duration1)
					melodyLead.preset = presetLeadArray[floor(random(presetLeadArray.length))];
				},
				measures(floor(random(8,24))),
				function() {

					melodyLead.seq.stop()
					melodyLead.preset = presetLeadArray[floor(random(presetLeadArray.length))];
				},
				measures(floor(random(8,24))),
				]).start();
			score.loop();

			score2 = Score([0,
				function(){
					print ('function 1 bass');
					bass.note.seq(noteArray4, 1)
					bass.octave = floor(random(-1,2));
					bass.octave2 = floor(random(-1,2));
					bass.octave3 = floor(random(-1,2));
					bass.amp (0.25);
					bass.detune2.seq( Rndf(0,.015) )
    				bass.detune3.seq( Rndf(0,.015) )
				},
				measures(measuresRan[floor(random(measuresRan.length))] * floor(random(1,4))),
				function(){
					print ('function 2 bass');
					bass.note.seq(noteArray5, duration1)
					bass.octave = floor(random(-1,2));
					bass.octave = floor(random(-1,2));
					bass.octave = floor(random(-1,2));
				}]).start()
			score2.loop();

			score3 = Score([0,
				function(){
					print ('function 1 pad');
					pad.chord.seq( [ [ranNote1,ranNote2, ranNote3, ranNote4], [ranNote5,ranNote6, ranNote7, ranNote8], [ranNote1, ranNote3, ranNote5, ranNote7], [ranNote6, ranNote4, ranNote10, ranNote9] ].rnd(), 2 )
					pad.amp (0.45);
					
				},
				measures(measuresRan[floor(random(measuresRan.length))] * 2),
				function(){
					print ('function 2 pad');
					pad.note.seq(noteArray4, 1/8);
					pad.octave = floor(random(-1,3));
				},
				measures(measuresRan[floor(random(measuresRan.length))] * 2),
				function(){
					print ('function 3 pad');
					pad.chord.seq([[ranNote6, ranNote5], [ranNote2, ranNote1], [ranNote4, ranNote3], [ranNote10, ranNote9]], floor(random(1,5)))
					pad.octave = floor(random(-1,2));
				}

				]).start()
			score3.loop();
	}]).start()
		}

	}

}
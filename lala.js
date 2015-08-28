var ticker = 0, songs = [], 
beets = [1, 1/1.5, , , , 1/2, 1/2, 1/3, 1/3,1/6, 1/4, 1/4, 1/4,1/8, 1/8,1/8,1/16, 1/16, 1/32],
effectsTypes = [ [LPF, 'rising']  , [Delay, 'endless', 'wobbler', 'nightChill'],
	[Schizo, 'sane', 'borderline', 'pitchless'], [Vibrato, 'light']];
	effectsProperties = [ ['LPF', ['cutoff',0,1], ['resonance', 0,5] ]  , ['Delay', ['time',0,1], ['feedback', 0,5]],
	['Schizo', ['chance', 0,1], ['reverseChance',0,1], ['mix',0, 1],
    ['length', 1/4,1/3,1/8,1/16,1/2]], ['Vibrato', ['rate',.01,5], ['offset',25,1250 ], ['amount', 25,100]]];


function setup() {
	canvas = createCanvas( windowWidth, windowHeight);
	middieX = windowWidth / 2;
	middleY = windowHeight / 2;

	Clock.bpm(floor(random(55,75)));
	
	RandomWeather();
	NewSong(0);
	count = 0;
}

function draw() {

}

function NewSong(t) {
	song = new Song('ho', t);

	song.make();
	console.log(t + " t " + "song " + song.name)
	songs[t].groupSynths(3);
	songs[t].songCreate();
	//songs[t].newFollow();
}

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
    	//switch between two songs to make fade/transition smooth
    	 if (ticker == 0){
    	 	//aSong.stop();
    	 	songs[0].songFadeOut(1);
    	 	//go = false;
    	 	ticker = 1;	
    	 }
    	 else if (ticker == 1){
    	 	//bSong.stop();
    	 	songs[1].songFadeOut(0);
    	 	//go = false;
    	 	ticker = 0;	
    	}
    }
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

 var Song = function(n, place){
 	this.name = n;
 	this.make = function() {
 		//put bpms here
 		//Clock.bpm (bpm var);
 		var innerSong = (function () {
 			var scoreInSong, arp, arps = [], bw, columns, space, innerSongBus,
 			tracks = [], syns = [], busses = [], currentSeqs = [], effector, fols = [];

 			var Updater = function (p, c) {
 				// p is place in syns index/for loop
 				// c is count
 				// nr is note (or melody) return, br is beets return
 				var nR, bR, stop = false, chord = false, ignore = false, 
 				coin = CoinReturn(), synth = syns[p][0],
				synthKind = syns[p][1];

				if (synthKind == 'lead') {
					
				}
 			}
 		})
 	}
 }
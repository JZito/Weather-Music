// to do--- fix for loop in score- set it back to individual score for each instrument
// 
var state, uno, vanillaNotes = [12,11,9,7,4,2,0], vanillaMeasures = [1,2,4,6,8,12,16], 
beets = [1, 1/2, 1/4, 1/8,1/16, 1/32], beepEM = 67, rotations = [2,4,6,8], pieces = [],
measureCount = 0, mainScore, bassWaveform = ['Saw','Sine','Triangle', 'Square'], 
presetLeadArray = ['gong', 'brass', 'bass', 'bass','clarinet', 'glockenspiel', 'glockenspiel', 'glockenspiel'];

function setup() {
	canvas = createCanvas( windowWidth, windowHeight );
	Clock.bpm(beepEM);
	
	// Song.scoreCreate(Song.publicSyns);
	StartIt();

}
function StartIt() {
	song = new Song('hi');
	song.make();
	console.log(pieces[0])
	pieces[0].testReturn();
	//song.Sooong.testReturn();
	

};

function draw() {
	CheckTheTime(minute());
}

var Harmony = (function () {

  	var notesReturn = function (oct, lowRange, highRange) {
  		var scoreNotes = [];
    	for (var i = 0; i < floor(random(lowRange,highRange)); i++) {
      		scoreNotes[i] = vanillaNotes[floor(random(0,vanillaNotes.length))] + oct;
    	}
    	return scoreNotes;
    // public
  	};

  	var beetsReturn = function (mul) {
  		var scoreBeets = [];
    	for (var i = 0; i < floor(random(1,8)); i++) {
      		scoreBeets[i] = beets[floor(random(1,beets.length))] * mul;
    	}
    	return scoreBeets;
  	};

  	var chordsReturn = function (c, cLength) {
  		var chords = [], oct = [-12,-12,-12,0,0,0,12,12,24], pedalPoint = vanillaNotes[floor(random(vanillaNotes.length))];
		console.log(pedalPoint + "returnChordsArray");
		for (var i = 0; i < c; i++){
			var innerChord= [];
			console.log("every loop")
			//create first chord
			if (i == 0){
				for (var j = 0; j < cLength; j++) {
					//first note is pedal point
					if (j==0){
						innerChord.push(pedalPoint)
					}
					else if (j >= 1){
						var n = vanillaNotes[floor(random(vanillaNotes.length))];
						innerChord.push(n + oct[floor(random(oct.length))]);
						console.log("inside first loop")
					}
				}
			}
			// create additional chords
			else if( i >= 1) {
				for (var j = 0; j < cLength; j++) {
					// first note is pedal point
					if (j==0){
						innerChord.push(pedalPoint)
					}
					else if (j >= 1) {
						var n = vanillaNotes[floor(random(vanillaNotes.length))];
						//if this note is the same as the note in the same spot of the last chord
						if (n == chords[(i - 1)][j]) {
							//o is new note
							var o = n - 1;
							//if new note o is in key
							if (vanillaNotes.indexOf(o) >= 0){
								console.log("o " + " if indexof(o) >= 0 " + o)
								innerChord.push(o + oct[floor(random(oct.length))]);
							}
							//else if new note o is not in key, move it down one more step
							else if (vanillaNotes.indexOf(o) == -1){
								o = o -1;
								console.log("o " + " else " + o)
								innerChord.push(o);
							}
						}

						else if (n != chords[(i-1)] [j]) {
							innerChord.push(n + oct[floor(random(oct.length))]);
						}
					}
				}
			
			}
				chords.push(innerChord);
				console.log(innerChord);
		}
		return chords;

  	}
  
  	return {
    	notesReturn: notesReturn,
    	beetsReturn: beetsReturn,
    	chordsReturn: chordsReturn
  	};

})();

function CheckTheTime(time) //function check the time
 {
    var previousState = state; 
    state = time;
    //football = musicMakers[0];
    if (state != previousState) 
    {
    	if (ticker == 0){
    		//change pieces[0]
    		ticker = 1;
    	}
    	else if (ticker == 1){
    		ticker = 0;
    	}
		//Song.scoreFadeOut();
   }
 }

var Song = function (n) { //enclose song
	console.log('first level');

	this.name = n;
			   
	this.make = function() {
		console.log('second level');
		var Sooong = (function () {
			console.log('third level');
			var score, syn, syns = [], m = 4, scorePhrases = 9,
			presets = ['cascade', 'bleep', 'bleepEcho', 'rhodes', 'warble'],
			padPresets = ['pad2','pad4', 'rainTri' ];
			//it can all happen in here. handle each score, handle each instrument
			// array of syn objects can live here but be changed by a public method
			// syns = [];
			// public method to restart clears objects
			// syn is the object to be effected... how to assign?
			// privtely fill details of score
		    // check the time function will be calling module.clear method to start over
		    // use a circle ? for each follow... needs to be referenced from draw. call method from draw? how
		    // will that work?
			var scoreDetails = function(m) {
				  var steps = [], newM, newC, pm, sto, beetsVar = Harmony.beetsReturn(1);;
				  if (syns[m][1] == 'lead') {
						newM = function(){
							var nR = Harmony.notesReturn(0,16,17);	  							
				  			syns[m][0].note.seq(nR, beetsVar)
					  ;}, 
					 	newC = function(){
					  		var nR = Harmony.notesReturn(-12, 4, 8), bV = beetsVar;
					  		syns[m][0].note.seq(nR, bV)
				      ;}, 
					    pm = function(){
					  		var nR = Harmony.notesReturn(-12, 4, 8), bV = beetsVar;
					  		syns[m][0].note.seq(nR, bV)
				      ;}, 
					    sto = function(){
					  		syns[m][0].note.seq.stop()
					  ;};
				   var functions = [newM, newC, pm, sto]; 
				}
				else if (syns[m][1] == 'pad'){ 
						newM = function(){
							var nR = Harmony.notesReturn(-12,2,4);	  							
				  			syns[m][0].note.seq(nR, beetsVar)
					  ;}, 
					 	newC = function(){
					  		var nR = [0,12,11,12,11,12,11,19], bV = beetsVar;
					  		syns[m][0].note.seq(nR, bV)
				      ;}, 
					    pm = function(){
					  		var nR = [0,0,0,0,-1,-1,-1,-1], bV = beetsVar;
					  		syns[m][0].note.seq(nR, bV)
				      ;}, 
					    sto = function(){
					  		syns[m][0].note.seq.stop()
					  ;};
				   var functions = [newM, newC, pm, sto]; 

				}
				for (var i = 0; i < scorePhrases; i++){
				    if (i == 0){
				    	steps.push(0);
				     // console.log(steps[i] + i);
				    }
				    //prevent seq from repeating itself (but this is not accounting for all circumstances, must solve )
				    else if (i == 1 || steps[i-2] == sto) {
				    	var n =  functions[floor(random(functions.length - 1))] ;
				    	steps.push(n)
				    }
				    else if ((i+2)%2==0 ) {
				      //length of each step
				    	steps.push(measures(vanillaMeasures[floor(random(vanillaMeasures.length))]));
				    //  console.log(steps[i] + i);
				    }
				    
				    else {
				    	var n =  functions[floor(random(functions.length))] ;
				    	steps.push(n);
				    //  console.log(n + i + mm);
				    }
				  }
				return steps;
			};

			return {
				publicSyns: syns,
				//need a for loop to create each instrument and add to the syn array
				// groupsynths is create a whole group of individual synthcreates
				groupSynths: function(q) {
					console.log("suuup");
					// q is number of instruments to create
					for (var i = 0; i <= q; i++){
						if (i == 2) {
							synth = new Song.synthCreate(i, 'pad', 'oo');
							synth.make();
						}
						else {
							synth = new Song.synthCreate (i, 'lead', 'oo');
							synth.make();
						}
						
						//Song.scoreCreate(i);
					}
				},
				testReturn: function(){
					console.log(n + "testReturn");
				},
				synthCreate: function (name, kind, pre) {
					var leadInstruments = [FM, Pluck, Synth], padInstruments = [Synth2];
					  // name - name object, kind - role of instrument (lead, pad etc), pre- preset,
					  //reference item by spot in syns array... current plan is to assign each to specific
					  // spot. syns[0] = lead, 1 = pad, 2 = bass, 4 = lead2, 5 = noise, 6 = drums
					this.name = name;
					   
					this.make = function() {
					var instrumentKind;
					if (kind == 'lead') {
					    	instrumentKind = leadInstruments[0];
					    	pre = 'glockenspiel';
					    	console.log( this.name + " is born " + pre + ' pre ' )
					  	}
					    
					else if (kind == 'pad') {
					    	instrumentKind = Synth2;
					    	pre = padPresets[floor(random(padPresets.length))];
					  	}

					else if (kind == 'bass'){
					  		instrumentKind = Mono;
					    	pre = 'waveBass';
					    }
					name = instrumentKind(pre)

					var valueToPush = new Array();
							valueToPush[0] = name;
							valueToPush[1] = kind;
					syns.push(valueToPush);
					    // pluck is very quiet
				    if (instrumentKind == Pluck) {
					      name.amp(2.25)
				    }
				  }
				},
				clearr: function(c) {
					syns[c][0].kill();

				}, 
				scoreCreate: function() {
					
					//scorecreate needs to pass var for scoredetails(var)
					//remove for loop from scoredetails
					
					score= Score([0,
						function(){ 
							// can assign fx in here but should have accessible variable above it somewhere
							Master.fadeIn(2);
							drum = XOX('x*x*', 1/16);
							drum.amp(.25);
							for (var i = 0; i < Song.publicSyns.length; i++){
								var ss = scoreDetails(i);
		  						inScore = Score(ss).start().loop();
		  				}
		  			}, measures(2),
		  				function(){
		  					Master.amp(1);
		  				}, measures(680)]).start().loop();
		  			},
		  		scoreFadeOut: function() {
		  			scoreFade = Score([0,
		  				function(){
		  					Master.fadeOut(2);
		  					//will need to make this main bus, assign main bus in creation
		  				}, measures(2),
		  				function(){
		  					score0.stop();
		  					for (var i = 0; i < syns.length; i++){
		  						Song.clearr(i);
		  					}
		  				}, measures(1)]);
		  			}
		  		};
		  			
					//s = Score([scoreDetails(syns[q])]).start().loop();
			})();//inner song enclosure
		pieces.push(Sooong);
	}
	// return {
	// 	newSong : Song
	// }
	
}; //new enclosure 

//})

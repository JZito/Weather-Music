var bpm = 120, globalSR = 44100, vanillaMeasures = [1,2,4,6,8,12,16], vanillaNotes = [0,2,4,7,9,11,12], beets = [1, 1/2, 1/4, 1/8,1/16], scorePhrases = 9, musicMakers = [],
effects = [], rain = true, state, previousState, cloud;

function ExampleScore(mM) {
  //call scoreSteps to return array of sequences to fill Score
  var ss = scoreSteps(mM);
  score = Score(ss).start().loop()
};

function scoreSteps(mm) {
  //steps is each entry for score, nm - sto are functions for the odd numbered entries, 
  //first is always 0 thought possibly can be changed, even is always measure counts
  var steps = [], nm = function(){mm.note.seq(varInSeqPar, beetsVar);}, sp = function(){mm.note.seq(ReturnNotesArray(-12, 4, 8), beetsVar);}, 
  pm = function(){mm.note.seq(ReturnNotesArray(0, 4, 8), ReturnBeetsArray(1));}, sto = function(){mm.note.seq.stop();},
  objects = [nm, sp, pm, sto];
  if (rain){
    varInSeqPar = ReturnRainNotesArray(0,16,17);
    beetsVar = ReturnBeetsArray(2);
  }
  else if (mm = musicMakers[2]) {
    varInSeqPar = ReturnBassNotesArray(0,1,2, 2);
    beetsVar = [4,4,4,4,2,2,2,2];
  }
  else {
    varInSeqPar = ReturnNotesArray();
  }
  //going to need object score will be referencing
  for (var i = 0; i < scorePhrases; i++){
    if (i == 0){
      steps.push(0);
     // console.log(steps[i] + i);
    }
    //prevent seq from repeating itself (but this is not accounting for all circumstances, must solve )
    else if (i == 1 || steps[i-2] == sto) {
      var n =  objects[floor(random(objects.length - 1))] ;
      steps.push(n)
    }
    else if ((i+2)%2==0 ) {
      //length of each step
      steps.push(measures(vanillaMeasures[floor(random(vanillaMeasures.length))]));
    //  console.log(steps[i] + i);
    }
    
    else {
      var n =  objects[floor(random(objects.length))] ;
      steps.push(n);
      console.log(n + i + mm);
    }
  }

    return steps;
}

function setup () {
  var bpmToS, bpm = 77;
  Clock.bpm(bpm);
  bpmToS = 60 / bpm;
  console.log(bpmToS);
  canvas = createCanvas( windowWidth, windowHeight );
  CreateInstrumentAndFx();
  ExampleScore(musicMakers[0]);
  ExampleScore(musicMakers[1]);
  ExampleScore(musicMakers[2]);
  //drum = EDrums('x.*.x.*.x.*.x.-.', 1/16)

  /**###Gibberish.Synth2.waveform : property  
String. The type of waveform to use. Options include 'Sine', 'Triangle', 'PWM', 'Saw' etc.
**/

  // pad = FM({ waveform:'Sine',
  //   maxVoices:6, amp:.25, glide:.95, useADSR:true, 
  //   requireReleaseTrigger:false,
  //     attack:bpmToS *4, decay:bpmToS *1, sustain:bpmToS *2, release:0 }) 
  
  // .fx.add(Crush({bitDepth:16}), Vibrato(0.05), Delay(1/6,.85 ) )
  // .chord.seq([[12,11,7], [14,11,5], [12,11,4], [14,11,4]], [4,1,1/4,1/4])
};

function draw () {
  // has the time changed? check.
  CheckTheTime(minute());
};

function music(name, kind, pre) {
  var leadInstruments = [FM, Pluck, Synth], presets = ['cascade', 'bleep', 'bleepEcho', 'rhodes', 'warble'],
      padInstruments = [Synth2], padPresets = ['pad2','pad4', 'rainTri' ];
  // name - name object, kind - role of instrument (lead, pad etc), pre- preset,
  //reference item by spot in musicmakers array... current plan is to assign each to specific
  // spot. musicMakers[0] = lead, 1 = pad, 2 = bass, 4 = lead2, 5 = noise, 6 = drums
  this.name = name;
   
  this.make = function() {
   if (kind == 'lead') {
    var instrumentKind = leadInstruments[floor(random(3))]
    if (instrumentKind == Pluck){
        pre = {};
      }
    else if (instrumentKind == Synth){
        pre = presets[floor(random(3))];
      }
    else if (instrumentKind != Synth || Pluck){
        pre = 'glockenspiel';
      }
        //create the synth object 
    console.log( this.name + " is born " + pre + ' pre ' )
    name = instrumentKind(pre)
    if (instrumentKind == Pluck) {
      name.amp(1.25)
    }
    if (!musicMakers[0]){
      musicMakers.push(name);
  }
    else {
      musicMakers[0] = name;
    }
  }

  else if (kind == 'pad') {
    var instrumentKind = padInstruments[0],
    pre = padPresets[floor(random(padPresets.length))];
      //create the synth object 
    console.log( this.name + " is born " + pre + ' pre ' )
    name = instrumentKind(pre)
    if (!musicMakers[1]){
      musicMakers.push(name);
  }
    else {
      musicMakers[1] = name;
    }
  }

  else if (kind == 'bass'){
    console.log( this.name + " is born " + pre + ' pre ')
    name = Mono('waveBass')
    musicMakers.push(name);
    }
  }
};

function FX(name, kind) {
  
  this.name = name;
  this.make = function() {
    var bd = "bitDepth:" + 2,
       sr= "sampleRate:" + Math.round(random(0.01,0.05) * 100) / 100,
       t = "time:" + 1/8
    //Gibber formatting
//ex  synthName =  Synth('preset')
    name = kind({t});
    effects.push(name);
    console.log(bd + sr)
  };
};

function CreateInstrumentAndFx() {
 // var beep = FXMod.createCrush().bitDepth;
  leadSynth = new music ("leadSynth", 'lead', 'oo')
  leadSynth.make()
  padSynth = new music ("padSynth", 'pad', 'oo')
  padSynth.make()
  bass = new music ("bassSynth", 'bass', 'oo')
  bass.make()
  crush = new FX("hippo", Delay)
  crush.make()
  //musicMakers[0].note.seq(ReturnNotesArray(0, 2,24), 1/4)
  //musicMakers[1].note.seq([-24,-12,-24,12,17,12,12],ReturnBeetsArray(2))
  //Crush({bitDepth:16})
  musicMakers[0].fx.add(effects[0])
}

function ReturnNotesArray(oct, lowRange, highRange) {
    var scoreNotes = [];
    for (var i = 0; i < floor(random(lowRange,highRange)); i++) {
      scoreNotes[i] = vanillaNotes[floor(random(0,vanillaNotes.length))] + oct;
    }
    return scoreNotes;
}

function ReturnRainNotesArray(oct, lowRange, highRange) {
  console.log('its raaaaaiiiiiinin');
    var scoreNotes = [];
    for (var i = 0; i < floor(random(lowRange,highRange)); i++) {
      scoreNotes[i] = vanillaNotes[floor(random(0,vanillaNotes.length))] + oct;
    }
    return scoreNotes;
}

function ReturnBassNotesArray(oct, lowRange, highRange, repeat) {
    var bassNotes = [], arrayNotes = ReturnNotesArray(-12, 4, 8),
    repeeat = [1,2,4,8,16].rnd();
    for (var i = 0; i < floor(random(lowRange,highRange)); i++) {
      if (i <= repeat){
        bassNotes[i] = arrayNotes[0];
      }
      else if (i > repeat && i <= (repeat*2) ) {
        bassNotes[i] = arrayNotes[1];
      }
      else if (i > repeat && i <= (repeat*4) ) {
        bassNotes[i] = arrayNotes[2];
      }
      else if (i > repeat && i <= (repeat*8) ) {
        bassNotes[i] = arrayNotes[3];
      }
    }
    return bassNotes;
}

function ReturnBeetsArray(mul) {
  // can declare beat multiplier here by passing it in ()
    var scoreBeets = [];
    for (var i = 0; i < floor(random(1,8)); i++) {
      scoreBeets[i] = beets[floor(random(1,beets.length))] * mul;
    }
    return scoreBeets;
}

function CheckTheTime(time) //function check the time
 {
    var previousState = state; 
    state = time;
    football = musicMakers[0];
    if (state != previousState) 
    {
      // objNum is random object to change
      objNum = floor(random(2));
      console.log('changing' + objNum);
      // THIS WILL HAVE TO BE BROKEN UP INTO AT LEAST TWO MORE FUNCTIONS
      // CALL FADEOUT SCORE TO FADE OUT OBJECT BEFORE IT IS KILLED
      //RECREATE THE RIGHT OBJECT
      musicMakers[objNum].kill();
      if (objNum == 0){
        leadSynth = new music ("leadSynth", 'lead', 'foo')
        leadSynth.make()
      }
      else if (objNum == 1) {
        padSynth = new music ("padSynth", 'pad', 'foo')
        padSynth.make()
      }
      else if (objNum >= 2) {
        bass = new music("bassSynth", 'bass', 'glockenspiel');
        bass.make()
    }
    ExampleScore(musicMakers[objNum]);
   }
 }

 // var FXMod = (function () {

//   var privateMethod = function () {
//     // private
//     console.log("private")
//     // this method can do stuff for creating fx
//   };

//   var createCrush = function () {
//     // public bit depth and sample rate
//     //var bd =floor(random(8,23)), sr = 55;
//     return {
//       bitDepth: "bitDepth:" + floor(random(12,23)),
//       sampleRate: "sampleRate:" + Math.round(random(0.65,0.95) * 100) / 100
//   };
    
//   };

//   var createDelay = function () {
//     // public
//     console.log("another")
//     return {
//       time: "time:" + [1/4,1/2,1/3,1/6].rnd(), 
//       feedback: "feedback:" + random(.5,1),
//       wet: "wet" + Math.round(random(0.5,0.75) * 100) / 100, 
//       dry: "dry" + Math.round(random(0.5,0.95) * 100) / 100 
//   };
//   };
  
//   return {
//     createCrush: createCrush,
//     createDelay: createDelay
//   };

// } )();

// function TestChanges() {
//   console.log (FXMod.createCrush().bitDepth + " bd  " + FXMod.createCrush().sampleRate + " s r ");
//   console.log(FXMod.createDelay().time);
// }
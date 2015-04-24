var bpm = 120, globalSR = 44100, vanillaNotes = [0,2,4,7,9,11,12], beets = [1, 1/2, 1/4, 1/8,1/16], scorePhrases = 9, musicMakers = [],
effects = [];
function ExampleScore(mM) {
  var ss = scoreSteps(mM);
  score = Score(ss).start().loop()
};

function scoreSteps(mm) {
  console.log("called");
  var steps = [];
  //going to need object score will be referencing
  for (var i = 0; i < scorePhrases; i++){
    if (i == 0){
      steps.push(0);
      console.log(steps[i] + i);
    }
    else if ((i+2)%2==0 ) {
      steps.push(measures(4));
      console.log(steps[i] + i);
    }
    else 
    {
      steps.push(function(){mm.note.seq(ReturnNotesArray(0, 4, 16), ReturnBeetsArray(16)); console.log("called function")});
      console.log(steps[i] + i);
    }
  }

    return steps;
}

function setup () {
  canvas = createCanvas( windowWidth, windowHeight );
  //Module.createCrush();
  TestChanges();
  CreateInstrumentAndFx();
  ExampleScore(musicMakers[0]);
  ExampleScore(musicMakers[1]);
  clave = Clave({amp: .2, pan: [-1, 1]}).play( Rndf(2400, 3600), 1/8 );
};

function music(name, kind, pre) {
  var leadInstruments = [FM, Pluck, Synth], presets = ['cascade', 'bleep', 'rhodes', 'warble'],
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
        musicMakers.push(name);
      }

      else if (kind == 'pad') {
        var instrumentKind = padInstruments[0],
        pre = padPresets[floor(random(padPresets.length+1))];
          //create the synth object 
        console.log( this.name + " is born " + pre + ' pre ' )
        name = instrumentKind(pre)
        musicMakers.push(name);
      }

      else if (kind != 'lead' || kind != 'pad'){
        console.log( this.name + " is born " + pre + ' pre ')
        name = kind(pre)
        musicMakers.push(name);
    }
  }
};

function FX(name, kind) {
  
  this.name = name;
  this.make = function() {
    var bd = "bitDepth:" + 2,
       sr= "sampleRate:" + Math.round(random(0.01,0.05) * 100) / 100,
       t = "time:" + 1/6
    //Gibber formatting
//ex  synthName =  Synth('preset')
    name = kind({t});
    effects.push(name);
    console.log(bd + sr)
  };
};

function CreateInstrumentAndFx() {
  var beep = FXMod.createCrush().bitDepth;
  leadSynth = new music ("leadSynth", 'lead', 'foo')
  leadSynth.make()
  padSynth = new music ("padSynth", 'pad', 'foo')
  padSynth.make()
  crush = new FX("hippo", Delay)
  crush.make()
  //musicMakers[0].note.seq(ReturnNotesArray(0, 2,24), 1/4)
  //musicMakers[1].note.seq([-24,-12,-24,12,17,12,12],ReturnBeetsArray(2))
  //Crush({bitDepth:16})
  musicMakers[0].fx.add(effects[0])
}

function ReturnNotesArray(oct, lowRange, highRange) {
  // can declare scalar here by passing it in ()
    var scoreNotes = [];
    for (var i = 0; i < floor(random(lowRange,highRange)); i++) {
      scoreNotes[i] = vanillaNotes[floor(random(0,vanillaNotes.length))] + oct;
    }
    return scoreNotes;
}

function ReturnBeetsArray(mul) {
  // can declare beat multiplier here by passing it in ()
    var scoreBeets = [];
    for (var i = 0; i < floor(random(1,8)); i++) {
      scoreBeets[i] = beets[floor(random(1,beets.length))] * mul;
    }
    return scoreBeets;
}

var FXMod = (function () {

  var privateMethod = function () {
    // private
    console.log("private")
    // this method can do stuff for creating fx
  };

  var createCrush = function () {
    // public bit depth and sample rate
    //var bd =floor(random(8,23)), sr = 55;
    return {
      bitDepth: "bitDepth:" + floor(random(12,23)),
      sampleRate: "sampleRate:" + Math.round(random(0.65,0.95) * 100) / 100
  };
    
  };

  var createDelay = function () {
    // public
    console.log("another")
    return {
      time: "time:" + [1/4,1/2,1/3,1/6].rnd(), 
      feedback: "feedback:" + random(.5,1),
      wet: "wet" + Math.round(random(0.5,0.75) * 100) / 100, 
      dry: "dry" + Math.round(random(0.5,0.95) * 100) / 100 
  };
  };
  
  return {
    createCrush: createCrush,
    createDelay: createDelay
  };

} )();

function TestChanges() {
  console.log (FXMod.createCrush().bitDepth + " bd  " + FXMod.createCrush().sampleRate + " s r ");
  console.log(FXMod.createDelay().time);
}
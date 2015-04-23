var bpm = 120, globalSR = 44100, vanillaNotes = [0,2,4,7,9,11,12], musicMakers = [],
effects = [];
function ExampleScore() {
  score = Score([0,
    function() {

    }, measures(4)
    ]).start().loop()
};

function setup () {
  canvas = createCanvas( windowWidth, windowHeight );
  //Module.createCrush();
  TestChanges();
  ExampleInstrumentAndFx();
};

function music(name, kind, pre) {
  var leadInstruments = [FM, Pluck, Synth], presets = ['cascade', 'bleep', 'rhodes', 'warble'];
  // name - name object, kind - type of synth, pre- preset,
  // beet- beat in 1/2,1/4 etc, scalar = octave,
  // note# - note to play,
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

            //  .note.seq( noteArray, beet )
             
    
    else if (kind != 'lead'){
      console.log( this.name + " is born " + pre + ' pre ')
              name = kind(pre)
            

            //  .note.seq( noteArray, beet )
              musicMakers.push(name);
    }
  }
};

function music2(name, kind, pre) {
  var leadInstruments = [FM, Pluck, Synth], presets = ['cascade', 'bleep', 'rhodes', 'warble'];
  // name - name object, kind - type of synth, pre- preset,
  // beet- beat in 1/2,1/4 etc, scalar = octave,
  // note# - note to play,
    this.name = name;
   
    this.make = function() {
              name = kind(pre)
  }
};
function FX(name, kind, pre) {
  this.name = name;
  this.make = function() {
    //Gibber formatting
//ex  synthName =  Synth('preset')
    name = kind(pre)
    effects.push(name);
    // return {
    //   bitDepth: "bitDepth:" + floor(random(12,23)),
    //   sampleRate: "sampleRate:" + Math.round(random(0.65,0.95) * 100) / 100
    // };
  };
};

function ExampleInstrumentAndFx() {
  leadSynth = new music ("leadSynth", 'lead', 'foo')
  leadSynth.make()
  crush = new FX("hippo", Crush, 'filthy')
  crush.make()
  // var beep = FXMod.createCrush().bitDepth
  // melodyLead = Synth('cascade')
  //           melodyLead.amp = .75;
  //         //  melodyLead.fx.add( Crush({beep}),Vibrato(.02),Delay({time:1/4, feedback:.45, wet:.4, dry:.91}))
  musicMakers[0].note.seq(ReturnNotesArray(0, 2,24), 1/4)
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

var SynthMod = (function () {
  var privateStuff = function() {

  };
})

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
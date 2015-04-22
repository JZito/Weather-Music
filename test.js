var a, name, state, previousState, vol, musicMakers = [],
presetLeadArray = ['gong', 'brass', 'bass', 'bass','clarinet', 'glockenspiel', 'glockenspiel', 'glockenspiel'],
notes = [0,12,11,9,7,4,2,0,12,11,9,7,4,2,0,12,11,9,7,4,2,4,4,4,4,4,7,7,7,7,7,0,0,0,-1,-1,-1,-1,-1],
vanillaNotes = [0,2,4,7,9,11,12],
beets = [1/16,1/16,1/4,1/4,1/8,1/8,1/2,1/2, 1, 1, 2, 2, 1, 1/2, 1/4], slowBeets = [1,2,4,1/2,1,1,2,4,1,1,2,4], multipliers = [.25,.5,.5,.5,1,1,1,1,1,1,1,1,1.5,1.5,2,2,2,2],
octaves = [-12,-12,0,0,0,0,0,0,0,12,12,12,12,24], mehsures = [2,2,4,4,4,4,4,4,6,8,8,8,12,16,16];




function music(name, kind, pre, beet, scalar, note1, note2) {
  var leadInstruments = [FM, Pluck, Synth], presets = ['glockenspiel', 'bleep', {waveform:'Sine'}];
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
      else {
        pre = presets[floor(random(3))];
      }
        //create the synth object 
        console.log( this.name + " is born " + pre + ' pre ' + beet + ' beet'  )
              name = instrumentKind(pre)
               musicMakers.push(name);
            }

            //  .note.seq( noteArray, beet )
             
    
    else if (kind != 'lead'){
      console.log( this.name + " is born " + pre + ' pre ' + beet + ' beet'  )
              name = kind(pre)
            

            //  .note.seq( noteArray, beet )
              musicMakers.push(name);
    }
  }
} 



function setup () {
    canvas = createCanvas( windowWidth, windowHeight );
  var oct1 = -12;
  bass = new music("bass", Mono, {waveform:'Sine', maxVoices:2}, oct1,  beets[floor(random(3))], 4, 12)
  bass.make() 
  var oct2 = 0;
  pad = new music("pad", Synth2, myObject, beets[floor(random(3))], oct2, 7, 9)
  pad.make() 
  var oct3 = -12;
  leadBell = new music("bing", 'lead', 'glockenspiel', beets[floor(random(3))], oct3, 0, 0 )
  leadBell.make()
 
  bus = Bus().fx.add( Reverb('large'),Crush({bitDepth:16}),Vibrato(.02),Delay({time:1/4, feedback:.45, wet:.9}) )

  LeadScoreAbstract(musicMakers[1]);
  
  BassScore();
  LeadScoreAbstract(musicMakers[2]);
  musicMakers[0].attack = ms(floor(random(1000,3000)));
  musicMakers[0].decay = ms(5000); 
  musicMakers[0].sustain = ms(1000); 
  musicMakers[0].release = ms(500);
  musicMakers[0].resonance = Sine(0.55,.75)._;
  musicMakers[0].cutoff = Sine(.55,0.25)._;
  musicMakers[0].amp = 0.4;
  musicMakers[0].send(bus, random(.4,.75))
}

function CreateNewInstrument() {
  // create a lead
  var leadInstruments = [FM, Pluck, Synth], presets = ['glockenspiel', 'bleep', {waveform:'Sine'}];
}

function CreateBassInstrument() {
  var conditions = [waveform, maxvoices, glide, useADSR, attack, decay, sustain, release, resonance, cutoff, amp];

}

function draw () {
 // var  ww2 = windowWidth / 2,
 //          wh2 = windowHeight / 2;
 //            vol = floor(followLead.getValue() * 12);
 //  radius = ( ww2 > wh2 ? wh2 * vol: ww2 * vol);
 //  rect(ww2, wh2, radius, radius);

  

// has the time changed? check.
 // CheckTheTime(minute());

}
var myObject = {
waveform:'Triangle', maxVoices:6, amp:.5, glide:.9, resonance:1, useADSR:true, 
                               requireReleaseTrigger:false,
                attack:'ms(4000)', decay:'ms(12000)', sustain:'ms(100)', release:'ms(2000)'
};
function MakeNewInstrument() {

}

function MakeNewEffects() {

}

function ReturnNotesArray(oct, lowRange, highRange) {
  // can declare scalar here by passing it in ()
    var scoreNotes = [];
    for (var i = 0; i < floor(random(lowRange,highRange)); i++) {
      scoreNotes[i] = notes[floor(random(1,notes.length))] + oct;
    }
    return scoreNotes;
}

function ReturnBassNotesArray(oct, lowRange, highRange, repeat) {
  // can declare scalar here by passing it in ()
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
      scoreBeets[i] = beets[floor(random(1,beets.length))];
    }
    return scoreBeets;
}



function StopBassSeq() {
  musicMakers[2].note.seq.stop();
}

var myObjectLiteral = {
  myBehavior1 : function() {
        /* do something */
  },
  myBehavior2 : function() {
        /* do something else */
  }
}

function NewMelody (mm) {
  var leadArray0 = [], leadArray1 = [], leadArray2 = [], leadArray3 = [], leadArray4 = [];
  // LOGIC OF MELODY.... maybe BING (C#)...... BING (C#).... BING (C#) (introduce first note of theme)
  // then add one or two more notes.... BING (C#)   bong (F) dong (D#) 
  var noteArray = [], ranHiLo = floor(random(2));
      // create the melody
      //choose from 4 - 16 notes to create melodic theme
  for (var i = 0; i < floor(random(4,16)); i++) {
      noteArray[i] = notes[floor(random(vanillaNotes.length))];
  }
      //determine highest note
  var highest = Math.max.apply(Math, noteArray);
      //determine lowest note
  var lowest = Math.min.apply(Math, noteArray);
  if (ranHiLo == 0) {
    leadArray0.push(lowest);

  }
  else if (ranHiLo >= 1) {
    leadArray0.push(highest)
  }
  // melody logic, for ex. determine highest note of first three notes. repeat that note
  var ranOct = octaves[floor(random(octaves.length))], ranMul = multipliers[floor(random(multipliers.length))],
  sNotes = ReturnNotesArray(ranOct, 2, 8), sBeets = ReturnBeetsArray(ranMul);
  console.log(mm);
  //musicMakers[mm].note.seq(sNotes, sBeets)
   //assignment should happen elsewhere, I think. this should just be to construct melodies
   //     }

}

function NewScore (mmaker) { 
        var funcy = NewMelody(mmaker), cons = console.log("cons"), 
        s0 = 0, s1 = function(){cons;funcy;}, s2 = measures(floor(random(1,16))),
        sS = [s0, s1, s2];
         score = Score([sS[0], sS[1], sS[2], sS[1], sS[2]]).start().loop();
}

function ReturnScoreVar(mm2) {
  // can declare beat multiplier here by passing it in ()
  var nm = musicMakers[2].note.seq(ReturnNotesArray(0, 2, 17), ReturnBeetsArray(4)), cons = console.log("cons"), sto = musicMakers[2].note.seq.stop(), st = StopBassSeq(),
  options = [nm, cons, stop], s0 = 0, s1 = function(){nm; cons;}, s2 = measures(floor(random(1,16))), s3 = function(){sto; cons;},
        sS = [s0, s1, s2, s3], scoreBeets = [];
  score = Score([sS[0], sS[1], sS[2], sS[1], sS[2], sS[3], sS[2]]).start().loop();
   // for (var i = 0; i < floor(random(1,8)); i++) {
    //  scoreBeets[i] = beets[floor(random(1,beets.length))];
   // }
   // return scoreBeets;
}

function LeadScore (lead) {
  lScore = Score([ 0,
    function(){
      console.log("fofooo");
      lead.note.seq(ReturnNotesArray(12, 1, 8), ReturnBeetsArray(1) )
    }, measures (mehsures[floor(random(mehsures.length))]),
    function () {
      lead.note.seq.stop();
    }, measures( mehsures[floor(random(mehsures.length))]),
    function () {
      lead.note.seq(ReturnNotesArray(0, 3, 6), ReturnBeetsArray(1))
    }, measures (mehsures[floor(random(mehsures.length))])

    ]).start().loop();
}

function LeadScoreAbstract(l) {
  var opt0 = 0, opt2 = measures (mehsures[floor(random(mehsures.length))]), funct0 = function(){l.note.seq(ReturnNotesArray(12, 1, 8), ReturnBeetsArray(1));}, funct1 = function(){l.note.seq.stop();};
  lScoreAbstract = Score([opt0, funct0, opt2, funct1, opt2, funct0, opt2]).start().loop();
}

function BassScore () {
  bScore = Score([0,
    function() {
      musicMakers[0].note.seq(ReturnBassNotesArray(-12, 4, 8, floor(random(4))), beets[floor(random(beets.length))] * 16);
    }, measures (mehsures[floor(random(mehsures.length))]),
    function() {
      musicMakers[0].note.seq(ReturnBassNotesArray(-12, 4, 8, floor(random(6))), beets[floor(random(beets.length))]* 16)
    }, measures (mehsures[floor(random(mehsures.length))])
    ]).start().loop();
}

function BassLine (b) {
  var ranMul = multipliers[floor(random(multipliers.length))],
  bNotes = ReturnNotesArray(-12, 2, 8), bBeets = ReturnBeetsArray(ranMul);
  console.log(mm);
  bass.note.seq(sNotes, bBeets)
}

function CheckTheTime(time) //function check the time
 {
    var previousState = state; 
    state = time;
    football = musicMakers[0];
    if (state != previousState) 
    {
      console.log('changing');
      // if contains name of object to change
      for (var i = 0; i < musicMakers.length; i++){
        musicMakers[i].kill();
      }
      cat1= new music("lead", Synth, 'bleep', ReturnBeetsArray(),octaves[floor(random(octaves.length))], 0, 0);
      cat1.make()
      cat2= new music("lead", Synth2, 'pad4', ReturnBeetsArray(),octaves[floor(random(octaves.length))], 0, 0);
      cat2.make()
      cat3 = new music("bing", FM, 'glockenspiel', ReturnBeetsArray(), octaves[floor(random(octaves.length))], 0, 0 );
      cat3.make()
   }
 }




      // bass = Mono ({waveform:'Sine', 
      //           glide:.45, useADSR:true, 
      //                           requireReleaseTrigger:false,
      //               attack:ms(400), decay:ms(1000), sustain:ms(300), release:ms(1000)})
      //     .resonance.seq([0,0.1,0.2,0.4,0.6,0.8].rnd(), [1,4,2,4,8,12,3,1,1,6,8,6].rnd())
      //     .cutoff.seq( [.1,.2,.3,.4], 1/2 )
      //       .fx.add(Crush({bitDepth:16}), Vibrato(0.05),
      //       Delay({time:1/3, feedback:.9, dry: .05, wet:.9}))
      // pad = Synth2({ waveform:'Triangle',
      //       maxVoices:6, amp:.5, glide:.9, resonance:1, useADSR:true, 
      //                         requireReleaseTrigger:false,
      //           attack:ms(4000), decay:ms(12000), sustain:ms(100), release:ms(2000) }) 
      //   .fx.add(Crush({bitDepth:16}), Vibrato(0.05))
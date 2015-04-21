var a, name, state, previousState, musicMakers = [],
presetLeadArray = ['gong', 'brass', 'bass', 'bass','clarinet', 'glockenspiel', 'glockenspiel', 'glockenspiel'],
notes = [0,12,11,9,7,4,2,0,12,11,9,7,4,2,0,12,11,9,7,4,2,4,4,4,4,4,7,7,7,7,7,0,0,0,-1,-1,-1,-1,-1],
vanillaNotes = [0,2,4,7,9,11,12],
beets = [1/16,1/16,1/4,1/4,1/8,1/8,1/2,1/2], multipliers = [.25,.5,.5,.5,1,1,1,1,1,1,1,1,1.5,1.5,2,2,2,2],
octaves = [-12,-12,0,0,0,0,0,0,0,12,12,12,12,24], mehsures = [2,2,4,4,4,4,4,4,6,8,8,8,12,16,16];


function music(name, kind, pre, beet, scalar, note1, note2) {
  // name - name object, kind - type of synth, pre- preset,
  // beet- beat in 1/2,1/4 etc, scalar = octave,
  // note# - note to play,
    this.name = name;
    this.make = function() {
      var noteArray = [];
      // create the melody
        for (var i = 0; i < floor(random(1,16)); i++) {
          noteArray[i] = (scalar +  notes[floor(random(0,notes.length))]);
        }
        //create the synth object 
        console.log( this.name + " is born " + pre + ' pre ' + beet + ' beet'  )
              name = kind(pre)

            //  .note.seq( noteArray, beet )
              musicMakers.push(name);
    }
} 



function setup () {
  var oct1 = -12;
  bass = new music("bass", Mono, {waveform:'Sine', maxVoices:2}, oct1,  beets[floor(random(3))], 4, 12)
  bass.make() 
  var oct2 = 0;
  pad = new music("pad", Synth2, { waveform:'Triangle', maxVoices:6, amp:.5, glide:.9, resonance:1, useADSR:true, 
                               requireReleaseTrigger:false,
                attack:ms(4000), decay:ms(12000), sustain:ms(100), release:ms(2000) }, beets[floor(random(3))], oct2, 7, 9)
  pad.make() 
  var oct3 = -12;
  leadBell = new music("bing", FM, 'glockenspiel', beets[floor(random(3))], oct3, 0, 0 )
  leadBell.make()
 
  bus = Bus().fx.add( Reverb('large'),Crush({bitDepth:16}),Vibrato(.02),Delay({time:1/4, feedback:.45, wet:.9, dry:.05}) )

  LeadScore(musicMakers[1]);
  
  BassScore();
  musicMakers[0].attack = ms(floor(random(250,650)));
  musicMakers[0].decay = ms(5000); 
  musicMakers[0].sustain = ms(1000); 
  musicMakers[0].release = ms(500);
  //musicMakers[0].resonance = Sine(0.55,.75)._;
  //musicMakers[0].cutoff = Sine(.55,0.25)._;
  musicMakers[0].amp = 0.4;
  musicMakers[1].send(bus, random(.4,.75))
  //NewScore(1);
 //for (var i = 0; i < musicMakers.length; i++) {
   //NewScore(i);
 //}

//      a.note[1].values.transpose.seq( 1, 2 )
}

function draw () {

// has the time changed? check.
 // CheckTheTime(minute());

}

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

var myObjectLiteral = {
  myBehavior1 : function() {
        /* do something */
  },
  myBehavior2 : function() {
        /* do something else */
  }
}

function NewMelody (mm) {

  // LOGIC OF MELODY.... maybe BING (C#)...... BING (C#).... BING (C#) (introduce first note of theme)
  // then add one or two more notes.... BING (C#)   bong (F) dong (D#) 
  var noteArray = [];
      // create the melody
      //choose from 4 - 16 notes to create melodic theme
  for (var i = 0; i < floor(random(4,16)); i++) {
      noteArray[i] = (octaves[floor(random(octaves.length))] +  notes[floor(random(vanillaNotes.length))]);
  }
      //determine highest note
  var highest = Math.max.apply(Math, noteArray);
      //determine lowest note
  var lowest = Math.min.apply(Math, noteArray);
  for (var j = 0; j < floor(random(noteArray.length)); j++) {

  }
  // melody logic, for ex. determine highest note of first three notes. repeat that note
  var ranOct = octaves[floor(random(octaves.length))], ranMul = multipliers[floor(random(multipliers.length))],
  sNotes = ReturnNotesArray(ranOct, 2, 8), sBeets = ReturnBeetsArray(ranMul);
  console.log(mm);
  musicMakers[mm].note.seq(sNotes, sBeets)
   //assignment should happen elsewhere, I think. this should just be to construct melodies
   //     }

}

function NewScore (mmaker) { 
        var mMaker = mmaker, funcy = NewMelody(mMaker), cons = console.log("cons"), 
        s0 = 0, s1 = function(){cons;funcy;}, s2 = measures(floor(random(1,16))),
        sS = [s0, s1, s2];
         score = Score([sS[0], sS[1], sS[2], sS[1], sS[2]]).start().loop();
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

function BassScore () {
  bScore = Score([0,
    function() {
      musicMakers[0].note.seq(ReturnBassNotesArray(-12, 4, 8, 4), beets[floor(random(beets.length))] * 8);
    }, measures (mehsures[floor(random(mehsures.length))]),
    function() {
      musicMakers[0].note.seq(ReturnBassNotesArray(-12, 4, 8, 1), beets[floor(random(beets.length))]* 4)
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
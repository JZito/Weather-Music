var a, name, state, previousState, musicMakers = [],
presetLeadArray = ['gong', 'brass', 'bass', 'bass','clarinet', 'glockenspiel', 'glockenspiel', 'glockenspiel'],
notes = [0,12,11,9,7,4,2,0,12,11,9,7,4,2,0,12,11,9,7,4,2,4,4,4,4,4,7,7,7,7,7,0,0,0,-1,-1,-1,-1,-1],
beets = [1/16,1/4,1/8,1/2],
octaves = [-12,-12,0,0,0,0,0,0,0,12,12,12,12,24];


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
        console.log(name + ' name ');
        console.log( this.name + " is born " + pre + ' pre ' + beet + ' beet'  )
              name = kind(pre)

           //   .note.seq( noteArray, beet )
              musicMakers.push(name);
    }
} 



function setup () {
  var oct1 = 12;
  synth1 = new music("lead", FM, presetLeadArray[floor(random(0,presetLeadArray.length))], oct1,  beets[floor(random(3))], 4, 12)
  synth1.make() 
  var oct2 = 0;
  cat2 = new music("pad", FM, 'glockenspiel', beets[floor(random(3))], oct2, 7, 9)
  cat2.make() 
  var oct3 = -12;
  cat3 = new music("bing", FM, 'glockenspiel', beets[floor(random(3))], oct3, 0, 0 )
  cat3.make()
  NewScore();
 

//      a.note[1].values.transpose.seq( 1, 2 )
}

function draw () {

// has the time changed? check.
 // CheckTheTime(minute());

}

function MakeNewInstrument() {

}

function ReturnNotesArray() {
  // can declare scalar here by passing it in ()
    var scoreNotes = [];
    for (var i = 0; i < floor(random(1,17)); i++) {
      scoreNotes[i] = notes[floor(random(1,notes.length))];
    }
    return scoreNotes;
}

function MMForLoop () {
  

  musicMakers[0].note.seq (notesMaster[0], beetsMaster[0])
    musicMakers[1].note.seq (notesMaster[1], beetsMaster[1])
      musicMakers[2].note.seq (notesMaster[2], beetsMaster[2])
 
}

function ReturnBeetsArray() {
  // can declare beat multiplier here by passing it in ()
    var scoreBeets = [];
    for (var i = 0; i < floor(random(1,8)); i++) {
      scoreBeets[i] = beets[floor(random(1,beets.length))];
    }
    return scoreBeets;
}

function NewScore () {
  var noteS0 = ReturnNotesArray(), noteS1 = ReturnNotesArray(), noteS2 = ReturnNotesArray(), noteS3 = ReturnNotesArray(),
      beetS0 = ReturnBeetsArray(), beetS1 = ReturnBeetsArray(), beetS2 = ReturnBeetsArray(), beetS3 = ReturnBeetsArray(),
      notesMaster = [noteS0, noteS1, noteS2, noteS3], beetsMaster = [beetS0, beetS1, beetS2, beetS3];
    score = Score([0,
      function() {
        console.log("bi");
        musicMakers[0].note.seq( notesMaster[floor(random(notesMaster.length))], beetsMaster[floor(random(notesMaster.length))] )
        musicMakers[1].note.seq( notesMaster[floor(random(notesMaster.length))], beetsMaster[floor(random(notesMaster.length))] )
        musicMakers[2].note.seq( notesMaster[floor(random(notesMaster.length))], beetsMaster[floor(random(notesMaster.length))] )
      
      }, measures(4),
      function () {
        console.log("hi");
        musicMakers[0].note.seq( notesMaster[floor(random(notesMaster.length))], beetsMaster[floor(random(notesMaster.length))] )
        musicMakers[1].note.seq( notesMaster[floor(random(notesMaster.length))], beetsMaster[floor(random(notesMaster.length))] )
        musicMakers[2].note.seq( notesMaster[floor(random(notesMaster.length))], beetsMaster[floor(random(notesMaster.length))] )
          
       // }
      }, measures(4)
      ]).start().loop();

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
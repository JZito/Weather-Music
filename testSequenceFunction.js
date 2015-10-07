function setup () {
	a = Synth('bleep')
  .note.seq( [0,1], 1/4 )
 test = 0

 a.note.values.filters.push( function( args, pattern ) {
 console.log("BLAH", test++ )
 return args
 })
}



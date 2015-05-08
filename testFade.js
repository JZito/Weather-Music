function setup () {
	songBus = Bus().fx.add( Schizo({chance:.5, rate:ms(250), length:ms(1000)}) )
	drum = XOX('x*x*', 1/16);

	drum.send(songBus, 1);
	songBus.fadeIn(4);

}
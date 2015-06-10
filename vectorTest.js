ArrayList <ballCollection>;

void setup() {
	size(windowWidth, windowHeight);
	smooth();

	ballCollection = new ArrayList();


}

void draw() {
	backgroud(0);

	for(int i = 0; i < ballCollection.size(); i++){
		Ball mb = (Ball) ballCollection.get(i);
		mb.ru();
	}

}
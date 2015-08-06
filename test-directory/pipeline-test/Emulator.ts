class Emulator {
	public LEFT_KEY : boolean;
	public RIGHT_KEY : boolean;
	public UP_KEY : boolean;
	public DOWN_KEY: boolean;
	public keymap = { string : [KeyObject]};
	public images = [GameObject];
	private bg : HTMLImageElement;
	private mappedKeyFunction : Function;

	constructor (bgFile, keyFunction) {
	    // initialize keys
        this.keymap["left"] = new KeyObject(37, false);
		this.keymap["down"] = new KeyObject(38, false);
        this.keymap["right"] = new KeyObject(39, false);
        this.keymap["up"] = new KeyObject(40, false)
		this.LEFT_KEY = this.keymap["left"].pressed;
		this.RIGHT_KEY = this.keymap["right"].pressed;
        this.UP_KEY = this.keymap["up"].pressed;
        this.DOWN_KEY = this.keymap["down"].pressed;
	}

}
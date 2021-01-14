class Dialog {
	constructor(params = {}){
		const defaults = {
			dialog: document.querySelector('.dialog'),
			closeCallback: null
		};
		this.dialogData = {
			...defaults,
			...params
		};
		this.log = 'dialog ON';
	}

	init() {

	}
};

export {Dialog as default};
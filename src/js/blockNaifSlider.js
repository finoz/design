class naifSlider {
	constructor(params = {}){
		const defaults = {
			slider: document.querySelector('.naifSlider'),
			alignTo: null,
			ciao: 'comeva'
		};
		this.nsData = {
			...defaults,
			...params
		};
		this.log = 'naifSlider ON';
	}

	init() {
		this._nsCounter();
		this._nsAlignTo();
		/* TODO verificare se desktop - su mobile non serve */
		window.addEventListener('resize', () => {
			this._nsAlignTo()
		},{passive:true})
	}
	_nsCounter() {
		let counter = this.nsData.slider.querySelectorAll(".block-card").length;
		this.nsData.slider.dataset.count = counter;
	}
	_nsAlignTo() {
		if(this.nsData.alignTo !== null && document.querySelector(this.nsData.alignTo) !== null) {
			let distance = document.querySelector(this.nsData.alignTo).getBoundingClientRect().left;
			this.nsData.slider.style.paddingLeft = Math.round(distance)+'px';
		}
	}
};

export {naifSlider as default};
import utils from './utils';
import '../scss/main.scss';

import naifSlider from './blockNaifSlider';

class Setup {
	constructor(){
		this.log = 'Start finoz/design';
	};
	init() {
		console.log(this.log);
		utils.anchorHandler('.header');
		window.addEventListener('scroll', ()=> {
			utils.scrollHandler(document.querySelector('.header'));
		});
		utils.toggleMenu();
		utils.autocloseMenu();
		this.initComponents();
	}

	initComponents() {
		let componentSelector = document.querySelectorAll('[data-component]');
		let components = [];
		componentSelector.forEach((component, index) => {
			switch(component.dataset.component) {
				case 'naifSlider':
					component[index] = new naifSlider({
						slider: component,
						alignTo: '.header-brand'
					});
					component[index].init();
					break;
				default:
					//
			}

		})
	}
}
let setup = new Setup();
setup.init();

import utils from './utils';
import a11yUtils from './a11yUtils';
import '../scss/main.scss';
import naifSlider from './components/blockNaifSlider';

class Setup {
	constructor(){
		this.log = 'Start finoz/design';
	};
	init() {
		console.log(this.log);
		let a11y = new a11yUtils;
		a11y.init();
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
				// TODO import script just if needed
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
document.addEventListener("readystatechange", (e) =>{
	if(e.target.readyState === 'complete') {
		setup.init();
	}
});

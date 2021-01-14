import whatInput from 'what-input';
import utils from './utils';
import Navigation from './components/navigation';
import '../scss/main.scss';
import Dialog from './components/dialog';
import naifSlider from './components/blockNaifSlider';

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
		//TODO: create global storing object;
		console.log("TODO");
	}

	initComponents() {
		let componentSelector = document.querySelectorAll('[data-component]');
		let components = [];
		componentSelector.forEach((component, index) => {
			switch(component.dataset.component) {
				// TODO import script just if needed
				case 'naifSlider':
					component[index] = new NaifSlider({
						slider: component,
						alignTo: '.header-brand'
					});
					component[index].init();
					break;
				case 'navigation':
					component[index] = new Navigation();
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

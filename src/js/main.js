import utils from './utils';
import '../scss/main.scss';

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
	}
}
let setup = new Setup();
setup.init();

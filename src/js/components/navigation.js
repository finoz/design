import whatInput from 'what-input';
import a11yUtils from '../a11yUtils';
/**
 * moving w/ arrows in group, leaving tabindex=0 the last one focused, keeping the others in tabindex=-1
 * in nested menu:
 *  - move w/ r/l arrow in primary level,
 *  - bind first level link 
 *  - duplicate w/ sr-only link in submenu
 *  - if first level, spacebar || enter === to arrowDown
 *  - go in submenu w/ raaow down, spacebar or enter,
 *  - block l/r arrow navigation in submenu, use u/d arrows only
 *
 *  w3.org reference: https://www.w3.org/TR/wai-aria-practices/examples/menubar/menubar-1/menubar-1.html
 *
 *  APPUNTI revizione #2 con Simona
 * * versione zero
 * * in focus non deve succedere nulla, non si deve aprire il sottomenu, si apre all'enter. (al enter aggiungo la classe "open" o simili)
 * * all'esc tolgo il sottomenu
 * * quando entro nel menu di secondo lvello la prima voce in focus è la voce nascosta
 * * una volta entrato nel sotto menu, sono in focustrap
 * *
 * * opzionale
 * * roving t.i. su primo livello? occhio che mobile e desktop sono diversi
 * * roving t.i. su livelli secondari?
 * *
 * *sarebbe figo poter gestire le navigazioni in funzioni separate così da accenderle/spegnerle come ci pare
 *
 * */
class Navigation {
	constructor(){
		this.log = 'a11y Rovin Tabindex navigation is live!';
		this.selectors = {
			navigation: '.header-navigation',
			firstLevelItemLinks: '.header-navigation > ul > li > a',
			subnavParentItems: '.has-subnav',
			subnav: '.subnav-wrapper',
			subnavOpenClass: 'open',
			a11yLinkClass: 'a11y-sr-link'
		}
		this.navigationComponent = document.querySelector(this.selectors.navigation);
		this.subNavOpenBoolean = false;
		this.init();
	}
	
	init() {
		if(!this.navigationComponent) {
			console.error('We need a .header-navigation selector here, bro');
			return;
		}
		this.setupFirstLevelFocusableItems();
		this.listenForMouseEvents();
		this.listenForKeyEvents();
	}

	setupFirstLevelFocusableItems() {
		let allNavigationLinks = a11yUtils.getAllFocusableElements(this.navigationComponent);
		allNavigationLinks.forEach((el) => {
			if(el.closest('ul') === this.navigationComponent.querySelector('ul')) {
				el.setAttribute('tabindex','0');
				if(el.closest('li').querySelector(this.selectors.subnav)) {
					this.cloneFirstLevelLink(el);
				}
			} else {
				el.setAttribute('tabindex','-1');
			}
		})
	}

	cloneFirstLevelLink(firstLevelLink) {
		let subnav = firstLevelLink.closest('li').querySelector(this.selectors.subnav);
		let label = firstLevelLink.innerText;
		let url = firstLevelLink.getAttribute('href');
		let link = document.createElement('a');
		link.setAttribute('href',url);
		link.setAttribute('tabindex','-1');
		link.innerText = label;
		link.classList.add(this.selectors.a11yLinkClass);
		subnav.prepend(link);
	}


	listenForMouseEvents() {
		let everySubnavParentItem = this.navigationComponent.querySelectorAll(this.selectors.subnavParentItems);
		everySubnavParentItem.forEach((item)=>{
			item.addEventListener('mouseenter',(e) => {
				this.openSubnav(e.target);
			});
			item.addEventListener('mouseleave',(e) => {
				this.closeSubnav();
			});
		})
	}

	listenForKeyEvents() {
		this.navigationComponent.addEventListener('keydown',(e) => {
			switch (e.keyCode) {
				case a11yUtils.keycode.enter:
				case a11yUtils.keycode.space:
					if(e.target.parentNode.matches(this.selectors.subnavParentItems) && e.target.closest('li').querySelector(this.selectors.subnav)) {
						e.preventDefault();
						this.openSubnav(e.target.closest('li'));
					}
					break;
				case a11yUtils.keycode.esc:
					if(this.subNavOpenBoolean === true) {
						e.preventDefault();
						this.closeSubnav();
					}
					break;
			}
		})
	}

	openSubnav(activeListItem) {
		//console.log('open');
		let activeSubnav = activeListItem.querySelector(this.selectors.subnav);
		activeListItem.classList.add(this.selectors.subnavOpenClass);
		a11yUtils.toggleEveryTabindex(activeSubnav,0);
		a11yUtils.focusTrapOn(activeSubnav);
		this.subNavOpenBoolean = true;
	}

	closeSubnav() {
		//console.log('close');
		this.subNavOpenBoolean = false;
		let everySubnavParentItem = this.navigationComponent.querySelectorAll(this.selectors.subnavParentItems);
		let everySubnav = this.navigationComponent.querySelectorAll(this.selectors.subnav);
		everySubnavParentItem.forEach((item)=>{
			item.classList.remove(this.selectors.subnavOpenClass);
		});
		everySubnav.forEach((subnav)=>{
			a11yUtils.toggleEveryTabindex(subnav,-1);
		});
		a11yUtils.focusTrapOff();
	}

}
export default Navigation;
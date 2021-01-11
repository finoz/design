class a11yUtils {
	constructor() {
		this.log = 'a11yUtils go!';
		this.focusableSelectors = 'button:not([disabled]), [href], input, select, textarea, [tabindex]:not([tabindex="-1"]), [role="button"]';
	}
	init() {
		console.log(this.log);

		this.rovingTabindex('.subnav-wrapper');
	}

		/**
		 * moving w/ arrows in group, leaving tabindex=0 the last one focused, keeping the others in tabindex=-1
		 */
	rovingTabindex(groups) {
		let focusGroups = document.querySelectorAll(groups);
		focusGroups.forEach((focusGroup) =>{
			let focusableElements = this._getAllFocusableElements(focusGroup);
			focusableElements.forEach((el) => {
				el.setAttribute('tabindex','-1');
			})
			focusableElements.item(0).setAttribute('tabindex','0');
			let activeElementIndex = 0;
			focusGroup.addEventListener('keydown',(e)=>{
				focusableElements.item(activeElementIndex).setAttribute('tabindex','-1');
				if([37,38,39,40].includes(e.keyCode)){
					e.preventDefault();
				}
				switch(e.keyCode) {
					case 37:
					case 38:
						if(activeElementIndex > 0) {
							activeElementIndex--;
						} else {
							activeElementIndex = focusableElements.length-1;
						}
						//console.log("back | index "+activeElementIndex);
						break;
					case 39:
					case 40:
						if(activeElementIndex < focusableElements.length-1) {
							activeElementIndex++;
						} else {
							activeElementIndex = 0;
						}
						//console.log("forward | index "+activeElementIndex);
						break;
				}
				focusableElements.item(activeElementIndex).focus();
				focusableElements.item(activeElementIndex).setAttribute('tabindex','0');
			})
		})
	}

	/*

	toggleEveryTabindex(wrapper, value = -1) {
		if(!wrapper) {
			console.error('Wrapper element is needed in toggleEveryTabindex()');
			return;
		}
		getAllFocusableElements(wrapper).forEach((el) => {
			el.setAttribute('tabindex',value);
		})
	}

	openedModalHandler(modal) {
		this.focusedElementsBeforeModal.push(document.activeElement);
		const focusableElements = [...getAllFocusableElements(modal)];
		const firstFocusableElement = focusableElements[0];
		const lastFocusableElement = focusableElements[focusableElements.length -1];
		firstFocusableElement.focus();
		modal.addEventListener('keydown',(e) => this.trapTabKey(e, firstFocusableElement, lastFocusableElement));
	}

	closedModalHandler() {
		if(this.focusedElementsBeforeModal.length === 0) {
			return;
		}
		let focusedElementNow = this.focusedElementsBeforeModal[this.focusedElementsBeforeModal.length -1];
		focusedElementNow.focus();
		this.focusedElementsBeforeModal.pop();
	}
	trapTabKey(e, firstEl, lastEl) {
		if (e.keyCode === 9) { // TAB
			if (e.shiftKey) { // + SHIFT
				if(document.activeElement === firstEl){
					e.preventDefault();
					lastEl.focus();
				}
			} else {
				if(document.activeElement === lastEl){
					e.preventDefault();
					firstEl.focus();
				}
			}
		}
	}
*/
	/*****/

	_getFirstFocusable(parent) {
		return parent.querySelector(this.focusableSelectors);
	}
	_getAllFocusableElements(parent) {
		return parent.querySelectorAll(this.focusableSelectors);
	}
}
export default a11yUtils;
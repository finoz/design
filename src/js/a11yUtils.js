const a11yUtils = {
	keycode: { // http://keycode.info/
		enter: 13,
		space: 32,
		esc: 27,
		arrowUp: 38,
		arrowRight: 39,
		arrowDown: 40,
		arrowLeft: 47,
	},
	focusableSelectors: 'button:not([disabled]), [href], input, select, textarea, [tabindex]:not([tabindex="-1"]), [role="button"]',
	focusedElementsBeforeModal: [],

	getFirstFocusable(parent) {
		return parent.querySelector(this.focusableSelectors);
	},
	getAllFocusableElements(parent) {
		return parent.querySelectorAll(this.focusableSelectors);
	},

	toggleEveryTabindex(wrapper, value = -1) {
		if(!wrapper) {
			console.error('Wrapper element is needed in toggleEveryTabindex()');
			return;
		}
		this.getAllFocusableElements(wrapper).forEach((el) => {
			el.setAttribute('tabindex',value);
		})
	},

	openedModalHandler(modal) {
		this.focusedElementsBeforeModal.push(document.activeElement);
		const focusableElements = [...this.getAllFocusableElements(modal)];
		const firstFocusableElement = focusableElements[0];
		const lastFocusableElement = focusableElements[focusableElements.length -1];
		firstFocusableElement.focus();
		modal.addEventListener('keydown',(e) => this.trapTabKey(e, firstFocusableElement, lastFocusableElement));
	},

	closedModalHandler() {
		if(this.focusedElementsBeforeModal.length === 0) {
			return;
		}
		let focusedElementNow = this.focusedElementsBeforeModal[this.focusedElementsBeforeModal.length -1];
		focusedElementNow.focus();
		this.focusedElementsBeforeModal.pop();
	},

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
}
export default a11yUtils;
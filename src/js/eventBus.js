/**
 * https://pineco.de/creating-a-javascript-event-bus/
* */
class EventBus {
	/**
	 * Initialize a new event bus instance.
	 */
	constructor() {
		this.bus = document.createElement('eBusElement');
	}

	/**
	 * Add an event listener.
	 */
	on(event, callback) {
		this.bus.addEventListener(event, callback);
	}

	/**
	 * Add an event listener ONCE.
	 */
	once(event, callback) {
		this.bus.addEventListener(event, callback, { once: true });
	}

	/**
	 * Remove an event listener.
	 */
	off(event, callback) {
		this.bus.removeEventListener(event, callback);
	}

	/**
	 * Dispatch an event.
	 */
	emit(event, detail = {}) {
		this.bus.dispatchEvent(new CustomEvent(event, { detail }));
	}
}
export {EventBus as default};
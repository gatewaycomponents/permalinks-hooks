function on(eventType, listener, options) {
  window.addEventListener(eventType, listener, options);
}

function off(eventType, listener, options) {
  window.removeEventListener(eventType, listener, options);
}

function once(eventType, listener) {
  on(eventType, handleEventOnce);

  function handleEventOnce(event) {
    listener(event);
    off(eventType, handleEventOnce);
  }
}

function trigger(eventType, data = {}) {
  const event = new CustomEvent(eventType, data);
  window.dispatchEvent(event);
}

export { on, off, once, trigger };

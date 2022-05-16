function on(eventType, listener) {
  window.addEventListener(eventType, listener);
}

function off(eventType, listener) {
  window.removeEventListener(eventType, listener);
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

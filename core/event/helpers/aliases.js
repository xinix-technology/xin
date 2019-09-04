const registry = {
  tap: ['tap', 'click'],
};

const translators = {
  transitionend () {
    const el = document.createElement('fake');
    const transitions = {
      transition: 'transitionend',
      OTransition: 'oTransitionEnd',
      MozTransition: 'transitionend',
      WebkitTransition: 'webkitTransitionEnd',
    };

    for (const t in transitions) {
      if (el.style[t] !== undefined) {
        return [transitions[t]];
      }
    }
  },
};

const defaultTranslator = type => ([type]);

export function aliases (type) {
  if (type in registry === false) {
    const translator = translators[type] || defaultTranslator;
    registry[type] = translator(type);
  }

  return registry[type];
}

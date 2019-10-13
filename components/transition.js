import { Component, define } from '../component';
import { Async } from '../core';
import { addClass, removeClass } from '../helpers';

const TRANSITION = 'transition';
const ANIMATION = 'animation';

export class Transition extends Component {
  get props () {
    return {
      ...super.props,

      name: {
        type: String,
        required: true,
      },

      type: {
        type: String,
        value: TRANSITION,
      },
    };
  }

  attached () {
    super.attached();

    this.enterClass = `${this.name}-enter`;
    this.enterActiveClass = `${this.name}-enter-active`;
    this.enterToClass = `${this.name}-enter-to`;

    this.leaveClass = `${this.name}-leave`;
    this.leaveActiveClass = `${this.name}-leave-active`;
    this.leaveToClass = `${this.name}-leave-to`;
  }

  async insertBefore (node, marker) {
    const elements = node instanceof DocumentFragment ? [...node.children] : [node];
    addClass(elements, this.enterClass);

    super.insertBefore(node, marker);

    await Async.waitNextFrame();
    addClass(elements, this.enterActiveClass, this.enterToClass);
    await Async.waitNextFrame();
    removeClass(elements, this.enterClass);
    await new Promise(resolve => whenTransitionEnds(elements, this.type, resolve));
    removeClass(elements, this.enterActiveClass, this.enterToClass);
  }

  async removeChild (node) {
    if (node.nodeType !== 1) {
      return;
    }

    const elements = [node];

    addClass(elements, this.leaveClass);
    await Async.waitNextFrame();
    removeClass(elements, this.leaveClass);
    addClass(elements, this.leaveActiveClass, this.leaveToClass);
    await new Promise(resolve => whenTransitionEnds(elements, this.type, resolve));

    super.removeChild(node);
    removeClass(elements, this.leaveActiveClass, this.leaveToClass);
  }
}

define('xin-transition', Transition);

const TRANSFORM_RE = /\b(transform|all)(,|$)/;
const TRANSITION_PROP = 'transition';
const TRANSITION_END_EVENT = 'transitionend';
const ANIMATION_PROP = 'animation';
const ANIMATION_END_EVENT = 'animationend';

function whenTransitionEnds (elements, expectedType, cb) {
  let endCount = 0;
  function elementEnd () {
    endCount++;
    if (endCount >= elements.length) {
      cb();
    }
  }

  elements.forEach(el => {
    const { type, timeout, propCount } = getTransitionInfo(el, expectedType);

    if (!type) { return elementEnd(); }
    const event = type === TRANSITION ? TRANSITION_END_EVENT : ANIMATION_END_EVENT;
    let ended = 0;
    const end = function () {
      el.removeEventListener(event, onEnd);
      elementEnd();
    };
    const onEnd = function (e) {
      if (e.target === el) {
        if (++ended >= propCount) {
          end();
        }
      }
    };
    Async.run(() => {
      if (ended < propCount) {
        end();
      }
    }, timeout + 1);
    el.addEventListener(event, onEnd);
  });
}

function getTransitionInfo (el, expectedType) { // eslint-disable-line complexity
  const styles = getComputedStyle(el);
  // JSDOM may return undefined for transition properties
  const transitionDelays = (styles[TRANSITION_PROP + 'Delay'] || '').split(', ');
  const transitionDurations = (styles[TRANSITION_PROP + 'Duration'] || '').split(', ');
  const transitionTimeout = getTimeout(transitionDelays, transitionDurations);
  const animationDelays = (styles[ANIMATION_PROP + 'Delay'] || '').split(', ');
  const animationDurations = (styles[ANIMATION_PROP + 'Duration'] || '').split(', ');
  const animationTimeout = getTimeout(animationDelays, animationDurations);

  let type;
  let timeout = 0;
  let propCount = 0;
  /* istanbul ignore if */
  if (expectedType === TRANSITION) {
    if (transitionTimeout > 0) {
      type = TRANSITION;
      timeout = transitionTimeout;
      propCount = transitionDurations.length;
    }
  } else if (expectedType === ANIMATION) {
    if (animationTimeout > 0) {
      type = ANIMATION;
      timeout = animationTimeout;
      propCount = animationDurations.length;
    }
  } else {
    timeout = Math.max(transitionTimeout, animationTimeout);
    type = timeout > 0
      ? transitionTimeout > animationTimeout
        ? TRANSITION
        : ANIMATION
      : null;
    propCount = type
      ? type === TRANSITION
        ? transitionDurations.length
        : animationDurations.length
      : 0;
  }
  const hasTransform =
    type === TRANSITION &&
    TRANSFORM_RE.test(styles[TRANSITION_PROP + 'Property']);
  return {
    type: type,
    timeout: timeout,
    propCount: propCount,
    hasTransform: hasTransform,
  };
}

function getTimeout (delays, durations) {
  /* istanbul ignore next */
  while (delays.length < durations.length) {
    delays = delays.concat(delays);
  }

  return Math.max.apply(null, durations.map(function (d, i) {
    return toMs(d) + toMs(delays[i]);
  }));
}

// Old versions of Chromium (below 61.0.3163.100) formats floating pointer numbers
// in a locale-dependent way, using a comma instead of a dot.
// If comma is not replaced with a dot, the input will be rounded down (i.e. acting
// as a floor function) causing unexpected behaviors
function toMs (s) {
  return Number(s.slice(0, -1).replace(',', '.')) * 1000;
}

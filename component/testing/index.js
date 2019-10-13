import { define } from '../define';
import { idGenerator } from '../../helpers';

import './fixture';

const nextVal = idGenerator();

export const testing = {
  /**
   * Create new fixture element
   * @param {string} template
   * @param {object} object
   * @returns {Promise<Fixture>}
   */
  createFixture (template, object = {}) {
    if (template instanceof HTMLTemplateElement) {
      template = template.innerHTML;
    }

    const d = document.createElement('div');
    d.innerHTML = `<xin-fixture><template>${template}</template></xin-fixture>`;
    const fixture = window.fixture = d.firstElementChild;
    fixture.set(object);
    document.body.appendChild(fixture);

    return new Promise(resolve => resolve(fixture));
  },

  define (Component, options) {
    const name = this.generateName();

    define(name, Component, options);

    return name;
  },

  generateName () {
    return `test-${nextVal()}`;
  },
};

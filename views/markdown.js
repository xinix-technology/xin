import { define } from '../component';
import { View } from './view';
import marked from 'marked';
import Prism from 'prismjs';

import 'prismjs/themes/prism.css';

marked.setOptions({
  gfm: true,
  tables: true,
  highlight (code, language) {
    if (Prism.languages[language]) {
      return Prism.highlight(code, Prism.languages[language]);
    }
    return code;
  },
});

export class MarkdownView extends View {
  get props () {
    return Object.assign({}, super.props, {
      src: {
        type: String,
      },

      srcFn: {
        type: Function,
        value: () => {
          return () => this.__app.getFragment() + '.md';
        },
      },
    });
  }

  created () {
    super.created();

    this.cache = {};
  }

  focusing (parameters) {
    super.focusing(parameters);

    this.render();
  }

  async render () {
    let src = this.getSrcUrl();

    if (this.cache[src] === undefined) {
      let response = await window.fetch(src);
      if (response.ok) {
        let content = await response.text();
        this.cache[src] = marked(content);
      } else {
        this.cache[src] = '';
        console.warn(`Content at ${src} invalid or not found! [${response.status}]`);
      }
    }

    this.innerHTML = this.cache[src];
  }

  getSrcUrl () {
    let src = this.get('src');
    if (src) {
      return src;
    }

    let srcFn = this.get('srcFn');
    return srcFn();
  }
}

define('xin-markdown-view', MarkdownView);

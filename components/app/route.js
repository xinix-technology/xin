export class Route {
  static routeRegExp (str) {
    let chunks = str.split('[');

    if (chunks.length > 2) {
      throw new Error('Invalid use of optional params');
    }

    let tokens = [];
    let re = chunks[0].replace(/{([^}]+)}/g, function (g, token) {
      tokens.push(token);
      return '([^/]+)';
    }).replace(/\//g, '\\/');

    let optRe = '';

    if (chunks[1]) {
      optRe = '(?:' + chunks[1].slice(0, -1).replace(/{([^}]+)}/g, function (g, token) {
        let [ realToken, re = '[^/]+' ] = token.split(':');
        tokens.push(realToken);
        return `(${re})`;
      }).replace(/\//g, '\\/') + ')?';
    }

    return [ new RegExp('^' + re + optRe + '$'), tokens ];
  }

  static isStatic (pattern) {
    return !pattern.match(/[[{]/);
  }

  constructor (route, callback) {
    this.route = route;
    this.callback = callback;

    if (Route.isStatic(route)) {
      this.type = 's';
      this.pattern = null;
      this.args = [];
    } else {
      let result = Route.routeRegExp(route);
      this.type = 'v';
      this.pattern = result[0];
      this.args = result[1];
    }
  }

  getExecutorFor (fragment) {
    if (this.type === 's') {
      if (fragment === this.route) {
        return { handler: this, args: {} };
      }
    } else if (this.type === 'v') {
      let result = fragment.match(this.pattern);
      if (result) {
        return {
          handler: this,
          args: this.args.reduce((args, name, index) => {
            args[name] = result[index + 1];
            return args;
          }, {}),
        };
      }
    }
  }
}

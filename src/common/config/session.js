'use strict';

/**
 * session configs
 */
export default {
  name: 'thinkjs',
  type: 'file',
  secret: 'E&Z72PS#',
  timeout: 24 * 3600,
  cookie: { // cookie options
    length: 32,
    httponly: true
  },
  adapter: {
    file: {
      path: think.RUNTIME_PATH + '/session',
    }
  }
};
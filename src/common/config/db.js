'use strict';
/**
 * db config
 * @type {Object}
 */
export default {
  type: 'mysql',
  adapter: {
    mysql: {
      host: '127.0.0.1',
      port: '',
      database: 'pictureApp',
      user: 'root',
      password: 'asdfghjkl',
      prefix: '',
      encoding: 'utf8'
    },
    mongo: {

    }
  }
};
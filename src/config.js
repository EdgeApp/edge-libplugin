import { postWrapper } from './bridge.js'

/**
 * Fetch a configuration value. These are set in the native code, before the
 * webview is every loaded.
 * @param {key} key - the configuration key to fetch a value for
 * @return Promise with either string value on success or err on failure
 */
export function get (key) {
  return postWrapper({func: 'get', key})
}

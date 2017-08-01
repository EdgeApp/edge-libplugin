import { postWrapper } from './bridge.js'

/**
 * Launches a native alert dialog.
 * @param {string} title - the dialog title
 * @param {string} message - the message body of the dialog
 */
export function showAlert (success, title, message, options) {
  return postWrapper({func: 'showAlert', success, title, message})
}

/**
 * Hide an alerts that are currently displayed.
 */
export function hideAlert () {
  return postWrapper({func: 'hideAlert'})
}

/**
 * Set the title of the current view. This updates the native apps titlebar.
 * @param {string} title - the title string
 */
export function title (s) {
  return postWrapper({func: 'title', 'title': s})
}

/**
 * Go back in the navigation stack.
 */
export function back () {
  return postWrapper({func: 'back'})
}

/**
 * Exit the plugin. This pops the current fragment or view controller of the
 * stack and destroys the webview.
 */
export function exit () {
  return postWrapper({func: 'exit'})
}

/**
 * Launch an external web page or application.
 * @param {string} uri - the uri or url to open in a different app.
 */
export function launchExternal (uri) {
  return postWrapper({func: 'launchExternal', uri})
}

/**
 * Clear the naviation stack. Helpful when overriding the behavior of the
 * back button.
 */
export function navStackClear () {
  return postWrapper({func: 'navStackClear'})
}

/**
 * Push a new URL onto the nav stack.
 */
export function navStackPush (path) {
  return postWrapper({func: 'navStackPush', path})
}

/**
 * Pop a URL off the nav stack.
 */
export function navStackPop () {
  return postWrapper({func: 'navStackPop'})
}

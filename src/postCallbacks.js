import { postWrapper } from './bridge.js'

export function edgeCallback (data) {
  return postWrapper({func: 'edgeCallback', data})
}

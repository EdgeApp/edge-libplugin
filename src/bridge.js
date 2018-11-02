function awaitPostMessage() {
  var isReactNativePostMessageReady = !!window.originalPostMessage;
  var queue = [];
  var currentPostMessageFn = function store(message) {
    if (queue.length > 100) queue.shift();
    queue.push(message);
  };
  if (!isReactNativePostMessageReady) {
    var originalPostMessage = window.postMessage;
    Object.defineProperty(window, 'postMessage', {
      configurable: true,
      enumerable: true,
      get: function () {
        return currentPostMessageFn;
      },
      set: function (fn) {
        currentPostMessageFn = fn;
        isReactNativePostMessageReady = true;
        setTimeout(sendQueue, 0);
      }
    });
    window.postMessage.toString = function () {
      return String(originalPostMessage);
    };
  }

  function sendQueue() {
    while (queue.length > 0) window.postMessage(queue.shift());
  }
}
awaitPostMessage()
// Repurposed ideas from: https://gist.github.com/blankg/d5537a458b55b9d15cb4fd78258ad840
let promiseChain = new Promise(function (resolve, reject) {
  function tryAgain () {
    if (window.postMessage.length !== 1) {
      setTimeout(() => {
        tryAgain()
      }, 250)
    } else {
      resolve()
    }
  }
  tryAgain()
})
const callbacks = {}
const promises = {}
const guid = function () {
  function s4 () {
    return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1)
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4()
}

export function postWrapper (args) {
  // Add callback id to args
  args.cbid = guid()
  // Queue up message
  promiseChain = promiseChain.then(function () {
    return new Promise(function (resolve, reject) {
      promises[args.cbid] = {
        resolve: resolve,
        reject: reject
      }
      window.postMessage(JSON.stringify(args), '*')
    })
  })
  return new Promise((resolve, reject) => {
    callbacks[args.cbid] = (err, data) => {
      if (err) {
        reject(err)
      } else {
        resolve(data)
      }
    }
  })
}

function nextMessage (cbid) {
  if (promises[cbid]) {
    promises[cbid].resolve()
    delete promises[cbid]
  }
}

function pluginReturn (data) {
  const {cbid, err, res} = JSON.parse(data)
  if (callbacks[cbid]) {
    callbacks[cbid](err, res)
    delete callbacks[cbid]
    return true
  } else {
    return false
  }
}

document.PLUGIN_NEXT = window.PLUGIN_NEXT = nextMessage
document.PLUGIN_RETURN = window.PLUGIN_RETURN = pluginReturn

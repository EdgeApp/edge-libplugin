import { postWrapper } from './bridge.js'

/**
 * Returns a bitid address for the given uri and message
 * @return {string} bitid address
 */
export function bitidAddress (uri, message) {
  return postWrapper({
    func: 'bitidAddress', uri: uri, message: message
  })
}

/**
 * Returns a bitid signature for the given uri and message
 * @return {string} bitid signature
 */
export function bitidSignature (uri, message) {
  return postWrapper({func: 'bitidSignature', uri, message})
}

/**
 * returns wallet selected from within the plugin
 * @return promise
 */
export function chooseWallet (id, currencyCode) {
  return postWrapper({func: 'chooseWallet', id, currencyCode})
}

/**
 * Launches UI modal to select a wallet
 * @return promise
 */
export function changeWallet () {
  return postWrapper({func: 'changeWallet'})
}

/**
 * Returns the user's currently selected wallet
 * @return promise
 */
export function selectedWallet () {
  return postWrapper({func: 'selectedWallet'})
}

/**
 * Returns a list of the wallets for this account, included archived wallets
 * @return {object} an array of wallets
 */
export function wallets (options) {
  return postWrapper({func: 'wallets', options})
}

/**
 * Create a receive request from the provided wallet.
 * @param {object} walletId - the walletId object
 * @return {object} currencyCode - currency code
 */
export function getAddress (walletId, currencyCode) {
  return postWrapper({func: 'getAddress', walletId, currencyCode})
}

/**
 * Finalizing a request marks the address as used and it will not be used for
 * future requests. The metadata will also be written for this address.  This
 * is useful so that when a future payment comes in, the metadata can be
 * auto-populated.
 * @return true if the request was successfully finalized.
 * @param {object} wallet - the wallet object
 * @param {string} requestId - the bitcoin address to finalize
 */
export function finalizeReceiveRequest (wallet, requestId) {
  return postWrapper({func: 'finalizeReceiveRequest', wallet, requestId})
}

/**
 * Request that the user spends.
 * @param {object} wallet - the wallet object
 * @param {string} toAddress - the recipient address
 * @param {number} nativeAmount - how many satoshis to spend
 */
export function requestSpend (wallet, toAddress, nativeAmount, options) {
  return postWrapper({
    func: 'requestSpend',
    wallet,
    toAddress,
    nativeAmount,
    options
  })
}

/**
 * Request that the user spends to 2 outputs.
 * @param {object} wallet - the wallet object
 * @param {string} toAddress - the recipient address
 * @param {number} nativeAmount - how many satoshis to spend
 * @param {string} toAddress2 - the recipient address
 * @param {number} nativeAmount2 - how many satoshis to spend
 */
export function createSpendRequest2 (wallet, toAddress, nativeAmount, toAddress2, nativeAmount2, options) {
  return postWrapper({
    func: 'createSpendRequest2',
    wallet,
    toAddress,
    nativeAmount,
    toAddress2,
    nativeAmount2,
    options
  })
}

/**
 * Request that the user creates and signs a transaction
 * @param {object} wallet - the wallet object
 * @param {string} toAddress - the recipient address
 * @param {number} nativeAmount - how many satoshis to spend
 * @param {amountFiat} amountFiat - not required, but the fiat value at the time of the request
 */
export function requestSign (wallet, toAddress, nativeAmount, amountFiat, options) {
  return postWrapper({
    func: 'requestSign',
    wallet,
    toAddress,
    nativeAmount,
    amountFiat,
    options
  })
}

/**
 * Broadcast a transaction.
 * @param {object} the wallet object
 * @param {string} the raw hex to be saved to the database
 */
export function broadcastTx (wallet, rawtx) {
  return postWrapper({func: 'broadcastTx', wallet, rawtx})
}

/**
 * Save the transaction to transaction database This should only be called if
 * the transaction has been successfully broadcasted, either by using
 * #Airbitz.core.broadcastTx or by a third party.
 * @param {object} the wallet object
 * @param {string} the raw hex to be saved to the database
 */
export function saveTx (wallet, rawtx) {
  return postWrapper({func: 'saveTx', wallet, rawtx})
}

/**
 * Launches the native OS's camera or file browser so the user can select a
 * file.
 */
export function requestFile (options) {
  return postWrapper({func: 'requestFile', options: options})
}

/**
 * Securely persist data into the Airbitz core. Only the current plugin will
 * have access to that data.
 * @param {string} key - the key to access the data in the future
 * @param {object} data - the data to write, which will be encrypted and backed up
 */
export function writeData (key, value) {
  return postWrapper({func: 'writeData', key, value})
}

/**
 * Clear all data in the Airbitz core, for the current plugin.
 */
export function clearData () {
  return postWrapper({func: 'clearData'})
}

/**
 * Read the securely stored data from disk.
 * @param {string} key - the key to access the data.
 */
export function readData (key) {
  return postWrapper({func: 'readData', key})
}

/**
 * Log messages to the ABC core at a particular level.
 * @param {number} level - ERROR = 0, WARNING = 1, INFO = 2, DEBUG = 3;
 */
export function debugLevel (level, text) {
  return postWrapper({func: 'debugLevel', level, text})
}

/**
 * There is affiliate data only if the account was installed via an affiliate
 * link.
 * @return {object} dictionary of affiliate data
 */
export function getAffiliateInfo () {
  return postWrapper({func: 'getAffiliateInfo'})
}

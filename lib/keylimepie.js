/*
	keylimepie v1.1.0 - a javascript utility library
	made with <3 by https://infinixi.us

	https://files.infinixi.us/keylimepie.js
	https://files.infinixi.us/keylimepie.min.js
	https://github.com/infinixius/keylimepie.js
*/

var Lime = {
	context: null,
	features: [],
	modules: {
		Logger: {},
		Time: {},
		Utility: {}
	},
	platform: "",
	version: "1.1.0"
}

/* Setup */

try { if (window) Lime.platform = "browser"; Lime.context = window } catch (err) {}
try { if (process) Lime.platform = "node"; Lime.context = global } catch (err) {}
try { if (globalThis) Lime.context = globalThis} catch (err) {}

if (Object.defineProperty) Lime.features.push("Object.defineProperty")
try { if (process) Lime.features.push("process") } catch (err) {}

/**
 * Adds a new property to a method.
 * 
 * @param {Object} obj 
 * @param {string} name 
 * @param {Function} func 
 */
function define(obj, name, func) {
	if (Lime.features.includes("Object.defineProperty")) {
		Object.defineProperty(obj, name, {
			enumerable: false,
			value: func
		})
	} else {
		obj[name] = func
	}
}

/* Prototype Functions */

/**
 * Returns a random item from the array.
 * 
 * @returns {Array} Random item from the array
 */
define(Array.prototype, "random", function() {
	return this[Math.floor(Math.random() * this.length)]
})

/**
 * Returns a random integer from min to max, with min and max included.
 * 
 * @param {number} min
 * @param {number} max
 * @returns {number}
 */

define(Math, "randInt", function() {
	return Math.floor(Math.random() * (max - min - 1) + min)
})

/**
 * Returns an array with elements up to amount, intended to be used in for loops. Essentially a port of Python's range().
 * 
 * @param {number} amount 
 * @returns {Array}
 */
define(Math, "range", function(amount) {
	var range = []
	for (var i = 0; i < amount; i++) {
		range.push(i)
	}
	return range
})

/**
 * Returns the number in a string, with commas (or another optional string) separating it. Example: 500391495 turns into 500,391,495.
 * 
 * @param {string} separator
 * @returns {string}
 */
define(Number.prototype, "toStringWithSeparator", function(separator) {
	return this.toString().replace(/\B(?=(\d{3})+(?!\d))/g, separator ?? ",")
})

/* Logger */

Lime.modules.Logger.config = {
	align: function(type) {return " ".repeat(Object.keys(this.types).reduce((a, b) => a.length > b.length ? a : b, "").length - type.length)},
	format: function (type, message, colored) { return `[${this.timestamp(new Date())}] ${colored ? this.types[type].color : ""}${this.align(type)}[${type.toUpperCase()}]${colored ? this.types["verbose"].color : ""} : ${message}` },
	fileStream: null,
	newline: {
		stdout: "\x1b[0m\n",
		file: "\n"
	},
	timestamp: function (date) { return `${date.getFullYear()}-${("0" + (date.getMonth() + 1)).slice(-2)}-${("0" + date.getDate()).slice(-2)} ${date.getHours()}:${date.getMinutes()}:${("0" + date.getSeconds()).slice(-2)}`},
	types: {
		info: {stdout: true, file: true, color: "\x1b[34m"},
		warn: {stdout: true, file: true, color: "\x1b[33m"},
		error: {stdout: true, file: true, color: "\x1b[31m"},
		debug: {stdout: false, file: true, color: "\x1b[32m"},
		verbose: {stdout: false, file: true, color: "\x1b[37m"},
	}
}

/**
 * Initializes the logger, with an optional WritableStream argument that the logger will write to upon each log (without colors).
 * 
 * @param {WritableStream} fileStream 
 */
Lime.modules.Logger.init = function(fileStream) {
	for (const type of Object.keys(Lime.modules.Logger.config.types)) {
		Logger[type] = (message) => {Lime.modules.Logger.log(type, message) }
	}

	if (fileStream) {
		Lime.modules.Logger.config.fileStream = fileStream
	}
}

/**
 * Manually logs to the logger with a type and a message. Will write to `Lime.modules.Logger.config.fileStream` if it exists.
 * 
 * @param {string} type 
 * @param {string} message 
 */
Lime.modules.Logger.log = function(type, message) {
	if (Lime.platform == "node") {
		if (Lime.modules.Logger.config.fileStream) Lime.modules.Logger.config.fileStream.write(Lime.modules.Logger.config.format(type, message, false) + Lime.modules.Logger.config.newline.file)
		if (Lime.modules.Logger.config.types[type].stdout) process.stdout.write(Lime.modules.Logger.config.format(type, message, true) + Lime.modules.Logger.config.newline.stdout)
	}
}

/* Time */

/**
 * Waits for `milliseconds`. If `callback` is provided, call it when the wait is done. If it isn't provided, return a `Promise`, and resolves it when the wait is done. Internally uses `setTimeout()`.
 * 
 * @param {*} milliseconds 
 * @param {*} callback 
 */
Lime.modules.Time.wait = function(milliseconds, callback) {
	if (callback) {
		setTimeout(callback, milliseconds)
	} else {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				resolve()
			}, milliseconds)
		})
	}
}

/**
 * Similar to `Time.wait()`, except instead of waiting for a set amount of time to pass, `Time.waitUntil()` waits until `func` returns true. If `callback` is provided, call it when the wait is done. If it isn't provided, return a `Promise`, and resolves it when the wait is done.
 * 
 * @param {function} func 
 * @param {function} callback 
 * @returns 
 */
Lime.modules.Time.waitUntil = function(func, callback) {
	if (callback) {
		var interval = setInterval(() => {
			if (func()) {
				callback()
				clearInterval(interval)
			}
		})
	} else {
		return new Promise((resolve, reject) => {
			var interval = setInterval(() => {
				if (func()) {
					resolve()
					clearInterval(interval)
				}
			})
		})
	}
}

/**
 * Repeatedly runs `callback` every `interval`, eventually stopping at `limit`. This class is essentially just a fancy wrapper over the pre-existing `setInterval()` and `clearInterval()` methods.
 * @class
 * @property {number} interval
 * @property {number} limit
 * @property {number} timesRan
 * @property {boolean} paused
 * @property {function} callback
 */
Lime.modules.Time.Timer = class {
	/**
	 * @constructor
	 * @param {number} interval
	 * @param {limit} limit
	 * @param {function} callback
	 */
	constructor(interval, limit, callback) {
		this.interval = interval
		this.limit = limit ?? -1
		this.timesRan = 0
		this.paused = false
		this.callback = callback
		this.timer
	}
	tick() {
		if (!this.paused) {
			this.timesRan++
			if (this.timesRan <= this.limit) {
				this.callback(this.timesRan)
			} else {
				this.stop()
			}
		}
	}
	start() {
		if (!this.timer) {
			this.timer = setInterval(() => {this.tick()}, this.interval)
		}
	}
	stop() {
		if (this.timer) {
			clearInterval(this.timer)
		}
	}
	pause() {
		this.paused = true
	}
	resume() {
		this.paused = false
		this.start()
	}
}

/* Utility */

/**
 * Utility function for parsing a JSON string, but returns a promise that resolves or rejects, without throwing an error. Essentially identical to the standard `JSON.parse()` except for that.
 * 
 * @param {string} value 
 * @param {string} reviver 
 * @returns {object}
 */
Lime.modules.Utility.parseJSONSafe = function (value, reviver) {
	return new Promise((resolve, reject) => {
		try {
			resolve(JSON.parse(value, reviver))
		} catch (err) {
			reject(err)
		}
	})
}

/**
 * Utility function for converting an object into a JSON string, but returns a promise that resolves or rejects, without throwing an error. Essentially identical to the standard `JSON.stringify()` except for that.
 * 
 * @param {object} value 
 * @param {string} replacer
 * @param {string} space
 * @returns {string}
 */
Lime.modules.Utility.stringifyJSONSafe = function (value, replacer, space) {
	return new Promise((resolve, reject) => {
		try {
			resolve(JSON.stringify(value, replacer, space))
		} catch (err) {
			reject(err)
		}
	})
}

/* Export */

Lime.context.Lime = Lime
for (const module of Object.keys(Lime.modules)) {
	Lime.context[module] = Lime.modules[module]
}
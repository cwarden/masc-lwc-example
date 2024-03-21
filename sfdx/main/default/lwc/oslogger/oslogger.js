const DEBUG = 10;
const INFO = 30;
const ERROR = 50;

export { DEBUG, INFO, ERROR };

let _level = ERROR;

export function setLevel(level) {
	_level = level;
}

export class Logger {
	constructor(name, options) {
		const { tags, context } = options || {};
		this.name = name;
		this._tags = tags || {};
		this._context = context || {};
		this.level = _level;
	}

	setLevel(level) {
		this.level = level;
	}

	tags(tags) {
		return new Logger(this.name, {
			tags: { ...this._tags, ...tags },
			context: this._context,
		});
	}

	context(context) {
		return new Logger(this.name, {
			tags: this._tags,
			context: { ...this._context, ...context },
		});
	}

	debug(...msg) {
		if (this.shouldLog(DEBUG)) {
			console.debug(...this._buildConsoleMsg(msg));
		}
	}

	info(...msg) {
		if (this.shouldLog(INFO)) {
			console.log(...this._buildConsoleMsg(msg));
		}
	}

	error(...msg) {
		if (this.shouldLog(ERROR)) {
			console.error(...this._buildConsoleMsg(msg));
		}
	}

	shouldLog(methodLevel) {
		return methodLevel >= this.level || methodLevel >= _level;
	}

	_buildConsoleMsg(msgArr) {
		const arr = [`[${this.name}]`, ...msgArr.map(stringifyNonString)];
		// Tags first because context can be big
		Object.entries(this._tags).forEach(([k, v]) => arr.push(`${k}=${stringifyNonString(v)}`));
		Object.entries(this._context).forEach(([k, v]) => arr.push(`${k}=${stringifyNonString(v)}`));
		return arr;
	}

	exception(exc) {
		console.error(exc);
	}
}

function stringifyNonString(o) {
	return typeof o === "string" ? o : JSON.stringify(o);
}

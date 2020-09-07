const fetch = require('node-fetch');

const API_URL = 'https://nmbr.dev';
const OPERATORS = {
	'+': 'add',
	'-': 'subtract',
	'*': 'multiply',
	'/': 'divide',
	'%': 'remainder',
	'**': 'exponentiation'
};

const createCallPromise = async (operator, a, b) => {
	const res = await fetch(`${API_URL}/${operator}/${a}/${b}`);
	const { result, error } = await res.json();
	if (error) throw new Error(error);
	return result;
};

module.exports = Nmbr => {
	for (const [key, value] of Object.entries(OPERATORS)) {
		Nmbr.prototype[Symbol.for(key)] = function(b) {
			const a = this.valueOf();
			return createCallPromise(value, a, b);
		};
	}
};

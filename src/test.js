require('./')(Number);

const TESTS = [
	{ op: '+', a: 2, b: 1, exp: 3 },
	{ op: '-', a: 2, b: 2, exp: 0 },
	{ op: '*', a: 2, b: 2, exp: 4 },
	{ op: '/', a: 4, b: 2, exp: 2 },
	{ op: '**', a: 2, b: 2, exp: 4 },
	{ op: '%', a: 5, b: 2, exp: 1 }
];

const OPERATORS = {
	'+': async (a, b) => await (a + b),
	'-': async (a, b) => await (a - b),
	'*': async (a, b) => await (a * b),
	'/': async (a, b) => await (a / b),
	'**': async (a, b) => await (a ** b),
	'%': async (a, b) => await (a % b)
};

(async () => {
	let errors = [];

	for (const test of TESTS) {
		const { op, a, b, exp } = test;
		const timeKey = `async ${op}`;
		console.log(`${a} ${op} ${b} =`);
		console.time(timeKey);
		const res = await OPERATORS[op](a, b);
		console.timeEnd(timeKey);
		if (res === exp) {
			console.log(`Success! Result of operator '${op}' matched expected value '${exp}'`);
		} else {
			console.error(`Error! Result '${res}' of operator '${op}' did not match expected value '${exp}'`);
			errors.push(op);
		}
	}

	if (errors.length === 0) {
		process.exit(0);
	} else {
		console.log(`Errored operators: ${JSON.stringify(errors)}`);
		process.exit(1);
	}
})();

var assert = require('assert');
//var fs = require('fs');

var reporter = require('../').reporter;

function captureReporter(input) {
	var capture = '';
	var oldWrite = process.stdout.write;
	process.stdout.write = function(data) {
		capture += data;
	};

	reporter(input);

	process.stdout.write = oldWrite;
	return capture;
}

describe('jshint-reporter-badge', function() {
	it.only('should render a OK badge if no errors', function() {
		var capture = captureReporter([]);
		assert(capture.match('>ok<'));

		capture = captureReporter([1]);
		assert(capture.match('>1 error<'));

		capture = captureReporter([1, 2]);
		assert(capture.match('>2 errors<'));

		//fs.writeFileSync('./test.svg', capture);
	});
});
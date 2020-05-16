var shields = require('shields-lightweight');

exports.reporter = function(errors) {
	var subject = process.env.JSHINT_BADGE_SUBJECT || 'jshint';
	var okColor = process.env.JSHINT_BADGE_OK_COLOR || 'brightgreen';
	var koColor = process.env.JSHINT_BADGE_KO_COLOR || 'red';
	var style = process.env.JSHINT_BADGE_STYLE;

	var color = errors.length ? koColor : okColor;

	var status = 'ok';
	if (errors.length === 1) {
		status = '1 error';
	} else if (errors.length > 1) {
		status = errors.length + ' errors';
	}

	process.stdout.write(shields.svg(subject, status, color, style));
};
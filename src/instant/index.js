const appRootDir = require('app-root-dir').get();
const config = require(appRootDir + '/dareboost.json');
const colors = require('colors/safe');

const Analysis = require('./model/Analysis');

config.urls.forEach((url) => {
	var analysis = new Analysis(url);

	console.info(colors.bgCyan(`Starting analysis for ${url}...`));
	analysis.start((body) => {
		console.info(colors.yellow(`Analysis started for ${url}.`));

		var report = analysis.getReport();

		console.info(colors.green(`Analysis complete for ${url} :`));
		console.log(colors.bgGreen(colors.black(`SCORE: ${report.summary.score}`)));
		console.log(colors.bgGreen(colors.black(`Load time: ${report.summary.loadTime/1000}s`)));
		console.log(colors.bgGreen(colors.black(`HTTP requests: ${report.summary.requestsCount}`)));
		console.log(colors.bgGreen(colors.black(`Page weight: ${report.summary.weight} bytes`)));

		console.log(colors.green(`More info at ${report.publicReportUrl}`));
		console.info("\n");
	});
});

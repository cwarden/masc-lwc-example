import { getRecord as getRecordAdapter } from 'lightning/uiRecordApi';

import { Logger, setLevel, DEBUG } from "c/oslogger";

setLevel(DEBUG);
const logger = new Logger("osUiRecordApi");

function getRecord(config, dispatch) {
	var gr = new getRecordAdapter(result => {
		const { data, error } = result;
		logger.debug('getRecord', 'data', data);
		if (error) {
			dispatch({ type: 'error', error})
		}
		if (data) {
			dispatch({ type: 'getRecord', data})
		}
	});

	gr.connect();
	gr.update(config);
}

export {
	getRecord
};

import moment from 'moment';

export const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export const idRegex = /[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89aAbB][a-f0-9]{3}-[a-f0-9]{12}/;
export const objectIdRegex = /^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/;

export const formats = [
	moment.ISO_8601,
	moment.RFC_2822,
	'YYYY-MM-DDThh:mm:ss Z',
	'MM/DD/YYYY  :)  HH*mm*ss',
	'DD/MM/YYYY  :)  HH*mm*ss',
	'YYYY/MM/DD  :)  HH*mm*ss',
	'MM-DD-YYYY  :)  HH*mm*ss',
	'DD-MM-YYYY  :)  HH*mm*ss',
	'YYYY-MM-DD  :)  HH*mm*ss',
];

export const isEmail = (text: string) => {
	return String(text)
		.toLowerCase()
		.match(emailRegex);
};

export const isID = (text: string) => {
	if (!String(text).match(idRegex)) return String(text).match(objectIdRegex);
	return true;
};

export const isDate = (date: string) => {
	return moment(date, formats, true).isValid();
};

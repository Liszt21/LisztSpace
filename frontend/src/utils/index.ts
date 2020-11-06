export const dateFormat = (date: Date, format?: string): string => {
	let year = `${date.getFullYear()}`;
	let month = `${date.getMonth() + 1}`;
	if (month.length === 1) {
			month = `0${month}`;
	}
	let day = `${date.getDate()}`;
	if (day.length === 1) {
			day = `0${day}`;
	}

	let hours = `${date.getHours()}`;
	if (hours.length === 1) {
			hours = `0${hours}`;
	}
	let minutes = `${date.getMinutes()}`;
	if (minutes.length === 1) {
			minutes = `0${minutes}`;
	}
	let seconds = `${date.getSeconds()}`;
	if (seconds.length === 1) {
			seconds = `0${seconds}`;
	}

	return (format || "yyyy-MM-dd hh:mm:ss")
			.replace(/yyyy/g, year)
			.replace(/MM/g, month)
			.replace(/dd/g, day)

			.replace(/hh/g, hours)
			.replace(/mm/g, minutes)
			.replace(/ss/g, seconds);
}

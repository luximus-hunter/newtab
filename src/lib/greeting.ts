const greet = (name?: string): string => {
	let greeting = '';

	const hour = new Date().getHours();

	if (hour < 12) {
		greeting = 'Good Morning';
	} else if (hour < 18) {
		greeting = 'Good Afternoon';
	} else if (hour < 21) {
		greeting = 'Good Evening';
	} else {
		greeting = 'Good Night';
	}

	if (name) {
		greeting += `, ${name}`;
	}

	greeting += '!';

	return greeting;
};

export default greet;

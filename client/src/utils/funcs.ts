export const isEmptyInputs = (input: any): boolean => {
	for (let key in input) {
		let val: string = input[key];
		if (val === "") return true;
	}
	return false;
};

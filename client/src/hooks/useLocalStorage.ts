import { useState, useEffect } from "react";

export const useLocalStorage = (key: string, initialValue: string) => {
	const [value, setValue] = useState(() => {
		try {
			if (typeof window !== "undefined") {
				const item = window.localStorage.getItem(key);
				return item ? JSON.parse(item) : initialValue;
			}
		} catch (error) {
			console.log(error);
		}
		return initialValue;
	});

	useEffect(() => {
		try {
			if (typeof window !== "undefined") {
				window.localStorage.setItem(key, JSON.stringify(value));
			}
		} catch (error) {
			console.log(error);
		}
	}, [value, setValue, key]);

	return [value, setValue];
};

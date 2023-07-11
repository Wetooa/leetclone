import { firestore } from "@/firebase/firebase";
import { defaultToastConfig } from "@/utils/toastConfig";
import { setDoc, doc } from "firebase/firestore";
import { ChangeEvent, FormEvent, useRef, useState } from "react";
import { toast } from "react-toastify";

interface AddProblemsFormProps {}

export default function AddProblemsForm({}: AddProblemsFormProps) {
	const defaultInputs = {
		id: "",
		title: "",
		difficulty: "",
		category: "",
		videoid: "",
		link: "",
		order: 0,
		likes: 0,
		dislikes: 0,
	};

	const [inputs, setInputs] = useState(defaultInputs);
	const idRef = useRef<HTMLInputElement>(null);

	function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
		setInputs({ ...inputs, [e.target.name]: e.target.value });
	}

	async function handleFormSubmit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();

		const newProblem = {
			...inputs,
			order: Number(inputs.order),
		};

		await setDoc(doc(firestore, "problems", inputs.id), newProblem);
		toast.success("problem added successfully", defaultToastConfig);
		setInputs(defaultInputs);
		idRef.current?.focus();
	}

	return (
		<form
			action=""
			onSubmit={handleFormSubmit}
			className="p-6 flex flex-col gap-3 max-w-sm"
		>
			<input
				onChange={handleInputChange}
				type="text"
				placeholder="id"
				name="id"
				value={inputs.id}
				ref={idRef}
			/>
			<input
				onChange={handleInputChange}
				type="text"
				placeholder="title"
				value={inputs.title}
				name="title"
			/>
			<input
				onChange={handleInputChange}
				type="text"
				placeholder="difficulty"
				value={inputs.difficulty}
				name="difficulty"
			/>
			<input
				onChange={handleInputChange}
				type="text"
				placeholder="category"
				value={inputs.category}
				name="category"
			/>
			<input
				onChange={handleInputChange}
				type="number"
				placeholder="order"
				value={inputs.order}
				name="order"
			/>
			<input
				onChange={handleInputChange}
				type="text"
				placeholder="video id?"
				value={inputs.videoid}
				name="videoId"
			/>
			<input
				onChange={handleInputChange}
				type="text"
				placeholder="link?"
				value={inputs.link}
				name="link"
			/>

			<button className="bg-white">save to db</button>
		</form>
	);
}

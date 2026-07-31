import { useState } from "react";

import Button from "../ui/Button";
import Input from "../ui/Input";

export default function CollectionForm({ onSubmit }) {
	const [name, setName] = useState("");
	const [description, setDescription] = useState("");

	function handleSubmit(e) {
		e.preventDefault();
		if (!name.trim()) return;
		onSubmit(name);
	}

	return (
		<form onSubmit={handleSubmit} className='space-y-5'>
			<div>
				<label className='mb-2 block text-sm'>Collection Name</label>

				<Input
					value={name}
					onChange={(e) => setName(e.target.value)}
					placeholder='User APIs'
				/>
			</div>

			<div>
				<label className='mb-2 block text-sm'>Description</label>

				<textarea
					value={description}
					onChange={(e) => setDescription(e.target.value)}
					className='h-24 w-full rounded border border-zinc-700 bg-zinc-950 p-3 outline-none focus:border-blue-500'
				/>
			</div>

			<div className='flex justify-end'>
				<Button type='submit'>Create Collection</Button>
			</div>
		</form>
	);
}

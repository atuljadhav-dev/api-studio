import { useState } from "react";

import Input from "../ui/Input";
import Button from "../ui/Button";
export default function ProjectForm({ onSubmit }) {
	const [name, setName] = useState("");

	const [description, setDescription] = useState("");

	function handleSubmit(e) {
		e.preventDefault();

		onSubmit({
			name,
			description,
		});
	}

	return (
		<form onSubmit={handleSubmit} className='space-y-4'>
			<div>
				<label className='mb-1 block text-sm'>Project Name</label>

				<Input
					value={name}
					onChange={(e) => setName(e.target.value)}
					placeholder='My API Collection'
				/>
			</div>

			<div>
				<label className='mb-1 block text-sm'>Description</label>

				<textarea
					value={description}
					onChange={(e) => setDescription(e.target.value)}
					className='h-28 w-full rounded border border-zinc-700 bg-zinc-950 p-3 outline-none focus:border-blue-500'
				/>
			</div>

			<div className='flex justify-end gap-3'>
				<Button type='submit'>Create Project</Button>
			</div>
		</form>
	);
}

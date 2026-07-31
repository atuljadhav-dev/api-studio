export default function Button({ children, variant = "primary", ...props }) {
	const styles = {
		primary: "bg-blue-600 hover:bg-blue-700",

		secondary: "bg-zinc-700 hover:bg-zinc-600",
	};

	return (
		<button {...props} className={`rounded px-4 py-2 ${styles[variant]}`}>
			{children}
		</button>
	);
}

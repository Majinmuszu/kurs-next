const Loader = () => {
	return (
		<div className="flex h-20 items-center justify-center" aria-busy>
			<div className="h-12 w-12 animate-spin rounded-full border-t-4 border-blue-500 border-opacity-25" />
		</div>
	);
};

export { Loader };

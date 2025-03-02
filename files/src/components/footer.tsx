const Footer = () => {
	const currentYear = new Date().getFullYear();

	return (
		<footer className='w-full h-20 bg-neutral-950 mx-auto max-w-screen-xl flex items-center justify-between px-4 sm:px-6 lg:px-16'>
			<p className='text-xs text-white'>Copyright &copy; {currentYear} Company Name</p>

			<ul className='flex items-center justify-end gap-2'>
				<li>
					<a href='' className='select-none text-white text-xs transition-all duration-400 ease-in-out hover:opacity-90'>
						Link
					</a>
				</li>

				<li>
					<a href='' className='select-none text-white text-xs transition-all duration-400 ease-in-out hover:opacity-90'>
						Link
					</a>
				</li>

				<li>
					<a href='' className='select-none text-white text-xs transition-all duration-400 ease-in-out hover:opacity-90'>
						Link
					</a>
				</li>
			</ul>
		</footer>
	);
};

export { Footer };

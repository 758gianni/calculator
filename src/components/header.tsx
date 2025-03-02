import { Settings } from 'lucide-react';

const Header = () => {
	return (
		<header className='w-full h-20 bg-neutral-950 max-w-screen-xl flex flex-row items-center justify-between px-4 sm:px-6 lg:px-16'>
			<h1 className='font-semibold text-xl sm:text-2xl text-white'>Calculator</h1>

			<button type='button' className='z-50 select-none cursor-pointer size-10 flex items-center justify-center text-white bg-neutral-950 rounded-xl border border-neutral-950 transition-all duration-400 ease-in-out hover:border-orange-600 hover:opacity-90'>
				<Settings className='size-4' />
			</button>
		</header>
	);
};

export { Header };

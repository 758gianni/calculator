import { useEffect, useRef, useState } from 'react';
import { Check, Circle, Copy, Divide, Dot, Equal, Minus, Parentheses, Percent, Plus, X } from 'lucide-react';
import { useCalculator } from './contexts/calculator-context';
import { CalculatorButton } from './components/calculator-button';

const App = () => {
	const { equation, equationComplete, input } = useCalculator();
	const [copied, setCopied] = useState(false);
	const inputRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		const inputElement = inputRef.current;

		if (inputElement) {
			if (!equationComplete) {
				inputElement.scrollLeft = inputElement.scrollWidth;
			} else {
				inputElement.scrollLeft = 0;
			}
		}
	}, [input, equationComplete]);

	return (
		<div className='h-full max-w-screen-xl mx-auto bg-neutral-950 flex flex-col items-center justify-center'>
			<header className='w-full h-20 max-w-screen-xl flex items-center justify-center gap-2 px-4 sm:px-6 lg:px-16'>
				<Circle className='size-6 text-orange-600 fill-orange-600' />

				<h1 className='font-semibold text-2xl text-white'>Calculator</h1>
			</header>

			<main className='w-[calc(4*5rem+3*0.5rem)] h-[calc(30rem+5*0.5rem)] grid grid-cols-4 gap-2'>
				<div className='col-span-4 w-full h-20 flex items-center justify-between'>
					<div className='h-full bg-neutral-900 px-4 flex items-center justify-center rounded-l-2xl'>
						<button
							type='button'
							onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
								e.preventDefault();
								navigator.clipboard.writeText(equation);

								setCopied(true);
								setTimeout(() => {
									setCopied(false);
								}, 1500);
							}}
							className={`z-50 select-none cursor-pointer size-10 flex items-center justify-center text-white rounded-xl border transition-all duration-400 ease-in-out ${copied ? 'bg-orange-600/20 border-orange-600' : 'bg-neutral-900 border-neutral-900 hover:border-orange-600 hover:opacity-90'}`}>
							<span className='sr-only'>Copy</span>
							{copied ? <Check className='size-4 transition-all duration-400 ease-in-out' /> : <Copy className='size-4 transition-all duration-400 ease-in-out' />}
						</button>
					</div>

					<input
						ref={inputRef}
						type='text'
						value={input}
						placeholder='0'
						readOnly={true}
						disabled={true}
						className='w-full h-20 pl-0 pr-[calc((5rem-1.5rem)/2)] text-white text-4xl text-right bg-neutral-900 rounded-r-2xl border border-neutral-900 transition-all duration-400 ease-in-out shadow-none outline-none ring-0 ring-offset-0 focus:border-neutral-900 focus:outline-none focus:ring-0 focus:ring-offset-0'
					/>
				</div>

				<CalculatorButton label='AC' />
				<CalculatorButton label={Parentheses} />
				<CalculatorButton label={Percent} />
				<CalculatorButton label={Divide} />
				<CalculatorButton label='7' />
				<CalculatorButton label='8' />
				<CalculatorButton label='9' />
				<CalculatorButton label={X} />
				<CalculatorButton label='4' />
				<CalculatorButton label='5' />
				<CalculatorButton label='6' />
				<CalculatorButton label={Minus} />
				<CalculatorButton label='1' />
				<CalculatorButton label='2' />
				<CalculatorButton label='3' />
				<CalculatorButton label={Plus} />
				<CalculatorButton label='0' className='col-span-2 w-full' />
				<CalculatorButton label={Dot} />
				<CalculatorButton label={Equal} className='bg-orange-600 border-orange-600' />
			</main>
		</div>
	);
};

export { App };

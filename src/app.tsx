import { useEffect, useRef } from 'react';
import { Copy, Divide, Dot, Equal, Minus, Parentheses, Percent, Plus, X } from 'lucide-react';
import { useCalculator } from './contexts/calculator-context';
import { CalculatorButton } from './components/calculator-button';

const App = () => {
	const { equation, equationComplete, input } = useCalculator();
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
		<main className='h-[calc(100vh-10rem)] max-w-screen-xl mx-auto bg-neutral-950 flex items-center justify-center'>
			<div className='w-[calc(4*5rem+3*0.5rem)] h-[calc(30rem+5*0.5rem)] grid grid-cols-4 gap-2'>
				<div className='col-span-4 w-full h-20 flex items-center justify-between'>
					<div className='h-full bg-neutral-900 px-4 flex items-center justify-center rounded-l-2xl'>
						<button
							type='button'
							onClick={(e) => {
								e.preventDefault();
								navigator.clipboard.writeText(equation);
							}}
							className='z-50 select-none cursor-pointer size-10 flex items-center justify-center text-white bg-neutral-900 rounded-xl border border-neutral-900 transition-all duration-400 ease-in-out hover:border-orange-600 hover:opacity-90'>
							<Copy className='size-4' />
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
			</div>
		</main>
	);
};

export { App };

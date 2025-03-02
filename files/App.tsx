import { createElement, FC } from 'react';
import { Copy, Divide, Dot, Equal, Minus, Parentheses, Percent, Plus, X } from 'lucide-react';
import clsx from 'clsx';
import { useCalculator } from '../src/contexts/calculator-context';

const Header = () => {
	return (
		<header className='h-14 bg-neutral-950 max-w-screen-xl flex flex-row items-center justify-between px-4 sm:px-6 lg:px-16'>
			<h1 className='font-semibold text-xl sm:text-2xl text-white'>Calculator</h1>

			<button type='button' className='z-50 select-none size-10 flex items-center justify-center text-white bg-[rgb(9,9,9)] rounded-xl border border-[rgb(9,9,9)] transition-smooth hover:border-[rgb(255,86,18)] hover:opacity-90'>
				<svg className='size-4' xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'>
					<path d='M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z' />
					<circle cx='12' cy='12' r='3' />
				</svg>
			</button>
		</header>
	);
};

type CalculatorButtonProps = {
	label: string | typeof Divide | typeof Dot | typeof Equal | typeof Minus | typeof Parentheses | typeof Percent | typeof Plus | typeof X;
	className?: string;
};

const CalculatorButton: FC<CalculatorButtonProps> = ({ label, className }) => {
	const { equation, setEquation, equationComplete, setEquationComplete, input, setInput, bracketCount, setBracketCount } = useCalculator();
	const isIcon = typeof label !== 'string';

	return (
		<button
			type='button'
			onClick={(e) => {
				e.preventDefault();

				if (equationComplete && input === 'Error') {
					setEquation('');
					setInput('');
				}

				setEquationComplete(false);

				// console.log(equation, input);
				// setEquation(equation + label);

				if (!isIcon) {
					if (label === 'C') {
						setEquation('');
						setInput('');
					} else {
						console.log(equationComplete);

						if (equationComplete) {
							setEquation('');
							setInput('');
						}

						setEquation((prev) => prev + label);
						setInput((prev) => prev + label);
					}
				} else {
					// ArrowUpRight, Divide, Dot, LucideIcon, Minus, Parentheses, Percent, Plus, X

					switch (label) {
						case Divide:
							setEquation((prev) => prev + '/');
							setInput((prev) => prev + '÷');
							break;

						case Dot:
							setEquation((prev) => prev + '.');
							setInput((prev) => prev + '.');
							break;

						case Equal:
							setBracketCount(0);

							// console.log(eval('2(3)'));

							try {
								const evaluatedEquation = eval(equation.replace(/(\d)(\()/g, '$1 * ('));
								setEquation(evaluatedEquation);
								setEquationComplete(true);
								setInput(evaluatedEquation.toString());
							} catch {
								setEquation('');
								setEquationComplete(true);
								setInput('Error');

								// console.log('evaluatedEquation', eval(equation));
								// console.error(error);
							}

							break;

						case Minus:
							setEquation((prev) => prev + '-');
							setInput((prev) => prev + '-');
							break;

						case Parentheses:
							// setEquation((prev) => prev + '()');
							// setInput((prev) => prev + '()');

							// setEquation((prev) => {
							// 	if (bracketCount % 2 === 0) {
							// 		setBracketCount((count) => count + 1);
							// 		return prev + '(';
							// 	} else {
							// 		if (prev.includes('(')) {
							// 			setBracketCount((count) => count - 1);
							// 			return prev + ')';
							// 		}
							// 	}

							// 	return prev;
							// });

							// setInput((prev) => prev + (bracketCount % 2 === 0 ? '(' : ')'));

							// setEquation((prev) => {
							// 	if (bracketCount % 2 === 0) {
							// 		setBracketCount((count) => count + 1);
							// 		return prev + '(';
							// 	} else {
							// 		if (prev.split('(').length > prev.split(')').length) {
							// 			setBracketCount((count) => count - 1);
							// 			return prev + ')';
							// 		}
							// 	}

							// 	return prev;
							// });

							// setInput((prev) => {
							// 	if (bracketCount % 2 === 0) {
							// 		return prev + '(';
							// 	} else if (prev.split('(').length > prev.split(')').length) {
							// 		return prev + ')';
							// 	}

							// 	return prev;
							// });

							// break;
							setEquation((prev) => {
								// Determine the next bracket count and whether to add '(' or ')'
								let newBracketCount = bracketCount;
								let newEquation = prev;
								if (newBracketCount % 2 === 0) {
									// Opening bracket
									newEquation += '(';
									newBracketCount += 1;
								} else {
									// Closing bracket
									if (prev.split('(').length > prev.split(')').length) {
										newEquation += ')';
										newBracketCount -= 1;
									}
								}

								// Set the new bracket count and equation
								setBracketCount(newBracketCount);
								return newEquation;
							});

							setInput((prev) => {
								let newInput = prev;
								if (bracketCount % 2 === 0) {
									newInput += '(';
								} else if (prev.split('(').length > prev.split(')').length) {
									newInput += ')';
								}

								return newInput;
							});
							break;

						case Percent:
							setEquation((prev) => prev + '/');
							setInput((prev) => prev + '%');
							break;

						case Plus:
							setEquation((prev) => prev + '+');
							setInput((prev) => prev + '+');
							break;

						case X:
							setEquation((prev) => prev + '*');
							setInput((prev) => prev + 'x');
							break;
					}

					// else if (label === Minus) {
					// 	setEquation(equation + '-');
					// } else if (label === Plus) {
					// 	setEquation(equation + '+');
					// } else if (label === X) {
					// 	setEquation(equation + '*');
					// } else if (label === Dot) {
					// 	setEquation(equation + '.');
					// } else if (label === Percent) {
					// 	setEquation(equation + '%');
					// } else if (label === Parentheses) {
					// 	setEquation(equation + '()');
					// } else {
					// 	console.log(2);
					// }
				}
			}}
			className={clsx('col-span-1 select-none cursor-pointer size-20 flex items-center justify-center text-white text-2xl bg-[rgb(24,24,24)] rounded-2xl border border-[rgb(24,24,24)] transition-all duration-400 ease-in-out hover:border-orange-600 hover:opacity-90', className)}>
			{isIcon
				? createElement(label, {
						size: 24,
				  })
				: label}
		</button>
	);
};

const App = () => {
	// const [input, setInput] = useState('');
	const { equation, setEquation, equationComplete, setEquationComplete, input, setInput, bracketCount } = useCalculator();

	// if (label === Copy) {
	// 	navigator.clipboard.writeText(equation);
	// }

	console.log(equation, input, bracketCount);

	return (
		<>
			<Header />

			<main className='h-[calc(100vh-3.5rem-3.5rem)] max-w-screen-xl mx-auto bg-neutral-950 flex items-center justify-center'>
				<div className='w-[calc(20rem+3*0.5rem)] h-[calc(30rem+5*0.5rem)] grid grid-cols-4 gap-2'>
					<div className='col-span-4 w-full h-20 flex items-center justify-between'>
						<div className='h-full bg-[rgb(24,24,24)] px-4 flex items-center justify-center rounded-l-2xl'>
							<button type='button' className='z-50 select-none size-10 flex items-center justify-center text-white bg-[rgb(24,24,24)] rounded-xl border border-[rgb(24,24,24)] transition-all duration-400 ease-in-out hover:border-[rgb(255,86,18)] hover:opacity-90'>
								<Copy className='size-4' />
							</button>
						</div>

						<input
							type='text'
							//
							value={input}
							// onChange={(e) => setEquation(e.target.value)}
							// onChange={(e) => setInput(e.target.equation)}
							placeholder='0'
							readOnly={true}
							disabled={true}
							className='w-full h-20 pl-0 pr-[calc((5rem-1.5rem)/2)] text-white text-4xl text-right bg-[rgb(24,24,24)] rounded-r-2xl border border-[rgb(24,24,24)] transition-all duration-400 ease-in-out shadow-none outline-none ring-0 ring-offset-0 focus:border-[rgb(24,24,24)] focus:outline-none focus:ring-0 focus:ring-offset-0'
						/>
					</div>

					<CalculatorButton label='C' />
					<CalculatorButton label={Parentheses} />
					<CalculatorButton label={Percent} />
					<CalculatorButton label={Divide} />
					<CalculatorButton label='1' />
					<CalculatorButton label='2' />
					<CalculatorButton label='3' />
					<CalculatorButton label={X} />
					<CalculatorButton label='4' />
					<CalculatorButton label='5' />
					<CalculatorButton label='6' />
					<CalculatorButton label={Minus} />
					<CalculatorButton label='7' />
					<CalculatorButton label='8' />
					<CalculatorButton label='9' />
					<CalculatorButton label={Plus} />
					<CalculatorButton label='0' className='col-span-2 w-full' />
					<CalculatorButton label={Dot} />
					<CalculatorButton label={Equal} className='bg-orange-600 border-orange-600' />

					{/* <CalculatorButton label='C' onClick={() => {}} />
					<CalculatorButton label={Parentheses} onClick={() => {}} />
					<CalculatorButton label={Percent} onClick={() => {}} />
					<CalculatorButton label={Divide} onClick={() => {}} />
					<CalculatorButton label='1' onClick={() => {}} />
					<CalculatorButton label='2' onClick={() => {}} />
					<CalculatorButton label='3' onClick={() => {}} />
					<CalculatorButton label={X} onClick={() => {}} />
					<CalculatorButton label='4' onClick={() => {}} />
					<CalculatorButton label='5' onClick={() => {}} />
					<CalculatorButton label='6' onClick={() => {}} />
					<CalculatorButton label={Minus} onClick={() => {}} />
					<CalculatorButton label='7' onClick={() => {}} />
					<CalculatorButton label='8' onClick={() => {}} />
					<CalculatorButton label='9' onClick={() => {}} />
					<CalculatorButton label={Plus} onClick={() => {}} />
					<CalculatorButton label='0' onClick={() => {}} className='col-span-2 w-full' />
					<CalculatorButton label={Dot} onClick={() => {}} />
					<CalculatorButton label={ArrowUpRight} onClick={() => {}} className='bg-orange-600 border-orange-600' /> */}
				</div>
			</main>

			<footer className='h-14 bg-[rgb(9,9,9)] mx-auto max-w-screen-xl flex items-center justify-between px-4 sm:px-6 lg:px-16'>
				<p className='text-xs text-white'>Copyright &copy; 2025 Company Name</p>

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
		</>
	);
};

export default App;

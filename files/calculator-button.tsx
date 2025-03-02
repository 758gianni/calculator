import { createElement, FC } from 'react';
import { Divide, Dot, Equal, Minus, Parentheses, Percent, Plus, X } from 'lucide-react';
import clsx from 'clsx';
import { useCalculator } from '../contexts/calculator-context';

type CalculatorButtonProps = {
	label: string | typeof Divide | typeof Dot | typeof Equal | typeof Minus | typeof Parentheses | typeof Percent | typeof Plus | typeof X;
	className?: string;
};

const CalculatorButton: FC<CalculatorButtonProps> = ({ label, className }) => {
	const { equation, setEquation, equationComplete, setEquationComplete, input, setInput, bracketCount, setBracketCount } = useCalculator();
	const isIcon = typeof label !== 'string';

	// if (!isIcon) {
	// 	if (label.includes('^')) {
	// 		const [base, exponent] = label.split('^');

	// 		return (
	// 			<span>
	// 				{base}
	// 				<sup>{exponent}</sup>
	// 			</span>
	// 		);
	// 	}
	// }

	return (
		<button
			type='button'
			onClick={(e) => {
				e.preventDefault();

				if (equationComplete && input === 'Error') {
					setEquation('');
					setInput('');
					setBracketCount(0);
				}

				if (label === Equal && equationComplete) {
					return;
				}

				setEquationComplete(false);

				if (!isIcon) {
					if (label === 'C') {
						setEquation('');
						setInput('');
						setBracketCount(0);
					} else {
						if (equationComplete) {
							setEquation('');
							setInput('');
							setBracketCount(0);
						}

						setEquation((prev) => prev + label);
						setInput((prev) => prev + label);
					}
				} else {
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
							if (input === '') {
								return;
							}

							setBracketCount(0);

							try {
								const equationWithPercent = equation.replace(/(\d+)%/g, '($1/100)');
								const evaluatedEquation = eval(equationWithPercent.replace(/(\d)(\()/g, '$1 * ('));

								setEquation(evaluatedEquation);
								setEquationComplete(true);
								setInput(evaluatedEquation.toString());
							} catch {
								setEquation('');
								setEquationComplete(true);
								setInput('Error');
							}

							break;

						case Minus:
							setEquation((prev) => prev + '-');
							setInput((prev) => prev + '-');
							break;

						case Parentheses:
							setEquation((prev) => {
								let newBracketCount = bracketCount;
								let newEquation = prev;

								if (newBracketCount % 2 === 0) {
									newEquation += '(';
									newBracketCount += 1;
								} else {
									if (prev.split('(').length > prev.split(')').length) {
										newEquation += ')';
										newBracketCount -= 1;
									}
								}

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
							setEquation((prev) => prev + '%');
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
				}
			}}
			className={clsx('col-span-1 select-none cursor-pointer size-20 flex items-center justify-center text-white text-2xl bg-neutral-900 rounded-2xl border border-neutral-900 transition-all duration-400 ease-in-out hover:border-orange-600 hover:opacity-90', className)}>
			{/* {isIcon
				? createElement(label, {
						size: 24,
				  })
				: label} */}

			{/* {isIcon ? (
				createElement(label, { size: 24 })
			) : (
				<span>
					{label.split('^').map((char, index) => {
						// if (char === '') {
						return <sup key={index}>{char}</sup>;
						// }

						// return char;
					})}
				</span>
			)} */}

			{isIcon ? (
				createElement(label, { size: 24 })
			) : (
				<span>
					{label.includes('^') ? (
						<>
							{label.split('^')[0]}
							<sup>{label.split('^')[1]}</sup>
						</>
					) : (
						label
					)}
				</span>
			)}
		</button>
	);
};

export { CalculatorButton };

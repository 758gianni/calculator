import { createContext, useContext, useState, ReactNode, FC } from 'react';

interface CalculatorContextProps {
	equation: string;
	setEquation: (value: string | ((prev: string) => string)) => void;
	equationComplete: boolean;
	setEquationComplete: (value: boolean) => void;
	input: string;
	setInput: (value: string | ((prev: string) => string)) => void;
	bracketCount: number;
	setBracketCount: (value: number | ((prev: number) => number)) => void;
}

const CalculatorContext = createContext<CalculatorContextProps | undefined>(undefined);

const CalculatorProvider: FC<{ children: ReactNode }> = ({ children }) => {
	const [equation, setEquation] = useState('');
	const [equationComplete, setEquationComplete] = useState(false);
	const [input, setInput] = useState('');
	const [bracketCount, setBracketCount] = useState(0);

	return (
		<CalculatorContext.Provider
			value={{
				equation,
				setEquation,
				equationComplete,
				setEquationComplete,
				input,
				setInput,
				bracketCount,
				setBracketCount,
			}}>
			{children}
		</CalculatorContext.Provider>
	);
};

const useCalculator = () => {
	const context = useContext(CalculatorContext);

	if (!context) {
		throw new Error('useCalculator must be used within a CalculatorProvider');
	}

	return context;
};

export { CalculatorProvider, useCalculator };

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { CalculatorProvider } from './contexts/calculator-context';
import { App } from './app';
import './assets/css/global.css';

const root = document.getElementById('root');

createRoot(root!).render(
	<StrictMode>
		<CalculatorProvider>
			<App />
		</CalculatorProvider>
	</StrictMode>
);

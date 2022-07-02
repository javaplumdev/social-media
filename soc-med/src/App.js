import './App.css';

// Context
import { ContextFunction } from './context/context-config';
// Components
import LoginPage from './components/LoginPage';
import RegistrationPage from './components/RegistrationPage';
import { Routes, Route } from 'react-router-dom';

function App() {
	return (
		<ContextFunction>
			<div className="App">
				<Routes>
					<Route path="/" element={<LoginPage />} />
					<Route path="/register" element={<RegistrationPage />} />
				</Routes>
			</div>
		</ContextFunction>
	);
}

export default App;

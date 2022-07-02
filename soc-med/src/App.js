import './App.css';
import { ContextFunction } from './context/context-config';
import LoginPage from './components/LoginPage';
import RegistrationPage from './components/RegistrationPage';
import { Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import ProtectedRoute from './components/ProtectedRoute';
import { Toaster } from 'react-hot-toast';

function App() {
	return (
		<ContextFunction>
			<div className="App">
				<Toaster />
				<Routes>
					<Route path="/" element={<LoginPage />} />
					<Route path="/register" element={<RegistrationPage />} />
					<Route
						path="/home"
						element={
							<ProtectedRoute>
								{' '}
								<HomePage />
							</ProtectedRoute>
						}
					/>
				</Routes>
			</div>
		</ContextFunction>
	);
}

export default App;

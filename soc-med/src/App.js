import './App.css';
import { ContextFunction } from './context/context-config';
import LoginPage from './components/LoginPage';
import RegistrationPage from './components/RegistrationPage';
import { Routes, Route } from 'react-router-dom';
import NavbarComponent from './components/NavbarComponent';
import HomePage from './components/HomePage';
import ProtectedRoute from './components/ProtectedRoute';
import ProfilePage from './components/ProfilePage';
import SettingsComponent from './components/SettingsComponent';
import FullSuggestedFriendsComponent from './components/FullSuggestedFriendsComponent';
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
								<NavbarComponent />
								<HomePage />
							</ProtectedRoute>
						}
					/>
					<Route
						path="/profile/:id"
						element={
							<ProtectedRoute>
								<NavbarComponent />
								<ProfilePage />
							</ProtectedRoute>
						}
					/>

					<Route
						path="/settings"
						element={
							<ProtectedRoute>
								<NavbarComponent />
								<SettingsComponent />
							</ProtectedRoute>
						}
					/>

					<Route
						path="/suggested"
						element={
							<ProtectedRoute>
								<NavbarComponent />
								<FullSuggestedFriendsComponent />
							</ProtectedRoute>
						}
					/>
				</Routes>
			</div>
		</ContextFunction>
	);
}

export default App;

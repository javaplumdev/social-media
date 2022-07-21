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
import SearchResults from './components/SearchResults';
import Messages from './components/Messages';
import Chatbox from './components/Chatbox';
import Notifications from './components/Notifications';
import PostContent from './components/PostContent';
import TrendingPage from './components/TrendingPage';
import TrendingPosts from './components/TrendingPosts';
import Categories from './components/Categories';

import { Toaster } from 'react-hot-toast';
import ReactHelmet from './components/ReactHelmet';

function App() {
	// document.body.classList.add('bg-dark');

	return (
		<ContextFunction>
			<div className="App">
				<Toaster />
				<ReactHelmet />
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
					<Route
						path="/results/:results"
						element={
							<ProtectedRoute>
								<NavbarComponent />
								<SearchResults />
							</ProtectedRoute>
						}
					/>
					<Route
						path="/notifications"
						element={
							<ProtectedRoute>
								<NavbarComponent />
								<Notifications />
							</ProtectedRoute>
						}
					/>
					<Route
						path="/messages"
						element={
							<ProtectedRoute>
								<NavbarComponent />
								<Messages />
							</ProtectedRoute>
						}
					/>
					<Route
						path="/chat/:id"
						element={
							<ProtectedRoute>
								<NavbarComponent />
								<Chatbox />
							</ProtectedRoute>
						}
					/>
					<Route
						path="/post/:id"
						element={
							<ProtectedRoute>
								<NavbarComponent />
								<PostContent />
							</ProtectedRoute>
						}
					/>

					<Route
						path="/trending"
						element={
							<ProtectedRoute>
								<NavbarComponent />
								<TrendingPage />
							</ProtectedRoute>
						}
					/>

					<Route
						path="/trending/posts/:id"
						element={
							<ProtectedRoute>
								<NavbarComponent />
								<TrendingPosts />
							</ProtectedRoute>
						}
					/>

					<Route
						path="/categories"
						element={
							<ProtectedRoute>
								<NavbarComponent />
								<Categories />
							</ProtectedRoute>
						}
					/>
				</Routes>
			</div>
		</ContextFunction>
	);
}

export default App;

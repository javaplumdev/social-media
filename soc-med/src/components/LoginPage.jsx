import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { ContextVariable } from '../context/context-config';
import { useNavigate } from 'react-router-dom';
import GoogleButton from 'react-google-button';
import { async } from '@firebase/util';

const LoginPage = () => {
	const { logIn, googleSignIn } = useContext(ContextVariable);

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');

	let navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			await logIn(email, password);
			navigate('/home');
		} catch (error) {
			setError(error.message);
		}
	};

	const handleGoogleSignIn = async (e) => {
		e.preventDefault();

		try {
			await googleSignIn();
			navigate('/home');
		} catch (error) {
			console.warn(error.message);
		}
	};

	return (
		<div
			style={{ height: '100vh' }}
			className="form d-flex justify-content-center align-items-center p-2"
		>
			<div
				className="bg-white shadow d-flex justify-content-center p-3 rounded"
				style={{ width: '320px' }}
			>
				<form onSubmit={handleSubmit}>
					<h3 className="mb-3">Log in</h3>
					{error && (
						<div className="alert alert-danger" role="alert">
							{error}
						</div>
					)}
					<div className="mb-3">
						<label htmlFor="exampleInputEmail1" className="form-label">
							Email address
						</label>

						<input
							type="email"
							className="form-control"
							id="exampleInputEmail1"
							aria-describedby="emailHelp"
							onChange={(e) => setEmail(e.target.value)}
						/>
						<div id="emailHelp" className="form-text">
							We'll never share your email with anyone else.
						</div>
					</div>
					<div className="mb-3">
						<label htmlFor="exampleInputPassword1" className="form-label">
							Password
						</label>
						<input
							type="password"
							className="form-control"
							id="exampleInputPassword1"
							onChange={(e) => setPassword(e.target.value)}
						/>
					</div>

					<button type="Submit" className="btn btn-primary w-100">
						Log in
					</button>
					<hr></hr>
					<GoogleButton className="w-100" onClick={handleGoogleSignIn} />

					<div className="text-center mt-3">
						<p>
							Not a member? <Link to="/register">Sign up</Link>
						</p>
					</div>
				</form>
			</div>
		</div>
	);
};

export default LoginPage;

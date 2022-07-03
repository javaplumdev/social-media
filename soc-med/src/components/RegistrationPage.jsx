import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { ContextVariable } from '../context/context-config';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const RegistrationPage = () => {
	const { register } = useContext(ContextVariable);

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [retryPassword, setRetryPassword] = useState('');
	const [error, setError] = useState('');

	let navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
		console.log(email);
		console.log(password);
		setError('');

		if (password !== retryPassword) {
			toast.error('Passwords are mismatched');
		} else {
			try {
				await register(email, password);
				toast.success('Account created! Please log in');
				navigate('/');
			} catch (error) {
				setError(error.message);

				console.log(error);
			}
		}
	};

	return (
		<div
			style={{ height: '100vh' }}
			className="form  d-flex justify-content-center align-items-center p-2"
		>
			<div
				className="bg-white shadow d-flex justify-content-center p-3 rounded"
				style={{ width: '320px' }}
			>
				<form onSubmit={handleSubmit}>
					<h3 className="mb-3">Register</h3>
					{error && (
						<div className="alert alert-danger" role="alert">
							{error}
						</div>
					)}
					<div className="mb-3">
						<small htmlFor="exampleInputEmail1" className="form-label">
							Email address
						</small>
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
						<small htmlFor="exampleInputPassword1" className="form-label">
							Password
						</small>
						<input
							type="text"
							className="form-control mb-3"
							id="exampleInputPassword1"
							onChange={(e) => setPassword(e.target.value)}
						/>
						<small htmlFor="exampleInputPassword1" className="form-label">
							Confirm password
						</small>
						<input
							type="text"
							className="form-control "
							id="exampleInputPassword1"
							onChange={(e) => setRetryPassword(e.target.value)}
						/>
					</div>

					<button className="btn btn-primary w-100" type="Submit">
						Create account
					</button>
					<hr></hr>
					<div className="text-center mt-3">
						<p>
							Already have an account? <Link to="/">Log in</Link>
						</p>
					</div>
				</form>
			</div>
		</div>
	);
};

export default RegistrationPage;

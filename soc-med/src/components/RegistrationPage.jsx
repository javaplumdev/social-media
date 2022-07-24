import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { ContextVariable } from '../context/context-config';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const RegistrationPage = () => {
	const { register, users } = useContext(ContextVariable);

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const [username, setUsername] = useState('');

	const [retryPassword, setRetryPassword] = useState('');
	const [error, setError] = useState('');

	let navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError('');

		if (password !== retryPassword) {
			toast.error('Passwords are mismatched');
		} else {
			try {
				await register(email, password, username);
				toast.success('Account created! Please log in');
				navigate('/login');
			} catch (error) {
				setError(error.message);
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
						<small className="form-label">Email address</small>
						<input
							type="email"
							className="form-control"
							aria-describedby="emailHelp"
							onChange={(e) => setEmail(e.target.value)}
						/>
						<div id="emailHelp" className="form-text">
							We'll never share your email with anyone else.
						</div>
					</div>
					<div className="mb-3">
						<small className="form-label">Username</small>
						<input
							type="text"
							className="form-control"
							aria-describedby="emailHelp"
							onChange={(e) => setUsername(e.target.value)}
						/>
					</div>
					<hr></hr>
					<div className="mb-3">
						<small className="form-label">Password</small>
						<input
							type="text"
							className="form-control"
							onChange={(e) => setPassword(e.target.value)}
						/>
						<small className="form-label">Confirm password</small>
						<input
							type="text"
							className="form-control"
							onChange={(e) => setRetryPassword(e.target.value)}
						/>
					</div>

					<button className="buttons w-100" type="Submit">
						Create account
					</button>
					<hr></hr>
					<div className="text-center mt-3">
						<p>
							Already have an account? <Link to="/login">Log in</Link>
						</p>
					</div>
				</form>
			</div>
		</div>
	);
};

export default RegistrationPage;

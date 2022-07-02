import React from 'react';
import { Link } from 'react-router-dom';

const LoginPage = () => {
	return (
		<div
			style={{ height: '100vh' }}
			className="container d-flex justify-content-center align-items-center"
		>
			<div
				className="bg-white shadow d-flex justify-content-center p-3 rounded"
				style={{ width: '320px' }}
			>
				<form>
					<h3 className="mb-3">Log in</h3>
					<div className="mb-3">
						<label htmlFor="exampleInputEmail1" className="form-label">
							Email address
						</label>
						<input
							type="email"
							className="form-control"
							id="exampleInputEmail1"
							aria-describedby="emailHelp"
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
						/>
					</div>

					<button type="submit" className="btn btn-primary w-100">
						Log in
					</button>
					<hr></hr>
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

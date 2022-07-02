import React, { useContext } from 'react';
import { ContextVariable } from '../context/context-config';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
	const { user, logOut } = useContext(ContextVariable);
	let navigate = useNavigate();

	const handleLogOut = async () => {
		try {
			await logOut();
			navigate('/');
		} catch (error) {
			console.warn(error.message);
		}
	};

	return (
		<div>
			{user.email} <button onClick={handleLogOut}>Logout</button>
		</div>
	);
};

export default HomePage;

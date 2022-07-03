import React, { useContext } from 'react';
import { ContextVariable } from '../context/context-config';
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
	const { user } = useContext(ContextVariable);

	console.log(user);

	return <div className="grey pt-3">ProfilePage {user.email}</div>;
};

export default ProfilePage;

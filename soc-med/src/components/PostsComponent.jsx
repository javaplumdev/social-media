import React, { useContext, useState } from 'react';
import {
	BsFillChatLeftFill,
	BsFillHeartFill,
	BsFillPersonPlusFill,
} from 'react-icons/bs';
import Spinner from 'react-bootstrap/Spinner';
import { ContextVariable } from '../context/context-config';
import { NavItem } from 'react-bootstrap';

const PostsComponent = ({
	name,
	content,
	userID,
	timestamp,
	dateAndTime,
	profilePicture,
}) => {
	const { users, currentUserData } = useContext(ContextVariable);

	console.log(currentUserData);

	return (
		<div className="bg-white p-3 rounded d-flex my-3">
			<img
				src={profilePicture}
				className="me-3"
				style={{
					width: '50px',
					height: '50px',
					borderRadius: '50%',
				}}
			/>
			<div>
				<b>{name}</b>
				<br></br>
				<small className="text-secondary">{dateAndTime}</small>
				<p>{content}</p>
				<div>
					<BsFillHeartFill /> 0 <BsFillChatLeftFill /> 0
				</div>
			</div>
		</div>
	);
};

export default PostsComponent;

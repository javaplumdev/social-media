import React, { useContext, useState } from 'react';
import {
	BsFillChatLeftFill,
	BsFillHeartFill,
	BsFillPersonPlusFill,
} from 'react-icons/bs';
import Spinner from 'react-bootstrap/Spinner';
import { ContextVariable } from '../context/context-config';
import { NavItem } from 'react-bootstrap';
import CommentModal from './CommentModal';

const PostsComponent = ({
	name,
	content,
	userID,
	timestamp,
	dateAndTime,
	profilePicture,
	postID,
}) => {
	const { openComment } = useContext(ContextVariable);

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
					<BsFillHeartFill size="20" color="#bcb8b1" /> 0{' '}
					<BsFillChatLeftFill
						size="20"
						color="#bcb8b1"
						onClick={() => openComment(postID)}
					/>{' '}
					0
					<CommentModal />
				</div>
			</div>
		</div>
	);
};

export default PostsComponent;

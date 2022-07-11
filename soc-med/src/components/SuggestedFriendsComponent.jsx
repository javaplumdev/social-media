import React, { useContext, useState } from 'react';
import { BsPlus } from 'react-icons/bs';
import { ContextVariable } from '../context/context-config';
import { Link } from 'react-router-dom';

const SuggestedFriendsComponent = ({ name, profilePicture, userID }) => {
	const { suggestedFriends, user, follow } = useContext(ContextVariable);

	return (
		<>
			<div className="d-flex my-3 ">
				<Link
					to={`/profile/${userID}`}
					className="text-decoration-none text-dark"
				>
					<img
						src={profilePicture}
						className="me-3"
						style={{
							width: '50px',
							height: '50px',
							borderRadius: '50%',
							objectFit: 'cover',
						}}
					/>
				</Link>
				<div>
					<Link
						to={`/profile/${userID}`}
						className="text-decoration-none text-dark"
					>
						<small>{name}</small>
					</Link>
					<br></br>
					<div className=" rounded my-2">
						<BsPlus
							className="icons"
							onClick={() => follow(userID, name, profilePicture)}
						/>{' '}
						Follow
					</div>
				</div>
			</div>
		</>
	);
};

export default SuggestedFriendsComponent;

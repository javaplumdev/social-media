import React, { useContext, useState } from 'react';
import { BsPlus } from 'react-icons/bs';
import { ContextVariable } from '../context/context-config';

const SuggestedFriendsComponent = ({ name, profilePicture, userID }) => {
	const { suggestedFriends, user, follow } = useContext(ContextVariable);

	return (
		<>
			<div className="d-flex my-3">
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
					<small>{name}</small>
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

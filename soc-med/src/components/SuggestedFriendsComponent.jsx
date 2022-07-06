import React, { useContext, useState } from 'react';
import { BsFillPersonPlusFill } from 'react-icons/bs';
import { ContextVariable } from '../context/context-config';

const SuggestedFriendsComponent = ({ name, profilePicture }) => {
	const { suggestedFriends } = useContext(ContextVariable);

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
					{name}
					<br></br>
					<BsFillPersonPlusFill size="20" />
				</div>
			</div>
		</>
	);
};

export default SuggestedFriendsComponent;

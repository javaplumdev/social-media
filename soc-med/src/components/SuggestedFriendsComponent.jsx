import React, { useContext, useState } from 'react';
import { BsFillPersonPlusFill } from 'react-icons/bs';
import { ContextVariable } from '../context/context-config';

const SuggestedFriendsComponent = ({ loginType }) => {
	console.log(loginType);

	const { suggestedFriends } = useContext(ContextVariable);

	console.log(suggestedFriends);

	return (
		<>
			{suggestedFriends.map((item) => {
				// for email users
				if (loginType === 'email') {
					return (
						<div key={item.userID} className="d-flex">
							<img
								src={item.profilePicture}
								className="me-3"
								style={{
									width: '50px',
									height: '50px',
									borderRadius: '50%',
								}}
							/>
							<div>
								{item.firstName + ' ' + item.lastName}
								<br></br>
								<BsFillPersonPlusFill size="20" />
							</div>
						</div>
					);
				} else if (loginType === 'google') {
					return (
						<div key={item.userID} className="d-flex">
							<img
								src={item.profilePicture}
								className="me-3"
								style={{
									width: '50px',
									height: '50px',
									borderRadius: '50%',
								}}
							/>
							<div>
								{item.name}
								<br></br>
								<BsFillPersonPlusFill size="20" />
							</div>
						</div>
					);
				}
			})}
		</>
	);
};

export default SuggestedFriendsComponent;

import React, { useContext } from 'react';
import { ContextVariable } from '../context/context-config';
import SuggestedFriendsComponent from './SuggestedFriendsComponent';
import { Container } from 'react-bootstrap';

const FullSuggestedFriendsComponent = () => {
	const { suggestedFriends } = useContext(ContextVariable);

	return (
		<div className="bg-white p-3">
			<Container>
				<div className="my-3">
					<h6>Suggested friends below</h6>
					<small>All of accounts made are public</small>
				</div>
				{suggestedFriends?.length === 0 ? (
					<p>You've followed everyone already</p>
				) : (
					suggestedFriends?.map &&
					suggestedFriends.map((item) => {
						return (
							<SuggestedFriendsComponent
								key={item.userID}
								name={item.name}
								userID={item.userID}
								profilePicture={item.profilePicture}
							/>
						);
					})
				)}
			</Container>
		</div>
	);
};

export default FullSuggestedFriendsComponent;

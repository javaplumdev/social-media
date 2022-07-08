import React, { useContext } from 'react';
import { ContextVariable } from '../context/context-config';
import SuggestedFriendsComponent from './SuggestedFriendsComponent';
import { Container } from 'react-bootstrap';

const FullSuggestedFriendsComponent = () => {
	const { suggestedFriends } = useContext(ContextVariable);

	console.log(suggestedFriends);

	return (
		<div>
			<Container>
				<div className="my-3">
					<h6>Suggested friends below</h6>
					<small>All of accounts made are public</small>
				</div>
				{suggestedFriends?.map &&
					suggestedFriends.map((item) => {
						return (
							<SuggestedFriendsComponent
								key={item.userID}
								name={item.name}
								userID={item.userID}
								profilePicture={item.profilePicture}
							/>
						);
					})}
			</Container>
		</div>
	);
};

export default FullSuggestedFriendsComponent;

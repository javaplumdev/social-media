import React, { useContext } from 'react';
import { ContextVariable } from '../context/context-config';
import SuggestedFriendsComponent from './SuggestedFriendsComponent';
import { Container, Spinner } from 'react-bootstrap';

const FullSuggestedFriendsComponent = () => {
	const { suggestedFriends, isLoading } = useContext(ContextVariable);

	return (
		<div className="bg-white p-3">
			<Container>
				<div className="my-3">
					<h6>Suggested friends below</h6>
					<small>All of accounts made are public</small>
				</div>
				{isLoading ? (
					<div
						style={{ height: '30vh' }}
						className="d-flex justify-content-center align-items-center"
					>
						<Spinner animation="border" variant="success" />
					</div>
				) : suggestedFriends?.length === 0 ? (
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
								followers={item.followers}
							/>
						);
					})
				)}
			</Container>
		</div>
	);
};

export default FullSuggestedFriendsComponent;

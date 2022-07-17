import React, { useContext } from 'react';
import { ContextVariable } from '../context/context-config';
import { Container } from 'react-bootstrap';
import SuggestedFriendsComponent from './SuggestedFriendsComponent';

const SearchResults = () => {
	const { searchVar, suggestedFriends } = useContext(ContextVariable);

	const searchHolder = suggestedFriends.filter(
		(item) => item.name === searchVar
	);

	return (
		<div className="mt-3">
			<Container>
				{searchHolder.length === 0 ? (
					<h6 className="text-center p-5">No user results for "{searchVar}"</h6>
				) : (
					<>
						<h6>Results for "{searchVar}"</h6>
						{searchHolder.map((item) => {
							return (
								<SuggestedFriendsComponent
									key={item.userID}
									name={item.name}
									userID={item.userID}
									profilePicture={item.profilePicture}
								/>
							);
						})}
					</>
				)}
			</Container>
		</div>
	);
};

export default SearchResults;

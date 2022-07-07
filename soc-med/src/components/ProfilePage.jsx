import React, { useContext } from 'react';
import { ContextVariable } from '../context/context-config';
import { Container } from 'react-bootstrap';
import { BsPersonFill } from 'react-icons/bs';
import { BsFillChatLeftFill, BsFillHeartFill } from 'react-icons/bs';
import PostsComponent from './PostsComponent';

const ProfilePage = () => {
	const { user, feedData, currentUserData } = useContext(ContextVariable);

	const userData = Array.isArray(feedData)
		? feedData.filter((item) => item.userID === user.uid)
		: [];

	console.log(currentUserData);

	return (
		<div className="grey pt-3 ">
			<Container>
				{currentUserData?.map &&
					currentUserData.map((item) => {
						return (
							<div
								key={item.userID}
								className="d-flex mt-5 bg-white p-3 rounded "
							>
								<img
									src={item.profilePicture}
									className="me-3"
									style={{
										width: '100px',
										height: '100px',
										borderRadius: '50%',
									}}
								/>
								<div className="mx-3">
									<h3>{item.name}</h3>
									{item.followers.length} followers {item.following.length}{' '}
									following
									<p className="mt-2">
										{userData.length}
										{userData.length === 1 || userData.length === 0
											? ' post found'
											: ' posts found'}{' '}
									</p>
								</div>
							</div>
						);
					})}

				<div className="mt-2" style={{ maxWidth: '720px' }}>
					<b>Your posts</b>
					{feedData?.map &&
						feedData.map((item) => {
							if (item.userID === user.uid) {
								return (
									<PostsComponent
										key={item.postID}
										userID={item.userID}
										name={item.name}
										content={item.content}
										timestamp={item.timestamp}
										dateAndTime={item.dateAndTime}
										profilePicture={item.profilePicture}
										postID={item.postID}
										likes={item.likes}
										image={item.image}
									/>
								);
							}
						})}
				</div>
			</Container>
		</div>
	);
};

export default ProfilePage;

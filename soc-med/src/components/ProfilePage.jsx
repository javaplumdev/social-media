import React, { useContext } from 'react';
import { ContextVariable } from '../context/context-config';
import { Container } from 'react-bootstrap';
import { BsPersonFill } from 'react-icons/bs';
import { BsFillChatLeftFill, BsFillHeartFill } from 'react-icons/bs';
import PostsComponent from './PostsComponent';
import FollowingModal from './FollowingModal';
import FollowersModal from './FollowersModal';
import { useParams } from 'react-router-dom';

const ProfilePage = () => {
	const {
		user,
		feedData,
		currentUserData,
		checkFollowing,
		checkFollowers,
		users,
	} = useContext(ContextVariable);

	const { id } = useParams();

	const userData = Array.isArray(feedData)
		? feedData.filter((item) => item.userID === id)
		: [];

	const profileData =
		users?.filter && users.filter((item) => item.userID === id);

	console.log(userData);

	return (
		<div className="grey pt-3 ">
			<Container>
				{profileData?.map &&
					profileData.map((item) => {
						return (
							<div
								key={item.userID}
								className="d-flex mt-5 bg-white p-3 rounded "
							>
								<img
									src={item.profilePicture}
									className="me-3"
									style={{
										width: '75px',
										height: '75px',
										borderRadius: '50%',
									}}
								/>
								<div className="mx-3">
									<h3>{item.name}</h3>
									<div className="d-flex flex-wrap mb-3">
										<small
											className="followLink me-3"
											onClick={() => checkFollowers()}
										>
											{' '}
											<b>{item.followers.length}</b> followers
										</small>{' '}
										<small
											className="followLink"
											onClick={() => checkFollowing()}
										>
											{' '}
											<b>{item.following.length}</b> following
										</small>
										<FollowersModal followers={item.followers} />
										<FollowingModal following={item.following} />
									</div>
									<p>
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
							if (item.userID === id) {
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

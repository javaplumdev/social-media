import React, { useContext } from 'react';
import { ContextVariable } from '../context/context-config';
import { Container } from 'react-bootstrap';
import { BsPersonFill } from 'react-icons/bs';
import { BsFillChatLeftFill, BsFillHeartFill } from 'react-icons/bs';

const ProfilePage = () => {
	const { user, feedData } = useContext(ContextVariable);

	console.log(feedData);

	const userData = Array.isArray(feedData)
		? feedData.filter((item) => item.userID === user.uid)
		: [];

	return (
		<div className="grey pt-3 ">
			<Container>
				<div className="d-flex mt-5 bg-white p-3 rounded justify-content-center">
					<img src={user.photoURL} className="rounded-circle" />
					<div className="mx-3">
						<h3>{user.displayName}</h3>
						<BsPersonFill size="20" /> 0 Friends
					</div>
				</div>
				<div className="mt-2">
					<b>Your posts</b>
					{userData.map((item) => {
						return (
							<div key={item.postID} className="bg-white rounded p-3 mt-3 ">
								<div className="d-flex">
									<img
										src={user.photoURL}
										className="me-3"
										style={{
											width: '50px',
											height: '50px',
											borderRadius: '50%',
										}}
									/>
									<div>
										<div>
											<b>{item.name}</b>
											<p className="text-secondary">{item.content}</p>
										</div>
										<div>
											{' '}
											<small>
												{' '}
												<BsFillHeartFill
													size="20"
													className="mx-2 text-secondary"
												/>{' '}
												0 Likes
											</small>
											<small>
												{' '}
												<BsFillChatLeftFill
													size="20"
													className="mx-2 text-secondary"
												/>{' '}
												0 Comments
											</small>
										</div>
									</div>
								</div>
							</div>
						);
					})}
				</div>
			</Container>
		</div>
	);
};

export default ProfilePage;

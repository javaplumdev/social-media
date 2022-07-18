import React, { useContext } from 'react';
import { Container } from 'react-bootstrap';
import { ContextVariable } from '../context/context-config';

const Notifications = () => {
	const { notificationsData, user, users } = useContext(ContextVariable);

	const yourNotification =
		notificationsData?.filter &&
		notificationsData.filter((item) => item.userWhoPosts === user.uid);

	console.log(yourNotification);

	return (
		<Container className="d-flex justify-content-center mt-3 bg-white p-3">
			{yourNotification?.length === 0 ? (
				<p>You don't have notifications</p>
			) : (
				<>
					{yourNotification?.map &&
						yourNotification.map((item) => {
							return (
								<div>
									{users?.map &&
										users.map((data) => {
											if (data.userID === item.userWhoLikes) {
												if (item.type === 'like') {
													return (
														<div key={item.notificationID} className="d-flex ">
															<img
																src={data.profilePicture}
																className="me-2"
																style={{
																	width: '50px',
																	height: '50px',
																	borderRadius: '50%',
																	objectFit: 'cover',
																}}
															/>
															<p>{data.name} hearts your post</p>
														</div>
													);
												} else if (item.type === 'commnet') {
													return (
														<div key={item.notificationID}>
															<img
																src={data.profilePicture}
																className="me-2"
																style={{
																	width: '50px',
																	height: '50px',
																	borderRadius: '50%',
																	objectFit: 'cover',
																}}
															/>
															<p>{data.name} comments on your post</p>
														</div>
													);
												} else if (item.type === 'follow') {
													<div key={item.notificationID} className="d-flex">
														<img
															src={data.profilePicture}
															className="me-2"
															style={{
																width: '50px',
																height: '50px',
																borderRadius: '50%',
																objectFit: 'cover',
															}}
														/>
														<p>{data.name} followed you</p>
													</div>;
												}
											}
										})}
								</div>
							);
						})}
				</>
			)}
		</Container>
	);
};

export default Notifications;

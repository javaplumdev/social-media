import React, { useContext } from 'react';
import { Container } from 'react-bootstrap';
import { ContextVariable } from '../context/context-config';
import { Link } from 'react-router-dom';

const Notifications = () => {
	const { notificationsData, user, users } = useContext(ContextVariable);

	const yourNotification =
		notificationsData?.filter &&
		notificationsData.filter((item) => item.userWhoPosts === user.uid);

	console.log(yourNotification);

	return (
		<div className="container bg-white">
			{yourNotification?.length === 0 ? (
				<h6 className="text-center p-5">You don't have notifications</h6>
			) : (
				<div className="py-3">
					<h6>Notifications</h6>
					{yourNotification?.map &&
						yourNotification.map((item) => {
							return (
								<div key={item.notificationID}>
									{users?.map &&
										users.map((data) => {
											if (data.userID === item.userWhoLikes) {
												if (item.type === 'like') {
													return (
														<Link
															to={`/post/${item.postID}`}
															key={item.notificationID}
															className="followstyle d-flex justify-content-between p-3 text-decoration-none text-dark"
														>
															<div className="d-flex">
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

																<div className="d-flex flex-column">
																	{data.name} heart on your post
																	<small className="text-secondary">
																		{item.dateAndTime}
																	</small>
																</div>
															</div>
														</Link>
													);
												} else if (item.type === 'comment') {
													return (
														<Link
															to={`/post/${item.postID}`}
															key={item.notificationID}
															className="followstyle d-flex justify-content-between p-3 text-decoration-none text-dark"
														>
															<div className="d-flex">
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

																<div className="d-flex flex-column">
																	{data.name} comment on your post
																	<small className="text-secondary">
																		{item.dateAndTime}
																	</small>
																</div>
															</div>
														</Link>
													);
												} else if (item.type === 'follow') {
													return (
														<Link
															to={`/profile/${item.userWhoLikes}`}
															key={item.notificationID}
															className="followstyle d-flex justify-content-between p-3 text-decoration-none text-dark"
														>
															<div className="d-flex">
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

																<div className="d-flex flex-column">
																	{data.name} followed you
																	<small className="text-secondary">
																		{item.dateAndTime}
																	</small>
																</div>
															</div>
														</Link>
													);
												}
											}
										})}
								</div>
							);
						})}
				</div>
			)}
		</div>
	);
};

export default Notifications;

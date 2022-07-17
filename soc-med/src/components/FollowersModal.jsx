import React, { useContext } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { ContextVariable } from '../context/context-config';
import { Link } from 'react-router-dom';
import { IoIosRemoveCircle } from 'react-icons/io';

const FollowersModal = ({ followers, userID }) => {
	const {
		showModalVer1,
		handleCloseFollowersModal,
		user,
		users,
		removeFollowers,
	} = useContext(ContextVariable);

	return (
		<Modal show={showModalVer1} onHide={handleCloseFollowersModal}>
			<Modal.Header closeButton>
				<Modal.Title>Followers</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				{followers.length === 0 ? (
					<p className="text-center">
						{user.uid === userID
							? "You don't have followers."
							: "Don't have followers."}
					</p>
				) : (
					<div
						style={{
							overflow: 'scroll',
							overflowX: 'hidden',
							height: '250px',
						}}
					>
						{followers.map((item) => {
							return (
								<div key={item.userID}>
									{users.map((data) => {
										if (userID === user.uid && data.userID === item.userID) {
											return (
												<div key={data.userID}>
													<div className="followstyle  ">
														<div className="d-flex justify-content-between p-1">
															<Link
																to={`/profile/${data.userID}`}
																className="text-decoration-none text-dark"
															>
																<img
																	src={data.profilePicture}
																	className="me-3"
																	style={{
																		width: '50px',
																		height: '50px',
																		borderRadius: '50%',
																		objectFit: 'cover',
																	}}
																/>
															</Link>

															<button
																className="followButton"
																onClick={() => removeFollowers(data.userID)}
															>
																<IoIosRemoveCircle />
															</button>
														</div>

														<p className="overflowWrap">{data.name}</p>
													</div>
												</div>
											);
										} else if (userID !== user.uid) {
											if (data.userID === item.userID) {
												return (
													<div
														key={data.userID}
														className="followstyle d-flex mb-3 justify-content-between p-2"
													>
														<Link
															to={`/profile/${data.userID}`}
															className="text-decoration-none text-dark"
														>
															<div className=" d-flex w-100 ">
																<img
																	src={data.profilePicture}
																	className="me-3"
																	style={{
																		width: '50px',
																		height: '50px',
																		borderRadius: '50%',
																		objectFit: 'cover',
																	}}
																/>

																<p>{data.name}</p>
															</div>
														</Link>
													</div>
												);
											}
										}
									})}
								</div>
							);
						})}
					</div>
				)}
			</Modal.Body>
			<Modal.Footer>
				<Button variant="secondary" onClick={handleCloseFollowersModal}>
					Close
				</Button>
			</Modal.Footer>
		</Modal>
	);
};

export default FollowersModal;

import React, { useContext } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { ContextVariable } from '../context/context-config';
import { Link } from 'react-router-dom';

const FollowersModal = ({ followers, userID }) => {
	const { showModalVer1, handleCloseFollowersModal, user } =
		useContext(ContextVariable);

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
					followers.map((item) => {
						if (userID === user.uid) {
							return (
								<div
									key={item.userID}
									className="followstyle d-flex mb-3 justify-content-between p-2"
								>
									<Link
										to={`/profile/${item.userID}`}
										className="text-decoration-none text-dark"
									>
										<div className=" d-flex w-100 ">
											<img
												src={item.profilePicture}
												className="me-3"
												style={{
													width: '50px',
													height: '50px',
													borderRadius: '50%',
													objectFit: 'cover',
												}}
											/>

											<p>{item.userName}</p>
										</div>
									</Link>

									<button className="followButton">
										<small>Unfollow</small>
									</button>
								</div>
							);
						} else {
							return (
								<div
									key={item.userID}
									className="followstyle d-flex mb-3 justify-content-between p-2"
								>
									<Link
										to={`/profile/${item.userID}`}
										className="text-decoration-none text-dark"
									>
										<div className=" d-flex w-100 ">
											<img
												src={item.profilePicture}
												className="me-3"
												style={{
													width: '50px',
													height: '50px',
													borderRadius: '50%',
													objectFit: 'cover',
												}}
											/>

											<p>{item.userName}</p>
										</div>
									</Link>
								</div>
							);
						}
					})
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

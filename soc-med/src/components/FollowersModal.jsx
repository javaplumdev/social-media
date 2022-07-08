import React, { useContext } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { ContextVariable } from '../context/context-config';

const FollowersModal = ({ followers }) => {
	const { showModalVer1, handleCloseFollowersModal } =
		useContext(ContextVariable);

	console.log(followers);

	return (
		<Modal show={showModalVer1} onHide={handleCloseFollowersModal}>
			<Modal.Header closeButton>
				<Modal.Title>Followers</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				{followers.length === 0 ? (
					<p className="text-center">You don't have any followers</p>
				) : (
					followers.map((item) => {
						return (
							<div
								key={item.userID}
								className="d-flex my-3 justify-content-between"
							>
								<div className="d-flex">
									<img
										src={item.profilePicture}
										className="me-3"
										style={{
											width: '50px',
											height: '50px',
											borderRadius: '50%',
										}}
									/>

									<p>{item.userName}</p>
								</div>

								<button className="followButton">
									<small>Unfollow</small>
								</button>
							</div>
						);
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

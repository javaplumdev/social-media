import React, { useContext } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { ContextVariable } from '../context/context-config';

const FollowingModal = ({ following }) => {
	const { showModal, handleCloseFollowingModal } = useContext(ContextVariable);

	return (
		<Modal show={showModal} onHide={handleCloseFollowingModal}>
			<Modal.Header closeButton>
				<Modal.Title>Following</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				{following.length === 0 ? (
					<p className="text-center">You haven't follow anyone yet.</p>
				) : (
					following.map((item) => {
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
											objectFit: 'cover',
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
				<Button variant="secondary" onClick={handleCloseFollowingModal}>
					Close
				</Button>
			</Modal.Footer>
		</Modal>
	);
};

export default FollowingModal;

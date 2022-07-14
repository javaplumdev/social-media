import React, { useContext } from 'react';
import { ContextVariable } from '../context/context-config';
import { Modal, Button } from 'react-bootstrap';
import { v4 as uuidv4 } from 'uuid';
import { IoSend } from 'react-icons/io5';

const PickToMessageModal = () => {
	const {
		showModalVer2,
		handleCloseToMessage,
		currentUserData,
		pickRecipient,
		messagesData,
	} = useContext(ContextVariable);

	const followingToMessage =
		currentUserData?.map && currentUserData.map((item) => item.following)[0];

	const chatBoxID = uuidv4();

	return (
		<Modal show={showModalVer2} onHide={handleCloseToMessage}>
			<Modal.Header closeButton>
				<Modal.Title>Send message</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				{followingToMessage?.map &&
					followingToMessage.map((item) => {
						return (
							<div
								key={item.userID}
								className="d-flex my-3 justify-content-between"
							>
								<div className="d-flex">
									<img
										src={item.profilePicture}
										className="me-2"
										style={{
											width: '50px',
											height: '50px',
											borderRadius: '50%',
											objectFit: 'cover',
										}}
									/>

									<div>
										<small>{item.userName}</small>
									</div>
								</div>

								<button
									className="buttons w-100"
									style={{ maxWidth: '50px' }}
									onClick={() => pickRecipient(chatBoxID, item.userID)}
								>
									<IoSend />
								</button>
							</div>
						);
					})}
			</Modal.Body>
			<Modal.Footer>
				<Button variant="outlined" onClick={handleCloseToMessage}>
					Close
				</Button>
			</Modal.Footer>
		</Modal>
	);
};

export default PickToMessageModal;
import React, { useContext } from 'react';
import { ContextVariable } from '../context/context-config';
import { Modal, Button } from 'react-bootstrap';
import { v4 as uuidv4 } from 'uuid';

const PickToMessageModal = () => {
	const {
		showModalVer2,
		handleCloseToMessage,
		currentUserData,
		pickRecipient,
	} = useContext(ContextVariable);

	// const followingToMessage =
	// 	currentUserData?.map && currentUserData.map((item) => item.following)[0];

	// const chatBoxID = uuidv4();

	// console.log(followingToMessage);

	return (
		<Modal show={showModalVer2} onHide={handleCloseToMessage}>
			<Modal.Header closeButton>
				<Modal.Title>Send message</Modal.Title>
			</Modal.Header>
			<Modal.Body></Modal.Body>
			<Modal.Footer>
				<Button variant="outlined" onClick={handleCloseToMessage}>
					Close
				</Button>
			</Modal.Footer>
		</Modal>
	);
};

export default PickToMessageModal;

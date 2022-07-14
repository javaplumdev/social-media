import React from 'react';
import { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { ContextVariable } from '../context/context-config';
import { Container, InputGroup, Form, Button } from 'react-bootstrap';

const Chatbox = () => {
	const { id } = useParams();
	const { messagesData } = useContext(ContextVariable);

	const filteredMessagesData =
		messagesData?.filter &&
		messagesData.filter((item) => item.chatBoxID === id);

	console.log(filteredMessagesData);

	return (
		<Container className="chatBox">
			<div className="sendMsgButton">
				<InputGroup>
					<Form.Control
						placeholder="Recipient's username"
						aria-label="Recipient's username"
						aria-describedby="basic-addon2"
					/>
					<Button variant="outline-secondary" id="button-addon2">
						Send
					</Button>
				</InputGroup>
			</div>
		</Container>
	);
};

export default Chatbox;

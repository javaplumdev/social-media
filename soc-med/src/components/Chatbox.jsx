import React from 'react';
import { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { ContextVariable } from '../context/context-config';
import { Container, InputGroup, Form, Button } from 'react-bootstrap';
import { IoSend } from 'react-icons/io5';

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
					<button className="buttons w-75" style={{ maxWidth: '60px' }}>
						<IoSend />
					</button>
				</InputGroup>
			</div>
		</Container>
	);
};

export default Chatbox;

import React from 'react';
import { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { ContextVariable } from '../context/context-config';
import { Container, InputGroup, Form, Button } from 'react-bootstrap';
import { IoSend } from 'react-icons/io5';

const Chatbox = () => {
	const { id } = useParams();
	const {
		messagesData,
		users,
		sendMessage,
		setMessagesHolder,
		messagesHolder,
		user,
	} = useContext(ContextVariable);

	const filteredMessagesData =
		messagesData?.filter &&
		messagesData.filter((item) => item.chatBoxID === id);

	const recipientID =
		filteredMessagesData?.find &&
		filteredMessagesData.find((item) => item.recipientID).recipientID;

	const messages =
		filteredMessagesData?.find &&
		filteredMessagesData.find((item) => item.messages).messages;

	const sender =
		filteredMessagesData?.filter &&
		filteredMessagesData.filter((item) => item.sender !== user.uid);

	console.log(sender);

	const senderID = sender?.map && sender.map((item) => item.sender)[0];

	const senderToDisplay =
		users?.filter && users.filter((item) => item.userID === senderID);

	return (
		<Container className="chatBox">
			<div className="bg-white p-2">
				{filteredMessagesData?.map &&
					filteredMessagesData.map((item) => {
						if (item.sender !== user.uid) {
							return (
								<div className="d-flex my-2">
									{users.map((data) => {
										if (data.userID === item.sender) {
											return (
												<div key={item.userID} className='className="d-flex"'>
													<img
														src={data.profilePicture}
														className="me-2"
														style={{
															width: '40px',
															height: '40px',
															borderRadius: '50%',
															objectFit: 'cover',
														}}
													/>

													<small className="overflowWrap">{data.name}</small>
												</div>
											);
										}
									})}
								</div>
							);
						}
					})}
			</div>

			<div className="sendMsgButton">
				<div>
					{messages?.map &&
						messages.map((item) => {
							if (item.sender === user.uid) {
								return (
									<div className="d-flex justify-content-end">
										<p>{item.message}</p>
									</div>
								);
							} else {
								return (
									<div className="d-flex my-2">
										{users.map((data) => {
											if (data.userID === item.sender) {
												return (
													<img
														src={data.profilePicture}
														className="me-2"
														style={{
															width: '40px',
															height: '40px',
															borderRadius: '50%',
															objectFit: 'cover',
														}}
													/>
												);
											}
										})}

										<p>{item.message}</p>
									</div>
								);
							}
						})}
				</div>
				<InputGroup>
					<Form.Control
						placeholder="Recipient's username"
						aria-label="Recipient's username"
						aria-describedby="basic-addon2"
						value={messagesHolder}
						onChange={(e) => setMessagesHolder(e.target.value)}
					/>
					<button
						className="buttons w-75"
						style={{ maxWidth: '60px' }}
						onClick={() => sendMessage(id, recipientID)}
					>
						<IoSend />
					</button>
				</InputGroup>
			</div>
		</Container>
	);
};

export default Chatbox;

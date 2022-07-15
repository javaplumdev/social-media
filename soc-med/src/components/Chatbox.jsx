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

	console.log(filteredMessagesData);

	const recipientID =
		filteredMessagesData?.find &&
		filteredMessagesData?.find((item) => item.recipientID).recipientID;

	const messages =
		filteredMessagesData?.find &&
		filteredMessagesData.find((item) => item.messages).messages;

	const sender =
		messages?.filter && messages.filter((item) => item.sender !== user.uid);

	const senderID = sender?.map && sender.map((item) => item.sender)[0];

	const senderToDisplay =
		users?.filter && users.filter((item) => item.userID === senderID);

	return (
		<Container className="chatBox">
			<div
				className="sendMsgButton"
				style={{
					height: '100%',
				}}
			>
				<div
					className="userdetails bg-white p-2 w-100"
					style={{ borderBottom: '.5px solid #caccc9' }}
				>
					{senderToDisplay?.map &&
						senderToDisplay.map((item) => {
							return (
								<div key={item.userID} className="d-flex ">
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

									<div>
										<small className="overflowWrap">{item.name}</small>
									</div>
								</div>
							);
						})}
				</div>

				<div
					className="bg-white"
					style={{
						overflow: 'scroll',
						overflowX: 'hidden',
						height: '90%',
					}}
				>
					{messages?.map &&
						messages.map((item) => {
							if (item.sender === user.uid) {
								return (
									<>
										<div
											key={item.messageID}
											className=" d-flex justify-content-end m-3"
										>
											<small className="reciptpient">{item.message}</small>
										</div>
									</>
								);
							} else {
								return (
									<div className="d-flex my-2 p-2">
										{senderToDisplay.map((item) => {
											return (
												<img
													src={item.profilePicture}
													className="me-2"
													style={{
														width: '40px',
														height: '40px',
														borderRadius: '50%',
														objectFit: 'cover',
													}}
												/>
											);
										})}
										<small key={item.messageID} className="senderBg ">
											{item.message}
										</small>
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

import React, { useContext, useState } from 'react';
import { Container } from 'react-bootstrap';
import { BsFillPlusCircleFill } from 'react-icons/bs';
import { ContextVariable } from '../context/context-config';
import PickToMessageModal from './PickToMessageModal';
import { Link } from 'react-router-dom';

const Messages = () => {
	const { addMessages, messagesData, users, user } =
		useContext(ContextVariable);

	const userMessages =
		messagesData?.filter &&
		messagesData.filter(
			(item) => item.sender === user.uid || item.recipientID === user.uid
		);

	const senderID =
		userMessages?.find && userMessages.find((item) => item.sender).sender;
	const recipientID =
		userMessages?.find &&
		userMessages.find((item) => item.recipientID).recipientID;

	return (
		<div className="mt-3">
			<Container>
				<div className="d-flex justify-content-end">
					<BsFillPlusCircleFill
						className="icons"
						size="40"
						onClick={() => addMessages()}
					/>
					<PickToMessageModal />
				</div>
				<div className="mt-2">
					{userMessages?.map &&
						userMessages.map((item) => (
							<div key={item.chatBoxID}>
								{senderID === user.uid ? (
									<div className="div">
										{users.map((data) => {
											if (data.userID === recipientID) {
												return (
													<Link
														to={`/chat/${item.chatBoxID}`}
														className="text-decoration-none text-dark"
													>
														<div className="p-3 rounded d-flex">
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
												);
											}
										})}
									</div>
								) : (
									<div className="div">
										{users.map((data) => {
											if (data.userID === senderID) {
												return (
													<Link
														to={`/chat/${item.chatBoxID}`}
														className="text-decoration-none text-dark"
													>
														<div className="p-3 rounded d-flex">
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
												);
											}
										})}
									</div>
								)}
							</div>
						))}
				</div>
			</Container>
		</div>
	);
};

export default Messages;

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

	console.log(userMessages);

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

						userMessages.map((item) => {
							if (item.sender === user.uid) {
								return (
									<div className="div d-flex" key={item.chatBoxID}>
										{users.map((data) => {
											if (item.recipientID === data.userID) {
												return (
													<Link
														key={data.userID}
														to={`/chat/${item.chatBoxID}`}
														className="p-3 w-100 text-decoration-none text-dark d-flex"
													>

						userMessages.map((item) => (
							<div key={item.chatBoxID}>
								<div className="div">
									{users.map((data) => {
										if (data.userID === item.sender) {
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

														<div>
															<p>
																{data.name} <br></br>
																<small className="text-secondary">
																	{
																		item.messages[item.messages.length - 1]
																			.message
																	}
																</small>
															</p>
														</div>
													</Link>
												);
											}
										})}
									</div>
								);
							} else {
								return (
									<div className="div d-flex" key={item.chatBoxID}>
										{users.map((data) => {
											if (item.sender === data.userID) {
												return (
													<Link
														key={data.userID}
														to={`/chat/${item.chatBoxID}`}
														className="p-3 w-100 text-decoration-none text-dark d-flex"
													>
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
														<div>
															<p>
																{data.name} <br></br>
																<small className="text-secondary">
																	{
																		item.messages[item.messages.length - 1]
																			.message
																	}
																</small>
															</p>
														</div>
													</Link>
												);
											}
										})}
									</div>
								);
							}
						})}

														<p>{data.name}</p>
													</div>
												</Link>
											);
										}
									})}
								</div>
							</div>
						))}

				</div>
			</Container>
		</div>
	);
};

export default Messages;

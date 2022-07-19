import React, { useContext, useState } from 'react';
import { Container } from 'react-bootstrap';
import { BsFillPlusCircleFill } from 'react-icons/bs';
import { ContextVariable } from '../context/context-config';
import PickToMessageModal from './PickToMessageModal';
import { Link } from 'react-router-dom';

const Messages = () => {
	const { addMessages, messagesData, users, user, openChatBox } =
		useContext(ContextVariable);

	const userMessages =
		messagesData?.filter &&
		messagesData.filter(
			(item) => item.sender === user.uid || item.recipientID === user.uid
		);

	return (
		<div className="mt-3">
			<Container className=" bg-white p-3">
				<div className="d-flex justify-content-between">
					<h6>Messages</h6>

					<BsFillPlusCircleFill
						className="icons"
						size="40"
						onClick={() => addMessages()}
					/>
					<PickToMessageModal />
				</div>

				<div className="mt-2">
					{userMessages?.length === 0 ? (
						<p>You don't have messages</p>
					) : (
						userMessages?.map &&
						userMessages.map((item) => {
							if (item.sender === user.uid) {
								{
									return users.map((data) => {
										if (data.userID === item.recipientID) {
											return (
												<div
													key={data.userID}
													className="followstyle div p-2 w-100 text-decoration-none text-dark d-flex"
													onClick={() => openChatBox(item.chatBoxID)}
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
														{data.name} <br></br>
														<div
															style={{
																maxWidth: '220px',
															}}
														>
															{item.messages[item.messages.length - 1]
																.sender === user.uid ? (
																<small className=" text-secondary">
																	You:{' '}
																	{item.messages[
																		item.messages.length - 1
																	].message?.slice(0, 20)}
																	...
																</small>
															) : (
																<small className=" text-secondary">
																	{item.messages[
																		item.messages.length - 1
																	].message?.slice(0, 20)}
																</small>
															)}
														</div>
													</div>
												</div>
											);
										}
									});
								}
							} else if (item.recipientID === user.uid) {
								{
									return users.map((data) => {
										if (data.userID === item.sender) {
											return (
												<div
													key={data.userID}
													className="followstyle div p-2 w-100 text-decoration-none text-dark d-flex"
													onClick={() => openChatBox(item.chatBoxID)}
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
														{data.name} <br></br>
														<div
															style={{
																maxWidth: '220px',
															}}
														>
															{item.messages[item.messages.length - 1]
																.sender === user.uid ? (
																<small className=" text-secondary">
																	You:{' '}
																	{item.messages[
																		item.messages.length - 1
																	].message?.slice(0, 20)}
																	...
																</small>
															) : (
																<small className=" text-secondary">
																	{item.messages[
																		item.messages.length - 1
																	].message?.slice(0, 20)}
																</small>
															)}
														</div>
													</div>
												</div>
											);
										}
									});
								}
							}
						})
					)}
				</div>
			</Container>
		</div>
	);
};

export default Messages;

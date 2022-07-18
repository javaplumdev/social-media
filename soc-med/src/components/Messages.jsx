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
												<Link
													key={data.userID}
													to={`/chat/${item.chatBoxID}`}
													className="div p-2 w-100 text-decoration-none text-dark d-flex"
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
																	].message?.message.slice(0, 20)}
																</small>
															)}
														</div>
													</div>
												</Link>
											);
										}
									});
								}
							} else if (item.recipientID === user.uid) {
								{
									return users.map((data) => {
										if (data.userID === item.sender) {
											return (
												<Link
													key={data.userID}
													to={`/chat/${item.chatBoxID}`}
													className="div p-2 w-100 text-decoration-none text-dark d-flex"
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
																	].message.message?.slice(0, 20)}
																</small>
															)}
														</div>
													</div>
												</Link>
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

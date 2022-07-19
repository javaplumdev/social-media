import React, { useContext, useState } from 'react';
import { Form, Dropdown, Container, InputGroup } from 'react-bootstrap';
import { ContextVariable } from '../context/context-config';
import { v4 as uuidv4 } from 'uuid';
import {
	BsFillChatLeftFill,
	BsFillHeartFill,
	BsThreeDots,
	BsTrashFill,
	BsExclamationCircleFill,
} from 'react-icons/bs';

import { useParams, Link } from 'react-router-dom';

const PostContent = () => {
	const { id } = useParams();
	const {
		feedData,
		comment,
		setCommentValue,
		commentValue,
		commentData,
		user,
		deleteComment,
		reportComment,
		like,
	} = useContext(ContextVariable);

	const userPost =
		feedData?.filter && feedData.filter((item) => item.postID === id);

	const commentID = uuidv4();

	const filteredComments =
		commentData?.filter && commentData.filter((item) => item.postID === id);

	const userWhoPost = userPost?.map && userPost.map((item) => item.userID)[0];

	const CustomToggle = React.forwardRef(({ onClick }, ref) => (
		<a
			href=""
			ref={ref}
			onClick={(e) => {
				e.preventDefault();
				onClick(e);
			}}
		>
			{<BsThreeDots className="icons me-3" id="dropdown" />}
		</a>
	));

	const likes = userPost?.map && userPost.map((item) => item.likes)[0];

	const isLike = likes?.find && likes.find((item) => item.user === user.uid);

	var Filter = require('bad-words'),
		filter = new Filter();

	filter.addWords('tite', 'puke', 'kantutan', 'otin');
	filter.removeWords('fuck', 'sex');

	return (
		<Container className="bg-white mt-3 py-3" style={{ maxWidth: '560px' }}>
			{userPost?.map &&
				userPost.map((item) => {
					return (
						<div key={item.postID}>
							<div>
								<div className="d-flex mb-3">
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
										<b>{item.name}</b>
										<br></br>
										<small className="text-secondary">{item.dateAndTime}</small>
									</div>
								</div>

								<div>
									<small className="overflowWrap mt-3">
										{item.content && filter.clean(item.content)}
										{item.image && (
											<img
												src={item.image}
												className="w-100 my-3"
												style={{ height: 'auto', objectFit: 'cover' }}
											/>
										)}
									</small>
									{/* Comments */}
									<div>
										<div>
											<div className="my-1">
												<BsFillHeartFill
													size="20"
													color={isLike ? '#77b255' : '#bcb8b1'}
													className="icons me-2"
													onClick={() => like(id, user.uid)}
												/>{' '}
												{likes.length}{' '}
												<BsFillChatLeftFill size="20" className="icons mx-2" />{' '}
												{filteredComments.length}
											</div>
											<InputGroup className="my-3">
												<Form.Control
													placeholder="Comment"
													aria-label="Recipient's username"
													aria-describedby="basic-addon2"
													value={commentValue}
													onChange={(e) => setCommentValue(e.target.value)}
												/>
												<button
													className="buttons px-3"
													onClick={() => comment(commentID, id, userWhoPost)}
												>
													<BsFillChatLeftFill />
												</button>
											</InputGroup>
											<small
												className={
													commentValue.length > 50
														? `text-danger m-3`
														: 'text-dark m-3'
												}
											>
												{commentValue.length} / 50
											</small>
										</div>
										<b className="mt-3">
											{filteredComments.length === 0 ||
											filteredComments.length === 1
												? `Comment ${filteredComments.length}`
												: `Comments ${filteredComments.length}`}
										</b>
										{filteredComments.length === 0 ? (
											<p className=" mt-3">No comment</p>
										) : (
											<div
											// style={{
											// 	overflow: 'scroll',
											// 	overflowX: 'hidden',
											// 	height: '560px',
											// }}
											>
												{filteredComments?.map &&
													filteredComments.map((data) => {
														return (
															<div key={data.commentID} className="my-3 d-flex">
																{data.userID === user.uid ? (
																	<div className=" w-100">
																		<div className="d-flex justify-content-between">
																			<div className="d-flex">
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
																					<small>{data.name}</small>
																					<br></br>
																					<small className="text-secondary">
																						{item.dateAndTime}
																					</small>
																				</div>
																			</div>
																			<Dropdown>
																				<Dropdown.Toggle
																					as={CustomToggle}
																					variant="success"
																				>
																					Open Menu
																				</Dropdown.Toggle>
																				<Dropdown.Menu>
																					<Dropdown.Item
																						onClick={() =>
																							reportComment(data.commentID)
																						}
																					>
																						<BsExclamationCircleFill /> Report
																					</Dropdown.Item>
																					{data.userID === user.uid && (
																						<Dropdown.Item
																							onClick={() =>
																								deleteComment(data.commentID)
																							}
																						>
																							<BsTrashFill /> Delete
																						</Dropdown.Item>
																					)}
																				</Dropdown.Menu>
																			</Dropdown>
																		</div>
																		<small className="overflowWrap mt-3">
																			{data.comment &&
																				filter.clean(data.comment)}
																		</small>
																	</div>
																) : (
																	<div className=" w-100">
																		<div className="d-flex justify-content-between">
																			<div className="d-flex">
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
																					<small>{data.name}</small>
																					<br></br>
																					<small className="text-secondary">
																						{item.dateAndTime}
																					</small>
																				</div>
																			</div>
																			<Dropdown>
																				<Dropdown.Toggle
																					as={CustomToggle}
																					variant="success"
																				>
																					Open Menu
																				</Dropdown.Toggle>
																				<Dropdown.Menu>
																					<Dropdown.Item
																						onClick={() =>
																							reportComment(data.commentID)
																						}
																					>
																						<BsExclamationCircleFill /> Report
																					</Dropdown.Item>
																				</Dropdown.Menu>
																			</Dropdown>
																		</div>
																		<small className="overflowWrap">
																			{data.comment &&
																				filter.clean(data.comment)}
																		</small>
																	</div>
																)}
															</div>
														);
													})}
											</div>
										)}
									</div>
								</div>
							</div>
						</div>
					);
				})}
		</Container>
	);
};

export default PostContent;

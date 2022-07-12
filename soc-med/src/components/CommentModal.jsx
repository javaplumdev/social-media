import React, { useContext, useState } from 'react';
import { Button, Modal, Form, Dropdown } from 'react-bootstrap';
import { ContextVariable } from '../context/context-config';
import { v4 as uuidv4 } from 'uuid';
import {
	BsThreeDots,
	BsTrashFill,
	BsExclamationCircleFill,
} from 'react-icons/bs';

const CommentModal = () => {
	const {
		show,
		handleClose,
		feedPostID,
		feedData,
		comment,
		setCommentValue,
		commentValue,
		commentData,
		user,
		deleteComment,
		reportComment,
	} = useContext(ContextVariable);

	const commentID = uuidv4();
	const filteredPost =
		feedData?.filter && feedData.filter((item) => item.postID === feedPostID);

	const filteredComments =
		commentData?.filter &&
		commentData.filter((item) => item.postID === feedPostID);

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

	return (
		<>
			{filteredPost?.map &&
				filteredPost.map((item) => {
					return (
						<Modal
							key={item.postID}
							show={show}
							onHide={handleClose}
							data-backdrop="false"
							className="modal-background"
						>
							<Modal.Body>
								<div className="d-flex ">
									<img
										src={item.profilePicture}
										className="me-3"
										style={{
											width: '60px',
											height: '50px',
											borderRadius: '50%',
											objectFit: 'cover',
										}}
									/>
									<div className="w-100 ">
										<b>{item.name}</b>
										<br></br>
										<small className="text-secondary">{item.dateAndTime}</small>
										<p>{item.content}</p>

										{/* Comments */}
										<div>
											<b>
												{filteredComments.length === 0 ||
												filteredComments.length === 1
													? `Comment ${filteredComments.length}`
													: `Comments ${filteredComments.length}`}
											</b>
											{filteredComments.length === 0 ? (
												<p className=" mt-3">No comment</p>
											) : (
												<div
													style={{
														overflow: 'scroll',
														overflowX: 'hidden',
														height: '220px',
													}}
												>
													{filteredComments?.map &&
														filteredComments.map((data) => {
															return (
																<div
																	key={data.commentID}
																	className="my-1 d-flex"
																>
																	{data.userID === user.uid ? (
																		<div className="d-flex justify-content-between w-100">
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
																					<p>{data.comment}</p>
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
																	) : (
																		<>
																			<div className="d-flex justify-content-between w-100">
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
																						<p>{data.comment}</p>
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
																		</>
																	)}
																</div>
															);
														})}
												</div>
											)}
										</div>
									</div>
								</div>
							</Modal.Body>
							<Modal.Footer>
								<Form.Control
									placeholder="What's on your mind?"
									aria-label="Recipient's username"
									aria-describedby="basic-addon2"
									value={commentValue}
									onChange={(e) => setCommentValue(e.target.value)}
								/>

								<Button variant="secondary" onClick={handleClose}>
									Close
								</Button>
								<button
									className="buttons"
									onClick={() => comment(commentID, feedPostID)}
								>
									Comment
								</button>
							</Modal.Footer>
						</Modal>
					);
				})}
		</>
	);
};

export default CommentModal;

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

	var Filter = require('bad-words'),
		filter = new Filter();

	filter.addWords('tite', 'puke', 'kantutan', 'otin');
	filter.removeWords('fuck', 'sex');

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
								<div>
									<div className="d-flex">
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
											<small className="text-secondary">
												{item.dateAndTime}
											</small>
										</div>
									</div>

									<div>
										<small className="overflowWrap">
											{filter.clean(item.content)}
										</small>
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
																	className="my-3 d-flex"
																>
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
																			<small className="overflowWrap">
																				{filter.clean(data.comment)}
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
																				{filter.clean(data.comment)}
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
							</Modal.Body>
							<Modal.Footer>
								<Form.Control
									placeholder="What's on your mind?"
									aria-label="Recipient's username"
									aria-describedby="basic-addon2"
									value={commentValue}
									onChange={(e) => setCommentValue(e.target.value)}
								/>
								<small
									className={
										commentValue.length > 50
											? `text-danger me-3`
											: 'text-dark me-3'
									}
								>
									{commentValue.length} / 50
								</small>
								<Button variant="outlined-secondary" onClick={handleClose}>
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

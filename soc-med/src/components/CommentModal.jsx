import React, { useContext, useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import { ContextVariable } from '../context/context-config';
import { v4 as uuidv4 } from 'uuid';

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
	} = useContext(ContextVariable);

	const commentID = uuidv4();
	const filteredPost =
		feedData?.filter && feedData.filter((item) => item.postID === feedPostID);

	const filteredComments =
		commentData?.filter &&
		commentData.filter((item) => item.postID === feedPostID);

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
											width: '50px',
											height: '50px',
											borderRadius: '50%',
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
																	<img
																		src={data.profilePicture}
																		className="me-3"
																		style={{
																			width: '50px',
																			height: '50px',
																			borderRadius: '50%',
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

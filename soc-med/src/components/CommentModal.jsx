import React, { useContext, useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import { ContextVariable } from '../context/context-config';

const CommentModal = () => {
	const { show, handleClose, feedPostID, feedData } =
		useContext(ContextVariable);

	const filteredPost =
		feedData?.filter && feedData.filter((item) => item.postID === feedPostID);

	console.log(filteredPost);

	return (
		<>
			{filteredPost?.map &&
				filteredPost.map((item) => {
					return (
						<Modal
							show={show}
							onHide={handleClose}
							data-backdrop="false"
							className="modal-background"
						>
							<Modal.Body>
								<div className="d-flex">
									<img
										src={item.profilePicture}
										className="me-3"
										style={{
											width: '50px',
											height: '50px',
											borderRadius: '50%',
										}}
									/>
									<div>
										<b>{item.name}</b>
										<br></br>
										<small className="text-secondary">{item.dateAndTime}</small>
										<p>{item.content}</p>

										<div>
											<b>Comments</b>
										</div>
									</div>
								</div>
							</Modal.Body>
							<Modal.Footer>
								<Form.Control
									placeholder="What's on your mind?"
									aria-label="Recipient's username"
									aria-describedby="basic-addon2"
								/>

								<Button variant="secondary" onClick={handleClose}>
									Close
								</Button>
								<Button variant="primary">Comment</Button>
							</Modal.Footer>
						</Modal>
					);
				})}
		</>
	);
};

export default CommentModal;

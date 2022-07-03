import React, { useContext, useState } from 'react';
import { Row, Container, Col, FloatingLabel, Form } from 'react-bootstrap';
import { ContextVariable } from '../context/context-config';
import { v4 as uuidv4 } from 'uuid';
import { BsFillChatLeftFill, BsFillHeartFill } from 'react-icons/bs';
import Spinner from 'react-bootstrap/Spinner';

const HomePage = () => {
	const { postContent, feedData, user, isLoading } =
		useContext(ContextVariable);

	const [content, setContent] = useState('');

	const postID = uuidv4();

	console.log(user);

	const RightCol = () => {
		return (
			<div className="bg-white p-3 rounded">
				<h6>What's trending?</h6>
			</div>
		);
	};

	return (
		<div className="grey pt-4">
			<Container>
				<Row>
					<Col>
						<RightCol />
					</Col>
					<Col xs={6}>
						<div>
							<FloatingLabel
								controlId="floatingTextarea2"
								label="What's on your mind?"
								onChange={(e) => setContent(e.target.value)}
							>
								<Form.Control
									as="textarea"
									placeholder="Leave a comment here"
									style={{ height: '100px', resize: 'none' }}
								/>
							</FloatingLabel>
							<div className="d-flex justify-content-end">
								<button
									className="buttons mt-3"
									onClick={() => postContent(content, postID)}
								>
									Post
								</button>
							</div>
						</div>
						<div className="mt-2">
							<b>What's happening today?</b>

							{isLoading ? (
								<Spinner
									animation="border"
									role="status"
									style={{ height: '100vh' }}
								>
									<span className="visually-hidden">Loading...</span>
								</Spinner>
							) : (
								feedData?.map &&
								feedData.map((item) => {
									return (
										<div
											key={item.postID}
											className="bg-white rounded p-3 mt-3 "
										>
											<div className="d-flex">
												<img
													src={user.photoURL}
													className="me-3"
													style={{
														width: '50px',
														height: '50px',
														borderRadius: '50%',
													}}
												/>
												<div>
													<div>
														<b>{item.name}</b>
														<p className="text-secondary">{item.content}</p>
													</div>
													<div>
														{' '}
														<small>
															{' '}
															<BsFillHeartFill
																size="20"
																className="mx-2 text-secondary"
															/>{' '}
															0 Likes
														</small>
														<small>
															{' '}
															<BsFillChatLeftFill
																size="20"
																className="mx-2 text-secondary"
															/>{' '}
															0 Comments
														</small>
													</div>
												</div>
											</div>
										</div>
									);
								})
							)}
						</div>
					</Col>
					<Col>3 of 3</Col>
				</Row>
			</Container>
		</div>
	);
};

export default HomePage;

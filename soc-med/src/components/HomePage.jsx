import React, { useContext, useState } from 'react';
import { Row, Container, Col, FloatingLabel, Form } from 'react-bootstrap';
import { ContextVariable } from '../context/context-config';
import { v4 as uuidv4 } from 'uuid';

import SuggestedFriendsComponent from './SuggestedFriendsComponent';
import PostsComponent from './PostsComponent';

const HomePage = () => {
	const { postContent, feedData, isLoading, suggestedFriends } =
		useContext(ContextVariable);

	const [content, setContent] = useState('');
	const postID = uuidv4();

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
							{feedData?.map &&
								feedData.map((item) => {
									return (
										<PostsComponent key={item.postID} content={item.content} />
									);
								})}
						</div>
					</Col>
					<Col>
						<div className="bg-white rounded p-3">
							<h6 className="mb-3">Suggested friends</h6>
							{suggestedFriends?.map &&
								suggestedFriends.map((item) => {
									return (
										<SuggestedFriendsComponent
											key={item.userID}
											loginType={item.loginType}
										/>
									);
								})}
						</div>
					</Col>
				</Row>
			</Container>
		</div>
	);
};

export default HomePage;
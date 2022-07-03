import React, { useContext, useState } from 'react';
import { Row, Container, Col, FloatingLabel, Form } from 'react-bootstrap';
import { ContextVariable } from '../context/context-config';
import { v4 as uuidv4 } from 'uuid';

const HomePage = () => {
	const { postContent, feedData } = useContext(ContextVariable);

	const [content, setContent] = useState('');

	const postID = uuidv4();

	console.log(feedData);

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
								label="Comments"
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
										<div
											key={item.postID}
											className="bg-white rounded p-3 mt-3"
										>
											<p>{item.name}</p>
											<p>{item.content}</p>
										</div>
									);
								})}
						</div>
					</Col>
					<Col>3 of 3</Col>
				</Row>
			</Container>
		</div>
	);
};

export default HomePage;

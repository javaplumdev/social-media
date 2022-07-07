import React, { useContext, useState } from 'react';
import { Row, Container, Col, FloatingLabel, Form } from 'react-bootstrap';
import { ContextVariable } from '../context/context-config';
import { v4 as uuidv4 } from 'uuid';
import { BsUpload, BsImage } from 'react-icons/bs';
import SuggestedFriendsComponent from './SuggestedFriendsComponent';
import PostsComponent from './PostsComponent';

const HomePage = () => {
	const {
		postContent,
		feedData,
		suggestedFriends,
		setContent,
		content,
		commentData,
		imageData,
		setImageData,
	} = useContext(ContextVariable);

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
							<Form.Control
								placeholder="What's on your mind?"
								aria-label="Recipient's username"
								aria-describedby="basic-addon2"
								style={{ height: '75px' }}
								value={content}
								onChange={(e) => setContent(e.target.value)}
							/>

							<div className="d-flex justify-content-between align-items-center">
								<label htmlFor="file-input" className="my-3">
									<BsImage size="20" className="icons me-2" />
									{imageData && imageData.name}
								</label>

								<input
									id="file-input"
									type="file"
									className="d-none"
									onChange={(e) => setImageData(e.target.files[0])}
								/>

								<button
									className="buttons mt-3"
									onClick={() => postContent(postID)}
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
										<PostsComponent
											key={item.postID}
											userID={item.userID}
											name={item.name}
											content={item.content}
											timestamp={item.timestamp}
											dateAndTime={item.dateAndTime}
											profilePicture={item.profilePicture}
											postID={item.postID}
											likes={item.likes}
											image={item.image}
										/>
									);
								})}
							<p
								className="mt-3 text-center pt-3"
								style={{ borderTop: '1px solid #bcb8b1' }}
							>
								End of feed
							</p>
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
											name={item.name}
											profilePicture={item.profilePicture}
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

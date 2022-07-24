import React, { useContext, useState } from 'react';
import {
	Row,
	Container,
	Col,
	FloatingLabel,
	Form,
	InputGroup,
	Spinner,
} from 'react-bootstrap';
import { ContextVariable } from '../context/context-config';
import { v4 as uuidv4 } from 'uuid';
import { BsUpload, BsImage, BsSearch } from 'react-icons/bs';
import SuggestedFriendsComponent from './SuggestedFriendsComponent';
import TrendingPage from './TrendingPage';
import PostsComponent from './PostsComponent';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { GrClose } from 'react-icons/gr';
import { toast } from 'react-hot-toast';

const HomePage = () => {
	const {
		postContent,
		feedData,
		search,
		suggestedFriends,
		setContent,
		content,
		imageData,
		setImageData,
		setSearchVar,
		categoryData,
		showPost,
		handleClosePost,
		handleShowPost,
		category,
		isLoading,
		setCategory,
	} = useContext(ContextVariable);

	const postID = uuidv4();

	const RightCol = () => {
		return (
			<div className="bg-white p-3 rounded">
				<h6>Categories</h6>
				{isLoading ? (
					<div
						style={{ height: 'auto' }}
						className="d-flex justify-content-center align-items-center"
					>
						<Spinner animation="border" variant="success" />
					</div>
				) : (
					<div>
						{categoryData?.slice(0, 3).map((item) => {
							return (
								<TrendingPage key={item.id} id={item.id} name={item.name} />
							);
						})}
						<Link to="/categories" className="text-dark">
							<p className="text-center ">
								<b>See all</b>
							</p>
						</Link>
					</div>
				)}
			</div>
		);
	};

	const addCategory = (categoryID, categoryName) => {
		const findCategory =
			category?.find && category.find((item) => item.id === categoryID);

		if (findCategory) {
			toast.error(`You've already choose ${findCategory.name}`);
		} else {
			if (category.length === 3) {
				toast.error('3 categories only');
			} else {
				setCategory((prevState) => {
					return [...prevState, { id: categoryID, name: categoryName }];
				});
			}
		}
	};

	const removeCategory = (categoryID) => {
		const filtered = category.filter((element) => element.id !== categoryID);

		setCategory(filtered);
	};

	return (
		<div className="grey pt-4">
			<Container>
				<Row>
					<Col className="d-none d-md-block">
						<RightCol />
					</Col>
					<Col xs={12} md={6}>
						<div>
							<div className="w-100 d-block d-md-none my-2">
								<InputGroup>
									<Form.Control
										placeholder="Search"
										onChange={(e) => setSearchVar(e.target.value)}
									/>

									<div className="buttons" onClick={() => search()}>
										<BsSearch />
									</div>
								</InputGroup>
							</div>

							<div className="d-flex justify-content-between align-items-center my-2">
								<div
									className="outline-buttons w-100 p-3"
									onClick={handleShowPost}
								>
									<h6>What do you think?</h6>
								</div>
								<Modal
									show={showPost}
									onHide={handleClosePost}
									backdrop="static"
									keyboard={false}
								>
									<Modal.Header closeButton>
										<Modal.Title>Post</Modal.Title>
									</Modal.Header>
									<Modal.Body>
										<div>
											<div className="d-flex flex-column">
												<Form.Control
													placeholder="What's on your mind?"
													aria-label="Recipient's username"
													aria-describedby="basic-addon2"
													style={{ height: '75px' }}
													value={content}
													onChange={(e) => setContent(e.target.value)}
												/>
												<small
													className={
														content.length > 200
															? `text-danger mt-3`
															: 'text-dark mt-3'
													}
												>
													{content.length} / 200
												</small>

												<label htmlFor="file-input">
													<BsImage size="20" className="icons me-2" />
												</label>

												<input
													id="file-input"
													type="file"
													className="d-none"
													onChange={(e) => setImageData(e.target.files[0])}
												/>

												<small>{imageData && imageData.name}</small>
											</div>

											<small>Choose a category: </small>
											<div className="d-flex flex-wrap my-1">
												{category?.map &&
													category.map((item) => {
														return (
															<small
																key={item.id}
																className="category-btn-remove m-1 rounded"
																style={{
																	padding: '2px 10px',
																}}
																onClick={() =>
																	removeCategory(item.id, item.name)
																}
															>
																{item.name}
																<GrClose size="10" className="mx-1" />
															</small>
														);
													})}
											</div>
										</div>
										<hr></hr>
										<div className="d-flex flex-wrap my-1">
											{categoryData?.map &&
												categoryData.map((item) => {
													return (
														<small
															key={item.id}
															className="category-btn m-1 rounded"
															style={{
																padding: '2px 10px',
															}}
															onClick={() => addCategory(item.id, item.name)}
														>
															{item.name}
														</small>
													);
												})}
										</div>
									</Modal.Body>
									<Modal.Footer>
										<Button variant="light" onClick={handleClosePost}>
											Close
										</Button>
										<button
											className="buttons"
											onClick={() => postContent(postID, category)}
										>
											Post
										</button>
									</Modal.Footer>
								</Modal>
							</div>
						</div>
						<div className="mt-2">
							<b>What's happening today?</b>
							<br></br>
							<small>All posts are public.</small>
							{isLoading ? (
								<div
									style={{ height: '30vh' }}
									className="d-flex justify-content-center align-items-center"
								>
									<Spinner animation="border" variant="success" />
								</div>
							) : (
								feedData?.map &&
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
											category={item.category}
										/>
									);
								})
							)}

							<hr></hr>
							<p className="text-center">End of feed</p>
						</div>
					</Col>
					<Col className="d-none d-md-block">
						<div className="bg-white rounded p-3">
							<h6 className="mb-3">Suggested friends</h6>
							{suggestedFriends?.length === 0 && (
								<p>You've followed everyone</p>
							)}
							{isLoading ? (
								<div
									style={{ height: '30vh' }}
									className="d-flex justify-content-center align-items-center"
								>
									<Spinner animation="border" variant="success" />
								</div>
							) : (
								<div>
									{suggestedFriends?.map &&
										suggestedFriends.slice(0, 3).map((item) => {
											return (
												<SuggestedFriendsComponent
													key={item.userID}
													name={item.name}
													userID={item.userID}
													profilePicture={item.profilePicture}
													followers={item.followers}
												/>
											);
										})}

									<hr></hr>
									<Link to="/suggested" className="text-dark">
										<p className="text-center">
											<b>See all</b>
										</p>
									</Link>
								</div>
							)}
						</div>
					</Col>
				</Row>
			</Container>
		</div>
	);
};

export default HomePage;

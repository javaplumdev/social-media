import React, { useContext, useState } from 'react';
import {
	BsFillChatLeftFill,
	BsFillHeartFill,
	BsUpload,
	BsThreeDots,
	BsTrashFill,
	BsExclamationCircleFill,
} from 'react-icons/bs';
import Spinner from 'react-bootstrap/Spinner';
import { ContextVariable } from '../context/context-config';
import { Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ReadMore from './ReadMore';

const PostsComponent = ({
	name,
	content,
	dateAndTime,
	profilePicture,
	postID,
	likes,
	image,
	userID,
}) => {
	const { openComment, commentData, user, like, deletePost, reportPost } =
		useContext(ContextVariable);

	const filteredComments =
		commentData?.filter && commentData.filter((item) => item.postID === postID);

	console.log(filteredComments);

	const isLike = likes?.find && likes.find((item) => item.user === user.uid);

	const CustomToggle = React.forwardRef(({ onClick }, ref) => (
		<a
			href=""
			ref={ref}
			onClick={(e) => {
				e.preventDefault();
				onClick(e);
			}}
		>
			{<BsThreeDots className="icons" id="dropdown" />}
		</a>
	));

	// For profanity words
	var Filter = require('bad-words'),
		filter = new Filter();

	filter.addWords('tite', 'puke', 'kantutan', 'otin');
	filter.removeWords('fuck', 'sex');

	return (
		<>
			{image === undefined ? (
				<div className="bg-white p-3 rounded  my-3 w-100">
					<div className="d-flex">
						<div className="w-100">
							<div className="d-flex justify-content-between">
								<div className="d-flex">
									<img
										src={profilePicture}
										className="me-3"
										style={{
											width: '50px',
											height: '50px',
											borderRadius: '50%',
											objectFit: 'cover',
										}}
									/>

									<div>
										<Link
											to={`/profile/${userID}`}
											className="text-decoration-none text-black"
										>
											<small className="overflowWrap">
												<b>{name}</b>
											</small>
										</Link>
										<br></br>
										<small className="text-secondary">{dateAndTime}</small>
									</div>
								</div>

								<Dropdown>
									<Dropdown.Toggle as={CustomToggle} variant="success">
										Open Menu
									</Dropdown.Toggle>
									<Dropdown.Menu>
										<Dropdown.Item onClick={() => reportPost(postID)}>
											<BsExclamationCircleFill /> Report
										</Dropdown.Item>
										{userID === user.uid && (
											<Dropdown.Item onClick={() => deletePost(postID)}>
												<BsTrashFill /> Delete
											</Dropdown.Item>
										)}
									</Dropdown.Menu>
								</Dropdown>
							</div>
						</div>
					</div>

					<ReadMore className="overflowWrap">{filter.clean(content)}</ReadMore>

					<div>
						<BsFillHeartFill
							size="20"
							color={isLike ? '#77b255' : '#bcb8b1'}
							className="icons me-2"
							onClick={() => like(postID, userID)}
						/>{' '}
						{likes?.length}{' '}
						<Link to={`/post/${postID}`} className="text-decoration-none">
							<BsFillChatLeftFill
								size="20"
								className="icons mx-2"
								// onClick={() => openComment(postID)}
							/>{' '}
						</Link>
						{filteredComments?.length}
					</div>
				</div>
			) : (
				<div className="bg-white p-3 rounded  my-3 w-100">
					<div className="d-flex">
						<div className="w-100">
							<div className="d-flex justify-content-between">
								<div className="d-flex">
									<div>
										<img
											src={profilePicture}
											className="me-3"
											style={{
												width: '50px',
												height: '50px',
												borderRadius: '50%',
												objectFit: 'cover',
											}}
										/>
									</div>
									<div>
										<Link
											to={`/profile/${userID}`}
											className="text-decoration-none text-black"
										>
											<small>
												<b>{name}</b>
											</small>
										</Link>

										<br></br>
										<small className="text-secondary">{dateAndTime}</small>
									</div>
								</div>
								<Dropdown>
									<Dropdown.Toggle as={CustomToggle} variant="success">
										Open Menu
									</Dropdown.Toggle>
									<Dropdown.Menu>
										<Dropdown.Item onClick={() => reportPost(postID)}>
											<BsExclamationCircleFill /> Report
										</Dropdown.Item>
										{userID === user.uid && (
											<Dropdown.Item onClick={() => deletePost(postID)}>
												<BsTrashFill /> Delete
											</Dropdown.Item>
										)}
									</Dropdown.Menu>
								</Dropdown>
							</div>
						</div>
					</div>
					<ReadMore className="overflowWrap">
						{content && filter.clean(content)}
					</ReadMore>
					<img className="mb-3" src={image} style={{ width: '100%' }} />
					<div>
						<BsFillHeartFill
							size="20"
							color={isLike ? '#77b255' : '#bcb8b1'}
							className="icons me-2"
							onClick={() => like(postID, userID)}
						/>{' '}
						{likes.length}{' '}
						<Link to={`/post/${postID}`} className="text-decoration-none">
							<BsFillChatLeftFill
								size="20"
								className="icons mx-2"
								// onClick={() => openComment(postID)}
							/>{' '}
						</Link>
						{filteredComments.length}
					</div>
				</div>
			)}
		</>
	);
};

export default PostsComponent;

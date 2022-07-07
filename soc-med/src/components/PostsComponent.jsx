import React, { useContext, useState } from 'react';
import { BsFillChatLeftFill, BsFillHeartFill, BsUpload } from 'react-icons/bs';
import Spinner from 'react-bootstrap/Spinner';
import { ContextVariable } from '../context/context-config';
import { NavItem } from 'react-bootstrap';
import CommentModal from './CommentModal';

const PostsComponent = ({
	name,
	content,
	dateAndTime,
	profilePicture,
	postID,
	likes,
	image,
}) => {
	const { openComment, commentData, user, like } = useContext(ContextVariable);

	const filteredComments =
		commentData?.filter && commentData.filter((item) => item.postID === postID);

	const isLike = likes?.find && likes.find((item) => item.user === user.uid);

	return (
		<>
			{image === undefined ? (
				<div className="bg-white p-3 rounded d-flex my-3">
					<img
						src={profilePicture}
						className="me-3"
						style={{
							width: '50px',
							height: '50px',
							borderRadius: '50%',
						}}
					/>
					<div>
						<b>{name}</b>
						<br></br>
						<small className="text-secondary">{dateAndTime}</small>
						<p>{content}</p>
						<div>
							<BsFillHeartFill
								size="20"
								color={isLike ? '#fb8500' : '#bcb8b1'}
								className="icons me-2"
								onClick={() => like(postID)}
							/>{' '}
							{likes.length}{' '}
							<BsFillChatLeftFill
								size="20"
								className="icons mx-2"
								onClick={() => openComment(postID)}
							/>{' '}
							{filteredComments.length}
							<CommentModal />
						</div>
					</div>
				</div>
			) : (
				<div className="bg-white p-3 rounded  my-3">
					<div className="d-flex">
						<img
							src={profilePicture}
							className="me-3"
							style={{
								width: '50px',
								height: '50px',
								borderRadius: '50%',
							}}
						/>
						<div>
							<b>{name}</b>
							<br></br>
							<small className="text-secondary">{dateAndTime}</small>
							<p>{content}</p>
						</div>
					</div>
					<img className="mb-3" src={image} style={{ width: '100%' }} />
					<div>
						<BsFillHeartFill
							size="20"
							color={isLike ? '#fb8500' : '#bcb8b1'}
							className="icons me-2"
							onClick={() => like(postID)}
						/>{' '}
						{likes.length}{' '}
						<BsFillChatLeftFill
							size="20"
							className="icons mx-2"
							onClick={() => openComment(postID)}
						/>{' '}
						{filteredComments.length}
						<CommentModal />
					</div>
				</div>
			)}
		</>
	);
};

export default PostsComponent;

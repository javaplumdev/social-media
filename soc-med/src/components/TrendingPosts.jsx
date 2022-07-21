import React, { useContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ContextVariable } from '../context/context-config';
import { Container } from 'react-bootstrap';
import PostsComponent from './PostsComponent';

const TrendingPosts = () => {
	const { id } = useParams();
	const { feedData, categoryData } = useContext(ContextVariable);

	return (
		<Container>
			<h3 className="mt-3">
				Results for:{' '}
				{categoryData?.find && categoryData.find((item) => item.id === id).name}
			</h3>
			{feedData?.map &&
				feedData.map((item) => {
					return item.category?.map((data) => {
						if (data.id === id) {
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
									mainCategory={data.id}
								/>
							);
						}
					});
				})}
		</Container>
	);
};

export default TrendingPosts;

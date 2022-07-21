import React, { useContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ContextVariable } from '../context/context-config';
import { Container } from 'react-bootstrap';
import PostsComponent from './PostsComponent';

const TrendingPosts = () => {
	const { id } = useParams();
	const { feedData, categoryData } = useContext(ContextVariable);

	let trendArr = [];

	return (
		<Container>
			<div style={{ maxWidth: '720px' }}>
				{feedData?.map &&
					feedData.map((item) => {
						return item.category?.map((data) => {
							if (data.id === id) {
								trendArr.push(item);
							}
						});
					})}
				<p className="mt-3 bg-white p-3 rounded">
					{trendArr.length === 0
						? `No result for ${
								categoryData?.find &&
								categoryData.find((item) => item.id === id).name
						  } `
						: `${trendArr.length} ${
								trendArr.length === 1 ? 'result' : 'results'
						  } for ${
								categoryData?.find &&
								categoryData.find((item) => item.id === id).name
						  }`}
				</p>
				{feedData?.map &&
					feedData.map((item) => {
						return item.category?.map((data) => {
							if (data.id === id) {
								return (
									<div key={item.postID}>
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
									</div>
								);
							}
						});
					})}
			</div>
		</Container>
	);
};

export default TrendingPosts;

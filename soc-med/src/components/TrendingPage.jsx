import React, { useState, useContext } from 'react';
import { ContextVariable } from '../context/context-config';
import { Link } from 'react-router-dom';

const TrendingPage = ({ id, name }) => {
	const { feedData } = useContext(ContextVariable);

	let trendArr = [];

	return (
		<div className="followstyle p-1">
			{feedData?.map &&
				feedData.map((item) => {
					return item.category?.map((data) => {
						if (data.id === id) {
							trendArr.push(item);
						}
					});
				})}
			<Link
				to={`/trending/posts/${id}`}
				className="text-decoration-none text-dark"
			>
				<p>
					{name} <br></br>
					{trendArr.length === 0 || trendArr.length === 1
						? `${trendArr.length} post`
						: `${trendArr.length} posts`}
				</p>
			</Link>
		</div>
	);
};

export default TrendingPage;

import React, { useState, useContext } from 'react';
import { ContextVariable } from '../context/context-config';
import { Link } from 'react-router-dom';

const TrendingPage = ({ id, name }) => {
	return (
		<div>
			<Link to={`/trending/posts/${id}`}>
				<p>{name}</p>
			</Link>
		</div>
	);
};

export default TrendingPage;

import React, { useContext } from 'react';
import { Container } from 'react-bootstrap';
import { ContextVariable } from '../context/context-config';
import TrendingPage from './TrendingPage';

const Categories = () => {
	const { categoryData } = useContext(ContextVariable);

	return (
		<Container className="mt-3">
			<div className="followstyle bg-white p-3">
				<h6 className="py-2">Categories</h6>
				{categoryData?.map((item) => {
					return <TrendingPage key={item.id} id={item.id} name={item.name} />;
				})}
			</div>
		</Container>
	);
};

export default Categories;

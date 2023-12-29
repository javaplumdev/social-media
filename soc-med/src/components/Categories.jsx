import React, { useContext } from 'react';
import { Container, Spinner } from 'react-bootstrap';
import { ContextVariable } from '../context/context-config';
import TrendingPage from './TrendingPage';

console.log('this is a sample log');

console.log('this is a ssample log');

const Categories = () => {
	const { categoryData, isLoading } = useContext(ContextVariable);

	return (
		<Container className="mt-3">
			<div className="followstyle bg-white p-3">
				<h6 className="py-2">Categories</h6>
				{isLoading ? (
					<div
						style={{ height: '30vh' }}
						className="d-flex justify-content-center align-items-center"
					>
						<Spinner animation="border" variant="success" />
					</div>
				) : (
					categoryData?.map((item) => {
						return <TrendingPage key={item.id} id={item.id} name={item.name} />;
					})
				)}
			</div>
		</Container>
	);
};

export default Categories;

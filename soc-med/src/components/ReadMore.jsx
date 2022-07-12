import React, { useState } from 'react';

const ReadMore = ({ children }) => {
	const text = children;
	const [isReadMore, setIsReadMore] = useState(true);
	const toggleReadMore = () => {
		setIsReadMore(!isReadMore);
	};

	return (
		<p className="text">
			{isReadMore ? text.slice(0, 200) : text}

			{text.length >= 100 && (
				<small onClick={toggleReadMore} className="read-or-hide">
					{isReadMore ? '...read more' : ' show less'}
				</small>
			)}
		</p>
	);
};

export default ReadMore;
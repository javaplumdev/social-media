import React from 'react';
import { Container } from 'react-bootstrap';
import { BsFillPlusCircleFill } from 'react-icons/bs';

const Messages = () => {
	return (
		<div className="mt-5">
			<Container>
				<div className="d-flex justify-content-end">
					<BsFillPlusCircleFill className="icons" size="30" />
				</div>
			</Container>
		</div>
	);
};

export default Messages;

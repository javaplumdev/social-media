import React, { useContext, useState } from 'react';
import {
	BsFillChatLeftFill,
	BsFillHeartFill,
	BsFillPersonPlusFill,
} from 'react-icons/bs';
import Spinner from 'react-bootstrap/Spinner';
import { ContextVariable } from '../context/context-config';

const PostsComponent = ({ content }) => {
	const { feedData } = useContext(ContextVariable);

	console.log(feedData);

	return <div>PostsComponent</div>;
};

export default PostsComponent;

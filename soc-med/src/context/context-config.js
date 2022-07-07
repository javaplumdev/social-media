import {
	createUserWithEmailAndPassword,
	onAuthStateChanged,
	signInWithEmailAndPassword,
	signOut,
	GoogleAuthProvider,
	signInWithPopup,
} from 'firebase/auth';
import {
	setDoc,
	doc,
	onSnapshot,
	collection,
	query,
	serverTimestamp,
	orderBy,
	Timestamp,
	arrayUnion,
	updateDoc,
	arrayRemove,
} from 'firebase/firestore';
import { firebaseAuth, db } from '../firebase/firebase-config';
import { createContext, useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';

export const ContextVariable = createContext();

export const ContextFunction = ({ children }) => {
	const [user, setUser] = useState({});
	const [feedData, setFeedData] = useState({});
	const [users, setUsers] = useState({});
	const [isLoading, setIsLoading] = useState(true);
	const [content, setContent] = useState('');
	const [show, setShow] = useState(false);
	const [feedPostID, setFeedPostID] = useState('');
	const [commentData, setCommentData] = useState({});
	const [commentValue, setCommentValue] = useState('');

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	let currentUserData;
	let logInType;
	let suggestedFriends;

	let dateToday = new Date().toLocaleDateString();

	var date = new Date();
	var hours = date.getHours();
	var minutes = date.getMinutes();
	// Check whether AM or PM
	var newformat = hours >= 12 ? 'PM' : 'AM';
	// Find current hour in AM-PM Format
	hours = hours % 12;
	// To display "0" as "12"
	hours = hours ? hours : 12;
	minutes = minutes < 10 ? '0' + minutes : minutes;

	useEffect(() => {
		const queryData = query(
			collection(db, 'posts'),
			orderBy('timestamp', 'desc')
		);

		onSnapshot(queryData, (querySnapshot) => {
			setFeedData(
				querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
			);
		});

		const queryComments = query(
			collection(db, 'comments'),
			orderBy('timestamp', 'asc')
		);

		onSnapshot(queryComments, (querySnapshot) => {
			setCommentData(
				querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
			);
		});

		onSnapshot(collection(db, 'users'), (snapshot) => {
			setUsers(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
		});

		setIsLoading(false);
	}, []);

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(firebaseAuth, (currentUser) => {
			setUser(currentUser);
		});

		return () => {
			unsubscribe();
		};
	}, []);

	if (user) {
		currentUserData =
			users?.filter && users.filter((item) => item.userID === user.uid);

		logInType =
			currentUserData?.map && currentUserData.map((item) => item.loginType)[0];

		suggestedFriends =
			users?.filter && users.filter((item) => item.userID !== user.uid);
	}

	const register = (email, password, firstName, lastName) => {
		onAuthStateChanged(firebaseAuth, (currentUser) => {
			try {
				setDoc(doc(db, 'users', currentUser.uid), {
					loginType: 'email',
					userID: currentUser.uid,
					email: email,
					password: password,
					name: firstName + ' ' + lastName,
					profilePicture:
						'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxQHBhIRBxIOExAQEREVFxYVDRcVExIVGBIWFhUSFRUYHSggGh0lGxcVLTEhJSkrLi4uFx8zODMsNygtLisBCgoKDQ0NFQ4PEjEZFRkrKysrLTctLSsrKzctNysrLSsrNy0tKysrKy0rLSsrKysrKysrKystLSsrKysrKysrK//AABEIAOEA4QMBIgACEQEDEQH/xAAbAAEAAwEBAQEAAAAAAAAAAAAAAwQFBgIBB//EADUQAQABAgMDCQcEAwEAAAAAAAABAgMEBRESITETQVFhcYGhscEUIjI0kdHwQlKS4SRy8SP/xAAWAQEBAQAAAAAAAAAAAAAAAAAAAQL/xAAWEQEBAQAAAAAAAAAAAAAAAAAAARH/2gAMAwEAAhEDEQA/AP0wBpAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHqiiblWlETMg8vsRrOkcV2jLKqvjmmPGWjh8NTh6fcjf088mjMtZdXX8WlPbx+kJ4yr91U/xaQmqzpyqOaqf4o68rqj4KontjRqhowbuErtfHTOnTG+EDpVTE4Gm9GtO6rp6e2DUxij3dtTZr0uRv/N8PCgAAAAAAAAAAAAAAAAAA3MDh+Qsxr8U75+zHw9O3iKY6aodClABFAAAAAAQYzDxiLWnPHCWFMaTpPGHSMjNbWxfiqP1ecfkLBRAVAAAAAAAAAAAAAAAAFnL41xlPf5S3GHlvzlPf5S3EpABFAAAAAAFLNaNrC6/tmPt6rqtmM/4dWvV5wDDAaQAAAAAAAAAAAAAAABZy75ynv8pbjCwE6Yynt9JbqVQBAAAAAAAYmZVTOLmJmdI07t0Ntg46dcZV2+iwQAKgAAAAAAAAAAAAAAACfBRPtNMxE7qo5m8hwdGxhqYp6In6pkqgCAAAAAAAwMXExiatqJjWqebrb6pmdG1hJmeMaTH1WDFAVAAAAAAAAAAAAAAAAG5l9e3hKerd9Flm5Pc3VUz2+k+jSZqgAAAAAAAClm1ezhtP3THhv+y6yc2ubV6KY/THjKwUAFQAAAAAAAAAAAAAAABJh702LsVU/wDYbeFv+0WdqI047tWA08nubqqZ7fSfQo0gGVAAAAAAQYvEez2tdNd+nFh3bk3LkzVxmWhnFe+mmOufSPVmtRAAAAAAAAAAAAAAAAAABNhL3IYiJnhwnsQgOlidY3CllVya7GlX6Z0hdZUAAAABWzGuaMJOzz6R9QZWMu8tiZmOHCOyEANIAAAAAAAAAAAAAAAAAAAA2MpjTDT11T5RC6rZfTsYOnr1n6zqssqAAAAK2YxtYOru84WUeIp27FURz0zHgDngGkAAAAAAAAAAAAAAAAAAHqinbriKeMzoUUzXVpREzLVwGC5Gdq78XkC7TGzTERzQ+gyoAAAAADn8Vb5LEVR1+E8ETbx2E9op1p3VRw6+qWPctzaq0uRMS1EeAAAAAAAAAAAAAAB9iNqdKd8r2Hy2a997dHRz/wBAo007c6URMz1L+Hyyat9+dI6I4tGzZps06W4iPOe9ImmI7VmmzTpbiISAigAAAAAAADzctxcp0riJh6AZmIyznsT3T6Sz7lubdWlyJiXRvFy3F2nS5ETC6mOdGjiMs034ee6fSVCuiaKtK4mJ61HkAAAAAAH2N87gfFvC4Gq9vq92nxnshbwWA2I2r++ejmj+19NENjD02I/847+ee9MCKAAAAAAAAAAAAAAAAI71mm9TpciJ/OlIAyMVl8299r3o8Y+6i6VTxmBi/GtG6rwntXUYw9VUzRVMVRpMPKgAA0sqw2vv1933Z1MbVURHGZ0dFbo5O3EU8IjQo9AMqAAAAAAAAAAAAAAAAAAAAAAo5nh9u3t08aePXDIdLMaxvc9ft8leqp6J8OZYiMBRLhfmaP8AanzdACUgAigAAAAAAAAAAAAAAAAAAAAADEzL5yru8oBYKoCsv//Z',
				});
			} catch (error) {
				console.warn(error.message);
			}
		});

		return createUserWithEmailAndPassword(firebaseAuth, email, password);
	};

	const logIn = (email, password) => {
		return signInWithEmailAndPassword(firebaseAuth, email, password);
	};

	const logOut = () => {
		return signOut(firebaseAuth);
	};

	const googleSignIn = () => {
		const googleAuthProvider = new GoogleAuthProvider();
		return signInWithPopup(firebaseAuth, googleAuthProvider).then(
			async function createUserDB(userCredentials) {
				await setDoc(
					doc(db, 'users', userCredentials.user.uid),
					{
						loginType: 'google',
						name: userCredentials.user.displayName,
						userID: userCredentials.user.uid,
						email: userCredentials.user.email,
						profilePicture: userCredentials.user.photoURL,
					},
					{ merge: true }
				);
			}
		);
	};

	const postContent = async (postID) => {
		if (!content.trim() || content === '') {
			toast.error('Please enter a content!');
		} else {
			if (logInType === 'google') {
				await setDoc(doc(db, 'posts', postID), {
					postID: postID,
					name: user.displayName,
					content: content,
					userID: user.uid,
					profilePicture: user.photoURL,
					dateAndTime: `${dateToday} ${hours}:${minutes}${newformat}`,
					timestamp: serverTimestamp(),
					likes: [],
				});

				setContent('');
				toast.success('Posted!');
			} else if (logInType === 'email') {
				currentUserData.map((item) => {
					setDoc(doc(db, 'posts', postID), {
						postID: postID,
						name: item.name,
						content: content,
						profilePicture: item.profilePicture,
						userID: user.uid,
						dateAndTime: `${dateToday} ${hours}:${minutes}${newformat}`,
						timestamp: serverTimestamp(),
						likes: [],
					});
				});

				setContent('');
				toast.success('Posted!');
			}
		}
	};

	const openComment = (postID) => {
		handleShow();
		setFeedPostID(postID);
	};

	const comment = (commentID, feedPostID) => {
		currentUserData.map((item) => {
			setDoc(doc(db, 'comments', commentID), {
				commentID: commentID,
				postID: feedPostID,
				name: item.name,
				comment: commentValue,
				profilePicture: item.profilePicture,
				userID: user.uid,
				dateAndTime: `${dateToday} ${hours}:${minutes}${newformat}`,
				timestamp: serverTimestamp(),
			});
		});

		setCommentValue('');
	};

	const like = (postID) => {
		const filteredPosts = feedData.filter((item) => item.postID === postID);

		const checkFeedData = filteredPosts.map((item) => item.likes)[0];

		const isLike = checkFeedData.find((item) => item.user === user.uid);

		if (isLike) {
			updateDoc(doc(db, 'posts', postID), {
				likes: arrayRemove({ user: user.uid }),
			});
		} else if (isLike === undefined) {
			updateDoc(doc(db, 'posts', postID), {
				likes: arrayUnion({ user: user.uid }),
			});
		}
	};

	return (
		<ContextVariable.Provider
			value={{
				like,
				commentData,
				commentValue,
				setCommentValue,
				comment,
				feedPostID,
				openComment,
				show,
				setShow,
				handleClose,
				handleShow,
				content,
				setContent,
				suggestedFriends,
				logInType,
				currentUserData,
				users,
				register,
				logIn,
				user,
				logOut,
				googleSignIn,
				postContent,
				feedData,
				isLoading,
			}}
		>
			{children}
		</ContextVariable.Provider>
	);
};

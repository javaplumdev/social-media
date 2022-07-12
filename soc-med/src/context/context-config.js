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
	deleteDoc,
} from 'firebase/firestore';

import { firebaseAuth, db, storage, auth } from '../firebase/firebase-config';
import { ref, uploadBytes, listAll, getDownloadURL } from 'firebase/storage';

import { createContext, useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { uuidv4 } from '@firebase/util';
import firebase from 'firebase/compat/app';

export const ContextVariable = createContext();

export const ContextFunction = ({ children }) => {
	const [user, setUser] = useState({});
	const [feedData, setFeedData] = useState({});
	const [users, setUsers] = useState({});
	const [isLoading, setIsLoading] = useState(true);
	const [content, setContent] = useState('');

	const [feedPostID, setFeedPostID] = useState('');
	const [commentData, setCommentData] = useState({});
	const [commentValue, setCommentValue] = useState('');
	const [imageData, setImageData] = useState(null);

	const [show, setShow] = useState(false);
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const [showModal, setShowModal] = useState(false);
	const handleCloseFollowingModal = () => setShowModal(false);
	const handleShowFollowingModal = () => setShowModal(true);

	const [showModalVer1, setShowModalVer1] = useState(false);
	const handleCloseFollowersModal = () => setShowModalVer1(false);
	const handleShowFollowersModal = () => setShowModalVer1(true);

	let currentUserData;
	let logInType;
	let suggestedFriends;
	let newSuggestedFriends;

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

		const userFollowing =
			currentUserData?.map && currentUserData.map((item) => item.following)[0];

		userFollowing?.map &&
			userFollowing.map((data) => {
				const index = suggestedFriends.findIndex(
					(x) => x.userID === data.userID
				);

				if (index > -1) {
					suggestedFriends.splice(index, 1);
				}
			});
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
					followers: [],
					following: [],
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
				users?.map &&
					users.map((item) => {
						if (item.userID === userCredentials.uid) {
							setDoc(
								doc(db, 'users', userCredentials.user.uid),
								{
									loginType: 'google',
									name: userCredentials.user.displayName,
									userID: userCredentials.user.uid,
									email: userCredentials.user.email,
									profilePicture: userCredentials.user.photoURL,
									followers: [],
									following: [],
								},
								{ merge: true }
							);
						}
					});
			}
		);
	};

	const postContent = async (postID) => {
		if (imageData === null) {
			if (!content.trim() || content === '') {
				toast.error('Please enter a content!');
			} else {
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
						reports: [],
					});
				});

				setContent('');
				toast.success('Posted!');
			}
		} else {
			const imageRef = ref(storage, `images/${imageData.name + uuidv4()}`);

			uploadBytes(imageRef, imageData).then(() => {
				setImageData(null);
				setContent('');
				toast.success('Posted!');

				getDownloadURL(imageRef).then((url) => {
					currentUserData.map((item) => {
						setDoc(doc(db, 'posts', postID), {
							postID: postID,
							name: item.name,
							content: content,
							profilePicture: item.profilePicture,
							userID: user.uid,
							dateAndTime: `${dateToday} ${hours}:${minutes}${newformat}`,
							image: url,
							timestamp: serverTimestamp(),
							likes: [],
							reports: [],
						});
					});
				});
			});
		}
	};

	const updateUserDetails = (username) => {
		if (imageData === null && username === '' && !username.trim()) {
			toast.error("You haven't done any changes yet.");
		} else {
			// setProfilePictureData
			const imageRef = ref(storage, `images/${imageData.name + uuidv4()}`);

			uploadBytes(imageRef, imageData).then(() => {
				setImageData(null);
				setContent('');
				toast.success('Posted!');

				getDownloadURL(imageRef).then((url) => {
					setDoc(
						doc(db, 'users', user.uid),
						{
							profilePicture: url,
							name: username,
						},
						{ merge: true }
					);

					feedData.map((item) => {
						if (user.uid === item.userID) {
							setDoc(
								doc(db, 'posts', item.postID),
								{
									profilePicture: url,
									name: username,
								},
								{ merge: true }
							);
						}
					});

					commentData.map((item) => {
						if (user.uid === item.userID) {
							setDoc(
								doc(db, 'comments', item.commentID),
								{
									profilePicture: url,
									name: username,
								},
								{ merge: true }
							);
						}
					});

					users.map((item) => {
						if (user.uid === item.userID) {
							setDoc(
								doc(db, 'users', item.userID),
								{
									profilePicture: url,
									name: username,
								},
								{ merge: true }
							);
						}
					});
				});
			});

			toast.success('Succesfully change!');
		}
	};

	const openComment = (postID) => {
		handleShow();
		setFeedPostID(postID);
	};

	const comment = (commentID, feedPostID) => {
		if (!commentValue.trim() || commentValue === '') {
			toast.error('Please enter a comment!');
		} else {
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
					reports: [],
				});
			});

			setCommentValue('');
		}
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

	const deletePost = async (postID) => {
		await deleteDoc(doc(db, 'posts', postID));
		toast.success('Post deleted');
	};

	const deleteComment = async (commentID) => {
		await deleteDoc(doc(db, 'comments', commentID));

		toast.success('Comment deleted');
	};

	const reportComment = (commentID) => {
		const filteredPosts = commentData.filter(
			(item) => item.commentID === commentID
		);
		const checkReportData = filteredPosts.map((item) => item.reports)[0];
		const isReported = checkReportData.find((item) => item.user === user.uid);

		if (isReported) {
			toast.error('Comment already been reported. Please wait.');
		} else if (isReported === undefined) {
			updateDoc(doc(db, 'comments', commentID), {
				reports: arrayUnion({ user: user.uid }),
			});

			toast.success('Comment has been reported. Please wait.');

			if (checkReportData.length === 5) {
				deleteDoc(doc(db, 'comments', commentID));
				toast.success(
					'The report reached the limit. The Comment will now be deleted. Thank you.'
				);
			}
		}
	};

	const reportPost = async (postID) => {
		const filteredPosts = feedData.filter((item) => item.postID === postID);
		const checkReportData = filteredPosts.map((item) => item.reports)[0];

		const isReported = checkReportData.find((item) => item.user === user.uid);

		if (isReported) {
			toast.error('Post already been reported. Please wait.');
		} else if (isReported === undefined) {
			updateDoc(doc(db, 'posts', postID), {
				reports: arrayUnion({ user: user.uid }),
			});

			toast.success('Post has been reported. Please wait.');

			if (checkReportData.length === 5) {
				await deleteDoc(doc(db, 'posts', postID));
				toast.success(
					'The report reached in 5 reports. The post will now be deleted. Thank you.'
				);
			}
		}
	};

	const follow = (userID, name, profilePicture) => {
		currentUserData.map((item) => {
			updateDoc(doc(db, 'users', userID), {
				followers: arrayUnion({
					userID: item.userID,
					userName: item.name,
					profilePicture: item.profilePicture,
				}),
			});
		});

		updateDoc(doc(db, 'users', user.uid), {
			following: arrayUnion({
				userID: userID,
				userName: name,
				profilePicture: profilePicture,
			}),
		});

		toast.success('Followed!');
	};

	const checkFollowing = () => {
		handleShowFollowingModal();
	};

	const checkFollowers = () => {
		handleShowFollowersModal();
	};

	return (
		<ContextVariable.Provider
			value={{
				reportComment,
				deleteComment,
				updateUserDetails,
				showModalVer1,
				showModal,
				handleCloseFollowersModal,
				checkFollowers,
				handleCloseFollowingModal,
				checkFollowing,
				follow,
				reportPost,
				deletePost,
				imageData,
				setImageData,
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

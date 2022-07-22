import {
	createUserWithEmailAndPassword,
	onAuthStateChanged,
	signInWithEmailAndPassword,
	signOut,
	GoogleAuthProvider,
	signInWithPopup,
	getAdditionalUserInfo,
	FacebookAuthProvider,
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
import { useNavigate } from 'react-router-dom';

import DefaultProfilePicture from '../assets/profile.png';

export const ContextVariable = createContext();

export const ContextFunction = ({ children }) => {
	const [user, setUser] = useState({});
	const [feedData, setFeedData] = useState({});
	const [users, setUsers] = useState({});
	const [isLoading, setIsLoading] = useState(true);
	const [content, setContent] = useState('');
	const [username, setUserName] = useState('-');
	const [searchVar, setSearchVar] = useState('');
	const [feedPostID, setFeedPostID] = useState('');
	const [commentData, setCommentData] = useState({});
	const [commentValue, setCommentValue] = useState('');
	const [imageData, setImageData] = useState(null);
	const [messagesData, setMessagesData] = useState({});
	const [messagesHolder, setMessagesHolder] = useState('');
	const [tabName, setTabName] = useState('');
	const [notificationsData, setNotificationsData] = useState({});
	const [category, setCategory] = useState([]);

	const [show, setShow] = useState(false);
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const [showModal, setShowModal] = useState(false);
	const handleCloseFollowingModal = () => setShowModal(false);
	const handleShowFollowingModal = () => setShowModal(true);

	const [showModalVer1, setShowModalVer1] = useState(false);
	const handleCloseFollowersModal = () => setShowModalVer1(false);
	const handleShowFollowersModal = () => setShowModalVer1(true);

	const [showModalVer2, setShowModalVer2] = useState(false);
	const handleCloseToMessage = () => setShowModalVer2(false);
	const handleShowToMessage = () => setShowModalVer2(true);

	const [showPost, setShowPost] = useState(false);

	const handleClosePost = () => setShowPost(false);
	const handleShowPost = () => setShowPost(true);

	let navigate = useNavigate();

	let currentUserData;
	let logInType;
	let suggestedFriends;

	let dateToday = new Date().toLocaleDateString();

	const categoryData = [
		{ id: 'ddb454dd-14ce-4bee-8c12-d45fd54c5ce4', name: 'Ribbit' },
		{ id: 'a897634d-238d-4402-b4b8-3c7828fe8be2', name: 'Anime' },
		{ id: '6c052131-d0f0-47b0-9ae7-0263e3f5a589', name: 'Family' },
		{ id: '288eb2b5-cc57-4635-ada8-79880a2732a2', name: 'Sports' },
		{ id: 'a6e79e44-4235-41ce-a507-ebdc130199f8', name: 'Kpop' },
		{ id: 'f479dd6e-bd24-481b-a4fd-49c06261f5e1', name: 'History' },
		{ id: '5ddcf483-408b-4ba8-b0dd-347931b556da', name: 'Current situation' },
		{ id: '6ccc78a1-fea9-4938-a92e-173561f20d53', name: 'Job ' },
		{ id: '9e9296ad-cfa8-463b-b0fa-5349f09b4b05', name: 'Fashion' },
		{ id: '9e3a8503-9c1f-4d92-b450-43431ecc4951', name: 'News' },
		{ id: '19b62730-03b1-4613-8fe0-eba5621edf7e', name: 'Entertainment' },
		{ id: 'b9186251-8e5c-46d1-9bd6-5e2774a86540', name: 'Gaming' },
	];

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
			orderBy('timestamp', 'desc')
		);

		onSnapshot(queryComments, (querySnapshot) => {
			setCommentData(
				querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
			);
		});

		onSnapshot(collection(db, 'users'), (snapshot) => {
			setUsers(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
		});

		const queryMessages = query(
			collection(db, 'messages'),
			orderBy('timestamp', 'desc')
		);

		onSnapshot(queryMessages, (snapshot) => {
			setMessagesData(
				snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
			);
		});

		const queryNotification = query(
			collection(db, 'notifications'),
			orderBy('timestamp', 'desc')
		);

		onSnapshot(queryNotification, (snapshot) => {
			setNotificationsData(
				snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
			);
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

	const register = (email, password, username) => {
		if (username.length >= 50) {
			toast.error('Username must have less then 50 words.');
		} else {
			onAuthStateChanged(firebaseAuth, (currentUser) => {
				try {
					setDoc(doc(db, 'users', currentUser.uid), {
						loginType: 'email',
						userID: currentUser.uid,
						email: email,
						password: password,
						name: username,
						// profilePicture:
						// 	'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxQHBhIRBxIOExAQEREVFxYVDRcVExIVGBIWFhUSFRUYHSggGh0lGxcVLTEhJSkrLi4uFx8zODMsNygtLisBCgoKDQ0NFQ4PEjEZFRkrKysrLTctLSsrKzctNysrLSsrNy0tKysrKy0rLSsrKysrKysrKystLSsrKysrKysrK//AABEIAOEA4QMBIgACEQEDEQH/xAAbAAEAAwEBAQEAAAAAAAAAAAAAAwQFBgIBB//EADUQAQABAgMDCQcEAwEAAAAAAAABAgMEBRESITETQVFhcYGhscEUIjI0kdHwQlKS4SRy8SP/xAAWAQEBAQAAAAAAAAAAAAAAAAAAAQL/xAAWEQEBAQAAAAAAAAAAAAAAAAAAARH/2gAMAwEAAhEDEQA/AP0wBpAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHqiiblWlETMg8vsRrOkcV2jLKqvjmmPGWjh8NTh6fcjf088mjMtZdXX8WlPbx+kJ4yr91U/xaQmqzpyqOaqf4o68rqj4KontjRqhowbuErtfHTOnTG+EDpVTE4Gm9GtO6rp6e2DUxij3dtTZr0uRv/N8PCgAAAAAAAAAAAAAAAAAA3MDh+Qsxr8U75+zHw9O3iKY6aodClABFAAAAAAQYzDxiLWnPHCWFMaTpPGHSMjNbWxfiqP1ecfkLBRAVAAAAAAAAAAAAAAAAFnL41xlPf5S3GHlvzlPf5S3EpABFAAAAAAFLNaNrC6/tmPt6rqtmM/4dWvV5wDDAaQAAAAAAAAAAAAAAABZy75ynv8pbjCwE6Yynt9JbqVQBAAAAAAAYmZVTOLmJmdI07t0Ntg46dcZV2+iwQAKgAAAAAAAAAAAAAAACfBRPtNMxE7qo5m8hwdGxhqYp6In6pkqgCAAAAAAAwMXExiatqJjWqebrb6pmdG1hJmeMaTH1WDFAVAAAAAAAAAAAAAAAAG5l9e3hKerd9Flm5Pc3VUz2+k+jSZqgAAAAAAAClm1ezhtP3THhv+y6yc2ubV6KY/THjKwUAFQAAAAAAAAAAAAAAABJh702LsVU/wDYbeFv+0WdqI047tWA08nubqqZ7fSfQo0gGVAAAAAAQYvEez2tdNd+nFh3bk3LkzVxmWhnFe+mmOufSPVmtRAAAAAAAAAAAAAAAAAABNhL3IYiJnhwnsQgOlidY3CllVya7GlX6Z0hdZUAAAABWzGuaMJOzz6R9QZWMu8tiZmOHCOyEANIAAAAAAAAAAAAAAAAAAAA2MpjTDT11T5RC6rZfTsYOnr1n6zqssqAAAAK2YxtYOru84WUeIp27FURz0zHgDngGkAAAAAAAAAAAAAAAAAAHqinbriKeMzoUUzXVpREzLVwGC5Gdq78XkC7TGzTERzQ+gyoAAAAADn8Vb5LEVR1+E8ETbx2E9op1p3VRw6+qWPctzaq0uRMS1EeAAAAAAAAAAAAAAB9iNqdKd8r2Hy2a997dHRz/wBAo007c6URMz1L+Hyyat9+dI6I4tGzZps06W4iPOe9ImmI7VmmzTpbiISAigAAAAAAADzctxcp0riJh6AZmIyznsT3T6Sz7lubdWlyJiXRvFy3F2nS5ETC6mOdGjiMs034ee6fSVCuiaKtK4mJ61HkAAAAAAH2N87gfFvC4Gq9vq92nxnshbwWA2I2r++ejmj+19NENjD02I/847+ee9MCKAAAAAAAAAAAAAAAAI71mm9TpciJ/OlIAyMVl8299r3o8Y+6i6VTxmBi/GtG6rwntXUYw9VUzRVMVRpMPKgAA0sqw2vv1933Z1MbVURHGZ0dFbo5O3EU8IjQo9AMqAAAAAAAAAAAAAAAAAAAAAAo5nh9u3t08aePXDIdLMaxvc9ft8leqp6J8OZYiMBRLhfmaP8AanzdACUgAigAAAAAAAAAAAAAAAAAAAAADEzL5yru8oBYKoCsv//Z',
						profilePicture: DefaultProfilePicture,
						followers: [],
						following: [],
					});
				} catch (error) {
					console.warn(error.message);
				}
			});

			toast.success('Account created! Please log in');
			return createUserWithEmailAndPassword(firebaseAuth, email, password);
		}
	};

	const logIn = (email, password) => {
		return signInWithEmailAndPassword(firebaseAuth, email, password);
	};

	const logOut = () => {
		return signOut(firebaseAuth);
	};

	const googleSignIn = async () => {
		const googleAuthProvider = new GoogleAuthProvider();

		return signInWithPopup(firebaseAuth, googleAuthProvider).then(
			async function createUserDb(userCredentials) {
				const details = getAdditionalUserInfo(userCredentials);

				if (details.isNewUser) {
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
			}
		);
	};

	const postContent = async (postID, category) => {
		if (imageData === null) {
			if (!content.trim() || content === '') {
				toast.error('Please enter a content!');
			} else {
				if (content.length > 200) {
					toast.error('Please enter 200 words only!');
				} else {
					currentUserData.map((item) => {
						setDoc(doc(db, 'posts', postID), {
							postID: postID,
							name: item.name,
							content: content,
							profilePicture: item.profilePicture,
							userID: user.uid,
							category: category,
							dateAndTime: `${dateToday} ${hours}:${minutes}${newformat}`,
							timestamp: serverTimestamp(),
							likes: [],
							reports: [],
						});
					});

					setContent('');
					toast.success('Posted!');
					handleClosePost();
					setCategory((prevState) => {
						return [];
					});
				}
			}
		} else {
			const imageRef = ref(storage, `images/${imageData.name + uuidv4()}`);

			uploadBytes(imageRef, imageData).then(() => {
				setImageData(null);
				setContent('');

				getDownloadURL(imageRef).then((url) => {
					currentUserData.map((item) => {
						setDoc(doc(db, 'posts', postID), {
							postID: postID,
							name: item.name,
							content: content,
							profilePicture: item.profilePicture,
							userID: user.uid,
							category: category,
							dateAndTime: `${dateToday} ${hours}:${minutes}${newformat}`,
							image: url,
							timestamp: serverTimestamp(),
							likes: [],
							reports: [],
						});
					});
				});

				toast.success('Posted!');
			});
		}
	};

	const updateUserDetails = () => {
		if (imageData === null) {
			if (!username.trim() || username === '') {
				toast.error('Please enter a content!');
			} else {
				if (username.length >= 16) {
					toast.error('Please enter 15 letters only.');
				} else {
					users.map((item) => {
						if (item.name === username) {
							toast.error('Username already taken!');
						} else {
							setDoc(
								doc(db, 'users', user.uid),
								{
									name: username,
								},
								{ merge: true }
							);

							feedData.map((item) => {
								if (user.uid === item.userID) {
									setDoc(
										doc(db, 'posts', item.postID),
										{
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
											name: username,
										},
										{ merge: true }
									);
								}
							});

							if (user.uid === item.userID) {
								setDoc(
									doc(db, 'users', item.userID),
									{
										name: username,
									},
									{ merge: true }
								);

								toast.success('Changed');
							}
						}
					});
				}
			}
		} else {
			// setProfilePictureData
			const imageRef = ref(storage, `images/${imageData.name + uuidv4()}`);

			uploadBytes(imageRef, imageData).then(() => {
				setImageData(null);
				setContent('');

				getDownloadURL(imageRef).then((url) => {
					setDoc(
						doc(db, 'users', user.uid),
						{
							profilePicture: url,
						},
						{ merge: true }
					);

					feedData.map((item) => {
						if (user.uid === item.userID) {
							setDoc(
								doc(db, 'posts', item.postID),
								{
									profilePicture: url,
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
								},
								{ merge: true }
							);
						}
					});
				});
			});

			toast.success('Succesfully changed!');
		}
	};

	const openComment = (postID) => {
		handleShow();
		setFeedPostID(postID);
	};

	const comment = (commentID, feedPostID, userWhoPost) => {
		if (!commentValue.trim() || commentValue === '') {
			toast.error('Please enter a comment!');
		} else {
			if (commentValue.length > 50) {
				toast.error('Please enter 50 words only!');
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

				if (userWhoPost !== user.uid) {
					setDoc(doc(db, 'notifications', commentID + user.uid), {
						notificationID: commentID + user.uid,
						postID: feedPostID,
						userWhoLikes: user.uid,
						userWhoPosts: userWhoPost,
						type: 'comment',
						isViewed: false,
						timestamp: serverTimestamp(),
						dateAndTime: `${dateToday} ${hours}:${minutes}${newformat}`,
					});
				}

				setCommentValue('');
			}
		}
	};

	const like = async (postID, userID) => {
		const filteredPosts = feedData.filter((item) => item.postID === postID);
		const checkFeedData = filteredPosts.map((item) => item.likes)[0];
		const isLike = checkFeedData.find((item) => item.user === user.uid);

		if (isLike) {
			updateDoc(doc(db, 'posts', postID), {
				likes: arrayRemove({ user: user.uid }),
			});

			await deleteDoc(doc(db, 'notifications', postID + user.uid));
		} else if (isLike === undefined) {
			updateDoc(doc(db, 'posts', postID), {
				likes: arrayUnion({ user: user.uid }),
			});

			if (userID !== user.uid) {
				setDoc(doc(db, 'notifications', postID + user.uid), {
					notificationID: postID + user.uid,
					postID: postID,
					userWhoLikes: user.uid,
					userWhoPosts: userID,
					type: 'like',
					isViewed: false,
					timestamp: serverTimestamp(),
					dateAndTime: `${dateToday} ${hours}:${minutes}${newformat}`,
				});
			}
		}
	};

	const deletePost = async (postID) => {
		await deleteDoc(doc(db, 'posts', postID));

		const commentUnderPost = commentData.filter(
			(item) => item.postID === postID
		);

		commentUnderPost.forEach((item) => {
			deleteDoc(doc(db, 'comments', item.commentID));
		});

		toast.success('Post deleted');
	};

	const deleteComment = async (commentID) => {
		await deleteDoc(doc(db, 'comments', commentID));
		await deleteDoc(doc(db, 'notifications', commentID + user.uid));

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

	const follow = (userID) => {
		currentUserData.map((item) => {
			updateDoc(doc(db, 'users', userID), {
				followers: arrayUnion({
					userID: item.userID,
				}),
			});
		});

		updateDoc(doc(db, 'users', user.uid), {
			following: arrayUnion({
				userID: userID,
			}),
		});

		setDoc(doc(db, 'notifications', user.uid), {
			notificationID: user.uid,
			userWhoLikes: user.uid,
			userWhoPosts: userID,
			type: 'follow',
			isViewed: false,
			timestamp: serverTimestamp(),
			dateAndTime: `${dateToday} ${hours}:${minutes}${newformat}`,
		});

		toast.success('Followed!');
	};

	const checkFollowing = () => {
		handleShowFollowingModal();
	};

	const checkFollowers = () => {
		handleShowFollowersModal();
	};

	const search = () => {
		if (!searchVar.trim() || searchVar === '') {
			toast.error('Invalid search');
		} else {
			navigate(`/results/${searchVar}`);
		}
	};

	const addMessages = () => {
		handleShowToMessage();
	};

	const pickRecipient = async (chatBoxID, recipientID) => {
		const findIfExist = messagesData.find(
			(item) =>
				(item.recipientID === recipientID && item.sender === user.uid) ||
				(item.sender === recipientID && item.recipientID === user.uid)
		);

		if (findIfExist) {
			navigate(`/chat/${findIfExist.chatBoxID}`);
		} else {
			setDoc(
				doc(db, 'messages', chatBoxID),
				{
					chatBoxID: chatBoxID,
					messages: [],
					sender: user.uid,
					recipientID: recipientID,
					timestamp: serverTimestamp(),
				},
				{ merge: true }
			);

			navigate(`/chat/${chatBoxID}`);
		}
	};

	const sendMessage = (chatID, recipientID) => {
		if (!messagesHolder.trim() || messagesHolder === '') {
			toast.error('Please enter a message');
		} else {
			updateDoc(doc(db, 'messages', chatID), {
				messages: arrayUnion({
					message: messagesHolder,
					recipient: recipientID,
					sender: user.uid,
					messageID: uuidv4(),
					dateAndTime: `${dateToday} ${hours}:${minutes}${newformat}`,
					isViewed: false,
				}),
			});

			updateDoc(
				doc(db, 'messages', chatID),
				{
					timestamp: serverTimestamp(),
				},
				{ merge: true }
			);

			setMessagesHolder('');
		}
	};

	const removeFollowing = async (userID) => {
		updateDoc(doc(db, 'users', user.uid), {
			following: arrayRemove({ userID: userID }),
		});

		updateDoc(doc(db, 'users', userID), {
			followers: arrayRemove({ userID: user.uid }),
		});

		await deleteDoc(doc(db, 'notifications', user.uid));

		toast.success('Unfollowed');
	};

	const removeFollowers = (userID) => {
		updateDoc(doc(db, 'users', user.uid), {
			followers: arrayRemove({ userID: userID }),
		});

		updateDoc(doc(db, 'users', userID), {
			following: arrayRemove({ userID: user.uid }),
		});

		toast.success('Removed');
	};

	const navigateNotification = () => {
		const yourNotification =
			notificationsData?.filter &&
			notificationsData.filter((item) => item.userWhoPosts === user.uid);

		yourNotification.forEach((item) => {
			setDoc(
				doc(db, 'notifications', item.notificationID),
				{
					isViewed: true,
				},
				{ merge: true }
			);
		});

		navigate('/notifications');
	};

	const openChatBox = (id) => {
		navigate(`/chat/${id}`);
	};

	return (
		<ContextVariable.Provider
			value={{
				category,
				setCategory,
				showPost,
				setShowPost,
				handleClosePost,
				handleShowPost,
				categoryData,
				openChatBox,
				notificationsData,
				navigateNotification,
				messagesHolder,
				tabName,
				setTabName,
				removeFollowers,
				removeFollowing,
				setMessagesHolder,
				sendMessage,
				messagesData,
				pickRecipient,
				showModalVer2,
				handleCloseToMessage,
				addMessages,
				searchVar,
				setSearchVar,
				search,
				username,
				setUserName,
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

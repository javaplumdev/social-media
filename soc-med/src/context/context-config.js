import {
	createUserWithEmailAndPassword,
	onAuthStateChanged,
	signInWithEmailAndPassword,
	signOut,
	GoogleAuthProvider,
	signInWithPopup,
} from 'firebase/auth';
import { setDoc, doc, onSnapshot, collection } from 'firebase/firestore';
import { firebaseAuth, db } from '../firebase/firebase-config';
import { createContext, useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';

export const ContextVariable = createContext();

export const ContextFunction = ({ children }) => {
	const [user, setUser] = useState({});
	const [feedData, setFeedData] = useState({});
	const [users, setUsers] = useState({});
	const [isLoading, setIsLoading] = useState(true);

	let currentUserData;
	let logInType;

	useEffect(() => {
		onSnapshot(collection(db, 'posts'), (snapshot) => {
			setFeedData(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
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
		console.log(users);

		currentUserData =
			users?.filter && users.filter((item) => item.userID === user.uid);

		logInType = currentUserData.map((item) => item.loginType)[0];

		console.log(currentUserData);
		console.log(logInType);
	}

	const register = (email, password, firstName, lastName) => {
		onAuthStateChanged(firebaseAuth, (currentUser) => {
			try {
				setDoc(doc(db, 'users', currentUser.uid), {
					loginType: 'email',
					userID: currentUser.uid,
					email: email,
					password: password,
					firstName: firstName,
					lastName: lastName,
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

	const postContent = async (content, postID) => {
		console.log(logInType);

		if (!content.trim() || content === '') {
			toast.error('Please enter a content!');
		} else {
			if (logInType === 'google') {
				await setDoc(doc(db, 'posts', postID), {
					postID: postID,
					name: user.displayName,
					content: content,
					userID: user.uid,
				});
			} else if (logInType === 'email') {
				currentUserData.map((item) => {
					setDoc(doc(db, 'posts', postID), {
						postID: postID,
						name: item.firstName + item.lastName,
						content: content,
						userID: user.uid,
					});
				});
			}
		}
	};

	return (
		<ContextVariable.Provider
			value={{
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

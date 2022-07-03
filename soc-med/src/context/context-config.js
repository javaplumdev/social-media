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
	const [isLoading, setIsLoading] = useState(true);

	const register = (email, password, firstName, lastName) => {
		onAuthStateChanged(firebaseAuth, (currentUser) => {
			try {
				setDoc(doc(db, 'users', currentUser.uid), {
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
		if (!content.trim() || content === '') {
			toast.error('Please enter a content!');
		} else {
			console.log(content);

			await setDoc(doc(db, 'posts', postID), {
				postID: postID,
				name: user.displayName,
				content: content,
				userID: user.uid,
			});
		}
	};

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(firebaseAuth, (currentUser) => {
			setUser(currentUser);
		});

		return () => {
			unsubscribe();
		};
	}, []);

	useEffect(() => {
		onSnapshot(collection(db, 'posts'), (snapshot) => {
			setFeedData(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
		});
		// setIsLoading(false);
	}, []);

	return (
		<ContextVariable.Provider
			value={{
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

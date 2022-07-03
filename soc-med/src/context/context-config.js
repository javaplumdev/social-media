import {
	createUserWithEmailAndPassword,
	onAuthStateChanged,
	signInWithEmailAndPassword,
	signOut,
	GoogleAuthProvider,
	signInWithPopup,
} from 'firebase/auth';
import { setDoc, doc } from 'firebase/firestore';
import { firebaseAuth, db } from '../firebase/firebase-config';
import { createContext, useEffect, useState } from 'react';

export const ContextVariable = createContext();

export const ContextFunction = ({ children }) => {
	const [user, setUser] = useState({});

	const register = (email, password) => {
		onAuthStateChanged(firebaseAuth, (currentUser) => {
			try {
				setDoc(doc(db, 'users', currentUser.uid), {
					email: email,
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
						email: userCredentials.user.email,
					},
					{ merge: true }
				);
			}
		);
	};

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(firebaseAuth, (currentUser) => {
			setUser(currentUser);
		});

		return () => {
			unsubscribe();
		};
	}, []);

	return (
		<ContextVariable.Provider
			value={{ register, logIn, user, logOut, googleSignIn }}
		>
			{children}
		</ContextVariable.Provider>
	);
};

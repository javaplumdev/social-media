import { createUserWithEmailAndPassword } from 'firebase/auth';
import { firebaseAuth } from '../firebase/firebase-config';
import { createContext } from 'react';

export const ContextVariable = createContext();

export const ContextFunction = ({ children }) => {
	const register = (email, password) => {
		return createUserWithEmailAndPassword(firebaseAuth, email, password);
	};

	return (
		<ContextVariable.Provider value={{ register }}>
			{children}
		</ContextVariable.Provider>
	);
};

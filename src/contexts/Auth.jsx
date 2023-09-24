import { createContext, useEffect, useState, useContext } from 'react';
import { string, node } from 'prop-types';
import pb from '@/api/pockethost';
import useStorage from '@/hooks/useStorage';

const AuthContext = createContext();

const initialAuthState = {
	isAuth: false,
	user: null,
	token: '',
};

function AuthProvider({ displayName = 'AuthProvider', children }) {
	const { storageData } = useStorage('pocketbase_auth');

	useEffect(() => {
		if (storageData) {
			const { token, model } = storageData;
			setAuthState({
				isAuth: !!model,
				user: model,
				token,
			});
		}
	}, [storageData]);


	const [authState, setAuthState] = useState(initialAuthState);

	useEffect(() => {
		const unsub = pb.authStore.onChange((token, model) => {
			setAuthState((state) => ({
				...state,
				isAuth: !!model,
				user: model,
				token,
			}));
		});

		return () => {
			unsub?.();
		};
	}, []);

	const signUp = async (registerUser) => {
		return await pb.collection('users').create(registerUser);
	};

	const signIn = async (usernameOrEmail, password) => {
		return await pb
			.collection('users')
			.authWithPassword(usernameOrEmail, password);
	};

	const signOut = async () => {
		return await pb.authStore.clear();
	};

	const cancelMembership = async (recordId) => {
		return await pb.collection('users').delete(recordId);
	};

	const authValue = {
		...authState,
		signUp,
		signIn,
		signOut,
		cancelMembership,
	};

	return (
		<AuthContext.Provider value={authValue} displayName={displayName}>
			{children}
		</AuthContext.Provider>
	);
}

AuthProvider.propTypes = {
	displayName: string,
	children: node.isRequired,
};

export default AuthProvider;


export const useAuth = () => {
	const authValue = useContext(AuthContext);
	if (!authValue) {
		throw new Error('useAuth 훅은 AuthProvider 내부에서만 사용할 수 있습니다');
	}

	return authValue;
};

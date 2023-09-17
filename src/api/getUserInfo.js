import pb from './pockethost';

export default function getUserInfo() {
    const { model: user, isValid: isLogin, token } = pb.authStore;
    return {
        isLogin,
        user,
        token,
    };
}

export function getUserInfoFromStorage() {
    return JSON.parse(localStorage.getItem('pocketbase_auth'));
}
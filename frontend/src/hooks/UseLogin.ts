// UseLogin.ts
import { useNavigate } from 'react-router-dom';
import { User } from '../models';

type LoginErrorStatus = {
    field: 'email' | 'password';
    message: string;
} | null;

// 로그인
export const UseLogin = (setIsLoggedIn: (val: boolean) => void) => {
    const navigate = useNavigate();

    const login = (email: string, password: string): LoginErrorStatus => {
        // 로컬스토리지에 저장되어 있는 유저 리스트 체크
        const userList: User[] = JSON.parse(localStorage.getItem('users') || '[]');
        const checkUser = userList.find((user) => user.email === email);

        if (!email.trim()) {
            return {
                field: 'email',
                message: 'Please enter your email address.',
            };
        }
        if (!password.trim()) {
            return {
                field: 'password',
                message: 'Please enter your password.',
            };
        }

        if (!checkUser) {
            return {
                field: 'email',
                message: 'The email address is not registered. Please check again.',
            };
        }

        if (checkUser.password !== password) {
            return {
                field: 'password',
                message: 'The password is incorrect. Please try again.',
            };
        }

        // 현재 로그인한 유저 데이터 저장
        sessionStorage.setItem('currentUser', JSON.stringify(checkUser));
        setIsLoggedIn(true);
        navigate('/');
        return null; //로그인성공
    };

    return { login };
};

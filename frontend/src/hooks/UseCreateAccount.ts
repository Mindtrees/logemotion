import { useNavigate } from 'react-router-dom';
import { User } from '../models';

type SignUpErrorStatus = {
    field: 'userName' | 'email' | 'password' | 'confirmPassword';
    message: string;
} | null;

// 회원가입
export const UseCreateAccount = () => {
    const navigate = useNavigate();

    const signUp = (userName: string, email: string, password: string, confirmPassword: string): SignUpErrorStatus => {
        // 로컬스토리지에 저장되어 있는 유저 리스트 체크
        const userList: User[] = JSON.parse(localStorage.getItem('users') || '[]');
        const isExist = userList.some((user) => user.email === email);

        if (!userName.trim()) {
            return {
                field: 'userName',
                message: 'Please enter your name.',
            };
        }

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

        if (!confirmPassword.trim()) {
            return {
                field: 'confirmPassword',
                message: 'Please confirm your password.',
            };
        }

        if (isExist) {
            return {
                field: 'email',
                message: 'This email is already registered.',
            };
        }

        if (password !== confirmPassword) {
            return {
                field: 'confirmPassword',
                message: 'Passwords do not match.',
            };
        }

        const newUser: User = {
            id: Date.now(), //고유값 필요
            userName,
            email,
            password,
        };

        // 새 유저 저장
        userList.push(newUser);
        localStorage.setItem('users', JSON.stringify(userList));

        alert("Thanks for signing up! Let's get you logged in.");
        navigate('/login');
        return null;
    };

    return { signUp };
};

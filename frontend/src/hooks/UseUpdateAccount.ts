import { User } from '../models';

export const UseUpdateAccount = () => {
    const updateUser = (newUserData: User) => {
        sessionStorage.setItem('currentUser', JSON.stringify(newUserData));

        const localStorageUserData = localStorage.getItem('users');

        if (localStorageUserData) {
            try {
                const userArray: User[] = JSON.parse(localStorageUserData);
                // 현재 사용자 정보 업데이트
                const updatedUserList = userArray.map((user) => (user.id === newUserData.id ? newUserData : user));
                localStorage.setItem('users', JSON.stringify(updatedUserList));
            } catch (error) {
                throw new Error('LocalStorage users parsing error.');
            }
        }
    };

    return { updateUser };
};

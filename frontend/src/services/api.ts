import axios, { AxiosError } from 'axios';

const apiUrl = 'http://localhost:3001'; // 后端地址

// 用户注册
export const registerUser = async (username: string, password: string) => {
    try {
        const response = await axios.post(`${apiUrl}/register`, {
            username,
            password
        });
        console.log('注册成功:', response.data);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('注册失败:', error.response?.data || error.message);
        } else {
            console.error('注册失败:', '未知错误');
        }
        throw error;
    }
};

// 用户登录
export const loginUser = async (username: string, password: string) => {
    try {
        const response = await axios.post(`${apiUrl}/login`, {
            username,
            password
        });
        console.log('登录成功:', response.data);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('登录失败:', error.response?.data || error.message);
        } else {
            console.error('登录失败:', '未知错误');
        }
        throw error;
    }
};
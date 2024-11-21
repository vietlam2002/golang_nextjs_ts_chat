import React, { useState, useContext, useEffect } from 'react'
import { API_URL } from '@/constants'
import { useRouter } from 'next/router'
import { AuthContext, UserInfo } from '../../modules/auth_provider'

const index = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassord] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const submitHandler = async (e: React.SyntheticEvent) => {
        e.preventDefault()

        try {
            const res = await fetch(`${API_URL}/signup`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, email, password }),
            });


            if (res.ok) {
                const data = await res.json();
                console.log('Sign Up Success: ', data);

                // Redirect to login or dashboard page after successful sign-up
                router.push('/login')
            } else {
                const errorData = await res.json();
                setErrorMessage(errorData.message || 'Sign up failed. Please try again.');
            }
        } catch (error) {
            console.error('Error during sign-up:', error);
            setErrorMessage('Something went wrong. Please try again later.');
        }
    }

    const navigateToLogin = () => {
        router.push('/login')
    }
    const router = useRouter()
    return (
        <div className='flex items-center justify-center min-w-full min-h-screen'>
            <form className='flex flex-col md:w-1/5'>
                <div className='text-3xl font-bold text-center'>
                    <span className='text-blue'>welcome!</span>
                </div>

                {/* Hiển thị thông báo lỗi */}
                {errorMessage && (
                    <div className='text-red-500 text-center mt-4'>
                        {errorMessage}
                    </div>
                )}

                <input
                    placeholder='username'
                    className='p-3 mt-8 rounded-md border-2 border-grey focus:outline-none focus:border-blue'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <input
                    placeholder='email'
                    className='p-3 mt-4 rounded-md border-2 border-grey focus:outline-none focus:border-blue'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type='password'
                    placeholder='password'
                    className='p-3 mt-4 rounded-md border-2 border-grey focus:outline-none focus:border-blue'
                    value={password}
                    onChange={(e) => setPassord(e.target.value)}
                    required
                />

                <button
                    className='p-3 mt-6 rounded-md bg-blue font-bold text-white'
                    type='submit'
                    onClick={submitHandler}
                >
                    Sign up
                </button>
                <button
                    className='p-3 mt-6 font-bold text-black'
                    type='button'
                    onClick={navigateToLogin} // Gọi hàm điều hướng đến trang signup
                >
                    Already have an account? <span className='text-blue'>Login here</span>
                </button>
            </form>
        </div>
    )
}


export default index
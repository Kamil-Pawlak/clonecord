import React from 'react'
import { register } from '../utils/auth';

type Props = {
    onSwitch(): void
}

function RegisterForm(props: Props) {


  return (
    <div className=" rounded-2xl p-12 bg-gray-700 text-2xl">
            <div className='text-center'>
                <h3 className="text-3xl font-bold mb-2">Create an account</h3>
            </div>
            <form className='flex flex-col' onSubmit={handleSubmit}>
                <label htmlFor='email' className='text-xs font-medium'>EMAIL{' '}
                    <span className='text-red-400 font-semibold'> *</span>
                </label>
                <input id="email" className="bg-gray-800 text-white p-2 rounded-lg mt-1 mb-2 shadow-[0_0_0_0.4px_#4f545c] focus:shadow-[0_0_0_1px_#5865F2] focus:outline-none
                 border-neutral-500  focus:border-blue-500" type="text" />
                 <label htmlFor='username' className='text-xs font-medium'>USERNAME</label>
                 <input id='username' type='text' className="bg-gray-800 text-white p-2 rounded-lg mt-1 mb-2 shadow-[0_0_0_0.4px_#4f545c] focus:shadow-[0_0_0_1px_#5865F2] focus:outline-none
                 border-neutral-500  focus:border-blue-500"></input>

                <label htmlFor='password' className='text-xs font-medium'>PASSWORD{' '}
                    <span className='text-red-400 font-semibold'> *</span>
                    </label>
                <input
                    id="password"
                    type="password"
                    className="bg-gray-800 text-white p-2 rounded-lg mt-1 mb-2 shadow-[0_0_0_0.4px_#4f545c] focus:shadow-[0_0_0_1px_#5865F2] focus:outline-none
                 border-neutral-500  focus:border-blue-500"
                />
                <button className="bg-[#5865F2] text-lg rounded mt-4 p-2 hover:bg-[#4752C4] transition-colors">
                    Register
                </button>
            </form>
            <p className="text-sm text-left mt-2">Already have an account?{' '}
                <button onClick={props.onSwitch} className="text-blue-400 underline hover:cursor-pointer">
                    Log In
                </button>
            </p>
        </div>
  )
}

async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const email = (form.elements.namedItem('email') as HTMLInputElement).value;
    const username = (form.elements.namedItem('username') as HTMLInputElement).value;
    const password = (form.elements.namedItem('password') as HTMLInputElement).value;

    try {
        const response = await register(username, email, password);
        if (response.token) {
            window.auth.setToken(response.token);
        }
    } catch (error) {
        console.error('Registration failed:', error);
    }
}

export default RegisterForm
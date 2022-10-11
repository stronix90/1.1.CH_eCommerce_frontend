import { useRouter } from 'next/router'
import { useState } from "react";
import useUser from '../../context/userContext';
import H1 from '../atoms/H1';

export default function Login() {
    const router = useRouter()
    const { login } = useUser()

    const [formData, setFormData] = useState({});

    const handleSubmission = async (e) => {
        e.preventDefault();
        login(formData).then(res => { if (res) router.push("/") })
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    return (
        <section className='m-auto'>
            <H1>Login</H1>
            <form
                onSubmit={handleSubmission}
                className='w-full max-w-lg gap-3'
            >

                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full px-3 my-5    md:mb-0">
                        <label htmlFor='email' className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2' >Email</label>
                        <input
                            type='email'
                            name='email'
                            id='email'
                            onChange={handleChange}
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        />
                    </div>

                    <div className="w-full px-3 my-5    md:mb-0">
                        <label htmlFor='password' className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>Password</label>
                        <input
                            type='password'
                            name='password'
                            id='password'
                            onChange={handleChange}
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        />
                    </div>

                    <div className="w-full px-3 my-5 md:mb-0">
                        <div className="w-full px-3 flex justify-center">
                            <button type='submit' className='m-auto bg-indigo-900 hover:bg-indigo-700 text-white font-bold py-2 px-10 border border-indigo-900 rounded'> Login </button>
                        </div>
                    </div>
                </div>
            </form>
        </section>
    )
}
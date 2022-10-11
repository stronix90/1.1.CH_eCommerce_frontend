import { useRouter } from 'next/router'

import { Formik, Form, Field, ErrorMessage } from 'formik';
import swal from "sweetalert2";

import validation from "./signupValidation"
import config from "../../config/globalVariables";
import H1 from '../atoms/H1';

export default function Signup() {

    const router = useRouter()


    const handleSubmission = async (values) => {

        delete values.checkPassword

        const signupOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json", },
            credentials: "include",
            body: JSON.stringify(values),
        }

        try {
            const res = await fetch(`${config.server}/signup`, signupOptions)

            if (res.status === 204) router.push("/")

            else if (res.status !== 200) {
                const data = await res.json()
                return swal.fire({
                    title: "Error al registrarse",
                    icon: "error",
                    text: JSON.stringify(data.message),
                })
            }


        } catch (err) {
            console.log({
                title: "Error al registrarse",
                icon: "error",
                text: err || "Se ha producido un error al registrarse",
            })
        }
    }


    return(
        <section className='m-auto'>
            <H1>Signup</H1>

            <Formik
                initialValues={{ name: '', address: '', birthDate: '', phone: '', email: '', password: '', photo: '' }}
                validate={validation}
                onSubmit={handleSubmission}
            >
                {({ errors }) => (
                    <Form className='w-full max-w-lg gap-3'>
                        <div className="flex flex-wrap -mx-3 mb-6">
                            <div className="w-full md:w-1/2 px-3 my-5    md:mb-0">
                                <label htmlFor="name" className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>Nombre</label>
                                <Field type="text" name="name" id="name" placeholder="Pedro Gonzalez" required className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" />
                                <ErrorMessage name="name" component="div" className='mt-2 text-red-500 text-xs italic' />
                            </div>
                            <div className="w-full md:w-1/2 px-3 my-5    md:mb-0">
                                <label htmlFor="address" className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>Dirección</label>
                                <Field type="text" id="address" name="address" required placeholder="Av. Rivadávia 10000" className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" />
                                <ErrorMessage name="address" component="div" className='mt-2 text-red-500 text-xs italic' />
                            </div>
                            <div className="w-full md:w-1/2 px-3 my-5    md:mb-0">
                                <label htmlFor="birthDate" className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Fecha de nacimiento</label>
                                <Field type="date" name="birthDate" id="birthDate" required className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" />
                                <ErrorMessage name="birthDate" component="div" className='mt-2 text-red-500 text-xs italic' />
                            </div>
                            <div className="w-full md:w-1/2 px-3 my-5    md:mb-0">
                                <label htmlFor="phone" className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Teléfono</label>
                                <Field type="tel" name="phone" id="phone" placeholder="+5491122223333" required className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" />
                                <ErrorMessage name="phone" component="div" className='mt-2 text-red-500 text-xs italic' />
                            </div>
                        </div>

                        <div className="flex flex-wrap -mx-3 mb-6">
                            <div className="w-full px-3">
                                <label htmlFor="email" className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Email</label>
                                <Field name="email" type="email" id="email" required placeholder="matias@gmail.com" className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" />
                                <ErrorMessage name="email" component="div" className='mt-2 text-red-500 text-xs italic' />
                            </div>
                        </div>

                        <div className="flex flex-wrap -mx-3 mb-6">
                            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                <label htmlFor="password" className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Password</label>
                                <Field name="password" type="password" id="password" required placeholder="Ingrese un password" className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" />
                                <ErrorMessage name="password" component="div" className='mt-2 text-red-500 text-xs italic' />
                            </div>
                            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                <label htmlFor="checkPassword" className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Confirm Password</label>
                                <Field name="checkPassword" type="password" id="checkPassword" required placeholder="Verifique password" className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" />
                                <ErrorMessage name="password" component="div" className='mt-2 text-red-500 text-xs italic' />
                            </div>
                        </div>

                        <div className="flex flex-wrap -mx-3 mb-6">
                            <div className="w-full px-3">


                                <label htmlFor="photo" className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Foto de perfil</label>
                                <Field type="file" name="photo" id="photo" className="block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" />
                                <ErrorMessage name="photo" component="div" className='mt-2 text-red-500 text-xs italic' />
                            </div>
                        </div>

                        <div className="flex flex-wrap -mx-3 ">
                            <div className="w-full px-3 flex justify-between	">
                                <button type='reset' className='bg-transparent hover:bg-indigo-500 text-blue-700 font-semibold hover:text-white py-1 px-2 border border-indigo-500 hover:border-transparent rounded text-sm'>Vaciar formulario</button>
                                <button type="submit" className='bg-indigo-900 hover:bg-indigo-700 text-white font-bold py-2 px-10 border border-indigo-900 rounded'>Sign Up</button>
                            </div>
                        </div>
                    </Form>
                )}
            </Formik>
        </section>
    )
}
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useRouter } from "next/router";
import Swal from "sweetalert2";
import config from "../../../config/globalVariables";
import H1 from "../../atoms/H1";
import productValidation from "./productValidation";

export default function CreateProduct({ product }) {
    const router = useRouter();

    const handleSubmission = async (values) => {
        const CreateProductOptions = {
            method: product?.id ? "PUT" : "POST",
            headers: { "Content-Type": "application/json", },
            credentials: "include",
            body: JSON.stringify(values),
        }

        try {
            const url = product?.id ? `${config.server}/productos/${product.id}` : `${config.server}/productos`
            const res = await fetch(url, CreateProductOptions)
            const data = await res.json()

            if (res.status === 201 || res.status === 200) {
                router.push(`/product/${data.id}`)
            }

            else {
                const data = await res.json()
                return Swal.fire({
                    title: "Error en la operación",
                    icon: "error",
                    text: JSON.stringify(data.message),
                })
            }
        }
        catch (err) {
            console.log({
                title: "Error en la operación",
                icon: "error",
                text: err || "Se ha producido un error al momento de procesar los datos",
            })
        }
    }


    return (

        <section className="m-auto py-5">
            <H1>Crear producto</H1>
            <Formik
                initialValues={{
                    title: product?.title ?? "",
                    description: product?.description ?? "",
                    code: product?.code ?? "",
                    thumbnail: product?.thumbnail ?? "",
                    price: product?.price ?? 0,
                    stock: product?.stock ?? 1,
                    category: product?.category ?? "",
                }}
                validate={productValidation}
                onSubmit={handleSubmission}

            >
                {({ errors }) => (
                    <Form className="m-auto py-10 w-full max-w-lg gap-3">

                        <div className="flex flex-wrap -mx-3 mb-6">
                            <div className="w-full px-3">
                                <label htmlFor="title" className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Título</label>
                                <Field name="title" id="title" required placeholder="Rascador Cancat Multiespacio" className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" />
                                <ErrorMessage name="title" component="div" className="mt-2 text-red-500 text-xs italic" />
                            </div>
                        </div>

                        <div className="flex flex-wrap -mx-3 mb-6">
                            <div className="w-full px-3">
                                <label htmlFor="tidescriptiontle" className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Descripción</label>
                                <Field name="description" rows="5" id="description" required placeholder="Describa el produco" as="textarea" className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" />
                                <ErrorMessage name="description" component="div" className="mt-2 text-red-500 text-xs italic" />
                            </div>
                        </div>

                        <div className="flex flex-wrap -mx-3 mb-6">
                            <div className="w-full md:w-1/2 px-3 my-5 md:mb-0">
                                <label htmlFor="code" className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>Código</label>
                                <Field type="text" name="code" id="code" placeholder="DDA1022" required className="appearance-none block  bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" />
                                <ErrorMessage name="code" component="div" className='mt-2 text-red-500 text-xs italic' />
                            </div>

                            <div className="w-full md:w-1/2 px-3 my-5 md:mb-0">
                                <label htmlFor="category" className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>Categoria</label>
                                <Field as="select" name="category" id="category" placeholder="Peluches" required className="appearance-none block  bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 w-full">
                                    <option value="juguetes">Juguetes</option>
                                    <option value="golosinas">Golosinas</option>
                                    <option value="rascadores">Rascadores</option>
                                    <option value="bandeja_sanitaria">Bandejas sanitarias</option>
                                    <option value="comederos">Comederos</option>
                                    <option value="otros">Otros</option>
                                </Field>
                                <ErrorMessage name="category" component="div" className='mt-2 text-red-500 text-xs italic' />
                            </div>

                        </div>



                        <div className="flex flex-wrap -mx-3 mb-6">

                            <div className="w-full md:w-1/2 px-3 my-5 md:mb-0">
                                <label htmlFor="stock" className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>Stock</label>
                                <Field type="number" min="0" name="stock" id="stock" required className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" />
                                <ErrorMessage name="stock" component="div" className='mt-2 text-red-500 text-xs italic' />
                            </div>

                            <div className="w-full md:w-1/2 px-3 my-5 md:mb-0">
                                <label htmlFor="price" className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>Precio</label>
                                <Field type="number" step="0.01" name="price" id="price" required className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" />
                                <ErrorMessage name="price" component="div" className='mt-2 text-red-500 text-xs italic' />
                            </div>

                        </div>

                        <div className="flex flex-wrap -mx-3 mb-6">
                            <div className="w-full px-3">
                                <label htmlFor="thumbnail" className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>URL de Imagen</label>
                                <Field type="text" step="0.01" name="thumbnail" id="thumbnail" required className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" />
                                <ErrorMessage name="thumbnail" component="div" className='mt-2 text-red-500 text-xs italic' />
                            </div>
                        </div>


                        <div className="flex flex-wrap -mx-3 ">
                            <div className="w-full px-3 flex justify-between	">
                                <button type="reset" className='bg-transparent hover:bg-indigo-500 text-blue-700 font-semibold hover:text-white py-1 px-2 border border-indigo-500 hover:border-transparent rounded text-sm'>Resetear formulario</button>
                                <button type="submit" className='bg-indigo-900 hover:bg-indigo-700 text-white font-bold py-2 px-10 border border-indigo-900 rounded'>Crear producto</button>
                            </div>
                        </div>

                    </Form>
                )
                }
            </Formik>
        </section>
    )
}




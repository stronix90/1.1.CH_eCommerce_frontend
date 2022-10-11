import Link from "next/link";

const ProductItem = ({ product }) => {

    return (
        <Link href={`/product/${product.id}`}>
            <div className="flex flex-col justify-between overflow-hidden w-full max-w-sm bg-white/50 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 cursor-pointer duration-300 hover:-translate-y-1 hover:shadow-xl hover:scale-105">
                <figure className="p-4 rounded-t-lg bg-white shadow-md" >
                    {product.thumbnail && <img src={product.thumbnail} alt={product.title} className="aspect-square object-scale-down" />}
                </figure>
                <div className="p-5">
                    <h5 className="text-base font-semibold tracking-tight text-gray-900 dark:text-white">{product.title}</h5>
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">{product.category}</p>
                    <div className="flex justify-end    mt-4">
                        <span className="text-gray-600 font-bold text-sm dark:text-white">${product.price}</span>
                    </div>
                </div>
            </div>
        </Link>
    )
};

export default ProductItem;

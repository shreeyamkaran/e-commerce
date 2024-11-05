import { FaStar } from "react-icons/fa";
import { FaCartPlus } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";

export default function ProductCard({ id, image, title, price, ratings }) {
    const dispatch = useDispatch();
    const handleCart = async () => {
        const response = await fetch(`https://fakestoreapi.com/products/${id}`);
        const product = await response.json();
        dispatch(addToCart({ product }));
    }
    return (
        <div className="w-64 rounded-lg shadow-lg flex flex-col justify-between gap-4 p-4">
            <div className="flex justify-center">
                <img src={ image } alt="PRODUCT IMAGE" className="w-40 h-40 object-contain" />
            </div>
            <div className="font-extrabold text-xl">
                <p>{ title }</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
                <p>$&nbsp;{ price }</p>
                <p className="flex justify-end items-center"><FaStar className="text-yellow-400" />&nbsp;{ ratings }</p>
                <button className="p-1 border-2 rounded-lg">View more</button>
                <button className="p-1 bg-yellow-400 flex justify-center items-center rounded-lg text-xl" onClick={ handleCart }><FaCartPlus /></button>
            </div>
        </div>
    );
}
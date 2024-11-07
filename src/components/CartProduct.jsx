import { FaStar } from "react-icons/fa";
import { FaMinus } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { addToCart, clearItemFromCart, removeFromCart } from "../redux/cartSlice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";

export default function CartProduct({ product }) {
    const [quantity, setQuantity] = useState(window.localStorage.getItem(product.id) ? Number(window.localStorage.getItem(product.id)) : 0);
    const dispatch = useDispatch();
    const addItemToCart = () => {
        dispatch(addToCart({ product }));
        setQuantity(window.localStorage.getItem(product.id));
        toast.success("Item added to cart");
    }
    const removeItemFromCart = () => {
        dispatch(removeFromCart({ product }));
        setQuantity(window.localStorage.getItem(product.id));
        toast.success("Item removed from cart");
    }
    const clearItem = () => {
        dispatch(clearItemFromCart({ product }));
        toast.success("Item removed from cart");
    }
    return (
        quantity > 0 &&
        <div className="grid grid-cols-1 sm:grid-cols-[1fr,5fr] gap-4 p-4 shadow-lg">
            <div>
                <img src={ product.image } alt="PRODUCT IMAGE" className="w-40 h-40 object-contain" />
            </div>
            <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                    <p className="text-2xl font-bold">{ product.title }</p>
                    <p className="text-justify">{ product.description }</p>
                </div>
                <div className="flex justify-between text-xl font-bold">
                    <div className="flex items-center gap-4">
                        <p>$&nbsp;{ product.price }</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <button className="bg-red-400 p-2 rounded-lg mr-4" onClick={ clearItem }><MdDelete /></button>
                        <button className="bg-yellow-400 p-2 rounded-lg" onClick={ removeItemFromCart }><FaMinus /></button>
                        <p>{ quantity }</p>
                        <button className="bg-yellow-400 p-2 rounded-lg" onClick={ addItemToCart }><FaPlus /></button>
                    </div>
                </div>
            </div>
        </div>
    );
}
import { FaMinus, FaPlus, FaStar } from "react-icons/fa";
import { FaCartPlus } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addToCart, removeFromCart } from "../redux/cartSlice";
import toast from "react-hot-toast";
import { useState } from "react";

export default function ProductCard({ product }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const token = useSelector(state => state.auth.token);
    const [quantity, setQuantity] = useState(window.localStorage.getItem(product.id) ? Number(window.localStorage.getItem(product.id)) : 0);
    const describeProductDetails = () => {
        navigate(`/products/${ product.id }`);
    }
    const addItemToCart = () => {
        if(!token) {
            navigate("/auth");
            toast.error("Please login to add products to cart");
            return;
        }
        dispatch(addToCart({ product }));
        setQuantity(window.localStorage.getItem(product.id));
        toast.success("Item added to cart");
    }
    const removeItemFromCart = () => {
        dispatch(removeFromCart({ product }));
        setQuantity(window.localStorage.getItem(product.id));
        toast.success("Item removed from cart");
    }
    return (
        <div className="w-64 rounded-lg shadow-lg flex flex-col justify-between gap-4 p-4">
            <div className="flex justify-center">
                <img src={ product.image } alt="PRODUCT IMAGE" className="w-40 h-40 object-contain" />
            </div>
            <div className="font-extrabold text-xl">
                <p>{ product.title }</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
                <p>$&nbsp;{ product.price }</p>
                <p className="flex justify-end items-center"><FaStar className="text-yellow-400" />&nbsp;{ product.rating.rate }</p>
                <button className="p-1 border-2 rounded-lg" onClick={ describeProductDetails }>View more</button>
                {
                    quantity > 0 ? (
                        <div className="flex items-center gap-4">
                            <button className="bg-yellow-400 p-2 rounded-lg" onClick={ removeItemFromCart }><FaMinus /></button>
                            <div className="font-bold">{ quantity }</div>
                            <button className="bg-yellow-400 p-2 rounded-lg" onClick={ addItemToCart }><FaPlus /></button>
                        </div>
                    ) : (
                        <button className="p-1 bg-yellow-400 flex justify-center items-center rounded-lg text-xl" onClick={ addItemToCart }><FaCartPlus /></button>
                    )
                }
            </div>
        </div>
    );
}
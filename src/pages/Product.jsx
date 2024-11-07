import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaCartPlus, FaMinus, FaPlus, FaStar } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import LoadingPlaceholder from "../components/LoadingPlaceHolder";
import { addToCart, removeFromCart } from "../redux/cartSlice";
import { useDispatch, useSelector } from "react-redux";

export default function Product() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const token = useSelector(state => state.auth.token);
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(false);
    const [quantity, setQuantity] = useState(window.localStorage.getItem(id) ? Number(window.localStorage.getItem(id)) : 0);
    const addItemToCart = () => {
        if(!token) {
            navigate("/auth");
            toast.error("Please login to add product to cart");
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
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                setLoading(true);
                const response = await fetch(`https://fakestoreapi.com/products/${ id }`);
                const data = await response.json();
                setProduct(data);
            }
            catch(error) {
                toast.error(error);
            }
            finally {
                setLoading(false);
            }
        }
        fetchProduct();
    }, []);
    return (
        <div>
            <Navbar />
            <div className="my-2 sm:m-8 text-center sm:text-left">
                <p className="text-4xl sm:text-6xl font-bold sm:font-normal">Product Description</p>
            </div>
            {
                loading ? (
                    Array(1).fill().map((_, index) => {
                        return (
                            <div key={ index } className="flex justify-center">
                                <LoadingPlaceholder />
                            </div>
                        );
                    })
                ) : (
                    product &&
                    <div className="grid grid-cols-1 sm:grid-cols-[1fr,5fr] gap-4 p-4 sm:p-8">
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
                                    <p className="flex items-center"><FaStar className="text-yellow-400" />&nbsp;{ product.rating.rate }</p>
                                </div>
                                {
                                    quantity > 0 ? (
                                        <div className="flex items-center gap-4">
                                            <button className="bg-yellow-400 p-2 rounded-lg" onClick={ removeItemFromCart }><FaMinus /></button>
                                            <div className="font-bold">{ quantity }</div>
                                            <button className="bg-yellow-400 p-2 rounded-lg" onClick={ addItemToCart }><FaPlus /></button>
                                        </div>
                                    ) : (
                                        <button className="p-2 w-1/6 bg-yellow-400 flex justify-center items-center rounded-lg text-xl" onClick={ addItemToCart }><FaCartPlus /></button>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    );
}
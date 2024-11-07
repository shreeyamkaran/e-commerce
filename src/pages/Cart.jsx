import { useDispatch, useSelector } from "react-redux";
import { MdOutlineShoppingCartCheckout } from "react-icons/md";
import { MdDeleteForever } from "react-icons/md";
import CartProduct from "../components/CartProduct";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { clearCart } from "../redux/cartSlice";
import toast from "react-hot-toast";

export default function Cart() {
    let items = useSelector(state => state.cart.items);
    let count = useSelector(state => state.cart.count);
    let amount = useSelector(state => state.cart.amount);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const goToHomePage = () => {
        navigate("/");
    }
    const clearCartItems = () => {
        dispatch(clearCart());
        toast.success("Your cart is now empty");
    }
    return (
        <div>
            <Navbar />
            {
                count > 0 ? (
                    <div className="p-4 grid grid-cols-1 md:grid-cols-[3fr,1fr] gap-8">
                        <div className="flex flex-col gap-4">
                            <div className="flex justify-between items-center">
                                <div className="text-4xl sm:text-6xl font-bold sm:font-normal">Your Cart</div>
                                <button className="px-4 py-2 bg-red-400 rounded-lg flex items-center gap-2 font-bold" onClick={ clearCartItems }><MdDeleteForever className="text-xl" />Clear Cart</button>
                            </div>
                            {
                                items.map(item => {
                                    return (
                                        <CartProduct key={ item.id } product={ item } />
                                    );
                                })
                            }
                        </div>
                        <div className="border-l-2 p-4">
                            <div className="text-4xl sm:text-6xl font-bold sm:font-normal">Billing</div>
                            <div className="my-4 text-xl flex flex-col gap-4">
                                <p>Total number of items: <span className="font-bold">{ count }</span></p>
                                <p>Total amount: <span className="font-bold">$&nbsp;{ amount.toFixed(2) }</span></p>
                            </div>
                            <div>
                                <button className="bg-yellow-400 px-4 py-2 rounded-lg flex items-center gap-2 font-bold"><MdOutlineShoppingCartCheckout className="text-xl" />Checkout</button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col gap-8 items-center mt-20">
                        <p className="text-6xl">Your cart is empty</p>
                        <button className="bg-yellow-400 px-4 py-2 rounded-lg" onClick={ goToHomePage }>Explore products</button>
                    </div>
                )
            }
        </div>
    );
}
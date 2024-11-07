import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { removeToken } from "../redux/authSlice";
import toast from "react-hot-toast";
import { resetState } from "../redux/cartSlice";

export default function Navbar() {
    const token = useSelector(state => state.auth.token);
    const count = useSelector(state => state.cart.count);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleLogout = () => {
        dispatch(removeToken());
        dispatch(resetState());
        toast.success("Logout successful");
        navigate("/auth");
    }
    return (
        <div className="bg-black text-white flex justify-between items-center p-4">
            <NavLink to="/" className="text-4xl text-yellow-400 font-bold">
                Fake Store
            </NavLink>
            {
                token ? (
                    <div className="flex items-center gap-8 text-xl ">
                        <NavLink to="/cart" className="relative">
                            <FaShoppingCart />
                            {
                                count > 0 && <div className="bg-red-700 absolute top-[-15px] right-[-15px] rounded-full w-6 h-6 text-sm flex justify-center items-center">{ count }</div>
                            }
                        </NavLink>
                        <button onClick={ handleLogout }>Logout</button>
                    </div>
                ) : (
                    <div className="text-xl">
                        <NavLink to="/auth">Login</NavLink>
                    </div>
                )
            }
        </div>
    );
}
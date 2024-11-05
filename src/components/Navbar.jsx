import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { removeToken } from "../redux/authSlice";
import toast from "react-hot-toast";

export default function Navbar() {
    const token = useSelector(state => state.auth.token);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleLogout = () => {
        dispatch(removeToken());
        toast.success("Logout successful");
        navigate("/auth");
    }
    return (
        <div className="bg-black text-white flex justify-between items-center p-4">
            <NavLink to="/" className="text-4xl text-yellow-400">
                Brand Name
            </NavLink>
            {
                token ? (
                    <div className="flex items-center gap-8 text-xl">
                        <NavLink to="/cart"><FaShoppingCart /></NavLink>
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
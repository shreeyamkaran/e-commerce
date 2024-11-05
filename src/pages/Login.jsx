import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addToken } from "../redux/authSlice.js";
import { useState } from "react";
import toast from "react-hot-toast";
import { BarLoader } from "react-spinners";

export default function Login() {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const handleLogin = async ({ username, password }) => {
        try {
            setLoading(true);
            const response = await fetch(`https://fakestoreapi.com/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ username, password })
            });
            if(response.status != 200) {
                toast.error("Invalid username or password");
            }
            else {
                const { token } = await response.json();
                dispatch(addToken({ token }));
                navigate("/");
                toast.success("Login successful");
            }
        }
        catch(error) {
            toast.error(error);
        }
        finally {
            setLoading(false);
        }
    }
    return (
        <div className="grid grid-cols-2 h-[100vh]">
            <div className="bg-yellow-400 flex flex-col gap-4 justify-center p-4">
                <p className="text-6xl">Fake Store</p>
                <p className="text-2xl">The Ultimate Fake Store - Real Deals, Fake Products!</p>
                <button className="bg-black text-white w-1/4 p-2 rounded-lg" disabled={ loading } onClick={() => navigate("/")}>Explore</button>
            </div>
            <div className="flex flex-col gap-8 justify-center items-center">
                <p className="text-3xl">Login to your account</p>
                <form onSubmit={ handleSubmit(handleLogin) } className="flex flex-col items-center gap-4">
                    <input type="text" { ...register("username", { required: true }) } disabled={ loading } className="px-4 py-2 outline-none border-2 rounded-lg" placeholder="username" />
                    {errors.username && <p className="text-red-700 mr-auto">Username is required</p>}
                    <input type="password" { ...register("password", { required: true }) } disabled={ loading } className="px-4 py-2 outline-none border-2 rounded-lg" placeholder="password" />
                    {errors.password && <p className="text-red-700 mr-auto">Password is required</p>}
                    {
                        loading ? (
                            <BarLoader />
                        ) : (
                            <input type="submit" className="cursor-pointer bg-yellow-400 w-1/4 p-2 rounded-lg" value="Login" />
                        )
                    }
                </form>
            </div>
        </div>
    );
}
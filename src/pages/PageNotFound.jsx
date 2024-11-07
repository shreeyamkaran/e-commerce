import { useNavigate } from "react-router-dom";

export default function PageNotFound() {
    const navigate = useNavigate();
    const handleNavigation = () => {
        navigate("/");
    }
    return (
        <div className="h-[100vh] flex flex-col gap-4 justify-center items-center">
            <p className="text-9xl text-gray-200">404</p>
            <p>The page you are looking for could not be found.</p>
            <button className="bg-yellow-400 px-4 py-2 rounded-lg" onClick={ handleNavigation }>Home Page</button>
        </div>
    );
}
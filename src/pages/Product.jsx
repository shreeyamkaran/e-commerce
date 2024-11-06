import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaStar } from "react-icons/fa";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import LoadingPlaceholder from "../components/LoadingPlaceHolder";

export default function Product() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(false);
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
            <div className="m-8">
                <p className="text-6xl">Product Description</p>
            </div>
            {
                loading ? (
                    Array(1).fill().map((_, index) => {
                        return (
                            <div key={index} className="flex justify-center">
                                <LoadingPlaceholder key={index} />
                            </div>
                        );
                    })
                ) : (
                    product &&
                    <div className="grid grid-cols-[1fr,5fr] gap-4 p-8">
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
                                <div>
                                    <button className="bg-yellow-400 p-2 rounded-lg">Add to cart</button>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    );
}
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";
import LoadingPlaceholder from "../components/LoadingPlaceHolder";

export default function Home() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                const response = await fetch(`https://fakestoreapi.com/products`);
                const data = await response.json();
                setProducts(data);
            }
            catch(error) {
                toast.error(error);
            }
            finally {
                setLoading(false);
            }
        }
        fetchProducts();
    }, []);
    return (
        <div>
            <Navbar />
            <div className="p-4 flex justify-center gap-4 flex-wrap">
                {
                    loading ? (
                        Array(3).fill().map((_, index) => {
                            return (
                                <LoadingPlaceholder key={index} />
                            );
                        })
                    ) : (
                        products && products.map(product => {
                            return (
                                <ProductCard key={ product.id } id={ product.id } image={ product.image } title={ product.title } price={ product.price } ratings={ product.rating.rate } />
                            );
                        })
                    )
                }
            </div>
        </div>
    );
}
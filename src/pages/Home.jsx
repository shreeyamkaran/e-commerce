import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";
import LoadingPlaceholder from "../components/LoadingPlaceHolder";
import FilterProduct from "../components/FilterProduct";

export default function Home() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
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
    const filteredProducts = products.filter(product => {
        if(product.title.toLowerCase().includes(searchTerm.toLowerCase())) {
            if(selectedCategory == "") {
                return true;
            }
            else {
                if(selectedCategory == product.category) {
                    return true;
                }
            }
        }        
    });
    return (
        <div>
            <Navbar />
            {
                !loading && <FilterProduct searchTerm={ searchTerm } setSearchTerm={ setSearchTerm } selectedCategory={ selectedCategory } setSelectedCategory={ setSelectedCategory } />
            }
            <div className="p-4 flex justify-center gap-4 flex-wrap">
                {
                    loading ? (
                        Array(3).fill().map((_, index) => {
                            return (
                                <LoadingPlaceholder key={ index } />
                            );
                        })
                    ) : (
                        filteredProducts && filteredProducts.map(product => {
                            return (
                                <ProductCard key={ product.id } product={ product } />
                            );
                        })
                    )
                }
            </div>
        </div>
    );
}
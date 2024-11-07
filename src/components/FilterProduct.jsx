import { FaAngleDown } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";

export default function FilterProduct({ searchTerm, setSearchTerm, selectedCategory, setSelectedCategory }) {
    const resetFilters = () => {
        setSearchTerm("");
        setSelectedCategory("");
    }
    return (
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 px-2 sm:px-10 py-2 bg-slate-50">
            <div className="relative flex justify-center">
                <input type="text" placeholder="Search products" className="w-full px-12 py-2 border-2 rounded-lg outline-none" value={ searchTerm } onChange={ event => setSearchTerm(event.target.value) } />
                <FaSearch className="absolute top-1/2 left-4 sm:left-4 translate-y-[-50%] text-gray-400" />
            </div>
            <div className="flex items-center gap-4">
                <div className="relative">
                    <select className="text-center bg-yellow-400 border-2 border-yellow-400 pl-4 pr-4 py-2 rounded-lg outline-none appearance-none" value={ selectedCategory } onChange={ event => setSelectedCategory(event.target.value) }>
                        <option value="">All Products</option>
                        <option value="men's clothing">Men's Clothing</option>
                        <option value="women's clothing">Women's Clothing</option>
                        <option value="jewelery">Jewelery</option>
                        <option value="electronics">Electronics</option>
                    </select>
                    <FaAngleDown className="pointer-events-none absolute top-1/2 translate-y-[-50%] left-4" />
                </div>
                <div>
                    <button className="bg-black text-white px-4 py-2 rounded-lg border-2 border-black" onClick={ resetFilters }>Reset Filters</button>
                </div>
            </div>
        </div>
    );
}
import { FaStar } from "react-icons/fa";
import { FaMinus } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";

export default function CartProduct({ image, title, description, price, ratings, quantity }) {
    return (
        <div className="grid grid-cols-[1fr,5fr] gap-4 p-4 shadow-lg">
            <div>
                <img src={ image } alt="PRODUCT IMAGE" className="w-40 h-40 object-contain" />
            </div>
            <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                    <p className="text-2xl font-bold">{ title }</p>
                    <p className="text-justify">{ description }</p>
                </div>
                <div className="flex justify-between text-xl font-bold">
                    <div className="flex items-center gap-4">
                        <p>$&nbsp;{ price }</p>
                        <p className="flex items-center"><FaStar className="text-yellow-400" />&nbsp;{ ratings }</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <button className="bg-yellow-400 p-2 rounded-lg"><FaMinus /></button>
                        <p>{ quantity }</p>
                        <button className="bg-yellow-400 p-2 rounded-lg"><FaPlus /></button>
                    </div>
                </div>
            </div>
        </div>
    );
}
import { useSelector } from "react-redux";
import CartProduct from "../components/CartProduct";
import Navbar from "../components/Navbar";

export default function Cart() {
    let items = useSelector(state => state.cart.items);
    let count = useSelector(state => state.cart.count);
    let amount = useSelector(state => state.cart.amount);
    return (
        <div>
            <Navbar />
            <div className="p-4 grid grid-cols-[3fr,1fr] gap-8">
                <div className="flex flex-col gap-4">
                    <div className="text-6xl">Your Cart</div>
                    {
                        items.map(item => {
                            return (
                                <CartProduct key={ item.id } image={ item.image } title={ item.title } description={ item.description } price={ item.price } ratings={ item.rating.rate } quantity={ item.quantity } />
                            );
                        })
                    }
                </div>
                <div className="border-l-2 h-64 p-4">
                    <div className="text-6xl">Billing</div>
                    <div className="my-4 text-xl flex flex-col gap-4">
                        <p>Total number of items: <span className="font-bold">{ count }</span></p>
                        <p>Total amount: <span className="font-bold">$&nbsp;{ amount.toFixed(2) }</span></p>
                    </div>
                    <div>
                        <button className="bg-yellow-400 p-2 rounded-lg">Checkout</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
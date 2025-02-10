import { useState } from "react";
import { useCart } from "../context/CartContext";
import { FaTrash } from "react-icons/fa"; // Import icon delete

const CartPage = () => {
    const { cart, removeFromCart, increaseQuantity, decreaseQuantity } = useCart();
    const [loadingItem, setLoadingItem] = useState(null);

    // Menghitung total harga setelah diskon
    const totalHarga = cart.reduce((total, item) => total + item.finalPrice * item.quantity, 0);

    const handleRemove = (itemId) => {
        setLoadingItem(itemId);
        setTimeout(() => {
            removeFromCart(itemId);
            setLoadingItem(null);
        }, 1000);
    };

    return (
        <div className="max-w-5xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-center mb-6">🛒 Keranjang Belanja</h1>

            <div className="bg-white shadow-lg rounded-lg p-6">
                {cart.length === 0 ? (
                    <p className="text-gray-500 text-center">Keranjang masih kosong.</p>
                ) : (
                    <div>
                        <ul className="space-y-4">
                            {cart.map((item) => (
                                <li 
                                    key={item.id} 
                                    className="flex items-center p-4 border rounded-lg shadow-sm bg-gray-50 relative"
                                >
                                    {/* Gambar Produk */}
                                    <div className="relative">
                                        <img 
                                            src={item.image} 
                                            alt={item.name} 
                                            className="w-20 h-20 object-cover rounded-md"
                                        />
                                        {item.discount > 0 && (
                                            <span className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-bl-md">
                                                -{item.discount}%
                                            </span>
                                        )}
                                    </div>

                                    <div className="flex-1 ml-4">
                                        <h3 className="text-lg font-semibold">{item.name}</h3>
                                        
                                        {/* Harga */}
                                        <div className="flex items-center space-x-2">
                                            <p className="text-red-500 line-through text-sm">
                                                Rp {item.price.toLocaleString("id-ID")}
                                            </p>
                                            <p className="text-sm">
                                                Rp {item.finalPrice.toLocaleString("id-ID")}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Tombol Quantity */}
                                    <div className="flex items-center space-x-3">
                                        <button 
                                            onClick={() => decreaseQuantity(item.id)} 
                                            className="bg-gray-300 text-gray-700 px-3 py-1 rounded-md hover:bg-gray-400 transition"
                                        >
                                            -
                                        </button>
                                        <span className="text-lg font-semibold">{item.quantity}</span>
                                        <button 
                                            onClick={() => increaseQuantity(item.id)} 
                                            className="bg-gray-300 text-gray-700 px-3 py-1 rounded-md hover:bg-gray-400 transition"
                                        >
                                            +
                                        </button>
                                    </div>

                                    {/* Hapus Item */}
                                    <button 
                                        onClick={() => handleRemove(item.id)}
                                        className="ml-4 text-red-500 hover:text-red-700 transition"
                                        disabled={loadingItem === item.id}
                                    >
                                        {loadingItem === item.id ? "⏳" : <FaTrash />}
                                    </button>
                                </li>
                            ))}
                        </ul>

                        {/* Total Harga & Tombol Checkout */}
                        <div className="mt-6 flex justify-between items-center border-t pt-4">
                            <h2 className="text-xl font-bold">Total: Rp {totalHarga.toLocaleString("id-ID")}</h2>
                            <button 
                                className="bg-green-500 text-white px-5 py-2 rounded-lg hover:bg-green-600 transition"
                            >
                                Checkout
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CartPage;

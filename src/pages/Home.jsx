import { useState } from "react";
import { useCart } from "../context/CartContext";
import { FaShoppingCart, FaSearch, FaStar } from "react-icons/fa";
import { motion } from "framer-motion"; 
import product1 from "../images/product1.jpg";
import product2 from "../images/product2.jpg";
import product3 from "../images/product3.jpg";
import product4 from "../images/product4.jpg";
import product5 from "../images/product5.jpg";

const Home = () => {
    const { addToCart } = useCart();
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(null);

    const products = [
        { id: 1, name: "Kaos Anak Motif Kartun", description: "Kaos anak berbahan katun lembut dengan motif kartun yang lucu.", price: 75000, image: product1, stock: 50, discount: 10, rating: 4.5, sold: 250 },
        { id: 2, name: "Dress Anak Bunga", description: "Dress anak perempuan dengan motif bunga cantik dan bahan nyaman.", price: 120000, image: product2, stock: 30, discount: 15, rating: 4.7, sold: 320 },
        { id: 3, name: "Setelan Anak Casual", description: "Setelan anak dengan desain casual dan bahan yang nyaman dipakai.", price: 135000, image: product3, stock: 20, discount: 5, rating: 4.2, sold: 180 },
        { id: 4, name: "Baju Koko Anak", description: "Baju koko anak dengan bahan adem, cocok untuk acara formal dan ibadah.", price: 95000, image: product4, stock: 40, discount: 10, rating: 4.6, sold: 290 },
        { id: 5, name: "Baju Tidur Anak", description: "Baju tidur anak dengan bahan katun yang lembut dan nyaman.", price: 80000, image: product5, stock: 15, discount: 20, rating: 4.3, sold: 150 },
    ];

    // Filter produk berdasarkan pencarian
    const filteredProducts = products.filter((product) =>
        product.name.toLowerCase().includes(search.toLowerCase())
    );

    // Fungsi untuk menangani penambahan ke keranjang dengan loading
    const handleAddToCart = (product) => {
        setLoading(product.id);
        setTimeout(() => {
            addToCart(product);
            setLoading(null);
        }, 1000); // Simulasi loading 1 detik
    };

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-center mb-8">🛍️ Pakaian Anak</h1>

            {/* Pencarian */}
            <div className="mb-6 flex items-center justify-center">
                <div className="relative w-full max-w-md">
                    <input
                        type="text"
                        placeholder="Cari produk..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>
            </div>

            {/* Grid Layout */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                {filteredProducts.map((product) => {
                    const discountedPrice = product.price - (product.price * product.discount) / 100;
                    
                    return (
                        <motion.div
                            key={product.id}
                            className="bg-white shadow-md rounded-lg p-4 flex flex-col transition-all"
                            whileHover={{ scale: 1.05 }} // Animasi hover menggunakan Framer Motion
                        >
                            {/* Gambar Produk dengan Badge Diskon */}
                            <div className="relative">
                                <img src={product.image} alt={product.name} className="w-full h-48 object-cover rounded-md" />
                                {product.discount > 0 && (
                                    <span className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-lg">
                                        -{product.discount}%
                                    </span>
                                )}
                            </div>

                            {/* Informasi Produk */}
                            <div className="mt-4 flex-1 flex flex-col">
                                <h3 className="text-sm font-semibold text-gray-800">{product.name}</h3>
                                <p className="text-xs text-gray-500">{product.description}</p>

                                {/* Harga */}
                                <div className="mt-2">
                                    {product.discount > 0 && (
                                        <p className="text-xs text-gray-400 line-through">Rp {product.price.toLocaleString("id-ID")}</p>
                                    )}
                                    <p className="text-base font-bold text-green-600">Rp {discountedPrice.toLocaleString("id-ID")}</p>
                                </div>

                                {/* Rating dan Terjual */}
                                <div className="mt-2 flex items-center justify-between">
                                    <div className="flex items-center">
                                        <FaStar className="text-yellow-400" />
                                        <span className="ml-1 text-gray-700 text-sm">{product.rating}</span>
                                    </div>
                                    <span className="text-xs text-gray-600">{product.sold}+ terjual</span>
                                </div>

                                {/* Tombol Tambah ke Keranjang */}
                                <div className="mt-auto">
                                    <button
                                        onClick={() => handleAddToCart(product)}
                                        className="w-full mt-4 flex items-center justify-center bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-all text-sm font-semibold"
                                        disabled={loading === product.id}
                                    >
                                        {loading === product.id ? (
                                            <span className="animate-spin border-t-2 border-white rounded-full w-5 h-5 mr-2"></span>
                                        ) : (
                                            <FaShoppingCart className="mr-2" />
                                        )}
                                        {loading === product.id ? "Menambahkan..." : "Tambah ke Keranjang"}
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </div>
    );
};

export default Home;

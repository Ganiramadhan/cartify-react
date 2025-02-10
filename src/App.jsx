import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { CartProvider, useCart } from "../src/context/CartContext";
import Home from "../src/pages/Home";
import CartPage from "./pages/Cart";
import { FaShoppingCart } from "react-icons/fa";

const Navbar = () => {
    const { cart } = useCart();

    return (
        <nav className="bg-white shadow-md py-4">
            <div className="container mx-auto flex items-center justify-between px-6">
                {/* Logo */}
                <Link to="/" className="text-xl font-bold text-green-600 flex items-center">
                    🛍️ <span className="ml-2">Ganipedia</span>
                </Link>

                {/* Menu */}
                <div className="space-x-6 flex items-center">
                    <Link to="/" className="text-green-700 transition">Home</Link>
                    
                    {/* Icon Keranjang dengan Badge */}
                    <Link to="/cart" className="relative text-gray-700 hover:text-green-600 transition">
                        <FaShoppingCart className="text-2xl" />
                        {cart.length > 0 && (
                            <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                                {cart.length}
                            </span>
                        )}
                    </Link>
                </div>
            </div>
        </nav>
    );
};

function App() {
    return (
        <CartProvider>
            <Router>
                <div className="min-h-screen bg-gray-50">
                    <Navbar />
                    <main className="container mx-auto p-4">
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/cart" element={<CartPage />} />
                        </Routes>
                    </main>
                </div>
            </Router>
        </CartProvider>
    );
}

export default App;

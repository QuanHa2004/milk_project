import { useNavigate } from 'react-router-dom';

import Header from '../../component/customer/header';
import Footer from '../../component/customer/footer';

import CartItem from '../../component/customer/cart-item';
import CartSummary from '../../component/customer/cart-summary';

import useCart from "../../context/cart-context";

export default function Cart() {
    const navigate = useNavigate();
    const { cartItems, setCartItems } = useCart();


    const handleCheckOut = async () => {
        if (cartItems.length === 0) {
            alert("Giỏ hàng trống! Vui lòng thêm sản phẩm trước khi thanh toán.");
            return;
        }

        const token = localStorage.getItem("access_token");

        // Chưa login → lưu redirect trước
        if (!token) {
            localStorage.setItem("post_login_redirect", "/carts");
            navigate("/login");
            return;
        }

        try {
            const res = await fetch("http://localhost:8000/current_user", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!res.ok) {
                // Token hết hạn hoặc không hợp lệ
                localStorage.setItem("post_login_redirect", "/carts");
                navigate("/login");
                return;
            }

            // Nếu token hợp lệ → đi thẳng tới checkout
            navigate("/checkout");

        } catch (err) {
            console.error(err);
            alert("Đã xảy ra lỗi. Vui lòng thử lại!");
        }
    };


    return (
        <div className="bg-white dark:bg-background-dark font-display text-text-color">
            <div className="relative flex h-auto min-h-screen w-full flex-col group/design-root overflow-x-hidden">
                <div className="layout-container flex h-full grow flex-col">
                    <Header />
                    <main className="flex-1 px-4 sm:px-6 lg:px-8 py-10 mt-10">
                        <section classname="px-4 md:px-10 lg:px-40 py-5">
                            <div className="max-w-6xl mx-auto">
                                <div className="flex flex-wrap justify-between gap-3 p-4">
                                    <p className="text-gray-900 dark:text-white text-4xl font-black leading-tight tracking-[-0.033em] min-w-72">
                                        Giỏ hàng của bạn
                                    </p>
                                </div>
                                <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-12">
                                    <div className="lg:col-span-2 space-y-6">
                                        <div className="hidden md:grid grid-cols-7 gap-4 px-4 py-2 border-b border-gray-200 dark:border-gray-700 text-sm font-medium text-gray-500 dark:text-gray-400 items-center">
                                            <div className="flex justify-center">
                                                <input
                                                    type="checkbox"
                                                    className="w-5 h-5 accent-[#8b4513] cursor-pointer"
                                                    checked={cartItems.length > 0 && cartItems.every(item => item.selected)}
                                                    onChange={() => {
                                                        const newValue = !cartItems.every(item => item.selected);
                                                        setCartItems(prev =>
                                                            prev.map(item => ({ ...item, selected: newValue }))
                                                        );
                                                    }}
                                                />
                                            </div>
                                            <div className="col-span-3 text-center">Sản phẩm</div>
                                            <div className="text-center">Giá</div>
                                            <div className="text-center">Số lượng</div>
                                            <div className="text-center">Tổng cộng</div>
                                        </div>
                                        <CartItem />

                                        <div className="flex px-4 py-3 justify-start">
                                            <div>
                                                <button
                                                    className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-transparent text-primary text-sm font-bold leading-normal tracking-[0.015em] border-2 border-primary hover:bg-primary/10"
                                                    onClick={() => navigate('/products')}
                                                >
                                                    <span className="truncate">Tiếp tục mua hàng</span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="lg:col-span-1">
                                        <div className="bg-white dark:bg-background-dark p-6 rounded-lg shadow-sm sticky top-10">
                                            <h3 className="text-xl font-bold text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-4">
                                                Tóm tắt đơn hàng
                                            </h3>
                                            <CartSummary />
                                            <div>
                                                <button
                                                    className="mt-6 w-full flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-6 bg-primary text-white text-base font-bold leading-normal tracking-[0.015em] hover:bg-primary/90"
                                                    onClick={handleCheckOut}
                                                >
                                                    <span className="truncate">Tiến hành thanh toán</span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </main>
                    <Footer />
                </div>
            </div>
        </div>
    )
}

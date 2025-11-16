import { useNavigate } from 'react-router-dom';

import Header from '../../component/customer/header';
import Footer from '../../component/customer/footer';

import CartItem from '../../component/customer/cart-item';
import CartSummary from '../../component/customer/cart-summary';

export default function Cart() {
    const navigate = useNavigate();

    return (
        <div class="bg-white dark:bg-background-dark font-display text-text-color">
            <div class="relative flex h-auto min-h-screen w-full flex-col group/design-root overflow-x-hidden">
                <div class="layout-container flex h-full grow flex-col">
                    <Header/>
                    <main class="flex-1 px-4 sm:px-6 lg:px-8 py-10 mt-10">
                        <div class="max-w-6xl mx-auto">
                            <div class="flex flex-wrap justify-between gap-3 p-4">
                                <p
                                    class="text-gray-900 dark:text-white text-4xl font-black leading-tight tracking-[-0.033em] min-w-72">
                                    Giỏ hàng của bạn</p>
                            </div>
                            <div class="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-12">
                                <div class="lg:col-span-2 space-y-6">
                                    <div
                                        class="hidden md:grid grid-cols-6 gap-4 px-4 py-2 border-b border-gray-200 dark:border-gray-700 text-sm font-medium text-gray-500 dark:text-gray-400">
                                        <div class="col-span-3">Sản phẩm</div>
                                        <div class="text-center">Giá</div>
                                        <div class="text-center">Số lượng</div>
                                        <div class="text-right">Tổng cộng</div>
                                    </div>
                                    <CartItem/>

                                    <div class="flex px-4 py-3 justify-start">
                                        <div>
                                            <button
                                                class="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-transparent text-primary text-sm font-bold leading-normal tracking-[0.015em] border-2 border-primary hover:bg-primary/10" onClick={()=>navigate('/products')}>
                                                <span class="truncate">Tiếp tục mua hàng</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div class="lg:col-span-1">
                                    <div class="bg-white dark:bg-background-dark p-6 rounded-lg shadow-sm sticky top-10">
                                        <h3
                                            class="text-xl font-bold text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-4">
                                            Tóm tắt đơn hàng</h3>
                                        <CartSummary/>
                                        <div>
                                            <button
                                                class="mt-6 w-full flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-6 bg-primary text-white text-base font-bold leading-normal tracking-[0.015em] hover:bg-primary/90" onClick={() => navigate('/checkout')}>
                                                <span class="truncate">Tiến hành thanh toán</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </main>
                    <Footer/>
                </div>
            </div>
        </div>
    )
}
import Header from "../../component/customer/header"
import Footer from "../../component/customer/footer"

export default function Support() {
    return (
        <div className="bg-[#f9fafb] dark:bg-[#111827] font-display text-[#111618] dark:text-gray-200 min-h-screen flex flex-col">

            <Header />

            <main className="flex-grow">
                {/* --- HERO SECTION --- */}
                {/* Sử dụng nền gradient nhẹ kết hợp màu xanh pastel để làm dịu mắt */}
                <div className="relative bg-gradient-to-b from-[rgb(167,199,231)]/30 to-[#f9fafb] dark:from-[#1f2937] dark:to-[#111827] py-16 sm:py-20">
                    <div className="max-w-3xl mx-auto px-4 text-center">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/60 dark:bg-gray-800 border border-[#8b4513]/20 mb-6 backdrop-blur-sm">
                            <span className="w-2 h-2 rounded-full bg-[#8b4513]"></span>
                            <span className="text-[#8b4513] font-bold text-xs uppercase tracking-widest">Trung tâm hỗ trợ 24/7</span>
                        </div>

                        <h1 className="text-4xl md:text-5xl font-black text-[#111618] dark:text-white mb-4 leading-tight">
                            Xin chào, chúng tôi có thể <br />
                            <span>giúp gì cho bạn?</span>
                        </h1>
                        <p className="text-gray-500 dark:text-gray-400 text-lg mb-8">
                            Tìm kiếm câu trả lời hoặc liên hệ trực tiếp với đội ngũ của chúng tôi.
                        </p>

                        {/* Search Bar - Thiết kế nổi bật */}
                        <div className="max-w-xl mx-auto relative group">
                            <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                                <span className="material-symbols-outlined text-[#8b4513] text-2xl">search</span>
                            </div>
                            <input
                                type="text"
                                className="block w-full pl-14 pr-5 py-4 rounded-2xl border-0 bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-[0_4px_20px_rgb(0,0,0,0.08)] focus:ring-2 focus:ring-[#8b4513] transition-all text-base placeholder:text-gray-400"
                                placeholder="Nhập từ khóa (ví dụ: đổi trả, vận chuyển)..."
                            />
                        </div>
                    </div>
                </div>

                {/* --- MAIN CONTENT --- */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">

                        {/* LEFT: FAQ Accordion */}
                        <div className="lg:col-span-7 space-y-8">
                            <div>
                                <h2 className="text-2xl font-bold text-[#111618] dark:text-white mb-6 flex items-center gap-3">
                                    <span className="flex items-center justify-center w-10 h-10 rounded-full bg-[rgb(167,199,231)]/30 text-[#8b4513]">
                                        <span className="material-symbols-outlined">quiz</span>
                                    </span>
                                    Câu hỏi thường gặp
                                </h2>

                                <div className="space-y-4">
                                    {[
                                        { q: "Sữa được giao có đảm bảo độ tươi mới không?", a: "Sữa của chúng tôi được lấy từ các trang trại địa phương hàng ngày và giao trong vòng 24 giờ sau khi vắt để đảm bảo bạn nhận được sản phẩm tươi ngon nhất. Mỗi chai đều có in rõ ngày sản xuất và hạn sử dụng." },
                                        { q: "Thời gian và khu vực giao hàng như thế nào?", a: "Hiện tại chúng tôi giao hàng từ 6:00 sáng đến 10:00 sáng, từ Thứ Ba đến Thứ Bảy. Bạn có thể kiểm tra khu vực hỗ trợ bằng cách nhập mã bưu chính tại trang thanh toán." },
                                        { q: "Tôi có thể thanh toán bằng những hình thức nào?", a: "Chúng tôi chấp nhận tất cả các thẻ tín dụng lớn (Visa, MasterCard), chuyển khoản ngân hàng, ví điện tử (Momo, ZaloPay) và thanh toán khi nhận hàng (COD)." },
                                        { q: "Chính sách đổi trả sản phẩm ra sao?", a: "Do tính chất hàng tươi sống, chúng tôi không chấp nhận trả hàng. Tuy nhiên, nếu sản phẩm có vấn đề về chất lượng, hãy liên hệ trong vòng 24h để được hoàn tiền hoặc gửi bù sản phẩm mới." },
                                    ].map((item, idx) => (
                                        <details key={idx} className="group bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden hover:border-[#8b4513]/30 transition-colors duration-300">
                                            <summary className="flex cursor-pointer items-center justify-between p-5 list-none select-none">
                                                <span className="font-semibold text-[#111618] dark:text-gray-200 group-open:text-[#8b4513] transition-colors text-base">
                                                    {item.q}
                                                </span>
                                                <span className="material-symbols-outlined text-gray-400 group-open:rotate-180 group-open:text-[#8b4513] transition-transform duration-300">
                                                    expand_more
                                                </span>
                                            </summary>
                                            <div className="px-5 pb-5 pt-0 text-gray-600 dark:text-gray-400 text-sm leading-relaxed border-t border-transparent group-open:border-gray-100 dark:group-open:border-gray-700 group-open:pt-4 animate-fade-in">
                                                {item.a}
                                            </div>
                                        </details>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* RIGHT: Contact Form & Info */}
                        <div className="lg:col-span-5">
                            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 sm:p-8 shadow-lg shadow-gray-200/50 dark:shadow-none border border-gray-100 dark:border-gray-700 sticky top-24">
                                <div className="mb-6 border-b border-gray-100 dark:border-gray-700 pb-4">
                                    <h3 className="text-xl font-bold text-[#111618] dark:text-white">Gửi tin nhắn cho chúng tôi</h3>
                                    <p className="text-gray-500 text-sm mt-1">Điền thông tin bên dưới, chúng tôi sẽ phản hồi sớm nhất.</p>
                                </div>

                                <form className="space-y-5">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="col-span-2 sm:col-span-1">
                                            <label className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5 block" htmlFor="name">Họ tên</label>
                                            <input className="w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700/50 focus:border-[#8b4513] focus:ring-1 focus:ring-[#8b4513] transition-all py-2.5 px-3 text-sm" id="name" placeholder="Nguyễn Văn A" type="text" />
                                        </div>
                                        <div className="col-span-2 sm:col-span-1">
                                            <label className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5 block" htmlFor="email">Email</label>
                                            <input className="w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700/50 focus:border-[#8b4513] focus:ring-1 focus:ring-[#8b4513] transition-all py-2.5 px-3 text-sm" id="email" placeholder="email@example.com" type="email" />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5 block" htmlFor="message">Nội dung cần hỗ trợ</label>
                                        <textarea className="w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700/50 focus:border-[#8b4513] focus:ring-1 focus:ring-[#8b4513] transition-all py-2.5 px-3 text-sm min-h-[120px]" id="message" placeholder="Mô tả vấn đề của bạn..."></textarea>
                                    </div>
                                    <button className="w-full py-3 px-6 rounded-lg bg-[#8b4513] text-white font-bold text-sm shadow-md hover:bg-[#703810] active:scale-[0.98] transition-all flex items-center justify-center gap-2" type="submit">
                                        <span className="material-symbols-outlined text-lg">send</span>
                                        Gửi tin nhắn
                                    </button>
                                </form>

                                {/* Contact Info Blocks */}
                                <div className="mt-8 grid grid-cols-1 gap-3">
                                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Kênh liên hệ khác</p>

                                    <a href="tel:19006066" className="flex items-center gap-4 p-3 rounded-xl border border-gray-100 dark:border-gray-700 hover:bg-[rgb(167,199,231)]/20 hover:border-[rgb(167,199,231)] transition-all group bg-gray-50 dark:bg-gray-700/30">
                                        <div className="w-10 h-10 rounded-full bg-white dark:bg-gray-600 shadow-sm flex items-center justify-center text-[#8b4513] group-hover:scale-110 transition-transform">
                                            <span className="material-symbols-outlined">call</span>
                                        </div>
                                        <div>
                                            <p className="font-bold text-[#111618] dark:text-gray-200">1900 6066</p>
                                            <p className="text-xs text-gray-500">Hotline miễn phí (8h - 22h)</p>
                                        </div>
                                    </a>

                                    <a href="mailto:support@freshmilk.vn" className="flex items-center gap-4 p-3 rounded-xl border border-gray-100 dark:border-gray-700 hover:bg-[rgb(167,199,231)]/20 hover:border-[rgb(167,199,231)] transition-all group bg-gray-50 dark:bg-gray-700/30">
                                        <div className="w-10 h-10 rounded-full bg-white dark:bg-gray-600 shadow-sm flex items-center justify-center text-[#8b4513] group-hover:scale-110 transition-transform">
                                            <span className="material-symbols-outlined">mail</span>
                                        </div>
                                        <div>
                                            <p className="font-bold text-[#111618] dark:text-gray-200">support@freshmilk.vn</p>
                                            <p className="text-xs text-gray-500">Phản hồi trong vòng 2 giờ</p>
                                        </div>
                                    </a>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </main>

            <Footer />
        </div>
    )
}
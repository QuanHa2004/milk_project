import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

import Header from '../../component/customer/header';
import Footer from '../../component/customer/footer';
import useCart from '../../context/cart-context';

export default function ProductDetail() {
    const { product_id } = useParams();
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const { addToCart } = useCart();

    // --- PHẦN MỚI THÊM: STATE CHO BÌNH LUẬN ---
    const [comment, setComment] = useState('');
    const [rating, setRating] = useState(5);
    const [reviews, setReviews] = useState([
        {
            id: 1,
            user: "Minh Anh",
            avatar: "M",
            rating: 5,
            date: "2023-10-20",
            content: "Sữa rất tươi và thơm, giao hàng nhanh chóng!"
        },
        {
            id: 2,
            user: "Hoàng Nam",
            avatar: "H",
            rating: 4,
            date: "2023-10-22",
            content: "Chất lượng tốt, nhưng giá hơi cao một chút."
        }
    ]);

    useEffect(() => {
        fetch(`http://127.0.0.1:8000/products/${product_id}`)
            .then((res) => res.json())
            .then((data) => {
                setProduct(data);
            });
    }, [product_id]);

    const handleAdd = async (e) => {
        e.stopPropagation();
        try {
            await addToCart(product, quantity);
        } catch (err) {
            console.error(err);
        }
    };

    const increase = () => setQuantity((prev) => prev + 1);
    const decrease = () => setQuantity((prev) => Math.max(1, prev - 1));

    // --- PHẦN MỚI THÊM: XỬ LÝ GỬI BÌNH LUẬN ---
    const handleSubmitReview = (e) => {
        e.preventDefault();
        if (!comment.trim()) return;

        const newReview = {
            id: reviews.length + 1,
            user: "Bạn", // Tạm thời để tên người dùng hiện tại
            avatar: "B",
            rating: rating,
            date: new Date().toISOString().split('T')[0],
            content: comment
        };

        setReviews([newReview, ...reviews]);
        setComment('');
        setRating(5);
    };

    // Helper render sao
    const renderStars = (starCount) => {
        return [...Array(5)].map((_, index) => (
            <span key={index} className={`material-symbols-outlined text-sm ${index < starCount ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}>
                star
            </span>
        ));
    };

    if (!product) return <div>Loading...</div>;
    return (
        <div class="bg-white dark:bg-background-dark font-display text-text-color">
            <div class="relative flex h-auto min-h-screen w-full flex-col group/design-root overflow-x-hidden">
                <div class="layout-container flex h-full grow flex-col">
                    <Header />
                    <section class="px-4 md:px-10 lg:px-40 py-5">
                        <div class="px-4 md:px-10 lg:px-20 xl:px-40 flex flex-1 justify-center py-5 mt-10">
                            <div class="layout-content-container flex flex-col max-w-[960px] flex-1">
                                <div class="flex flex-col lg:flex-row gap-8 mt-6">
                                    <div class="w-full lg:w-1/2">
                                        <div class="bg-center bg-no-repeat bg-cover flex flex-col justify-end overflow-hidden bg-white rounded-xl min-h-80 shadow-lg"
                                            data-alt="A glass bottle of organic whole milk with a light green label, sitting on a rustic wooden table."
                                            style={{ backgroundImage: `url(${product.image_url})` }}>
                                        </div>
                                    </div>
                                    <div class="w-full lg:w-1/2 flex flex-col">
                                        <h1
                                            class="text-[#333333] dark:text-white tracking-light text-[32px] font-bold leading-tight">
                                            {product.product_name}</h1>
                                        <p class="text-[#333333] dark:text-gray-300 text-base font-normal leading-normal py-3">
                                            {product.description}
                                        </p>
                                        <h2
                                            class="text-[#333333] dark:text-white tracking-light text-[28px] font-bold leading-tight pt-2">
                                            {product.price.toLocaleString('vi-VN')} VND</h2>
                                        <div class="flex items-center gap-4 mt-6">
                                            <label class="text-[#333333] dark:text-gray-300" for="quantity">Quantity:</label>
                                            <div class="flex items-center border border-gray-300 dark:border-gray-600 rounded-lg">
                                                <button onClick={() => decrease()}
                                                    class="px-3 py-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-l-lg">
                                                    <span class="material-symbols-outlined text-base">remove</span>
                                                </button>
                                                <input
                                                    id="quantity"
                                                    type="number"
                                                    min="1"
                                                    value={quantity}
                                                    onChange={(e) =>
                                                        setQuantity(Math.max(1, parseInt(e.target.value) || 1))
                                                    }
                                                    className="w-12 text-center border-0 bg-transparent text-[#333333] dark:text-white focus:ring-0"
                                                />
                                                <button onClick={() => increase()}
                                                    class="px-3 py-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-r-lg">
                                                    <span class="material-symbols-outlined text-base">add</span>
                                                </button>
                                            </div>
                                        </div>
                                        <button onClick={(e) => handleAdd(e)}
                                            class="bg-primary text-white font-semibold py-3 px-6 rounded-lg mt-6 w-full lg:w-auto hover:bg-primary/90 transition-colors duration-300 shadow-md">
                                            Add to Cart
                                        </button>
                                    </div>
                                </div>
                                <div class="mt-12">
                                    <h3
                                        class="text-[#333333] dark:text-white text-xl font-bold border-b-2 border-gray-200 dark:border-gray-700 pb-2 mb-4">
                                        Product Details</h3>
                                    <div class="text-[#333333] dark:text-gray-300 space-y-4">
                                        <p>From happy cows on our family-owned farm, our milk is a testament to quality and care. We
                                            believe in sustainable practices that are good for our cows, our land, and your family.
                                        </p>
                                        <ul class="list-disc list-inside space-y-2">
                                            <li>Certified Organic</li>
                                            <li>From Grass-fed Cows</li>
                                            <li>Gently Pasteurized</li>
                                            <li>Non-GMO</li>
                                        </ul>
                                        <h4 class="text-[#333333] dark:text-white text-lg font-semibold pt-4">Nutritional
                                            Information</h4>
                                        <div class="overflow-x-auto">
                                            <table class="w-full text-left border-collapse">
                                                <thead>
                                                    <tr>
                                                        <th class="border-b dark:border-gray-700 p-2">Nutrient</th>
                                                        <th class="border-b dark:border-gray-700 p-2">Amount per serving</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td class="border-b dark:border-gray-700 p-2">Calories</td>
                                                        <td class="border-b dark:border-gray-700 p-2">150</td>
                                                    </tr>
                                                    <tr>
                                                        <td class="border-b dark:border-gray-700 p-2">Total Fat</td>
                                                        <td class="border-b dark:border-gray-700 p-2">8g</td>
                                                    </tr>
                                                    <tr>
                                                        <td class="border-b dark:border-gray-700 p-2">Protein</td>
                                                        <td class="border-b dark:border-gray-700 p-2">8g</td>
                                                    </tr>
                                                    <tr>
                                                        <td class="p-2">Calcium</td>
                                                        <td class="p-2">30% DV</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>

                                {/* ================================================================= */}
                                {/* --- PHẦN MỚI THÊM: CUSTOMER REVIEWS --- */}
                                {/* ================================================================= */}
                                <div className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-700">
                                    <h3 className="text-[#333333] dark:text-white text-2xl font-bold mb-8">
                                        Đánh giá từ khách hàng ({reviews.length})
                                    </h3>

                                    {/* Danh sách bình luận */}
                                    <div className="space-y-8 mb-10">
                                        {reviews.map((review) => (
                                            <div key={review.id} className="flex gap-4">
                                                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold text-lg">
                                                    {review.avatar}
                                                </div>
                                                <div className="flex-1">
                                                    <div className="flex items-center justify-between mb-1">
                                                        <h4 className="font-bold text-[#333333] dark:text-white">{review.user}</h4>
                                                        <span className="text-sm text-gray-500 dark:text-gray-400">{review.date}</span>
                                                    </div>
                                                    <div className="flex items-center mb-2">
                                                        {renderStars(review.rating)}
                                                    </div>
                                                    <p className="text-[#333333] dark:text-gray-300 text-sm leading-relaxed">
                                                        {review.content}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Form thêm bình luận */}
                                    <div className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-xl">
                                        <h4 className="text-lg font-bold text-[#333333] dark:text-white mb-4">Viết đánh giá của bạn</h4>
                                        <form onSubmit={handleSubmitReview}>
                                            <div className="mb-4">
                                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Đánh giá của bạn</label>
                                                <div className="flex gap-1">
                                                    {[1, 2, 3, 4, 5].map((star) => (
                                                        <button
                                                            key={star}
                                                            type="button"
                                                            onClick={() => setRating(star)}
                                                            className={`text-2xl transition-colors ${star <= rating ? 'text-yellow-400 fill-current' : 'text-gray-300 hover:text-yellow-200'}`}
                                                        >
                                                            <span className="material-symbols-outlined">star</span>
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                            <div className="mb-4">
                                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Nội dung đánh giá</label>
                                                <textarea
                                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-[#333333] dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                                                    rows="4"
                                                    placeholder="Chia sẻ cảm nhận của bạn về sản phẩm..."
                                                    value={comment}
                                                    onChange={(e) => setComment(e.target.value)}
                                                    required
                                                ></textarea>
                                            </div>
                                            <button
                                                type="submit"
                                                className="bg-primary text-white font-semibold py-3 px-8 rounded-lg hover:bg-primary/90 transition-colors shadow-sm"
                                            >
                                                Gửi đánh giá
                                            </button>
                                        </form>
                                    </div>
                                </div>
                                {/* ================================================================= */}

                            </div>
                        </div>
                    </section>
                </div>
            </div>
            <Footer />
        </div>
    )
}
PHÂN TÍCH NGHIỆP VỤ CỦA TOÀN BỘ HỆ THỐNG
Hệ thống Milk Project được xây dựng để quản lý toàn diện hoạt động kinh doanh sữa gồm: quản lý người dùng, sản phẩm, nhà cung cấp–nhà sản xuất, đơn hàng, giỏ hàng, khuyến mãi và đánh giá. Toàn bộ các bảng trong cơ sở dữ liệu được tổ chức theo mô hình quan hệ chặt chẽ để đảm bảo tính toàn vẹn và khả năng mở rộng.
________________________________________

1. Quản lý phân quyền (role – user)
Hệ thống phân quyền bằng bảng role, giữ thông tin vai trò như admin, nhân viên, khách hàng. Bảng user là nơi lưu thông tin người dùng gồm họ tên, email, mật khẩu và vai trò tương ứng. Mỗi user thuộc một role duy nhất (quan hệ 1–n). Điều này giúp hệ thống phân cấp quyền truy cập, ví dụ: admin có thể tạo khuyến mãi, nhân viên nhập hàng, khách hàng đặt hàng.
________________________________________

2. Giỏ hàng và sản phẩm trong giỏ (cart – cart_item)
Mỗi user có tối đa một giỏ hàng, được quản lý qua bảng cart (quan hệ 1–1). Ví dụ: khi người dùng đăng nhập, hệ thống tự động gán giỏ hàng tương ứng.
Bảng cart_item thể hiện sản phẩm nằm trong giỏ cùng số lượng và trạng thái đánh dấu để đặt hàng. Mỗi dòng ứng với một sản phẩm trong giỏ (quan hệ cart 1–n cart_item và product 1–n cart_item). Dữ liệu được xóa theo dạng cascade để đảm bảo đồng bộ khi giỏ hàng hoặc sản phẩm bị xóa.
________________________________________

3. Danh mục – Nhà sản xuất – Sản phẩm (category – manufacturer – product – product_detail)
Sản phẩm thuộc một category duy nhất (sữa bột, sữa tươi, sữa hạt...). Mỗi sản phẩm đồng thời có thể được sản xuất bởi một manufacturer (Vinamilk, TH True Milk...).
Bảng product lưu thông tin chính như giá, tồn kho, mô tả, hình ảnh.
Các chi tiết chuyên sâu khác như thành phần, cách dùng, bảo quản được đặt riêng trong bảng product_detail theo kiểu mở rộng 1–1. Điều này tối ưu hóa cấu trúc và cho phép tách biệt dữ liệu phụ.
________________________________________

4. Nhập hàng: nhà cung cấp – hóa đơn nhập – chi tiết nhập
(supplier – invoice – invoice_detail)**
Hệ thống có thể nhập hàng từ nhiều supplier. Mỗi lần nhập tạo ra một bản ghi trong invoice, chứa tổng tiền và ngày nhập. Bảng invoice_detail thể hiện từng sản phẩm trong hóa đơn nhập gồm số lượng và giá nhập.
Quan hệ:
•	Supplier 1–n Invoice
•	Invoice 1–n Invoice_detail
•	Product 1–n Invoice_detail
Cơ chế này giúp theo dõi nguồn hàng rõ ràng và dễ dàng đối chiếu kho.
________________________________________

5. Khuyến mãi và người sử dụng khuyến mãi
(promotion – user_promotion – order)**
Bảng promotion quản lý mã giảm giá: dạng giảm %, giảm cố định, điều kiện đơn tối thiểu, số lần sử dụng tối đa… Mã có thời gian hiệu lực và người tạo (liên kết với user).
Khi người dùng sử dụng mã giảm giá, hệ thống ghi nhận vào user_promotion để:
•	Kiểm tra số lần sử dụng
•	Tránh sử dụng trùng lặp theo quy định
Sau đó, khi đặt hàng, đơn hàng (order) có thể liên kết với một mã promo (quan hệ 1–1). Việc dùng promo giúp giảm tổng tiền của order.
________________________________________

6. Đơn hàng và chi tiết đơn hàng (order – order_detail)
Bảng order ghi nhận thông tin đơn hàng của khách: trạng thái (chờ, xác nhận, giao, hủy), địa chỉ giao, ngày giao, tổng tiền và trạng thái thanh toán.
Bảng order_detail liệt kê từng sản phẩm trong đơn hàng: giá tại thời điểm mua, số lượng và tổng tiền của dòng đó. Quan hệ:
•	User 1–n Order
•	Order 1–n Order_detail
•	Product 1–n Order_detail
Việc lưu giá tại thời điểm mua giúp đảm bảo lịch sử không bị thay đổi khi giá sản phẩm thay đổi sau này.
________________________________________
 
7. Đánh giá sản phẩm (review)
Người dùng có thể đánh giá sản phẩm họ từng mua. Bảng review cho phép mỗi người chỉ đánh giá một sản phẩm một lần (unique product_id + user_id). Nội dung đánh giá gồm số sao, bình luận, ngày tạo.
Quan hệ:
•	User 1–n Review
•	Product 1–n Review
Cơ chế xóa cascade hỗ trợ dọn dẹp khi sản phẩm hay user bị xóa.


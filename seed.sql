-- them phan quyen
INSERT INTO `milk_project`.`role` (`role_name`)
VALUES
('Admin'),
('Customer');

-- them danh muc
INSERT INTO `milk_project`.`category` (`category_name`)
VALUES
('Sữa tươi'),
('Sữa chua'),
('Sữa đặc'),
('Sữa bột'),
('Sữa hạt (Sữa thực vật)'),
('Phô mai & Bơ'),
('Sản phẩm từ sữa khác');

-- them nha cung cap
INSERT INTO `milk_project`.`supplier` (`supplier_name`, `email`, `phone`, `address`)
VALUES
('Công ty Cổ phần Sữa Việt Nam (Vinamilk)', 'cskh@vinamilk.com.vn', '1900636058', 'Số 10, Tân Trào, P. Tân Phú, Quận 7, TP. HCM'),
('Công ty Cổ phần Sữa TH (TH True Milk)', 'contact@thmilk.vn', '02435739777', '166 Nguyễn Thái Học, P. Quang Trung, TP. Vinh, Nghệ An'),
('Công ty Cổ phần Giống bò sữa Mộc Châu', 'info@mocchaumilk.com', '02123866016', 'Thị trấn Nông trường Mộc Châu, Huyện Mộc Châu, Sơn La'),
('FrieslandCampina Việt Nam (Dutch Lady)', 'tuvankhachhang@frieslandcampina.com', '18001545', 'Khu CN Bình Dương, P. Bình Hòa, TP. Thuận An, Bình Dương'),
('Công ty Cổ phần Sữa Quốc tế (IDP)', 'info@idp.vn', '1900633571', 'Số 217, Nguyễn Văn Thủ, P. Đa Kao, Quận 1, TP. HCM');

-- them nha san xuat
INSERT INTO `milk_project`.`manufacturer` 
(`manufacturer_name`, `email`, `phone`, `address`) 
VALUES
('TH True Milk', 'contact@thmilk.vn', '1800545455', 'Nghĩa Đàn, Nghệ An'),
('Vinamilk', 'info@vinamilk.com.vn', '1900545420', '36-38 Ngô Đức Kế, Quận 1, TP.HCM'),
('Mộc Châu Milk', 'cs@mochaumilk.vn', '02123866688', 'Số 168 Trần Hưng Đạo, Mộc Châu, Sơn La'),
('Dutch Lady Việt Nam', 'support@dutchlady.vn', '1800545411', '12 Đường số 2, KCN Sóng Thần, Bình Dương'),
('Nestlé Việt Nam', 'care@nestle.com.vn', '02862858686', 'Số 5 Đại Lộ 2, KCN Việt Nam - Singapore, Bình Dương'),
('Nutifood', 'contact@nutifood.com.vn', '02839309696', '281-283 Hoàng Diệu, Quận 4, TP.HCM'),
('IDP (Love’in Farm)', 'info@idp.vn', '02873003005', 'Số 2 Đinh Tiên Hoàng, Quận 1, TP.HCM'),
('Lothamilk', 'info@lothamilk.vn', '02513902323', 'KCN Long Thành, Đồng Nai');


-- them san pham
INSERT INTO `milk_project`.`product` 
(`product_name`, `category_id`, `manufacturer_id`, `price`, `discount_percent`, `image_url`, `description`, `stock_quantity`, `expiration_date`, `is_hot`)
VALUES
('Sữa tươi Vinamilk 100% - 180ml', 1, 1, 7500, 5, 'https://example.com/vinamilk-180ml.jpg', 'Sữa tươi tiệt trùng 100% nguyên chất từ Vinamilk, bổ sung canxi và vitamin D.', 500, '2026-05-01', 1),

('Sữa chua uống TH True Yogurt vị dâu - 180ml', 2, 2, 9500, 10, 'https://example.com/th-true-yogurt-strawberry.jpg', 'Sữa chua uống lên men tự nhiên, vị dâu ngọt dịu, tốt cho tiêu hóa.', 300, '2026-03-15', 0),

('Sữa đặc Ngôi Sao Phương Nam 380g', 3, 3, 22000, 0, 'https://example.com/ngoi-sao-phuong-nam.jpg', 'Sữa đặc có đường, dùng pha cà phê, làm bánh hoặc nấu ăn.', 200, '2027-01-01', 0),

('Sữa bột Dielac Grow Plus - 900g', 4, 1, 265000, 8, 'https://example.com/dielac-grow-plus.jpg', 'Sữa bột cho trẻ suy dinh dưỡng, giúp tăng cân và phát triển chiều cao.', 150, '2026-12-31', 1),

('Sữa tươi tiệt trùng TH True Milk 1L', 1, 2, 36000, 5, 'https://example.com/th-true-milk-1l.jpg', 'Sữa tươi tiệt trùng 100% từ trang trại TH, giữ trọn vị tươi ngon.', 400, '2026-06-30', 0),

('Sữa bột Ensure Gold Vigor 850g', 4, 4, 720000, 15, 'https://example.com/ensure-gold.jpg', 'Dinh dưỡng đầy đủ cho người lớn tuổi, giúp duy trì sức khỏe và thể lực.', 80, '2027-02-20', 1),

('Sữa chua uống Yakult - Lốc 5 chai', 2, 5, 28000, 0, 'https://example.com/yakult-5chai.jpg', 'Sữa chua uống chứa khuẩn lợi Lactobacillus, hỗ trợ hệ tiêu hóa.', 250, '2026-04-10', 0),

('Sữa bột Friso Gold 4 - 900g', 4, 6, 595000, 10, 'https://example.com/friso-gold-4.jpg', 'Sữa bột cho trẻ em từ 3 tuổi trở lên, giúp phát triển trí não và miễn dịch.', 120, '2026-10-01', 1),

('Sữa tươi Dutch Lady nguyên kem - 1L', 1, 7, 34000, 5, 'https://example.com/dutchlady-1l.jpg', 'Sữa tươi nguyên kem thơm béo, giàu vitamin B2 và canxi.', 350, '2026-07-01', 0),

('Sữa tươi Meadow Fresh tách béo - 1L', 1, 8, 37000, 7, 'https://example.com/meadowfresh-lowfat.jpg', 'Sữa tươi nhập khẩu từ New Zealand, ít béo, tốt cho người ăn kiêng.', 200, '2026-08-15', 0);



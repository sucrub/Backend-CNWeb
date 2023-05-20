# Backend-CNWeb

__Chỉ pull từ branch main__

## Hướng dẫn setup
* Lên xampp tạo database tên là cnweb, để nó rỗng đừng thêm bảng gì
* npm install
* npx sequelize-cli db:migrate
* Lệnh trên sẽ tự tạo bảng trong xampp luôn

## List API
__req.body tổng hợp hết vào một object__

__req.body có () tức là có hoặc không đều được, còn lại là bắt buộc__

Endpoint       |	Method |	Description |	Request Body | Note
---------------|---------|--------------|--------------|------
http://localhost:8080/user/get-all-user |	GET |	Get all users |	N/A
http://localhost:8080/user/get-user-by-id/{id} |	GET |	Get user by ID |	N/A
http://localhost:8080/user/get-user-by-id/{username} |	GET |	Get user by username |	N/A
http://localhost:8080/user/create-user |	POST |	Create user |	username, password, first_name, last_name, phone_number
http://localhost:8080/user/update-user |	POST |	Update user |	username, (first_name, last_name, phone_number)
http://localhost:8080/user/update-password |	POST |	Update user password |	username, old_password, new_password, confirm_password
http://localhost:8080/seller/get-all-seller |	GET |	Get all sellers |	N/A
http://localhost:8080/seller/get-seller-by-id/{id} |	GET |	Get seller by ID |	N/A
http://localhost:8080/seller/get-seller-by-name-prefix/{prefix} |	GET |	Get seller by name prefix |	N/A
http://localhost:8080/seller/create-seller |	POST |	Create seller |	username, password, name, address, phone_number, (img_url)
http://localhost:8080/seller/update-seller |	POST |	Update seller |	username, (name, address, phone_number, description)
http://localhost:8080/seller/update-password |	POST |	Update seller password |	username, old_password, new_password, confirm_password
http://localhost:8080/item/get-all-item |	GET |	Get all items |	N/A
http://localhost:8080/item/get-item-by-seller-id/{seller_id} |	GET |	Get items by seller ID |	N/A
http://localhost:8080/item/get-item-by-id/{id} |	GET |	Get item by ID |	N/A
http://localhost:8080/item/create-item |	POST |	Create item |	name, description, seller_id
http://localhost:8080/item/update-item |	POST |	Update item |	id, (name, description)
http://localhost:8080/item/delete-item/{id} |	DELETE |	Delete item |	N/A
http://localhost:8080/item/create-item-specific |	POST |	Create specific item |	origin_id, name, price | Có thể cải tiến sau này
http://localhost:8080/item/get-item-specific-by-origin-id/{origin_id} |	GET |	Get specific item by origin ID |	N/A
http://localhost:8080/item/update-specific-item |	POST |	Update specific item |	id, (name, price)
http://localhost:8080/item/delete-specific-item/{id} |	DELETE |	Delete specific item |	N/A
http://localhost:8080/auth/login-user |	POST |	Login user |	N/A | Mới cấp jwt access token, chưa thao tác gì thêm

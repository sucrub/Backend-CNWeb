# Backend-CNWeb

- Chỉ pull từ branch main

* Lên xampp tạo database tên là cnweb, để nó rỗng đừng thêm bảng gì
* npm install
* npx sequelize-cli db:migrate
* Lệnh trên sẽ tự tạo bảng trong xampp luôn

# req.body tổng hợp hết vào một object

# req.body có () tức là có hoặc không đều được, còn lại là bắt buộc

# List API

- USER

* Get all user: http://localhost:8080/user/get-all-user
  METHOD GET
* Get user by id: http://localhost:8080/user/get-user-by-id/{id}
  VD: http://localhost:8080/user/get-user-by-id/1 thì trả về user có id là 1
  METHOD GET
* Get user by username: http://localhost:8080/user/get-user-by-id/{username}
  METHOD GET
* Create user: http://localhost:8080/user/create-user
  METHOD POST
  req.body: username, password, first_name, last_name, phone_number
* Update user: http://localhost:8080/user/update-user
  METHOD POST
  req.body cần username, (first_name, last_name, phone_number)
* Update user password: http://localhost:8080/user/update-password
  METHOD POST
  req.body: username, old_password, new_password, confirm_password

- SELLER

* Get all seller: http://localhost:8080/seller/get-all-seller
  METHOD GET
* Get seller by id: http://localhost:8080/seller/get-seller-by-id/{id}
  METHOD GET
* Get seller by name prefix: http://localhost:8080/seller/get-seller-by-name-prefix/{prefix}
  METHOD GET
  Cái này dùng để search: VD prefix = te thì sẽ tìm các shop có chữ te ở đầu
* Create seller: http://localhost:8080/seller/create-seller
  METHOD POST
  req.body: username, password, name, address, phone_number, (img_url)
* Update seller: http://localhost:8080/seller/update-seller
  METHOD POST
  req.body: username, (name, address, phone_number, description)
* Update seller password: http://localhost:8080/seller/update-password
  METHOD POST
  req.body: username, old_password, new_password, confirm_password

- ITEM

* Get all item: http://localhost:8080/item/get-all-item
  METHOD GET
* Get item by seller id: http://localhost:8080/item/get-item-by-seller-id/{seller_id}
  METHOD GET
* Get item by id: http://localhost:8080/item/get-item-by-id/{id}
  METHOD GET
* Create item: http://localhost:8080/item/create-item
  METHOD POST
  req.body: name, description, seller_id
* Update item: http://localhost:8080/item/update-item
  METHOD POST
  req.body: id, (name, description)
* Delete item: http://localhost:8080/item/delete-item/{id}
  METHOD DELETE

- ITEM SPECIFIC

* Create item specific: http://localhost:8080/item/create-item-specific
  METHOD POST
  req.body: origin_id, name, price
  ! Có thể cải tiến API này sau
* Get specific item by origin id: http://localhost:8080/item/get-item-specific-by-origin-id/{origin_id}
  METHOD GET
* Update specific item: http://localhost:8080/item/update-specific-item
  METHOD POST
  req.body: id, (name, price)
* Delete specific item: http://localhost:8080/item/delete-specific-item/{id}
  METHOD DELETE

- AUTH

* Login user: http://localhost:8080/auth/login-user
  METHOD POST
  Mới cấp accessToken, chưa thao tác

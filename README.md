# Pawtal Backend

Backend Node.js + Express + MongoDB cho web dich vu thu cung, co:
- JWT authentication
- CRUD thu cung
- Ho so suc khoe
- Lich tiem chung
- Nhat ky tham kham
- San pham
- Don hang
- Dich vu
- Dat lich
- Swagger UI
- Upload anh len Cloudinary
- Seed data mau de test nhanh

## 1. Cai dat

```bash
npm install
cp .env.example .env
```

Sua file `.env`:

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/pawtal
JWT_SECRET=change_me
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

## 2. Chay du an

```bash
npm run dev
```

Server:
- API: `http://localhost:5000`
- Swagger: `http://localhost:5000/api-docs`

## 3. Seed data mau

Nap du lieu demo vao MongoDB:

```bash
npm run seed
```

Xoa toan bo du lieu seed:

```bash
npm run seed:destroy
```

Tai khoan demo:

```text
Admin: admin@pawtal.local / 123456
User : minhanh@pawtal.local / 123456
User : thuha@pawtal.local / 123456
```

Du lieu demo bao gom:
- 3 users
- 4 pets
- 4 health records
- 6 vaccinations
- 4 medical visits
- 8 products
- 5 services
- 2 orders
- 4 appointments

Luu y:
- Anh trong seed data dung URL placeholder, khong can upload len Cloudinary.
- Khi tao, sua, xoa bang API upload, Cloudinary van hoat dong binh thuong.

## 4. Tao admin

Dang ky 1 tai khoan binh thuong truoc, sau do chay:

```bash
npm run make-admin -- your_email@gmail.com
```

Hoac:

```bash
node src/scripts/make-admin.js your_email@gmail.com
```

## 5. Dung Swagger

1. Vao `/api-docs`
2. Goi `POST /api/auth/login`
3. Dung mot trong cac tai khoan demo o tren
4. Copy token
5. Bam nut **Authorize**
6. Nhap:

```text
Bearer <your_token>
```

7. Test cac route can dang nhap

## 6. Upload anh len Cloudinary

Cac endpoint da ho tro upload anh:
- `PATCH /api/auth/me/avatar`
- `POST /api/pets`
- `PUT /api/pets/{id}`
- `POST /api/products`
- `PUT /api/products/{id}`
- `POST /api/services`
- `PUT /api/services/{id}`

Trong Swagger, cac route nay dung `multipart/form-data`.

## 7. Thu tu test de nhat

1. `npm run seed`
2. Login bang tai khoan admin
3. Xem `GET /api/products`, `GET /api/services`, `GET /api/orders`, `GET /api/appointments`
4. Login bang tai khoan user
5. Xem `GET /api/pets`
6. Xem `GET /api/pets/{id}/dashboard`
7. Xem `GET /api/orders/my`
8. Xem `GET /api/appointments/my`
9. Thu tao them pet, lich tiem, lich kham, order, appointment moi

## 8. Luu y

- API san pham va dich vu `POST/PUT/DELETE` chi admin moi dung duoc.
- Don hang tinh `totalAmount` o server, khong tin gia gui tu frontend.
- Khi tao order, stock se bi tru ngay.
- Seed script tao order mau truc tiep trong database de co san du lieu demo.
- Xoa pet se xoa ca health record, vaccination, visit va appointment lien quan.

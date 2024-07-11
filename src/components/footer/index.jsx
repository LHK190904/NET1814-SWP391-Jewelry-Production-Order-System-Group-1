import React from "react";

function Footer() {
  return (
    <footer className="bg-black text-[#F7EF8A] p-4 w-screen">
      <div className="grid grid-cols-4 gap-4">
        <div>
          <img
            src="./src/assets/images/logo.png"
            alt="Company Logo"
            className="w-[200px] h-auto"
          />
        </div>
        <div>
          <div className="text-xl font-bold">Chi nhánh</div>
          <p>Quận 12</p>
          <p>Bình Thạnh</p>
          <p>Phú Nhuận</p>
          <p>Biên Hòa</p>
          <p>Quận 3</p>
          <p>Thủ Đức</p>
          <p>Bình Dương</p>
        </div>
        <div>
          <div className="text-xl font-bold">Phương thức thanh toán</div>
          <p>Visa</p>
          <p>Mastercard</p>
          <p>Momo</p>
          <div className="text-xl font-bold">Chính sách</div>
          <p>Chính sách hoàn tiền</p>
        </div>
        <div>
          <div className="text-xl font-bold">Kết nối với chúng tôi</div>
          <div className="flex space-x-4 mb-4">
            <a
              href="https://www.facebook.com/profile.php?id=100006428314927"
              target="_blank"
            >
              <img
                src="./src/assets/images/icon/facebook.jpg"
                alt="Facebook"
                className="w-[50px] h-auto"
              />
            </a>
            <a href="#">
              <img
                src="./src/assets/images/icon/instagram.jpg"
                target="_blank"
                alt="Instagram"
                className="w-[50px] h-auto"
              />
            </a>
            <a href="https://zalo.me/0909910224" target="_blank">
              <img
                src="./src/assets/images/icon/zalo.jpg"
                alt="Zalo"
                className="w-[50px] h-auto"
              />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

import React from "react";

function Footer() {
  return (
    <footer className="bg-black text-[#F7EF8A] flex justify-around p-2 w-screen">
      <div className="grid grid-cols-1 grid-rows-6 gap-1">
        <div className="font-bold">Chi nhánh</div>
        <div>Q12</div>
        <div>Bình Thạnh</div>
        <div>Biên Hòa</div>
        <div>Phú Nhuận</div>
        <div>Q3</div>
      </div>
      <div className="grid grid-cols-1 grid-rows-5 gap-1">
        <div className="font-bold">Phương thức thanh toán</div>
        <div>Mastercard</div>
        <div>Visa</div>
        <div>Momo</div>
      </div>
      <div className="grid grid-cols-1 grid-rows-5 gap-1">
        <div className="font-bold">Kết nối với chúng tôi</div>
        <div>Facebook</div>
        <div>Instagram</div>
        <div>Zalo</div>
      </div>
    </footer>
  );
}

export default Footer;

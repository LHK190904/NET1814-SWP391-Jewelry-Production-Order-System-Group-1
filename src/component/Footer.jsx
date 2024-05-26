import React from "react";
function Footer() {
    return (
        <footer className="bg-black text-white text-center py-4">
            <div className="container-fluid text-start">
                <div className="row" id="footer-details">
                    <div className="col-lg-3 offset-lg-2">
                        <h5>Chi nhánh</h5>
                        <div>Quận 3</div>
                        <div>Quận 12</div>
                        <div>Biên Hòa</div>
                        <div>Phú Nhuận</div>
                        <div>Bình Thạnh</div>
                    </div>
                    <div className="col-lg-4">
                        <h5>Phương thức thanh toán</h5>
                        <div>Mastercard</div>
                        <div>Visa</div>
                        <div>Momo</div>
                    </div>
                    <div className="col-lg-3">
                        <h5>Kết nối với chúng tôi</h5>
                        <div>Facebook</div>
                        <div>Instagram</div>
                        <div>Zalo</div>
                    </div>
                </div>
            </div>
        </footer>
    )
}
export default Footer
import React from "react";
function Footer() {
    return (
        <div className="container-fluid text-start bg-dark">
            <div className="row" id="footer-details">
                <div className="col-lg-4">
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
                <div className="col-lg-4">
                    <h5>Kết nối với chúng tôi</h5>
                    <div>Facebook</div>
                    <div>Instagram</div>
                    <div>Zalo</div>
                </div>
            </div>
        </div>
    )
}
export default Footer
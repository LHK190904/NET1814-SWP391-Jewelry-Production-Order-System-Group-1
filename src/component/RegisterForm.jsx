import React from "react";
function RegisterForm() {
    return (
        <div className="container">
            <h2 className="text-center">ĐĂNG KÝ</h2>
            <form className="form-horizontal" action="POST">
                <div className="form-group">
                    <div className="row">
                        <label className="control-label col-lg-1 offset-lg-3 align-self-center" htmlFor="fullName">Họ tên:</label>
                        <div className="col-lg-6">
                            <input type="text" className="form-control" id="fullName" placeholder="Nhập họ và tên" />
                        </div>
                    </div>
                    <div className="row">
                        <label className="control-label col-lg-1 offset-lg-3 align-self-center" htmlFor="phoneNumb">SĐT:</label>
                        <div className="col-lg-6">
                            <input type="text" className="form-control" id="phoneNumb" placeholder="Số điện thoại" />
                        </div>
                    </div>
                    <div className="row">
                        <label className="control-label col-lg-1 offset-lg-3 align-self-center" htmlFor="address">Địa chỉ:</label>
                        <div className="col-lg-6">
                            <input type="text" className="form-control" id="address" placeholder="Địa chỉ" />
                        </div>
                    </div>
                    <div className="row">
                        <button type="submit" className="btn col-lg-4 offset-lg-2 bg-dark" style={{color: "#d6c33a"}}>ĐĂNG KÝ</button>
                        <button type="cancel" className="btn col-lg-4 border">HỦY</button>
                    </div>
                </div>
            </form>
        </div>
    )
}
export default RegisterForm
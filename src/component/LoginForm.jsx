import React from 'react'

function LoginForm() {
  return (
    <div className="container">
            <h2 className="text-center">ĐĂNG NHẬP</h2>
            <form className="form-horizontal" action="POST">
                <div className="form-group">
                    <div className="row">
                        <label className="control-label col-lg-1 offset-lg-3 align-self-center" htmlFor="fullName">Họ tên:</label>
                        <div className="col-lg-6">
                            <input type="text" className="form-control" id="fullName" placeholder="Nhập họ và tên" />
                        </div>
                    </div>
                    <div className="row">
                        <label className="control-label col-lg-1 offset-lg-3 align-self-center" htmlFor="password">Mật khẩu:</label>
                        <div className="col-lg-6">
                            <input type="text" className="form-control" id="password" placeholder="Mật khẩu" />
                        </div>
                    </div>
                    <div className="row">
                        <button type="submit" className="btn col-lg-4 offset-lg-2">ĐĂNG NHẬP</button>
                        <button type="cancel" className="btn col-lg-4">HỦY</button>
                    </div>
                </div>
            </form>
        </div>
  )
}
export default LoginForm

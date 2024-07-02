import React from "react";

function Tutorial() {
  return (
    <div className="bg-black text-white p-4 rounded-lg text-xl">
      <span>
        <ol>
          <li>
            1. Các bạn tạo yêu cầu với sản phẩm đã chọn từ cửa hàng hoặc do
            chính bạn yêu cầu
          </li>
          <li>
            2. Nhân viên Sales của cửa hàng sẽ tiếp nhận yêu cầu, xem xét và đưa
            ra giá cho yêu cầu và yêu cầu sẽ được gửi cho Manager để duyệt.
          </li>
          <li>
            3. Manager sau khi nhận được yêu cầu cần được phê duyệt sẽ xem xét
            về giá đã được đưa ra và từ đó đưa ra quyết định phê duyệt.
          </li>
          <li>
            4. Yêu cầu sau khi được Manager phê duyệt sẽ được gửi về cho khách
            hàng trong giỏ hàng và khách hàng sẽ xem được giá đã được phê duyệt
          </li>
          <li>
            5. Khách hàng xem xét giá đã được gửi về rồi đưa ra quyết định(chấp
            nhận/từ chối) đối với giá đó để bắt đầu tạo đơn hàng-nếu không thì
            toàn bộ coi như đơn hàng sẽ bị hủy
          </li>
          <li>
            6. Khách hàng tạo đơn hàng đối với yêu cầu đã được chấp thuận về giá
            ở 2 bên. Đơn hàng sẽ được gửi cho Manager và đợi để gia công
          </li>
          <li>
            7. Manager nhận đơn hàng được đặt và phân công công việc cho các thợ
            gia công, thiết kế(nếu cần).
          </li>
          <ol>
            <li>
              7.1 Nếu đơn hàng là sản phẩm theo yêu cầu riêng của khách hàng thì
              nhân viên thiết kế đã được phân công đối với đơn hàng sẽ tiến hành
              phác thảo mô hình 3D của sản phẩm
            </li>
            <li>
              7.2 Sau khi hoàn thành mô hình 3D thì nhân viên thiết kế sẽ gửi
              mẫu 3D về cho khách hàng để khách hàng kiểm tra và đưa ra điều
              chỉnh nếu cần thiết theo yêu cầu
            </li>
            <li>
              7.3 Khi khách hàng chấp nhận mô hình 3D của sản phẩm thì chọn xác
              nhận mô hình sẽ đưa đơn hàng đến quy trình gia công
            </li>
          </ol>
          <li>
            8. Các nhân viên gia công sẽ nhận được đơn hàng và tiến hành gia
            công theo như yêu cầu đã được nêu trong đơn hàng cùng với đó là báo
            cáo tiến độ gia công của sản phẩm.
          </li>
          <li>
            9. Sản phẩm sau khi được hoàn thiện sẽ báo cho bên khách hàng để
            tiến hành thanh toán và bàn giao sản phẩm.
          </li>
        </ol>
      </span>
    </div>
  );
}

export default Tutorial;

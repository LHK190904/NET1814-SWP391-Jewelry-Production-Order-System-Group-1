import React from 'react'

export default function Collections() {
    return (
        <div className='container-fluid'>
            <h3 className='text-center'>BỘ SƯU TẬP</h3>
            <div className='row align-self-center'>
                <div className='col-lg-3 offset-lg-2'>BỘ SƯU TẬP 1</div>
                <div className='col-lg-5'>
                    <img src="./assets/images/product.jpg" alt="product1" />
                    <img src="./assets/images/product.jpg" alt="product2" />
                    <img src="./assets/images/product.jpg" alt="product3" />
                </div>
            </div>
            <h3 className='text-center'>MẪU THIẾT KẾ</h3>
            <div className='row justify-content-around'>
                <div className='card col-lg-2'>
                    <img src="./assets/images/product.jpg" alt="product4" />
                    <div className='card-body'>
                        <h3>NHẪN DORAN</h3>
                        <p className='card-text'>+10 SMPT</p>
                    </div>
                </div>

                <div className='card col-lg-2 offset-lg-1'>
                    <img src="./assets/images/product.jpg" alt="product4" />
                    <div className='card-body'>
                        <h3>DÂY CHUYỀN CHUỘC TỘI</h3>
                        <p className='card-text'>+100 MÁU</p>
                        <p className='card-text'>+10 ĐIỂM HỒI CHIÊU</p>
                    </div>
                </div>

                <div className='card col-lg-2 offset-lg-1'>
                    <img src="./assets/images/product.jpg" alt="product4" />
                    <div className='card-body'>
                        <h3>VÒNG SẮT CỔ TỰ</h3>
                        <p className='card-text'>+100 MÁU</p>
                        <p className='card-text'>+10 KHÁNG PHÉP</p>
                    </div>
                </div>

                
            </div>
        </div>
    )
}

import React from 'react'

function Carousel() {
    return (
        <div className='container'>
            <div className="carousel-item">
                <div>
                    <img src="./assets/images/product.jpg" alt="product1" />
                    <div className="carousel-caption d-none d-md-block">
                        <h5>Product1</h5>
                        <p>Title1</p>
                    </div>
                </div>

                <div>
                    <img src="./assets/images/product.jpg" alt="product2" />
                    <div className="carousel-caption d-none d-md-block">
                        <h5>Product2</h5>
                        <p>Title2</p>
                    </div>
                </div>

                <img src="./assets/images/product.jpg" alt="product3" />
                <div className="carousel-caption d-none d-md-block">
                    <h5>Product3</h5>
                    <p>Title3</p>
                </div>
            </div>
        </div>

    )
}
export default Carousel 

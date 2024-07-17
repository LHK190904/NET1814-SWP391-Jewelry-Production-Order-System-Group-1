import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../../services/axiosInstance";
import authService from "../../services/authService";
import { message } from "antd";

function ProductDetail() {
  const { productId } = useParams();
  const [product, setProduct] = useState({});
  const [selectedImage, setSelectedImage] = useState(null);
  const navigate = useNavigate();

  const fetchProduct = async () => {
    try {
      const response = await axiosInstance.get("design/getAllCompanyDesign");
      const allProducts = response.data.result;
      const selectedProduct = allProducts.find(
        (item) => item.id === parseInt(productId)
      );
      setProduct(selectedProduct || {});
      setSelectedImage(selectedProduct?.listURLImage?.[0] || null);
      console.log(selectedProduct);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddToCart = async () => {
    try {
      const user = authService.getCurrentUser();
      if (!user) {
        navigate(`/register`);
      } else {
        try {
          const response = await axiosInstance.post(
            `requests/requestCompanyDesign/${user.id}/${product.id}`
          );
          console.log(response.data);
          message.success("ĐÃ THÊM VÀO GIỎ HÀNG");
        } catch (error) {
          console.log(error);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [productId]);

  const handleImageClick = (url) => {
    setSelectedImage(url);
  };

  return (
    <div className="w-screen min-h-screen bg-[#434343]">
      <h1 className="text-center text-2xl md:text-4xl font-bold py-4 text-[#F7EF8A]">
        CHI TIẾT SẢN PHẨM
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-12 gap-2">
        <div className="col-span-1 md:col-start-2 md:col-span-10 bg-gray-300 rounded-lg p-4 md:p-8">
          <h1 className="text-xl md:text-2xl text-center my-4">CHI TIẾT</h1>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mt-4 bg-white p-4 rounded-lg">
            <div className="col-span-1 md:col-span-2 flex flex-col items-center">
              <img
                src={selectedImage}
                alt={product.designName}
                className="rounded-lg w-full md:w-[300px] h-[300px] object-cover"
              />
              <div className="flex flex-wrap justify-center mt-4">
                {product.listURLImage &&
                  product.listURLImage.map((url, index) => (
                    <img
                      key={index}
                      src={url}
                      alt={product.designName}
                      className="rounded-lg cursor-pointer w-[100px] h-[100px] mx-1"
                      onClick={() => handleImageClick(url)}
                    />
                  ))}
              </div>
            </div>
            <div className="col-span-1 md:col-span-3 text-lg md:text-xl">
              <div>LOẠI TRANG SỨC: {product.category}</div>
              <div>LOẠI VÀNG: {product.materialName}</div>
              <div>TRỌNG LƯỢNG: {product.materialWeight} lượng</div>
              <div>ĐÁ CHÍNH: {product.mainStoneId}</div>
              <div>ĐÁ PHỤ: {product.subStoneId}</div>
              <div>MÔ TẢ: {product.description}</div>
              <button
                onClick={handleAddToCart}
                className="mt-4 px-4 py-2 bg-[#F7EF8A] text-black rounded hover:bg-gradient-to-br hover:from-white hover:to-[#fcec5f]"
              >
                ĐẶT GIA CÔNG
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;

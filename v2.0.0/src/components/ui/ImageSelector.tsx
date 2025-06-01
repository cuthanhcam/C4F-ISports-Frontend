import { useState } from 'react';
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { CiCamera } from "react-icons/ci";
function ImageSelector({ d }) {
  // Kiểm tra nếu d hoặc d.images không tồn tại
  if (!d || !d.images || !Array.isArray(d.images)) {
    return <div>Không có ảnh để hiển thị</div>;
  }

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const totalImages = d.images.length;

  // Hàm chuyển đến ảnh trước
  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? totalImages - 1 : prevIndex - 1
    );
  };

  // Hàm chuyển đến ảnh tiếp theo
  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === totalImages - 1 ? 0 : prevIndex + 1
    );
  };

  // Hàm chọn ảnh khi nhấn vào thumbnail
  const handleThumbnailClick = (index) => {
    setCurrentImageIndex(index);
  };

  return (
    <li key={d.fieldId}>
      <div className="flex flex-col items-start relative">
        {/* Ảnh chính */}
        <img 
          src={d.images[currentImageIndex]?.imageUrl || ''} 
          alt={`Ảnh chính ${currentImageIndex + 1}`} 
          className="h-[550px] w-full object-cover rounded-t-xl"
        />
        {/* Nút điều hướng và số lượng ảnh */}
        <button 
        onClick={handlePrevImage} 
        disabled={totalImages <= 1}
        className="p-4 text-dark-primary border border-dark-outline-variant rounded-lg disabled:opacity-50 absolute top-1/3 translate-y-1/2 -left-6  shadow-xunit group"
        >
            <FaChevronLeft className='group-hover:-translate-x-1 duration-200 transition-all'/>
        </button>
        <div className='bg-gray-400/30 absolute bottom-1/4 right-0 px-4 py-2 flex items-center gap-2 rounded-l-xl'>
            <CiCamera className='text-xl'/>
            <span className="">
                {totalImages > 0 ? `${currentImageIndex + 1}/${totalImages}` : '0/0'}
            </span>
        </div>
        <button 
        onClick={handleNextImage} 
        disabled={totalImages <= 1}
        className="p-4 text-dark-primary border border-dark-outline-variant rounded-lg disabled:opacity-50 absolute top-1/3 translate-y-1/2 -right-6 shadow-xunit group"
        >
        <FaChevronRight className='group-hover:translate-x-1 duration-200 transition-all'/>
        </button>
        {/* Danh sách ảnh thumbnail */}
        <div className="flex gap-2  bg-dark-surface-1 p-4 w-full rounded-b-xl">
          {d.images.map((img, index) => (
            <img 
              key={img.imageUrl}
              src={img.imageUrl} 
              alt={`Thumbnail ${index + 1}`} 
              className={`w-16 h-16 object-cover rounded-xl cursor-pointer ${
                currentImageIndex === index ? 'border-2 border-blue-500' : ''
              }`}
              onClick={() => handleThumbnailClick(index)}
            />
          ))}
        </div>
      </div>
    </li>
  );
}

export default ImageSelector;
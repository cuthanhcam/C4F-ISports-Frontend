import { useEffect, useState } from "react";
import type { FavoritesResponse } from "../../../../types/user";
import { userAPI } from "../../../../api/user.api";
import { FaLocationDot } from "react-icons/fa6";
import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import { toast } from "react-toastify";

const PAGE_SIZE = 10;

interface StarRatingProps {
  rating: number;
  maxStars?: number;
}

const StarRating = ({ rating, maxStars = 5 }: StarRatingProps) => {
  const stars = [];
  for (let i = 1; i <= maxStars; i++) {
    if (rating >= i) {
      stars.push(<FaStar key={i} className="text-yellow-400 dark:text-yellow-300" />);
    } else if (rating >= i - 0.5) {
      stars.push(<FaStarHalfAlt key={i} className="text-yellow-400 dark:text-yellow-300" />);
    } else {
      stars.push(<FaRegStar key={i} className="text-yellow-400 dark:text-yellow-300" />);
    }
  }
  return <div className="flex gap-1">{stars}</div>;
};

const Favorites = () => {
  const [formData, setFormData] = useState<FavoritesResponse>();
  const [page, setPage] = useState<number>(1);
  const [total, setTotal] = useState<number>(0);

  const totalPages = Math.ceil(total / PAGE_SIZE);

  // Gọi dữ liệu favorites
  const fetchDataFavorites = async (pageNumber: number) => {
    try {
      const res = await userAPI.getUserFavorites({
        page: pageNumber,
        pageSize: PAGE_SIZE,
        sort: "FieldName:asc",
      });
      setFormData(res.data);
      setTotal(res.data.total);
      setPage(res.data.page);
    } catch (err) {
      console.error(err);
      toast.error("Không thể tải danh sách sân yêu thích. Vui lòng thử lại!");
    }
  };

  // Render dữ liệu khi thay đổi trang
  useEffect(() => {
    fetchDataFavorites(page);
  }, [page]);

  const generatePageNumbers = (): (number | string)[] => {
    const pages: (number | string)[] = [];
    if (totalPages <= 6) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (page <= 3) {
        pages.push(1, 2, 3, 4, "...", totalPages);
      } else if (page >= totalPages - 2) {
        pages.push(1, "...", totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, "...", page - 1, page, page + 1, "...", totalPages);
      }
    }
    return pages;
  };

  const handleDeleteFavorites = async (fieldId: number) => {
    const isConfirmed = window.confirm("Bạn có chắc chắn muốn xóa sân này khỏi danh sách yêu thích?");
    if (!isConfirmed) return;
    try {
      await userAPI.deleteUserFavorites(fieldId);
      toast.success("Đã xóa sân khỏi danh sách yêu thích!");
      fetchDataFavorites(page);
    } catch (error) {
      console.error("Xóa thất bại", error);
      toast.error("Xóa sân thất bại. Vui lòng thử lại!");
    }
  };

  return (
    <div className="bg-surface-1/30 dark:bg-dark-surface-1/30 backdrop-blur-md rounded-3xl shadow-navigation dark:shadow-navigation-dark border border-outline-variant dark:border-dark-outline-variant">
      <div className="p-4 sm:p-6 md:p-8 lg:p-12">
        {/* Tiêu đề nội dung */}
        <div className="py-4 sm:py-6 border-b border-outline-variant dark:border-dark-outline-variant flex flex-col gap-2">
          <h1 className="text-xl sm:text-2xl md:text-3xl text-surface-on dark:text-dark-surface-on font-medium">
            Sân yêu thích
          </h1>
          <p className="text-sm sm:text-base text-surface-onVariant dark:text-dark-surface-onVariant">
            Tăng mức độ gắn bó của người dùng với hệ thống đặt sân thể thao bằng cách thưởng điểm tích lũy khi người dùng đặt sân, sau đó cho phép họ quy đổi điểm thành phần thưởng hấp dẫn
          </p>
        </div>
        {/* Nội dung */}
        <div className="my-8 sm:my-12 lg:my-16">
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
            {formData?.data.length ? (
              formData.data.map((item) => (
                <li
                  key={item.fieldId}
                  className="border border-outline-variant dark:border-dark-outline-variant p-4 sm:p-6 rounded-3xl h-auto sm:h-[150px] flex flex-col gap-2 relative shadow-navigation dark:shadow-navigation-dark"
                >
                  <h1 className="text-surface-on dark:text-dark-surface-on text-lg sm:text-xl font-medium truncate">
                    {item.fieldName}
                  </h1>
                  <div className="flex items-start gap-2">
                    <FaLocationDot className="text-primary dark:text-dark-primary shrink-0 translate-y-0.5 text-base sm:text-lg" />
                    <span className="text-surface-onVariant dark:text-dark-surface-onVariant text-sm sm:text-base line-clamp-1">
                      {item.address}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <StarRating rating={item.averageRating} />
                    <span className="text-sm sm:text-base text-surface-onVariant dark:text-dark-surface-onVariant">
                      ({item.averageRating})
                    </span>
                  </div>
                  <button
                    onClick={() => handleDeleteFavorites(item.fieldId)}
                    className="absolute bottom-3 right-3"
                    aria-label={`Xóa sân ${item.fieldName} khỏi danh sách yêu thích`}
                  >
                    <div className="text-primary dark:text-dark-primary text-lg sm:text-xl px-2 py-1 rounded-md hover:bg-primary dark:hover:bg-dark-primary hover:text-surface-1 dark:hover:text-dark-surface-on transition-colors duration-200">
                      <AiFillDelete />
                    </div>
                  </button>
                </li>
              ))
            ) : (
              <p className="text-surface-on dark:text-dark-surface-on text-center col-span-2">
                Chưa có sân nào trong danh sách yêu thích.
              </p>
            )}
          </ul>
          {/* Phân trang */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center space-x-1 sm:space-x-2 mt-8 sm:mt-12 lg:mt-16">
              {generatePageNumbers().map((p, index) =>
                p === "..." ? (
                  <span
                    key={index}
                    className="px-2 sm:px-3 py-1 text-surface-onVariant dark:text-dark-surface-onVariant select-none"
                  >
                    ...
                  </span>
                ) : (
                  <button
                    key={index}
                    onClick={() => setPage(Number(p))}
                    className={`px-2 sm:px-3 py-1 rounded text-sm sm:text-base ${
                      page === p
                        ? "bg-primary dark:bg-dark-primary text-surface-1 dark:text-dark-surface-on"
                        : "bg-surface-4 dark:bg-dark-surface-4 text-surface-on dark:text-dark-surface-on hover:bg-surface-3 dark:hover:bg-dark-surface-3 transition-colors duration-200"
                    }`}
                  >
                    {p}
                  </button>
                )
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Favorites;
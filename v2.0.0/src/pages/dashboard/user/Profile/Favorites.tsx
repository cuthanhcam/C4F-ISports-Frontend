import { useEffect, useState } from "react"
import type { FavoritesResponse } from "../../../../types/user"
import { userAPI } from "../../../../api/user.api";
import { FaLocationDot } from "react-icons/fa6";
import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";

const PAGE_SIZE = 10;

interface StarRatingProps {
  rating: number; 
  maxStars?: number; 
}

const StarRating = ({ rating, maxStars = 5}: StarRatingProps) => {
    const stars = [];
    for (let i = 1; i <= maxStars; i++) {
        if (rating >= i) {
            stars.push(<FaStar key={i} className="text-yellow-400"/>)
        } else if (rating >= i - 0.5) {
            stars.push(<FaStarHalfAlt key={i} className="text-yellow-400" />)
        } else {
            stars.push(<FaRegStar key={i} className="text-yellow-400" />);
        }
    }
    return <div className="flex gap-1">{stars}</div>
}

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
                sort: 'FieldName:asc',
            }); 
            setFormData(res.data);
            setTotal(res.data.total);
            setPage(res.data.page)
        } catch (err) {
            console.error(err);
        }
    }

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
                pages.push(1, 2, 3, 4, '...', totalPages);
            } else if (page >= totalPages - 2) {
                pages.push(1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
            } else {
                pages.push(1, '...', page - 1, page, page + 1, '...', totalPages);
            }
        }

        return pages;
    };

    const handleDeleteFavorites = async (fieldId: number) => {
        const isConfirmed = window.confirm("Bạn có chắc chắn muốn lưu thay đổi?");
        if (!isConfirmed) return;
        try {
            await userAPI.deleteUserFavorites(fieldId); 
            fetchDataFavorites(page);
        } catch (error) {
            console.error("Xóa thất bại", error);
        }
    };


    return (
        <div className="bg-surface-1 rounded-3xl">
            <div className="px-12 py-6">
                {/* Tiêu đề nội dung */}
                <div className="py-6 border-b border-outline-variant flex flex-col gap-2">
                    <h1 className="text-3xl text-surface-on font-medium">Sân yêu thích</h1>
                    <p className="text-base text-surface-onVariant">
                        Tăng mức độ gắn bó của người dùng với hệ thống đặt sân thể thao bằng cách thưởng điểm tích lũy khi người dùng đặt sân, 
                        sau đó cho phép họ quy đổi điểm thành phần thưởng hấp dẫn
                    </p>
                </div>
                {/* Nội dung */}
                <div className="my-16">
                    <ul className="grid grid-rows-5 grid-cols-2 gap-8">
                        {formData?.data.map((item) => (
                            <li key={item.fieldId} className="border border-outline-variant p-6 rounded-3xl h-[150px] flex flex-col gap-2 relative">
                                <h1 className="text-surface-on text-xl font-medium">{item.fieldName}</h1>
                                <div className="flex items-start gap-2">
                                    <FaLocationDot className="text-primary shrink-0 translate-y-0.5"/>
                                    <span className="text-surface-onVariant line-clamp-1">{item.address}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <StarRating rating={item.averageRating}/>
                                    <span className="text-base text-surface-onVariant">({item.averageRating})</span>
                                </div>
                                <button 
                                    onClick={() => handleDeleteFavorites(item.fieldId)}
                                    className="absolute bottom-3 right-3">
                                    <div
                                        className="text-primary text-xl px-2 py-1 rounded-md hover:bg-primary hover:text-primary-on duration-200 transition-all ease-in-out">
                                        <AiFillDelete/>
                                    </div>
                                </button>
                            </li>
                        ))}
                    </ul>
                    {/* Phân trang */}
                    {/* Pagination controls */}
                    <div className="flex justify-center space-x-2 my-16">
                        {generatePageNumbers().map((p, index) =>
                        p === '...' ? (
                            <span key={index} className="px-3 py-1 text-gray-500 select-none">...</span>
                        ) : (
                            <button
                            key={index}
                            onClick={() => setPage(Number(p))}
                            className={`px-3 py-1 rounded ${
                                page === p ? 'bg-primary text-primary-on' : 'bg-surface-onVariant hover:bg-surface-onVariant/80'
                            }`}
                            >
                            {p}
                            </button>
                        )
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Favorites

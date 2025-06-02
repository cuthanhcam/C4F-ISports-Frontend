import { useEffect, useState } from "react";
import { FaLocationDot } from "react-icons/fa6"
import { GoClock } from "react-icons/go"
import { Link } from "react-router-dom"
import type { SportFieldResponse } from "../../../constants/fields";
import { fieldsAPI } from "../../../api/fields";
import { AiOutlineDelete } from "react-icons/ai";
import { CiEdit } from "react-icons/ci";
import { toast } from "react-toastify";



const FieldStatus = ({ openTime, closeTime }: { openTime: string; closeTime: string }) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const checkOpen = () => {
      const now = new Date();
      const currentMinutes = now.getHours() * 60 + now.getMinutes();

      const [openHour, openMinute] = openTime.split(":").map(Number);
      const [closeHour, closeMinute] = closeTime.split(":").map(Number);
      const openMinutes = openHour * 60 + openMinute;
      const closeMinutes = closeHour * 60 + closeMinute;

      if (closeMinutes < openMinutes) {
        return currentMinutes >= openMinutes || currentMinutes < closeMinutes;
      }

      return currentMinutes >= openMinutes && currentMinutes < closeMinutes;
    };

    setIsOpen(checkOpen());
  }, [openTime, closeTime]);

  return (
    <div className={`${isOpen ? "text-green dark:text-green-400" : "text-rose-500 dark:text-rose-400"} text-surface-onVariant dark:text-dark-surface-onVariant text-sm`}>
      {isOpen ? "Đang mở cửa" : "Đã đóng cửa"}
    </div>
  );
};

const PAGE_SIZE = 12;

const ManagementYard = () => {
    // GET dữ liệu
    const [formFields, setFormFields] = useState<SportFieldResponse>();
    const [page, setPage] = useState<number>(1);
    const [total, setTotal] = useState<number>(0);
    const totalPages = Math.ceil(total / PAGE_SIZE);
    const fetchFields = async (pageNumber: number) => {
        try {
          const res = await fieldsAPI.getMyFields({
            page: pageNumber,
            pageSize: PAGE_SIZE,
          });
          setFormFields(res.data);
          setPage(res.data.page);
          setTotal(res.data.total);
        } catch (err) {
          console.error(err);
        }
    };
    useEffect(() => {
        fetchFields(1);
    }, []);
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


  const handleDelete = async (fieldId: number) => {
    const isConfirmed = window.confirm("Bạn có chắc chắn muốn xóa sân này khỏi danh sách?");
    if (!isConfirmed) return;
    toast.success('Xóa thành công!');
    try {
      await fieldsAPI.deleteField(fieldId);
      await fetchFields(1);
    } catch (err) {
      console.error(err);
      toast.success('Xóa thất bại!');
    }
  }
    return (
        <div className="container py-6">
            <Link 
                to='create'
                className="text-base font-medium bg-primary px-6 py-2 rounded-md"
            >
                Thêm sân
            </Link>
            {/* Danh sách sân */}
            <div>
                 <div className="max-w-6xl mx-auto py-6 relative z-[0]">
                    <div className="home-header-light-blue dark:bg-[radial-gradient(closest-side_at_50%_50%,_#4b6cb7,_transparent)]" />
                    <div className="home-header-light-pink dark:bg-[radial-gradient(closest-side_at_50%_50%,_#9b59b6,_transparent)]" />
                    <div className="mt-[142px] md:mt-[162px] lg:mt-[182px]">
                    {/* Grid content */}
                    <div className="my-12 md:my-20">
                        <h1 className="text-5xl text-center text-surface-on font-bold mb-8">
                            Danh sách sân thể thao hiện tại
                        </h1>

                        <p className="text-center text-xl text-surface-onVariant flex justify-center gap-4 mb-16">
                            Tổng số sân hiện {total}
                        </p>
                        <div>
                        {/* Card */}
                        <ul className="grid grid-cols-4 gap-4">
                            {formFields?.data.map((field) => (
                              <li
                              key={field.fieldId}
                              className="border border-outline-variant dark:border-dark-outline-variant rounded-3xl p-2                                                                                                                 2xl:p-6 cursor-pointer bg-surface-1 dark:bg-dark-surface-1 shadow-navigation dark:shadow-navigation-dark hover:shadow-xl dark:hover:shadow-navigation-dark transition-all"
                              >
                              <div className="relative group w-full h-64">
                                  <img
                                  src={field.images?.[0]?.imageUrl ?? "/fallback.jpg"}
                                  alt={field.fieldName}
                                  className="w-full h-44 object-cover rounded-xl"
                                  />
                                  <div className="absolute inset-0 bg-black/60 flex flex-col items-start p-4 gap-2 opacity-0 group-hover:opacity-100 transition duration-300 rounded-xl">
                                  <span className="text-white text-sm">STT {field.fieldId}</span>
                                  <h1 className="text-white text-sm">{field.fieldName}</h1>
                                  <div className="flex items-start gap-2 text-sm line-clamp-2 h-[45.5px]">
                                      <FaLocationDot className="shrink-0 text-primary dark:text-dark-primary translate-y-0.5" />
                                      <span className="text-surface-onVariant dark:text-dark-surface-onVariant leading-relaxed">
                                      {field.address}
                                      </span>
                                  </div>
                                  <span className="text-white text-sm">Ngày tạo sân: {field.createdAt.slice(0, 10)}</span> 
                                  <span className="text-white text-sm">Ngày cập nhật sân gần nhất:  {field.updatedAt.slice(0, 10)}</span> 
                                  </div>
                              </div>
                              <div className="flex flex-col gap-2 my-8">
                                  <h1 className="text-xl text-surface-on dark:text-dark-surface-on font-medium text-center line-clamp-2 h-[64px]">
                                  {field.fieldName}
                                  </h1>
                                  <div className="text-white flex items-center gap-2 justify-end">
                                    <Link 
                                      to={`update/${field.fieldId}`}
                                      className="flex items-center gap-1 bg-yellow-400 p-1 rounded-sm">
                                        <AiOutlineDelete/>
                                        <span>Sửa</span>
                                    </Link>
                                    <button 
                                      onClick={() => handleDelete(field.fieldId)}
                                      className="flex items-center gap-1 bg-rose-500 p-1 rounded-sm">
                                        <AiOutlineDelete/>
                                        <span>Xóa</span>
                                    </button>
                                  </div>
                              </div>
                              </li>                          
                            ))}
                        </ul>
                        </div>
                    </div>
                    {/* Phân trang */}
                    <div className="flex justify-center space-x-2 my-16">
                        {generatePageNumbers().map((p, index) =>
                        p === "..." ? (
                            <span
                            key={index}
                            className="px-3 py-1 text-surface-onVariant dark:text-dark-surface-onVariant select-none"
                            >
                            ...
                            </span>
                        ) : (
                            <button
                            key={index}
                            onClick={() => setPage(Number(p))}
                            className={`px-3 py-1 rounded ${
                                page === p
                                ? "bg-primary dark:bg-dark-primary text-surface-1 dark:text-dark-primary-on"
                                : "bg-surface-4 dark:bg-dark-surface-4 text-surface-on dark:text-dark-surface-on hover:bg-surface-3 dark:hover:bg-dark-surface-3"
                            } duration-200 transition-all ease-in-out`}
                            >
                            {p}
                            </button>
                        )
                        )}
                    </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default ManagementYard

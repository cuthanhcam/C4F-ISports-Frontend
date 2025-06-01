import { useNavigate, useParams } from "react-router";
import Layout from "../../../components/common/layout/Layout";
import { IoArrowBack } from "react-icons/io5";
import { useEffect, useState } from "react";
import { fieldsAPI } from "../../../api/fields";
import { FaLocationDot } from "react-icons/fa6";
import ImageSelector from "../../../components/ui/ImageSelector";
import { GoClock } from "react-icons/go";
import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";
import FieldBookingSection from "./FieldBookingSection";

const FieldStatus = ({ openTime, closeTime }) => {
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
    <div className={`${isOpen ? 'text-green' : 'text-rose-500'} text-base`}>
      {isOpen ? 'Đang mở cửa' : 'Đã đóng cửa'}
    </div>
  );
};

const StarRating = ({ rating, maxStars = 5}) => {
  const stars = [];
  for (let i = 1; i <= maxStars; i++) {
    if (rating >= i) {
      stars.push(<FaStar key={i} className="text-yellow-400 text-lg"/>);
    } else if (rating >= i - 0.5) {
      stars.push(<FaStarHalfAlt key={i} className="text-yellow-400 text-lg" />);
    } else {
      stars.push(<FaRegStar key={i} className="text-yellow-400 text-lg" />);
    }
  }
  return <div className="flex gap-1">{stars}</div>;
};

const DashBoardDetail = () => {
  const navigate = useNavigate();
  const { fieldId } = useParams();
  const [dataFieldsDetail, setDataFieldsDetail] = useState<FieldBookingSection>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (fieldId) {
          const id = Number(fieldId);
          if (!isNaN(id)) {
            const res = await fieldsAPI.getFieldsDetail(id);
            setDataFieldsDetail(Array.isArray(res.data) ? res.data : [res.data]);
          }
        }
      } catch (err) {
        console.error(err);
        setDataFieldsDetail([]);
      }
    };
    fetchData();
  }, [fieldId]);

  return (
    <Layout>
      <div className="bg-dark-surface">
        <div className="container py-6 relative z-[0]">
          <div className="home-header-light-blue" />
          <div className="home-header-light-pink" />
          <div className="mt-[142px] md:mt-[162px] lg:mt-[182px]">
            <button 
              onClick={() => navigate('/dashboard')}
              className="flex items-center justify-center gap-2 px-6 py-2 border border-dark-outline-variant rounded-md shadow-xunit group my-12 md:my-20"
            >
              <IoArrowBack className="text-primary text-xl group-hover:-translate-x-1.5 duration-300 transition-all ease-in-out"/>
              <span className="text-dark-surface-onVariant font-medium text-sm">Quay lại</span>
            </button>
            <div>
              {dataFieldsDetail.map((d) => (
                <li key={d.fieldId}>
                  <div className="my-12 md:my-20">
                    <h1 className="text-5xl text-dark-surface-on font-bold mb-6">Hình ảnh sân</h1>
                    <div className="relative">
                      <ImageSelector d={d} />
                    </div>
                  </div>
                  <div className="bg-dark-surface-1 p-6 rounded-3xl flex flex-col gap-4 relative">
                    <h1 className="text-5xl text-dark-surface-on font-bold mb-6">Thông tin chi tiết</h1>
                    <div className="flex items-center gap-2">
                      <FaLocationDot className="shrink-0 text-primary"/>
                      <span className="text-dark-surface-onVariant">{d.address}</span>
                    </div>
                    <div className="text-dark-surface-onVariant flex items-center gap-2">
                      <div className="flex items-center gap-2">
                        <GoClock/>
                        <span>Mở cửa: </span>
                      </div>
                      <span>
                        {d.openTime} - {d.closeTime}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-dark-surface-onVariant">Hiện tại: </span>
                      <FieldStatus openTime={d.openTime} closeTime={d.closeTime}/>
                    </div>
                    <p className="text-dark-surface-onVariant">{d.description}</p>
                    <div className="absolute top-8 right-8 flex flex-col gap-2">
                      <div className="flex items-center gap-2">
                        <StarRating rating={d.averageRating}/>
                        <span className="text-xl text-dark-surface-onVariant">{d.averageRating}</span>
                      </div>
                      <span className="text-dark-surface-onVariant text-sm">Lượt đánh giá</span>
                    </div>
                  </div>
                  <div className="my-14 md:my-20">
                    <h1 className="text-5xl text-dark-surface-on font-bold mb-16">Đặt sân tại đây</h1>
                    <FieldBookingSection fieldData={d} />
                  </div>
                </li>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DashBoardDetail;
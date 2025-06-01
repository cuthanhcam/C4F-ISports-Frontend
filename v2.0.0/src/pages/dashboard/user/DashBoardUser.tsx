import { useEffect, useState } from "react";
import Layout from "../../../components/common/layout/Layout";
import { IoSearchOutline, IoFilter } from "react-icons/io5";
import type { SportFieldResponse } from "../../../constants/fields";
import { fieldsAPI } from "../../../api/fields";
import { FaLocationDot } from "react-icons/fa6";
import { GoClock } from "react-icons/go";
import { ProvincesAPI, type District, type Province } from "../../../api/Provinces";
import type { SportsSection } from "../../../constants/sports";
import { sportsAPI } from "../../../api/sports";


import { IoFilter } from "react-icons/io5";
import { Link, Outlet } from "react-router-dom";


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

const DashBoardUser = () => {
  const [formFields, setFormFields] = useState<SportFieldResponse>();
  const [formSports, setFormSports] = useState<SportsSection>();
  const [page, setPage] = useState<number>(1);
  const [total, setTotal] = useState<number>(0);

  const totalPages = Math.ceil(total / PAGE_SIZE);

  const fetchFields = async (pageNumber: number) => {
    try {
      const res = await fieldsAPI.getFields({
        page: pageNumber,
        pageSize: PAGE_SIZE,
      });
      setOriginalFields(res.data.data);
      setFilteredFields(res.data.data);
      setFormFields(res.data);
      setPage(res.data.page);
      setTotal(res.data.total);
    } catch (err) {
      console.error(err);
    }
  };

  const [provincesCity, setProvincesCity] = useState<Province[]>([]);
  const [districts, setDistricts] = useState<District[]>([]);
  const [selectedCity, setSelectedCity] = useState<number | "">("");
  const [selectedDistrict, setSelectedDistrict] = useState<number | "">("");
  const [selectedSport, setSelectedSport] = useState<number | "">("");
  const [originalFields, setOriginalFields] = useState<SportFieldResponse["data"]>([]);
  const [filteredFields, setFilteredFields] = useState<SportFieldResponse["data"]>([]);

  useEffect(() => {
    const fetchProvinceCity = async () => {
      try {
        const res = await ProvincesAPI.ProvinceCity();
        setProvincesCity(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchProvinceCity();
  }, []);


  const handleCityChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const cityId = e.target.value === "" ? "" : Number(e.target.value);
    setSelectedCity(cityId);
    setSelectedDistrict("");
    if (cityId !== "") {
      try {
        const res = await ProvincesAPI.ProvinceDistrict(cityId);
        setDistricts(res.data.districts || []);
      } catch (err) {
        console.error(err);
      }
    } else {
      setDistricts([]);
    }
  };

  const handleDistrictChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDistrict(e.target.value === "" ? "" : Number(e.target.value));
  };

  const handleSportChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSport(e.target.value === "" ? "" : Number(e.target.value));
  };

  const handleFilter = () => {
    let filtered = [...originalFields];

    if (selectedCity !== "") {
      filtered = filtered.filter((field) =>
        field.address.includes(provincesCity.find((p) => p.code === selectedCity)?.name || "")
      );

      if (selectedDistrict !== "") {
        filtered = filtered.filter((field) =>
          field.address.includes(districts.find((d) => d.code === selectedDistrict)?.name || "")
        );
      }

      if (selectedSport !== "") {
        filtered = filtered.filter((field) => field.sportId === selectedSport);
      }
    } else if (selectedSport !== "") {
      filtered = filtered.filter((field) => Number(field.sportId) === selectedSport);
    }

    setFilteredFields(filtered);
    setTotal(filtered.length);
    setPage(1);
  };

  const fetchSports = async (pageNumber: number) => {
    try {
      const res = await sportsAPI.getSport({
        sort: "SportName:asc",
        page: pageNumber,
        pageSize: PAGE_SIZE,
      });
      setFormSports(res.data);
      setPage(res.data.page);
      setTotal(res.data.total);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchSports(1);
  }, []);

  useEffect(() => {
    fetchFields(page);
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

  return (
    <Layout>
      <div className="bg-surface dark:bg-dark-surface">
        <div className="container py-6 relative z-[0]">
          <div className="home-header-light-blue dark:bg-[radial-gradient(closest-side_at_50%_50%,_#4b6cb7,_transparent)]" />
          <div className="home-header-light-pink dark:bg-[radial-gradient(closest-side_at_50%_50%,_#9b59b6,_transparent)]" />
          <div className="mt-[142px] md:mt-[162px] lg:mt-[182px]">
            {/* Tìm kiếm thông tin địa chỉ sân */}
            <div className="my-12 md:my-20">
              <div className="my-12 md:my-20 bg-gradient-to-r from-primary-shade dark:from-dark-primary-shade to-primary-container dark:to-dark-primary-container rounded-3xl py-12 px-8 text-center relative overflow-hidden">
                <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 dark:bg-dark-surface/10 rounded-full transform translate-x-1/2 -translate-y-1/2"></div>
                <div className="absolute bottom-0 left-0 w-60 h-60 bg-white/5 dark:bg-dark-surface/5 rounded-full transform -translate-x-1/3 translate-y-1/3"></div>
                <div className="relative z-10">
                  <h2 className="text-3xl text-surface-on dark:text-dark-surface-on md:text-5xl font-bold mb-4">
                    Tìm sân thể thao hoàn hảo
                  </h2>
                  <p className="text-surface-onVariant dark:text-dark-surface-onVariant md:text-lg mb-8 max-w-3xl mx-auto leading-loose">
                    Đặt sân nhanh chóng, tiện lợi với hàng nghìn sân thể thao chất lượng
                  </p>
                  <div className="max-w-4xl mx-auto w-full bg-surface-1 dark:bg-dark-surface-1 rounded-3xl shadow-navigation dark:shadow-navigation-dark border border-outline-variant dark:border-dark-outline-variant">
                    <div className="flex gap-4 p-6">
                      <div className="w-full relative">
                        <IoSearchOutline className="shrink-0 h-[46px] absolute top-0 left-3 text-xl text-primary dark:text-dark-primary" />
                        <input
                          type="text"
                          placeholder="Tìm theo tên sân hoặc địa chỉ..."
                          className="w-full pl-10 pr-4 py-3 rounded-xl border border-outline-variant dark:border-dark-outline-variant outline-none bg-surface dark:bg-dark-surface text-surface-on dark:text-dark-surface-on focus:ring-2 focus:ring-primary dark:focus:ring-dark-primary focus:border-primary dark:focus:border-dark-primary"
                        />
                      </div>
                      <button className="px-4 py-3 bg-primary dark:bg-dark-primary rounded-xl text-surface-1 dark:text-dark-primary-on font-medium w-1/6 hover:bg-primary-shade dark:hover:bg-dark-primary-shade duration-200 transition-all ease-in-out">
                        Tìm kiếm
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Dropdown thông tin */}
            <div className="my-12 md:my-20">
              <div className="flex items-center justify-around gap-4">
                {/* Thành phố | Tỉnh */}
                <select
                  value={selectedCity}
                  onChange={handleCityChange}
                  className="border bg-surface dark:bg-dark-surface border-outline-variant dark:border-dark-outline-variant outline-none text-surface-on dark:text-dark-surface-on rounded-xl px-4 py-2.5 w-1/4 focus:ring-2 focus:ring-primary dark:focus:ring-dark-primary focus:border-primary dark:focus:border-dark-primary"
                >
                  <option value="">Tỉnh Thành</option>
                  {provincesCity.map((province) => (
                    <option key={province.code} value={province.code}>
                      {province.name}
                    </option>
                  ))}
                </select>
                {/* Quận | Huyện */}
                <select
                  value={selectedDistrict}
                  onChange={handleDistrictChange}
                  className="border bg-surface dark:bg-dark-surface border-outline-variant dark:border-dark-outline-variant outline-none text-surface-on dark:text-dark-surface-on rounded-xl px-4 py-2.5 w-1/4 focus:ring-2 focus:ring-primary dark:focus:ring-dark-primary focus:border-primary dark:focus:border-dark-primary"
                >
                  <option value="">Quận Huyện</option>
                  {districts.map((district) => (
                    <option key={district.code} value={district.code}>
                      {district.name}
                    </option>
                  ))}
                </select>
                {/* Tất cả môn thể thao */}
                <select
                  value={selectedSport}
                  onChange={handleSportChange}
                  className="border bg-surface dark:bg-dark-surface border-outline-variant dark:border-dark-outline-variant outline-none text-surface-on dark:text-dark-surface-on rounded-xl px-4 py-2.5 w-1/4 focus:ring-2 focus:ring-primary dark:focus:ring-dark-primary focus:border-primary dark:focus:border-dark-primary"
                >
                  <option value="">Tất cả môn thể thao</option>
                  {formSports?.data.map((sport) => (
                    <option key={sport.sportId} value={sport.sportId}>{sport.sportName}</option>
                  ))}
                </select>
              </div>
              <div className="flex justify-end mt-8">
                <button
                  onClick={handleFilter}
                  className="flex items-center gap-2 bg-primary dark:bg-dark-primary px-6 py-2 rounded-md text-surface-1 dark:text-dark-primary-on font-medium hover:bg-primary-shade dark:hover:bg-dark-primary-shade duration-200 transition-all ease-in-out"
                >
                  <IoFilter className="text-xl" />
                  <span>Lọc</span>
                </button>
              </div>
            </div>
            {/* Grid content */}
            <div className="my-12 md:my-20">
              <h1 className="text-5xl text-center text-surface-on dark:text-dark-surface-on font-bold mb-8">
                Danh sách sân thể thao hiện tại
              </h1>
              <p className="text-center text-xl text-surface-onVariant dark:text-dark-surface-onVariant flex justify-center gap-4 mb-16">
                Có tổng
                <div className="relative text-surface-1 dark:text-dark-primary-on font-bold">
                  <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 bg-primary dark:bg-dark-primary w-10 h-10 z-[-20] shadow-navigation dark:shadow-navigation-dark"></div>
                  <div className="absolute top-0 left-0 bg-surface-variant dark:bg-dark-surface-variant z-[-20]"></div>
                  {total}
                </div>
                sân thể thao trên toàn cả nước!
              </p>
              <div>
                {/* Card */}
                <ul className="grid grid-cols-4 gap-4">
                  {filteredFields?.map((field) => (
                    <Link to={`/dashboard/${field.fieldId}`} key={field.fieldId}>
                      <li
                        className="border border-outline-variant dark:border-dark-outline-variant rounded-3xl p-6 cursor-pointer bg-surface-1 dark:bg-dark-surface-1 shadow-navigation dark:shadow-navigation-dark hover:shadow-xl dark:hover:shadow-navigation-dark transition-all"
                      >
                        <div className="relative group w-full h-64">
                          <img
                            src={field.images?.[0]?.imageUrl ?? "/fallback.jpg"}
                            alt={field.fieldName}
                            className="w-full h-64 object-cover rounded-xl"
                          />
                          <div className="absolute inset-0 bg-black/60 flex flex-col items-start p-4 gap-2 opacity-0 group-hover:opacity-100 transition duration-300 rounded-xl">
                            <p className="text-surface-1 dark:text-dark-surface-on text-base font-semibold">{field.fieldName}</p>
                            <div className="flex items-start gap-2 text-sm line-clamp-2 h-[45.5px]">
                              <FaLocationDot className="shrink-0 text-primary dark:text-dark-primary translate-y-0.5" />
                              <span className="text-surface-onVariant dark:text-dark-surface-onVariant leading-relaxed">
                                {field.address}
                              </span>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                              <GoClock className="shrink-0 text-primary dark:text-dark-primary" />
                              <span className="text-surface-onVariant dark:text-dark-surface-onVariant">
                                {field.openTime} - {field.closeTime}
                              </span>
                            </div>
                            <FieldStatus openTime={field.openTime} closeTime={field.closeTime} />
                          </div>
                        </div>
                        <div className="flex flex-col gap-2 mt-8">
                          <h1 className="text-2xl text-surface-on dark:text-dark-surface-on font-medium text-center line-clamp-2 h-[64px]">
                            {field.fieldName}
                          </h1>
                          <p className="text-surface-onVariant dark:text-dark-surface-onVariant text-center leading-relaxed line-clamp-2 h-[52px]">
                            {field.description}
                          </p>
                        </div>
                      </li>
                    </Link>
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
      <Outlet />
    </Layout>
  );
};

export default DashBoardUser;
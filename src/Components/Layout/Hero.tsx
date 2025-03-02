import React from "react";
import HeroImage from "/src/assets//images//banners/home.webp";
import { motion } from "framer-motion";
import { IoIosArrowUp } from "react-icons/io";
import { heroSearchChoicePlayData, heroSearchCityData, heroSearchDistrict } from "../../Data/heroData";
import { CustomIcons } from "../Icons/Icon";
import { div } from "motion/react-client";

interface HeroProps {
    displayedText: string;
    choicePlay: string;
    handleChoicePlay: (event: React.MouseEvent<HTMLAnchorElement>, value: string) => void;
    isSreachCity: boolean;
    setIsSreachCity: (value: boolean) => void;
    choiceCity: string;
    handleChoiceCity: (event: React.MouseEvent<HTMLAnchorElement>, value: string) => void;
    isSearchDistrict: boolean, 
    setIsSearchDistrict: (value: boolean) => void,
    choiceDistrict: string;
    handleChoiceDistrict: (event: React.MouseEvent<HTMLAnchorElement>, value: string) => void;
    isOpenPlay: boolean;
    setIsOpenPlay: (value: boolean) => void;
}

const Hero: React.FC<HeroProps> = ({ 
    displayedText, 
    choicePlay, handleChoicePlay, 
    isSreachCity, setIsSreachCity, 
    choiceCity,  handleChoiceCity,
    isSearchDistrict, setIsSearchDistrict,
    choiceDistrict, handleChoiceDistrict,
    isOpenPlay, setIsOpenPlay

}) => {
    return ( 
        <div className='w-full relative z-[1]'>
            <img src={HeroImage} alt="" className='object-contain w-full'/>
            <div className='absolute inset-0 bg-[#1b2a4e] opacity-50 z-[1]'></div>
            <div className='absolute z-[2] top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 font-primary font-medium flex flex-col items-center gap-8'>
                <h1 className="text-white text-center text-6xl max-w-[700px]">Sport court reservation and search engine</h1>
                <motion.div className="flex items-center justify-center gap-1">
                    <span className="text-5xl text-btn-primary font-primary font-semibold">{displayedText} </span>   
                    <span className="animate-blink text-5xl text-white">|</span>
                </motion.div>
                <form className="bg-white rounded-md grid grid-cols-[repeat(3,1fr)_0.5fr] pl-4 relative z-[10] min-w-[828px]">
                    
                    <div className="flex items-center gap-3 border-r-1 border-gray-300">
                        <img src={CustomIcons.place} alt="" className="w-6 h-6"/>
                        <span className="flex items-center gap-1 text-base font-primary font-medium relative w-full">
                            {choiceCity}
                            <IoIosArrowUp 
                                className={` cursor-pointer 
                                ${isSreachCity ? "rotate-180 duration-300 transition-transform ease-in-out" : "duration-300 transition-transform ease-in-out"}`} 
                                onClick={() => setIsSreachCity(!isSreachCity)}
                            />
                            {isSreachCity && (
                                <div className="absolute top-0 translate-y-1/3  left-0 bg-white z-[10] w-full min-w-[158px] rounded-sm">
                                    <ul className="flex flex-col items-start gap-2 py-2 w-full">
                                        {heroSearchCityData.map((city) => (
                                            <li key={city.id} className={`${city.id < heroSearchCityData.length ? "border-b border-b-gray-300" : ""} w-full flex justify-start pl-1.5`}>
                                                <a 
                                                    href="" 
                                                    onClick={(e) => {
                                                        handleChoiceCity(e, city.nameCity)
                                                        setIsSreachCity(!isSreachCity)
                                                    }}
                                                >
                                                    {city.nameCity}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </span>
                    </div>
                    
                    <div className="flex items-center gap-3 border-r-1 border-gray-300 pl-2">
                        <img src={CustomIcons.district} alt="" className="w-6 h-6"/>
                        <span className="flex items-center gap-1 text-base font-primary font-medium relative w-full">
                            {choiceDistrict}
                            <IoIosArrowUp 
                                className={` cursor-pointer 
                                ${isSearchDistrict ? "rotate-180 duration-300 transition-transform ease-in-out" : "duration-300 transition-transform ease-in-out"}`} 
                                onClick={() => setIsSearchDistrict(!isSearchDistrict)}
                            />
                            {isSearchDistrict && (
                                <div className="absolute top-0 translate-y-1/3 left-0 bg-white z-[10] w-full min-w-[158px] max-h-[138.4px] rounded-sm overflow-y-auto">
                                    <ul className="flex flex-col items-start gap-2 py-2 w-full">
                                        {heroSearchDistrict.map((district) => (
                                            <li key={district.id} className={`${district.id < heroSearchDistrict.length ? "border-b border-b-gray-300" : ""} w-full flex justify-start pl-1.5`}>
                                                <a 
                                                    href="" 
                                                    onClick={(e) => {
                                                        handleChoiceDistrict(e, district.nameDistrict)
                                                        setIsSearchDistrict(!isSearchDistrict)
                                                    }}
                                                >
                                                    {district.nameDistrict}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </span>
                    </div>

                    <div className="flex items-center gap-3 pl-2">
                        <img src={CustomIcons[choicePlay]} alt="" className="w-6 h-6"/>
                        <span className="flex items-center gap-1 text-base font-primary w-full font-medium relative order-1">
                            {choicePlay}
                            <IoIosArrowUp 
                                className={` cursor-pointer 
                                ${isOpenPlay ? "rotate-180 duration-300 transition-transform ease-in-out" : "duration-300 transition-transform ease-in-out"}`} 
                                onClick={() => setIsOpenPlay(!isOpenPlay)}
                            />
                            {isOpenPlay && (
                                <ul className="absolute top-0 translate-y-1/3 left-0 bg-white z-[10] w-full max-h-[138.4px] rounded-sm overflow-y-auto">
                                    {heroSearchChoicePlayData.map((choice) => (
                                        <li key={choice.id} className={`flex flex-col items-start gap-2 py-2 pl-1.5 ${choice.id < heroSearchChoicePlayData.length ? "border-b border-b-gray-300" : ""}`}>
                                            <a 
                                                onClick={(e) => {
                                                    handleChoicePlay(e, choice.name)
                                                    setIsOpenPlay(!isOpenPlay)
                                                }}
                                                href="" 
                                                className="flex items-center gap-3">
                                                <img src={choice.image} alt="" className="w-6 h-6"/>
                                                <span className="text-base font-primary">{choice.name}</span>
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </span>
                    </div>

                    <button className="bg-btn-primary px-4 py-3 text-base font-primary font-semibold cursor-pointer rounded-r-md border-none
                    ">
                        Tìm Kiếm
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Hero

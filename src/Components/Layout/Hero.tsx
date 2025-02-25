import React from "react";
import HeroImage from "/src/assets//images//banners/home.webp";
import { motion } from "framer-motion";


interface HeroProps {
    displayedText: string;
}

const Hero: React.FC<HeroProps> = ({ displayedText }) => {

    return (
        <div className='w-full relative z-[-1]'>
            <img src={HeroImage} alt="" className='object-contain w-full h-auto'/>
            <div className='absolute inset-0 bg-[#1b2a4e] opacity-50 z-[1]'></div>
            <div className='absolute z-[2] top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 text-center font-primary font-medium flex flex-col gap-8'>
                <h1 className="text-white text-6xl max-w-[700px]">Sport court reservation and search engine</h1>
                <motion.div className="flex items-center justify-center gap-1">
                    <span className="text-5xl text-btn-primary font-primary font-semibold">{displayedText} </span>   
                    <span className="animate-blink text-5xl text-white">|</span>
                </motion.div>
            </div>
        </div>
    )
}

export default Hero

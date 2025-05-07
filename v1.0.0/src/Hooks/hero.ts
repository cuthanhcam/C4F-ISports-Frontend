import { useEffect, useState } from "react";
import { heroData, heroSearchChoicePlayData } from "../Data/heroData";

export default function useHero() {
    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const [displayedText, setDisplayedText] = useState("");
    const [isDeleting, setIsDeleting] = useState(false);
    
    const [choicePlay, setChoicePlay] = useState(heroSearchChoicePlayData[0].name);
    const [isOpenPlay, setIsOpenPlay] = useState(false);


    const [isSreachCity, setIsSreachCity] = useState(false);
    const [isSearchDistrict, setIsSearchDistrict] = useState(false);
    
    
    function handleChoicePlay(event: React.MouseEvent<HTMLAnchorElement>, iconName: string) {
      event.preventDefault();
      setChoicePlay(iconName);
    }
    
    const [choiceCity, setChoiceCity] = useState("Thành Phố");
    function handleChoiceCity(event: React.MouseEvent<HTMLAnchorElement>, city: string) {
      event.preventDefault(); // Ngăn chặn chuyển hướng
      setChoiceCity(city); // Cập nhật giá trị mới
    }

    const [choiceDistrict, setChoiceDistrict] = useState("Quận");
    function handleChoiceDistrict(event: React.MouseEvent<HTMLAnchorElement>, district: string) {
      event.preventDefault(); // Ngăn chặn chuyển hướng
      setChoiceDistrict(district); // Cập nhật giá trị mới
    }
    
  //  const words = ["Soccer", "Golf", "Tennis", "Volleyball", "Rugby"];
    const words = heroData.map((wrod) => wrod.name);
    useEffect(() => {
        let timeout: ReturnType<typeof setTimeout>;
    
        if (!isDeleting) {
          // Hiện từng chữ một
          if (displayedText.length < words[currentWordIndex].length) {
            timeout = setTimeout(() => {
              setDisplayedText(words[currentWordIndex].slice(0, displayedText.length + 1));
            }, 100);
          } else {
            // Chờ một chút trước khi xóa
            timeout = setTimeout(() => setIsDeleting(true), 500);
          }
        } else {
          // Xóa từng chữ một
          if (displayedText.length > 0) {
            timeout = setTimeout(() => {
              setDisplayedText(words[currentWordIndex].slice(0, displayedText.length - 1));
            }, 100);
          } else {
            // Chuyển sang từ tiếp theo
            setIsDeleting(false);
            setCurrentWordIndex((prev) => (prev + 1) % words.length);
          }
        }
    
        return () => clearTimeout(timeout);
      }, [displayedText, isDeleting, currentWordIndex]);

    return {
        displayedText,
        choicePlay,
        handleChoicePlay, 
        isSreachCity, 
        setIsSreachCity,
        choiceCity, 
        handleChoiceCity,
        isSearchDistrict, 
        setIsSearchDistrict,
        choiceDistrict,
        handleChoiceDistrict,
        isOpenPlay, 
        setIsOpenPlay,
    }
}
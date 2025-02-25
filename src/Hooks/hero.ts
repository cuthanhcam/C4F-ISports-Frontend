import { useEffect, useState } from "react";
import { heroData } from "../Data/heroData";

export default function useHero() {
    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const [displayedText, setDisplayedText] = useState("");
    const [isDeleting, setIsDeleting] = useState(false);
    
    //const words = heroData;
    const words = ["Soccer", "Golf", "Tennis", "Volleyball", "Rugby"];
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
        displayedText
    }
}
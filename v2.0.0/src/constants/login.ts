import soccerImage from "../assets/images/soccer.jpg";
import badmintonImage from "../assets/images/badminton.jpg";
import pickleballImage from "../assets/images/pickleball.jpg";

export interface ILoginItem {
    id: number;
    nameSport: string;
    image: string;
};

export const LoginItem: ILoginItem[] = [
    { id: 1, nameSport: 'Soccer', image: soccerImage },
    { id: 2, nameSport: 'Badminton', image: badmintonImage },
    { id: 3, nameSport: 'Pickleball', image: pickleballImage },
]

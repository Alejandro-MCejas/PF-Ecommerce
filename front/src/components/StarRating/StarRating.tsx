"use client"

import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";


interface StarRatingProps {
    rating: number;
    setRating: (rating: number) => void;
}

const StarRating: React.FC<StarRatingProps> = ({ rating, setRating }) => {
    const [hover, setHover] = useState<number | null>(null);


    return (
        <div className="flex">
            {[1, 2, 3, 4, 5].map((star) => (
                <button
                    key={star}
                    type="button"
                    className="focus:outline-none"
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHover(star)}
                    onMouseLeave={() => setHover(null)}
                >
                    <FontAwesomeIcon
                        icon={faStar}
                        className={`text-2xl ${(hover || rating) >= star ? 'text-violet-500' : 'text-gray-200'
                            }`}
                    />
                </button>
            ))}
        </div>
    );
}

export default StarRating;
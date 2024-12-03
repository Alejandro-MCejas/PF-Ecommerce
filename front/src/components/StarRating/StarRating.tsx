"use client";

import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { addReview } from "@/helpers/productHelper";
// import { averageProductReview } from "@/helpers/reviewHelper";
import { averageProductReview } from "@/helpers/productHelper";
import { AddReviewProps } from "@/interfaces/IProduct";

interface StarRatingProps {
    productId: string; // ID del producto
    userId: string; // ID del usuario
    token: string; // Token de autenticación
    onReviewSubmitted?: () => void; // Callback para actualizar el estado del padre si es necesario
}

const StarRating: React.FC<StarRatingProps> = ({ productId, userId, token, onReviewSubmitted }) => {
    const [rating, setRating] = useState<number>(0); // Puntuación seleccionada
    const [hover, setHover] = useState<number | null>(null);
    const [averageRating, setAverageRating] = useState<number>(0); // Promedio de puntuaciones

    // Cargar la puntuación promedio desde la API
    useEffect(() => {
        const fetchAverageRating = async () => {
            try {
                const response = await averageProductReview(productId);
                if (response && response.averageRating !== undefined) {
                    setAverageRating(response.averageRating); // Usar averageRating de la respuesta
                }
            } catch (error) {
                console.error("Error fetching average rating:", error);
            }
        };

        fetchAverageRating();
    }, [productId]);

    const handleStarClick = (star: number) => {
        Swal.fire({
            title: `Are you sure you want to rate ${star} stars?`,
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, submit!",
        }).then(async (result) => {
            if (result.isConfirmed) {
                setRating(star); // Marca la puntuación seleccionada visualmente

                const review: AddReviewProps = {
                    productId,
                    userId,
                    rating: star,
                    comment: "", // Si necesitas comentarios
                };

                try {
                    const response = await addReview(review, token);
                    console.log("Review submitted:", response);

                    if (onReviewSubmitted) {
                        onReviewSubmitted();
                    }

                    Swal.fire("Submitted!", "Your review has been submitted.", "success");

                    // Actualiza la puntuación promedio después de enviar la reseña
                    const updatedResponse = await averageProductReview(productId);
                    if (updatedResponse && updatedResponse.averageRating !== undefined) {
                        setAverageRating(updatedResponse.averageRating);
                    }
                } catch (error) {
                    console.error("Error submitting review:", error);
                    Swal.fire("Error", "There was an error submitting your review. Please try again.", "error");
                }
            }
        });
    };

    return (
        <div className="flex items-center gap-2">
            {/* Estrellas */}
            <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                    <button
                        key={star}
                        type="button"
                        className="focus:outline-none"
                        onClick={() => handleStarClick(star)}
                        onMouseEnter={() => setHover(star)}
                        onMouseLeave={() => setHover(null)}
                    >
                        <FontAwesomeIcon
                            icon={faStar}
                            className={`text-2xl ${
                                (hover || rating || averageRating) >= star ? 'text-violet-500' : 'text-gray-200'
                            }`}
                        />
                    </button>
                ))}
            </div>

            {/* Promedio de Puntuaciones */}
            <p className="text-gray-700 text-sm">
                {averageRating.toFixed(1)} {/* Mostrar promedio con 1 decimal */}
            </p>
        </div>
    );
};

export default StarRating;


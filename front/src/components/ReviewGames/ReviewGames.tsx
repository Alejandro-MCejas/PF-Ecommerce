"use client";

import { useAuth } from "@/context/Authcontext";
import { addReview } from "@/helpers/productHelper";
import { AddReviewProps, IProduct } from "@/interfaces/IProduct";
import { useEffect, useState } from "react";
import ProductReviewCard from "../ProductReviewCard/ProductReviewCard";
import { useRouter } from "next/navigation";
import Link from "next/link";

const ReviewGames = ({ product }: { product: IProduct }) => {
    const { userData } = useAuth();
    const router = useRouter();
    const [reviewProduct, setReview] = useState<AddReviewProps>({
        productId: product.id,
        userId: "", // Inicialmente vacío
        rating: 3,
        comment: "",
    });

    useEffect(() => {
        if (userData?.user?.id) {
            setReview((prev) => ({ ...prev, userId: userData.user.id }));
        }
    }, [userData]);

    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setReview({
            ...reviewProduct,
            [name]: value,
        });
    };

    const handleSumbitReview = async () => {
        try {
            const review = await addReview(reviewProduct, userData?.token || "");
            console.log("Review submitted:", review);
            router.refresh()
        } catch (error) {
            console.error("Error submitting review:", error);
        }
    };

    return (
        <div className="my-5">
            <h2 className="ml-10 mb-4 text-[38px] text-gray-400 font-semibold">Make your own review</h2>
            {userData?.user.admin === "user" ? (
                <div className="w-full max-w-[1400px] mx-auto h-[210px] flex flex-col items-center">
                    <textarea
                        name="comment"
                        value={reviewProduct.comment}
                        onChange={handleChange}
                        placeholder="Write something here..."
                        className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500"
                    />
                    <div className="w-full flex justify-end items-center">
                        <button
                            onClick={handleSumbitReview}
                            className="mt-4 px-4 py-2 bg-violet-500 text-white font-semibold rounded-md hover:bg-violet-600 focus:outline-none focus:ring-2 focus:ring-violet-300"
                        >
                            Submit
                        </button>
                    </div>
                </div>
            ) : (
                <div className="w-full max-w-[1400px] mx-auto h-[210px] flex flex-col items-center">
                    <h2 className="text-gray-500 text-[20px] font-semibold">To make your review, please log in.</h2>
                    <Link href="/login" className="text-violet-500 text-[20px] font-serif">
                        Login
                    </Link>
                </div>
            )}
            <h2 className="ml-10 mb-5 text-[38px] text-gray-400 font-semibold">Product Reviews</h2>
            <div className="flex flex-col justify-evenly gap-7">
                {product.reviews
                    .filter((review) => review.comment?.trim() !== "") // Filtrar comentarios vacíos
                    .map((review) => (
                        <ProductReviewCard key={review.id} id={review.id} review={review.comment} />
                    ))}
            </div>
        </div>
    );
};

export default ReviewGames;

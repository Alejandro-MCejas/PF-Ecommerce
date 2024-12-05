"use client"

import { useAuth } from "@/context/Authcontext"
import { deleteReview } from "@/helpers/productHelper"
import { faUser } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useRouter } from "next/navigation"
import Swal from "sweetalert2"

const ProductReviewCard = ({ review, id }: { review: string, id: string }) => {
    const { userData } = useAuth()
    const router = useRouter()

    const handleDeleteComment = async (id: string) => {

        const result = await Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        });
        if (userData?.token) {
            if (result.isConfirmed) {
                try {
                    await deleteReview(id, userData?.token); // Llama a la función deleteReview con el id
                    await Swal.fire({
                        title: "Deleted!",
                        text: "Your review has been deleted.",
                        icon: "success"
                    });
                    router.refresh()
                } catch (error) {
                    console.error("Error deleting the review:", error);
                    Swal.fire({
                        title: "Error!",
                        text: "There was an error deleting the review. Please try again.",
                        icon: "error"
                    });
                }
            }
        }

    };


    return (
        <div className="w-full max-w-[1400px] mx-auto bg-white border-2 shadow-xl rounded-md h-[110px] flex justify-evenly items-center p-5">
            <div className="w-2/12 flex justify-center items-center">
                {/* <img src={product.image[0]} className="w-[50px] h-[50px] rounded-full" alt="" /> */}
                <FontAwesomeIcon icon={faUser} className="text-[50px]" />
            </div>
            <p className="w-10/12 text-[16px]">
                {review}
            </p>
            {
                userData?.user.admin === "admin" ? (
                    <button
                        className="bg-red-500 rounded-full w-[50px] h-[50px]"
                        onClick={() => handleDeleteComment(id)} // Pasa el id como argumento
                    >
                        X
                    </button>
                ) : (
                    <p></p>
                )
            }

        </div>
    )
}

export default ProductReviewCard;
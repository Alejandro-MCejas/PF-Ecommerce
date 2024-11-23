import { faUser } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const ProductReviewCard = ({review} : {review:string}) => {
    return (
        <div className="w-full max-w-[1400px] mx-auto bg-white border-2 shadow-xl rounded-md h-[110px] flex justify-evenly items-center p-5">
            <div className="w-2/12 flex justify-center items-center">
                {/* <img src={product.image[0]} className="w-[50px] h-[50px] rounded-full" alt="" /> */}
                <FontAwesomeIcon icon={faUser} className="text-[50px]" />
            </div>
            <p className="w-10/12 text-[16px]">
                {review}
            </p>
        </div>
    )
}

export default ProductReviewCard;
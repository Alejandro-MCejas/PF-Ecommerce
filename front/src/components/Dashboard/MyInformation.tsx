import Link from "next/link";

    
const MyInformation =()=>{
    return (
        <form className="space-y-4">
            <div className="flex flex-col">
                <label className="text-gray-700">Full name</label>
                <input type="text" className="p-2 border border-gray-300 rounded-lg" placeholder="Name" />
            </div>
            <div className="flex flex-col">
                <label className="text-gray-700">Email</label>
                <input type="text" className="p-2 border border-gray-300 rounded-lg" placeholder="example@example.com" />
            </div>
            <div className="flex space-x-4">
                <div className="flex-1 flex flex-col">
                    <label className="text-gray-700">Address</label>
                    <input type="text" className="p-2 border border-gray-300 rounded-lg" placeholder="1234 Main St" />
                </div>
                <div className="flex-1 flex flex-col">
                    <label className="text-gray-700">Phone number</label>
                    <input type="text" className="p-2 border border-gray-300 rounded-lg" placeholder="(123) 456-7890" />
                </div>
            </div>
            <div className="flex flex-col">
                <label className="text-gray-700">Card registered</label>
                <input type="text" className="p-2 border border-gray-300 rounded-lg" placeholder="**** **** **** 1234" />
            </div>
            <div className="text-sm text-gray-600">
                You are subscribed at <span className="text-blue-500 font-semibold">CyberGamer</span>
            </div>
            <div className="flex items-center space-x-4">
                <div className="flex-1 flex flex-col">
                    <label className="text-gray-700">Expiration date</label>
                    <input type="text" className="p-2 border border-gray-300 rounded-lg" placeholder="MM/YY" />
                </div>
                <button className="bg-red-500 text-white px-4 py-2 rounded-lg">Cancel subscription</button>
            </div>
            <div className="text-sm text-gray-600">
                Don&apos;t remember your password?  <Link href="/login" className="text-blue-500">Change your password</Link>
            </div>
            <div className="flex justify-center">
                <button className="bg-purple-500 text-white px-6 py-3 rounded-lg font-semibold mt-4">
                    Edit your information
                </button>
            </div>
        </form>
    );
}
export default MyInformation
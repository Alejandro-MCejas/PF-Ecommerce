import DeleteUser from "@/components/DeleteUser/DeleteUser"
import GetAllUsers from "@/components/getallusers/getallusers"

const visual = ()=>{
    return(
        <div className="bg-slate-300 text-center text-gray-800">
            visual
            <GetAllUsers/>
            <DeleteUser/>
            
        </div>
    )
}
export default visual
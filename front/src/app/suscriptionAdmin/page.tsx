import SideMenuAdmin from "@/components/SideMenuAdmin/SideMenuAdmin";

const suscriptionAdmin = ()=>{
    
    const role = "admin"
    
    if(role !== "admin") return null

    return(
        <div className="w-full max-w-[1500px] mx-auto h-[700px] bg-gray-300 my-3">
            <SideMenuAdmin/>
        </div>
    )
}

export default suscriptionAdmin;
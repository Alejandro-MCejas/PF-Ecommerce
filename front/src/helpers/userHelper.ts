
const APIURL: string | undefined = process.env.NEXT_PUBLIC_API_URL;
export const getUserById = async (userId:string) =>{
    try {
        const res = await fetch(`${APIURL}/users/${userId}`, {
            method: "GET",
            headers: {
              "Content-type": "application/json",
              'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjA4ZTFhODY3LTM0ODctNGI1OC05NDZjLTgwM2IyZjQyYmRkYyIsImVtYWlsIjoiYWRtaW4xQGdtYWlsLmNvbSIsInJvbGVzIjoiYWRtaW4iLCJpYXQiOjE3MzI2MjkyNDEsImV4cCI6MTczMjYzMjg0MX0.EYVTdYfTnQMBrl18cS5bp--JC1HKdPgtKo_VqMl8bFU`, // si es necesario
            },            
          });
        const userInformation = res.json()
        return userInformation
    } catch (error) {
        console.log("The error was", error)
    }
}
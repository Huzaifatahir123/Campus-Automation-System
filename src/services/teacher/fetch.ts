import axios from "axios"
export async function getTeachers():Promise<{}>{
             try {
                const response = await axios.get("/api/teacher/fetch");
                console.log(response.data);
                return response
             } catch (error:any) {
                console.error(error.message)
                return {}
             }
}
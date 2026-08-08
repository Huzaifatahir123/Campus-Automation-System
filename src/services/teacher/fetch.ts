import axios from "axios"
export async function getTeachers(search:string):Promise<{}>{
             try {
                const response = await axios.get(`/api/teacher/fetch?search=${search}`);
                console.log(response.data);
                return response
             } catch (error:any) {
                console.error(error.message)
                return {}
             }
}
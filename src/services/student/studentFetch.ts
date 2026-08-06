import axios from "axios"
export async function getStudents(search:string):Promise<{}>{
             try {
                const response = await axios.get(`/api/student/fetch?search=${search}`);
                console.log(response.data);
                return response
             } catch (error:any) {
                console.error(error.message)
                return {}
             }
}
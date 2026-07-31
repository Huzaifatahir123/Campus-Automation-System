import axios from "axios"
export async function getStudents():Promise<{}>{
             try {
                const response = await axios.get("/api/student/fetch");
                console.log(response.data);
                return response
             } catch (error:any) {
                console.error(error.message)
                return {}
             }
}
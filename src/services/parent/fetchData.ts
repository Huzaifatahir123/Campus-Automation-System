import axios from "axios"
export async function getParents():Promise<{}>{
             try {
                const response = await axios.get("/api/parent/fetch");
                console.log(response.data);
                return response
             } catch (error:any) {
                console.error(error.message)
                return {}
             }
}
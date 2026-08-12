import axios from "axios"
export async function getParents(search: string):Promise<{}>{
             try {
                const response = await axios.get(`/api/parent/fetch?search=${search}`);
                console.log(response.data);
                return response
             } catch (error:any) {
                console.error(error.message)
                return {}
             }
}
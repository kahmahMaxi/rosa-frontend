
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { useGetuser } from "./useGetuser";


export const useAppuserout = () => {

    const navigate = useNavigate()

    const user = useSelector((state) => state.user.value)
    const { getUser } = useGetuser()

    const checkAppUser = async () => {
        try {
            var storeditem = localStorage.getItem('rosatechuser')
            if(!storeditem) {
                navigate('/signin')
            } else {
                // check if user is null then make request to the db to get details
                if(!user) {
                    console.log('user state is null')
                    var parsed = JSON.parse(storeditem)
                    await getUser(parsed.username)
                }
            }
        } catch(err) {
            console.log(err)
        }
    }


    return { checkAppUser }

}








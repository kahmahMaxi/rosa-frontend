
import { useNavigate } from "react-router-dom";


export const useAppuserin = () => {

    const navigate = useNavigate()

    const checkAppUser = () => {
        try {
            var storeditem = localStorage.getItem('rosatechuser')
            if(storeditem) {
                navigate('/dashboard')
            }
        } catch(err) {
            console.log(err)
        }
    }

    return { checkAppUser }

}






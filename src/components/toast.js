import { useEffect } from "react"
import { useDispatch, useSelector } from 'react-redux';



// states_g
import { setgtNull } from './../redux/gtstatusSlice';
import { setgtMessage } from './../redux/gtmsgSlice';




const ToastGeneral = () => {

    const gtstatus = useSelector((state) => state.gtstatus.value)
    const gtmessage = useSelector((state) => state.gtmessage.value)

    const dispatch = useDispatch()

    // useEffect(() => {
    //     setTimeout(checkToast(), 5000)
    // }, [])
    useEffect(() => {
        setTimeout(() => {
            dispatch(setgtNull())
            dispatch(setgtMessage(''))
        }, 5000)
    }, [gtmessage, gtstatus])

    const checkToast = () => {
        if(gtstatus || gtmessage) {
            dispatch(setgtNull())
            dispatch(setgtMessage(''))
        }
    }

    return ( 
        <div className={`toast-container ${gtstatus ? 'active' : ''}`}>
            <div className={`toast-box ${gtstatus ? gtstatus : ''}`}>
                <p>{gtmessage}</p>
            </div>
        </div>
    );
}
 
export default ToastGeneral;
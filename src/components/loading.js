


import { useSelector } from 'react-redux';
import thelogo from './../media/img/rs_logo_single_nb.png'

const Loading = () => {

    const globalloading = useSelector((state) => state.globalloading.value)

    return ( 
        <div className={`loading ${globalloading ? 'loading-active' : ''}`}>
            <div className="loading-box">
                <img src={thelogo} alt="" />
            </div>
        </div>
    );
}
 
export default Loading;
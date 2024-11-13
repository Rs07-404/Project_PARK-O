import close_icon from "../../assets/icons/cross.svg";
import { useAppContext } from "../../context/AppContext";

const ReservationBox = () => {
    const { selectedSpot, setSelectedSpot } = useAppContext();
    return (
        <div className="reservationBox">
            <div className="reservationForm">
                <div className="reservationHeader">
                    <div className="reservationHeading">Payment Details</div>
                    <div className="close"onClick={()=>{setSelectedSpot(null)}} >{close_icon}</div>
                </div>
                <div className="reservationDetails">
                    <div className="bookingRent">₹20</div>
                    <div className="paymentButton">Pay with Google Pay</div>
                </div>
            </div>
        </div>
    )
}

export default ReservationBox
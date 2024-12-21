import { useState } from "react";
import close_icon from "../../assets/icons/cross.svg";
import { useAppContext } from "../../context/AppContext";
import { ParkingSpot } from "../../types/ParkingSpot.type";

const ReservationBox: React.FC<{selectedSpot: ParkingSpot, closeModal: ()=>void}> = ({selectedSpot, closeModal}) => {
    const [ rentPerHour, setRentPerHour ] = useState<number>(20)
    const [ finalPrice, setfinalPrice ] = useState<number>(20);
    const handleChange = (e)=>{
        const time = parseInt(e.target.value);
        const price = time * rentPerHour 
        setfinalPrice(price);
    }
    return (
        <div className="reservationBox">
            <div className="reservationForm">
                <div className="reservationHeader">
                    <div className="reservationHeading">Payment Details for <b>#{selectedSpot?.spotNumber}</b></div>
                    <div className="close" ><img onClick={closeModal} className="closeButton" src={close_icon} alt="" /></div>
                </div>
                <div className="reservationDetails">
                    <div className="bookingForm">
                        <div className="bookingRent">Rent Per Hour: <b>₹{rentPerHour}</b></div>
                        <div className="timeSelect">
                            <div className="head">Parking Time:</div>
                            <select onChange={handleChange}>
                                <option value="1">1 Hour</option>
                                <option value="2">2 Hour</option>
                                <option value="3">3 Hour</option>
                            </select>
                        </div>
                        <div className="totalFee">Total Pay Amount: <b>₹{finalPrice}</b></div>
                    </div>
                    <div className="paymentButton">Pay ₹{finalPrice}</div>
                </div>
            </div>
        </div>
    )
}

export default ReservationBox
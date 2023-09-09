import "../styles/popup.css";
import { animated, useSpring } from "@react-spring/web";
import { useDispatch } from "react-redux";
import { removeVerifiedData } from "../features/unverifiedSlice";
import { useVerifyOrderMutation } from "../features/apiSlice";
import { ClipLoader } from "react-spinners";

const Popup = ({ selectedOrder,setPopup,isVerified }) => {
  const dispatch = useDispatch();

  const [verifyOrder, { isLoading: isVerifying }] = useVerifyOrderMutation();

  const verifyItem = async (id) => {
    const res = await verifyOrder(id);
    if (!(res.data === undefined)) {
      dispatch(removeVerifiedData(id));
    } else {
      alert("Can't verify");
    }
  };

  const closePopup = () => {
    setPopup(false)
  }

  const animateStyles = useSpring({
    from: {
      opacity: 0,
    },
    to: {
      opacity: 1,
    },
  });
  return (
    <animated.div style={animateStyles} className="popup_wrapper">
      <div className="popup_card">
        <h3>Verify Order</h3>
        <p>{selectedOrder.name}</p>
        <div className="buttons_wrapper">
          <button disabled={!isVerified} onClick={closePopup} className="btn dark_btn">Cancel</button>
          <button onClick={() => verifyItem(selectedOrder.id)} className="btn light_btn">
            {!isVerifying ? "Verify" : <ClipLoader color="#6f6f6f" size={30} />}
          </button>
        </div>
      </div>
    </animated.div>
  );
};

export default Popup;

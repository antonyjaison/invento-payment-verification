import "../styles/receiptSection.css";
import { animated, useSpring } from "@react-spring/web";
import { MoonLoader, ClipLoader } from "react-spinners";
import { useVerifyOrderMutation } from "../features/apiSlice";
import { removeVerifiedData } from "../features/unverifiedSlice";
import { useDispatch } from "react-redux";
import { useState } from "react";

const RecieptSection = ({
  setShowReceiptSection,
  imageUrl,
  orderId,
  isVerified,
}) => {
  const dispatch = useDispatch();
  const [verifyOrder, { isLoading: isVerifying }] = useVerifyOrderMutation();
  const [paymentScreenShot, setPaymentScreenShot] = useState(imageUrl)
  const closeReceiptSection = () => {
    setShowReceiptSection(false);
  };

  const verifyItem = async (id) => {
    const res = await verifyOrder(id);
    if (!(res.data === undefined)) {
      dispatch(removeVerifiedData(id));
      setShowReceiptSection(false);
    } else {
      alert("Can't Verify");
    }
  };

  const animateStyles = useSpring({
    from: {
      opacity: 0,
    },
    to: {
      opacity: 1,
    },
  });

  const animateButtons = useSpring({
    from: {
      transform: "scale(0.8)",
    },
    to: {
      transform: "scale(1)",
    },
  });

  console.log(imageUrl)

  const newBaseUrl = 'https://res.cloudinary.com/inventov23/image/upload/v1693102226/InventoVerifyPayment/'

  return (
    <animated.div style={animateStyles} className="receipt_section_wrapper">
      <div className="img_section">
        {imageUrl ? (
          <img src={paymentScreenShot} alt="" onError={() => {
            const imgArr = imageUrl.split("/")
            setPaymentScreenShot(newBaseUrl+imgArr[imgArr.length - 1])
          }} />
        ) : (
          <MoonLoader color="#6f6f6f" size={50} />
        )}
      </div>
      <div className="button_section">
        <img onClick={closeReceiptSection} src="/icons/close.svg" alt="" />

        {isVerified && (
          <animated.div style={animateButtons} className="buttons">
            <button
              onClick={() => verifyItem(orderId)}
              className="btn receipt_transparent_btn"
            >
              {!isVerifying ? (
                "Verify Order"
              ) : (
                <ClipLoader color="#6f6f6f" size={30} />
              )}
            </button>
            <button disabled className="btn receipt_white_btn">
              Decline Order
            </button>
          </animated.div>
        )}
        <div></div>
      </div>
    </animated.div>
  );
};

export default RecieptSection;

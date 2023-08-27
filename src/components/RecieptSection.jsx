import "../styles/receiptSection.css";
import { animated, useSpring } from "@react-spring/web";
import { MoonLoader } from "react-spinners";

const RecieptSection = ({ setShowReceiptSection, imageUrl }) => {
  const closeReceiptSection = () => {
    setShowReceiptSection(false);
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

  return (
    <animated.div style={animateStyles} className="receipt_section_wrapper">
      <div className="img_section">
        {imageUrl ? (
          <img src={imageUrl} alt="" />
        ) : (
          <MoonLoader color="#6f6f6f" size={50} />
        )}
      </div>
      <div className="button_section">
        <img onClick={closeReceiptSection} src="/icons/close.svg" alt="" />
        <animated.div style={animateButtons} className="buttons">
          <button className="btn receipt_transparent_btn">Verify Order</button>
          <button className="btn receipt_white_btn">Decline Order</button>
        </animated.div>
        <div></div>
      </div>
    </animated.div>
  );
};

export default RecieptSection;

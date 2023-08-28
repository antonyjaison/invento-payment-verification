import "../styles/Card.css";
import { useDispatch } from "react-redux";
import { removeVerifiedData } from "../features/unverifiedSlice";
import { useVerifyOrderMutation } from "../features/apiSlice";

const Card = ({ setShowReceiptSection, data, setImageUrl, setOrderId }) => {
  const dispatch = useDispatch();

  const [verifyOrder, { isLoading: isVerifying }] = useVerifyOrderMutation();

  const showReceipt = (id) => {
    setShowReceiptSection((prev) => !prev);
    setImageUrl(data.paymentProof.secure_url);
    setOrderId(id);
  };

  const verifyItem = (id) => {
    console.log(isVerifying);
    verifyOrder(id).then(() => {
      dispatch(removeVerifiedData(id));
    });
  };
  return (
    <div className="card_wrapper">
      <p>Name : {data.name}</p>
      <p>Phone : {data.phone}</p>
      <p>Email : {data.email}</p>
      <p>Collage : {data.college}</p>
      <p>Total : {data.totalAmount}</p>
      <div className="card_buttons">
        <button onClick={() => showReceipt(data._id)} className="btn dark_btn">
          Receipt
        </button>
        <button onClick={() => verifyItem(data._id)} className="btn light_btn">
          Verify
        </button>
      </div>
    </div>
  );
};

export default Card;

import "../styles/Card.css";
import { useDispatch } from "react-redux";
import { removeVerifiedData } from "../features/unverifiedSlice";
import { useVerifyOrderMutation } from "../features/apiSlice";
import { ClipLoader } from "react-spinners";

const Card = ({ setShowReceiptSection, data, setImageUrl, setOrderId }) => {
  const dispatch = useDispatch();

  const [verifyOrder, { isLoading: isVerifying }] = useVerifyOrderMutation();

  const showReceipt = (id) => {
    setShowReceiptSection((prev) => !prev);
    setImageUrl(data.paymentProof.secure_url);
    setOrderId(id);
  };

  const verifyItem = async (id) => {
    console.log(data);
    const res = await verifyOrder(id);
    if (!(res.data === undefined)) {
      dispatch(removeVerifiedData(id));
    } else {
      console.log("noo");
    }
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
          {!isVerifying ? "Verify" : <ClipLoader color="#6f6f6f" size={30} />}
        </button>
      </div>
    </div>
  );
};

export default Card;

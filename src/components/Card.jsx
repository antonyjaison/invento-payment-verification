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
    const res = await verifyOrder(id);
    if (!(res.data === undefined)) {
      dispatch(removeVerifiedData(id));
    } else {
      alert("Can't verify");
    }
  };
  return (
    <div className="card_wrapper">
      <p><b>Name :</b> {data.name}</p>
      <p><b>Phone :</b> {data.phone}</p>
      <p><b>Email :</b> {data.email}</p>
      <p><b>Collage :</b> {data.college}</p>
      <p><b>Total :</b> {data.totalAmount}</p>
      <h3>
        <b>
          <u>Registered Events</u>
        </b>
      </h3>
      {data.orderEvents.map((e) => {
        return (
          <p>
            {e.event.name}
          </p>
        );
      })}
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

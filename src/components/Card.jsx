import "../styles/Card.css";
import Popup from "./Popup";
import { useState } from "react";

const Card = ({ setShowReceiptSection, data, setImageUrl, setOrderId }) => {
  const [popup, setPopup] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState({
    id: "",
    name: "",
  });

  const showReceipt = (id) => {
    setShowReceiptSection((prev) => !prev);
    setImageUrl(data.paymentProof.secure_url);
    setOrderId(id);
  };

  const showPopup = (id, name) => {
    setPopup((prev) => !prev);
    setSelectedOrder({
      id: id,
      name: name,
    });
  };

  return (
    <>
      <div className="card_wrapper">
        <p>
          <b>Name :</b> {data.name}
        </p>
        <p>
          <b>Phone :</b> {data.phone}
        </p>
        <p>
          <b>Email :</b> {data.email}
        </p>
        <p>
          <b>Collage :</b> {data.college}
        </p>
        <p>
          <b>Total :</b> {data.totalAmount}
        </p>
        <h3>
          <b>
            <u>Registered Events</u>
          </b>
        </h3>
        {data.orderEvents.map((e) => {
          return <p key={e.event.name}>{e.event.name}</p>;
        })}
        <div className="card_buttons">
          <button
            onClick={() => showReceipt(data._id)}
            className="btn dark_btn"
          >
            Receipt
          </button>
          <button onClick={() => showPopup(data._id,data.name)} className="btn light_btn">
            Verify
          </button>
        </div>
      </div>
      {popup ? <Popup selectedOrder={selectedOrder} setPopup={setPopup} /> : ""}
    </>
  );
};

export default Card;

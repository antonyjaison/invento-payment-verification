import "../styles/Card.css";

const Card = ({ setShowReceiptSection, data,setImageUrl }) => {
  const showReceipt = () => {
    setShowReceiptSection((prev) => !prev);
    setImageUrl(data.paymentProof.secure_url)
  };
  return (
    <div className="card_wrapper">
      <p>Name : {data.name}</p>
      <p>Order id : {data.phone}</p>
      <p>Email : {data.email}</p>
      <p>Collage : {data.college}</p>
      <p>Total : {data.totalAmount}</p>
      <div className="card_buttons">
        <button onClick={showReceipt} className="btn dark_btn">
          Receipt
        </button>
        <button className="btn light_btn">Verify</button>
      </div>
    </div>
  );
};

export default Card;

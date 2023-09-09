import "../styles/Card.css";
import ParticipantsPopup from "./ParticipantsPopup";
import Popup from "./Popup";
import { useState } from "react";
import format from "date-fns/format";

const Card = ({
  setShowReceiptSection,
  data,
  setImageUrl,
  setOrderId,
  isVerified,
}) => {
  const [popup, setPopup] = useState(false)
  const [showParticipants, setShowParticipants] = useState(false)
  const [selectedOrder, setSelectedOrder] = useState({
    id: "",
    name: "",
  })

  const showReceipt = (id) => {
    setShowReceiptSection((prev) => !prev)
    setImageUrl(data.paymentProof.secure_url)
    setOrderId(id)
  }

  const showPopup = (id, name) => {
    setPopup((prev) => !prev)
    setSelectedOrder({
      id: id,
      name: name,
    })
  }

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
          <b>Registered date :</b> {format(new Date(data.createdAt),'dd-MM-yyyy')}
        </p>
        <p>
          <b>Referal code :</b> {data.referalCode ? data.referalCode : "No referral"}
        </p>
        <p>
          <b>Total :</b> {data.totalAmount}
        </p>
        <p className="participant_link">
          <u onClick={() => setShowParticipants((prev) => !prev)}>
            Show participants
          </u>
        </p>

        <h3>
          <b>
            <u>Registered Events</u>
          </b>
        </h3>
        {data.orderEvents.map((e) => {
          return (
            <>
              <p key={e.event.name}>{e.event.name}</p>
              {e.type === "proshow" && e.uniqueId && (
                <div style={{ paddingLeft: "0.7rem" }}>
                  <p>Code: {e.uniqueId} </p>
                  <p>TicketCount: {e.ticketCount} </p>
                </div>
              )}
            </>
          )
        })}
        {!isVerified ? (
          <div className="card_buttons">
            <button
              onClick={() => showReceipt(data._id)}
              className="btn dark_btn"
            >
              Receipt
            </button>
            <button
              onClick={() => showPopup(data._id, data.name)}
              className="btn light_btn"
            >
              Verify
            </button>
          </div>
        ) : (
          ""
        )}
      </div>
      {popup ? (
        <Popup
          selectedOrder={selectedOrder}
          setPopup={setPopup}
        />
      ) : (
        ""
      )}
      {showParticipants ? (
        <ParticipantsPopup
          setShowParticipants={setShowParticipants}
          orderEvents={data.orderEvents}
        />
      ) : (
        ""
      )}
    </>
  )
}

export default Card

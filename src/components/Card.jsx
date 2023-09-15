import "../styles/Card.css";
import ParticipantsPopup from "./ParticipantsPopup";
import Popup from "./Popup";
import { useState } from "react";
import format from "date-fns/format";
import { useVerifyProshowMutation } from "../features/apiSlice";
import { verifyProshowLocal } from "../features/unverifiedSlice";
import { useDispatch } from "react-redux";

const Card = ({
  setShowReceiptSection,
  data,
  setImageUrl,
  setOrderId,
  isVerified,
}) => {
  const [popup, setPopup] = useState(false);
  const [showParticipants, setShowParticipants] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState({
    id: "",
    name: "",
  });

  const dispatch = useDispatch();

  const [verifyProshow, { isLoading: isVerifying }] =
    useVerifyProshowMutation();

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

  console.log(data);

  const proshowVerify = async (orderId, regId, day, day_for_local) => {
    console.log(orderId, regId, day, day_for_local);
    var b_day = "";
    if (day === "Day 2") {
      b_day = "dayTwo";
    } else {
      b_day = "dayThree";
    }
    
    const res = await verifyProshow({
      orderId: orderId,
      regId: regId,
      day: b_day,
    });

    console.log("orderId:", orderId);
    console.log("regId:", regId);
    console.log("day:", b_day);

    if (!(res.data === undefined)) {
      console.log("res", res.data);
      alert(res.data.message)
    } else {
      console.log("error");
      console.log("res", res);
    }

    //

    // const res = await fetch(
    //   "https://invento23-backend-production.up.railway.app/api/v1/orders/proshow/verify",
    //   {
    //     method: "post",
    //     body: JSON.stringify({
    //       orderId: orderId,
    //       regId: regId,
    //       day: b_day,
    //     }),
    //   }
    // );
    // console.log("orderId:", orderId);
    // console.log("regId:", regId);
    // console.log("day:", b_day);

    // const json = await res.json();

    // console.log(json);
  };

  return (
    <>
      <div key={data._id} className="card_wrapper">
        <p>
          <b>Name :</b> {data?.name}
        </p>
        <p>
          <b>Phone :</b> {data?.phone}
        </p>
        <p>
          <b>Email :</b> {data?.email}
        </p>
        <p>
          <b>Collage :</b> {data?.college}
        </p>
        <p>
          <b>Registered date :</b>
          {format(new Date(data?.createdAt), "dd-MM-yyyy")}
        </p>
        <p>
          <b>Referal code :</b>
          {data?.referalCode ? data?.referalCode : "No referral"}
        </p>
        <p>
          <b>Total :</b> {data?.totalAmount}
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
        {console.log(data)}
        {data.orderEvents.map((e) => {
          return (
            <>
              <p key={e.event?.name}>{e.event?.name}</p>
              {e.type === "proshow" && e?.uniqueId && (
                <div style={{ paddingLeft: "0.7rem" }}>
                  <p>Code: {e.uniqueId} </p>
                  <p>TicketCount: {e?.ticketCount} </p>
                  {e.name === "Day 2" && (
                    <div>
                      <label>
                        <input
                          onClick={() =>
                            proshowVerify(data._id, e?._id, e?.name, e?.name)
                          }
                          type="checkbox"
                          checked={e?.dayTwoCheck}
                        />
                        Day 2
                      </label>
                    </div>
                  )}
                  {e.name === "Day 3" && (
                    <div>
                      <label>
                        <input
                          onClick={() =>
                            proshowVerify(data._id, e?._id, e?.name, e?.name)
                          }
                          type="checkbox"
                          checked={e?.dayThreeCheck}
                        />
                        Day 3
                      </label>
                    </div>
                  )}
                  {e.name === "Combo" && (
                    <div>
                      {console.log(e)}
                      <label>
                        <input
                          onClick={() =>
                            proshowVerify(data._id, e?._id, "Day 2", "Combo")
                          }
                          type="checkbox"
                          checked={e?.dayTwoCheck}
                        />
                        Day 2
                      </label>
                      <br />
                      <label>
                        <input
                          onClick={() =>
                            proshowVerify(data._id, e?._id, "Day 3", "Combo")
                          }
                          type="checkbox"
                          checked={e?.dayThreeCheck}
                        />
                        Day 3
                      </label>
                    </div>
                  )}
                </div>
              )}
            </>
          );
        })}
        <div className="card_buttons">
          <button
            onClick={() => showReceipt(data?._id)}
            className="btn dark_btn"
          >
            Receipt
          </button>
          {isVerified ? (
            <button
              onClick={() => showPopup(data?._id, data?.name)}
              className="btn light_btn"
            >
              Verify
            </button>
          ) : (
            ""
          )}
        </div>
      </div>
      {popup ? <Popup selectedOrder={selectedOrder} setPopup={setPopup} /> : ""}
      {showParticipants ? (
        <ParticipantsPopup
          setShowParticipants={setShowParticipants}
          orderEvents={data.orderEvents}
        />
      ) : (
        ""
      )}
    </>
  );
};

export default Card;

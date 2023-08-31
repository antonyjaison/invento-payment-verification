import "../styles/participantsPopup.css";

const ParticipantsPopup = ({ setShowParticipants, orderEvents }) => {
  return (
    <div className="participants_popup_wrapper">
      <div className="participants_card">
        <div className="card_header">
          <div></div>
          <img
            onClick={() => setShowParticipants(false)}
            src="/icons/close_dark.svg"
            alt=""
          />
        </div>
        <div className="participants_section">

          {orderEvents.map((data) => {
            return (
              <div key={data._id}>
                <h3>{data.event.name}</h3>
                {data.participants.map((data) => {
                  return <p key={data}>{data}</p>;
                })}
              </div>
            );
          })}


        </div>
      </div>
    </div>
  );
};

export default ParticipantsPopup;

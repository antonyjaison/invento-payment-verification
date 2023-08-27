import Card from "../components/Card";
import RecieptSection from "../components/RecieptSection";
import "../styles/homePage.css";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useGetUnverifiedOrdersQuery } from "../features/apiSlice";
import { setData } from "../features/unverifiedSlice";
import MoonLoader from "react-spinners/MoonLoader";

const HomePage = () => {
  const [showReceiptSection, setShowReceiptSection] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState({
    name: "Techfest",
    id: "techfest",
  });
  const [imageUrl, setImageUrl] = useState("");
  const selectEvent = (event) => {
    setSelectedEvent(event);
    console.log(selectedEvent);
  };
  const eventLabels = [
    { name: "Techfest", id: "techfest" },
    { name: "Saptha", id: "saptha" },
    { name: "Taksathi", id: "taksathi" },
    { name: "Workshop", id: "workshop" },
    { name: "Competition", id: "competition" },
    { name: "Solo", id: "solo" },
    { name: "Exhibition", id: "exhibition" },
    { name: "General event", id: "general-event" },
    { name: "Spotlight", id: "spotlight" },
    { name: "Competition", id: "competition-2" },
    { name: "preEvent", id: "preevent" },
  ];

  const dispatch = useDispatch();
  const { data, isLoading, error, isError } = useGetUnverifiedOrdersQuery();

  useEffect(() => {
    dispatch(setData(data?.orders));
  }, [dispatch, isLoading]);

  const unverifiedData = useSelector((state) => state.unverifiedSlice);

  return (
    <>
      <main className="home_wrapper">
        <div className="sidebar">
          {eventLabels.map((event) => (
            <p
              className={selectedEvent.id === event.id ? "active_tab" : ""}
              onClick={() => selectEvent(event)}
              key={event.id}
            >
              {event.name}
            </p>
          ))}
        </div>
        <div className="home_body">
          <nav>
            <p>Hi, john@123</p>
            <p>
              Logout
              <img src="/icons/logout.svg" alt="" />
            </p>
          </nav>

          <h1>{selectedEvent.name}</h1>

          <div className="cards_section">
            {unverifiedData ? (
              unverifiedData.map((data) => {
                return (
                  <Card
                    key={data._id}
                    data={data}
                    setImageUrl={setImageUrl}
                    setShowReceiptSection={setShowReceiptSection}
                  />
                );
              })
            ) : (
              <MoonLoader color="#282828" size={50} />
            )}
          </div>
        </div>
      </main>
      {showReceiptSection && (
        <RecieptSection
          imageUrl={imageUrl}
          setShowReceiptSection={setShowReceiptSection}
        />
      )}
    </>
  );
};

export default HomePage;

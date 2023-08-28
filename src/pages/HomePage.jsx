import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setData, filterData } from "../features/unverifiedSlice";
import { useGetUnverifiedOrdersQuery } from "../features/apiSlice";
import Card from "../components/Card";
import RecieptSection from "../components/RecieptSection";
import MoonLoader from "react-spinners/MoonLoader";
import { useNavigate } from "react-router-dom";
import "../styles/homePage.css";
import eventLabels from "../events";
import { getUser } from "../utils/user";

const HomePage = () => {
  const [showReceiptSection, setShowReceiptSection] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [orderId, setOrderId] = useState("");
  const [selectedEvent, setSelectedEvent] = useState({
    name: "",
    id: "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const selectEvent = (event) => {
    setSelectedEvent(event);
  };

  const logout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  const { data, isLoading } = useGetUnverifiedOrdersQuery();

  useEffect(() => {
    if (data) {
      dispatch(setData(data.orders));
      setSelectedEvent({
        name: "Tech Fest",
        id: "techfest",
      });
    }
  }, [dispatch, data]);

  useEffect(() => {
    dispatch(filterData(selectedEvent));
  }, [dispatch, selectedEvent]);

  const unverifiedData = useSelector(
    (state) => state.unverifiedSlice.filterData
  );
  const username = getUser();

  useEffect(() => {
    if (!username) {
      navigate("/login");
    }
  }, []);

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
            <h1>{selectedEvent.name}</h1>
            <div className="username_section">
              <p>Hi, {username}</p>
              <p onClick={logout}>
                Logout
                <img src="/icons/logout.svg" alt="" />
              </p>
            </div>
          </nav>

          <div className="cards_section">
            {!isLoading ? (
              unverifiedData.length === 0 ? (
                <>
                  <h3>No orders!</h3>
                </>
              ) : (
                <>
                  {unverifiedData.map((data) => {
                    return (
                      <Card
                        setOrderId={setOrderId}
                        key={data._id}
                        data={data}
                        setImageUrl={setImageUrl}
                        setShowReceiptSection={setShowReceiptSection}
                      />
                    );
                  })}
                </>
              )
            ) : (
              <div className="cards_loading">
                <MoonLoader color="#282828" size={50} />
              </div>
            )}
          </div>
        </div>
      </main>
      {showReceiptSection && (
        <RecieptSection
          orderId={orderId}
          imageUrl={imageUrl}
          setShowReceiptSection={setShowReceiptSection}
        />
      )}
    </>
  );
};

export default HomePage;

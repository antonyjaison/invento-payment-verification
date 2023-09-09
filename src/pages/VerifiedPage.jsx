import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setData, filterData, filterByName } from "../features/unverifiedSlice";
import { useGetVerifiedOrdersQuery } from "../features/apiSlice";
import Card from "../components/Card";
import RecieptSection from "../components/RecieptSection";
import MoonLoader from "react-spinners/MoonLoader";
import { Link, useNavigate } from "react-router-dom";
import "../styles/unverifiedPage.css";
import eventLabels from "../events";
import { getUser } from "../utils/user";

const HomePage = () => {
  const [showReceiptSection, setShowReceiptSection] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [orderId, setOrderId] = useState("");
  const [searchName, setSearchName] = useState("");
  const [selectedEvent, setSelectedEvent] = useState({
    name: "",
    id: "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let count = 0;

  const selectEvent = (event) => {
    setSelectedEvent(event);
    if (window.innerWidth < 768) {
      setSidebarOpen(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  const toggleSidebar = () => {
    setSidebarOpen((prevState) => !prevState);
  };

  useEffect(() => {
    if (window.innerWidth > 768) {
      setSidebarOpen(true);
    }
  }, []);

  const handleChangeSearch = (e) => {
    const newSearchName = e.target.value;
    setSearchName(newSearchName); // Updating the searchName state
    console.log({ name: newSearchName, id: selectedEvent.id });
    dispatch(
      filterByName({ searchName: newSearchName, eventType: selectedEvent.id })
    );
  };

  const { data, isLoading } = useGetVerifiedOrdersQuery();

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

  count = unverifiedData.length;

  useEffect(() => {
    if (!username) {
      navigate("/login");
    }
  }, []);

  return (
    <>
      <main className="home_wrapper">
        <div
          className={`sidebar ${
            sidebarOpen ? "sidebar_open" : "sidebar_closed"
          }`}
        >
          <div className="sidebar_header">
            <div className="username_section">
              <p>Hi, {username}</p>
            </div>
            <img onClick={toggleSidebar} src="/icons/close.svg" alt="" />
          </div>
          <Link className="back_btn" to="/orders/unverified">
            <p>
              <img src="/icons/left_arrow.svg" alt="" /> Unverified orders
            </p>
          </Link>
          <div className="links">
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
          <p className="logout" onClick={logout}>
            Logout
            <img src="/icons/logout.svg" alt="" />
          </p>
        </div>

        <div className="home_body">
          <nav>
            <h1>{selectedEvent.name}</h1>
            {searchName.length > 0 ? (
              <h3>
                Results for '{searchName}' : {count}
              </h3>
            ) : (
              <h3>Total orders : {count}</h3>
            )}
            <div className="search_section d_sm_none">
              <div className="input_group">
                <img src="/icons/search.svg" alt="" />
                <input
                  onChange={handleChangeSearch}
                  value={searchName}
                  type="text"
                  placeholder="Search by name..."
                />
              </div>
              <div className="search_results"></div>
            </div>
            <img
              className="menu_icon"
              onClick={toggleSidebar}
              src="/icons/menu.svg"
              alt=""
            />
          </nav>

          <div className="mobile_search">
            <div className="search_section">
              <div className="input_group">
                <img src="/icons/search.svg" alt="" />
                <input
                  onChange={handleChangeSearch}
                  value={searchName}
                  type="text"
                  placeholder="Search by name..."
                />
              </div>
              <div className="search_results"></div>
            </div>
          </div>

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
                        isVerified={false}
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
          isVerified={false}
        />
      )}
      {sidebarOpen ? <div className="dim"></div> : ""}
    </>
  );
};

export default HomePage;

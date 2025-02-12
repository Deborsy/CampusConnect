"use client";
import { useState, useEffect, useRef } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { db } from "../app/firebase";
import { collection, getDocs } from "firebase/firestore";
import { CheckCircle } from "lucide-react";

const Home = () => {
  const [events, setEvents] = useState([]);
  const [nextEvent, setNextEvent] = useState(null);
  const [activeView, setActiveView] = useState("dayGridMonth");
  const [timeLeft, setTimeLeft] = useState(null);
  const [adminMessages, setAdminMessages] = useState([
    "Welcome to the event platform!",
    "The next major event starts tomorrow.",
    "The next major event starts next week.",
  ]);
  const calendarRef = useRef(null);

  // Fetch events from Firestore
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "events"));
        const eventList = querySnapshot.docs.map((doc) => {
          const eventData = doc.data();
          return {
            id: doc.id,
            title: eventData?.name,
            description: eventData.description,
            date: eventData.date?.toDate
              ? eventData.date.toDate()
              : new Date(eventData.date),
            location: eventData.location,
            category: eventData.category,
          };
        });

        setEvents(eventList);

        // Find the next upcoming event
        const now = new Date();
        const upcomingEvent = eventList
          .filter((event) => event.date > now)
          .sort((a, b) => a.date - b.date)[0];

        if (upcomingEvent) {
          setNextEvent(upcomingEvent);
          updateCountdown(upcomingEvent.date);
        }
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);

  // Countdown timer logic
  useEffect(() => {
    if (!nextEvent) return;

    const interval = setInterval(() => {
      updateCountdown(nextEvent.date);
    }, 1000);

    return () => clearInterval(interval);
  }, [nextEvent]);

  const updateCountdown = (eventDate) => {
    const now = new Date();
    const diff = eventDate - now;

    if (diff <= 0) {
      setTimeLeft(null);
      setNextEvent(null);
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    setTimeLeft({ days, hours, minutes, seconds });
  };

  //to change views
  const changeView = (view)=>{
    let calendarApi = calendarRef.current.getApi();
    calendarApi.changeView(view);
    setActiveView(calendarApi.view.type)
  }

  return (
    <div className="flex h-screen p-4 bg-white space-x-4">
      {/* Calendar Section */}
      <div className="w-3/5 p-4 bg-green-100 rounded-lg shadow-md">
        <div className="flex justify-between mb-4">
          <h2 className="text-2xl font-bold text-green-800">Event Calendar</h2>
          {/*------------------ Calendar View Switch Buttons -----------------*/}
          <div className="bg-white px-2 flex justify-between items-center w-60 h-9 space-x-2 my-3 rounded-2xl">
            {["dayGridMonth", "timeGridWeek", "timeGridDay"].map((view)=> (
              <button 
                key={view}
                className={`mx-1 rounded-2xl transition-all ${activeView === view ? "bg-green-300 text-sm px-3 py-1 text-white shadow-md": "text-black text-sm px-3 py-1 hover:bg-green-500 hover:text-white"}`}
                onClick={()=> changeView(view)}
              >
                {view === "dayGridMonth" 
                  ? "Month"
                  : view === "timeGridWeek"
                  ? "Week"
                  : "Day"
                }
              </button>

            ))}
          </div>

        </div>
        <div className="overflow-y-auto h-[500px] bg-white text-black p-4 rounded-md shadow-md">
          <FullCalendar
            ref={calendarRef}
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            events={events}
            headerToolbar={false} // Hide default toolbar
            height="100%"
            contentHeight="auto"
          />
        </div>
      </div>

      {/* Event Details and Countdown Section */}
      <div className="w-2/5 flex flex-col space-y-4">
        {/* Event Details */}
        <div className="flex-1 p-4 bg-white rounded-md shadow-md overflow-y-auto max-h-64">
          <h2 className="text-green-700 font-bold text-lg">Event Details</h2>
          {events.slice(0, 3).map((event) => (
            <div key={event.id} className="mt-2 p-3 border rounded-md bg-white">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-green-800">
                  {event.title}
                </h3>
                {event.date < new Date() && (
                  <CheckCircle className="text-green-500" size={20} />
                )}
              </div>
              <p className="text-gray-600">{event.description}</p>
              <p className="text-sm text-black">
                <strong>Date: </strong> {event.date.toDateString()}
              </p>
              <p className="text-sm text-black">
                <strong>Location: </strong> {event.location}
              </p>
            </div>
          ))}
        </div>

        {/* Countdown Section */}
        {nextEvent && (
          <div
          className="relative bg-cover bg-center p-4 rounded-md shadow-md"
          style={{
            backgroundImage: `url('/background.jpg')`,
          }}
        >
          {/* Dark transparent overlay */}
          <div className="absolute inset-0 bg-black bg-opacity-40 rounded-md"></div>
          
          {/* Countdown time content */}
          <div className="relative text-white text-center">
            <h2 className="font-bold text-lg">{nextEvent?.title} Starts In:</h2>
            <div className="flex justify-center space-x-2 mt-4">
              <div className="border border-white px-3 py-1 rounded-md">
                {timeLeft?.days}d
              </div>
              <div className="border border-white px-3 py-1 rounded-md">
                {timeLeft?.hours}h
              </div>
              <div className="border border-white px-3 py-1 rounded-md">
                {timeLeft?.minutes}m
              </div>
              <div className="border border-white px-3 py-1 rounded-md">
                {timeLeft?.seconds}s
              </div>
            </div>
          </div>
        </div>
        
        )}

        {/* Admin Notification Section */}
        <div className="p-4 bg-white rounded-md shadow-md">
          <h2 className="text-green-700 font-bold text-md">Notifications</h2>
          <ul className="mt-2 list-disc list-inside">
            {adminMessages.map((msg, index) => (
              <li key={index} className="text-sm text-gray-700">
                {msg}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Home;

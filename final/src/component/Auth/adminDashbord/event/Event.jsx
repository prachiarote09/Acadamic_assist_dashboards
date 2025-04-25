import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Event() {
  const [events, setEvents] = useState([]);
  const [formData, setFormData] = useState({ name: "", description: "", date: "" });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("http://localhost:8080/event/");
        if (!response.ok) throw new Error("Failed to fetch events");

        const data = await response.json();
        setEvents(data);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const addEvent = async (e) => {
    e.preventDefault();

    const newData = {
      name: formData.name.trim(),
      description: formData.description.trim(),
      date: formData.date,
    };

    try {
      const response = await fetch("http://localhost:8080/event/", {
        method: "POST",
        headers: {
          Authorization: localStorage.getItem("token"),
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newData),
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.message || "Failed to add event");

      setEvents((prev) => [...prev, result]); // Use the returned event
      setFormData({ name: "", description: "", date: "" });
    } catch (error) {
      console.error("Error adding event:", error);
    }
  };

  const deleteEvent = async (eventId) => {
    console.log("Attempting to delete event with ID:", eventId);

    if (!eventId || eventId.length !== 24) {
      console.error("Invalid ID passed:", eventId);
      return;
    }

    try {
      const response = await fetch(`http://localhost:8080/event/${eventId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to delete event: ${errorText}`);
      }

      setEvents((prevEvents) => prevEvents.filter((event) => event._id !== eventId));
      console.log("Event deleted successfully!");
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-gradient-to-b from-purple-500 to-purple-300 shadow-lg rounded-lg">
      <h1 className="text-center text-2xl font-bold text-white">Manage Events</h1>

      <form onSubmit={addEvent} className="space-y-6">
        <div>
          <label className="block text-white font-semibold">Event Name*</label>
          <input
            type="text"
            id="name"
            value={formData.name}
            onChange={handleInputChange}
            required
            className="w-full p-2 border bg-white border-gray-300 rounded-md"
          />
        </div>

        <div>
          <label className="block text-white font-semibold">Description*</label>
          <textarea
            id="description"
            value={formData.description}
            onChange={handleInputChange}
            required
            className="w-full p-2 border bg-white border-gray-300 rounded-md"
          ></textarea>
        </div>

        <div>
          <label className="block text-white font-semibold">Event Date*</label>
          <input
            type="date"
            id="date"
            value={formData.date}
            onChange={handleInputChange}
            required
            className="w-full p-2 border bg-white border-gray-300 rounded-md"
          />
        </div>

        <div className="flex justify-center gap-4">
          <button type="submit" className="bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600">
            Save Event
          </button>
        </div>
      </form>

      <h2 className="text-xl font-semibold text-white mt-8">Event List</h2>
      <ul className="mt-4 space-y-3">
        {events.map((event) => (
          <li key={event._id} className="bg-white p-4 rounded-lg shadow-md border-l-4 border-red-500">
            <h3 className="text-lg font-bold">{event.name}</h3>
            <p>{event.description}</p>
            <p className="text-gray-600">Date: {event.date}</p>
            {event._id && (
              <button onClick={() => deleteEvent(event._id)} className="bg-red-500 text-white px-3 py-1 rounded-md mt-2">
                Delete
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Event;

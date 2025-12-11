import React, { useState, useEffect } from 'react';
import './Calendar.css'; // Import CSS for styling

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [events, setEvents] = useState({}); // Example: { '2024-07-20': ['Meeting', 'Lunch'] }

  useEffect(() => {
    // Load events from local storage or API (example)
    const storedEvents = localStorage.getItem('events');
    if (storedEvents) {
      setEvents(JSON.parse(storedEvents));
    }
  }, []);

  useEffect(() => {
    // Save events to local storage whenever they change (example)
    localStorage.setItem('events', JSON.stringify(events));
  }, [events]);


  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month, 1).getDay(); // 0 (Sunday) to 6 (Saturday)
  };

  const goToPreviousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const handleDateClick = (date) => {
    setSelectedDate(date);
  };

  const addEvent = (date, eventText) => {
    const dateString = date.toISOString().slice(0, 10); // YYYY-MM-DD
    setEvents(prevEvents => {
      const updatedEvents = { ...prevEvents };
      if (updatedEvents[dateString]) {
        updatedEvents[dateString] = [...updatedEvents[dateString], eventText];
      } else {
        updatedEvents[dateString] = [eventText];
      }
      return updatedEvents;
    });
  };

  const removeEvent = (date, eventIndex) => {
    const dateString = date.toISOString().slice(0, 10);
    setEvents(prevEvents => {
      const updatedEvents = { ...prevEvents };
      if (updatedEvents[dateString]) {
        updatedEvents[dateString] = updatedEvents[dateString].filter((_, index) => index !== eventIndex);
        if (updatedEvents[dateString].length === 0) {
          delete updatedEvents[dateString];
        }
      }
      return updatedEvents;
    });
  };


  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDayOfMonth = getFirstDayOfMonth(currentDate);
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const monthName = currentDate.toLocaleString('default', { month: 'long' });

    const days = [];
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="calendar-day empty"></div>);
    }

    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(year, month, i);
      const isSelected = date.toDateString() === selectedDate.toDateString();
      const dateString = date.toISOString().slice(0, 10);
      const hasEvents = events[dateString] && events[dateString].length > 0;

      days.push(
        <div
          key={i}
          className={`calendar-day ${isSelected ? 'selected' : ''} ${hasEvents ? 'has-events' : ''}`}
          onClick={() => handleDateClick(date)}
        >
          {i}
          {hasEvents && (
            <div className="event-indicator"></div>
          )}
        </div>
      );
    }

    return (
      <div className="calendar-grid">
        {days}
      </div>
    );
  };

  const renderEventList = () => {
    const dateString = selectedDate.toISOString().slice(0, 10);
    if (!events[dateString] || events[dateString].length === 0) {
      return <p>No events for this day.</p>;
    }

    return (
      <ul>
        {events[dateString].map((event, index) => (
          <li key={index}>
            {event}
            <button onClick={() => removeEvent(selectedDate, index)}>Remove</button>
          </li>
        ))}
      </ul>
    );
  };

  const [newEventText, setNewEventText] = useState('');

  const handleAddEvent = () => {
    if (newEventText.trim() !== '') {
      addEvent(selectedDate, newEventText);
      setNewEventText('');
    }
  };


  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <button onClick={goToPreviousMonth}>&lt; Previous</button>
        <h2>{currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}</h2>
        <button onClick={goToNextMonth}>Next &gt;</button>
      </div>

      <div className="calendar-weekdays">
        <div>Sun</div>
        <div>Mon</div>
        <div>Tue</div>
        <div>Wed</div>
        <div>Thu</div>
        <div>Fri</div>
        <div>Sat</div>
      </div>

      {renderCalendar()}

      <div className="selected-date-info">
        <h3>Events for {selectedDate.toDateString()}</h3>
        {renderEventList()}

        <div>
          <input
            type="text"
            placeholder="Add new event"
            value={newEventText}
            onChange={(e) => setNewEventText(e.target.value)}
          />
          <button onClick={handleAddEvent}>Add Event</button>
        </div>
      </div>
    </div>
  );
};

export default Calendar;
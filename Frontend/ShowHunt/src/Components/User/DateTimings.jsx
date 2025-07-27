import { useNavigate } from 'react-router-dom';
import './DateTimings.css';

const DateTimings = ({ dateEntry, onTimeSelect, hideDate = false }) => {
  const navigate = useNavigate(); 

  const getOccupancyClass = (occupancy) => {
    if (occupancy === 0) return 'time-slot housefull';
    if (occupancy <= 30) return 'time-slot almost-full';
    if (occupancy <= 60) return 'time-slot filling-fast';
    return 'time-slot available';
  };

  const getOccupancyText = (occupancy) => {
    if (occupancy === 0) return 'HOUSEFULL';
    return `${occupancy} left`;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const options = {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    };

    let formattedDate = date.toLocaleDateString('en-US', options);

    if (date.toDateString() === today.toDateString()) {
      formattedDate = `Today, ${formattedDate}`;
    } else if (date.toDateString() === tomorrow.toDateString()) {
      formattedDate = `Tomorrow, ${formattedDate}`;
    }

    return formattedDate;
  };

  const groupedByTheatre = dateEntry.times.reduce((acc, timeObj) => {
    const theatreName = timeObj.theatreName;
    if (!acc[theatreName]) {
      acc[theatreName] = [];
    }
    acc[theatreName].push(timeObj);
    return acc;
  }, {});

  return (
    <div className="date-timings">
      {!hideDate && (
        <div className="date-header">
          <h3>{formatDate(dateEntry.date)}</h3>
          <span className="shows-count">
            {dateEntry.times.length} shows available
          </span>
        </div>
      )}

      <div className="theatre-groups">
        {Object.entries(groupedByTheatre).map(([theatreName, times]) => (
          <div key={theatreName} className="theatre-group">
            <div className="theatre-name">
              <h4>{theatreName}</h4>
            </div>
            <div className="time-slots-container">
              {times.map((timeObj, timeIndex) => (
                <button
                  key={timeIndex}
                  className={getOccupancyClass(timeObj.occupancy)}
                  onClick={() => {
                if (timeObj.occupancy !== 0) {
                 if (onTimeSelect) {
                  onTimeSelect(dateEntry.date, timeObj.time, timeObj);
                }

                if (timeObj.id) {
                  navigate('/movie/seats', {
                    state: {
                   mappingId: timeObj.id,
                    showTime: timeObj.time,
                    date:dateEntry.date
               }
              });
    } else {
      console.warn("mappingId missing for selected time");
    }
  }
}}

                >
                  <div className="time-info">
                    <span className="time">{timeObj.time}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DateTimings;

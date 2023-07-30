import React, { useEffect, useState } from 'react';
import CircleNotificationsIcon from '@mui/icons-material/CircleNotifications';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';

const PrCard = ({ data, onClick, name, logo }) => {

  const [Score, setScore] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      if (data && data.scores) {
        const filteredData = data.scores.filter(
          (obj) => obj.description === 'CURRENT'
        );

        setScore(filteredData);
      }
    };

    fetchData();
  }, [data]);







  const handleClick = () => {
    if (data && data.id) {
      onClick(data.id);
    }
  };

  return (
    <div className="match bg-white dark:bg-neutral-800" onClick={handleClick} >
      <div className="match-header">
        <div className="match-status">Live</div>
        <div className="match-tournament">
          {name && logo && (
            <>
              <img src={logo} alt="Tournament Logo" />{' '}
              {name}
            </>
          )}
        </div>
        <div className="match-actions">
          <button className="btn-icon">
            <i className="material-icons-outlined"></i>
          </button>
          <button className="btn-icon">
            <CircleNotificationsIcon />
          </button>
        </div>
      </div>
      <div className="match-content">
        <div className="column">
          <div className="team team--home">
            <div className="team-logo">
              {data && data.participants && data.participants[0] && (
                <img src={data.participants[0].image_path} alt="Team Logo" />
              )}
            </div>
            {data && data.participants && data.participants[0] && (
              <h2 className="team-name">{data.participants[0].name}</h2>
            )}
          </div>
        </div>
        <div className="column">
          <div className="match-details ">
            {data && (
              <div className="match-date">
                
                {data.starting_at}


              </div>
            )

            }

            <div className="match-score">
              {Score[0] && (
                <span className="match-score-number match-score-number--leading">
                  {Score[0].score.goals}
                </span>
              )}

              <span className="match-score-divider">:</span>
              {Score[1] && (
                <span className="match-score-number">
                  {Score[1].score.goals}
                </span>
              )}

             
            </div>
            {data && (
                <div className="match-time-lapsed"> {data.result_info} </div>
              )}
           
           

            <button className="match-bet-place bg-white dark:bg-neutral-800">
              <PlayCircleIcon className="test" />
            </button>
          </div>
        </div>
        <div className="column">
          <div className="team team--away">
            <div className="team-logo">
              {data && data.participants && data.participants[1] && (
                <img src={data.participants[1].image_path} alt="Team Logo" />
              )}
            </div>
            {data && data.participants && data.participants[1] && (
              <h2 className="team-name">{data.participants[1].name}</h2>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrCard;

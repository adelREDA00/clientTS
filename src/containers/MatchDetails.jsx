import React, { useEffect, useState } from 'react';
import CustomizedTimeline from '../components/CustomizedTimeline'
import AccessTimeIcon from '@mui/icons-material/AccessTime';
const SoccerPage = ({SingleMatch, name, logo}) => {
     
         
   /* <main>
        <div className="lineup-container">
        
          <div className="team-lineup">
    
            <div className="team">
              <h2>Team 1</h2>
              <ul>
                <li>Player 1</li>
                <li>Player 2</li>
                <li>Player 3</li>
             
              </ul>
            </div>
        
            <div className="team">
              <h2>Team 2</h2>
              <ul>
                <li>Player 1</li>
                <li>Player 2</li>
                <li>Player 3</li>
               
              </ul>
            </div>
          </div>
        </div>
      </main>
   */
    

    const [Score, setScore] = useState([]);

    useEffect(() => {
      const fetchData = async () => {
        if (SingleMatch && SingleMatch.scores) {
          const filteredData = SingleMatch.scores.filter(
            (obj) => obj.description === 'CURRENT'
          );
  
          setScore(filteredData);
        }
      };
  
      fetchData();
    }, [SingleMatch]);
  



  return (
    <div className='MD'>
      <header>
        <div className="logo-container">
        {SingleMatch && SingleMatch.participants && SingleMatch.participants[0] && (
                <div className="teams">
                <img src={SingleMatch.participants[1].image_path} alt="Team 2 Logo" />
                <h1>{SingleMatch.participants[1].name}</h1>
                </div>
              )}


     


          <div className="midlle">
          {name && logo && (
          
              <div className="league">
             <img src={logo} alt="Team Logo" />
             <h1>  {name}</h1>
              </div>
           
     
          )}
      
            
            {Score && Score[0] && Score[1] && (
                <>
       
             <span className="score">
             {Score[1].score.goals} - {Score[0].score.goals}
            </span>
                </>
   
         
            )}

       

          {SingleMatch && SingleMatch.result_info && (
          
          <div className="detail">
          {SingleMatch.result_info}
      </div>
 
      )}
      {SingleMatch && SingleMatch.result_info && (
          <small> <AccessTimeIcon className='icon'/> {SingleMatch.starting_at} </small>
      )

      }
   
        
          </div>





          {SingleMatch && SingleMatch.participants && SingleMatch.participants[0] && (
              <div className="teams">
                <img src={SingleMatch.participants[0].image_path} alt="Team 2 Logo" />
                <h1>{SingleMatch.participants[0].name}</h1>
                </div>
              )}

    
        </div>
      </header>
      {SingleMatch && SingleMatch.participants && SingleMatch.scores && (
         <CustomizedTimeline  names ={SingleMatch.participants} matchscores={SingleMatch.scores} />
      )

      }

      
    </div>

  );
};

export default SoccerPage;

import * as React from 'react';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import TimelineDot from '@mui/lab/TimelineDot';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import LaptopMacIcon from '@mui/icons-material/LaptopMac';
import HotelIcon from '@mui/icons-material/Hotel';
import RepeatIcon from '@mui/icons-material/Repeat';
import Typography from '@mui/material/Typography';

export default function CustomizedTimeline({ names, matchscores }) {
  // Filter data for 1ST_HALF
  const firstHalfMatches = matchscores ? matchscores.filter(obj => obj.description === '1ST_HALF') : [];

  // Filter data for 2ND_HALF
  const secondHalfMatches = matchscores ? matchscores.filter(obj => obj.description === '2ND_HALF') : [];


  return (
    <Timeline position="alternate">
      {firstHalfMatches.map((match, index) => (
        <TimelineItem key={index}>

          <TimelineOppositeContent
            sx={{ m: 'auto 0' }}
            align="right"
            variant="body2"

          >
            première mi-temps
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineConnector />
            <TimelineDot>
              ⚽
            </TimelineDot>
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent className='timeline_main'  sx={{ py: '12px', px: 2 }}>
          
          <img src={names[index].image_path} alt="" />
         
              <Typography variant="h6" component="span">
            {names[index].name}
              </Typography>
     
            <Typography> {match.score.goals} But  </Typography>
          </TimelineContent>
        </TimelineItem>
      ))}


      {secondHalfMatches.map((match, index) => (
        <TimelineItem key={index}>
          <TimelineOppositeContent
            sx={{ m: 'auto 0' }}
            variant="body2"
           
          >
            deuxième mi-temps
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineConnector />
            <TimelineDot color="primary">
              ⚽
            </TimelineDot>
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent className='timeline_main' sx={{ py: '12px', px: 2 }}>
          <img src={names[index].image_path} alt="" />

              <Typography variant="h6" component="span">
                
              {names[index].name}
              </Typography>
       
            <Typography>  {match.score.goals} But</Typography>
          </TimelineContent>
        </TimelineItem>
      ))}



      {/*     <TimelineItem>
        <TimelineSeparator>
          <TimelineConnector />
          <TimelineDot color="primary" variant="outlined">
          ⚽
          </TimelineDot>
          <TimelineConnector sx={{ bgcolor: 'secondary.main' }} />
        </TimelineSeparator>
        <TimelineContent sx={{ py: '12px', px: 2 }}>
          <Typography variant="h6" component="span">
            Sleep
          </Typography>
          <Typography>Because you need rest</Typography>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineSeparator>
          <TimelineConnector sx={{ bgcolor: 'secondary.main' }} />
          <TimelineDot color="secondary">
          ⚽
          </TimelineDot>
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent sx={{ py: '12px', px: 2 }}>
          <Typography variant="h6" component="span">
            Repeat
          </Typography>
          <Typography>Because this is the life you love!</Typography>
        </TimelineContent>
      </TimelineItem> */}



    </Timeline>
  );
}

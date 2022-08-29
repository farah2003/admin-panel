/* eslint-disable react/destructuring-assignment */
import React from 'react';
import Carousel from 'react-material-ui-carousel';
import { Paper, Button } from '@mui/material';

const items = [
  {
    name: 'Random Name #1',
    description: 'Probably the most random thing you have ever seen!',
  },
  {
    name: 'Random Name #2',
    description: 'Hello World!',
  },
];

const ChartPage = () => {
  return (
    <Carousel
      navButtonsProps={{
        style: {
          backgroundColor: '#7750d9',
          width: 60,
          height: 60,
        },
      }}
      indicatorIconButtonProps={{
        style: {
          color: '#7750d9', // 3
        },
      }}
      activeIndicatorIconButtonProps={{
        style: {
          color: 'red', // 2
        },
      }}
      next={(next, active) =>
        console.log(`we left ${active}, and are now at ${next}`)
      }
      prev={(prev, active) =>
        console.log(`we left ${active}, and are now at ${prev}`)
      }
      navButtonsAlwaysVisible
    >
      {items.map((item, i) => (
        <Paper>
          <h2>{item.name}</h2>
          <p>{item.description}</p>

          <Button className="CheckButton">Check it out!</Button>
        </Paper>
      ))}
    </Carousel>
  );
};
export default ChartPage;

import * as React from 'react';
import {
  Card , 
  CardContent ,
  CardMedia , 
  Typography ,
  CardActionArea,
  useMediaQuery
} 
from '@mui/material';
import "./CardServicio.scss";

function CardServicio({urlImage, title }) {

  const matches = useMediaQuery("(max-width:768px)");

  return (
    <Card className='card-service'>
      <CardActionArea>
        <CardMedia
          component="img"
          height={matches ? "90":"130" }
          image={urlImage}
          alt=""
        />
        <CardContent className='card-service-conten'>
          <Typography className="card-service-title">
            {title}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default  CardServicio;
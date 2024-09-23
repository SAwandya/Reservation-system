import React from "react";
import Slider from "react-slick";
import { Card, CardContent, Typography, IconButton } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const cardData = [
  { title: "Card 1", content: "This is card 1 content" },
  { title: "Card 2", content: "This is card 2 content" },
  { title: "Card 3", content: "This is card 3 content" },
  { title: "Card 4", content: "This is card 4 content" },
  { title: "Card 1", content: "This is card 1 content" },
  { title: "Card 2", content: "This is card 2 content" },
  { title: "Card 3", content: "This is card 3 content" },
  { title: "Card 4", content: "This is card 4 content" },
  { title: "Card 1", content: "This is card 1 content" },
  { title: "Card 2", content: "This is card 2 content" },
  { title: "Card 3", content: "This is card 3 content" },
  { title: "Card 4", content: "This is card 4 content" },
  // Add more cards as needed
];

const NextArrow = (props) => {
  const { onClick } = props;
  return (
    <IconButton
      onClick={onClick}
      style={{
        position: "absolute",
        top: "50%",
        right: "10px",
        zIndex: 1,
        backgroundColor: "white",
      }}
    >
      <ArrowForwardIosIcon />
    </IconButton>
  );
};

const PrevArrow = (props) => {
  const { onClick } = props;
  return (
    <IconButton
      onClick={onClick}
      style={{
        position: "absolute",
        top: "50%",
        left: "10px",
        zIndex: 1,
        backgroundColor: "white",
      }}
    >
      <ArrowBackIosIcon />
    </IconButton>
  );
};

const HorizontalCardSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5, // Number of cards to show at once
    slidesToScroll: 1,
    nextArrow: <NextArrow />, // Custom Next Arrow
    prevArrow: <PrevArrow />, // Custom Prev Arrow
  };

  return (
    <Slider {...settings}>
      {cardData.map((card, index) => (
        <Card key={index} sx={{ maxWidth: 300, margin: "0 10px" }}>
          <CardContent>
            <Typography variant="h5" component="div">
              {card.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {card.content}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </Slider>
  );
};

export default HorizontalCardSlider;

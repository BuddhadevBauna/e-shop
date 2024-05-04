import React from "react";
import "./Slider.css"
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const slider = (images, category) => {
    // Slick settings for the carousel
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        swipeToSlide: true,
        responsive: [
            {
                breakpoint: 768, // Adjust this breakpoint as needed for your mobile layout
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true
                }
            }
        ]
    };
    return (
        <Slider {...settings} className="slider">
            {images.map((image, index) => (
                <div key={index}>
                    <img src={image} alt={category + '-img'} />
                </div>
            ))}
        </Slider>
    )
}
export default slider;
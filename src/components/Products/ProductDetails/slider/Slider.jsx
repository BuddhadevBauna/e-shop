import React from "react";
import { useSelector } from "react-redux";
import "./Slider.css";
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Product from "../../product/Product";


const ImageSlider = (images, category) => {
    // If there's only one image, render it without the Slider component
    if (images.length === 1) {
        return (
            <div className="single-image">
                <img src={images[0]} alt={category + '-img'} />
            </div>
        );
    }
    // Slick settings for the carousel
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        swipeToSlide: true,
    };
    // Render Slider component with settings and images
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


//slider for similar product container
const SimilarProductSlider = () => {
    const particularProduct = useSelector((state) => state.productDetails);
    // console.log(particularProduct);
    const catgoryProducts = useSelector(state => state.categoryProducts.products);
    // console.log(catgoryProducts);

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        swipeToSlide: true,
        responsive: [
            {
                breakpoint: 1050,
                settings: {
                    slidesToShow: 3,
                }
            },
            {
                breakpoint: 767,
                settings: {
                    slidesToShow: 2,
                }
            },
        ],
    }
    if (!catgoryProducts) return <></>;
    return (
        <div className="similar-product-container">
            <Slider {...settings}>
                {catgoryProducts.filter(product => product.title !== particularProduct.title)
                    .map((product, index) => {
                        return (
                            <div className="product" key={product.id}>
                                <Product
                                    products={catgoryProducts}
                                    product={product}
                                    index={index}
                                />
                            </div>
                        )
                    })
                }
            </Slider>
        </div>
    )
}

export  {ImageSlider, SimilarProductSlider};
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import "./DetailsItem.css";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { ImageSlider } from "../slider/Slider";


const DetailsItem = () => {
    const particularProduct = useSelector((state) => state.productDetails);
    // console.log(particularProduct);


    //state fo large image
    const [largeImage, setLargeImage] = useState(null);
    // Ref for the vertically-img-show container
    const verticallyImgShowRef = useRef();


    useEffect(() => {
        // Set initial large image as the first image
        if (particularProduct.images) {
            setLargeImage(particularProduct.images[0]);
        }
    }, [particularProduct]);
    const handleMouseHover = (imageURL) => {
        setLargeImage(imageURL);
    }


    const handleScroll = (direction) => {
        const scrollAmount = 100; // Adjust this value based on scrolling speed
        verticallyImgShowRef.current.scrollTop += direction * scrollAmount;
    }


    if (!particularProduct) return <>Loading...</>; // Render nothing if product not available
    let { id, title, description, images, price, discountPercentage, rating, brand, category } = particularProduct;
    if (!images) return <>Loading...</>;
    return (
        <div key={id} className="produt-details-container">
            <div className="image-container">
                <div className="slider-container">
                    {ImageSlider(images, category)}
                </div>
                <div className="image-button">
                    <div className="img-lg-container">
                        <div className="verically-img-show" ref={verticallyImgShowRef}>
                            <div>
                                <ul>
                                    {images.map((image, index) => {
                                        return (
                                            <li key={index}>
                                                <img
                                                    src={image}
                                                    alt={category + '-img'}
                                                    onMouseOver={() => handleMouseHover(image)}
                                                />
                                            </li>
                                        )
                                    })}
                                </ul>
                            </div>
                            <div className="scroll-buttons">
                                <button className="scroll-btn top" onClick={() => handleScroll(-1)}>
                                    <i><IoIosArrowUp /></i>
                                </button>
                                <button className="scroll-btn bottom" onClick={() => handleScroll(1)}>
                                    <i><IoIosArrowDown /></i>
                                </button>
                            </div>
                        </div>
                        <div className="lg-img-show">
                            <img src={largeImage} alt={category + '-img'} />
                        </div>
                    </div>
                    <div className="button-container">
                        <button className="btn">Add To Cart</button>
                        <button className="btn">Buy Now</button>
                    </div>
                </div>
            </div>
            <div className="information-container">
            </div>
        </div>
    );
}

export default DetailsItem;
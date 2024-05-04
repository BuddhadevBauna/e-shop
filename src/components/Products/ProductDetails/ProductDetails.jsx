import React, { useEffect, useRef, useState } from "react";
import "./ProductDetails.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setProductDetails } from "../../../redux/reducers/productDetailsSlice";
import slider from "./slider/Slider";


const ProductDetails = () => {
    const product = useSelector((state) => state.productDetails);
    // console.log(product);

    const { productId } = useParams();
    // console.log(productId);

    const dispatch = useDispatch();
    useEffect(() => {
        const fetchProductDetails = async () => {
            try {
                const response = await axios('https://dummyjson.com/products/' + productId);
                // console.log(response);
                // console.log(response.data);
                dispatch(setProductDetails(response.data));
            } catch (error) {
                console.log(error);
            }
        }
        fetchProductDetails();
    }, [dispatch])


    const [largeImage, setLargeImage] = useState(null);
    const [lgImgContainerHeight, setLgImgContainerHeight] = useState(null);

    // Ref for the vertically-img-show container
    const verticallyImgShowRef = useRef();

    useEffect(() => {
        if (product && product.images) {
            setLargeImage(product.images[0]); // Set initial large image as the first image
        }
    }, [product]);
    useEffect(() => {
        if (verticallyImgShowRef.current) {
            // Get the height of the images in the vertically-img-show container
            const imageContainerHeight = verticallyImgShowRef.current.clientHeight;
            setLgImgContainerHeight(imageContainerHeight); // Set the height of the lg-img-show container
        }
    }, [product]);
    console.log(lgImgContainerHeight);

    const handleMouseHover = (imageURL) => {
        setLargeImage(imageURL);
    }

    const renderItem = () => {
        if (!product) return <>Loading...</>; // Render nothing if product not available
        let { id, title, images, category, price, discountPercentage, rating } = product;
        if (!images) return <>Loading...</>;


        return (

            <div key={id} className="produt-details-container">
                <div className="image-container">
                    <div className="slider-container">
                        {slider(images, category)}
                    </div>
                    <div className="img-lg-container">
                        <div className="verically-img-show" ref={verticallyImgShowRef}>
                            {images.map((image, index) => {
                                return (
                                    <img
                                        src={image}
                                        alt={category + '-img'}
                                        key={index}
                                        onMouseOver={() => handleMouseHover(image)}
                                    />
                                )
                            })}
                        </div>
                        <div className="lg-img-show" style={{ height: `${lgImgContainerHeight - 2.5}px` }}>
                            <img src={largeImage} alt={category + '-img'} />
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div>{renderItem()}</div>
    );
}

export default ProductDetails;
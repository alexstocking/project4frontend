import React from 'react';
import './HomePage.css';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom'
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import imageOne from '../../assets/IMG_3061.jpg'
import imageTwo from '../../assets/IMG_3086.jpg'
import imageThree from '../../assets/IMG_3147.jpg'
import imageFour from '../../assets/IMG_1738.jpg'
import imageFive from '../../assets/9.png'
import imageSix from '../../assets/1.png'
import imageSeven from '../../assets/2.png'
import homePageText from '../../assets/homepagetext.png'

export default function HomePage() {
    const settings = {
        dots: false,
        infinite: true,
        speed: 5000,
        slidesToShow: 3, // Adjust the number of slides shown at once
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000, // Set to true for autoplay
        responsive: [
            {
                breakpoint: 768, // Adjust breakpoints for responsive design
                settings: {
                    slidesToShow: 2,
                },
            },
            {
                breakpoint: 576,
                settings: {
                    slidesToShow: 1,
                },
            },
        ],
    };

    return (
        <>
            <Container className="d-flex justify-content-center align-items-center font" style={{width: '100%', paddingTop: '30px'}}>
                <Slider {...settings} style={{width: '100%'}}>
                    <div className='img-container'>
                        <img src={imageOne} alt="Product 1" className='pic'/>
                    </div>
                    <div className='img-container'>
                        <img src={imageSix} alt="Product 2" className='pic' />
                    </div>
                    <div className='img-container'>
                        <img src={imageThree} alt="Product 3" className='pic' />
                    </div>
                    <div className='img-container'>
                        <img src={imageFour} alt="Product 1" className='pic'/>
                    </div>
                    <div className='img-container'>
                        <img src={imageFive} alt="Product 2" className='pic' />
                    </div>
                    <div className='img-container'>
                        <img src={imageTwo} alt="Product 3" className='pic' />
                    </div>
                    <div className='img-container'>
                        <img src={imageSeven} alt="Product 3" className='pic' />
                    </div>
                </Slider>
            </Container>
            <div className="d-flex justify-content-center align-items-center">
                <Link to={'/products'}><img src={homePageText} alt="Find Your Perfect Gift" style={{marginTop: '20px'}}/></Link>
            </div>
        </>
    );
}
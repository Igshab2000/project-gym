import React from "react";
import Slider from "react-slick";
import Stock from '../Stocks/Stocks';
import { withRouter } from 'react-router-dom';
import './CustomPaging.scss';

class SimpleSlider extends React.Component {

    setStyle = (src, style) => {
        return {
            ...style,
            margin: '0 auto',
            backgroundImage: 'url(/'+src+')',
            backgroundSize: 'cover',
        }
    }

    checkElement = (element, item, style = {}) => {
        const {  history, href, showWindow } = this.props;
        if(element === 'Stocks') {
            return (
                <Stock
                    header={item.header}
                    price={item.price}
                    id={item.id}
                    type='big'
                    style={{
                        margin: '0 auto'
                    }}
                    showWindow={showWindow}
                />
            );
        } else { 
            return (
                <div 
                    style={this.setStyle(item.src, style)}
                    data-title={item.name}
                    onClick={() => history.push(href)}
                    className='slider__item-img'
                />
            )
        }  
    }

    render() {
        const { objectItem, slidesToShow, style, dots, element} = this.props;
    
        let settings = {
            dots: dots,
            dotsClass: "slick-dots slick-thumb slick-my-style",
            infinite: true,
            className: 'custom-slider',
            speed: 500,
            slidesToShow: slidesToShow,
            slidesToScroll: 1,
            swipe: true
        }

        return (
        <Slider {...settings}>
            {
                objectItem.map((item, index) => {
                    return (
                        <div
                            className='slider__item'
                            key={index}
                        >
                           {this.checkElement(element, item, style)} 
                        </div>
                    )
                }) 
            }
        </Slider>
        );
    }
}

export default withRouter(SimpleSlider);
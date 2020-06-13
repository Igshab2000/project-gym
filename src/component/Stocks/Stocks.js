import React, { Component } from 'react';
import MainButton from '../UI/MainButton/MainButton';
import './Stocks.scss';
import { connect } from 'react-redux';
import {selectedSubscription} from '../../store/action/subscription/subscription';
import { withRouter } from 'react-router-dom';

class Stock extends Component {

    toBook = id => {
        const { selectedSubscription, history } = this.props;
        selectedSubscription(id);
        const link = history.location.pathname;
        history.push(link);
    }

    checkSubscriptions = (user, id) => {
        if(user !== {}) {
           const subscription = user.subscriptions?.find(item => item === id);
           if(subscription !== undefined) {
                return false;
           } 
        }
        return true;
    }

    bigCard = () => {
        const { header, price, style, user, id } = this.props;
        return (
            <div className='stock' style={style ? style : null}>
                <div className='stock-content'>
                    <h3>
                        {header}
                    </h3>
                    <h2>
                        {price}  
                    </h2>
                    <MainButton
                        type='reservation'
                        className='stock-content-button'
                        styleCss={{
                            marginTop: '100px'
                        }}
                        onClick={() => this.toBook(id)}
                    >
                        {this.checkSubscriptions(user, id) === true ? 'Забронировать' : 'Отменить'}
                    </MainButton>
                </div>
            </div>
        )
    }

    smallСard = () => {
        const { header, price, background, id } = this.props;
        return (
            <div 
                className='stock-small'
                onClick={() => this.toBook(id)}
                style={{
                    backgroundColor: background
                }}
            >
                <div className='stock-small__header'>{header}</div>
                <div className='stock-small__price'>{price}</div>
            </div>
        )
    }

    render() {
        const { type } = this.props;
        if(type === 'small') {
            return (
                this.smallСard()
            )
        } else {
            return (
                this.bigCard()
            )   
        }
        
    }
}

const mapStateToProps = state => {
    return {
        user: state.userSave.user
    }
}

const mapDispatchToProps = dispatch => {
    return {
        selectedSubscription: (id) => dispatch(selectedSubscription(id))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Stock));
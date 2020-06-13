import React, {Component} from 'react';
import Layout from '../../hoc/Layout/Layout';
import { withFirestore } from 'react-firestore';
import { connect } from 'react-redux';
import SimpleSlider from '../../component/CustomPaging/CustomPaging';
import {Link} from 'react-router-dom';
import { selectedSubscription } from '../../store/action/subscription/subscription';
import SpringModal from '../../component/ModalWindow/ModalWindow';
import ConfirmationForm from '../../component/ConfirmationForm/ConfirmationForm';
import save from '../../store/action/save/save';
import checkSubscriptionsUser from '../../utils/const/checkSubscriptionsUser';
import isEmpty from '../../utils/const/isEmpty';
import './HomePage.scss';

class HomePage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isCheckModal: false
        }
    }

    showSlider(slider, count, style, dots, element, href) {
        return (
            <SimpleSlider
                objectItem={slider} 
                slidesToShow={count}
                style={style}
                dots={dots}
                element={element}
                href={href}
                showWindow={this.confirmationWindow}
            />
        );
    }

    showHeader = (item) => {
        return (
            <header className='home-page__header'>
                <h1>{item.header}</h1>
                <Link
                    className='home-page__header-link'
                    to={item.href}
                >
                    смотреть все
                </Link>
            </header>
        )
    }

    checkModal = () => {
        this.setState({
            isCheckModal: !this.state.isCheckModal
        })
    }

    tobookSubscriptions = isCheck => {
        const { selectedSubscription, selected, user, userSave, history } = this.props;
        if(isCheck) {
            if(isEmpty(user)) {
                const changeUser = checkSubscriptionsUser(user, selected);
                userSave(changeUser);
                selectedSubscription(null);
            } else {
                history.push('/sign-in');
            }
        } else {
            selectedSubscription(null);
        }
    }

    componentWillReceiveProps(nextProps) {

        this.setState({
            isCheckModal: nextProps.selected
        });
        
    }

    render() {
        const { gym, trainers, subscription, selected } = this.props;
        const style = {
            height: 350,
            width: 300
        };
        
        return (
            <Layout>
                <div className="home-page">
                    <div className="home-page__custom-slider">
                        {this.showHeader(gym)}
                        {this.showSlider(gym.items, 3, style, false, 'div', gym.href)}
                    </div>
                    
                    <div className="home-page__custom-slider">
                        {this.showHeader(subscription)}
                        {this.showSlider(subscription.items, 3, {}, false, 'Stocks', subscription.href)}
                    </div>

                    <div className="home-page__custom-slider">
                        {this.showHeader(trainers)}
                        {this.showSlider(trainers.items, 3, style, false, 'div', trainers.href)}
                    </div>
                    <SpringModal
                        isCheck={selected !== null && this.state.isCheckModal ?  true : false}
                        close={this.tobookSubscriptions}
                    >
                        <ConfirmationForm
                            tobook={this.tobookSubscriptions}
                        />
                    </SpringModal> 
                </div>
            </Layout>
        )
    }
}

const mapStateToProps = state => {
    return {
        gym: state.gym.gym,
        trainers: state.trainers.trainers,
        subscription: state.subscription.subscriotion,
        user: state.userSave.user,
        selected: state.subscription.selected
    }
}

const mapDispatchToProps = dispatch => {
    return {
        userSave: (user) => dispatch(save(user)),
        selectedSubscription: (id) => dispatch(selectedSubscription(id))
    }
}

const connectHomePage = connect(mapStateToProps, mapDispatchToProps)(withFirestore(HomePage));

export default connectHomePage;
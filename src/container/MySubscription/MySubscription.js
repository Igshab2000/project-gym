import React, { Component } from 'react';
import Layout from '../../hoc/Layout/Layout';
import { connect } from 'react-redux';
import { fire } from '../../index';
import { withFirestore } from 'react-firestore';
import Stocks from '../../component/Stocks/Stocks';
import { selectedSubscription } from '../../store/action/subscription/subscription';
import SpringModal from '../../component/ModalWindow/ModalWindow';
import ConfirmationForm from '../../component/ConfirmationForm/ConfirmationForm';
import save from '../../store/action/save/save';
import checkSubscriptionsUser from '../../utils/const/checkSubscriptionsUser';
import './MySubscription.scss';


class MySubscription extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isCheckModal: false
        }
    }

    findSubscription = (id) => {
        const { subscription } = this.props;
        return subscription.items.find(item => item.id === id);
    }

    showMySubscribers = () => {
        const { user } = this.props;
        return user.subscriptions.map((id, index) => {
            let find = this.findSubscription(id);
            return (
                <Stocks
                    key={index}
                    header={find.header}
                    price={find.price}
                    id={find.id}
                    type='big'
                    style={{
                        marginLeft: '30px',
                        marginTop: '15px',
                        opacity: 1
                    }}
                />
            )
        })
    }

    tobookSubscriptions = isCheck => {
        const { selectedSubscription, selected, user, userSave } = this.props;
        if(isCheck) {
            const changeUser = checkSubscriptionsUser(user, selected);
            userSave(changeUser);
            selectedSubscription(null);
        } else {
            selectedSubscription(null);
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            isCheckModal: nextProps.selected
        });
    }

    render () {
        const { subscriptions } = this.props.user;
        const { selected } = this.props;
        return (
            <Layout>
                <div className='my-subscription'>
                    <div className='my-subscription__list'>
                        {subscriptions.length > 0 ? 
                            <h2>Список моих абонементов</h2>
                            :
                            <h2>У вас нет абонементов</h2>
                        }
                        <div className='my-subscription__list-subscribers'>
                            {this.showMySubscribers()}
                        </div>  
                    </div>
                    <SpringModal
                        isCheck={selected !== null && this.state.isCheckModal?  true : false }
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

    componentDidMount = () => {
        const { user } = this.props;
        fire.firestore().collection("users").doc(user.login).update({
            subscriptions: user.subscriptions
        });
    }

}

const mapStateToProps = state => {  
    return {
        user: state.userSave.user,
        subscription: state.subscription.subscriotion,
        selected: state.subscription.selected
    }
}

const mapDispatchToProps = dispatch => {
    return {
        userSave: (user) => dispatch(save(user)),
        selectedSubscription: (id) => dispatch(selectedSubscription(id))
    }
}



export default connect(mapStateToProps, mapDispatchToProps)(withFirestore(MySubscription));
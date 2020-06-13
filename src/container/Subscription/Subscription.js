import React, { Component } from 'react';
import Layout from '../../hoc/Layout/Layout';
import { connect } from 'react-redux';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import Stock from '../../component/Stocks/Stocks';
import checkCardUser from '../../utils/const/checkCardUser';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import isEmpty from '../../utils/const/isEmpty';
import TableCell from '@material-ui/core/TableCell';
import { addInformationSubscription, selectedSubscription } from '../../store/action/subscription/subscription';
import BackDrop from '../../component/BackDrop/BackDrop';
import { withRouter } from 'react-router-dom';
import SpringModal from '../../component/ModalWindow/ModalWindow';
import ConfirmationForm from '../../component/ConfirmationForm/ConfirmationForm';
import { useStyles } from './Subscription.const';
import save from '../../store/action/save/save';
import checkSubscriptionsUser from '../../utils/const/checkSubscriptionsUser';
import './Subscription.scss';

function SimpleTable(props) {
    const classes = useStyles();
    const { items, user } = props; 

    return (
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableBody>
            {transformData(items).map((item, indexRow) => (
                <TableRow 
                    key={indexRow}
                >{item.map((card, indexCell) => (
                    <TableCell
                        key={indexCell}
                    >
                        <Stock 
                            header={card.header}
                            price={card.price}
                            background={checkCardSubscriptionUser(user, card.id)}
                            id={card.id}
                            type='small'
                        />
                    </TableCell>
                ))}
                </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
}

const checkCardSubscriptionUser = (user, id) => {
    if(isEmpty(user)) {
        const subscriptions = user.subscriptions;
        return checkCardUser(subscriptions, id, 'sub');   
    } 
}

const transformData = array => {
    let length = array.length;
    let result = [];

    for (let i = 0; i < array.length; i += 3) {

        if(length >= 3) {
            result.push([ array[i], array[i+1] , array[i+2]]);
            length -= 3;
        } else {
            let arrayRemainder = [];
            for(let j = 0; j < length; j++) {
                arrayRemainder.push(array[i + j])
            }
            result.push(arrayRemainder);
        }
    }
   
    return result;
}

const showInformation = (information, saveInformation) => {
    if(isEmpty(information)) {
        return information.map((data, index) => {
            return (
                <div
                    key={index}
                    className='subscription__content-information-list'
                >
                    <h3>{data.header}</h3>
                    <ul>
                        {data.items.map((item, index) => (
                            <li
                                key={index}
                            >
                                {item}
                            </li>
                        ))}

                    </ul>
                </div>
            )
        })
    } else {
        saveInformation();
        return (
            <BackDrop 
                open={isEmpty(information)}
            />
        )
    }
}

class Subscription extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isCheckModal: false
        }
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
        const { user, subscription, information, saveInformation, selected } = this.props;
        const items = subscription.items;
        return (
            <Layout>
                <div className='subscription'>
                    <h1>Список абонементов</h1>
                    <div className='subscription__content'>
                        <div className='subscription__content-table'>
                            <SimpleTable 
                                items={items}
                                user={user}
                            />
                        </div>
                        <div className='subscription__content-information'>
                            {showInformation(information, saveInformation)}
                        </div>
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
        subscription: state.subscription.subscriotion,
        user: state.userSave.user,
        information: state.subscription.information,
        selected: state.subscription.selected
    }
}

const mapDispatchToProps = dispatch => {
    return {
        userSave: (user) => dispatch(save(user)),
        saveInformation : () => dispatch(addInformationSubscription()),
        selectedSubscription: (id) => dispatch(selectedSubscription(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Subscription));
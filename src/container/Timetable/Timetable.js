import React, { Component } from 'react';
import Layout from '../../hoc/Layout/Layout';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { StyledTableCell, StyledTableRow, useStyles, daysWeek, times, useStylesBackDrop } from './TimeTable.const';
import CardTime from '../../component/CardTime/CardTime';
import { connect } from 'react-redux';
import { addTimeTable } from '../../store/action/addTimeTable/addTimeTable';
import isEmpty from '../../utils/const/isEmpty';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { fire } from '../../index';
import checkCardUser from '../../utils/const/checkCardUser';
import BackDrop from '../../component/BackDrop/BackDrop';
import SpringModal from '../../component/ModalWindow/ModalWindow';
import MainButton from '../../component/UI/MainButton/MainButton';
import './Timetable.scss';


const ShowTable = props => {
    const [open] = React.useState(true);
    const { data, user, addCardTime } = props;
    const classes = useStyles();
    const classesBackDrop = useStylesBackDrop();
    
    if(data !== []) {
        return (
            <TableContainer className='table-container' component={Paper} >
                <Table className={classes.table} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>{'  '}</StyledTableCell>
                            {times.map((time, index) => {
                                return (
                                    <StyledTableCell
                                        key={index}
                                        align='center'
                                    >{time.inf}</StyledTableCell>
                                )
                            })}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((rowItem, indexRow) => (
                            <StyledTableRow key={indexRow}>
                                <StyledTableCell
                                    aling='center'
                                    className={classes.tr}
                                >
                                    {daysWeek[indexRow].inf}
                                </StyledTableCell>
                                {rowItem.map((cellItem, indexCell) => {
                                    return(
                                        <StyledTableCell
                                            key={indexCell} 
                                            aling='center'
                                        >
                                            <CardTime 
                                                time={cellItem.time}
                                                trainer={cellItem.trainer}
                                                color={cellItem.colorBorder}
                                                add={() => addCardTime(cellItem.id, indexRow)}
                                                background={checkCardTimeUser(user, cellItem.id)}
                                            />
                                        </StyledTableCell>
                                    )
                                })}
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        )
    }   
    return (
        <Backdrop className={classesBackDrop.backdrop} open={open}>
            <CircularProgress color="inherit" />
        </Backdrop>
    )
    
}

const checkCardTimeUser = (user, idCard) => {
    if(isEmpty(user)) { 
        const timeTable = user.timeTable;
        return checkCardUser(timeTable, idCard, 'time');
    }
}

class Timetable extends Component {

    constructor(props) {
        super(props);

        this.state = {
            errorMessage: 'В этот день занятие уже запланировано',
            isCheckModal: false 
        }
    }

    componentDidMount() {
        this.props.addTimeTable();
    }

    addCardTime = (idCard, rowItem) => {
        const { user, history } = this.props;
        const cardTime = {
            idCard,
            rowItem
        }

        if(isEmpty(user)) {
            const checkCard = user.timeTable.find(item => item.idCard === idCard);

            if(checkCard) {
                const index = user.timeTable.indexOf(checkCard);
                user.timeTable.splice(index, 1);
            } else {
                const checkCardDay = user.timeTable.find(item => item.rowItem === rowItem);
                if(checkCardDay) {
                    this.setState({
                        isCheckModal: true
                    });
                } else {
                    user.timeTable.push(cardTime);
                }
            }
    
            fire.firestore().collection("users").doc(user.login).update({
                timeTable: user.timeTable
            });
            
            history.push('/timetable');
        } else {
            history.push('/sign-in');
        }
    }

    closeModal = isCheck => {
        this.setState({
            isCheckModal: isCheck
        })
    }

    render() {
        const { dataTimeTable, user, history } = this.props;
        return (
            <Layout>
                <div className='timetable'>
                    <h1>Расписание</h1>
                    <div className='timetable__content'> 
                    {isEmpty(dataTimeTable) ?
                        (
                            <ShowTable
                                data={dataTimeTable} 
                                user={user}
                                history={history}
                                addCardTime={this.addCardTime}
                            /> 
                        )
                        :
                        (
                            <BackDrop 
                                open={isEmpty(dataTimeTable)}
                            />
                        )
                    }  
                        <SpringModal
                            isCheck={this.state.isCheckModal}
                            close={this.closeModal}
                        >
                            <div className='error-modal'>
                                <h2>{this.state.errorMessage}</h2>
                                <div className='error-modal__panel'>
                                    <MainButton
                                        type='main'
                                        onClick={() => this.setState({
                                            isCheckModal: false
                                        })}
                                    >Ок</MainButton>
                                </div>
                            </div>
                        </SpringModal>    
                    </div>
                </div>
            </Layout>
        )
    }

    
}

const mapDispatchToProps = dispatch => {
    return {
        addTimeTable: () => dispatch(addTimeTable())
    }
}

const mapStateToProps = state => {
    return {
        user: state.userSave.user,
        dataTimeTable: state.timeTable.dataTimeTable
    }
}


const connectedTimetable = connect(mapStateToProps, mapDispatchToProps)(Timetable);

export default connectedTimetable;
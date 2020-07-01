import React, { Component } from 'react';
import { connect } from 'react-redux';
import Layout from '../../hoc/Layout/Layout';
import SpringModal from '../../component/ModalWindow/ModalWindow';
import './Trainers.scss';

class Trainers extends Component {
    constructor(props) {
        super(props)

        this.state = {
            isShow: false,
            item: null
        }
    }

    closeModal = (isCheck) => {
        this.setState({
            isShow: isCheck
        });
    }

    showInformationAboutTrainer = (item) => {
        if(item !== null) {
            return (
                <SpringModal
                    isCheck={this.state.isShow}
                    close={this.closeModal}
                >
                    <div className="trainer-content">
                        <div 
                            style={{
                                width: 300,
                                height: 300,
                                marginRight: 20,
                                backgroundImage: 'url(/'+item.src+')',
                                backgroundSize: 'cover'
                            }}
                        />
                        <div className='trainer-content__information'>
                            <h2 className='trainer-content__information-header'>{item.name}</h2>
                            <h6 className='trainer-content__information-header'>{item.information}</h6>
                        </div>
                    </div>
                </SpringModal>
            )
        }
    }

    showPhotoTrainers = (trainers) => {
        return trainers.items.map((item, index) => {
            return (
                <div
                    data-title={item?.name}
                    key={index}
                    className='slider__content__item'
                    onClick={ () => {
                        this.setState({
                            isShow: !this.state.isShow,
                            item
                        });
                    }}
                    style={{
                        marginTop: 10,
                        marginLeft: 10,
                        width: 300,
                        height: 300,
                        backgroundImage: 'url(/'+item.src+')',
                        backgroundSize: 'cover',
                        cursor: 'pointer'
                    }}
                />
            )
        })
    }

    render() {
        const { trainers } = this.props;
        const { item, isShow } = this.state;
        return(
            <Layout>
                <div className='trainers-container' onClick={() => {
                    if(isShow) {
                        this.setState({
                            isShow: !isShow,
                        })
                    }
                }}>
                    <h2>Тренерский состав</h2>
                    <div className='trainers-container__galary'>
                        {this.showPhotoTrainers(trainers)}
                        {this.showInformationAboutTrainer(item)}
                    </div>
                </div>
            </Layout>
        )
    }
}

const mapStateToProps = state => {
    return {
        trainers: state.trainers.trainers
    }
}

export default connect(mapStateToProps)(Trainers);
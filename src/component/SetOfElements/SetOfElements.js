import React, { Component } from 'react';
import SpringModal from '../ModalWindow/ModalWindow';
import './SetOfElements.scss';

class SetOfElements extends Component {

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

    showItems = (arrayElements) => {
        return arrayElements.map((item, index) => {
            return (
                <div
                    key={index}
                    className='container-elements__items'
                    style={{
                        backgroundImage: 'url('+item.src+')',
                        backgroundSize: 'cover',
                        cursor: 'pointer'
                    }}
                    onClick={ () => {
                        this.setState({
                            isShow: !this.state.isShow,
                            item
                        });
                    }} 
                />
            )
        })
    }

    showInformationElements = (item) => {
        if(item !== null) {
            return (
                <SpringModal
                    isCheck={this.state.isShow}
                    close={this.closeModal}
                >
                    <div className="elements-content">
                    <h2>{item.description}</h2>
                        <div 
                            style={{
                                width: 500,
                                height: 400,
                                marginRight: 20,
                                backgroundImage: 'url('+item.src+')',
                                backgroundSize: 'cover',
                                marginTop: '25px'
                            }}
                        />
                    </div>
                </SpringModal>
            )
        }
    }

    render() {
        const {arrayElements} = this.props;
        const { item, isShow } = this.state;
        return (
            <div 
                className='container-elements'
                onClick={() => {
                    if(isShow) {
                        this.setState({
                            isShow: !isShow,
                        })
                    }
                }}            
            >
                {this.showItems(arrayElements)}
                {this.showInformationElements(item)}
            </div>
        )
    } 
}

export default SetOfElements;
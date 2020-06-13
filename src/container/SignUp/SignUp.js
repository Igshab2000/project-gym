import React, { Component} from 'react';
import './SignUp.scss';
import Authorization from '../../hoc/Authorization/Authorization';
import Input from '../../component/UI/Input/Input';
import MainButton from '../../component/UI/MainButton/MainButton';
import { Link } from 'react-router-dom';
import { reduxForm } from "redux-form";
import { formValidator } from '../../utils/validator';
import { connect } from 'react-redux';
import { createTextMask } from 'redux-form-input-masks';
import save from '../../store/action/save/save';
import { fire } from '../../index';
import { withFirestore } from 'react-firestore';
import requestWrapper from '../../utils/const/requestWrapper';
import ErrorMessage from '../../component/ErrorMessage/ErrorMessage';
import { onlyEmail, passLength } from '../../utils/validator';


class SignUp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            formElements: [
                {
                    name: 'firstNameField',
                    placeholder: 'Имя',
                    type: 'string'
                },
                {
                    name: 'secondNameField',
                    placeholder: 'Фамилия',
                    type: 'string'
                },
                {
                    name: 'telephoneField',
                    placeholder: 'телефон',
                    type: 'text'
                },
                {
                    name: 'loginField',
                    placeholder: 'email',
                    type: 'string',
                    typeValidation: onlyEmail
                }, 
                {
                    name: 'passwordField',
                    placeholder: 'Пароль',
                    type: 'password',
                    typeValidation: passLength(8)
                },
                {
                    name: 'newPasswordField', 
                    placeholder: 'Повторите пароль', 
                    type: 'password', 
                    typeValidation: passLength(8)
                }
            ],

            style: {
                width: '100%',
                marginTop: '12px',
                position: 'relative'
            },

            errorMessage : '',
            users: null
        }
    }

    addUser = (user) => {
        fire.firestore()
            .collection("users")
            .doc(user.login)
            .set(user)
    }
 
    handleSubmit = fields => {
        const { history, userSave } = this.props;

        const user = {
            firstName: fields.firstNameField,
            secondName: fields.secondNameField,
            telephone: fields.telephoneField,
            login: fields.loginField,
            password: fields.passwordField,
            subscriptions: [],
            timeTable: []
        }

        const userStorage = this.state.users.find(userStorege => {
            if(user.login === userStorege.login || user.telephone === userStorege.login) {
                return user;
            }

            return undefined;
        });

        if(userStorage === undefined) {
            this.addUser(user);
            userSave(user);
            history.go(-2);
        } else {
            this.setState({
                errorMessage: 'Этот пользователь уже существует!'
            }); 
        }  
    }

    componentDidMount = () => {
        requestWrapper('users')
        .then((users) => {
            this.setState({
                users
            })
        })
    }

    addMaskTel = (element, index) => {
        if(element.placeholder === 'телефон') {
            const telMask = createTextMask({
                pattern: '+7(999)999-9999',
            });

            return (
                <Input
                    key={index}
                    type={element.type}
                    name={element.name}
                    placeholder={element.placeholder}
                    styleCss={this.state.style}
                    {...telMask}
                />
            )
        } else {
            return null
        }
    }

    render() {
        return(
            <Authorization>
                <div className='container'>
                    <div className='container__content'>
                        <h2>Регистрация</h2>
                        <form 
                            onSubmit={this.props.handleSubmit(this.handleSubmit)} 
                            className='container__content-form'
                        >
                            {this.state.formElements.map((element, index) => {

                                let isCheckTel = this.addMaskTel(element, index);
                                if(isCheckTel) {
                                    return isCheckTel;
                                }

                                return(
                                    <Input
                                        key={index}
                                        type={element.type}
                                        name={element.name}
                                        placeholder={element.placeholder}
                                        styleCss={this.state.style}
                                        validate={element.typeValidation ? element.typeValidation : null}
                                    />
                                )
                            })}
                            <MainButton
                                type='main'
                                styleCss={this.state.style}
                            >
                                Зарегистрироваться 
                            </MainButton>
                        </form> 
                        <Link
                            to='/sign-in'
                        >Уже зарегистрированы? Войти</Link>
                        {this.state.errorMessage ? 
                            <ErrorMessage 
                                message={this.state.errorMessage}
                                styleCss={{
                                    marginTop: '35px'
                                }}
                            />
                            :
                            null
                        }
                    </div>       
                </div>
            </Authorization>
        )
    }

}

const connectedToReduxForm = reduxForm({
    form: 'registaration',
    validate: formValidator
});

const mapDispatchToProps = (dispatch) => {
    return {
        userSave: (user) => dispatch(save(user))
    }
}


const connectedSignUp = connect(null, mapDispatchToProps)(connectedToReduxForm(withFirestore(SignUp)))

export default connectedSignUp;
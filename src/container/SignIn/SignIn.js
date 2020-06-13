import React, { Component } from 'react';
import Input from '../../component/UI/Input/Input';
import Authorization from '../../hoc/Authorization/Authorization';
import MainButton from '../../component/UI/MainButton/MainButton';
import {Link} from 'react-router-dom';
import { reduxForm } from "redux-form";
import { formValidator } from '../../utils/validator';
import { connect } from 'react-redux';
import save from '../../store/action/save/save';
import { withFirestore } from 'react-firestore';
import './SignIn.scss';
import requestWrapper from '../../utils/const/requestWrapper';
import ErrorMessage from '../../component/ErrorMessage/ErrorMessage';
import isEmpty from '../../utils/const/isEmpty';
import checkSubscriptionsUser from '../../utils/const/checkSubscriptionsUser';
import { onlyEmail, passLength } from '../../utils/validator';
import { selectedSubscription } from '../../store/action/subscription/subscription';

class SignIn extends Component {
    constructor(props) {
        super(props);

        this.state = {
            formElements: [
                {
                    name: 'loginField',
                    type: 'string',
                    placeholder: 'email',
                    typeValidation: onlyEmail
                },
                {
                    name: 'passwordField',
                    type: 'password',
                    placeholder: 'пароль',
                    typeValidation: passLength(8)
                }
            ],

            style: {
                width: '100%',
                marginTop: '12px',
                position: 'relative'
            },

            errorMessage: '',

            users: []
        }
    }

    

    handleSubmit = fields => {
        const { history, userSave, selected, selectedSubscription } = this.props;
        const userData = {
            login: fields.loginField,
            password: fields.passwordField
        }

        const user = this.state.users.find(user => {
            if(
                (user.login === userData.login || user.telephone === userData.login) && 
                (user.password === userData.password)
            ) {
                return user;
            }
            return undefined;
        });

        if(isEmpty(user)) {
            if(selected !== null) {
                const changeUser = checkSubscriptionsUser(user, selected);
                userSave(changeUser);
                selectedSubscription(null);
            } else {
                userSave(user);
            }
            history.goBack();
        } else {
            this.setState({
                errorMessage: 'Неверный логин или пароль.'
            })
        }
    }

    componentDidMount() {
        requestWrapper('users')
            .then(users => {
                this.setState({
                    users
                })
            })
    }

    render() {
        return (
            <Authorization>
                <div className='sign-in-container'>
                    <div className='sign-in-container__content'>
                        <h2>Вход в личный кабинет</h2>
                        <form 
                            onSubmit={this.props.handleSubmit(this.handleSubmit)} 
                            className='form'
                        >
                            {this.state.formElements.map((element, index) => {
                                return (
                                    <Input
                                        key={index}
                                        type={element.type}
                                        name={element.name}
                                        styleCss={this.state.style}
                                        placeholder={element.placeholder}
                                        validate={element.typeValidation ? element.typeValidation : null}
                                    />
                                )
                            })}

                            <MainButton
                                type='main'
                                styleCss={this.state.style}
                            >
                                Войти в систему
                            </MainButton>
                        </form>
                        <Link
                            to='/sign-up'
                        >
                            Зарегистрироваться
                        </Link>
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

const mapStateToProps = state => {
    return {
        selected: state.subscription.selected
    }
}

const connectedToReduxForm = reduxForm({
    form: 'loginForm',
    validate: formValidator,
});

const mapDispatchToProps = (dispatch) => {
    return {
        userSave: (user) => dispatch(save(user)),
        selectedSubscription: (id) => dispatch(selectedSubscription(id))
    }
}

const connectedSignIn = connect(mapStateToProps, mapDispatchToProps)(connectedToReduxForm(withFirestore(SignIn)));


export default connectedSignIn;
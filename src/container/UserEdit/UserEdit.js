import React, { Component } from 'react';
import Layout from '../../hoc/Layout/Layout';
import { connect } from 'react-redux';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import MainButton from '../../component/UI/MainButton/MainButton';
import { formValidator, onlyEmail, passLength } from '../../utils/validator';
import { reduxForm } from "redux-form";
import Label from '../../component/UI/Label/Label';
import Input from '../../component/UI/Input/Input';
import { withFirestore } from 'react-firestore';
import save from '../../store/action/save/save';
import { fire } from '../../index';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './UserEdit.scss';

class UserEdit extends Component {
    constructor(props) {
        super(props);

        this.state = {
            listInput: [
                {name: 'firstNameField', placeholder: 'Имя', type: 'text'},
                {name: 'secondNameField', placeholder: 'Фамилия', type: 'text'},
                {name: 'loginField', placeholder: 'Электронная почта', type: 'email', typeValidation: onlyEmail},
                {name: 'passwordField', placeholder: 'Новый пароль', type: 'password', typeValidation: passLength(8)},
                {name: 'newPasswordField', placeholder: 'Повторите пароль', type: 'password', typeValidation: passLength(8)}
            ]
        }
    }

    handleSubmit = field => {
        const { userSave, history } = this.props;

        const user = {
            firstName: field.firstNameField,
            secondName: field.secondNameField,
            login: field.loginField,
            password: field.passwordField,
            subscriptions: []
        }

        userSave(user);
        fire.firestore()
            .collection("users")
            .doc(user.login)
            .delete();

        fire.firestore()
            .collection("users")
            .doc(user.login)
            .set(user);
        
        this.notify();    
    }

    showListInput() {
        return this.state.listInput.map((field, index) => {
  
          return (
            <div
              className='user-edit__content-list-item'
              key={index}
            >
              <Label
                styleCss={{
                    marginTop: "12px"
                }}
              >
                {field.placeholder}
              </Label>
              <Input
                name={field.name}
                placeholder={field.placeholder}
                type={field.type}
                styleCss={{
                    marginLeft: "120px",
                    marginTop: "12px",
                    width: '450px',
                    position: 'relative'
                }}
                styleSpan={{
                    marginLeft: "120px",
                }}
                validate={field.typeValidation ? field.typeValidation : null}
              />
            </div>
          )
        })
    }
      
    notify = () => toast("Профиль обновлен");
    
    render() {
        const { user } = this.props;
        return(
            <Layout>
                <form className="user-edit" onSubmit={this.props.handleSubmit(this.handleSubmit)}>
                    <ToastContainer
                        autoClose={1000}
                        hideProgressBar={true} 
                        style={{
                            zIndex: 100,
                            position: "absolute",
                            top: "62px",
                            left: "40%"
                        }}
                    />
                    <div className='user-edit__header'>
                        <div>
                            <IconButton
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                color="inherit"
                            >
                                <Avatar className='user-edit__header-avatar'>
                                    {user.firstName[0] + user.secondName[0]}
                                </Avatar>
                            </IconButton>
                        </div>
                        <div>
                            <h2>{user.firstName + ' ' + user.secondName + ' Редактирование'}</h2>
                        </div>
                        <div className='user-edit__header-button'>
                            <MainButton
                                type='main'
                                styleCss={{
                                    marginTop: '12px',
                                    marginBottom: '18px',
                                    width: '100px',
                                    marginRight: '22px'
                                }}
                            >
                                Сохранить   
                            </MainButton>
                        </div>
                    </div>
                    <div className='user-edit__content'>
                        {this.showListInput()}
                    </div>
                </form>
            </Layout>
        )
    }
}

const connectedToReduxForm = reduxForm({
    form: 'loginForm',
    validate: formValidator,
});

const mapDispatchToProps = (dispatch) => {
    return {
        userSave: (user) => dispatch(save(user))
    }
}

const mapStateToProps = state => {
    const { user } = state.userSave;
    return {
        user: user,
        initialValues: {
            firstNameField: user.firstName,
            secondNameField: user.secondName,
            loginField: user.login,
            passwordField: user.password
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(connectedToReduxForm(withFirestore(UserEdit)));
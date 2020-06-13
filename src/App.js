import React, { Component } from 'react';
import HomePage from './container/HomePage/HomePage';
import MySubscription from './container/MySubscription/MySubscription';
import Timetable from './container/Timetable/Timetable';
import { Switch, Route } from 'react-router-dom';
import SignIn from './container/SignIn/SignIn';
import SignUp from './container/SignUp/SignUp';
import { connect } from 'react-redux';
import isEmpty from './utils/const/isEmpty';
import UserEdit from './container/UserEdit/UserEdit';
import GymGalary from './container/GymGalary/GymGalary';
import Trainers from './container/Trainers/Trainers';
import Subscription from './container/Subscription/Subscription';

class App extends Component {

  available = () => {
    return (
      <Switch>
        <Route path="/subscription" component={Subscription}/>
        <Route path="/gym-galary" component={GymGalary}/>
        <Route path="/timetable" component={Timetable}/>
        <Route path="/trainers" component={Trainers}/>
        <Route path="/" component={HomePage}/>
      </Switch>
    )
  }

  showRoute = () => {
    const { user } = this.props;
    if(isEmpty(user)) {
      return (
        <Switch>
          <Route path="/user-edit" component={UserEdit}/>
          <Route path="/my-subscription" component={MySubscription}/>
          {this.available()}
          <Route path="/" component={HomePage}/>
        </Switch>
      )
    } else {
      return (
        <Switch>
          <Route path="/sign-up" component={SignUp}/>
          <Route path="/sign-in" component={SignIn}/>
          {this.available()}
          <Route path="/" component={HomePage}/>
        </Switch>
      )
    }
  }

  render() {
    return (
      this.showRoute()
    );
  }
}

const mapStateToProps = (state) => {
  return {
      user: state.userSave.user
  }
}

export default connect(mapStateToProps)(App);

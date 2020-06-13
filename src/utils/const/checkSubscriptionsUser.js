import isEmpty from '../const/isEmpty';
import { fire } from '../../index';

const checkSubscriptionsUser = (user, id) => {
    if(isEmpty(user)) {
        const subscription = user.subscriptions?.find(item => item === id);

        if(subscription !== undefined) {
            const index = user.subscriptions.indexOf(id);
            user.subscriptions.splice(index, 1);
        } else {
            user.subscriptions.push(id);
        }
    }

    fire.firestore().collection("users").doc(user.login).update({
        subscriptions: user.subscriptions
    });

    return user;
}

export default checkSubscriptionsUser;
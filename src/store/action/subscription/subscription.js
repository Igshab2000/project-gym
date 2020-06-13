import requestWrapper from '../../../utils/const/requestWrapper';

export const SAVE_INFORMATION_SUBSCRIPTION = 'SAVE_INFORMATION_SUBSCRIPTION';
export const SELECTED_SUBSCRIPTION = 'SELECTED_SUBSCRIPTION';

const dataСonversion = date => {
    return Object.values(date);
}

export function addInformationSubscription() {
    return async dispatch => {
        requestWrapper('subscription')
        .then((dataTimeTable) => {
            let dataInf;
            dataTimeTable.forEach(data => {
                dataInf = dataСonversion(data);
            });
            
            dispatch(saveInformationSubscription(dataInf));
        });
    }
}

export const saveInformationSubscription = arrayData => {
    return {
        type: SAVE_INFORMATION_SUBSCRIPTION,
        arrayData
    }
}

export const selectedSubscription = idSubscription => {
    return {
        type: SELECTED_SUBSCRIPTION,
        idSubscription
    }
}


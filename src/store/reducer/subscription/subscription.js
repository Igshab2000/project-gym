import { SAVE_INFORMATION_SUBSCRIPTION, SELECTED_SUBSCRIPTION } from '../../action/subscription/subscription';

const initState = {
    subscriotion: {
        type: 'div',
        header: 'Абонементы',
        href: '/subscription',
        items: [
            {
                id: 1,
                header: 'Пробный',
                price: '0р'
            },
            {
                id: 2,
                header: '1 месяц',
                price: '1000р'
            },
            {
                id: 3,
                header: '2 месяца',
                price: '2000р'
            },
            {
                id: 4,
                header: '3 месяца',
                price: '2800р'
            },
            {
                id: 5,
                header: '5 месяцев',
                price: '4800р'
            },
            {
                id: 6,
                header: '6 месяцев',
                price: '5500р'
            },
            {
                id: 7,
                header: '8 месяцев',
                price: '7800р'
            },
            {
                id: 8,
                header: '10 месяцев',
                price: '9800р'
            },
            {
                id: 9,
                header: '12 месяцев',
                price: '11000р'
            },
        ]
    },

    selected: null,
    information: [],
}

const SubscriotionReducer = (state = initState, action) => {
    switch(action.type) {
        case SELECTED_SUBSCRIPTION:
            return {
                ...state,
                selected: action.idSubscription
            }

        case SAVE_INFORMATION_SUBSCRIPTION:
            return {
                ...state,
                information: action.arrayData
            }

        default:
            return state;    
    }
}

export default SubscriotionReducer;
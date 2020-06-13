const initState = {
    trainers: {
        type: 'img',
        header: 'Тренерский состав',
        href: '/trainers',
        items: [
            {
                id: 1,
                src: 'trainers/1.jpg',
                name: 'Иван Иванов',
                information: 'Координатор, Эксперт-инструктор'
            },
            {
                id: 2,
                src: 'trainers/2.jpg',
                name: 'Николай Яблоков',
                information: 'Мастер-инструктор'
            },
            {
                id: 3,
                src: 'trainers/3.jpg',
                name: 'Тимур Медведев',
                information: 'Персональный инструктор'
            },
            {
                id: 4,
                src: 'trainers/4.jpg',
                name: 'Ксения Иванова',
                information: 'Мастер-инструктор'
            },
            {
                id: 5,
                src: 'trainers/5.jpg',
                name: 'Елена Свиридова',
                information: 'Персональный инструктор'
            },
            {
                id: 6,
                src: 'trainers/6.jpg',
                name: 'Михаил Волков',
                information: 'Мастер-инструктор'
            },
        ]
    }
}

const TrainersReducer = (state = initState, action) => {
    switch(action.type) {
        default:
            return state;    
    }
}

export default TrainersReducer;
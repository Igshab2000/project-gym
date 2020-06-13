const initState = {
    gym: {
        type: 'img',
        header: 'Тренажерный зал',
        href: '/gym-galary',
        items: [
            {src: 'gym/01.jpg', name:'Силовые тренажеры'},
            {src: 'gym/02.jpg', name: 'Велотренажеры'},
            {src: 'gym/03.jpg', name: 'Тренажеры для пресса и спины'},
            {src: 'gym/04.jpg', name: 'Гантели'},
            {src: 'gym/05.jpg', name: 'Штанги в разборе'},
            {src: 'gym/06.jpg', name: 'Тренажер для пресса'},
            {src: 'gym/07.jpg', name: 'Раздевалка'},
            {src: 'gym/08.jpg', name: 'Раздевалка'},
            {src: 'gym/09.jpg', name: 'Раздевалка'}
        ]
    }
}

const GymReducer = (state = initState, action) => {
    switch(action.type) {
        default:
            return state;    
    }
}

export default GymReducer;
export const styleRules = {
    yellowLow: '#dddf0d',
    greenMiddle: '#55bf3b',
    redHigh: '#DF5353',
    pinkLow: '#FC928C',
    yellowMid: '#F7EA6E',
    greenHigh: '#79E289',

    blueGradient: {
        x1: 0,
        y1: 0,
        x2: 0,
        y2: 1,
    },
    blueGradientStops: [
        [0, 'rgba(5, 122, 209, 0.40)'], // Color stop 1
        [0.19, 'rgba(29, 134, 213, 0.36)'], // Color stop 2
        [0.48, 'rgba(95, 170, 225, 0.26)'], // Color stop 3
        [0.85, 'rgba(203, 227, 245, 0.08)'], // Color stop 4
        [1, 'rgba(255, 255, 255, 0.00)'], // Color stop 5
    ],
    
    blueGradientStroke: '#057AD1',
    greenGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
    greenGradientStops: [
        [0, 'rgba(78, 217, 100, 0.40)'],
        [0.25, 'rgba(84, 218, 105, 0.38)'],
        [0.45, 'rgba(105, 222, 124, 0.34)'],
        [0.64, 'rgba(140, 230, 155, 0.26)'],
        [0.82, 'rgba(190, 241, 198, 0.15)'],
        [1, 'rgba(255, 255, 255, 0.00)'],
    ],
    greenGradientStroke: '#4ED964',
    redGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
    redGradientStops: [
        [0, 'rgba(255, 163, 158, 0.40)'],
        [1, 'rgba(255, 255, 255, 0.00)'],
    ],
    redGradientStroke: '#FFA39E',
};

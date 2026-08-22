const creatures = [

    {
        id:1,
        name:"Flamio",
        type:"FIRE",
        icon:"🔥",
        hp:45,
        attack:12,
        moves:[
            {name:"Ember",power:10},
            {name:"Scratch",power:8}
        ]
    },

    {
        id:2,
        name:"Aquava",
        type:"WATER",
        icon:"💧",
        hp:50,
        attack:10,
        moves:[
            {name:"Water Shot",power:11},
            {name:"Tackle",power:8}
        ]
    },

    {
        id:3,
        name:"Leafin",
        type:"GRASS",
        icon:"🌿",
        hp:48,
        attack:11,
        moves:[
            {name:"Leaf Hit",power:10},
            {name:"Tackle",power:8}
        ]
    },

    {
        id:4,
        name:"Voltik",
        type:"ELECTRIC",
        icon:"⚡",
        hp:40,
        attack:14,
        moves:[
            {name:"Spark",power:13},
            {name:"Quick Hit",power:8}
        ]
    }

];

const enemies = [

    {
        name:"Wild Flamio",
        icon:"🔥",
        hp:35,
        attack:9
    },

    {
        name:"Wild Aquava",
        icon:"💧",
        hp:40,
        attack:8
    },

    {
        name:"Wild Leafin",
        icon:"🌿",
        hp:38,
        attack:9
    }

];

const items = [
    "Potion",
    "Super Potion",
    "Power Crystal"
];

export function getImageByType(type : string){
    switch(type) {
        case 'CS' :
            return require('../assets/icon-general.png');
        case 'Exp' :
            return require('../assets/icon-expedition.png');
        case 'Vis' :
        case 'Gra' :
            return require('../assets/icon-visit.png');
        case 'Ch' :
            return require('../assets/icon-dog.png');
        case 'Ra' :
            return require('../assets/icon-radio.png');
        case 'Hl' :
            return require('../assets/icon-unexpected.png');
        default:
            return require('../assets/icon-general.png');
            
    }
}

export function getImageByPool(pool : string){

    switch(pool) {
        case 'general' :
            return require('../assets/icon-general.png');
        case 'event' :
        case 'expedition_return' :    
            return require('../assets/icon-expedition.png');
        case 'visit' :
        case 'scratching' :
            return require('../assets/icon-visit.png');
        case 'dog' :
            return require('../assets/icon-dog.png');
        case 'radio' :
            return require('../assets/icon-radio.png');
        case 'unexpected_guest' :
            return require('../assets/icon-unexpected.png');
        default:
            return require('../assets/icon-general.png');
            
    }
}
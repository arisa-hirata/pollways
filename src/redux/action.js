
export function ChangeStatus(status) {
    return {
        //Left side is what you will pass onto reducers
        //Right side is what you have named in your Control
        type:"CHANGE_STATUS", 
        status:status,
    }
}


export function ChangePage(page) {
    return {
        //Left side is what you will pass onto reducers
        //Right side is what you have named in your Control
        type:"CHANGE_PAGE",
        page:page,
    }
}

export function ChangeBG(color) {
    return {
        //Left side is what you will pass onto reducers
        //Right side is what you have named in your Control
        type:"CHANGE_BG",
        color:color,
    }
}

export function ChangeNightmode(nightmode) {
    return {
        //Left side is what you will pass onto reducers
        //Right side is what you have named in your Control
        type:"CHANGE_NIGHTMODE",
        nightmode:nightmode,
    }
}

export function Reset() {
    return {
        //action now will access into the reducers
        type:"RESET",
    }
}

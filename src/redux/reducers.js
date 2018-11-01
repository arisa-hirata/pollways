//Update the state variable
const initialStates = {
    //this goes into the main
    status:"",
    page:1,
    color:"white",
    nightmode: false
};

// **********************************************************************
export function status(state = initialStates, action) {
    let obj = Object.assign({}, state);

    switch(action.type) {

        case "CHANGE_STATUS":
        obj.status = action.status;
        obj.text = action.text;
        return obj;

        case "CHANGE_PAGE":
        obj.page = action.page;
        return obj;

        case "CHANGE_BG":
        obj.color = action.color;
        return obj;

        case "CHANGE_NIGHTMODE":
        obj.nightmode = action.nightmode;
        return obj;

        case "RESET":
        obj.color = "white";
        obj.nightmode = false;
        return obj;
        // this will change everything to default

        default:
        return state;
    }
}

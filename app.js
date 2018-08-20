
let index = 0;

//ACTIONS:
//-CAPTION CRUD:
const CREATE_CAPTION  = 'CREATE_CAPTION'
const UPDATE_CAPTION = 'UPDATE_CAPTION'
const DELETE_CAPTION = 'DELETE_CAPTION'

//ACTION CREATORS:
function createCaption(content, startTime, endTime) {
    return {
        type: CREATE_CAPTION,
        payload: {
            index: index++,
            content,
            startTime,
            endTime
        }
    }
}

function updateCaption(index, newContent, newStartTime, newEndTime) {
    return {
        type: UPDATE_CAPTION,
        payload: {
            index,
            newContent,
            newStartTime,
            newEndTime
        }
    }
}

function deleteCaption() {
    return {
        type: DELETE_CAPTION,
        payload: {
            index
        }
    }
}

//USAGE:
// let action = createCaption('test', 1, 1)
// dispatch(action)
//ALT:
// const boundCreateCaption = (content, startTime, endTime) => dispatch(createCaption(content, startTime, endTime))

//INITIAL STATE:
const initialState = {
    captions: []
}

//REDUCERS:
function rootReducer(state, action) {
    switch(action.type) {
        case CREATE_CAPTION:
            let caption = action.payload
            return {
                captions: [...state.captions, caption]
            }
        case UPDATE_CAPTION:
            let copiedCaptions = state.captions.splice() //Copy existing state
            let newCaption = action.payload  //Obtain edited caption

            //Find caption that is being edited 
            let oldCaptionIndex = -1
            let oldCaption
            for(let i=0; i<copiedCaptions.length; i++) {
                if(copiedCaptions[i].index === newCaption.index) {
                    oldCaptionIndex = i
                    oldCaption = copiedCaptions[i]
                }
            }

            let saveCaption = oldCaption
            if(typeof saveCaption !== 'undefined') 
            {
                if(typeof newCaption.newContent !== 'undefined' && newCaption.newContent !== oldCaption.content) {
                    saveCaption.content = newCaption.newConent
                }
                if(typeof newCaption.newStartTime !== 'undefined' && newCaption.newStartTime !== oldCaption.startTime) {
                    saveCaption.startTime = newCaption.newStartTime
                }
                if(typeof newCaption.newEndTime !== 'undefined' && newCaption.newEndTime !== oldCaption.endTime) {
                    saveCaption.endTime = newCaption.endTime
                }
            } else {
                console.error('Caption with index' + newCaption.index + 'does not exist!')
            }

            return {
                captions: [...copiedCaptions]
            }
        case DELETE_CAPTION:
            let caption = action.payload
            let copiedCaptions = state.captions.splice()

            let removeIndex = -1
            for(let i=0; i<copiedCaptions.length; i++) {
                if(copiedCaptions[i].index === caption.index) {
                    removeIndex = i
                    break
                }
            }

            if(removeIndex !== -1) {
                copiedCaptions.splice(removeIndex, 1)
            }

            return {
                captions: [...copiedCaptions]
            }
        default:
            return state
    }
}










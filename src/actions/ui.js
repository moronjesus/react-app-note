
import { types } from "../types/types"


export const actionSetError = ( msgError ) =>({

        type:types.uiSetError,
        payload:{
            msgError,
        }
})

export const actionRemoveError = () =>({

        type: types.uiRemoveError,

})

export const actionStartLoading = () =>({

        type:types.uiStartLoading,

})

export const actionFinishlaoding = () =>({

        type:types.uiFinishLoading,
})
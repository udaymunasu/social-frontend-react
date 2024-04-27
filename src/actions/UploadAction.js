import * as UploadApi from "../api/UploadRequest";

export const uploadImage = (data) => async (dispatch) => {
    try {
        console.log("Image upload Action start ho gya hy");
        await UploadApi.uploadImage(data);
        // Dispatch a success action if needed
    } catch (error) {
        console.error(error);
        // Dispatch a failure action if needed
    }
};

export const uploadPost = (data) => async (dispatch) => {
    dispatch({ type: "UPLOAD_START" });
    try {
        const newPost = await UploadApi.uploadPost(data);
        dispatch({ type: "UPLOAD_SUCCESS", payload: newPost.data });
    } catch (error) {
        console.error(error);
        dispatch({ type: "UPLOAD_FAIL" });
    }
};

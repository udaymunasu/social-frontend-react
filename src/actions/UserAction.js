import * as UserApi from "../api/UserRequests";

export const updateUser = (id, formData) => async (dispatch) => {
    dispatch({ type: "UPDATING_START" });
    try {
        const { data } = await UserApi.updateUser(id, formData);
        console.log("Action received data: ", data);
        dispatch({ type: "UPDATING_SUCCESS", payload: data });
    } catch (error) {
        console.error(error);
        dispatch({ type: "UPDATING_FAIL" });
    }
};

export const followUser = (id, data) => async (dispatch) => {
    dispatch({ type: "FOLLOW_USER", payload: id });
    try {
        await UserApi.followUser(id, data);
        // Dispatch additional actions if needed upon successful follow
    } catch (error) {
        console.error(error);
        // Dispatch additional actions if needed upon follow failure
    }
};

export const unfollowUser = (id, data) => async (dispatch) => {
    dispatch({ type: "UNFOLLOW_USER", payload: id });
    try {
        await UserApi.unfollowUser(id, data);
        // Dispatch additional actions if needed upon successful unfollow
    } catch (error) {
        console.error(error);
        // Dispatch additional actions if needed upon unfollow failure
    }
};

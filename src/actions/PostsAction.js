import * as PostsApi from "../api/PostsRequests";

export const getTimelinePosts = (id) => async (dispatch) => {
    dispatch({ type: "RETREIVING_START" });
    try {
        const { data } = await PostsApi.getTimelinePosts(id);
        dispatch({ type: "RETREIVING_SUCCESS", payload: data });
    } catch (error) {
        console.error(error);
        dispatch({ type: "RETREIVING_FAIL" });
    }
};

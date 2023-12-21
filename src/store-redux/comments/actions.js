export default {
  /**
   * Загрузка товара
   * @param id
   * @return {Function}
   */
  load: (id) => {
    return async (dispatch, getState, services) => {
      dispatch({ type: 'comments/load-start' });

      try {
        const res = await services.api.request({
          url: `/api/v1/comments?fields=items(_id,text,dateCreate,author(profile(name)),parent(_id,_type),isDeleted),count&limit=*&search[parent]=${id}`,
        });
        dispatch({
          type: 'comments/load-success',
          payload: { data: res.data.result.items },
        });
      } catch (e) {
        dispatch({ type: 'comments/load-error' });
      }
    };
  },

  post: (data, user) => {
    return async (dispatch, getState, services) => {
      try {
        const token = localStorage.getItem('token');
        const newData = JSON.stringify(data);
        if (token) {
          const res = await services.api.request({
            url: '/api/v1/comments',
            method: 'POST',
            body: newData,
          });
          dispatch({
            type: 'oneComments/load-success',
            payload: {
              data: {
                ...res.data.result,
                author: {
                  profile: { name: user, _id: res.data.result.author._id },
                },
              },
            },
          });
        } else console.log('invalid token');
      } catch (e) {
        dispatch({ type: 'comments/load-error' });
      }
    };
  },
};

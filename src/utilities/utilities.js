import { message } from "antd";
export const throwServerError = (error) => {
  if (error.response && error.response.status === 401) {
    localStorage.clear();
    //   store.dispatch(push('/auth/login'));
  } else if (error.response && error.response.data) {
    try {
      Object.entries(error.response.data).forEach(([key, value]) => {
        value.forEach((item) => message.error(`${key.toString()} ${item}`));
      });
    } catch (e) {
      message.error(error.message);
    }
  } else if (error.message) {
    message.error(error.message);
  } else {
    message.error("Something went wrong!");
  }
};

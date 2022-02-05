import axios from "axios";
import { put } from "redux-saga/effects";
import { throwServerError } from "../../utilities/utilities";
import starWarAction from "../Reducers/star-war-reducers";

export function* workerFetchList(action) {
  try {
    const response = yield axios.get(`starships/?${action.page}`);
    const {
      data: { results },
    } = response;
    const list = results?.map((row, index) => {
      const total_capacity =
        parseInt(row?.passengers, 10 || 0) + parseInt(row?.crew, 10 || 0);
      const formated_data = {
        ...row,
        belongToFleet: false,
        total_capacity,
        key: `${index}-${row?.name}-${row?.model}`,
      };
      return formated_data;
    });
    yield put(
      starWarAction.fetchSpaceshipSuccess({ ...response.data, results: list })
    );
  } catch (error) {
    yield put(starWarAction.fetchSpaceshipFail(error.message));
    throwServerError(error);
  }
}

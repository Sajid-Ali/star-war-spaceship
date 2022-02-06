import axios from "axios";
import { put } from "redux-saga/effects";
import { throwServerError } from "../../utilities/utilities";
import starWarAction from "../Reducers/star-war-reducers";

export function* workerFetchList(action) {
  try {
    const response = yield axios.get(`starships/?${action.query}`);
    const {
      data: { results },
    } = response;
    const list = results?.map((row, index) => {
      const crew = parseInt(row?.crew, 10);
      const passengers = parseInt(row?.passengers, 10);
      const total_capacity = (crew || 0) + (passengers || 0);
      const formated_data = {
        ...row,
        count: 0,
        percentage: 0,
        total_capacity,
        belongToFleet: false,
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

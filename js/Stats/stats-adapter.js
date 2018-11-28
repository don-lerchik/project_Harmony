import {DefaultAdapter} from "../model";

export default new class extends DefaultAdapter {
  preprocess(data) {
    const dateDesc = (first, second) => (second.point - first.point);
    return data.sort(dateDesc);
  }
  toServer(data) {
    const toServed = {
      name: data.name,
      lives: data.lives,
      point: data.point,
      answers: data.answers
    };
    return toServed;
  }
}();

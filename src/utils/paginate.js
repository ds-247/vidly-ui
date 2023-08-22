import _ from "lodash";

export default function Paginate(itemsArray, pageNumber, pageSize) {
  const startIndex = (pageNumber - 1) * pageSize;
  return _(itemsArray).slice(startIndex).take(pageSize).value();
}

import moment from "moment";

export const removeFromArray = (array, itemToRemove) => {
  return array.filter(item => item !== itemToRemove);
}

export const formatDateString = (unformatted) => {
  return moment(unformatted).format("YYYY/MM/DD");
}

export const findDuplicateDates = (array) => {
  let duplicateDates = [];
  const lastIndex = array.length -1;
  for (let i = 0; i < array.length; i++) {
    if (i !== lastIndex) {
      for (let p = i + 1; p < array.length; p++) {
        if (array[i].date === array[p].date) {
          duplicateDates.push(array[i].date);
        }
      }
    }
  }
  return duplicateDates;
}
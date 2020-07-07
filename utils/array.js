export default {
  deleteElementOfArray(array, id) {
    return array.filter(e => e.id !== id);
  },
};

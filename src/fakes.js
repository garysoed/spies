let Fakes = {
  NodeList(data) {
    return {
      length: data.length,
      item(i) {
        return data[i];
      }
    };
  }
};

export default Fakes;

if (!window.spies) {
  window.spies = {};
}
window.spies.Fakes = Fakes;
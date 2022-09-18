// export default class LoadMoreBtn {
//   constructor({ cls, hidden = false }) {
//     this.refs = this.getRefs(cls);
//     hidden && this.hide();
//   }

//   getRefs(cls) {
//     const refs = {};
//     refs.button = document.querySelector(cls);
//     refs.label = button.querySelector('.label');
//     return refs;
//   }
//   enable() {
//     this.refs.button.dissabled = false;
//     this.refs.label.textContent = 'Load more';
//   }
//   dissable() {
//     this.refs.button.dissabled = false;
//     this.refs.label.textContent = 'Loading...';
//   }
//   show() {
//     this.refs.button.classlist.remove('is-hidden');
//   }
//   hide() {
//     this.refs.button.classlist.add('is-hidden');
//   }
// }

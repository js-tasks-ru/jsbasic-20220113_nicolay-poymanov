export default function promiseClick(button) {
  return new Promise((resolve, reject) => {
    button.addEventListener('click', (event, err) => {
      if (err) {
        reject(err);
      } else {
        resolve(event);
      }

    }, {once: true});
  });
}

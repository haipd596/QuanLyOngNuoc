const google = require('googlethis');

async function search() {
  const options = { page: 0, safe: false, transparent: false, background: false };
  const products = [
    'ống nhựa pvc bình minh phi 21 site:dienmayxanh.com OR site:.vn',
    'ống nhựa pvc bình minh phi 27',
    'van khóa nước nhựa pvc phi 21',
    'cb tép panasonic 1p 20a',
    'dây điện cadivi 2.5 cuộn 100m'
  ];

  for (const q of products) {
    try {
      const res = await google.image(q, options);
      console.log(q + ' -> ' + (res.length > 0 ? res[0].url : 'NONE'));
    } catch(e) {
      console.log(q + ' -> ERROR');
    }
  }
}
search();

export const PHAMVIID_KHAC = [
  16,
  18,
];

export function removeVietnameseDiacritics(str: any) {
  const from = 'ÁÀẢÃẠÂẤẦẨẪẬĂẮẰẲẴẶĐÉÈẺẼẸÊẾỀỂỄỆÍÌỈĨỊÓÒỎÕỌÔỐỒỔỖỘƠỚỜỞỠỢÚÙỦŨỤƯỨỪỬỮỰÝỲỶỸỴáàảãạâấầẩẫậăắằẳẵặđéèẻẽẹêếềểễệíìỉĩịóòỏõọôốồổỗộơớờởỡợúùủũụưứừửữựýỳỷỹỵ';
  const to = 'AAAAAAAAAAAAAAAAADEEEEEEEEEEEEIIIIIOOOOOOOOOOOOOUUUUUUUUUUUYYYYYaaaaaaaaaaaaaaaaadeeeeeeeeeeeeiiiiioooooooooooooouuuuuuuuuuuyyyyy';

  return str.split('').map((letter: any) => {
    const pos = from.indexOf(letter);

    return pos > -1 ? to[pos] : letter;
  }).join('');
}

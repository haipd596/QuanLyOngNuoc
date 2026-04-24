import { AnyObject } from 'antd/es/_util/type';
import _ from 'lodash';
import _groupBy from 'lodash/groupBy';
import _map from 'lodash/map';
import { ALPHABET } from './type';

// Utility function to clean strings
const cleanString = (input: string): string => {
  return input.replace(/\s+/g, ' ').trim(); // Replace all whitespace (including tabs) with a single space
};

export const transformToTreeData = (
  data: AnyObject[],
  valueForm?: any,
  showOtherInputConfig: {
    key: string;
    showOtherInput: boolean
  }[] = [],
) => {
  const groupedData = _groupBy(data, 'NhomPhamViId');
  const treesData = _map(groupedData, (items, NhomPhamViId: any) => {
    const cleanedNhomPhamViTen = cleanString(items[0].NhomPhamViTen);
    const _key = `NhomPhamViId|${NhomPhamViId}|NhomPhamViTen|${items[0].NhomPhamViId}`;
    const objTree = { NhomPhamViId: Number(NhomPhamViId), NhomPhamViTen: cleanedNhomPhamViTen };

    // showOtherInput
    const config = showOtherInputConfig.find((obj) => obj.key === NhomPhamViId);
    const showOtherInput = config?.showOtherInput ?? false;

    return {
      key: _key,
      name: cleanedNhomPhamViTen,
      isShow: items.some(({ ThuTuHienThi }) => ThuTuHienThi === 0),
      title: `${ALPHABET[Number(NhomPhamViId - 1)]}) ${cleanedNhomPhamViTen}`,
      showOtherInput,
      children: items.map(({ Ten, ThuTuHienThi, Id }) => {
        const cleanedPhamViTen = cleanString(Ten);
        const _keyChildren = ThuTuHienThi === 0
          ? JSON.stringify({ PhamViId: Id, PhamViTen: cleanedNhomPhamViTen, ...objTree })
          : JSON.stringify({ PhamViId: Id, PhamViTen: cleanedPhamViTen, ...objTree });

        return {
          title: cleanedPhamViTen,
          key: _keyChildren,
          ThuTuHienThi,
        };
      }).concat({
        title: `${cleanedNhomPhamViTen} khác`,
        key: _.isEmpty(valueForm) ? `{"PhamViId":"${NhomPhamViId}10","PhamViTen":"${cleanedNhomPhamViTen} khác","NhomPhamViId":"${NhomPhamViId}","NhomPhamViTen":"${cleanedNhomPhamViTen}"}` : (
          _.chain(valueForm)
            .values()
            .flatten()
            .find((value) => value.includes(`${cleanedNhomPhamViTen} khác`))
            .value()
        ),
        ThuTuHienThi: 999,
      }),
    };
  });

  return treesData;
};

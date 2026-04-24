export const vangTransformer = (data: any) => {
  let number: number = 1;
  const constName = 'tblPhucHoiDat';
  const alp = 'abcdefghijklmnopqxyz';
  let cIndex = 0;
  const newData: any = {};
  data.forEach((item: any) => {
    const cData = item;
    const docType = cData.doc_type;
    if (docType !== null && Object.keys(docType).length > 0) {
      const { checkBoxValue } = docType;

      if (checkBoxValue !== null) {
        const { checkbox1 } = checkBoxValue;

        if (checkbox1 !== undefined && Object.keys(checkbox1).length === 3) {
          if (checkbox1['Dữ liệu'] !== undefined && checkbox1['Bản đồ số'] !== undefined && checkbox1['Bản đồ quét'] !== undefined) {
            cIndex = (number - 1) % alp.length;
            newData[`${constName}${number}${alp[cIndex]}.#cb#`] = checkbox1['Dữ liệu'];
            number += 1;

            cIndex = (number - 1) % alp.length;
            newData[`${constName}${number}${alp[cIndex]}.#cb#`] = checkbox1['Bản đồ số'];
            number += 1;

            cIndex = (number - 1) % alp.length;
            newData[`${constName}${number}${alp[cIndex]}.#cb#`] = checkbox1['Bản đồ quét'];
            number += 1;
          }

          if (checkbox1['Cấp cả nước'] !== undefined && checkbox1['Cấp vùng'] !== undefined && checkbox1['Cấp tỉnh'] !== undefined) {
            cIndex = (number - 1) % alp.length;
            newData[`${constName}${number}${alp[cIndex]}.#cb#`] = checkbox1['Cấp cả nước'];
            number += 1;

            cIndex = (number - 1) % alp.length;
            newData[`${constName}${number}${alp[cIndex]}.#cb#`] = checkbox1['Cấp vùng'];
            number += 1;

            cIndex = (number - 1) % alp.length;
            newData[`${constName}${number}${alp[cIndex]}.#cb#`] = checkbox1['Cấp tỉnh'];
            number += 1;
          }
        }
        const { checkbox2 } = checkBoxValue;

        if (checkbox2 !== undefined && Object.keys(checkbox2).length === 3) {
          if (checkbox2['Dữ liệu'] !== undefined && checkbox2['Bản đồ số'] !== undefined && checkbox2['Bản đồ quét'] !== undefined) {
            cIndex = (number - 1) % alp.length;
            newData[`${constName}${number}${alp[cIndex]}.#cb#`] = checkbox2['Dữ liệu'];
            number += 1;

            cIndex = (number - 1) % alp.length;
            newData[`${constName}${number}${alp[cIndex]}.#cb#`] = checkbox2['Bản đồ số'];
            number += 1;

            cIndex = (number - 1) % alp.length;
            newData[`${constName}${number}${alp[cIndex]}.#cb#`] = checkbox2['Bản đồ quét'];
            number += 1;
          }

          if (checkbox2['Cấp cả nước'] !== undefined && checkbox2['Cấp vùng'] !== undefined && checkbox2['Cấp tỉnh'] !== undefined) {
            cIndex = (number - 1) % alp.length;
            newData[`${constName}${number}${alp[cIndex]}.#cb#`] = checkbox2['Cấp cả nước'];
            number += 1;

            cIndex = (number - 1) % alp.length;
            newData[`${constName}${number}${alp[cIndex]}.#cb#`] = checkbox2['Cấp vùng'];
            number += 1;

            cIndex = (number - 1) % alp.length;
            newData[`${constName}${number}${alp[cIndex]}.#cb#`] = checkbox2['Cấp tỉnh'];
            number += 1;
          }
        }

        if (Object.keys(checkBoxValue).length === 3) {
          if (checkBoxValue['Dữ liệu'] !== undefined && checkBoxValue['Bản đồ số'] !== undefined && checkBoxValue['Bản đồ quét'] !== undefined) {
            cIndex = (number - 1) % alp.length;
            newData[`${constName}${number}${alp[cIndex]}.#cb#`] = checkBoxValue['Dữ liệu'];
            number += 1;

            cIndex = (number - 1) % alp.length;
            newData[`${constName}${number}${alp[cIndex]}.#cb#`] = checkBoxValue['Bản đồ số'];
            number += 1;

            cIndex = (number - 1) % alp.length;
            newData[`${constName}${number}${alp[cIndex]}.#cb#`] = checkBoxValue['Bản đồ quét'];
            number += 1;
          }

          if (checkBoxValue['Cấp cả nước'] !== undefined && checkBoxValue['Cấp vùng'] !== undefined && checkBoxValue['Cấp tỉnh'] !== undefined) {
            cIndex = (number - 1) % alp.length;
            newData[`${constName}${number}${alp[cIndex]}.#cb#`] = checkBoxValue['Cấp cả nước'];
            number += 1;

            cIndex = (number - 1) % alp.length;
            newData[`${constName}${number}${alp[cIndex]}.#cb#`] = checkBoxValue['Cấp vùng'];
            number += 1;

            cIndex = (number - 1) % alp.length;
            newData[`${constName}${number}${alp[cIndex]}.#cb#`] = checkBoxValue['Cấp tỉnh'];
            number += 1;
          }
        }
      }

      const { chuyenDeValue } = docType;

      if (chuyenDeValue !== null) {
        cIndex = (number - 1) % alp.length;
        newData[`${constName}${number}${alp[cIndex]}`] = `${docType.chuyenDeValue}`;
        number += 1;
      }
    }

    cIndex = (number - 1) % alp.length;
    newData[`${constName}${number}${alp[cIndex]}.#cb#`] = cData.supply;
    number += 1;

    cIndex = (number - 1) % alp.length;
    newData[`${constName}${number}${alp[cIndex]}`] = cData.year;
    number += 1;

    const { level } = cData;
    if (level !== '' && level.length > 0) {
      const valLevel0 = level[0].value;

      if (valLevel0 !== null && valLevel0 !== undefined) {
        for (let j = 0; j < level.length; j += 1) {
          cIndex = (number - 1) % alp.length;
          newData[`${constName}${number}${alp[cIndex]}`] = level[j].value;
          number += 1;
        }
      } else {
        cIndex = (number - 1) % alp.length;
        newData[`${constName}${number}${alp[cIndex]}`] = level;
        number += 1;
      }
    } else {
      cIndex = (number - 1) % alp.length;
      newData[`${constName}${number}${alp[cIndex]}`] = level;
      number += 1;
    }
  });

  return newData;
};

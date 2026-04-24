import { PATH_TO_MAIN_GIAY_TOID } from '@packages/components/DigitalPaper/constant';
import _get from 'lodash/get';

/**
 * This use to get key subform, it's outdate, start from 04/12/2024
 * @description alternatively use ```getIdForSubForm```
 * @deprecated
 * @param record
 * @returns
 */
export const getIdForSubFormByGiayToIdOnly = (record: any) => _get(record, PATH_TO_MAIN_GIAY_TOID, '');

/**
 * subform will be saved by new prefix key, start from 04/12/2024
 * @param record
 * @returns
 */
export const getIdForSubForm = (record: any) => `GiayTo_${_get(record, PATH_TO_MAIN_GIAY_TOID, '')}_${_get(record, 'Id', '')}`;

export const MOCK_DATA_TPHS_QD_KS = [

  {
    GiayToId: {
      Id: 20,
      Ten: 'Dự án đầu tư khai thác khoáng sản kèm theo quyết định phê duyệt',
      Ma: 'ea69a832-05b5-4a45-a36a-0cb5d9cc166a',
      UrlTaiMau: null,
    },
    Id: 8,
    ThuTuHienThi: 2,
    BatBuoc: 0,
    ID: 8,
  },
  {
    GiayToId: {
      Id: 33,
      Ten: 'Giấy chứng nhận đăng ký kinh doanh',
      Ma: '4c7483fe-be6b-4fa5-94b4-12f5fde7cdc6',
      UrlTaiMau: null,
    },
    Id: 20,
    ThuTuHienThi: 5,
    BatBuoc: 0,
    ID: 20,
  },
  {
    GiayToId: {
      Id: 96,
      Ten: 'Bản đồ khu vực khai thác khoáng sản',
      Ma: '518036db-2ae7-4fd6-b429-3bb900f6221a',
      UrlTaiMau: null,
    },
    Id: 37,
    ThuTuHienThi: 1,
    BatBuoc: 0,
    ID: 37,
  },
  {
    GiayToId: {
      Id: 164,
      Ten: 'Báo cáo đánh giá tác động môi trường ',
      Ma: 'f1fa0d2f-b24c-4e9b-81f0-7ad0e37c1bcc',
      UrlTaiMau: null,
    },
    Id: 65,
    ThuTuHienThi: 3,
    BatBuoc: 0,
    ID: 65,
  },
  {
    GiayToId: {
      Id: 179,
      Ten: 'Đơn đề nghị cấp phép khai thác khoáng sản',
      Ma: 'f4075a7d-56f0-4bdf-aded-86f3028fb344',
      UrlTaiMau: 'https://csdl.dichvucong.gov.vn/web/jsp/download_file.jsp?ma=3fe1fb752ce418cb',
    },
    Id: 71,
    ThuTuHienThi: 0,
    BatBuoc: 1,
    ID: 71,
  },
  {
    GiayToId: {
      Id: 242,
      Ten: 'Giấy chứng nhận đầu tư',
      Ma: '7e093f41-1c45-4f35-8704-c13a3f2d40bc',
      UrlTaiMau: null,
    },
    Id: 98,
    ThuTuHienThi: 7,
    BatBuoc: 0,
    ID: 98,
  },
  {
    GiayToId: {
      Id: 81,
      Ten: 'Văn bản xác nhận trúng đấu giá',
      Ma: '80c19e6e-bf6c-4926-9232-3297268e77da',
      UrlTaiMau: null,
    },
    Id: 968,
    ThuTuHienThi: 4,
    BatBuoc: 0,
    ID: 968,
  },
  {
    GiayToId: {
      Id: 28,
      Ten: 'Bản cam kết bảo vệ môi trường',
      Ma: 'cf05aa16-0292-4b85-9da2-1064f8f1e70d',
      UrlTaiMau: 'https://csdl.dichvucong.gov.vn/web/jsp/download_file.jsp?ma=3fca23beb735cc88',
    },
    Id: 969,
    ThuTuHienThi: 8,
    BatBuoc: 0,
    ID: 969,
  },
  {
    Id: 970,
    ThuTuHienThi: 9,
    BatBuoc: 0,
    ID: 970,
  },
  {
    Id: 972,
    ThuTuHienThi: 6,
    BatBuoc: 0,
    ID: 972,
  },
  {
    GiayToId: {
      Id: 291,
      Ten: 'Quyết định phê duyệt trữ lượng khoáng sản',
      Ma: 'f97eca69-495a-4f4d-a476-e8d3d84787aa',
      UrlTaiMau: null,
    },
    Id: 1002,
    ThuTuHienThi: 10,
    BatBuoc: 0,
    ID: 1002,
  },
  {
    Id: 1003,
    ThuTuHienThi: 11,
    BatBuoc: 0,
    ID: 1003,
  },
];

export const VALUE_REQUIRED_FORM = {
  PERSONAL: 1,
  ORGANIZATION: 2,
};

export const OPTION_REQUIRE_FORM = [
  {
    label: 'Cá nhân',
    value: VALUE_REQUIRED_FORM.PERSONAL,
    checked: true,
  },
  {
    label: 'Tổ chức',
    value: VALUE_REQUIRED_FORM.ORGANIZATION,
    checked: true,
  },
];

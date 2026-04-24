/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-unused-vars */
import _ from 'lodash';
import { fetchDvcBase } from './fetchDvcBase';
import { getBaseDvcApi } from './getBaseUrl';

const mockCaNhanTaiKhoan = {
  LoaiTaiKhoan: 0,
  CaNhan: {
    TechID: 'TECH12345',
    LoaiTaiKhoan: 'Admin',
    HoVaTen: 'Nguyen Van A',
    SoCMND: '123456789',
    SoDinhDanh: '987654321',
    NgayThangNamSinh: '90151996',
    ThuDienTu: 'nguyenvana@example.com',
    // ThuDienTu: '',
    GioiTinh: 'Nam',
    ThuongTru: {
      PhuongXa: '123 Duong ABC',
      QuanHuyen: ' Phuong XYZ',
      ThanhPho: 'Quan 1, TP. Ho Chi Minh',
      // PhuongXa: '',
      // QuanHuyen: '',
      // ThanhPho: '',
      MaTinh: '79',
      MaHuyen: '01',
      MaXa: '001',
    },
    NgayCapCMTND: '2008-05-15',
    NoiCapCMTND: 'Cong an TP. Ho Chi Minh',
    SoDienThoai: '0901234567',
    // SoDienThoai: '',
    Fax: '0834567890',
  },
  DoanhNghiep: null,
};

// @ts-ignore
const mockDoanhNghiepTaiKhoan = {
  LoaiTaiKhoan: 1,
  CaNhan: null,
  DoanhNghiep: {
    TechID: 'TECH67890',
    LoaiTaiKhoan: 'DoanhNghiep',
    MaSoThue: '1234567890',
    MaSoDoanhNghiep: 'DN987654321',
    TenDoanhNghiep: 'Cong Ty TNHH ABC',
    DiaChi: {
      PhuongXa: '123 Duong ABC',
      QuanHuyen: ' Phuong XYZ',
      ThanhPho: 'Quan 1, TP. Ho Chi Minh',
      MaTinh: '01',
      MaHuyen: '02',
      MaXa: '002',
    },
    SoDienThoai: '0912345678',
    ThuDienTu: 'contact@abccompany.com',
    NgayCap: '2015-06-20',
    NoiCap: 'So Ke Hoach Dau Tu TP. Ha Noi',
    Fax: '0245678901',
    NguoiDaiDien: {
      HoVaTen: 'Tran Thi B',
      ChucVu: 'Mẹ thiên hạ',
    },
  },
};

// LẤY THÔNG TIN NGƯỜI DÙNG
export const apiGetUserInfoV2 = async () => {
  try {
    let res: any = {};

    if (import.meta.env.MODE !== 'production') {
      res.Data = mockCaNhanTaiKhoan;
    } else {
      const url = `${getBaseDvcApi()}/_vti_bin/DVCM/CommonServices.svc/CurrentUserInfo`;
      res = await fetchDvcBase({ url, requestInit: { method: 'GET' } });
    }

    if (_.isEmpty(res?.Data)) {
      console.error('apiGetUserInfoV2', _.get(res, 'Message', ''));
      return {};
    }

    return res.Data;
    return {};
  } catch (error) {
    throw new Error(`apiGetUserInfo: ${error}`);
  }
};

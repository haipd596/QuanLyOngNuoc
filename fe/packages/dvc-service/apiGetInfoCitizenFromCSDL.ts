/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { getUserIdPageContext } from '@packages/utils/common';
import { parseXmlStringToJson } from '@packages/utils/xml';
import _ from 'lodash';
import _get from 'lodash/get';
import { fetchDvcBase } from './fetchDvcBase';
import { getBaseDvcApi } from './getBaseUrl';
import sampleJson from './sample.json';

export const apiGetInfoCitizenFromCSDL = async ({
  dob,
  id,
  name,
}: any) => {
  const userId = getUserIdPageContext();
  if (!userId) return;

  const urlRequest = `${getBaseDvcApi()}/_vti_bin/DVCM/CommonServices.svc/GetInfoCitizenFromCSDLQG?cccd=${id}&fullName=${name}&dob=${dob}`;

  // see: XML_SAMPLE
  const data = await fetchDvcBase({ url: urlRequest, requestInit: { method: 'GET' } });

  if (_.isEmpty(data)) {
    throw new Error('Dữ liệu không tồn tại!');
  }

  try {
    const myJson = parseXmlStringToJson(data);

    return _get(myJson, 'Body.CongdanCollection.CongDan', {});
  } catch (error) {
    return _get(sampleJson, 'Body.CongdanCollection.CongDan', {});
  }
};

// @ts-ignore
const XML_SAMPLE = '<?xml version="1.0" encoding="UTF-8"?>u000a<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/">u000a    <soapenv:Header xmlns:dan="http://dancuquocgia.bca"/>u000a    <soapenv:Body xmlns:dan="http://dancuquocgia.bca">u000a        <ns1:CongdanCollection xmlns:ns1="http://www.mic.gov.vn/dancu/1.0">u000a            <ns1:CongDan>u000a                <ns1:SoDinhDanh>026092008262</ns1:SoDinhDanh>u000a                <ns1:SoCMND>135602342</ns1:SoCMND>u000a                <ns1:HoVaTen>u000a                    <ns1:Ho/>u000a                    <ns1:ChuDem/>u000a                    <ns1:Ten>ĐÀO VĂN TÀI</ns1:Ten>u000a                </ns1:HoVaTen>u000a                <ns1:GioiTinh>1</ns1:GioiTinh>u000a                <ns1:DanToc>01</ns1:DanToc>u000a                <ns1:TonGiao>00</ns1:TonGiao>u000a                <ns1:TinhTrangHonNhan>2</ns1:TinhTrangHonNhan>u000a                <ns1:NhomMau>00</ns1:NhomMau>u000a                <ns1:NgayThangNamSinh>u000a                    <ns1:Nam>1992</ns1:Nam>u000a                    <ns1:NgayThangNam>19921122</ns1:NgayThangNam>u000a                </ns1:NgayThangNamSinh>u000a                <ns1:NoiDangKyKhaiSinh>u000a                    <ns1:MaTinhThanh>26</ns1:MaTinhThanh>u000a                    <ns1:MaQuanHuyen>252</ns1:MaQuanHuyen>u000a                    <ns1:MaPhuongXa>09106</ns1:MaPhuongXa>u000a                    <ns1:ChiTiet>XÃ LŨNG HÒA, HUYỆN VĨNH TƯỜNG, TỈNH VĨNH PHÚC</ns1:ChiTiet>u000a                    <ns1:QuocGia>VN</ns1:QuocGia>u000a                </ns1:NoiDangKyKhaiSinh>u000a                <ns1:QuocTich/>u000a                <ns1:QueQuan>u000a                    <ns1:MaTinhThanh>26</ns1:MaTinhThanh>u000a                    <ns1:MaQuanHuyen>252</ns1:MaQuanHuyen>u000a                    <ns1:MaPhuongXa>09106</ns1:MaPhuongXa>u000a                    <ns1:ChiTiet>XÃ LŨNG HÒA, HUYỆN VĨNH TƯỜNG, TỈNH VĨNH PHÚC</ns1:ChiTiet>u000a                    <ns1:QuocGia>VN</ns1:QuocGia>u000a                </ns1:QueQuan>u000a                <ns1:ThuongTru>u000a                    <ns1:MaTinhThanh>26</ns1:MaTinhThanh>u000a                    <ns1:MaQuanHuyen>252</ns1:MaQuanHuyen>u000a                    <ns1:MaPhuongXa>09106</ns1:MaPhuongXa>u000a                    <ns1:ChiTiet>XÃ LŨNG HÒA, HUYỆN VĨNH TƯỜNG, TỈNH VĨNH PHÚC</ns1:ChiTiet>u000a                    <ns1:QuocGia>VN</ns1:QuocGia>u000a                </ns1:ThuongTru>u000a                <ns1:NoiOHienTai>u000a                    <ns1:MaTinhThanh>26</ns1:MaTinhThanh>u000a                    <ns1:MaQuanHuyen>252</ns1:MaQuanHuyen>u000a                    <ns1:MaPhuongXa>09106</ns1:MaPhuongXa>u000a                    <ns1:ChiTiet>XÃ LŨNG HÒA, HUYỆN VĨNH TƯỜNG, TỈNH VĨNH PHÚC</ns1:ChiTiet>u000a                    <ns1:QuocGia>VN</ns1:QuocGia>u000a                </ns1:NoiOHienTai>u000a                <ns1:Cha>u000a                    <ns1:HoVaTen>DVT</ns1:HoVaTen>u000a                    <ns1:QuocTich>VN</ns1:QuocTich>u000a                    <ns1:SoDinhDanh>123456</ns1:SoDinhDanh>u000a                    <ns1:SoCMND>123456</ns1:SoCMND>u000a                </ns1:Cha>u000a                <ns1:Me>u000a                    <ns1:HoVaTen>DTN</ns1:HoVaTen>u000a                    <ns1:QuocTich>VN</ns1:QuocTich>u000a                    <ns1:SoDinhDanh>654321</ns1:SoDinhDanh>u000a                    <ns1:SoCMND>65432</ns1:SoCMND>u000a                </ns1:Me>u000a                <ns1:VoChong>u000a                    <ns1:HoVaTen>DNVM</ns1:HoVaTen>u000a                    <ns1:QuocTich>VN</ns1:QuocTich>u000a                    <ns1:SoDinhDanh>987654</ns1:SoDinhDanh>u000a                    <ns1:SoCMND>465789</ns1:SoCMND>u000a                </ns1:VoChong>u000a                <ns1:NguoiDaiDien>u000a                    <ns1:HoVaTen>DVT</ns1:HoVaTen>u000a                    <ns1:QuocTich>VN</ns1:QuocTich>u000a                    <ns1:SoDinhDanh>123456</ns1:SoDinhDanh>u000a                    <ns1:SoCMND>654321</ns1:SoCMND>u000a                </ns1:NguoiDaiDien>u000a                <ns1:ChuHo>u000a                    <ns1:QuanHe>CH01</ns1:QuanHe>u000a                    <ns1:SoDinhDanh>026092008262</ns1:SoDinhDanh>u000a                    <ns1:SoCMND>135602342</ns1:SoCMND>u000a                    <ns1:HoVaTen>ĐÀO VĂN TÀI</ns1:HoVaTen>u000a                </ns1:ChuHo>u000a                <ns1:SoSoHoKhau>cm41</ns1:SoSoHoKhau>u000a            </ns1:CongDan>u000a        </ns1:CongdanCollection>u000a    </soapenv:Body>u000a</soapenv:Envelope>';

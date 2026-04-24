import axiosClient from "~/configs/axios";

export async function apiGetThuTucHanhIdByIdForm(FormId?: string) {
  const params = new URL(window.location.href).searchParams;
  const idForm = FormId || params.get('idForm');

  const dvcId = params.get('dichVuCongId');
  const title = "dm_FormTiepNhanThuTuc";
  const url = '/eform/common/query';

  try {
    let payload = {
      "title": title,
      "filter": `ThuTucId=${dvcId}  AND TypeForm=0`,
    }

    if(idForm) 
      payload = {
        "title": title,
        "filter": `Id=${idForm} AND TypeForm=0`
      }

    const rs = await axiosClient.post(url, payload);
    if (rs?.data?.items?.length > 0) {
      return rs?.data?.items[0];
    }
  } catch (error) {
    throw new Error(`apiGetThuTucHanhIdByIdForm: ${error}`);
  }

  return {};
}

import { 
  singleUploadFile, 
  deleteFile as delFile,
  multiUploadFile as multiUploadFiles,
  downloadFileBlob,
  downloadFilePublic
}  from '@shared/services/api';
import useNotification from './useNotification';
import useServerErrorMsg from './useServerErrorMsg';

export const useFileManagementService = () => {
  const { showErrorNotify } = useNotification();
  const { ERROR_CODE_MSG } = useServerErrorMsg();

  class FileManagementService {
    constructor() {
      // Bind tất cả method để this hoạt động đúng
      this.preview = this.preview.bind(this);
      this.getFullUrl = this.getFullUrl.bind(this);
      this.getFileName = this.getFileName.bind(this);
    }

    async uploadFile(payload:any):Promise<string|null> {
      const rs = await singleUploadFile(payload);
      if(!rs?.success) {
        const msg = 'Tải tệp lên thất bại!'
        showErrorNotify(msg)
        return null;
      }
      return rs.data; //cmc-dtqg/public/thutuchanhchinh/BB_CMC_Key_291125.docx
    }

    async multiUploadFile(payload:any) {
      const rs = await multiUploadFiles(payload);
      if(!rs?.success) {
        const msg = 'Tải tệp lên thất bại!'
        showErrorNotify(msg)
        return null;
      }
      return rs.data; // [cmc-dtqg/public/thutuchanhchinh/BB_CMC_Key_291125.docx, ...]
    }

    async deleteFile(payload:any):Promise<boolean> {
      const rs = await delFile(payload);
      if(!rs?.success) {
        const msg = ERROR_CODE_MSG[rs?.message] ?? 'Xóa tệp thất bại!'
        showErrorNotify(msg)
        return false;
      }

      return true;
    }

    getFullUrl(url:string):string {
      if(url.includes('http')) {
        return url;
      }

      const fullUrl = `${import.meta.env.VITE_RESOURCE_URL}${url}`

      return fullUrl; // https://minio.zamiga.vn/cmc-dtqg/public/thutuchanhchinh/BB_CMC_Key_291125.docx
    }

    getFileName(url:string):string {
      const urlArr = url?.split('/')
      return urlArr[urlArr?.length -1]; // BB_CMC_Key_291125.docx
    }

    preview(url: string ) {
      const ext = this.getExtensionFromUrl(url);
      if(!ext) return null;

      if (!url.includes("http")) {
        url = this.getFullUrl(url);
      }

      if(['doc', 'docx', 'xls, xlsx'].includes(ext)) {
        const encodedUrl = encodeURIComponent(url);
        window.open(`https://docs.google.com/gview?url=${encodedUrl}&embedded=true`);
        
        return;
      }

      if (['pdf'].includes(ext)) {
        window.open(`https://docs.google.com/gview?url=${url}`);
        return;
      }
      if (['png', 'jpg', 'jpeg', 'gif', 'webp'].includes(ext)) {
        window.open(url, '_blank'); // Mở trực tiếp
        return;
      }
      const msg:string = 'Tài liệu không hỗ trợ xem trước!'
      showErrorNotify(msg)
    }

    getExtensionFromUrl (url:string) {
      const cleanPath = url.split('?')[0].split('#')[0];
      const lastDot = cleanPath.lastIndexOf('.');
      if (lastDot === -1) return null;

      const ext = cleanPath.slice(lastDot + 1);
      if (!ext || ext.includes('/') || ext.includes('\\')) return null;
      
      return ext.toLowerCase();
    }

    async download(objectName: string, cb?:any): Promise<void> {
      if (!objectName) return;

      let objName = objectName;
      const projectName = import.meta.env.VITE_RESOURCE_PROJECT_URL ?? 'cmc-dtqg';
      if(objName?.includes(projectName)) {
        const objNameArr = objName?.split(`${projectName}/`)
        objName = objNameArr[objNameArr?.length -1]
      }

      const res = await downloadFileBlob({ objectName: objName });

      if (!(res instanceof ArrayBuffer)) {
        console.error("Response is not ArrayBuffer", res);
        return;
      }
      
      const fileName = objectName.split("/").pop() || "download";

      const blob = new Blob([res], {
        type: "application/octet-stream",
      });

      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = fileName;

      document.body.appendChild(link);
      link.click();
      if(typeof cb === 'function') cb();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }

    //  downloadFile công khai 


     async downloadPulic(objectName: string): Promise<void> {
      if (!objectName) return;

      let objName = objectName;
      const projectName = import.meta.env.VITE_RESOURCE_PROJECT_URL ?? 'cmc-dtqg';
      if(objName?.includes(projectName)) {
        const objNameArr = objName?.split(`${projectName}/`)
        objName = objNameArr[objNameArr?.length -1]
      }

      const res = await downloadFilePublic({ objectName: objName });

      if (!(res instanceof ArrayBuffer)) {
        console.error("Response is not ArrayBuffer", res);
        return;
      }
      
      const fileName = objectName.split("/").pop() || "download";

      const blob = new Blob([res], {
        type: "application/octet-stream",
      });

      const url = URL.createObjectURL(blob);
      console.log("URL::", url)
      const link = document.createElement("a");
      link.href = url;
      link.download = fileName;

      document.body.appendChild(link);
      link.click();

      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }
  }
  return new FileManagementService();
}
export default useFileManagementService;
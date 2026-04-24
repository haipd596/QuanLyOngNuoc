import { apiGetFileDinhKemTaskByTaskID, apiGetFileDinhKemTaskByTaskIDSubTask } from '@packages/dvc-service/apiGetFileDinhKemTaskByTaskID';
import { apiGetHoSoByHsId } from '@packages/dvc-service/apiGetHoSoByHsId';
import { apiGetYKienTraoDoiByHsId } from '@packages/dvc-service/apiGetYKienTraoDoiByHsId';
import { getWebAbsoluteUrlPageContext } from '@packages/utils/common';
import { buildUrlDownload } from '@packages/utils/images';
import {
  Flex, Form, Input, Tooltip,
} from 'antd';
import _get from 'lodash/get';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setTrangThaiHoSoId } from '~/redux/slices';
import { TITLE_OPINION } from '../constant';
// import Content from './Content';

const ViewInputBoSungHsViewer: React.FC = () => {
  const [file, setFile] = useState<any>({});
  const [isShow, setIsShow] = useState<any>(false);
  const hiddenWebExtendUrl = getWebAbsoluteUrlPageContext();
  const [isLoading, setIsLoading] = useState(false);
  const [titleRefuse, setTitleRefuse] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAndProcess = async () => {
      try {
        setIsLoading(true);
        const data = await apiGetHoSoByHsId();
        const taskList = JSON.parse(data?.TaskList || '[]');

        const statusId = data?.TrangThaiHoSoIdId;

        if (!statusId !== undefined) {
          dispatch(setTrangThaiHoSoId(statusId));
        }
        if (statusId === 10) {
          setTitleRefuse(statusId);
        }
        const shouldShow = [7, 10, 46].includes(statusId);
        setIsShow(shouldShow);

        let titleOpinion = '';
        if (statusId === 7) titleOpinion = TITLE_OPINION.YEU_CAU_BO_SUNG_HO_SO.trim();
        else if (statusId === 46) titleOpinion = TITLE_OPINION.TAM_HOAN_HO_SO.trim();
        else if (statusId === 10) titleOpinion = TITLE_OPINION.TU_CHOI_TIEP_NHAN.trim();

        let fileData = {
          NoiDung: '',
          Files: [] as { FileAttachmentName: string, FileAttachmentId: string }[],
        };
        const targetPendingIndex = taskList.findIndex((task: any) => task.Status === '0');
        if (targetPendingIndex !== -1) {
          const targetCurrentTask = taskList[targetPendingIndex];

          if (targetCurrentTask?.AssignedTo === 'workflowuser') {
            const prevTask = taskList[targetPendingIndex - 1];
            if (prevTask?.TaskID) {
              const files = await apiGetFileDinhKemTaskByTaskID(prevTask.TaskID);
              fileData = {
                NoiDung: prevTask?.NoiDungXuLy || '',
                Files: (files || []).map((f: any) => ({
                  FileAttachmentName: f?.AttachmentName || '',
                  FileAttachmentId: f?.AttachmentId || '',
                })),
              };
            }
          } else {
            const taskID = targetCurrentTask?.TaskID;
            if (taskID) {
              const files = await apiGetFileDinhKemTaskByTaskIDSubTask(taskID);
              const lastDetail = JSON.parse(files?.[0]?.SubTaskDetails || '[]').slice(-1)[0];
              fileData = {
                NoiDung: _get(lastDetail, 'NoiDungXuLy', ''),
                Files: (_get(lastDetail, 'TaiLieu') || []).map((f: any) => ({
                  FileAttachmentName: f?.AttachmentName || '',
                  FileAttachmentId: f?.AttachmentId || '',
                })),
              };
            }
          }
        }

        if (shouldShow) {
          const extraData = await apiGetYKienTraoDoiByHsId(titleOpinion);
          const extraFile = {
            FileAttachmentName: _get(extraData, 'FileAttachmentName', ''),
            FileAttachmentId: _get(extraData, 'FileAttachmentId', ''),
          };

          if (extraFile.FileAttachmentId) {
            fileData.Files.push(extraFile);
          }

          fileData.NoiDung = _get(extraData, 'NoiDung', fileData.NoiDung);
        }

        setFile(fileData);
      } catch (err) {
        console.error('Lỗi trong fetchAndProcess:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAndProcess();
  }, []);

  if (isLoading) return null;

  return isShow ? (
    <div style={{ marginTop: 16 }}>
      <Form.Item
        label={titleRefuse ? 'Nội dung từ chối' : 'Nội dung yêu cầu'}
        name="NoiDungYeuCau"
        initialValue={file.NoiDung}
      >
        <Input.TextArea disabled defaultValue={file.NoiDung} style={{ display: 'none' }} />
        {file.NoiDung}
      </Form.Item>
      <Flex style={{ marginBottom: 16 }}>
        <label style={{ width: 180 }}>File đính kèm</label>
        <div style={{ flexGrow: 1 }}>
          {file?.Files?.length > 0 && (
          <Flex vertical gap={8}>
            {file.Files.map((f: any, idx: number) => (
              <Flex key={idx} gap={2} wrap>
                <Tooltip title={f.FileAttachmentName}>
                  <div style={{
                    maxWidth: 200, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                  }}
                  >
                    {f.FileAttachmentName}
                  </div>
                </Tooltip>
                <a href={buildUrlDownload({ url: hiddenWebExtendUrl, fileId: f.FileAttachmentId })}>
                  Tải tệp
                </a>
              </Flex>
            ))}
          </Flex>
          )}
        </div>
      </Flex>
    </div>
  ) : null;
};

export default ViewInputBoSungHsViewer;

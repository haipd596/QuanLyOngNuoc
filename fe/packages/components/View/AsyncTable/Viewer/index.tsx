/* eslint-disable no-useless-concat */
/* eslint-disable react/no-danger */
import DigitalPaper from '@packages/components/DigitalPaper';
import ModalDigitalPaper from '@packages/components/DigitalPaper/Viewer/ModalDigitalPaper';
import { useFetchBase } from '@packages/hooks/useFetchBase';
import { randomString } from '@packages/utils/radomString';
import { isDetailsMode } from '@packages/utils/viewMode';
import { Form, message, Table } from 'antd';
import clsx from 'clsx';
import _get from 'lodash/get';
import _isArray from 'lodash/isArray';
import _isEmpty from 'lodash/isEmpty';
import _isString from 'lodash/isString';

import FActionAsyncTable from '@packages/components/CommonTable/FActionAsyncTable';
import FColumnFile from '@packages/components/CommonTable/FColumnFile';
import { PATH_TO_MAIN_GIAY_TOID } from '@packages/components/DigitalPaper/constant';
import Loading from '@packages/components/Loading';
import { QUA_TRINH_XU_LY_KEY, THANH_PHAN_HSQD_KEY } from '@packages/constants/jsonConfig';
import { apiGetListIdsByHsId } from '@packages/dvc-service/apiGetFormDataByHsId';
import { apiGetTenGiayToMoi, apiGetTenNguoiXuLy } from '@packages/dvc-service/apiPostTenGiayToMoi';
import { getBaseDvcApi } from '@packages/dvc-service/getBaseUrl';
import { useFetchBaseLogin } from '@packages/hooks';
import {
  COLUMN_TABLE_ACTION, COLUMN_TABLE_FILE, COLUMN_TABLE_STT, configColumns,
  getFieldsByColumnIndexSpecial,
  isShowFile,
} from '@packages/utils';
import { stringToFunc } from '@packages/utils/common';
import { TableRowSelection } from 'antd/es/table/interface';
import _ from 'lodash';
import {
  useCallback, useEffect, useMemo, useRef, useState,
} from 'react';
import { DEMO_VIEWER } from '~/pages/ViewPage/demo';
import { useAppDispatch, useAppSelector } from '~/redux/hooks';
import {
  selectActiveFields, selectActiveSchema, selectSystemParameter, selectTthc, setSchema,
} from '~/redux/slices';
import FileButtonGroup from '../../FileButtonGroup';
import { uploadToDellEcs } from '../common';
import { TAsyncTableProps } from '../type';
import {
  getIdForSubForm, getIdForSubFormByGiayToIdOnly, OPTION_REQUIRE_FORM, VALUE_REQUIRED_FORM,
} from '../utils';

const AsyncTableViewer = (props: TAsyncTableProps) => {
  const {
    pathToSource,
    columns,
    modeView,
    uploadColumns,
    value,
    onSaveSubForm,
    onChange,
    className,
    fieldName,
    isHiddenAction,
    isShowOrderNumber,
    pageSize,
    isShowCheckbox,
    fieldKey,
    name,
    action,
    transformDataOption,
  } = props;
  const [dataSource, setDataSource] = useState<any[]>([]);
  const [data, setData] = useState<any>([]);
  const [targetIds, setTargetIds] = useState<any[] | undefined>(undefined);
  const [requiredRows, setRequiredRows] = useState<any>({});
  const [isOpen, setIsOpen] = useState(false);
  const [digitalPaperActive, setDigitalPaperActive] = useState({});
  const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([]);
  const [dataFetched, setDataFetched] = useState(false);

  const formRoot = Form.useFormInstance();

  const activeFields = useAppSelector(selectActiveFields);
  const tthc = useAppSelector(selectTthc);
  const [version, setVersion] = useState(0);
  const activeSchema = useAppSelector(selectActiveSchema);
  const systemParameters = useAppSelector(selectSystemParameter);
  const dispatch = useAppDispatch();

  const isFirstRender = useRef(true);

  const requiredFormOptions = useMemo(() => {
    return _.get(activeSchema, 'requiredForm', {});
  }, [activeSchema.requiredForm]);
  const { typeUser } = useFetchBaseLogin();

  const actionRef = useRef(action);

  const onSelectChange = (newSelectedRowKeys: any[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
    onChange(dataSource.map((item: any, index: number) => ({
      ...item,
      isSelected: newSelectedRowKeys.includes(index),
    })));
  };

  const rowSelection: TableRowSelection<any> | undefined = isShowCheckbox ? {
    selectedRowKeys,
    onChange: onSelectChange,
  } : undefined;

  const formDigitalSchema = useMemo(() => {
    if (!isOpen) return DEMO_VIEWER;

    const subForm = _get(digitalPaperActive, 'subForm', DEMO_VIEWER) as any;

    return ({
      ...subForm,
      fields: getFieldsByColumnIndexSpecial(activeFields, subForm?.fieldsInColumnIndex),
    });
  }, [digitalPaperActive, activeFields, isOpen]);

  const initRequireToKhaiDienTu = (_data: any) => {
    const newRequiredForm = _data.reduce((acc: any, cur: any) => {
      if (cur.BatBuoc === 1) {
        const giayToId = _.get(cur, PATH_TO_MAIN_GIAY_TOID, '');
        acc[giayToId] = OPTION_REQUIRE_FORM;
      }
      return acc;
    }, {});
    dispatch(
      setSchema(
        {
          ...activeSchema,
          requiredForm: {
            ...newRequiredForm,
            ...activeSchema.requiredForm || {},
          },
        },
      ),
    );
  };

  const handleSuccess = useCallback((res: any) => {
    // const results = _get(res, pathToSource, []);
    const results = _get(res, 'data.items', []);
    if (!_isArray(results) && !_isString(results)) {
      console.warn('[handleSuccess] Invalid results:', results);
      return; // KHÔNG setData([])
    }

    const funcTransformData = (originalData: any) => {
      if (transformDataOption) {
        try {
          const { func } = stringToFunc(transformDataOption);
          if (func) {
            const _results = func(originalData);
            if (_isArray(_results)) return _results;
            return originalData;
          }
        } catch (error) {
          console.error(error);
          return originalData;
        }
      }
    };

    const updateAll = (arr: any) => {
      setData(arr);
      setDataSource(arr);
      setDataFetched(true);
    };
    // Async table quá trình xử lý
    if (fieldKey === QUA_TRINH_XU_LY_KEY) {
      let taskListData = [];
      if (_isString(results)) {
        try {
          taskListData = JSON.parse(results);
        } catch (error) {
          console.error('Lỗi parse TaskList:', error);
          taskListData = [];
        }
      } else if (_isArray(results)) {
        taskListData = results;
      } else {
        console.error('Dữ liệu results không hợp lệ:', results);
        taskListData = [];
      }

      // Xử lý cứng hai trường hợp đặc biệt và chuẩn bị dữ liệu
      const processedData = taskListData.map((task: any, index: number) => {
        let assignedToDisplay = task.AssignedTo;

        if (task.AssignedTo === 'workflowuser') {
          if (task.TaskName === 'Bổ sung hồ sơ') {
            assignedToDisplay = 'Công dân/tổ chức';
          } else if (task.TaskName === 'Tiếp nhận hồ sơ bổ sung') {
            assignedToDisplay = 'Chuyên viên một cửa';
          }
        }

        return {
          key: randomString(5),
          rowKey: index,
          isSelected: false,
          TaskName: task.TaskName || '',
          NoiDungXuLy: task.NoiDungXuLy || '',
          NgayKetThuc: task.NgayKetThuc || '',
          AssignedTo: assignedToDisplay, // Giá trị hiển thị
          originalAssignedTo: task.AssignedTo, // Lưu giá trị gốc để gọi API
          Status: task.Status || '',
          TaskID: task.TaskID || '',
          NgayBatDau: task.NgayBatDau || '',
          SoNgayXuLy: task.SoNgayXuLy || 0,
          HienThi: task.HienThi || false,
        };
      });

      // filter
      const assignedToList: string[] = Array.from(
        new Set(
          processedData
            .filter((task: any) => task.originalAssignedTo !== 'workflowuser')
            .map((task: any) => task.originalAssignedTo),
        ),
      );

      if (assignedToList.length > 0) {
        apiGetTenNguoiXuLy(assignedToList)
          .then((response) => {
            const nameMap = new Map(
              response?.Data?.map((item: any) => [item.Ma, item.Ten]) || [],
            );

            const updatedData = processedData.map((task: any) => {
              if (task.originalAssignedTo !== 'workflowuser') {
                const userName = nameMap.get(task.originalAssignedTo) || task.AssignedTo;

                return { ...task, AssignedTo: userName };
              }
              return task;
            });

            updateAll(updatedData);
          })
          .catch((error) => {
            console.error('Lỗi khi gọi apiGetTenNguoiXuLy:', error);
            updateAll(processedData);
          });
      } else {
        updateAll(processedData);
      }
      return;
    }

    if (_isString(results)) {
      const _data = funcTransformData(JSON.parse(results));
      initRequireToKhaiDienTu(_data);
      setData(_data);
      setDataFetched(true);
      return;
    }

    if (_isArray(results)) {
      const _data = funcTransformData(results);
      initRequireToKhaiDienTu(_data);
      setData(_data);
      setDataFetched(true);
    }
  }, [pathToSource]);

  const actionGetGiayTo = () => {
    const params = new URL(window.location.href).searchParams;
    const tthcId = params.get('tthcId') || tthc.ThuTucHanhChinhId?.Id;

    if (name === 'ThanhPhanHoSoQD' || fieldKey === THANH_PHAN_HSQD_KEY) {
      const baseUrl = getBaseDvcApi();
      if (tthcId) {
        return `${baseUrl}/api/v1/common/query?title=dm_ThuTuc2GiayTo&top=10&filter="ThuTucId=${tthcId}"&foreignKey=GiayToId&primaryKey=Id&tableName=dm_GiayTo`;
      }
    }

    if (name === 'QuaTrinhXuLy' || fieldKey === QUA_TRINH_XU_LY_KEY) {
      const baseUrl = getBaseDvcApi();
      const params = new URL(window.location.href).searchParams;
      const hsid = params.get('hsid');

      if (hsid) {
        return `${baseUrl}/_api/web/lists/getbytitle('mc_HoSo')/items?$select=Id,TaskList&$filter=ID eq ${hsid}`;
      }
    }

    if(actionRef.current?.includes("ThuTucId=1")) {
      if(tthcId) {
        actionRef.current.replace("1", tthcId)
      }
    }
    return actionRef.current;
  };

  const { fetchBase, isLoading } = useFetchBase({
    ...props,
    action: actionGetGiayTo(),
    onSuccess: handleSuccess,
  });

  const handleUploadFile = (file: any, index: number) => {
    setDataSource((prev) => {
      const clonedDataSource = [...prev] as any;
      clonedDataSource[index] = {
        ...clonedDataSource[index],
        file,
      };
      onChange(clonedDataSource);
      // --- CẬP NHẬT WINDOW.SIGNFILES TOÀN CỤC ---
      const globalAny = window as any;
        if (!globalAny.signFiles) {
          globalAny.signFiles = [];
        }

        const entry = {
          index,
          file,
        };

        // Nếu đã tồn tại index này thì cập nhật, ngược lại push mới
        const existingIndex = globalAny.signFiles.findIndex((it: any) => it.index === index);
        if (existingIndex >= 0) {
          globalAny.signFiles[existingIndex] = entry;
        } else {
          globalAny.signFiles.push(entry);
        }

      console.log('📂 [Upload] Updated signFiles:', globalAny.signFiles);
      return clonedDataSource;
    });
  };

  const handleRemove = (fileId: string, index: any) => {
    setDataSource((prev) => {
      const clonedDataSource = [...prev] as any;
      if (clonedDataSource[index].isSubForm) {
        clonedDataSource[index].file.fileNodeObject = clonedDataSource[index].file
          .fileNodeObject.filter(({ NodeId }: any) => NodeId !== fileId);
        clonedDataSource[index].file.formData = null;
        clonedDataSource[index].file.originalData = null;
      } else {
        clonedDataSource[index].file = clonedDataSource[index]
          .file.filter(({ NodeId }: any) => NodeId !== fileId);
      }
      onChange(clonedDataSource);
      return clonedDataSource;
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      if (
        _isEmpty(data)
        // || _isEmpty(targetIds)
      ) return;
      if (!dataFetched) return;
      if (typeof targetIds === 'undefined') return;
      const _dataSource: any = [];
      const subForm = _get(props, 'subForm', {}) as any;

      const sortedData = data
        .toSorted((cur: any, next: any) => cur.ThuTuHienThi - next.ThuTuHienThi);

      const countNumberOfSubForm = sortedData.reduce((acc: number, cur: any) => {
        if (cur.BatBuoc === 1) acc += 1;
        return acc;
      }, 0);
      console.log("countNumberOfSubForm::", countNumberOfSubForm)
      const listIdsTenGiayToEmpty = sortedData
        .filter((objs: any) => {
          return objs.GiayToId?.Ten_Lookup === '0' || objs.GiayToId?.Ten_Lookup === null;
        })
        .map((objs: any) => objs.GiayToId.Id);
      console.log("listIdsTenGiayToEmpty::", listIdsTenGiayToEmpty)
      const tenMoiMap = new Map<number, string>();
      if (listIdsTenGiayToEmpty.length > 0) {
        try {
          const result = await apiGetTenGiayToMoi(listIdsTenGiayToEmpty);
          result?.Data?.forEach((item: any) => {
            if (item?.TenMoi) tenMoiMap.set(item.ID, item.TenMoi);
          });
        } catch (error) {
          console.error('Lỗi gọi apiPostTenGiayToMoi:', error);
        }
      }

      sortedData.forEach((item: any) => {
        if (item.GiayToId?.Ten_Lookup === '0' || item.GiayToId?.Ten_Lookup === null) {
          const targetId = item.GiayToId?.Id;
          const tenMoi = tenMoiMap.get(targetId);
          if (tenMoi) {
            item.GiayToId.Ten_Lookup = tenMoi;
          }
        }
      });
      console.log("sortedData::", sortedData)
      sortedData.forEach((item: any, index: any) => {
        let singleRow: any = {};
        columns.forEach(({ pathToColumnData, serverPayloadKey }) => {
          console.log("pathToColumnData::", pathToColumnData, serverPayloadKey, item)

          if (pathToColumnData === 'GiayToId.Ten') {
            pathToColumnData = 'GiayToId.Ten_Lookup';
          }
          if (pathToColumnData === 'name') {
            pathToColumnData = 'dm_GiayTo.Ten';
          }
          singleRow[serverPayloadKey] = _get(item, pathToColumnData, '');
          singleRow.key = randomString(5);
          singleRow.isSubForm = item.BatBuoc === 1;

          let _subForm = null;
          if (singleRow.isSubForm) {
            if (
              countNumberOfSubForm === 1
              && _isEmpty(subForm[getIdForSubForm(item)])
            ) {
              const _all = Object.values(subForm) || [];
              _subForm = _get(_all, _all.length - 1, {});
            } else {
              _subForm = subForm[getIdForSubForm(item)]
                || subForm[getIdForSubFormByGiayToIdOnly(item)];
            }
          }

          setRequiredRows((prev: any) => ({
            ...prev,
            [getIdForSubForm(item)]: item.BatBuoc === 1,
          }));

          singleRow.subForm = singleRow.isSubForm
            ? _subForm || DEMO_VIEWER
            : undefined;

          const matchedApiItem = targetIds && targetIds?.find(
            (apiItem: any) => apiItem.Ten === _get(item, 'dm_GiayTo.Ten', ''),
          );

          if (!matchedApiItem) {
            console.warn('Không tìm thấy matchedApiItem cho:', {
              tenLookup: _get(item, 'dm_GiayTo.Ten', ''),
              targetIds,
            });
          }

          singleRow.idGiayToDinhKem = matchedApiItem?.ID || '';

          singleRow = {
            ...item,
            ...singleRow,
            rowKey: index,
            isSelected: false,
          };
        });

        if (!_isEmpty(value)) {
          singleRow = {
            ..._get(value, `${index}.${getIdForSubFormByGiayToIdOnly(item)}`, {}),
            ..._get(value, `${index}.${getIdForSubForm(item)}`, {}),
            ...value[index],
            ...singleRow,
          };
        }

        _dataSource.push({
          ...item,
          ...singleRow,
        });
      });

      setDataSource(_dataSource);

      if (isFirstRender.current) {
        onChange?.(_dataSource);
        isFirstRender.current = false;
      }
    };

    fetchData();
  }, [data, targetIds, columns, value, version, dataFetched]);

  const columnRender: any = useMemo(() => {
    let initColumns = configColumns(fieldName, columns, [], isShowOrderNumber);

    const getRequired = (giayToId: any) => {
      const currentRequiredConfig = requiredFormOptions[giayToId];

      if (currentRequiredConfig) {
        if (typeUser.isPerson) {
          return _.find(currentRequiredConfig, { value: VALUE_REQUIRED_FORM.PERSONAL })?.checked;
        }

        if (typeUser.isOrganization) {
          return _.find(
            currentRequiredConfig,
            { value: VALUE_REQUIRED_FORM.ORGANIZATION },
          )?.checked;
        }
      }

      return false;
    };

    initColumns = (
      columns
        .map(({
          serverPayloadKey, transformDataColumn, ...rest
        }) => ({
          ...rest,
          dataIndex: serverPayloadKey,
          key: serverPayloadKey,
          ellipsis: true,
          render: (_value: any, _record: any, index: any) => {
            if (transformDataColumn) {
              const stringFunc = _get(transformDataColumn, 'props.defaultValue', '');
              try {
                const { func } = stringToFunc(stringFunc);
                if (func) {
                  const result = func(_value, _record, index);
                  if (result !== null) {
                    return (
                      <div dangerouslySetInnerHTML={{ __html: result }} />
                    );
                  }
                }
              } catch (error) {
                console.error('transformDataColumn error', serverPayloadKey, error);
              }
            }
            return (
              // requiredRows[getIdForSubForm(_record)]
              getRequired(_get(_record, PATH_TO_MAIN_GIAY_TOID))
                ? (
                  <>
                    <sup style={{ color: 'red' }}>* </sup>
                    {' '}
                    {_value}
                  </>
                )
                : _value
            );
          },
        }))
    );

    if (isShowOrderNumber) initColumns = COLUMN_TABLE_STT.concat(initColumns);

    if (isShowFile(uploadColumns)) {
      initColumns.push({
        ...COLUMN_TABLE_FILE,
        render: (_value: any, _record: any, _index: any) => (
          <FColumnFile
            modeView={modeView}
            fieldName={fieldName}
            record={_record}
            index={_index}
            onDeleteFile={(fileId, index) => handleRemove(fileId, index)}
          />
        ),
      });
    }

    if (!isHiddenAction) {
      initColumns = initColumns.concat({
        ...COLUMN_TABLE_ACTION,
        render: (_value: any, _record: any, index: any) => {
          console.log("RECORD::", _record)
          if (isDetailsMode(modeView)) {
            return (
              <FActionAsyncTable
                record={_record}
                onClick={() => {
                  setIsOpen((prev) => !prev);
                  setDigitalPaperActive(_record);
                }}
              />
            );
          }

          return (
            _record.isSubForm ? (
              <DigitalPaper
                modeView={modeView}
                subForm={_record.subForm}
                onSave={(_newSubForm: any) => {
                  onSaveSubForm(_newSubForm, getIdForSubForm(_record));
                  setVersion((prev) => {
                    prev += 1;
                    return prev;
                  });
                }}
                onSubmit={(_values: any) => {
                  handleUploadFile(_values, index);
                }}
                requiredForm={activeSchema.requiredForm}
                existedFiles={
                  dataSource.filter(({ isSubForm }) => !isSubForm).map((item: any) => {
                    if (_isEmpty(item.file)) {
                      return {
                        ...item,
                        file: [{
                          NodeId: '',
                          FileName: '',
                          FileSizeInBytes: 0,
                          PhysicalName: '',
                          Extension: '',
                        }],
                      };
                    }
                    return item;
                  })
                }
                ThuTuc2GiayToId={
                  (dataSource as any[]).find((
                    { isSubForm, Id },
                  ) => isSubForm && Id === _record.Id)?.Id
                }
                value={_record}
                urlDownload={_get(_record, 'dm_GiayTo.UrlTaiMau', '')}
                allSubForm={_get(props, 'subForm', {})}
                indexFile={index}
                targetFieldKey={name}
              />
            ) : (
              <div>
                <FileButtonGroup
                  value={_get(_record, 'file', [])}
                  uploadColumns={uploadColumns}
                  onChange={(_values) => handleUploadFile(_values, index)}
                  required={_get(_record, 'BatBuoc', undefined)}
                  key={_get(_record, 'file', []).length}
                  indexEachLine={index}
                  targetFieldKey={name}
                />
              </div>
            )
          );
        },
      });
    }

    return initColumns;
  }, [columns, handleUploadFile, requiredRows, isShowOrderNumber, isHiddenAction, typeUser]);

  useEffect(() => {
    const params = new URL(window.location.href).searchParams;
    const hsid = params.get('hsid');
    const tthcId = params.get('tthcId') || tthc.ThuTucHanhChinhId?.Id;
    if (hsid && tthcId) {
      apiGetListIdsByHsId()
        .then((response) => {
          setTargetIds(response);
        })
        .catch((err) => {
          console.error('ERROR] getListIdsByHsId in effect:', err);
          setTargetIds([]);
        });
    } else {
      setTargetIds([]);
    }
  }, []);

  useEffect(() => {
    fetchBase();
  }, [fetchBase, actionRef.current]);


  // Logic xử lý riêng cho kí số usb token
  useEffect(() => {
    const globalAny = window as any;

    // Khởi tạo map callback nếu chưa có
    if (!globalAny._callbackSignUsbTokenMap) {
      globalAny._callbackSignUsbTokenMap = {};
    }

    // Định nghĩa hàm callback toàn cục duy nhất
    globalAny.callbackSignUsbToken = async (signedFile: any, signedIndex: number, targetFieldKey: string) => {
      try {
      if(targetFieldKey !== name) { // name = 'ThanhPhanHoSoQD'
        console.info(`[callbackSignUsbToken] AsyncTable Bỏ qua file ký vì targetFieldKey không khớp: ${targetFieldKey} !== ${name}`);
        return;
      }

      const metadata = await uploadToDellEcs(signedFile, systemParameters);

      setDataSource((prev: any[]) => {
        const newData = [...prev];
        if (newData[signedIndex]) {
          const currentRow = newData[signedIndex];
          if (currentRow.BatBuoc === 1) {
            // Trường hợp BatBuoc = 1 → Giữ nguyên cấu trúc gốc, chỉ thay phần fileNodeObject
            const oldFile = currentRow.file || {};
            newData[signedIndex].file = {
              ...oldFile,
              fileNodeObject: [metadata],
            };
          } else {
            // Trường hợp BatBuoc = 0 → vẫn là dạng mảng đơn giản như cũ
            newData[signedIndex].file = [metadata];
          }
        }
        formRoot.setFieldValue(name, newData)
        return newData;
      });

      message.success(`${metadata.FileName} đã được cập nhật sau khi ký!`);
      } catch (error: any) {
        console.error('Upload file ký thất bại:', error);
        message.error('Upload file ký thất bại!');
      }
    };

    // Cleanup khi component bị unmount
    return () => {
      // Xóa hàm callback toàn cục
      delete globalAny.callbackSignUsbToken;
      // Xóa luôn map nếu bạn không cần giữ dữ liệu sau khi unmount
      delete globalAny._callbackSignUsbTokenMap;
    };
  }, [setDataSource, name]);

  return (
    <Loading isLoading={isLoading}>
      <Table
        {...props}
        dataSource={dataSource}
        columns={columnRender}
        pagination={!_isEmpty(_get(props, 'subForm', undefined)) ? false : {
          pageSize,
        }}
        locale={{ emptyText: 'Chưa có dữ liệu!' }}
        className={clsx(className, 'digital-paper')}
        bordered
        rowSelection={rowSelection}
        rowKey={(record) => record.rowKey}
      />
      {isOpen && (
        <ModalDigitalPaper
          modeView={modeView}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          subForm={formDigitalSchema}
          value={digitalPaperActive}
        />
      )}
    </Loading>
  );
};

export default AsyncTableViewer;

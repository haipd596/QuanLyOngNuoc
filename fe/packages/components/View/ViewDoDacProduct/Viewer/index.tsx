import { DeleteOutlined } from '@ant-design/icons';
import BaseIconFontAwesome from '@packages/components/BaseIconFontAwesome';
import Loading from '@packages/components/Loading';
import { apiGetBanDoTuLieu } from '@packages/dvc-service/apGetBanDoTuLieu';
import { isDetailsMode } from '@packages/utils/viewMode';
import {
  Button,
  Col, Flex, Form, message, Modal, Row, Select,
  Spin,
  Table,
  Tooltip,
} from 'antd';
import { LabeledValue } from 'antd/es/select';
import _ from 'lodash';
import {
  useCallback, useEffect, useRef, useState,
} from 'react';
import EditableCell from '../../ViewFieldTableSingle/components/Viewer/EditableCell';
import EditableRow from '../../ViewFieldTableSingle/components/Viewer/EditableRow';

import DynamicMeasurementData from '../DynamicMeasurementData';
import './styles.scss';

type TOption = LabeledValue;

const ViewDoDacProductViewer: React.FC<any> = ({
  columns: columnsConfig,
  documentType: documentTypeConfig,
  documentDetail: documentDetailConfig,
  value = [],
  onChange,
  modeView,
  isDataDynamic,
  relationshipKey,
}) => {
  const [documentTypeOption, setDocumentTypeOption] = useState<TOption[]>([]);
  const [documentDetailOptions, setDocumentDetailOptions] = useState<TOption[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingSearch, setIsLoadingSearch] = useState(false);
  const [dataSource, setDataSource] = useState(value);
  const [documentDetail, setDocumentDetail] = useState<any>();
  const [documentType, setDocumentType] = useState<any>();
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<any>(null);

  const mapFunc = useCallback(({ Ten, MaBanDo, ...item }: any) => ({
    label: Ten,
    value: MaBanDo,
    ...item,
  }), []);

  useEffect(() => {
    (async () => {
      const res = await apiGetBanDoTuLieu('PhanLoai eq 0 or PhanLoai eq 1');

      const parent = res.filter(({ PhanLoai }: any) => PhanLoai === 0);

      setDocumentTypeOption(parent.map((item: any) => ({
        ...mapFunc(item),
        options: _.filter(res, ({ MaBanDoCha }) => item.MaBanDo === MaBanDoCha).map(mapFunc),
      })));
    })();

    return () => {
      if (_.isFunction(ref.current)) {
        window.removeEventListener('message', ref.current);
      }
    };
  }, []);

  const handleChangeType = async (...args: any) => {
    const [_value, option] = args;
    setIsLoading(true);

    const res = await apiGetBanDoTuLieu(`PhanLoai eq 2 and MaBanDoCha eq '${_value}'`);

    setDocumentDetailOptions(res.map(mapFunc));
    setIsLoading(false);
    setDocumentDetail(undefined);
    setDocumentType(option);
  };

  const bulkAdd = (dataTable: any, res: any) => {
    const data: any = [];

    for (let i = 0; i < dataTable.length; i += 1) {
      const { ID, MaBanDo } = dataTable[i];

      const banDoCha = _.find(res, { MaBanDo: ID });
      const banDoCon = _.find(res, { MaBanDo });

      if (banDoCha && banDoCon) {
        banDoCha.label = banDoCha.Ten;
        banDoCha.value = ID;
        banDoCon.label = banDoCon.Ten;
        banDoCon.value = banDoCon.MaBanDo;
        data.push([banDoCon, banDoCha]);
      } else {
        message.warning(`Đối tượng ${ID} - ${MaBanDo} không có trong CSDL`);
      }
    }

    setDataSource((prev: any) => {
      const _data = prev.concat(
        data.map(([_documentType, _documentDetail]: any) => ({
          key: _documentDetail.value,
          documentType: _documentType.label,
          MaSP: _documentDetail.label,
          GiaVector: `${_documentType.Gia.toLocaleString('en-US')} VNĐ`,
        })),
      );
      onChange(_data);

      return _data;
    });

    setIsLoadingSearch(false);
    setIsOpen(false);
  };

  const handleAdd = () => {
    if (documentDetail) {
      setDataSource((prev: any) => {
        const isDuplicateItems = prev.some(
          (existing: any) => existing.Id === documentDetail.Id,
        );

        if (isDuplicateItems) {
          message.error('Tư liệu đã tồn tại');
          return prev;
        }

        const _data = prev.concat(
          {
            key: documentDetail.value,
            documentType: documentType.label,
            MaSP: documentDetail.label,
            GiaVector: `${documentDetail?.Gia?.toLocaleString('en-US')} VNĐ`,
          },
        );
        onChange(_data);

        return _data;
      });
    }
  };

  const handleSearch = () => {
    if (_.isFunction(ref.current)) {
      window.removeEventListener('message', ref.current);
    }

    setIsOpen(true);

    ref.current = (event: any) => {
      const dataTable = event.data || event.message;
      const filterQuery = _.flatten(_.map(dataTable, ({
        MaBanDo,
        ID,
      }) => {
        return `MaBanDo eq '${ID}' or MaBanDo eq '${MaBanDo}'`;
      }))
        .map((base, index, currentArray) => {
          if (index === currentArray.length - 1) return base;

          return `${base} or`;
        })
        .join(' ');

      apiGetBanDoTuLieu(filterQuery)
        .then((res) => {
          bulkAdd(dataTable, res);
        })
        .catch(() => {
          message.error('Đã có lỗi xảy ra');
        })
        .finally(() => {
          setIsLoadingSearch(false);
        });
    };

    window.addEventListener('message', ref.current);
  };

  const handleSaveDataField = useCallback((rowData: any) => {
    const { key } = rowData;
    setDataSource((prevDataSource: any) => {
      const newData = [...prevDataSource];
      const index = newData.findIndex(({ key: _itemKey }) => _itemKey === key);
      if (index > -1) {
        newData[index] = { ...newData[index], ...rowData };
      }
      onChange?.(newData);
      return newData;
    });
  }, [onChange]);

  const handleDelete = (index: number) => {
    const newData = dataSource.filter((_value: any, _index: number) => index !== _index);
    onChange(newData);
    setDataSource(newData);
  };

  const editableColumns = columnsConfig.map((col: any) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: any) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        // handleSave,
        handleSaveDataField,
      }),
    };
  });

  const sttColumns = [
    {
      title: 'STT',
      key: 'stt',
      render: (_value: any, _record: any, index: number) => index + 1,
    },
  ];

  const actionColumns = [
    {
      title: 'Thao tác',
      key: 'action',
      render: (_value: any, _record: any, index: number) => (
        <Flex justify="center">
          <Button type="primary" icon={<DeleteOutlined />} onClick={() => handleDelete(index)} />
        </Flex>
      ),
    },
  ];

  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };

  return (
    <div>
      {!isDataDynamic
        ? (
          <Row gutter={8} ref={ref}>
            {!isDetailsMode(modeView) && (
              <>
                <Col sm={24} md={24} lg={24} xl={12} xxl={12}>
                  <Form.Item
                    {...documentTypeConfig}
                    name={undefined}
                  >
                    <Select
                      options={documentTypeOption}
                      placeholder={documentTypeConfig.placeholder}
                      onChange={handleChangeType}
                      value={documentType?.value}
                    />
                  </Form.Item>
                </Col>
                <Col sm={24} md={24} lg={24} xl={12} xxl={12}>
                  <Flex gap={2}>
                    <Form.Item
                      {...documentDetailConfig}
                      style={{ flexGrow: 1 }}
                      name={undefined}
                    >
                      <Select
                        options={documentDetailOptions}
                        suffixIcon={isLoading && <Spin />}
                        placeholder={documentDetailConfig.placeholder}
                        onChange={(_value, options) => setDocumentDetail(options)}
                        value={documentDetail}
                        showSearch
                      />
                    </Form.Item>
                    <Button type="primary" onClick={handleAdd}>Thêm</Button>
                    <Tooltip title="Nhập dữ liệu từ bản đồ">
                      <Button
                        type="link"
                        onClick={handleSearch}
                        icon={(
                          <BaseIconFontAwesome
                            className="fa-solid fa-earth-asia"
                            color="#87b4d4"
                            fontSize={18}
                          />
                        )}
                      />
                    </Tooltip>
                  </Flex>
                </Col>
                <Modal
                  open={isOpen}
                  closable
                  width="60%"
                  height={800}
                  onCancel={() => setIsOpen(false)}
                  className="modal-view-do-dac"
                  styles={{
                    body: {
                      height: 500,
                    },
                  }}
                  footer={null}
                  
                >
                  <Loading isLoading={isLoadingSearch}>
                    <iframe id="iframe-id" title="tesst" src="https://192.168.0.41/" width="100%" height="100%" />
                  </Loading>
                </Modal>
              </>
            )}
            <Col style={{ width: '100%' }}>
              <Table
                columns={sttColumns.concat(editableColumns).concat(actionColumns as any)}
                dataSource={dataSource}
                pagination={false}
                bordered
                rowClassName={() => 'editable-row'}
                components={components}
              />
            </Col>
          </Row>
        )
        : <DynamicMeasurementData modeView={modeView} onChange={onChange} relationshipKey={relationshipKey} />}
    </div>
  );
};

export default ViewDoDacProductViewer;

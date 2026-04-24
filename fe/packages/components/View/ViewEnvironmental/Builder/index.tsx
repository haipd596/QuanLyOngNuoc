import { apiGetDanhSachPhamViChungNhan } from '@packages/dvc-service';
import {
  Checkbox, Col, Form, Row,
  Spin,
} from 'antd';
import { AnyObject } from 'antd/es/_util/type';
import _ from 'lodash';
import _isArray from 'lodash/isArray';
import _isEmpty from 'lodash/isEmpty';
import _isPlainObject from 'lodash/isPlainObject';
import _uniq from 'lodash/uniq';
import React, { useEffect, useState } from 'react';
import { transformToTreeData } from '..';
import '../styles.scss';
import InputOtherEnv from '../Viewer/InputOtherEnv';

const BuilderEnvironmental:React.FC<any> = (props) => {
  const { onChange, value, showOtherInput } = props;
  const [treeData, setTreeData] = useState<AnyObject[]>([]);
  const [valueForm, setValueForm] = useState<AnyObject>(value);
  const [treeGroupKey, setTreeGroupKey] = useState<string[]>([]);
  const [loading, setIsLoading] = useState<boolean>(false);
  const [others, setOthers] = useState<any>({});

  const handleSelected = (val: string) => {
    if (!treeGroupKey.includes(val)) {
      setTreeGroupKey((prev) => [...prev, val]);
    } else {
      setTreeGroupKey((prev) => prev.filter((_val) => _val !== val));
    }
  };

  useEffect(() => {
    setIsLoading(true);
    apiGetDanhSachPhamViChungNhan()
      .then((response) => {
        if (_isArray(response)) {
          const treesData = transformToTreeData(response, valueForm, showOtherInput);

          if (!_isEmpty(valueForm)) {
            setTreeGroupKey(Object.keys(valueForm));
          }
          setTreeData(treesData);
          setIsLoading(false);
        }
      }).catch((error) => {
        setIsLoading(false);
        console.error('apiGetDanhSachPhamViChungNhan: ', error);
      });
  }, [showOtherInput]);

  useEffect(() => {
    const treeObj: AnyObject = {};
    if (_isPlainObject(valueForm)) {
      Object.entries(valueForm).forEach(([key, val]) => {
        if (val) treeObj[key] = val;
      });
    }

    // eslint-disable-next-line array-callback-return
    treeData.map(({ key, isShow, children }) => {
      if (isShow && treeGroupKey.includes(key)) {
        treeObj[key] = [children[0].key];
      }
    });

    if (onChange) onChange(treeObj);
  }, [treeGroupKey, valueForm, treeData]);

  return (
    <div className="wrapper-environmental">
      <Spin spinning={loading}>
        <Form
          labelCol={{ span: 24 }}
          onValuesChange={(_val: any, values: any) => {
            setValueForm(
              Object.keys(values).reduce((acc, cur) => {
                const item = treeData.find((i) => i.key === cur);
                if (others[cur] && item?.showOtherInput) {
                  acc[cur] = _uniq(values[cur].concat(others[cur]));
                } else {
                  acc[cur] = values[cur];
                }

                return acc;
              }, values),
            );
          }}
          initialValues={valueForm}
          disabled
        >
          {treeData.map((item) => {
            return !item.isShow ? (
              <Form.Item
                name={item.key}
                rules={[{
                  required: item.children.length > 0,
                  message: `(Bạn hãy chọn phạm vi, thành phần môi trường ${item.name} đề nghị chứng nhận)`,
                }]}
                label={(
                  <Checkbox
                    value={item.key}
                    defaultChecked={!_isEmpty(valueForm?.[item.key])}
                    onChange={(e) => handleSelected(e.target.value)}
                    className="sub-title"
                  >
                    {item.title}
                  </Checkbox>
                )}
              >
                {treeGroupKey.includes(item.key) && (
                <Checkbox.Group>
                  <Row className="items-collapse" gutter={[0, 5]}>
                    {_.sortBy(item.children, 'ThuTuHienThi').map((child: any, index: number) => (
                      <Col span={24} key={index}>
                        {index === item.children.length - 1 ? (
                          item.showOtherInput ? (
                            // Trường hợp có InputOtherEnv
                            <InputOtherEnv
                              value={child.key}
                              onChange={(inputValue: any) => {
                                setValueForm((prev) => {
                                  const filterd = (prev?.[item.key] || []).filter((_item: any) => {
                                    return (
                                      JSON.parse(_item).PhamViId !== inputValue.PhamViId
                                    );
                                  });

                                  if (!inputValue.PhamViTenKhac) {
                                    setOthers((_prev: any) => {
                                      if (_prev[item.key]) {
                                        delete _prev[item.key];
                                      }
                                      return { ..._prev };
                                    });

                                    return {
                                      ...prev,
                                      [item.key]: filterd,
                                    };
                                  }

                                  setOthers((_prev: any) => ({
                                    ..._prev,
                                    [item.key]: JSON.stringify(inputValue),
                                  }));

                                  return {
                                    ...prev,
                                    [item.key]: [
                                      ...filterd,
                                      JSON.stringify(inputValue),
                                    ],
                                  };
                                });
                              }}
                            />
                          ) : null // Không render checkbox "Khác" nữa
                        ) : (
                          // Render các checkbox bình thường
                          <Checkbox value={child.key}>{` - ${child.title}`}</Checkbox>
                        )}

                      </Col>
                    ))}
                  </Row>
                </Checkbox.Group>
                )}
              </Form.Item>
            ) : (
              <Form.Item
                name={item.key}
                label={(
                  <Checkbox
                    value={item.key}
                    defaultChecked={!_isEmpty(valueForm?.[item.key])}
                    onChange={(e) => handleSelected(e.target.value)}
                    className="sub-title"
                  >
                    {item.title}
                  </Checkbox>
                )}
              />
            );
          })}
        </Form>
      </Spin>
    </div>
  );
};

export default BuilderEnvironmental;

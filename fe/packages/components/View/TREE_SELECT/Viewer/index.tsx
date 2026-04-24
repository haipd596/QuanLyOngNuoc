import { DIVIDER_HIDDEN } from "@packages/constants/commons";
import { apiGetDanhMucLoaiDongVat } from "@packages/dvc-service/apiGetDanhMucLoaiDongVat";
import { Form, Input, Spin, TreeSelect } from "antd";
import useFormInstance from "antd/es/form/hooks/useFormInstance";
import _get from 'lodash/get';
import React, { useEffect, useState } from "react";
import { RawItem, TreeNode } from "../common";

function buildTree(
  data: RawItem[],
  parentId: number | null = null,
): TreeNode[] {
  return data
    .filter((item) => item.ChaIdId === parentId)
    .map((item) => {
      const children = buildTree(data, item.Id);
      const hasChildren = children.length > 0;

      return {
        key: item.Id,
        value: item.Id,
        selectable: children.length === 0,
        rawData: item,
        title: !hasChildren
          ? `${item.Ten}, Tên khoa học: ${item.TenKhoaHoc}, Loại ưu tiên bảo vệ: ${item.LoaiUuTienBaoVe}, Loại quý hiếm nguy cấp: ${item.LoaiQuyHiemNguyCap}`
          : `${item.Ten}`,
        ...(hasChildren ? { children } : {}),
      };
    });
}
export interface ViewTreeSelectProps {
  serverPayloadKey: string;
  labelForTreeSelect: string;
  allowClear: boolean;
  treeDefaultExpandAll: boolean;
  isRequired: boolean;
  placeholder: string;
}

const TreeSelectCategoryViewer: React.FC<ViewTreeSelectProps> = ({
  serverPayloadKey,
  labelForTreeSelect,
  allowClear,
  treeDefaultExpandAll,
  isRequired,
  placeholder
}) => {
  const [treeData, setTreeData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState<any>();
  const form = useFormInstance();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await apiGetDanhMucLoaiDongVat();
        setTreeData(buildTree(res.value));
      } catch (err) {
        console.error("Lỗi:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
  // set default null nếu chưa có giá trị
  const currentValue = form.getFieldValue(serverPayloadKey);
  if (!currentValue) {
    form.setFieldsValue({
      [`${serverPayloadKey}`]: null,
      [`${serverPayloadKey}${DIVIDER_HIDDEN}`]: JSON.stringify({
        Ten: '', 
        TenKhoaHoc: '', 
        LoaiUuTienBaoVe: '', 
        LoaiQuyHiemNguyCap: '',
        value: null,
      }),
    });
  }
}, [form, serverPayloadKey]);
  
  const findNodeById = (nodes: any[], id: string): any | null => {
    for (const node of nodes) {
      if (node.key === id) return node;
      if (node.children) {
        const found = findNodeById(node.children, id);
        if (found) return found;
      }
    }
    return null;
  };

  const handleOnChange = (newValue: any) => { 
    const valueTransform = findNodeById(treeData, newValue);

    if (!valueTransform) {
      form.setFieldsValue({
        [`${serverPayloadKey}`]: undefined,
        [`${serverPayloadKey}${DIVIDER_HIDDEN}`]: JSON.stringify({
          Ten:'', 
          TenKhoaHoc: '', 
          LoaiUuTienBaoVe: '', 
          LoaiQuyHiemNguyCap: '',
          value: newValue,
      }),
      });
      setValue(undefined);
      return;
    }

    form.setFieldsValue({
      [`${serverPayloadKey}`]: newValue,
      [`${serverPayloadKey}${DIVIDER_HIDDEN}`]: JSON.stringify({
        Ten: valueTransform.rawData.Ten ?? '', 
        TenKhoaHoc: valueTransform.rawData.TenKhoaHoc ?? '', 
        LoaiUuTienBaoVe: valueTransform.rawData.LoaiUuTienBaoVe ?? '', 
        LoaiQuyHiemNguyCap: valueTransform.rawData.LoaiQuyHiemNguyCap ?? '',
        value: newValue,
      }),
      [`${serverPayloadKey}_Ten`]: valueTransform.rawData.Ten ?? '',
      [`${serverPayloadKey}_TenKhoaHoc`]: valueTransform.rawData.TenKhoaHoc ?? '',
      [`${serverPayloadKey}_LoaiUuTienBaoVe`]: valueTransform.rawData.LoaiUuTienBaoVe ?? '',
      [`${serverPayloadKey}_LoaiQuyHiemNguyCap`]: valueTransform.rawData.LoaiQuyHiemNguyCap ?? ''
    });

    setValue(newValue);
};

  return (
    <Spin spinning={loading}>
      <Form.Item 
        name={serverPayloadKey} 
        label={labelForTreeSelect}
        rules={[{
          required: isRequired,
          message: `Vui lòng chọn ${labelForTreeSelect}`,
        }]}
      >
        <TreeSelect
          style={{ width: "100%" }}
          value={value}
          treeData={treeData}
          placeholder={placeholder}
          onChange={handleOnChange}
          showSearch
          dropdownStyle={{ maxHeight: 700, overflow: "auto" }}
          treeNodeFilterProp="title"
          treeTitleRender={(nodeData) => (
              <span style={{ fontWeight: nodeData.children ? 600 : 400 }}>
                {nodeData.title}
              </span>
            )}
          allowClear={allowClear}
          treeDefaultExpandAll={treeDefaultExpandAll}
          listHeight={500}
        />
      </Form.Item>
      <Form.Item name={`${serverPayloadKey}${DIVIDER_HIDDEN}`} hidden>
        <Input />
      </Form.Item>
      <Form.Item name={`${serverPayloadKey}_Ten`} hidden>
        <Input />
      </Form.Item>
      <Form.Item name={`${serverPayloadKey}_TenKhoaHoc`} hidden>
        <Input />
      </Form.Item>
      <Form.Item name={`${serverPayloadKey}_LoaiUuTienBaoVe`} hidden>
        <Input />
      </Form.Item>
      <Form.Item name={`${serverPayloadKey}_LoaiQuyHiemNguyCap`} hidden>
        <Input />
      </Form.Item>
    </Spin>
  );
};

export default TreeSelectCategoryViewer;

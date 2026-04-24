import { DIVIDER_HIDDEN } from '@packages/constants/commons';
import { TFetchBase, useFetchBase } from '@packages/hooks/useFetchBase';
import { IConfigBasic } from '@packages/schema/fields/fieldConfig';
import { buildModeTree } from '@packages/utils/buildTree';
import { defineComponent } from '@packages/utils/common';
import { Form, Input, Spin } from 'antd';
import useFormInstance from 'antd/es/form/hooks/useFormInstance';
import _ from 'lodash';
import _get from 'lodash/get';
import _isArray from 'lodash/isArray';
import _isObject from 'lodash/isObject';
import _omit from 'lodash/omit';
import React, {
  useCallback, useEffect, useMemo, useState,
} from 'react';

export type TAsyncSupportProps = {
  fieldKey: string,
  indexValue: string,
  indexLabel: string,
  indexThumb?: string,
  pathToSource: string,
  transformDataOption?: IConfigBasic,
  isModeTree?: boolean,
  identifyIdKey?: string,
  identifyParentKey?: string,
} & TFetchBase & {
  children: React.ReactNode
};

const isValidIndexKey = (value: any) => !_isArray(value) || !_isObject(value);

const AsyncSupport = (props: TAsyncSupportProps) => {
  const [data, setData] = useState([]);
  const [originalData, setOriginalData] = useState([]);
  const [isLargeDataset, setIsLargeDataset] = useState(false);
  const {
    action,
    queryParams,
    headers,
    searchQueryKey,
    fieldKey,
    pathToSource,
    indexLabel,
    indexValue,
    indexThumb,
    children,
    isModeTree,
    identifyIdKey,
    identifyParentKey,
  } = props;
  const form = useFormInstance();

  const handleSuccess = useCallback((_data: any) => {
    const _dataSource = _isArray(_data) ? _data : _get(_data, pathToSource, []);
    setIsLargeDataset(_dataSource.length > 1000);
    setOriginalData(_dataSource)
    setData(_dataSource);
    form.setFields([
      {
        name: fieldKey,
        errors: [],
      },
    ]);
  }, [fieldKey]);

  const handleError = useCallback((error: any) => {
    setData([]);
    form.setFields([
      {
        name: fieldKey,
        errors: [error?.message || 'Something went wrong'],
      },
    ]);
  }, [fieldKey]);

  const { fetchBase, isLoading } = useFetchBase({
    action,
    searchQueryKey,
    queryParams,
    headers,
    onError: handleError,
    onSuccess: handleSuccess,
  });

  const handleSearch = (value: string) => {
    if(!value) {
      setData(originalData);
      return
    }
    if (isLargeDataset) {
      fetchBase(encodeURIComponent(value));
    } else {
      const filtered = data && data.filter((item: any) => {
        const label = _get(item, indexLabel, '');

        return label.toLowerCase().includes(value.toLowerCase());
      });
      setData(filtered)
    };
  };

  useEffect(() => {
    fetchBase();
  }, [fetchBase]);

  const dataSource = useMemo(() => {
    if (!_.isEmpty(data)) {
      const _dataSource = _isArray(data) ? data : _get(data, pathToSource, []);

      if (_isArray(_dataSource)) {
        // Async select dạng tree
        if (isModeTree) {
            const dataSourceAfterBuildTree = buildModeTree(_dataSource, {
              idKey: identifyIdKey || 'id',
              parentKey: identifyParentKey || 'parentId',
            });

            const mapTreeLabelValue = (nodes: any[]): any[] =>
              nodes.map((_node) => {
                const hasChildren = Array.isArray(_node.children) && _node.children.length > 0;
                const id = _get(_node, "ID", _get(_node, "Id", ""));
                const label = _get(_node, indexLabel, "");
                const value = _get(_node, indexValue, "");

                return {
                  key: id,
                  value: value,
                  title: hasChildren ? <b>{label}</b> : label,
                  selectable: !hasChildren,
                  data: _node,
                  children: hasChildren ? mapTreeLabelValue(_node.children) : undefined,
                };
            });

            const options = mapTreeLabelValue(dataSourceAfterBuildTree);
            // const options = dataSourceAfterBuildTree

            return options;
        }

        // Async select dạng list
        const options = _dataSource
          .map((_data) => {
            const label = _get(_data, indexLabel, '');
            const value = _get(_data, indexValue, '');
            const thumb = indexThumb ? _get(_data, indexThumb, '') : '';

            return {
              label: isValidIndexKey(label) ? label : '',
              value: isValidIndexKey(value) ? value : '',
              thumb: isValidIndexKey(thumb) ? thumb : '',
              data: _data,
            };
          })
          .filter(({ value }) => Boolean(value));

        // Store options in local storage
        localStorage.setItem(action, JSON.stringify(options));

        return options;
      }
    }

    // Retrieve options from local storage if dataSource is empty
    const localStorageData = localStorage.getItem(action);

    return localStorageData ? JSON.parse(localStorageData) : [];
  }, [
        data, 
        pathToSource, 
        indexLabel, 
        indexValue,
        isModeTree,
        identifyIdKey,
        identifyParentKey,
      ]
  );

  const handleSelect = (val: any, node: any) => {
    // if (!isModeTree || node.selectable === false) return;

    const label = _get(node?.data, indexLabel, "");
    form.setFieldsValue({
      [fieldKey]: val,
      [`${fieldKey}${DIVIDER_HIDDEN}`]: JSON.stringify({ value: val, label }),
      [`${fieldKey}_Ten`]: label,
    });
  };

  return (
    <Spin spinning={isLoading}>
      {defineComponent(children as any, { 
        options: dataSource, 
        onSearch: handleSearch, 
        onSelect: handleSelect,
        data,
      })}
      <Form.Item hidden name={`${fieldKey}${DIVIDER_HIDDEN}`}>
        <Input />
      </Form.Item>
      <Form.Item hidden name={`${fieldKey}_Ten`}>
        <Input />
      </Form.Item>
    </Spin>
  );
};

export default AsyncSupport;

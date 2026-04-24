import AsyncSupport from '@packages/components/AsyncSupport';
import { TFetchBase } from '@packages/hooks/useFetchBase';
import { getAsyncProps } from '@packages/utils/common';
import { omitRedundantFieldProps } from '@packages/utils/omitProps';
import { Select, SelectProps, TreeSelect } from 'antd';
import _debounce from 'lodash/debounce';
import React, { useCallback } from 'react';

export type TViewAsyncSelectProps = {
  debounceTime: number,
  fieldKey: string,
  indexValue: string,
  indexLabel: string,
  pathToSource: string,
  isMultipleSelected?: boolean,
  isBuildTree?: boolean,
  idKey?: string,
  parentKey?: string,
} & TFetchBase & SelectProps;

function ViewAsyncSelect(props: TViewAsyncSelectProps) {
  const {
    debounceTime,
    searchQueryKey,
    isMultipleSelected,
    isBuildTree,
    idKey,
    parentKey,
    ...rest
  } = props;

  const ChildSelect = useCallback((
    { options, onSearch, onSelect }: { options?: any, onSearch?: any, onSelect?: any},
  ) => {
        if(isBuildTree) {
          return (
            <TreeSelect
              treeData={options}
              allowClear
              showSearch
              treeDefaultExpandAll
              multiple={isMultipleSelected}
              filterTreeNode={true}
              treeNodeFilterProp="title"
              listHeight={500}
              onSelect={onSelect}
              // onSearch={_debounce(onSearch, debounceTime)}
              {...omitRedundantFieldProps(rest)}
            />
          )
        }
        return (
          <Select
            options={options}
            allowClear
            filterOption={false}
            onSearch={_debounce(onSearch, debounceTime)}
            onSelect={onSelect}
            {...omitRedundantFieldProps(rest)}
            mode={isMultipleSelected ? 'multiple' : null}
          />
        )
      }, [debounceTime, rest]
  );

  return (
    <AsyncSupport
      {...getAsyncProps(props)}
      searchQueryKey={searchQueryKey}
      isModeTree={isBuildTree}
      identifyIdKey={idKey}
      identifyParentKey={parentKey}
    >
      <ChildSelect />
    </AsyncSupport>
  );
}

export default ViewAsyncSelect;

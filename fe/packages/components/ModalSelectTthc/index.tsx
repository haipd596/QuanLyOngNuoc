import {
  Button,
  Checkbox,
  Input,
  Modal
} from 'antd';
import React, { useEffect, useState } from 'react';

import { apiGetTthcList } from '@packages/dvc-service/apiGetTthcList';
import useDebounce from '@packages/hooks/useDebounce';
import { useAppDispatch, useAppSelector } from '~/redux/hooks';
import {
  selectIsOpenModalTthc,
  selectSltTthc,
  setModalSltTthc,
  setSltThuTucHanhChinh
} from '~/redux/slices';
import { useLanguage } from '../LanguageContext';
import './styles.scss';

const { Search } = Input

const ModalSelectTthc = () => {
  const isOpen = useAppSelector(selectIsOpenModalTthc); // Check if the modal is open
  const tthc = useAppSelector(selectSltTthc);
  const dispatch = useAppDispatch(); // Dispatcher for app state actions
  const { translate } = useLanguage();
  const debouce = useDebounce();

  const [search, setSearch] = useState<string>("")
  const [tthcList, setTthcList] = useState<any>([])

  useEffect(() => {
    (async () => {
      const result = await apiGetTthcList(search);
      setTthcList(result);
    })() 
  }, [search])

  const handleDone = () => {
    dispatch(setModalSltTthc(false));
  };

  const handleSelectTthc = (item:any)  => {
    dispatch(setSltThuTucHanhChinh(item));
  }

  const handleSearch = (e:any) => {
    debouce(() => {
      setSearch(e.target.value)
    });
  } 

  const footer = () => (
    <div>
      <Button className="modal-cancel-button" onClick={handleDone}>
        {translate('cancel_form')}
      </Button>
    </div>
  );

  // Render the modal
  return (
    <Modal
      open={isOpen}
      closable={false}
       
      footer={footer}
      style={{ top: 175 }}
      rootClassName="modal-select-tthc-root"
      width={1200}
    >
      <div className="modal-header">
        <div className="header-left-tthc">
          <p className="modal-header--title">{translate('title_tthc_modal')}</p>
        </div>
      </div>

      <div className="modal-content">
        <Search allowClear placeholder={translate('placeholder_tthc_modal')} onChange={handleSearch}/>
        <div style={{marginTop: 16}}>
          { 
            tthcList?.map((item:any) => (
              <div 
                key={item?.Id} 
                onClick={() => handleSelectTthc(item)}
                className={`tthc-item-container ${tthc?.Id === item?.Id && "item-select"}`}
              > 
                <Checkbox style={{marginLeft: 10}} checked={tthc?.Id === item?.Id}/>
                <div className='tthc-item-content'>
                  {item?.Ten}
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </Modal>
  );
};

export default ModalSelectTthc;

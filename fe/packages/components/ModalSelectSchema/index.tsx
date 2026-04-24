import { Schema } from '@packages/schema/schemaModel';
import {
  Button, Input, InputRef,
  Modal,
  Space,
} from 'antd';
import React, { useCallback, useEffect, useState } from 'react';
import { useCreateSchemaMutation, useLazyGetSchemaDetailQuery } from '~/redux/services/schemaApi';

import { useAppDispatch, useAppSelector } from '~/redux/hooks';
import {
  selectIsOpenModalSelectSchema, selectSchemas, setIsOpenModalSelectSchema, setSchema,
} from '~/redux/slices';
import ButtonCreateSchema from '../ButtonCreateSchema';
import CircularTextIcon from '../CircularTextIcon';
import { useLanguage } from '../LanguageContext';
import SelectSchema from '../SelectSchema';
import './styles.scss';

/**
 * CreateFormModal
 * This component is a modal that allows the user to select a schema.
 * It has a form input box where the user can enter a schema name
 * and a select box where the user can choose an existing schema.
 *
 * The component also has a button that allows the user to create a new schema.
 * Pressing enter in the input box will trigger the creation of a new schema.
 */
const ModalSelectSchema = () => {
  // State variables
  const [schemaKey, setSchemaKey] = useState('');
  const [inputValue, setInputValue] = useState<string>('');
  const [existingFormOpen, setExistingFormOpen] = useState(false);

  // API mutations
  const [handleCreateSchema] = useCreateSchemaMutation(); // Mutation for creating a new schema
  const [handleGet] = useLazyGetSchemaDetailQuery(); // Mutation for getting the details of a schema

  // App state selectors and dispatchers
  const isOpen = useAppSelector(selectIsOpenModalSelectSchema); // Check if the modal is open
  const dispatch = useAppDispatch(); // Dispatcher for app state actions
  const schemas = useAppSelector(selectSchemas);

  // Event handlers
  const handleDone = () => { // Handle when the user is done selecting a schema
    handleGet(schemaKey); // Get the details of the selected schema
    dispatch(setIsOpenModalSelectSchema(false)); // Close the modal
  };
  // [x] Add useCallback to prevent state inconsistency
  const handleCreateNewForm = useCallback(async (title?: string) => {
    const emptySchema = new Schema({ // This is just a decoy schema
      title: title ?? `Untitled Form ${schemas.length + 1}`,
      type: 'object',
      fields: [],
    }).toPlainObject();

    const { data, error } = await handleCreateSchema(emptySchema); // Create the new schema

    if (!error) {
      dispatch(setSchema(data)); // Set the schema in the app state
      handleDone(); // Close the modal
    }
  }, [dispatch, handleCreateSchema, handleDone]);

  // useEffect function to derive form quantity
  useEffect(() => {
    const schemasQuantity = schemas.length;
    setInputValue(`Untitled Form ${schemasQuantity < 9 ? '0' : ''}${schemasQuantity + 1}`);
  }, [schemas]);

  // Create a ref for the input box
  const inputRef:any = React.useRef<InputRef>(null);
  // Focus the input box when the modal is opened
  useEffect(() => {
    if (isOpen) {
      // setTimeout to wait for the modal to open and ready to be focused
      // setTimeout(() => {
      //   inputRef?.current?.focus({
      //     cursor: 'all',
      //   });
      // }, 100);
    }
  }, [isOpen]);

  // Reset the schema key when the modal is closed
  useEffect(() => {
    if (!isOpen) {
      setSchemaKey('');
    }
  }, [isOpen]);

  const handleFormInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setInputValue(value);
  };

  const { translate } = useLanguage();

  const footer = () => ( // Render the footer of the modal
    <div>
      <Button className="schema-action-button" onClick={handleDone} disabled={!schemaKey}>
        {translate('done_form')}
      </Button>
    </div>
  );

  const handleOpenExisting = () => {
    setExistingFormOpen(true);
  };

  // Render the modal
  return (
    <Modal
      open={isOpen}
      closable={false} // Don't allow the user to close the modal
       // Destroy the modal when it is closed
      footer={existingFormOpen && footer}
      style={{ top: 175 }}
      rootClassName="modal-select-root"
    >
      <div className="modal-header">
        <div className="header-left">
          <p className="modal-header--description">{translate('drag_drop')}</p>
          <p className="modal-header--title">{translate('title_modal')}</p>
        </div>
        <CircularTextIcon />
      </div>

      <div className="modal-content">
        {/* Form name Input Box */}
        <div className="modal-content__title">{translate('modal_content_title')}</div>
        <div className="hint">
          {translate('modal_content_des_1')}
          {' '}
          <span style={{ fontWeight: 'bold' }}>{translate('modal_content_enter')}</span>
          {' '}
          {translate('modal_content_des_2')}
        </div>
        <Space.Compact style={{ width: '100%' }}>
          <Input
            placeholder={translate('title_placeholder_form_name')}
            allowClear
            onChange={handleFormInput}
            style={{ marginBottom: '10px' }}
            ref={inputRef as any} // Attach the ref to the input box
            value={inputValue}
            onPressEnter={(event: any) => handleCreateNewForm(event.target?.value)}
            defaultValue="Untitled Form"
          />
          <ButtonCreateSchema
            onClick={() => dispatch(setIsOpenModalSelectSchema(false))}
            type={null}
            text={translate('create_form')}
            fieldTitle={inputValue}
            className="schema-action-button"
          />
        </Space.Compact>

        <div>
          <div style={{ display: 'inline-block' }}>{translate('choose_from_these')}</div>
          <Button
            type="link"
            onClick={handleOpenExisting}
            style={{
              padding: '0 2px',
              textDecoration: 'underline',
            }}
          >
            {translate('existing_form')}
          </Button>
          <sup><Button shape="circle" className="existing-quantity">{schemas.length}</Button></sup>

          {
          existingFormOpen && (
          <SelectSchema schemaKey={schemaKey} onChange={setSchemaKey} style={!existingFormOpen ? { display: 'none' } : {}} defaultOpen />
          )
        }
        </div>
      </div>
    </Modal>
  );
};

export default ModalSelectSchema;

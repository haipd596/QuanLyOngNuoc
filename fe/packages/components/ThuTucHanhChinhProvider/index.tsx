import { apiGetThuTucHanhIdByIdForm } from '@packages/dvc-service/apiGetThuTucHanhIdByIdForm';
import React, { useEffect, useState } from 'react';
import { useAppDispatch } from '~/redux/hooks';
import { setSchema } from '~/redux/slices';
import { Schema } from '@packages/schema/schemaModel';
import GlobalSpinner from '~/shared/components/GlobalSpiner';

type TSystemParametersProps = {
  children: React.ReactNode
};

const ThuTucHanhChinhProVider = ({ children }: TSystemParametersProps) => {
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(true);

  const emptySchema = Schema.output(new Schema({
    title: 'form',
    type: 'object',
    fields: [],
    layout: 'vertical',
    currentTheme:"GREEN"
  }));

  useEffect(() => {
    (async () => {
      try {
        const dvcEform = await apiGetThuTucHanhIdByIdForm();
        dispatch(setSchema(dvcEform?.SchemaEform ? JSON.parse(dvcEform?.SchemaEform) : Schema.reconcile(emptySchema)));
        setIsLoading(false);
      } catch (error) {
        console.log("ERROR::", error)
        setIsLoading(false);
      }
    })();
  }, []);

  if (isLoading) return <GlobalSpinner loading={isLoading} />;

  return children;
};

export default ThuTucHanhChinhProVider;

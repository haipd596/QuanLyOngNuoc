import { JsonSchema } from '@packages/schema/schemaModel';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ApiConfig } from '~/configs';

export const schemaApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: ApiConfig.apiBaseUrl }),
  tagTypes: ['Form'],
  endpoints: (builder) => ({
    getForms: builder.query<JsonSchema[], void>({
      query: () => '',
      providesTags: ['Form'],
    }),
    getSchemaDetail: builder.query({
      query: (schemaKey: string) => `/${schemaKey}`,
    }),
    schemaDetail: builder.query({
      query: (schemaKey: string) => `/${schemaKey}`,
    }),
    updateSchema: builder.mutation({
      query: (args) => {
        const { schemaKey, body } = args;

        return ({
          url: `/${schemaKey}`,
          method: 'PUT',
          body,
        });
      },
      invalidatesTags: ['Form'],
    }),
    deleteSchema: builder.mutation({
      query: (schemaKey) => ({
        url: `/${schemaKey}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Form'],
    }),
    createSchema: builder.mutation({
      query: (body) => ({
        url: '',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Form'],
    }),
  }),
  reducerPath: 'schemaApi',
});

// Export hooks for usage in functional components
export const {
  useGetFormsQuery,
  useSchemaDetailQuery,
  useUpdateSchemaMutation,
  useCreateSchemaMutation,
  useGetSchemaDetailQuery,
  useDeleteSchemaMutation,
  useLazyGetSchemaDetailQuery,
} = schemaApi;

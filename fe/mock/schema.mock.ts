import { JsonSchema } from '@packages/schema/schemaModel';
import _filter from 'lodash/filter';
import _find from 'lodash/find';
import _findIndex from 'lodash/findIndex';
import { MockHandler } from 'vite-plugin-mock-server';
import { MOCK_BOOKS } from './books';

let schemas: JsonSchema[] = [];

export default (): MockHandler[] => [
  {
    pattern: '/builders',
    method: 'GET',
    handle: (_req, res) => {
      res.end(JSON.stringify(schemas));
    },
  },
  {
    pattern: '/builders/{schemaKey}',
    method: 'GET',
    handle: (req, res) => {
      const found = _find(schemas, { schemaKey: req.params?.schemaKey }) || {};
      res.end(JSON.stringify(found));
    },
  },
  {
    pattern: '/builders/{schemaKey}',
    method: 'PUT',
    handle: (req, res) => {
      const foundIndex = _findIndex(schemas, { schemaKey: req.params?.schemaKey });

      const _schema = {
        ...req.body,
        schemaKey: req.params?.schemaKey,
      };
      if (foundIndex > -1) {
        schemas[foundIndex] = _schema;
      } else {
        schemas.unshift(_schema);
      }
      res.end(JSON.stringify(_schema));
    },
  },
  {
    pattern: '/builders',
    method: 'POST',
    handle: (req, res) => {
      const data = req.body;
      schemas.unshift(data);
      res.end(JSON.stringify(data));
    },
  },
  {
    pattern: '/builders/{schemaKey}',
    method: 'DELETE',
    handle: (req, res) => {
      const formFiltered = _filter(schemas, ({ schemaKey }) => schemaKey !== req.params?.schemaKey);
      schemas = formFiltered;
      res.end(JSON.stringify(formFiltered));
    },
  },
  // {
  //   pattern: '/api/schema/delete/all',
  //   method: 'GET',
  //   handle: (_req, res) => {
  //     schemas = [];
  //     res.end(JSON.stringify(schemas));
  //   },
  // },
  {
    pattern: '/api/books',
    method: 'GET',
    handle: (req, res) => {
      if (req.query?.q) {
        res.end(
          JSON.stringify({
            ...MOCK_BOOKS,
            data: MOCK_BOOKS
              .data
              .filter(({ name }) => (
                name.toLowerCase().includes(decodeURIComponent(req.query!.q).toLowerCase())
              )),
          }),
        );
        return;
      }

      res.end(JSON.stringify(MOCK_BOOKS));
    },
  },
  {
    pattern: '/api/user',
    method: 'GET',
    handle: (_req, res) => {
      res.end(JSON.stringify({}));
    },
  },
];

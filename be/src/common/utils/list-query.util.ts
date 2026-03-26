import { PaginationInput } from './pagination.util';

export function buildPaginationInput(
  page?: string | number,
  pageSize?: string | number,
): PaginationInput {
  const parsedPage = Number(page);
  const parsedPageSize = Number(pageSize);

  return {
    Page: Number.isFinite(parsedPage) && parsedPage > 0 ? parsedPage : undefined,
    PageSize:
      Number.isFinite(parsedPageSize) && parsedPageSize > 0
        ? parsedPageSize
        : undefined,
  };
}

export function extractQueryFilters(
  rawQuery: Record<string, unknown>,
  allowedFields: string[],
): Record<string, string> {
  const filters: Record<string, string> = {};

  for (const field of allowedFields) {
    const key = `Query.${field}`;
    const value = rawQuery[key];

    if (value === undefined || value === null) {
      continue;
    }

    const text = String(value).trim();
    if (text.length === 0) {
      continue;
    }

    filters[field] = text;
  }

  return filters;
}


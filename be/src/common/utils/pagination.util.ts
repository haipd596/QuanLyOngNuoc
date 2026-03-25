export type PaginationInput = {
  page?: number;
  limit?: number;
};

export type PaginationResult<T> = {
  items: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
};

export function normalizePagination(input: PaginationInput) {
  const page = input.page && input.page > 0 ? input.page : 1;
  const limit = input.limit && input.limit > 0 ? input.limit : 10;
  const skip = (page - 1) * limit;
  return { page, limit, skip };
}

export function buildPaginatedResult<T>(
  items: T[],
  total: number,
  page: number,
  limit: number,
): PaginationResult<T> {
  const totalPages = Math.max(1, Math.ceil(total / limit));
  return {
    items,
    pagination: {
      page,
      limit,
      total,
      totalPages,
      hasNextPage: page < totalPages,
      hasPreviousPage: page > 1,
    },
  };
}


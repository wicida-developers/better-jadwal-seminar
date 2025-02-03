import { useEffect, useMemo, useState } from "react";

interface PaginationData<T> {
  data: T[];
  currentPage: number;
  pageSize: number;
}

interface UseTablePaginationProps<T> {
  data: PaginationData<T> | undefined;
  isPending: boolean;
  page: number;
  limit: number;
}

interface UseTablePaginationReturn<T> {
  tableData: T[];
  paginationProps: Omit<PaginationData<T>, "data">;
}

/**
 * A custom hook for handling table pagination state and data.
 *
 * @template T - The type of data items in the table
 *
 * @param {Object} props - The hook properties
 * @param {PaginationData<T>} props.data - The current pagination data
 * @param {boolean} props.isPending - Whether data is currently being loaded
 * @param {number} props.page - The current page number
 * @param {number} props.limit - The number of items per page
 *
 * @returns {Object} An object containing:
 *   - tableData: The current page's data items
 *   - paginationProps: Current page and page size
 */
export function useTablePagination<T>({
  data,
  isPending,
  page,
  limit,
}: UseTablePaginationProps<T>): UseTablePaginationReturn<T> {
  // Keep track of the last successful data response
  const [lastData, setLastData] = useState<PaginationData<T> | null>(null);

  // Update the last successful data when we get a new response
  useEffect(() => {
    if (data) {
      setLastData(data);
    }
  }, [data]);

  // Memoize the current pagination state
  const paginationState = useMemo(() => {
    if (isPending && lastData) {
      return {
        ...lastData,
        data: [], // Clear data during loading
      };
    }
    return (
      data ?? {
        data: [],
        currentPage: page,
        pageSize: limit,
      }
    );
  }, [isPending, lastData, data, page, limit]);

  // Memoize the table data and pagination props
  const tableData = useMemo(
    () => (isPending ? [] : paginationState.data),
    [isPending, paginationState.data],
  );

  const paginationProps = useMemo(
    () => ({
      currentPage: paginationState.currentPage,
      pageSize: paginationState.pageSize,
    }),
    [paginationState],
  );

  return {
    tableData,
    paginationProps,
  };
}

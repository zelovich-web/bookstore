export interface PaginationProps {
  pageCount: number;
  onPageChange: (selectedPage: number) => void;
}
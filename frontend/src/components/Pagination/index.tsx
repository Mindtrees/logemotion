import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

interface Props {
  totalPages: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
}

const MuiPagination = ({ totalPages, currentPage, setCurrentPage }: Props) => {
  const handleChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
  };

  return (
    <Stack spacing={2} alignItems="center" sx={{ mt: 3 }}>
      <Pagination
        count={totalPages}
        page={currentPage}
        onChange={handleChange}
        color="primary"
        shape="rounded"
        size="medium"
      />
    </Stack>
  );
};

export default MuiPagination;

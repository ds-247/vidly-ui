import Pagination from "@mui/material/Pagination";
//changing of selected page is internal to pagination component of material ui
function Pages({ totalPages: count, onPageChange, page }) {
  return (
    <Pagination
      page={page}
      count={count}
      size="large"
      color="primary"
      onChange={onPageChange}
    />
  );
}

export default Pages;

import { Box, Icon, Item, List, Text } from "./elements";

export default function CustomPagination({
  perPage,
  totalUsers,
  currentPage,
  paginate,
}) {
  // Calculate the total number of pages
  const totalPages = Math.ceil(totalUsers / perPage);

  // Generate an array of page numbers
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <Box className="mc-paginate">
      <Text className="mc-paginate-title">
        Showing <b>{perPage}</b> of <b>{totalUsers}</b> Results
      </Text>
      <List className="mc-paginate-list">
        {/* Previous page button */}
        <Item
          className={`mc-paginate-item ${currentPage === 1 ? "disabled" : ""}`}
          key="previousPage"
          onClick={() => currentPage > 1 && paginate(currentPage - 1)}
        >
          <Icon type="chevron_left" />
        </Item>

        {/* Page numbers */}
        {pageNumbers.map((pageNumber) => (
          <Item
            key={pageNumber}
            className={`mc-paginate-item ${
              pageNumber === currentPage ? "active" : ""
            }`}
            onClick={() => paginate(pageNumber)}
          >
            {pageNumber}
          </Item>
        ))}

        {/* Next page button */}
        <Item
          className={`mc-paginate-item ${
            currentPage === totalPages ? "disabled" : ""
          }`}
          key="nextPage"
          onClick={() => currentPage < totalPages && paginate(currentPage + 1)}
        >
          <Icon type="chevron_right" />
        </Item>
      </List>
    </Box>
  );
}

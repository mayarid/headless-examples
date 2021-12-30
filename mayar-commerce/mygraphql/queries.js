import { gql } from "@apollo/client";

const GET_PAYMENT_LINK_PAGE_DEV = gql`
  query getPaymentLinkPageDev(
    $page: Int
    $pageSize: Int
    $search: PaymentLinkSearchInput
    $searchAny: PaymentLinkSearchInput
    $sortDirection: SortDirection
    $sortField: PaymentLinkSortField
  ) {
    getPaymentLinkPageDev(
      page: $page
      pageSize: $pageSize
      search: $search
      searchAny: $searchAny
      sortDirection: $sortDirection
      sortField: $sortField
    ) {
      total
      page
      offset
      totalPage
      prevPage
      nextPage
      items {
        invoiceUrl
        amount
        description
        id
        name
        notes
        status
        type
        coverImage {
          url
        }
      }
    }
  }
`;
export { GET_PAYMENT_LINK_PAGE_DEV };

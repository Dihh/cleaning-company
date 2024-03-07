import { Pagination } from "react-bootstrap";
import { Metadata } from "../../interfaces/MetaData";

const SystemPagination: React.FC<{
  metaData: Metadata<any>, onChangePagination: Function
}> = ({ metaData, onChangePagination }) => {

  const maxPage = metaData.pages
  const active = metaData.page;

  let offset = 1
  if (active == 1) {
    offset = 0
  } else if (active == maxPage) {
    offset = 2
  }

  const pages = Array.from({ length: 3 }, (_, i) => i + active - offset);

  const items = pages.map((page) =>
    page > 0 && page <= maxPage
      ? <Pagination.Item className="secondary" key={page} active={page === active} onClick={() => onChangePagination(page)}>
        {page}
      </Pagination.Item>
      : null
  )

  return (
    <div className='d-flex flex-row-reverse'>
      <Pagination>{items}</Pagination>
    </div>
  )
}

export default SystemPagination
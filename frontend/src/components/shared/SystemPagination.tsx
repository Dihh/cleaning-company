import { Pagination } from "react-bootstrap";

export default function () {
  let active = 2;
  let items = [];
  for (let number = 1; number <= 5; number++) {
    items.push(
      <Pagination.Item key={number} active={number === active}>
        {number}
      </Pagination.Item>,
    );
  }
  
  return (
    <div className='d-flex flex-row-reverse'>
      <Pagination>{items}</Pagination>
    </div>
  )
}
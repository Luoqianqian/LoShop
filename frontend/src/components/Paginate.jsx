import { Pagination } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';

const Paginate = ({ page, pages, keyworld}) => {
  const { curPage } = useParams();
  const navigate = useNavigate();
  const clickHandle = (x) => {
    if(keyworld) {
      navigate(`/search/${keyworld}/page/${x + 1 }`)
    } else {
      navigate(`/page/${x + 1}`);
    }
    
  }
  return (
    pages > 1 && (
      <Pagination>
        {[...Array(pages).keys()].map( (x) => (
          <Pagination.Item key={x+1} onClick={() => clickHandle(x)} active={x+1 === page} >
          {x+1}
          </Pagination.Item>
        )
      )}
      </Pagination>
    )
  )
}

export default Paginate;

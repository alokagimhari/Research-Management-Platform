import React, { useEffect,Fragment } from 'react';
import { Link,useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, ListGroup} from 'react-bootstrap';
import * as productAction from '../../actions/productAction';
import ErrorMessage from '../../ErrorMessage';
import ProductReview from './productReview';
import Rating from '../Rating/Rating';
import * as productConstants from '../../constants/userConstants';
import SinglePageLoader from './singlePageLoader';
//import { addToCart } from '../actions/cartAction';
import Sidebar from '../AdminDashboard/components/Sidebar';


function ProductDetails () {

  const dispatch = useDispatch();
  const {productId} = useParams();

  const productData = useSelector((state) => state.Product);
  const reviewResponses = useSelector((state) => state.createReview);

  const { error: createReviewError } = reviewResponses;

  const { loading, product, error } = productData;

  

  useEffect(() => {
    dispatch(productAction.product(productId));
    // eslint-disable-next-line
  }, [dispatch,productId]);


  return (
    <Fragment>
			 <div className="row">
                <div className="col-12 col-md-2">
                    <Sidebar />
                </div>
						<div className="col-12 col-md-10">
							<Fragment>
    <>
      {createReviewError && (
        <ErrorMessage header="Opps!!!" message={createReviewError} reset={productConstants.CREATE_REVIEW_RESET} />
      )}
      <Link className="btn btn-light my-3" to="/">
        Go Back
      </Link>
      {loading ? (
        <SinglePageLoader />
      ) : error ? (
        <ErrorMessage header="Something went wrong" message={error} />
      ) : (
        <>
          <Row>
            {/* <Col md={6}>
              <Image src={product.} alt={product.name} fluid />
            </Col> */}
            <Col md={3}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h3>{product.title}</h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Rating
                    value={product.averageRating}
                    text={`${product.Reviews ? product.Reviews.length : 0} reviews`}
                  />
                </ListGroup.Item>
{/*                 <ListGroup.Item>Price: ${product.price}</ListGroup.Item>
 */}                <ListGroup.Item>Description: {product.description}</ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
          <ProductReview productId={productId} />
        </>
      )}
    </>
    </Fragment>
    </div>
    </div>
    </Fragment>
  );
};
export default ProductDetails;
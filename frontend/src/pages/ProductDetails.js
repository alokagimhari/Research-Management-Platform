import React, { useEffect, useState } from 'react'
import {Card, Button, Container, Form, Row, Col} from 'react-bootstrap'
import { Link,useNavigate } from 'react-router-dom'
import { useParams } from 'react-router'
import axios from 'axios'


const ProductDetail = () => {

    const navigate = useNavigate();
    const { id } = useParams()
    //const history = useHistory()

    const [title, setTitle] = useState('')
  /*  const [price, setPrice] = useState(0) */
    const [description, setProductDescription] = useState('')
  const [file_mimetype, setFile_mimetype] = useState('')


    // review rating  description
    const [reviews, setReviews] = useState([])
    const [rating, setRating] = useState(0)
    const [text, setDescription] = useState('')


    useEffect(() => {

        const getSingleProductData = async () => {
            const { data } = await axios.get(`http://localhost:5000/getProductReviews/${id}`)
            console.log(data)

            setTitle(data.title)
            setProductDescription(data.description)
            setFile_mimetype(data.file_mimetype);
            // for reviews
            setReviews(data.review)


        }
        getSingleProductData()

    },[id])



    // handling Delete
    const handleDelete = async (id) => {
        await axios.delete(`http://localhost:5000/${id}`)
        navigate('/')
    }

    // to add review

    const addReviewHandler = async (e) => {

        e.preventDefault()

        let review = {
            product_id: id,
            rating: rating,
            text: text
        }

        await axios.post(`http://localhost:5000/addReview/${id}`, review)

        navigate('/')
    }



    

    return (
        <>

        <Container className="mt-10 p-4">
        <h1 className="text-center">Detail Product</h1>
        <hr />

        <Row>
            <Col md={8} lg={8} sm={8}>
                <Card className='shadow-lg m-3 p-2 rounded'>
                       
                        <Card.Body>
                            <Card.Title>Title: {title}</Card.Title>
                            <Card.Text>
                                Description: {description}
                            </Card.Text>
                         
                        <br />

                    
                            {/* <Link to={`/product/edit/${id}`}>
                                <Button>Edit</Button>
                            </Link> */}
                            
                            <Button className="btn btn-danger m-2" onClick={() => handleDelete(id)}>Delete</Button> 
                        
                    </Card.Body>        
                </Card>
            </Col>


                <Col md={4} lg={4} sm={4}>

                    <h2 className='text-center'>Add Review</h2>
                    <hr />

                        <Form onSubmit={addReviewHandler}>
                            <Form.Group className="mb-3" controlId="rating">
                                <Form.Label>Rating</Form.Label>
                                <Form.Control
                                    value={rating}
                                    onChange={(e) => setRating(e.target.value)}
                                    type="number"
                                />
                            </Form.Group>

                        

                            <Form.Group className="mb-3" controlId="description">
                                <Form.Label>Description</Form.Label>
                                <Form.Control
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    as="textarea"
                                    />
                            </Form.Group>


                            <Button variant="primary" type="submit">
                                Add Review
                            </Button>
                        </Form>

                         <br />

                        <h5>Product Reviews</h5>
                        <br />

                        {reviews.length > 0 ? (
                            reviews.map(review => {
                                return <p key={review.id}>Rating: {review.rating} <br /> {review.description}</p>
                            })
                        ): ( <p> No reviews for this product </p> )}

                        
                </Col>
        </Row>



                
        </Container>

       



        </>
    )
}

export default ProductDetail
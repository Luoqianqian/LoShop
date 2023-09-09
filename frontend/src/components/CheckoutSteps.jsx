/* eslint-disable react/prop-types */
import { Nav } from 'react-bootstrap';

const CheckoutSteps = ({step1, step2, step3, step4 }) => {
  return (
    <Nav>
      <Nav.Item className=' text-gray-800'>
        {step1
          ?<Nav.Link href="/login"><span className=' text-gray-800'>Sign In</span></Nav.Link>
          : <Nav.Link disabled><span className=' text-gray-400'>Sign In</span></Nav.Link>
        }
      </Nav.Item>
      <Nav.Item>
        {step2
          ?<Nav.Link href="/shipping"><span className=' text-gray-800'>Shopping</span></Nav.Link>
          : <Nav.Link disabled><span className=' text-gray-400'>Shopping</span></Nav.Link>
        }
      </Nav.Item>
      <Nav.Item>
        {step3
          ?<Nav.Link href="/payment"><span className=' text-gray-800'>Payment</span></Nav.Link>
          : <Nav.Link disabled><span className=' text-gray-400'>Payment</span></Nav.Link>
        }
      </Nav.Item>
      <Nav.Item>
        {step4
          ?<Nav.Link href="/placeorder"><span className=' text-gray-800'>Place Order</span></Nav.Link>
          : <Nav.Link disabled><span className=' text-gray-400'>Place Order</span></Nav.Link>
        }
      </Nav.Item>

    </Nav>
  )
}

export default CheckoutSteps

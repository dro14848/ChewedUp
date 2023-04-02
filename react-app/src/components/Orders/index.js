import { Link } from "react-router-dom";


function Order() {

    return (
        <div>
            <h3>Your Order is being processed, please check again later for Order Status</h3>
            <Link to='/'>Click here to return to Home</Link>
        </div>
    )
}

export default Order
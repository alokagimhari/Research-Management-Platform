import { useEffect, useState,Fragment } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import success from "../../imgs/success.png";

//07/17

const EmailVerify = () => {
	
	const [validUrl, setValidUrl] = useState(true);
	const param = useParams();

	useEffect(() => {
		const verifyEmailUrl = async () => {
			try {
				const url = `http://localhost:5000/users/${param.id}/verify/${param.token}`;
				const { data } = await axios.get(url);
				console.log(data);
				setValidUrl(true);
			} catch (error) {
				console.log(error);
				setValidUrl(false);
			}
		};
		verifyEmailUrl();
	}, [param]);

	return (
		<Fragment>
			
				<div className="container">
					<img src={success} alt="success_img" className="success_img"/>
					<h1>Email verified successfully</h1>
					<Link to="/welcome">
						<button className="btn btn-success">Continue</button>
					</Link>
				</div>
			
		</Fragment>
	);
};

export default EmailVerify;
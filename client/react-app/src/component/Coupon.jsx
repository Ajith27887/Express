import React from 'react'
import { useState, useEffect } from 'react'
import "./Coupon.css"
import axios from "axios";
import TotalBill from './TotalBill';

const Coupon = () => {
	const [coupon, setCoupon] = useState(""),
	[clientCoupon, setClientCoupon] = useState(""),
	[disableBtn, setDisableBtn] = useState(false),
	couponList = [ "off25", "off50", "off75", "off100" ];

	handleSubmit = (e) => {
		e.preventDefault()

		if (!coupon) {
			alert("Please Enter a coupon code")
			return
		}
		if (!couponList.includes(coupon)) {
			alert("Invalid")
	    	setCoupon("");
	      	return;
	    }
		const trimedcoupon = coupon.trim()

		const currentCoupon = couponList.find(item => item === trimedcoupon) 
		
		setClientCoupon(currentCoupon);
		
		//Math
		const value = parseInt(currentCoupon.replace("off",""));
		const offValue = (totalBill * value) / 100;
		const finalPrice = totalBill - offValue;

	
		setDisableBtn(true)
		setTotalBill(finalPrice)
		setCoupon("")
	}

	const handleRemoveCode = () =>{
		setCoupon("");
		setTotalBill(price)
		setDisableBtn(false)
	}

	const fetchfn = async () => {
		try {
			const response = await fetch("https://dummyjson.com/carts")
			const json = await response.json();
			console.log(json);
		} catch (error) {
			console.log("Faild to fetch", error);
		}
	}

	useEffect(() => {
		fetchfn()
	}, [])

  return (
	<div className='flex'>
		<div className='flex-1'>
			<form className='w-34 flex-1 ' action="" onSubmit={handleSubmit}>
				<input value={coupon} onChange={(e) => setCoupon(e.target.value)} style={{ width : "25%" }} type="text" name="coupon" id="" /> <br/>
				<button disabled={disableBtn} className={`${disableBtn ? "fade": ""}`} type="submit mt-5 ">Apply Coupon</button>
		 	</form>
			<div className='flex mx-auto justify-center items-center'>
				{disableBtn && <button className='' onClick={handleRemoveCode} type='submit'>Remove Offer</button>}
			</div>
		</div>

		<div className='flex flex-row w-64 flex-1 justify-center items-center'>
			<TotalBill/>
		</div>
	</div>
  )
}

export default Coupon

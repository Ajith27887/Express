import React, { useContext } from 'react'
import { AppContext } from './AmountProvider'

const TotalBill = () => {

	const { totalBill } = useContext(AppContext);
	console.log(totalBill,"total");
	
  return (
	<div>
  		<div className='flex items-center'>
			<h2>Total Bill :</h2>
			<h2 className='ms-5'> {totalBill}</h2>
		</div>
	</div>
  )
}

export default TotalBill

import './App.css'
import Coupon from './component/Coupon.jsx'
import AmountProvider from './component/AmountProvider.jsx'

function App() {

  return (
    <>
		<div>
			<AmountProvider>
				<Coupon/>
			</AmountProvider>
		</div>
    </>
  )
}

export default App

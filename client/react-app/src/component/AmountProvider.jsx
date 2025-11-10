import { createContext, useState } from "react";

export const AppContext = createContext();

const AmountProvider = ({ children }) => {
	const price = 100;
	const [totalBill, setTotalBill] = useState(price);
	
	const value = {totalBill, setTotalBill}
  return <AppContext.Provider value={value} >{children}</AppContext.Provider>
}

export default AmountProvider

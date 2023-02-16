import axios from "axios"
import { useState } from "react"

const App = () => {
//================================================= Use State =======================================================================
    let [data, setData] = useState([])
    let [currency, setCurrency] = useState("₹")
    let [inrprice, setInrprice] = useState(0)
    let [price, setPrice] = useState(0)
    let [stat, setStat] = useState(false)
    // let [stat1, setStat1] = useState(false)
    let [totalqnty, setTotalqnty] = useState(0)
    let [totalprc, setTotalprc] = useState(0)
    let [list,setList]=useState([])
// ================================================= Getting the Data From DataBase for Particular Name and Category============================= 
    const click = (name, category) => {
        setList([])
        axios.post("https://storied-sherbet-08afb5.netlify.app/.netlify/functions/api/getproduct", { name, category })
            .then((res) => {
                setData(res.data.data); setPrice(res.data.data.price);
                setInrprice(res.data.data.price); setTotalqnty(res.data.data.totalquantity)
                setTotalprc(res.data.data.totalprice ||res.data.data.price)
            })
            .catch((err) => { console.log(err.message) })
    }
// ================================================== Add or Updating the Content On click of Save Button ===============================================

    const updatelist = (data,name,category, price, currencyformat, image, totalprice, totalquantity) => {
        axios.post("https://storied-sherbet-08afb5.netlify.app/.netlify/functions/api/updatelist", { name,category, price, currencyformat,image , totalprice, totalquantity })
            .then((res) => { alert("Saved Successfully")})
            .catch((err) => { console.log(err.message) })
    }
//=================================================== Get content of List You Created ===================================================

    const getlist = ()=>{
        axios.get("https://storied-sherbet-08afb5.netlify.app/.netlify/functions/api/getlist")
            .then((res) => { setList(res.data.data)})
            .catch((err) => { console.log(err.message) })
    }
//=================================================== Remove the item from list =====================================================

    const removelist = (id)=>{
        axios.post("https://storied-sherbet-08afb5.netlify.app/.netlify/functions/api/deletelist",{id})
            .then((res) => { getlist()})
            .catch((err) => { console.log(err.message) })
    }

// ================================================= Converting the Price ====================================================
    const demo = (symbol, price, to, from, currencyformat) => {
        setCurrency(symbol)
        if (currencyformat === "₹" && to === "INR") {
            setPrice(inrprice)
            setTotalprc(totalqnty * inrprice)
            setStat(false)
        }
        else if (currencyformat === "₹" && to === "USD") {
            if (stat === false) {
                setStat(true)
                var myHeaders = new Headers();
                myHeaders.append("apikey", "DcYpFR8WprbfLxDQmNOS1BAKTEuyKNdz");

                var requestOptions = {
                    method: "GET",
                    redirect: "follow",
                    headers: myHeaders,
                };

                fetch(
                    `https://api.apilayer.com/exchangerates_data/convert?to=${to}&from=${from}&amount=${price}`,
                    requestOptions
                )
                    .then((response) => response.json())
                    .then((result) => {
                        setPrice(result.result);
                        setTotalprc((result.result) * totalqnty)
                    })
                    .catch((error) => console.log("error", error));
            }
        }
    }
// ====================================== Incrementing Total Quantity and Total Price ===============================
let incTotalqnty = () => {
    if (totalqnty < 10) {
        setTotalqnty(Number(totalqnty) + 1);
        setTotalprc((totalqnty + 1) * price)
    }
};
// ====================================== Decrementing Total Quantity and Total Price ===============================

    let decTotalQnty = () => {
        if (totalqnty > 1) {
            setTotalqnty(totalqnty - 1);
            setTotalprc((totalqnty - 1) * price)
        }
    }
// ====================================== Changing Total Price On basis of Quantity ==================================
    let handleChange = (e) => {
        setTotalqnty(e.target.value);
        setTotalprc(e.target.value * price)
    }

    return (
            <div>
                <div style={{ paddingLeft: "420px" }}>
            <div style={{ height: "auto", padding: "30px", display: "flex", gap: "5rem" }}>
                {/* Fruits DropDown */}
                <div className="dropdown">
                    <button className="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown" style={{ width: "160px" }} >Fruits
                        <span className="caret"></span></button>
                    <ul className="dropdown-menu">
                        <li><p onClick={() => click("Apple", "Fruits")}>Apple</p></li>
                        <li><p onClick={() => click("Banana", "Fruits")}>Banana</p></li>
                        <li><p onClick={() => click("Mango", "Fruits")}>Mango</p></li>
                        <li><p onClick={() => click("Orange", "Fruits")}>Orange</p></li>
                    </ul>
                </div>

                {/* Vegetables DropDown */}
                <div className="dropdown">
                    <button className="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown" style={{ width: "160px" }}>Vegetables
                        <span className="caret"></span></button>
                    <ul className="dropdown-menu">
                        <li><p onClick={() => click("Pumpkin", "Vegetables")}>Pumpkin</p></li>
                        <li><p onClick={() => click("Lady Finger", "Vegetables")}>Lady Finger</p></li>
                        <li><p onClick={() => click("Carrot", "Vegetables")}>Carrot</p></li>
                        <li><p onClick={() => click("Spinach", "Vegetables")}>Spinach</p></li>
                    </ul>
                </div>
            </div>
            {data.length !== 0 && <div style={{ paddingLeft: "60px" }}>
                <img alt={data.name} src={data.image} style={{ width: "300px", height: "300px" }}></img>  {/*====================== Showing Image ==========================*/}
                <div style={{ paddingLeft: "40px" }}>Unit Price : {price}   {/*====================== Showing Unit Price ==========================*/}
                    <label>
                        <div className="dropdown">     {/*====================== Dropdown to convert Currency Format ==========================*/}
                            <button className="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown" style={{ width: "50px" }}>{currency}
                                <span className="caret"></span></button>
                            <ul className="dropdown-menu">
                                <li><p onClick={() => demo("₹", price, 'INR', "USD", data.currencyformat)}>₹</p></li>
                                <li><p onClick={() => demo("$", price, "USD", "INR", data.currencyformat)}>$</p></li>
                            </ul>
                        </div>
                    </label>
                </div>
                {/*====================== Total Quantity ==========================*/}
                <p style={{ paddingLeft: "40px" }}>Total Quantity :
                    <button onClick={decTotalQnty}>-</button>  
                    <input type={"text"} value={totalqnty} style={{ border: "1px solid black", width: "40px", height: "25px", textAlign: "center" }}
                        onChange={handleChange}></input>
                    <button onClick={incTotalqnty}>+</button>
                    <label>KG</label></p>
                    {/*====================== Total Price ==========================*/}
                <p style={{ paddingLeft: "40px" }}>Total Price : {totalprc}</p>
                {/*====================== Update Button ==========================*/}
                <button style={{ marginLeft: "20px", width: "100px", background: "lightgreen" }} onClick={() => updatelist(data,data.name,data.category, price, currency,data.image, totalprc, totalqnty)}>Add to List</button>
                <button style={{marginLeft:"120px",width:"100px",background:"aqua"}} onClick={()=>{getlist();setData([])}}>Show List</button>
            </div>}
            </div>
           



             {/*List Function */} 
             <div>
                {list.length!==0 && (<div style={{ marginLeft:"360px" ,color: "black", padding: "30px" }}>
                    <h2 style={{ marginLeft: "200px",color:"orangered" }}>Your List</h2>
                    <table className="table" style={{ color: "black" , border:"2.5px solid black",width:"500px"}}>
                        <thead >
                            <tr >
                                <th style={{borderBottom:"2px solid black"}}>Image</th>
                                <th style={{borderBottom:"2px solid black"}}>Name</th>
                                <th style={{borderBottom:"2px solid black"}}>Total Price</th>
                                <th style={{borderBottom:"2px solid black"}}>Quantity</th>
                                <th style={{borderBottom:"2px solid black"}}>Remove</th>
                            </tr>
                        </thead>
                        <tbody>
                            {list.map((item,index)=>{
                                return (
                                    <tr key={index} style={{border:"1.4px solid black"}}>
                                        <td>
                                            <img alt={item.name} className="img-circle" style={{ height: "20px", width: "30px" }} src={item.image}></img>
                                        </td>
                                        <td>{item.name}</td>
                                        <td>{item.totalprice}{item.currencyformat}</td>
                                        <td>{item.totalquantity} Kg</td>
                                        <td><button style={{background:"tomato",borderRadius:"15px"}} onClick={()=>removelist(item._id)}>Remove</button></td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>)}
                </div>

        </div>
    )
}

export default App
import logo from './logo.svg';
import './App.css';
import useState from 'react-hook-use-state';
import CanvasJSReact from './canvasjs/canvasjs.react';

var CanvasJSChart = CanvasJSReact.CanvasJSChart;









function App() {



  var Mdemand = -1000;
  var Bdemand = 10000;
  var Msupply = 0;
  var Bsupply = 8000;
  var consumption;
  var supply;
  var message;
  var range = 10;
  let maxPrice = 0;
  var savePrice = 0;
  var tableData = []


  const [value, setValue] = useState(0);
  const [widgets, setWidgets] = useState();
  const [revenue, setRevenue] = useState();
  const [aMessage, setAMessage] = useState();
  const [sold, setConsumption] = useState();
  const [edited, setEdited] = useState(false);
  const [constants, setConstants] = useState()

  //Build Table

  for (let i = 1; i <= 10; i++) {
    var amtsold = i * Mdemand + Bdemand;
    let revenue = amtsold * i
    tableData.push({ price: i, amtsold: amtsold, revenue: revenue })
  }

  //Canvasjs options
  const options = {

    exportEnabled: true,

    theme: "light2",
    title: {
      text: "Product Price & Product Sold"
    },
    axisY: {
      title: "# Sold",
      maximum: 10000,
      minimum: 0,
    },
    axisX: {
      title: "Price ($)",
      prefix: "$",
      interval: 1,
      maximum: 10.5,
      minimum: 0,
    },
    data: [{
      type: "line",
      toolTipContent: `Revenue: $${(constants - 1) * (sold + 1000)}`,
      dataPoints: [
        { x: 0, y: 0 },
        { x: (constants - 1), y: (sold + 1000) },
      ]
    },
    {
      type: "line",
      toolTipContent: `Revenue: $${(constants) * (sold)}`,
      dataPoints: [
        { x: 0, y: 0 },
        { x: constants, y: sold },
      ]
    },
    {
      type: "line",
      toolTipContent: `Revenue: $${(parseInt(constants) + 1) * (sold - 1000)}`,
      dataPoints: [
        { x: 0, y: 0 },
        { x: (parseInt(constants) + 1), y: sold - 1000 },
      ]
    }]

  }

  const handleChange = e => {
    if (e.target.checked) {
      setValue(e.target.value)
    }
  }

  for (let i = 1; i <= range; i++) {
    if (((i * Mdemand + Bdemand) * i) >= maxPrice) {
      maxPrice = ((i * Mdemand + Bdemand) * i);
      savePrice = i;
    }
  }


  function calculateOutput() {
    let price = 0;
    var priceOptions = document.getElementsByName("price");

    if (value > 0 && value <= 10) {
      setEdited(true);
    }
    else {
      setEdited(false);
    }


    message = "";

    for (var i = 1; i < priceOptions.length; i++) {
      if (priceOptions[i].checked) {
        price = priceOptions[i].value;
        break;
      }
    }

    consumption = price * Mdemand + Bdemand;
    supply = price * Msupply + Bsupply;
    let revenue = consumption * price;

    if (price == savePrice) {
      message = "This is the equilibrium price"
    }
    else {
      message = "This is not the equilibrium price"
    }
    if (consumption > supply) {
      consumption = supply;
      message = "ABC Company canot make enough XYZ Widgets";
    }

    if (consumption <= 0) {
      consumption = 0;
      message = "No one will buy XYZ Widgets at this price";
    }





    setConstants(value);
    setConsumption(consumption);
    setWidgets(`XYZ Widgets Sold: ${consumption}/month`)
    setRevenue(`Revenue:" ${revenue}/month \n`)
    setAMessage(`${message}`)




  }

  const buildData = () => {

  }

  return (
    <div className='App'>
      <header>
        <h1> XYZ Widget <a href='https://www.investopedia.com/terms/e/equilibrium.asp' target="_blank">Equilibrium</a> Pricing</h1>
      </header>
      <div className="main-app">
        <div className="app-left">
          <div id="intro" className="container">
            <h2>ABC Company Inc. has just invented the XYZ Widget. A revolutionary product that will change the lives of everyone that buys it. In this exercise, you will help ABC Company Inc choose the correct <a href='https://www.investopedia.com/terms/e/equilibrium.asp' target="_blank">equilibrium</a> price for the new product. </h2>
          </div>
          <div id='input' className='container'>
            <form>
              <div className='section'>
                <h4> Price for XYZ Widget: </h4>
                <label>
                  <input type='radio' name='price' value='1' checked={value == 1} onChange={handleChange} />
                  <span>1$</span>
                </label>
                <label>
                  <input type='radio' name='price' value='2' checked={value == 2} onChange={handleChange} />
                  <span>2$</span>
                </label>
                <label>
                  <input type='radio' name='price' value='3' checked={value == 3} onChange={handleChange} />
                  <span>3$</span>
                </label>
                <label>
                  <input type='radio' name='price' value='4' checked={value == 4} onChange={handleChange} />
                  <span>4$</span>
                </label>
                <label>
                  <input type='radio' name='price' value='5' checked={value == 5} onChange={handleChange} />
                  <span>5$</span>
                </label>
                <label>
                  <input type='radio' name='price' value='6' checked={value == 6} onChange={handleChange} />
                  <span>6$</span>
                </label>
                <label>
                  <input type='radio' name='price' value='7' checked={value == 7} onChange={handleChange} />
                  <span>7$</span>
                </label>
                <label>
                  <input type='radio' name='price' value='8' checked={value == 8} onChange={handleChange} />
                  <span>8$</span>
                </label>
                <label>
                  <input type='radio' name='price' value='9' checked={value == 9} onChange={handleChange} />
                  <span>9$</span>
                </label>
                <label>
                  <input type='radio' name='price' value='10' checked={value == 10} onChange={handleChange} />
                  <span>10$</span>
                </label>
              </div>
              <div className='calcButton'>
                <button id='calculate' type='button' value='Calculate' onClick={calculateOutput}>Calculate</button>
              </div>
            </form>
          </div>
          <div id="result" className="container">
            <p className='wid'>{widgets}</p>
            <p className='rev'>{revenue}</p>
            <p className='message'>{aMessage}</p>
          </div>
        </div>
        <div className='app-right'>

          <div className='graphs'>
            {edited ? (
              <CanvasJSChart options={options} />
            ) : (
              <p> Graph cannot be built with the currently selected price. </p>
            )}
            {/* <CanvasJSChart options={options}/> */}
            {/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
          </div>
          <div className='app-data-overall'>
            {tableData.map((item) => {
              if (item.price !== 5) {
                return (
                  <div>
                    <table>

                      <td><strong>Price: </strong>  &nbsp; ${item.price}</td>
                      <td><strong>Sold: </strong>  &nbsp; #{item.amtsold}</td>
                      <td><strong>Revenue: </strong>  &nbsp; ${item.revenue}</td>

                    </table>
                  </div>

                )
              }
              else {
                return (
                  <div>
                    <table className='highlight-price'>

                      <td><strong>Price: </strong>  &nbsp; ${item.price}</td>
                      <td><strong>Sold: </strong>  &nbsp; #{item.amtsold}</td>
                      <td><strong>Revenue: </strong>  &nbsp; ${item.revenue}</td>

                    </table>
                  </div>

                )
              }
            })}
            {/* <div className='app-data'>
              <p>Product Price: </p>
              <p>Amount Sold: </p>
              <p>Revenue: </p>
            </div> */}
          </div>


        </div>
      </div>
    </div>
  );
}

export default App;

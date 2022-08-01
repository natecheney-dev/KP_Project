import logo from './logo.svg';
import './App.css';

var Mdemand = -1000;
var Bdemand = 10000;
var Msupply = 0; // what if ABC can hire more people when price goes up? 
var Bsupply = 8000;
var consumption;
var supply;
var message;
var range = 10;
let maxPrice = 0;
var savePrice = 0;

for (let i = 1; i <= range; i++) {
  if (((i * Mdemand + Bdemand) * i) >= maxPrice) {
    maxPrice = ((i * Mdemand + Bdemand) * i);
    savePrice = i;
  }
  console.log(savePrice);
  console.log(maxPrice);


}



function calculateOutput() {
  let price = 0;
  var priceOptions = document.getElementsByName("price");
  



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

  if (consumption > supply) {
    consumption = supply;
    message = "ABC Company canot make enough XYZ Widgets";
  }

  if (consumption <= 0) {
    consumption = 0;
    message = "No one will buy XYZ Widgets at this price";
  }

console.log(price);
console.log(savePrice);

  if (price == savePrice) {
    message = "This is the equilibrium price"
  }




  document.getElementById("result").innerHTML = "XYZ Widgets sold:" + consumption + "/month<br>Revenue:" + revenue + "/month<br><br>" + message;
}

function App() {
  return (
    <div className="App">
      <div id="intro" className="container">
        <h2>ABC Company Inc. has just invented the XYZ Widget. A revolutionary product that will change the lives of everyone that buys it. In this exercise, you will help ABC Company Inc choose the correct equillibrium price for the new product. </h2>
      </div>
      <div id='input' className='container'>
        <form>
          <div className='section'>
            <h4> Price for XYZ Widget: </h4>

            <input type='radio' name='price' value='1' />
            <label> 1$ </label>

            <input type='radio' name='price' value='2' />
            <label> 2$ </label>

            <input type='radio' name='price' value='3' />
            <label> 3$ </label>

            <input type='radio' name='price' value='4' />
            <label> 4$ </label>

            <input type='radio' name='price' value='5' />
            <label> 5$ </label>

            <input type='radio' name='price' value='6' />
            <label> 6$ </label>

            <input type='radio' name='price' value='7' />
            <label> 7$ </label>

            <input type='radio' name='price' value='8' />
            <label> 8$ </label>

            <input type='radio' name='price' value='9' />
            <label> 9$ </label>

            <input type='radio' name='price' value='10' />
            <label> 10$ </label>
          </div>
          <button id='calculate' type='button' value='Calculate' onClick={calculateOutput}>Calculate</button>
        </form>
      </div>
      <div id="result" className="container">

      </div>
    </div>

  );
}

export default App;

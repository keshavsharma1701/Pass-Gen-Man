const upperSet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
const lowerSet = "abcdefghijklmnopqrstuvwxyz"
const numberSet = "1234567890"
const symbolSet = "~!@#$%^&*()_+/"

const passBox = document.getElementById("pass-box")
const totalChar = document.getElementById("total-char")
const upperInput = document.getElementById("upper-case")
const lowerInput = document.getElementById("lower-case")
const numberInput = document.getElementById("numbers")
const symbolInput = document.getElementById("symbols")

const getRandomData = (dataSet) => {
    return dataSet[Math.floor(Math.random() * dataSet.length)]
}

const generatePassword = (password = "") => {
    if (upperInput.checked) {
        password += getRandomData(upperSet)
    }
    if (lowerInput.checked) {
        password += getRandomData(lowerSet)
    }
    if (numberInput.checked) {
        password += getRandomData(numberSet)
    }
    if (symbolInput.checked) {
        password += getRandomData(symbolSet)
    }
    if (password.length < totalChar.value) {
        return generatePassword(password)
    }

    passBox.innerText = truncateString(password, totalChar.value);
}

generatePassword();

document.getElementById("btn").addEventListener(
    "click",
    function() {
        generatePassword();
    }

)

function truncateString(str, num) {
    if (str.length > num) {
        let subStr = str.substring(0, num);
        return subStr;
    } else {
        return str;
    }
}
function maskPassword(pass){
      let str = ""
      for (let index = 0; index < pass.length; index++) {
          str  += "*"
      }
      return str
  }
  
  function copyText(txt) {
      navigator.clipboard.writeText(txt).then(
          () => {
            /* clipboard successfully set */
            document.getElementById("alert").style.display = "inline"
            setTimeout(() => {
              document.getElementById("alert").style.display = "none"
            }, 2000);
  
          },
          () => {
            /* clipboard write failed */
            alert("Clipboard copying failed")
          },
        );
    }
  
  const deletePassword = (website)=>{
      let data = localStorage.getItem("passwords")
      let arr = JSON.parse(data);
      arrUpdated = arr.filter((e)=>{
          return e.website != website
      })
      localStorage.setItem("passwords", JSON.stringify(arrUpdated))
      alert(`Successfully deleted ${website}'s password`)
      showPasswords()
  
  }
  
  // Logic to fill the table
  const showPasswords = () => {
      let tb = document.querySelector("table")
      let data = localStorage.getItem("passwords")
      if (data == null || JSON.parse(data).length == 0) {
          tb.innerHTML = "No Data To Show"
      }
      else {
          tb.innerHTML =  `<tr>
          <th>Website</th>
          <th>Username</th>
          <th>Password</th>
          <th>Delete</th>
      </tr> `
          let arr = JSON.parse(data);
          let str = ""
          for (let index = 0; index < arr.length; index++) {
              const element = arr[index];
  
              str += `<tr>
      <td>${element.website} <img onclick="copyText('${element.website}')" src="./copy.svg" alt="Copy Button" width="10" height="10">
      </td>
      <td>${element.username} <img onclick="copyText('${element.username}')" src="./copy.svg" alt="Copy Button" width="10" height="10">
      </td>
      <td>${maskPassword(element.password)} <img onclick="copyText('${element.password}')" src="./copy.svg" alt="Copy Button" width="10" height="10">
      </td>
      <td><button class="btnsm" onclick="deletePassword('${element.website}')">X</button></td>
          </tr>`
          }
          tb.innerHTML = tb.innerHTML + str
  
      }
      website.value = ""
      username.value = ""
      password.value = ""
  }
  showPasswords()
  document.querySelector(".managerbtn").addEventListener("click", (e) => {
      e.preventDefault()
      let passwords = localStorage.getItem("passwords")
      if (passwords == null) {
          let json = []
          json.push({website: website.value, username: username.value, password: password.value })
          alert("Password Saved");
          localStorage.setItem("passwords", JSON.stringify(json))
      }
      else {
          let json = JSON.parse(localStorage.getItem("passwords"))
          json.push({ website: website.value, username: username.value, password: password.value })
          alert("Password Saved");
          localStorage.setItem("passwords", JSON.stringify(json))
      }
      showPasswords()
  })
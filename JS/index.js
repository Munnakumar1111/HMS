let allUserInfo = [];
let regForm = document.querySelector(".reg-form");
let loginForm = document.querySelector(".login-form");
let allInput = regForm.querySelectorAll("input");
let alllogInput = loginForm.querySelectorAll("input");
let userInfo = localStorage.getItem("allUserInfo");
let regBtn = regForm.querySelector("button");
let loginBtn = loginForm.querySelector("button");

if (localStorage.getItem("allUserInfo") != null) {
  allUserInfo = JSON.parse(localStorage.getItem("allUserInfo"));
}

regForm.onsubmit = (e) => {
  e.preventDefault();
  let checkEmail = allUserInfo.find((data) => {
    return data.email == allInput[4].value;
  });
  if (checkEmail == undefined) {
    let data = {
      fullname: allInput[0].value,
    };
    for(let el of allInput){
      let key=el.name;
      data[key]=el.value;
    }
    regBtn.innerText = "Processing....";
    setTimeout(() => {
      regBtn.innerText = "Register";
      allUserInfo.push(data);
      localStorage.setItem("allUserInfo", JSON.stringify(allUserInfo));
      swal("Good Job !", "Registration Success !", "success");
    }, 2000);
  } else {
    swal("Failed !", "Email Already Exist !", "warning");
  }
};
//login coding
loginForm.onsubmit = (e) => {
  e.preventDefault();
  if (alllogInput[0].value != "") {
    if (alllogInput[1].value != "") {
      //check in email your data based
      let checkEmail = allUserInfo.find((data) => {
        return data.email == alllogInput[0].value;
      });
      if (checkEmail != undefined) {
        if (checkEmail.password == alllogInput[1].value) {
          loginBtn.innerText="please wait...."
          setTimeout(()=>{
          loginBtn.innerText="Login"
           window.location="profile/profile.html";
           checkEmail.password=null;
          },2000);
          sessionStorage.setItem("__au__",JSON.stringify(checkEmail));
        } else {
          swal("Warning", "Wrong Password....", "warning");
        }
      } else {
        swal("Warning", "Password is Empty....", "warning");
      }
    } else {
      swal("Warning", "Password is Empty....", "warning");
    }
  } else {
    swal("Warning", "Email is Empty....", "warning");
  }
};

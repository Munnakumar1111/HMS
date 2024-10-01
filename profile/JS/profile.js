// 
let userInfo;
let user;
let allBData = [];
let allInHData = [];
let allArchData = [];
let allCashData=[];
let allCashArchData=[];
let navBrand = document.querySelector(".navbar-brand");
let logoutBtn = document.querySelector(".logout-btn");
let bookingForm = document.querySelector(".booking-form");
let inHouseForm = document.querySelector(".inhouse-form");
let inHTextarea = inHouseForm.querySelector("textarea");
let allInHInput = inHouseForm.querySelectorAll("input");
let allBInput = bookingForm.querySelectorAll("input");
let bTextarea = bookingForm.querySelector("textarea");
let modalCBtn = document.querySelectorAll(".btn-close");
let bListTBody = document.querySelector(".booking-list");
let inHListTBody = document.querySelector(".inhouse-list");
let archListTBody = document.querySelector(".archive-list");
let allTabBtn=document.querySelectorAll(".tab-btn");
let inHRegbtn = document.querySelector(".in-house-reg-btn");
let bRegBtn = document.querySelector(".b-register-btn");
let searchEl=document.querySelector(".search-input");
let CashierBtn=document.querySelector(".cashier-tab");
let cashierTab=document.querySelector("#cashier");
let bookingTab=document.querySelector("#booking");
let cashierForm=document.querySelector(".cashier-form");
let cashBtn=document.querySelector(".cash-btn");
let cashierTbody=document.querySelector(".cashier-list");
let cashTotal=document.querySelector(".total");
let closeCashierBtn=document.querySelector(".close-cashier-btn");
let archTotal=document.querySelector(".arch-total");

let cashierArchTbody=document.querySelector(".cashier-arch-list");



let allCInput=cashierForm.querySelectorAll("input");
if (sessionStorage.getItem("__au__") == null) {
  window.location("../index.html");
}
userInfo = JSON.parse(sessionStorage.getItem("__au__"));
navBrand.innerHTML = userInfo.hotalName;
user = userInfo.email.split("@")[0];
logoutBtn.onclick = () => {
  logoutBtn.innerHTML = "Please Wait..."
  setTimeout(() => {
    logoutBtn.innerHTML = "Logout";
    sessionStorage.removeItem("__au__");
    window.location = "../index.html";
  }, 3000)
}
//  getting data from storage
const fetchData = (key) => {
  if (localStorage.getItem(key) != null) {
    const data = JSON.parse(localStorage.getItem(key));
    return data;
  }
  else{
    return [];
  }
}

//formate data
const formatDate=(data,isTime)=>{
  const date =new Date(data);
  let yy=date.getFullYear();
  let mm=date.getMonth()+1;
  let dd=date.getDate();
  let time=date.toLocaleTimeString();
  dd=dd<10?"0"+dd:dd
  mm=mm<10?"0"+mm:mm
  return (`${dd}- ${mm}-${yy} ${isTime ? time : ''}`)
}
//registation coding
const registationFunc=(textarea=null,inputs,array,key)=>{
  let data = {
    notice:textarea && textarea.value,
    createdAt:new Date()
  }
  for (let el of inputs) {
    let key = el.name;
    let value = el.value;
    data[key] = value;
  }
  array.unshift(data);
  localStorage.setItem(key, JSON.stringify(array));
  swal("Good Job", "Booking Data", 'success');
 
}
// show booking data
const ShowData = (element,array,key) => {
  let tmp=key.split("_")[1];
  
  element.innerHTML="";
  array.forEach((item, index) => {
    element.innerHTML += `
  <tr>
      <td class="text-nowrap">${index+1}</td>
      <td class="text-nowrap">${item.location}</td>
      <td class="text-nowrap">${item.roomNo}</td>
      <td class="text-nowrap">${item.fullname}</td>
      <td class="text-nowrap">${formatDate(item.checkInDate)}</td>
      <td class="text-nowrap">${formatDate(item.checkOutDate)}</td>
      <td class="text-nowrap">${item.totalPeople}</td>
      <td class="text-nowrap">${item.mobile}</td>
      <td class="text-nowrap">${item.price}</td>
      <td class="text-nowrap">${item.notice}</td>
      <td class="text-nowrap">${formatDate(item.createdAt,true)}</td>
      <td class="text-nowrap">
        <button class="${tmp == 'allArchData' && 'd-none'} btn p-1 edit-btn px-2 btn-primary">
          <i class="fa fa-edit"></i>
        </button>
        <button class="btn p-1 check-btn px-2 btn-info">
          <i class="fa fa-check text-white"></i>
        </button>
        <button class="btn p-1 del-btn px-2 btn-danger">
          <i class="fa fa-trash"></i>
        </button>
      </td>
  </tr>
`
  });
  deleteDataFunc(element,array,key);
  updateDataFunc(element,array,key);
  checkInAndCheckout(element,array,key);

}

// delete coding
const deleteDataFunc=(element,array,key)=>{
  let alldelBtn=element.querySelectorAll(".del-btn");
alldelBtn.forEach((btn,index)=>{
  btn.onclick=()=>{
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this imaginary file!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        array.splice(index,1);
    localStorage.setItem(key,JSON.stringify(array));
    ShowData(element,array,key);
        swal("Poof! Your imaginary file has been deleted!", {
          icon: "success",
        });
      } else {
        swal("Your imaginary file is safe!");
      }
    });
    
  }
});
}

// edit coding
const updateDataFunc=(element,array,key)=>{
  let allEditBtn=element.querySelectorAll(".edit-btn");
  allEditBtn.forEach((btn,index)=>{
    btn.onclick=()=>{
    let tmp=key.split("_")[1];
    tmp == 'allBData' ? bRegBtn.click() : inHRegbtn.click()
    let allBtn= tmp == 'allBData' 
    ? bookingForm.querySelectorAll("button")
    :inHouseForm.querySelectorAll("button");

    let allInput= tmp == 'allBData' 
    ? bookingForm.querySelectorAll("input")
    :inHouseForm.querySelectorAll("input");

    let textarea= tmp == 'allBData' 
    ? bookingForm.querySelector("textarea")
    :inHouseForm.querySelector("textarea");

    allBtn[0].classList.add("d-none");
    allBtn[1].classList.remove("d-none");

    let obj = array[index];
    allInput[0].value=obj.fullname;
    allInput[1].value=obj.location;
    allInput[2].value=obj.roomNo;
    allInput[3].value=obj.totalPeople;
    allInput[4].value=obj.checkInDate;
    allInput[5].value=obj.checkOutDate;
    allInput[6].value=obj.price;
    allInput[7].value=obj.mobile;
    textarea.value=obj.notice;
    allBtn[1].onclick=()=>{
      let formData={
        notice: textarea.value,
        createdAt : new Date(),
      }
      for(let el of allInput)
      {
       let key = el.name;
       let value = el.value;
       formData[key]=value;
      }
      array[index]=formData;
      let allBtn=bookingForm.querySelectorAll("button");
      allBtn[0].classList.remove("d-none");
      allBtn[1].classList.add("d-none");
      tmp == "allBData" 
      ? bookingForm.reset('')
      :inHouseForm.reset('');

      tmp == "allBData" 
      ? modalCBtn[0].click()
      :modalCBtn[1].click();

      localStorage.setItem(key,JSON.stringify(array));
      ShowData(element,array,key);
    }
    }
  });

}
//check in and check out 

const  checkInAndCheckout =(element,array,key)=>{
  let allCheckBtn=element.querySelectorAll(".check-btn");
  allCheckBtn.forEach((btn,index)=>{
    btn.onclick=()=>{
     let tmp =key.split("_")[1];
     let data = array[index];
     array.splice(index,1);
     localStorage.setItem(key,JSON.stringify(array));
     if(tmp == "allBData")
     {
      allInHData.unshift(data);
      localStorage.setItem(user+"_allInHData",JSON.stringify(allInHData));
      ShowData(element,array,key);
     }
     else if(tmp == "allArchData")
     {
      allBData.unshift(data);
      localStorage.setItem(user+"_allBData",JSON.stringify(allBData));
      ShowData(element,array,key);
     }
     else
     {
      allArchData.unshift(data);
      localStorage.setItem(user+"_allArchData",JSON.stringify(allArchData));
      ShowData(element,array,key);
     }
    }
  })
}

allBData = fetchData(user + "_allBData");
allInHData = fetchData(user + "_allInHData");
allArchData = fetchData(user + "_allArchData");
allCashData = fetchData(user + "_allCashData");
allCashArchData = fetchData(user + "_allCashArchData");



//  start booking coding

bookingForm.onsubmit = (e) => {
  e.preventDefault();
  registationFunc(bTextarea , allBInput,allBData,user+"_allBData");
  bookingForm.reset('');
  modalCBtn[0].click();
  ShowData(bListTBody,allBData,user+"_allBData");
  
}
//start cashier store
cashierForm.onsubmit = (e) => {
  e.preventDefault();
  registationFunc(null,allCInput,allCashData,user+"_allCashData");
  cashierForm.reset('');
  modalCBtn[3].click();
  showCashierFunc();
}
// inhouse booking coding
inHouseForm.onsubmit = (e) => {
  e.preventDefault();
  registationFunc(inHTextarea ,allInHInput,allInHData,user+"_allInHData");
  inHouseForm.reset('');
  modalCBtn[1].click();
  ShowData(inHListTBody,allInHData,user+"_allInHData")
}
const searchFunc=()=>{
  let value = searchEl.value.toLowerCase();
  let tableEl=document.querySelector(".tab-content .search-pane.active");
  let tr=tableEl.querySelectorAll("tbody tr");
  for(let el of tr)
  {
    let srNo=el.querySelectorAll("TD")[0].innerText;
    let location=el.querySelectorAll("TD")[1].innerText;
    let roomNo=el.querySelectorAll("TD")[2].innerText;
    let fullname=el.querySelectorAll("TD")[3].innerText;
    let mobile=el.querySelectorAll("TD")[7].innerText;
    let price=el.querySelectorAll("TD")[8].innerText;
    if(srNo.indexOf(value) != -1)
    {
       el.classList.remove('d-none');
    } 
    else if(location.toLowerCase().indexOf(value) != -1)
    {
      el.classList.remove('d-none');
    }
    else if(roomNo.toLowerCase().indexOf(value) != -1)
    {
      el.classList.remove('d-none');
    }
    else if(fullname.toLowerCase().indexOf(value) != -1)
    {
      el.classList.remove('d-none');
    }
    else if(mobile.toLowerCase().indexOf(value) != -1)
    {
      el.classList.remove('d-none');
    }
    else if(price.toLowerCase().indexOf(value) != -1)
    {
      el.classList.remove('d-none');
    }
    else{
      el.classList.add('d-none');

    }
  }


}
//search section
searchEl.oninput=()=>{
  searchFunc();
}
//refersh ui data coding
for(let btn of allTabBtn)
{
  btn.onclick=()=>{
    ShowData(bListTBody,allBData,user+"_allBData");
    ShowData(inHListTBody,allInHData,user+"_allInHData");
    ShowData(archListTBody,allArchData,user+"_allArchData");

  }
}


ShowData(bListTBody,allBData,user+"_allBData");
ShowData(inHListTBody,allInHData,user+"_allInHData");
ShowData(archListTBody,allArchData,user+"_allArchData");
//cashier show
const showCashierFunc=()=>{
  let totalAmount=0;
  cashierTbody.innerHTML='';
  allCashData.forEach((item,index)=>{
    totalAmount +=Number( item.amount)
    cashierTbody.innerHTML += `
    <tr>
    <td>${index+1}</td>
    <td>${item.roomNo}</td>
    <td>${item.cashierName}</td>
    <td>${formatDate(item.createdAt)}</td>
    <td>${item.amount}</td>
     </tr>
    `
  })
  cashTotal.innerHTML="<i class='fa fa-rupee'></i> "+totalAmount;
}
showCashierFunc();
//all archive cash
const showCashFunc=()=>{
  let totalAmount=0;
  cashierTbody.innerHTML='';
  allCashData.forEach((item,index)=>{
    totalAmount +=Number( item.amount)
    cashierTbody.innerHTML += `
    <tr>
    <td>${index+1}</td>
    <td>${item.roomNo}</td>
    <td>${item.cashierName}</td>
    <td>${formatDate(item.createdAt)}</td>
    <td>${item.amount}</td>
     </tr>
    `
  })
  cashTotal.innerHTML="<i class='fa fa-rupee'></i> "+totalAmount;
}
showCashierFunc();


// cashier delete coding
cashBtn.onclick=()=>{
  allCInput[2].value=sessionStorage.getItem("c_name");
  
}
CashierBtn.onclick=()=>{
  if(sessionStorage.getItem("c_name") == null)
  {
    let name=window.prompt("Enter Your Name !");
    if(name)
    {
       sessionStorage.setItem("c_name",name);
    }
    else{
      allTabBtn[0].classList.add("active");
      bookingTab.classList.add("active");
      CashierBtn.classList.remove("active");
      cashierTab.classList.remove("active");
    }
  }
  else
  {
    allCInput[2].value=sessionStorage.getItem("c_name");
  }
}

//close cashier

closeCashierBtn.onclick=()=>{
  if(allCashData.length > 0)
  {
    let data ={
      cashierName :sessionStorage.getItem("c_name"),
      total : cashTotal.innerText,
      createdAt :new Date()
    }
    allCashArchData.push(data);
    allCashData=[];
    localStorage.removeItem(user+"_allCashData");
    localStorage.setItem(user+"_allCashArchData",JSON.stringify(allCashArchData));
    showCashierFunc();
  }
  else
  {
    swal('Warning',"There no cash to close",'warning')
  }
}

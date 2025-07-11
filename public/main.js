//navigation changer 
window.addEventListener('scroll',()=>{
     document.querySelector('nav').classList.toggle('window-scroll',window.scrollY>100)
})

//show and hide text 

const togglebtn=document.querySelectorAll('.togglebtn');
const content=document.querySelectorAll('.content');
const less=document.querySelectorAll('.less');
const more=document.querySelectorAll('.more');

togglebtn.forEach((button,index)=>{
    button.addEventListener('click',function(){
        if(content[index].style.display==='none'){
            content[index].style.display='block';
            more[index].style.display="none";
            less[index].style.display="block";
        }else{
            content[index].style.display='none';
            more[index].style.display="block";
            less[index].style.display="none";
        }
});
});



//show and hide of navmenu
const menu=document.querySelector(".nav-menu");
const menubtn=document.querySelector("#open-menu-btn");
const closebtn=document.querySelector("#close-menu-btn");

menubtn.addEventListener('click',()=>{
    menu.style.display="flex";
    closebtn.style.display="inline-block";
    menubtn.style.display="none";
})

//close nav menu
const closenav=()=>{
    menu.style.display="none";
    closebtn.style.display="none";
    menubtn.style.display="inline-block";
}

closebtn.addEventListener('click',closenav);

function downloadPDF(){
    var link=document.getElementById("pdf");
    link.download();
}


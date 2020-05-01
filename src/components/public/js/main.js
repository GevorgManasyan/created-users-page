// alert()
document.getElementById('save').addEventListener('click', function(){
	let name=document.getElementById('name').value;
	let surName=document.getElementById('surName').value;
	let birthday=document.getElementById('birthday').value;
	let gender=document.getElementById('gender').value;
	let phone=document.getElementById('phone').value;
	axios({
		url:"/Update",
		method:"post",
		data:{userName:name,
			userSurName:surName,
			userBirthday:birthday,
			userGender:gender,
			userPhone:phone
		}
	}).then((result)=>{
		document.getElementById("anotherDiv").innerHTML=''
		if(result.data.errors){
		     result.data.errors.forEach( (e) =>{
		     	console.log(e.msg)
		     	let div=document.getElementById("anotherDiv");
		     	let err=document.createElement("p");
		     	err.innerHTML=e.msg;
		     	div.appendChild(err)
		     });
		}
		else{
			$('#myModal').modal('hide');

		}
	}).catch((error)=>{

	})
	
	
})
// alert()
document.getElementById('search').addEventListener('input', function(){
 let s=this.value;
 console.log(s)
 if(s!=""){
 	axios({
 		url:"/search",
 		method:"post",
 		data:{sear:s}
 	}).then((result)=>{
 		console.log(result.data)
if(document.querySelector('.searcht'))
 	{	

          document.querySelectorAll('.searcht').forEach((e)=>{

 		e.remove()
          })
 	}
       result.data.forEach((e)=>{
			 let res=document.getElementById('searchResult');
			 let div=document.createElement("div");
			 div.setAttribute('class', 'searcht')

			 let resLink=document.createElement("a");
			 resLink.setAttribute('target', 'blanck')
			 resLink.setAttribute('href', `/users/${e.id}`)
			
		  let resUser=document.createElement("p");
		  resUser.style.cursor="pointer";
          console.log(e)
		  resUser.innerHTML=e.name+ " " + e.surName;


     
		  resLink.appendChild(resUser);



          div.appendChild(resLink);


          if(e.status=="friend che"){
			 let button=document.createElement("button");
		     button.innerHTML='Add';
			 // button.setAttribute('class', 'add')
			 // button.setAttribute('data-id', e.id)
			 button.addEventListener("click",function(){
			 	axios({
					 url:"/addFriend",
					 method:"post",
					 data:{id:e.id}
				 }).then((result)=>{
				//   button.parent().remove();
				div.parentNode.removeChild(div);
				 }).catch((error)=>{})
			 })
             div.appendChild(button);
     }
     else if(e.status=="friend e"){
     	let button=document.createElement("button");
		     button.innerHTML='Delete';
			//  button.setAttribute('class', 'Delete')
			//  button.setAttribute('data-id', e.id)
			button.addEventListener("click",function(){
				axios({
					url:"/deleteFriend",
					method:"post",
					data:{id:e.id}
				}).then((result)=>{
				//  button.parent().remove();
				div.parentNode.removeChild(div);
				}).catch((error)=>{})
			})
             div.appendChild(button);
     }
     else if(e.status=="es em uxarkel"){
     	let button=document.createElement("button");
		     button.innerHTML='Heracnel';
			 button.setAttribute('class', 'Reject')
			 button.setAttribute('data-id', e.id)
             div.appendChild(button);
     }
     else if(e.status=="inqn e uxarkel"){
     	let buttonAdd=document.createElement("button");
		     buttonAdd.innerHTML='Add Friend';
			 buttonAdd.setAttribute('class', 'Accept')
			 buttonAdd.setAttribute('data-id', e.id)
		let buttonRej=document.createElement("button");
		     buttonRej.innerHTML='Reject';
			 buttonRej.setAttribute('class', 'Reject')
			 buttonRej.setAttribute('data-id', e.id)
             div.appendChild(buttonAdd);
             div.appendChild(buttonRej);
     }


          res.appendChild(div);
       })
       
 	}).catch((error)=>{})
 }
 else{
 	if(document.querySelector('.searcht'))
 	{	

          document.querySelectorAll('.searcht').forEach((e)=>{

 		e.remove()
          })
 	}
 }
})

function ShowFriends(e){
	console.log(e);
   axios({
	   url:'/friends',
	   method:'post',
	   data:{userId:e}
   }).then((result)=>{
	  console.log(result)
	  console.log(result.data[0].image)
	  document.getElementById('friends').innerHTML="";
	result.data.forEach((e)=>{
		let friendDiv=document.getElementById('friends');
		friendDiv.style.border="1px solid blue";
		let ul=document.createElement("ul");
		let li1=document.createElement("li");
		li1.style.listStyleType="none";
		let div=document.createElement("div");
		let a=document.createElement("a");
		let img=document.createElement("img");
		let p=document.createElement("p");
		// img.style.backgroundImage='url('+e.image+')';
		img.setAttribute("src", '/'+e.image)
		img.style.width="30px";
		img.style.height="30px";
		p.innerHTML=e.name+" "+e.surName;
		
		a.appendChild(img);
		a.appendChild(p);
		
		div.appendChild(a);
		li1.appendChild(div);
		ul.appendChild(li1);
		friendDiv.appendChild(ul)

	})
   }).catch((error)=>{})
}

function ShowRequests(){

}

document.getElementById("request").addEventListener("click",()=>{
	axios({
		url:"/requests",
		method:"post",
		data:""
	}).then((result)=>{
       // console.log(result)
       document.getElementById("request").innerHTML="";
       result.data.forEach((e)=>{
       let div=document.getElementById("request2");
       let img=document.createElement("img");
       let p=document.createElement("p");
       img.setAttribute("src",'/'+e.image);
       img.style.width="30px";
		img.style.height="30px";
	   p.innerHTML=e.name+" "+e.surName;
	   
	   let accept=document.createElement("button");
		let reject=document.createElement("button");
        accept.innerHTML="Accept";
        reject.innerHTML="Reject";
        accept.setAttribute("data-id",e.id)
        reject.setAttribute("data-id",e.id);
        ///

        accept.addEventListener('click',function(){
        	// console.log(this.getAttribute('data-id'))
        	axios({
        		url:"/accept",
        		method:"post",
        		data:{id:this.getAttribute('data-id')}
        	}).then((result)=>{
               console.log(result)
        	}).catch((error)=>{

        	})
        })
        ///
        reject.addEventListener('click',function(){
			// console.log(this.getAttribute('data-id'))
        	axios({
        		url:"/reject",
        		method:"post",
        		data:{id:this.getAttribute('data-id')}
        	}).then((result)=>{
               console.log(result)
        	}).catch((error)=>{

        	})
        // })
        })
        ///


       
       div.appendChild(p)
	   div.appendChild(img)
	   div.appendChild(accept);
	   div.appendChild(reject);
       })
       


	}).catch((error)=>{})
})

function ProfImage(){
	document.getElementById("profImageForm").style.display="block";
}
function hideProfImageForm(){
	document.getElementById("profImageForm").style.display="none";
}














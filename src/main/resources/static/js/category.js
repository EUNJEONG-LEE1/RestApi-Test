/**
 * 
 */
 
 let selectedCode ="";
 let selectedCodeName = "";
 let searchValue =";"
 function getListCategory(){
	
	$("#searchValue")[0].value="";
	
	$.ajax({
		type:"GET",
		url:"/category",
		contentType: "application/json; charset=UTF-8",
		success: function(data) {
			//console.log(data);
			if(data.length>0){
				selectedCode = "";
				makeCategoryHtml(data);
			}else{
				$("#getCategoryList")[0].innerHTML="";
			}

		},
		error: function(xhr) {
			console.log("error : " + xhr );
		}
	});
}


function makeCategoryHtml(data){
	
	$("#getCategoryList")[0].innerHTML="";
	
 	let dept1_1= "<div class='depth1 dept1_"; //대분류 코드
 	let depth1_2 = "'><div class='depth1TextDiv'><a class='depth1Text depth1Text_";//대분류 코드 	
 	let depth1_2_3 = "&quot,&quot;";//대분류명
 	let depth1_3 = "' href='javascript:void(0);'>"; //대분류명
 	let depth1_3_btn_1="<a class='btn1Left' href='javascript:editCategory1depth(&quot;"; //대분류 아이디
 	let depth1_3_btn_2="&quot;,&quot;"; //대분류 코드
 	let depth1_3_btn_3="&quot;)'>수정</a><a class='btn1Right' href='javascript:deleteCategory1depth(&quot;"; // 대분류 아이디 	
 	let depth1_3_btn_4="&quot;,&quot;";//대분류 코드
 	let depth1_3_btn_5 ="&quot;)'>삭제</a>";
 	let depth1_4 = "</div></div><div class='depth1End'><a href='javascript:addCategory(&quot;";//대분류코드
 	let depth1_5 = "&quot,2);'>+</a></div>";	

	let dept2_1="<div class='depth2TextDiv'><span class='depth2Text depth2Text_";//중분류 코드
 	let dept2_2 = "'><input type='text' id='textCateId_";//아이디
 	let dept2_2_2 = "' value='"; //중분류명
 	let dept2_3 ="' /></span><span class='btnBox'><a href='javascript:editCategory2depth(&quot;";//중분류 아이디
 	let dept2_4="&quot)'>수정</a><a href='javascript:deleteCategory2depth(&quot;";//중분류 아이디
 	let dept2_5="&quot)'>삭제</a></span></div>";
	
 	
	for(i=0; i<data.length; i++){
		let id= data[i].id;
		let code =  data[i].code;
		let name = data[i].name;
		let pcode =  data[i].pcode;
		let depth1Html = dept1_1+code+depth1_2+code
						//+depth1_2_2+code+depth1_2_3+name
						+depth1_3+name
						+depth1_3_btn_1+id+depth1_3_btn_2+code+depth1_3_btn_3+id+depth1_3_btn_4+code+depth1_3_btn_5				
						+depth1_4+code+depth1_2_3+name+depth1_5;
		//console.log(depth1Html);

		if(data[i].depth==1){
		
			$("#getCategoryList")[0].innerHTML += depth1Html;
		
		}else if(data[i].depth==2){

			let depth2Html =  dept2_1+code+dept2_2+id+dept2_2_2+name+dept2_3+id+dept2_4+id+dept2_5;
				
			if((searchValue!="")&&($(".dept1_"+pcode).length==0)){
				//검색결과 depth2 
				$("#getCategoryList")[0].innerHTML +=depth2Html;	
			}else{

				$(".dept1_"+pcode)[0].innerHTML +=depth2Html;
				
			}
				
			
		}
		
	}
}


//카테고리 검색
function searchCategory(){
	
	let searchVal=$("#searchValue")[0].value;
	
	if(searchVal.trim()==""){
		swal("검색어를 입력하세요");
		return false;
	} else {
		
		$.ajax({
			type:"GET",
			url:"/category/search/"+searchVal,
			contentType: "application/json; charset=UTF-8",
			success: function(data) {
				console.log(data);
				if(data.length>0){
					makeCategoryHtml(data);	
					searchValue = searchVal;
				}else{
					$("#getCategoryList")[0].innerHTML="검색된 카테고리가 없습니다";
				}
			},
			error: function(xhr) {
				console.log("error : " + xhr );
			}
		});
	}
	
}


// 수정 - 1depth
function editCategory1depth(id, code){
	
	let editName = $(".depth1Text_"+code)[0].innerText;
	
	swal({
	  title:"카테고리를 수정 하겠습니까?",
	  text: editName,
	  icon: "warning",
	  buttons: true,
	  dangerMode: true,
	})
	.then((edit) => {
	  if (edit) {
		
		swal({
		  text: "수정할 카테고리명을 입력하세요",
		  content: "input",
		})
		.then(name => {
		  	//if (!name) throw null;
		  	if((name==null)||(name.trim()=="")){
		 		swal("error","카테고리명을 입력하세요","error");	
				return false;
			}
			editName = name;
			
			$.ajax({
				type:"PUT",
				url:"/category/edit/"+id,
				data : editName,
				contentType: "application/json; charset=UTF-8",
				success: function(data) {
					getListCategory();				
					swal("수정 완료!", " ", "success");
				},
				error: function(xhr) {
					console.log("error : " + xhr );
				}
			});
		
		})
		
	  }

	});
	
}

// 수정 - 2depth
function editCategory2depth(id){
	let editName = $("#textCateId_"+id).val();
	
	swal({
	  title: "카테고리명을 수정하겠습니까?",
	  text: editName,
	  icon: "warning",
	  buttons: true,
	  dangerMode: true,
	})
	.then((edit) => {
	  if (edit) {

		$.ajax({
			type:"PUT",
			url:"/category/edit/"+id,
			data : editName,
			contentType: "application/json; charset=UTF-8",
			success: function(data) {
				//console.log(data);
				getListCategory();
				swal("수정 완료!", " ", "success");
			},
			error: function(xhr) {
				console.log("error : " + xhr );
			}
		});	

	  }

	});

}


function deleteCategory1depth(id, code){
	
	let editName = $(".depth1Text_"+code)[0].innerText;
	
	swal({
	  title: "카테고리를 삭제 하겠습니까?",
	  text: editName,
	  icon: "warning",
	  buttons: true,
	  dangerMode: true,
	})
	.then((del) => {
	  if (del) {

		$.ajax({
			type:"DELETE",
			url:"/category/delete1Depth",
			data: JSON.stringify({
				"id" : id,
				"pcode" : code,
	   		}),
			contentType: "application/json; charset=UTF-8",
			success: function(data) {
				//console.log(data);
				swal("삭제 완료!", " ", "success");
				getListCategory();

			},
			error: function(xhr) {
				console.log("error : " + xhr );
			}
		});
		
	  }

	});
	
}




//삭제 - 2dpeth
function deleteCategory2depth(id){

	let editName = $("#textCateId_"+id).val();
	
	swal({
	  title: "카테고리를 삭제 하겠습니까?",
	  text: editName,
	  icon: "warning",
	  buttons: true,
	  dangerMode: true,
	})
	.then((del) => {
	  if (del) {

		$.ajax({
			type:"DELETE",
			url:"/category/"+id,
			contentType: "application/json; charset=UTF-8",
			success: function(data) {
				console.log(data);
				getListCategory();					
				swal("삭제 완료!", " ", "success");
			},
			error: function(xhr) {
				console.log("error : " + xhr );
			}
		});
		
	  }

	});

}


//카테고리 추가 
function addCategory(pcode, pname, depth){
	let name = "";
	if(depth==2){
		name=pname;
	}
	swal({
	  title:"카테고리를 추가 하겠습니까?",
	  text: name,
	  icon: "warning",
	  buttons: true,
	  dangerMode: true,
	})
	.then((add) => {
	  if (add) {
		swal({
		  text: "추가할 카테고리명을 입력하세요",
		  content: "input",
		})
		.then(name => {
		  	//if (!name) throw null;
		  	if((name==null)||(name.trim()=="")){
		 		swal("error","카테고리명을 입력하세요","error");	
				return false;
			}
  
	  		if(depth==2){
		  		selectMaxSortDepth2(pcode, name);
		
			} else if (depth==1){
		  		selectMaxSortDepth1(name);			
			}
  		
		})
	  }

	});

}

function selectMaxSortDepth1(name){

	$.ajax({
		type:"get",
		url:"/category/selectMaxSort",
		contentType: "application/json; charset=UTF-8",
		success: function(data) {
			//console.log(data);
			if(data!=""){		
				insertCategory1Depth(name, data+1);
			}else{
				insertCategory1Depth(name, 1);
			}
			
		}
	});	
}


function selectMaxSortDepth2(pcode, name){

	$.ajax({
		type:"get",
		url:"/category/selectMaxSort/"+pcode,
		contentType: "application/json; charset=UTF-8",
		success: function(data) {
			//console.log(data);
			if(data!=""){		
				insertCategory2Depth(pcode, name, data+1);
			}else{
				insertCategory2Depth(pcode, name, 1);
			}
			
		}
	});

}

function insertCategory1Depth(name, sort){
	$.ajax({
		type:"PUT",
		url:"/category/add",	
		data: JSON.stringify({
				"code" : "cate"+sort,
				"name" : name,
				"depth" : 1,
				"pcode" : "",
				"sort" : sort,
				"display" : "Y"
   		}),
		contentType: "application/json; charset=UTF-8",
		success: function(data) {
			console.log("추가된 1depth 카테고리 id : "+data);
			getListCategory();
			
			swal("추가 완료!", " ", "success");
		},
		error: function(xhr) {
			console.log("error : " + xhr );
		}
	});

}


function insertCategory2Depth(pcode, name, sort){

	$.ajax({
		type:"PUT",
		url:"/category/add",
		data: JSON.stringify({
				"code" : pcode+"_"+sort,
				"name" : name,
				"depth" : 2,
				"pcode" : pcode,
				"sort" : sort,
				"display" : "Y"
   		}),
		contentType: "application/json; charset=UTF-8",
		success: function(data) {
			console.log("추가된 2dpeth 카테고리 id : "+data);
			getListCategory();
			swal("추가 완료!", " ", "success");
		},
		error: function(xhr) {
			console.log("error : " + xhr );
		}
	});


}


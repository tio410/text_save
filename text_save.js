$(function() {
	document.onkeydown=keys;
	var path_name = window.location.pathname;
	var search_name = location.search;
	local_name = path_name + search_name;

	function keys(){
		switch (event.keyCode){
			//localstorageの表示
			case 73: // Ctrl + I
			if( event.ctrlKey ){
				on_view();
			//	alert("表示");
			　　　　return false;
			}
			break;
		}
	}

	//ダイアログを表示
	function on_view(){
		var newWindow;
		//モータルで新しいウィンドウをを表示する。第二引数は値渡し。
		newWindow=window.showModalDialog("dialog.html",local_name,"dialogHeight:250px; dialogWidth:360px; scroll:0; status:0; resizable:0"); 　

		//ダイアログで選択されたIDとパスワード受け取り、テキストに代入する。
		if (typeof(newWindow)!="undefined") { //ダイアログボックスで｢キャンセル時｣の処置(変数の存在チェック)
			document.all.ad_key.value = newWindow.key;//カスタマイズ
			document.all.ad_passwd.value = newWindow.pass;//カスタマイズ
		}
	}

	//送信された場合の処理
	$("[type='submit']").click(function(e){
		var Obj = new Object();
		
		var key = $("#ad_key").val();//カスタマイズ
		var pass = $("#ad_passwd").val();//カスタマイズ
		var num;
		var storage_Data = JSON.parse(localStorage.getItem(local_name));
	
		if(storage_Data){
			var count = Object.keys(storage_Data).length;
			for(var i=0;i<=count;i++){
				if(i<count){
					Obj[i] ={};
					Obj[i]['key'] =	storage_Data[i]['key'];
					Obj[i]['pass']=	storage_Data[i]['pass'];
					Obj[i]['num']=	storage_Data[i]['num']+1;
				}
				else{
					Obj[i] ={};
					Obj[i]['key'] =key;
					Obj[i]['pass']=pass;
					Obj[i]['num']=1;
				}
			}
		}
		else{
			Obj[0] ={};
			Obj[0]['key'] =key;
			Obj[0]['pass']=pass;
			Obj[0]['num']=1;
		}
		localStorage.setItem(local_name,JSON.stringify(Obj));
	});
});

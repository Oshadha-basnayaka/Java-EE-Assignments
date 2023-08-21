getAllItems();

$("#btnGetAllItems").click(function () {
    getAllItems();
});

function getAllItems(){
    $("#tblItem").empty();
    $.ajax({
        url: "item",
        dataType:"json",
        method: "get",
        success: function (items) {
            for (let i in items) {
                console.log(items[i]);

                let item = items[i];
                let code = item.code;
                let description = item.itemName;
                let qtyOnHand = item.qty;
                let unitPrice = item.unitPrice;
                let row=`<tr><td>${code}</td><td>${description}</td><td>${qtyOnHand}</td><td>${unitPrice}</td></tr>`;
                $("#tblItem").append(row);
            }
        },
        error:function(error){
            console.log(error);
            alert(error.responseJSON.message);
        }
    });
}

$("#btnItem").click(function (){
    let formData=$("#itemForm").serialize();
    $.ajax({
        url:"item",
        method:"post",
        data:formData,
        success:function (res){
            console.log(res);
            alert(res.message);
            getAllItems();
        },
        error:function (error){
            console.log(error.responseJSON);
            alert(error.responseJSON.message);
        }
    });
});

$("#btnItemDelete").click(function (){
    let formData=$("#itemForm").serialize();
    $.ajax({
        url:'item?id='+id,
        method:'delete',
        data:formData,
        success:function (res){
            console.log(res);
            alert(res.message);
            getAllItems();
        },
        error:function (error){
            console.log(error.responseJSON);
            alert(error.responseJSON.message);
        }
    });
});



$("#btnUpdate").click(function (){
    //  let formData=$("#customerForm").serialize();

    let id = $('#txtCustomerID').val();
    let name = $('#txtCustomerName').val();
    let address = $('#txtCustomerAddress').val();

    let item={
        "code" : id ,
        "name" : name,
        "address" :address
    }

    $.ajax({
        url:'item',
        method:'put',
        contentType: "application/json",
        data:JSON.stringify(item),

        success:function (res){
            console.log(res);
            alert(res.message);
            getAllCustomers();
        },
        error:function (error){
            console.log(error.responseJSON);
            alert(error.responseJSON.message);
        }
    });
});
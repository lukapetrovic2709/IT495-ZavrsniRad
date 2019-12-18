<!DOCTYPE html>
<html xmlns:th="http://www.thymeleaf.org">
<head>
    <meta charset="UTF-8" />
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
</head>

<body style="text-align:center">
<div
        class="bordered"
        style=" max-width: 1000px;
            max-height: 800px;
            padding: 30px;
            border: 1px solid #91917f;
            border-radius: 8px;
            color: black;
            display: block;
            margin: auto;"
>
    <img
            id="donation"
            src="https://www.brandcrowd.com/gallery/brands/pictures/picture13855048995094.png"
            width="170"
            height="100"
    />
    <br />
    <br />
    <h3>Purchase Report</h3>
    <hr />
    <p style="font-size: 22px">User Info</p>
    <div style="line-height: 8px">
        <p><strong>Name: </strong>${name}</p>
        <p><strong>Email: </strong>${email}</p>
        <p><strong>Address: </strong>${address}</p>
        <p><strong>Postcode: </strong>${postcode}</p>
        <p><strong>Phone: </strong>${phone}</p>
    </div>
    <hr />
    <p style="font-size: 22px">Purchase details</p>
    <div>
        <p style="margin-bottom: 40px"><strong>Date: </strong>${purchaseDate}</p>
        <table style="width:80%; margin-bottom: 30px; margin: 0 auto; border:2px solid gray">
            <tr>
                <th style="border-bottom:1px solid gray; border-right:1px solid gray">Shoe name</th>
                <th style="border-bottom:1px solid gray;border-right:1px solid gray">Size</th>
                <th style=" border-bottom:1px solid gray ">Price</th>
                <th style=" border-bottom:1px solid gray;border-right:1px solid gray">Quantity</th>
            </tr>
            <#foreach item in items>
                <tr>
                    <td style=" border-right:1px solid gray ">${item.shoe.name}</td>
                    <td style=" border-right:1px solid gray ">${item.size}</td>
                    <td style=" border-right:1px solid gray ">${item.shoe.price}</td>
                    <td style=" border-right:1px solid gray ">${item.quantity}</td>
                </tr>
            </#foreach>
        </table>

        <p style="color:#52a367; padding-top: 15px;"><strong>Total Price: </strong>${totalPrice}</p>
    </div>
    <br />
    <hr />
</div>
</body>
</html>

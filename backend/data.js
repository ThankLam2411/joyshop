import bcrypt from "bcryptjs";
// const data={
//     products:[
//         {
//             id:'1',
//             product_name:'Son YSL 219',
//             category:'Son',
//             image:'/images/YSL_son_1.jpg',
//             countInStock: 12,
//             old_price:25,
//             price:19,
//             brand_name:'YSL',
//             rating: 4.5,
//             numReviews:10,
//             product_description: 'Son YSL 219 Màu Đỏ Đậm Rouge Tatouage là cái tên nổi bật đến từ dòng son YSL Rouge Pur Couture The Mats chất matte xếp vào hàng “có tên có tuổi” trên thị trường son môi. Biết bao trái tim phái đẹp ước ao được sở hữu thỏi son ấn tượng này. Mang những nét “tuyệt mĩ” từ hình thức đến chất lượng bên trong, son YSL màu 219 Màu Đỏ Đậm Rouge Tatouage thôi miên hết thảy từ ngay cái nhìn đầu tiên.'
            

//         },
//         {
//             id:'2',
//             product_name:'Son YSL Rouge Pur Couture The Slim 28 True Chili',
//             category:'Son',
//             image:'/images/YSL_son_2.jpg',
//             countInStock: 15,
//             old_price: 25,
//             price:19,
//             brand_name:'YSL',
//             rating: 5,
//             numReviews:10,
//             product_description: 'Son YSL 219 Màu Đỏ Đậm Rouge Tatouage là cái tên nổi bật đến từ dòng son YSL Rouge Pur Couture The Mats chất matte xếp vào hàng “có tên có tuổi” trên thị trường son môi. Biết bao trái tim phái đẹp ước ao được sở hữu thỏi son ấn tượng này. Mang những nét “tuyệt mĩ” từ hình thức đến chất lượng bên trong, son YSL màu 219 Màu Đỏ Đậm Rouge Tatouage thôi miên hết thảy từ ngay cái nhìn đầu tiên.'
            

//         },
//         {
//             id:'3',
//             product_name:'Son Thỏi Yves Saint Laurent Rouge Pur Conture  ',
//             category:'Son',
//             image:'/images/YSL_son_3.jpg',
//             countInStock: 20,
//             old_price: 40,
//             price:25,
//             brand_name:'YSL',
//             rating: 5,
//             numReviews:10,
//             product_description: 'Son YSL 219 Màu Đỏ Đậm Rouge Tatouage là cái tên nổi bật đến từ dòng son YSL Rouge Pur Couture The Mats chất matte xếp vào hàng “có tên có tuổi” trên thị trường son môi. Biết bao trái tim phái đẹp ước ao được sở hữu thỏi son ấn tượng này. Mang những nét “tuyệt mĩ” từ hình thức đến chất lượng bên trong, son YSL màu 219 Màu Đỏ Đậm Rouge Tatouage thôi miên hết thảy từ ngay cái nhìn đầu tiên.'
            

//         },
//         {
//             id:'4',
//             product_name:'Son YSL Pink In Devotion',
//             category:'Son',
//             image:'/images/YSL_son_5.jpg',
//             countInStock: 25,
//             old_price: 25,
//             price:20,
//             brand_name:'YSL',
//             rating: 4.5,
//             numReviews:10,
//             product_description: 'Thuộc dòng son dưỡng có màu, YSL Rouge Volupte Shine không những sở hữu chất son mềm mịn chứa thành phần dưỡng tối ưu cho đôi môi căng mọng đầy sức sống, son lên màu cực đẹp và sắc nét cho bạn vẻ đẹp hiện đại năng động, đầy sức sống.'            

//         },  
//         {
//             id:'5',
//             product_name:'Nước Hoa Nữ Yves Saint Laurent Libre EDP 90ml',
//             category:'Nước hoa',
//             image:'/images/YSL_nuochoa_1_1.jpg',
//             countInStock: 16,
//             old_price: 150,
//             price:109,
//             brand_name:'YSL',
//             rating: 3,
//             numReviews:10,
//             product_description: 'Sang trọng, quyến rũ, ngọt ngào'
            

//         },
//         {
//             id:'6',
//             product_name:'Nước Hoa Nữ Yves Saint Laurent Libre EDP 90ml',
//             category:'Nước Hoa',
//             image:'/images/YSL_nuochoa_2.jpg',
//             countInStock: 10,
//             old_price: 150,
//             price:109,
//             brand_name:'YSL',
//             rating: 4.8,
//             numReviews:10,
//             product_description: 'Sang trọng, quyến rũ, ngọt ngào'
            

//         },
    
//         {
//             id:'7',
//             product_name:'Nước hoa YSL Y Men - EDP 100ml ',
//             category:'Nước hoa',
//             image:'/images/YSL_nuochoa_3.jpg',
//             countInStock: 24,
//             old_price: 150,
//             price:109,
//             brand_name:'YSL',
//             rating: 5,
//             numReviews:10,
//             product_description: 'YSL Y Men EDP được giới thiệu lần đầu vào tháng 9 năm 2018, với thông điệp là một người đàn ông mặc sơ mi trắng cùng áo khoác màu đen, nam tính, mạnh mẽ và cuốn hút. Yves Saint Laurent Y thể hiện sự cân bằng giữa những nốt hương mạnh mẽ và nhẹ nhàng, nồng nàn và tươi mát.            '
//         },
//         {
//             id:'8',
//             product_name:'Túi xách YSL ',
//             category:'phụ kiện',
//             image:'/images/YSL_tui_1.jpg',
//             countInStock: 0,
//             old_price: 150,
//             price:109,
//             brand_name:'YSL',
//             rating: 5,
//             numReviews:10,
//             product_description: 'YSL Y Men EDP được giới thiệu lần đầu vào tháng 9 năm 2018, với thông điệp là một người đàn ông mặc sơ mi trắng cùng áo khoác màu đen, nam tính, mạnh mẽ và cuốn hút. Yves Saint Laurent Y thể hiện sự cân bằng giữa những nốt hương mạnh mẽ và nhẹ nhàng, nồng nàn và tươi mát.            '
//         },

//     ]
// }
// export default data;
const data ={
    user:[
        {
            user_name:'lam',
            user_email:'lam@gmail.com',
            user_password:bcrypt.hashSync('1234',8),
            user_phone:'0987654212',
            user_address:'Ha noi',
            isAdmin:true,
            isUser: false,
        },
        {
            user_name:'luong',
            user_email:'luong@gmail.com',
            user_password:bcrypt.hashSync('1234',8),
            user_phone:'099988776644',
            user_address:'Ha noi',
            isAdmin:false,
            isUser: true,
        },

    ]
}
export default data;
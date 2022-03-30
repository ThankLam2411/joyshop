import db from "../config/database.js";

export default async function create_detail(orderItems){
    const result = await db.query(
        `INSERT INTO orderDetail
        (name, qty, image, price, product_id, order_id)
        VALUES
        (${orderItems.product_name},${orderItems.qty}, ${orderItems.price}, ${orderItems.product_id},${order.id})
        `
    );
    
    let message = 'Error in creating programming language';

    if (result.affectedRows) {
        message = 'Programming language created successfully';
    }

    return {message};
};
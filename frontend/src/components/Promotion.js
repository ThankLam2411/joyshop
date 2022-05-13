import {Link} from 'react-router-dom';
const Promotion =()=>{
    return(
        <div className="promotion">
        <div className="row">
          <div className="col-4 col-md-12 col-sm-12">
            <div className="promotion-box">
              <div className="text">
                <h3>YSL</h3>
                <Link to={`/listproduct/1`} className="btn-flat btn-hover"><span>bộ sưu tập</span></Link>
              </div>
              <img src="./images/YSL_nuochoa_1_1.jpg" alt="" />
            </div>
          </div>
          <div className="col-4 col-md-12 col-sm-12">
            <div className="promotion-box">
              <div className="text">
                <h3>CHANEL</h3>
                <Link to={`/listproduct/2`} className="btn-flat btn-hover"><span>bộ sưu tập</span></Link>
              </div>
              <img src="./images/Chanel_nuochoa_1.png" alt="" />
            </div>
          </div>
          <div className="col-4 col-md-12 col-sm-12">
            <div className="promotion-box">
              <div className="text">
                <h3>DIOR</h3>
                <Link to={`/listproduct/3`} className="btn-flat btn-hover"><span>bộ sưu tập</span></Link>
              </div>
              <img src="./images/Dior_nuochoa_1.jpg" alt="" />
            </div>
          </div>
        </div>
      </div>
    )
}
export default Promotion;
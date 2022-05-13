import {Link} from 'react-router-dom'
const Slider=()=>{
    let slide_index = 0;
    let slide_play = true;
    let slides = document.querySelectorAll('.slide')
    // console.log(slides.length)
    const hideAllSlide = () => {
    slides.forEach(e => {
        e.classList.remove('active')
    })
}

const showSlide = () => {
    hideAllSlide()
    slides[slide_index].classList.add('active')
}

    const nextSlide = () => slide_index = slide_index + 1 === slides.length ? 0 : slide_index + 1
    const prevSlide = () => slide_index = slide_index - 1 < 0 ? slides.length - 1 : slide_index - 1
    const prevBtn=()=>{
      nextSlide()
      showSlide()
    }
    const nextBtn =()=>{
      prevSlide()
      showSlide()
    }
    setInterval(() => {
      if (!slide_play) return
        nextSlide()
        showSlide()
    }, 10000);
    return(
        <div className="hero">
        <div className="slider">
          <div className="container">
            {/* slide item */}
            <div className="slide active">
              <div className="info">
                <div className="info-content">
                  <h2 className="top-down trans-delay-0-2">
                    NƯỚC HOA LIBRE EDT 90ML
                  </h2>
                  <p className="top-down trans-delay-0-4">
                    Hương thơm đại diện của tự do trong thời đại mới - Libre EDT. Một loại nước hoa tuyên ngôn không thể thiếu, làm nên phong cách và tỏa sáng với luật lệ riêng của bản thân. Chỉ với một “pump" nước hoa cũng đủ khiến mọi nơi bạn đi qua đắm chìm trong thế giới của mạnh mẽ và gợi cảm.
                  </p>
                  <div className="top-down trans-delay-0-6">
                    <Link to='/product/19' className="btn-flat btn-hover">
                      <span>mua ngay</span>
                    </Link>
                  </div>
                </div>
              </div>
              <div className="img top-down">
                <img src="./images/YSL_nuochoa_1_1.jpg" alt="" />
              </div>
            </div>
            {/* end slide item */}
            {/* slide item */}
            <div className="slide">
              <div className="info">
                <div className="info-content">
                  <h2 className="top-down trans-delay-0-2">
                    SON THỎI YSL
                  </h2>
                  <p className="top-down trans-delay-0-4">
                    Dòng son lâu trôi với nhiều màu sắc đa dạng đem đến đôi môi quyến rũ
                  </p>
                  <div className="top-down trans-delay-0-6">
                    <Link to='/product/1' className="btn-flat btn-hover">
                      <span>mua ngay</span>
                    </Link>
                  </div>
                </div>
              </div>
              <div className="img right-left">
                <img src="./images/YSL_son_1.jpg" alt="" />
              </div>
            </div>
            {/* end slide item */}
            {/* slide item */}
            <div className="slide">
              <div className="info">
                <div className="info-content">
                  <h2 className="top-down trans-delay-0-2">
                  Nước Hoa Yves Saint Laurent Y Eau de Parfum
                  </h2>
                  <p className="top-down trans-delay-0-4">
                    Yves Saint Laurent Y thể hiện sự cân bằng giữa những nốt hương mạnh mẽ và nhẹ nhàng, nồng nàn và tươi mát. Một mùi hương nguyên bản và nổi bật, tôn lên sự nam tính của phái mạnh.
                  </p>
                  <div className="top-down trans-delay-0-6">
                    <Link to ='/product/7'  className="btn-flat btn-hover">
                      <span>mua ngay</span>
                    </Link>
                  </div>
                </div>
              </div>
              <div className="img left-right">
                <img src="./images/YSL_nuochoa_2.jpg" alt="" />
              </div>
            </div>
            {/* end slide item */}
     
          </div>
          {/* slider controller */}
          <button className="slide-controll slide-next" onClick={nextBtn}>
            <i className="bx bxs-chevron-right" />
          </button>
          <button className="slide-controll slide-prev" onClick={prevBtn}>
            <i className="bx bxs-chevron-left" />
          </button>
          {/* end slider controller */}
        </div>
      </div>
    )
}
export default Slider;
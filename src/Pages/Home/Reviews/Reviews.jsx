import React, { use } from 'react';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';
import ReviewCard from './ReviewCard';
import { Autoplay, EffectCoverflow, Pagination } from 'swiper/modules';


const Reviews = ({reviewsPromise}) => {
    const reviewsData = use(reviewsPromise)

    return (
        <div className='my-10'>
            <div className='my-5'>
                <h1 className='text-center text-3xl font-bold'>What our customers are sayings</h1>
                <p className='mt-3 text-center'>Enhance posture, mobility, and well-being effortlessly with Posture Pro. Achieve<br/> proper alignment, reduce pain, and strengthen your body with ease!</p>
            </div>
            <Swiper
            effect={'coverflow'}
            grabCursor={true}
            centeredSlides={true}
            loop={true}
            slidesPerView={3}
            coverflowEffect={{
          rotate: 30,
          stretch: 50,
          depth: 50,
          modifier: 1,
          slideShadows: true,
        }}
        autoplay={{
            delay: 2000,
            disableOnInteraction: false,
          }}
          pagination={true}
        modules={[EffectCoverflow,Autoplay,Pagination]}
            >
                {
                    reviewsData.map(reviewData=><SwiperSlide>
                        <ReviewCard reviewData={reviewData}></ReviewCard>
                    </SwiperSlide>)
                }
            </Swiper>

        </div>
    );
};

export default Reviews;
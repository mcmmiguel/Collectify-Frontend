import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import Fab from "@/components/collections/FAB";
import CollectionCard from '@/components/collections/CollectionCard';
import PreviewItemCard from "@/components/items/PreviewItemCard";
import { getLatestItems, getMostPopularItems } from "@/api/ItemAPI";
import { getLargestCollections } from '@/api/CollectionAPI';
import LoadingSpinner from '@/components/LoadingSpinner';
import { useAuth } from '@/hooks/useAuth';
import { Link } from 'react-router-dom';


const MainView = () => {

    const { t } = useTranslation();
    const { user } = useAuth();

    const { data: latestItems, isLoading: latestLoading } = useQuery({
        queryKey: ['latestItems'],
        queryFn: getLatestItems,
    })

    const { data: popularItems, isLoading: popularLoading } = useQuery({
        queryKey: ['popularItems'],
        queryFn: getMostPopularItems,
    })

    const { data: largestCollections, isLoading: largestLoading } = useQuery({
        queryKey: ['largestCollections'],
        queryFn: getLargestCollections,
    })

    return (
        <>
            <p className='text-center w-full py-3 bg-white rounded-lg'>Busqueda</p>

            <h1 className="text-center text-3xl font-medium text-text-light dark:text-text-dark mt-10 mb-5">
                {t("Home_Title1")}{''}
                <span className="text-secondary-light font-bold">
                    {t("Home_Title2")}
                </span>
            </h1>

            <div className='w-full flex justify-center my-10'>
                <button className='py-3 px-4 bg-secondary-light hover:bg-secondary-dark uppercase shadow-lg text-text-dark transition-colors rounded-lg font-semibold text-lg' type='button'>
                    <Link to={'/collections'}>
                        {t("Button_ViewAllCollections")}
                    </Link>
                </button>
            </div>

            <div className='my-10'>
                <h2 className="text-2xl text-text-light dark:text-text-dark my-5">
                    <span className="text-secondary-light font-bold">
                        {t("LatestItems_Title1")} {''}
                    </span>
                    {t("LatestItems_Title2")}
                </h2>

                {latestLoading
                    ? <LoadingSpinner />
                    : <Swiper
                        spaceBetween={50}
                        slidesPerView={1}
                        modules={[Pagination]}
                        pagination={{
                            clickable: true,
                        }}
                        breakpoints={{
                            640: {
                                slidesPerView: 2,
                                spaceBetween: 20,
                            },
                            768: {
                                slidesPerView: 3,
                                spaceBetween: 30,
                            },
                            1024: {
                                slidesPerView: 4,
                                spaceBetween: 40,
                            },
                        }}
                    >
                        {latestItems &&
                            latestItems.map(item => <SwiperSlide key={item._id}><PreviewItemCard item={item} /></SwiperSlide>)
                        }
                    </Swiper>
                }
            </div>

            <div className='my-10'>
                <h2 className="text-2xl  text-text-light dark:text-text-dark my-5">
                    <span className="text-secondary-light font-bold">
                        {t("PopularItems_Title1")} {''}
                    </span>
                    {t("PopularItems_Title2")}
                </h2>

                {popularLoading
                    ? <LoadingSpinner />
                    : <Swiper
                        spaceBetween={50}
                        slidesPerView={1}
                        modules={[Pagination]}
                        pagination={{
                            clickable: true,
                        }}
                        breakpoints={{
                            640: {
                                slidesPerView: 2,
                                spaceBetween: 20,
                            },
                            768: {
                                slidesPerView: 3,
                                spaceBetween: 30,
                            },
                            1024: {
                                slidesPerView: 4,
                                spaceBetween: 40,
                            },
                        }}
                    >
                        {popularItems &&
                            popularItems.map(item => <SwiperSlide key={item._id}><PreviewItemCard item={item} /></SwiperSlide>)
                        }
                    </Swiper>
                }
            </div>

            <div className='mt-10'>
                <h2 className="text-2xl text-text-light dark:text-text-dark mt-5">
                    <span className="text-secondary-light font-bold">
                        {t("LargestCollections_Title1")} {''}
                    </span>
                    {t("LargestCollections_Title2")}
                </h2>

                {largestLoading
                    ? <LoadingSpinner />
                    : <Swiper
                        spaceBetween={10}
                        slidesPerView={1}
                        modules={[Pagination]}
                        pagination={{
                            clickable: true,
                        }}
                        breakpoints={{
                            640: {
                                slidesPerView: 2,
                                spaceBetween: 20,
                            },
                            768: {
                                slidesPerView: 3,
                                spaceBetween: 30,
                            },
                            1024: {
                                slidesPerView: 4,
                                spaceBetween: 40,
                            },
                        }}
                    >
                        {largestCollections &&
                            largestCollections.map(collection => <SwiperSlide className='swiper-slide-collection' key={collection._id}><CollectionCard collection={collection} /></SwiperSlide>)
                        }
                    </Swiper>
                }
            </div>
            {user &&
                <Fab />
            }
        </>
    )
}
export default MainView
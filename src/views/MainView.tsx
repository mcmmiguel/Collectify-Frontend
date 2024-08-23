import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'animate.css';
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
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useEffect, useState } from 'react';
import { searchItems } from '@/api/SearchAPI';
import { ItemWithCollection } from '../types';
import defaultImage from '/image-default.jpg';


const MainView = () => {

    const { t } = useTranslation();
    const { user } = useAuth();

    const [searchQuery, setSearchQuery] = useState('');
    const [intervalId] = useState<number | null>(null);

    const { data, refetch } = useQuery({
        queryKey: ['search', searchQuery],
        queryFn: () => searchItems(searchQuery),
        enabled: false
    });

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            if (searchQuery) {
                refetch();
            }
        }, 1000);
        return () => clearTimeout(timeoutId);
    }, [searchQuery, intervalId, refetch]);

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
            <div className='w-full flex flex-col items-center'>
                <div className='flex items-center text-center w-full sm:w-1/2 px-5 py-1 border border-border-light rounded-2xl'>
                    <MagnifyingGlassIcon width={25} height={25} className='text-border-dark dark:text-text-dark' />
                    <input
                        type='text'
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder={t("Search_Placeholder")}
                        className='w-full text-center h-full py-2 border-none focus:outline-none bg-transparent text-text-light dark:text-text-dark' />
                </div>

                {data && (
                    <div className={`animate__animated animate__fadeIn transition w-full sm:w-1/2 max-h-60 overflow-y-auto bg-background-light dark:bg-border-dark border border-gray-300 shadow-lg rounded-lg`}>
                        {data.length > 0
                            ? <ul>
                                {data.map((item: ItemWithCollection) => (
                                    <li key={item._id} className='px-4 py-2 border-b border-gray-200'>
                                        <Link to={`/collections/${item.itemCollection}/items/${item._id}`}>
                                            <div className='flex gap-5 items-center'>
                                                <img
                                                    src={item.image ? item.image : defaultImage}
                                                    className='h-16 w-16 object-cover rounded-lg'
                                                />
                                                <div>
                                                    <p className='text-text-light dark:text-text-dark font-bold'>{item.itemName}</p>
                                                    <p className='text-text-light dark:text-text-dark'>{item.description}</p>
                                                </div>
                                            </div>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                            : <p className='text-center text-text-light dark:text-text-dark py-2'>{t("Search_NoResults")} </p>
                        }
                    </div>
                )}
            </div>

            <h1 className="text-center text-3xl font-medium text-text-light dark:text-text-dark my-10">
                {t("Home_Title1")}{''}
                <span className="text-secondary-light font-bold">
                    {t("Home_Title2")}
                </span>
            </h1>

            <div className='w-full flex justify-center mb-10'>
                <button className='py-2 px-4 bg-secondary-light hover:bg-secondary-dark uppercase shadow-2xl text-text-dark transition-colors rounded-lg font-semibold text-lg' type='button'>
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
import { useNavigate } from 'react-router-dom';

import Header from '../../component/header';
import Footer from '../../component/footer';
import BestSellingProduct from '../../component/best-seller';
import Explore from '../../component/explore';

export default function Home() {
  const navigate = useNavigate();
  return (
    <div class="bg-white dark:bg-background-dark font-display text-text-color">
      <div class="relative flex h-auto min-h-screen w-full flex-col group/design-root overflow-x-hidden">
        <div class="layout-container flex h-full grow flex-col">
          <Header />
          <main class="flex-1 mt-10">
            <section class="px-4 md:px-10 lg:px-40 py-5">
              <div class="@container">
                <div class="@[480px]:p-4">
                  <div class="flex min-h-[880px] flex-col gap-6 bg-cover bg-center bg-no-repeat @[480px]:gap-8 @[480px]:rounded-xl items-center justify-center p-4"
                    data-alt="A picturesque farm scene with cows grazing in a green pasture under a clear blue sky."
                    style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.4) 100%), url("https://cdn.pixabay.com/photo/2017/10/28/06/48/cow-2896329_1280.jpg")` }}>
                    <div class="flex flex-col gap-2 text-center">
                      
                    </div>
                    <button
                      class="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-5 @[480px]:h-14 @[480px]:px-6 bg-secondary text-white text-base font-bold leading-normal tracking-[0.015em] @[480px]:text-lg @[480px]:font-bold @[480px]:leading-normal @[480px]:tracking-[0.015em] hover:bg-opacity-90 transition-opacity">
                      <button onClick={() => navigate('/products')}><span class="truncate">Mua ngay</span></button>
                    </button>
                  </div>
                </div>
              </div>
            </section>
            <section class="px-4 md:px-10 lg:px-40 py-5">
              <div class="px-4 py-3">
                <label class="flex flex-col min-w-40 h-14 w-full max-w-2xl mx-auto">
                  <div class="flex w-full flex-1 items-stretch rounded-xl h-full shadow-sm">
                    <div
                      class="text-text-color flex border-none bg-white items-center justify-center pl-4 rounded-l-xl border-r-0">
                      <span class="material-symbols-outlined">search</span>
                    </div>
                    <input
                      class="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-r-xl text-text-color focus:outline-none focus:ring-2 focus:ring-primary border-none bg-white h-full placeholder:text-gray-400 px-4 pl-2 text-base font-normal leading-normal"
                      placeholder="Tìm kiếm sản phẩm yêu thích của bạn" value="" />
                  </div>
                </label>
              </div>
            </section>
            <section class="px-4 md:px-10 lg:px-40 py-10">
              <h2
                class="text-text-color text-3xl font-bold leading-tight tracking-[-0.015em] px-4 pb-5 pt-5 text-center">
                Khám phá nhiều thể loại sản phẩm</h2>
              <div><Explore /></div>
            </section>
            <section class="px-4 md:px-10 lg:px-40 py-10">
              <h2
                class="text-text-color text-3xl font-bold leading-tight tracking-[-0.015em] px-4 pb-5 pt-5 text-center">
                Sản phẩm bán chạy</h2>
              <div><BestSellingProduct /></div>
            </section>
          </main>
          <Footer />
        </div>
      </div>
    </div>
  )
}

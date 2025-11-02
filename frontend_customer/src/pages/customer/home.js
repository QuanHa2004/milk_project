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
                  <div class="flex min-h-[480px] flex-col gap-6 bg-cover bg-center bg-no-repeat @[480px]:gap-8 @[480px]:rounded-xl items-center justify-center p-4"
                    data-alt="A picturesque farm scene with cows grazing in a green pasture under a clear blue sky."
                    style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.4) 100%), url("https://lh3.googleusercontent.com/aida-public/AB6AXuBAjz9Wb0wyfbpJV-nG-HnSm8GmaU2SnB-ivjI_HF_C47m3QaQwwwAzvxOfwzx1YR5nKKbnPLm9IU5gGDB_hhtlC59KF9Uhh5J7k8RkrQez03W1wHhjzfkpxD3U9KrkGgHW4kxzL3XcRrNdcQpvYx3l-kd5rsTRn3O5ExZaMz3scJDLSnEVoPqiOW1gRpy7NcPPMc0EyHW9Zmst1Yx-yTntWg_c8m3e27Kcfo1VhWnKOFgTUBZnxmj--ldLLWQQr_bHoKjEI1VbrYA")` }}>
                    <div class="flex flex-col gap-2 text-center">
                      <h1
                        class="text-white text-4xl font-black leading-tight tracking-[-0.033em] @[480px]:text-6xl @[480px]:font-black @[480px]:leading-tight @[480px]:tracking-[-0.033em]">
                        Fresh Milk, Delivered to Your Door.
                      </h1>
                      <h2
                        class="text-white text-lg font-normal leading-normal @[480px]:text-xl @[480px]:font-normal @[480px]:leading-normal">
                        Shop Our Collection</h2>
                    </div>
                    <button
                      class="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-5 @[480px]:h-14 @[480px]:px-6 bg-secondary text-white text-base font-bold leading-normal tracking-[0.015em] @[480px]:text-lg @[480px]:font-bold @[480px]:leading-normal @[480px]:tracking-[0.015em] hover:bg-opacity-90 transition-opacity">
                      <button onClick={() => navigate('/products')}><span class="truncate">Shop Now</span></button>
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
                      placeholder="Search for your favorite milk..." value="" />
                  </div>
                </label>
              </div>
            </section>
            <section class="px-4 md:px-10 lg:px-40 py-10">
              <h2
                class="text-text-color text-3xl font-bold leading-tight tracking-[-0.015em] px-4 pb-5 pt-5 text-center">
                Explore Our Milk Varieties</h2>
              <div><Explore /></div>
            </section>
            <section class="px-4 md:px-10 lg:px-40 py-10">
              <h2
                class="text-text-color text-3xl font-bold leading-tight tracking-[-0.015em] px-4 pb-5 pt-5 text-center">
                Our Best Sellers</h2>
              <div><BestSellingProduct /></div>
            </section>
          </main>
          <Footer />
        </div>
      </div>
    </div>
  )
}

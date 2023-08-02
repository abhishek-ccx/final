import Navbar from "./Navbar";
import Footer from "./Footer";
import SocialMedia from "./SocialMedia";
import { ImagesComp } from "./Images";

export default function Plp() {
  return (
    <>
      <main className="lg:px-16 lg:py-7 px-6 py-2">
        <Navbar></Navbar>
        <SocialMedia></SocialMedia>
        <div className="text-center">
          <div className="text-center p-10">
            <div className="flex justify-center">
              <div className="mt-8 px-3 border-b-8 border-orange-500">
                <p className="text-black text-5xl  bg-blend-color relative top-3">
                  Women
                </p>
              </div>
            </div>
          </div>
          <div className="pb-12">
            <div className="grid lg:grid-cols-4 grid-cols-2 lg:gap-12 gap-8">
              <ImagesComp></ImagesComp>
            </div>
          </div>
        </div>
        <Footer></Footer>
      </main>
    </>
  );
}

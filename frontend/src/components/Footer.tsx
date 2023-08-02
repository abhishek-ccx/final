const Footer = () => {
  return (
    <>
      <footer className="bg-black lg:px-32 lg:py-16 p-8">
        <div className="grid grid-cols-2 gap-5 lg:grid-cols-4 lg:gap-10">
          <div>
            <p className="lg:py-2 py-0.5 lg:text-sm text-xs text-white">
              <a href="./product_listing.html">Shop lol</a>
            </p>
            <p className="lg:py-2 py-0.5 lg:text-sm text-xs text-white">
              <a href="./pdp.tsx">About</a>
            </p>
            <p className="lg:py-2 py-0.5 lg:text-sm text-xs text-white">
              <a href="#">Contact</a>
            </p>
            <p className="lg:py-2 py-0.5 lg:text-sm text-xs text-white">
              <a href="#">Stockists</a>
            </p>
          </div>
          <div>
            <p className="lg:py-2 py-0.5 lg:text-sm text-xs text-white">
              <a href="#">FAQ</a>
            </p>
            <p className="lg:py-2 py-0.5 lg:text-sm text-xs text-white">
              <a href="#">Shipping & Returns</a>
            </p>
            <p className="lg:py-2 py-0.5 lg:text-sm text-xs text-white">
              <a href="#">Store Policy</a>
            </p>
            <p className="lg:py-2 py-0.5 lg:text-sm text-xs text-white">
              <a href="#">Payment Methods</a>
            </p>
          </div>
          <div>
            <p className="lg:py-2 py-0.5 lg:text-sm text-xs text-white">
              <a href="#">Instagram</a>
            </p>
            <p className="lg:py-2 py-0.5 lg:text-sm text-xs text-white">
              <a href="#">Pinterest</a>
            </p>
            <p className="lg:py-2 py-0.5 lg:text-sm text-xs text-white">
              <a href="#">Facebook</a>
            </p>
            <p className="lg:py-2 py-0.5 lg:text-sm text-xs text-white">
              <a href="#">Twitter</a>
            </p>
          </div>
          <div>
            <p className="font-semibold text-sm text-white">
              Join our mailing list
            </p>
            <p className="lg:pb-3 lg:pt-2 pt-1 pb-0.5 text-white text-xs">
              and get 10% off
            </p>
            <form>
              <label className="block">
                <input
                  type="email"
                  name="email"
                  className="mt-1 lg:px-3 lg:py-2 px-1 py-1 bg-black border placeholder-white focus:outline-none text-white block w-full text-xs lg:text-sm"
                  placeholder="Enter your email here*"
                />
                <button className="bg-orange-500 hover:bg-white text-white lg:text-lg text-sm lg:font-semibold font-normal hover:text-orange-500 lg:py-1 lg:px-2 py-0 px-2 my-1 border border-orange-500 hover:border-orange-500 none w-full">
                  Subscribe Now
                </button>
              </label>
            </form>
          </div>
        </div>
      </footer>

      <div className="py-4 text-left lg:text-lg text-xs">
        © 2035 by NOUS. Powered and secured by{" "}
        <a href="#" className="underline">
          Wix
        </a>
      </div>
    </>
  );
};

export default Footer;

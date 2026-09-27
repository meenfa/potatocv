import Link from "next/link";
import CustomButton from "../common/CustomButton";

const Header = () => (
  <header className="mb-4 flex items-center justify-center md:justify-start">
    <Link href="/" aria-label="PotatoCV home" className="inline-flex rounded-md focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#c68642]/40">
      <CustomButton
        uppercase
        textClassName="font-black text-xl sm:text-2xl md:text-3xl lg:text-4xl"
      >
        PotatoCV
      </CustomButton>
    </Link>
  </header>
);

export default Header;

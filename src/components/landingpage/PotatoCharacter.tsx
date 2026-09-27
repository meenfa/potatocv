import Image from "next/image";

const PotatoCharacter = () => (
  <div className="mx-auto flex h-48 w-48 items-center justify-center rounded-full border-2 border-[#44260a]/15 bg-[#fff8e9] sm:h-56 sm:w-56">
    <Image
      src="/asset/7.png"
      alt="PotatoCV mascot"
      width={180}
      height={180}
      className="animate-bounce-slow h-40 w-40 object-contain motion-reduce:animate-none sm:h-48 sm:w-48"
      priority
    />
  </div>
);

export default PotatoCharacter;

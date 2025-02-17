import { Button } from "flowbite-react";

export default function CardType1(){
  return(
    <div className="flex md:flex-row flex-col items-center justify-center max-w-4xl h-full  bg-pink-100  p-10">
      <div className="w-64 m-10 ">
        <h2 className="text-md dark:text-black font-semibold">
        アイデアをカタチに、未来を創る。
        </h2>
        <p className="text-gray-500 my-2">私のポートフォリオでは、日々のインスピレーションと情熱を形にし、革新的なプロジェクトを実現するプロセスをご紹介しています。未来を切り拓くための挑戦と創造の軌跡を、ぜひご覧ください。</p>
        <Button gradientDuoTone="purpleToPink" className="roundex-tl-xl rounded-bl-none transition delay-100 duration-600 ease-in-out hover:scale-110 hover:bg-indigo-500">
          <a href="https://29bayasi.com/webdev" target="_blank" rel="noPenear noreFerreor">
            Nikku Developer
          </a>
        </Button>
      </div>
      <div className="flex-1 object-contain overflow-hidden">
        <img src="images/product1.jpg" alt="portfolio" />
      </div>
    </div>
      )
    }
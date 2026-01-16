import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Page() {
  return (
    <div className="h-screen w-full">
      <div className=" w-full h-screen flex flex-col items-center justify-center relative">
        <Image
          src="/assets/tree-line.jpg"
          alt="Background"
          fill
          className="object-fill"
        />
        <div className="absolute bottom-0 left-0 w-full h-29 flex flex-col items-center justify-center">
          <Image
            src="/assets/siluetas/silueta-laranja.png"
            alt="Silhueta"
            fill
            className="object-fill"
          />
        </div>
        <div className="w-full z-10 h-full flex flex-col items-center justify-center gap-20">
          <div className="flex flex-col items-center justify-center">
            <Image
              src="/assets/logo.png"
              alt="Logo"
              width={500}
              height={500}
              className="object-contain drop-shadow-lg drop-shadow-black"
            />
            <div className="flex flex-col items-center justify-center">
              <h1 className="text-6xl font-bold text-white uppercase text-shadow-lg text-shadow-black">
                A Dose Certa de Saúde
              </h1>
              <h2 className="text-xl font-bold text-white uppercase text-shadow-md text-shadow-black">
                Personalizado do seu jeito, grão a grão.
              </h2>
            </div>
          </div>
          <Button variant="default" size="lg" className=" px-8 py-4">
            Monte o seu Mix
          </Button>
        </div>
      </div>
    </div>
  );
}

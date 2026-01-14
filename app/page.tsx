import Image from "next/image";

export default function Page() {
  return (
    <div className="h-screen w-full relative">
      <div className=" w-full h-full flex flex-col items-center justify-center relative">
        <Image
          src="/assets/tree-line.jpg"
          alt="Background"
          fill
          className="object-cover"
        />
        <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center">
          <h1 className="text-4xl font-bold text-white">
            Sua alimentação saudável
          </h1>
          <h2 className="text-2xl font-bold text-white">
            Do jeito que você quiser
          </h2>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center h-screen w-full bg-primary/50">
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-4xl font-bold text-white">Monte o seu Mix</h1>
          <p className="text-white">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
            quos.
          </p>
        </div>
      </div>
    </div>
  );
}

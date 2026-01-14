import Image from "next/image";

export default function Page() {
  return (
    <div className="h-screen w-full relative">
      <Image
        src="/assets/tree-line.jpg"
        alt="Background"
        fill
        className="object-cover"
      />
      <p>Hi como voce esta? </p>
    </div>
  );
}

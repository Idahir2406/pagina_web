import { Skeleton } from "@nextui-org/react";
export function CartProduct() {
  return (
    <>
      <div className="border-t w-full max-w-5xl py-4 flex gap-4">
      <Skeleton className="rounded-lg h-44 w-44 ," />

      <div className="flex flex-col gap-2">
        <Skeleton className="rounded-lg h-3 w-44 mt-2" />
        <div>
          <Skeleton className="rounded-lg h-2 w-96 mt-2" />
          <Skeleton className="rounded-lg h-2 w-80 mt-2" />
          <Skeleton className="rounded-lg h-2 w-72 mt-2" />
        </div>
        <Skeleton className="rounded-lg h-3 w-24 mt-2" />
      </div>
    </div>
    <div className="border-t w-full max-w-5xl py-4 flex gap-4">
    <Skeleton className="rounded-lg h-44 w-44 ," />

    <div className="flex flex-col gap-2">
      <Skeleton className="rounded-lg h-3 w-44 mt-2" />
      <div>
        <Skeleton className="rounded-lg h-2 w-96 mt-2" />
        <Skeleton className="rounded-lg h-2 w-80 mt-2" />
        <Skeleton className="rounded-lg h-2 w-72 mt-2" />
      </div>
      <Skeleton className="rounded-lg h-3 w-24 mt-2" />
    </div>
  </div>
    </>
  );
}

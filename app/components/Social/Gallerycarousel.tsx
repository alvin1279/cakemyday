import { useRef, useState } from "react";
import { Card, CardContent } from "../ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import type { CarouselApi } from "../ui/carousel";
import { IMAGES } from "./social.data";
import { useIsMobile } from "./hooks/Useismobile";
import { useCarouselPageScroll } from "./hooks/useCarouselPageScroll";

export function GalleryCarousel() {
  const isMobile = useIsMobile();
  const [api, setApi] = useState<CarouselApi>();
  const wrapperRef = useRef<HTMLDivElement>(null);

  useCarouselPageScroll(api, wrapperRef, isMobile);

  return (
    <div ref={wrapperRef} className="w-full">
      <Carousel
        setApi={setApi}
        opts={{ dragFree: true }}
        orientation={isMobile ? "vertical" : "horizontal"}
        className="w-full"
      >
        <CarouselContent className={isMobile ? "-mt-3 h-130 flex-col" : "-ml-3"}>
          {IMAGES.map((src, index) => (
            <CarouselItem
              key={index}
              className={
                isMobile
                  ? "pt-3 basis-full"
                  : "basis-1/2 pl-3 md:basis-1/3 lg:basis-1/4"
              }
            >
              <Card className="overflow-hidden rounded-2xl border-0 shadow-none">
                <CardContent className="p-0 aspect-3/4">
                  <img
                    src={src}
                    alt={`Gallery image ${index + 1}`}
                    className="social-card-img"
                  />
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="social-carousel-prev" />
        <CarouselNext className="social-carousel-next" />
      </Carousel>
    </div>
  );
}
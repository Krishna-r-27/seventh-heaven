function GuestServicesCard({ img, title, desc }) {
  return (
      <div className="grid grid-cols-[auto_1fr] gap-x-5 px-4 py-6 rounded-md bg-white shadow-[0_0_10px_-1px_rgba(0,0,0,0.12)]">

          <div className="w-10 h-10 md:w-14 md:h-14 flex items-center justify-center bg-[#F0F4FF] rounded-md shrink-0 min-[500px]:row-span-2">
              <picture>
                  <source srcSet={img.webp} type="image/webp" />
                  <img
                      src={img.png}
                      alt={title}
                      className="w-4 h-4 md:w-6 md:h-6 object-contain"
                  />
              </picture>
          </div>

          <h4 className="text-blue font-semibold md:text-lg leading-snug self-center min-[500px]:self-end">
              {title}
          </h4>

          <p className="text-theme text-md leading-relaxed mt-2 
                  col-span-2 min-[500px]:col-span-1 min-[500px]:col-start-2 min-[500px]:mt-1">
              {desc}
          </p>

      </div>
  );
}

export default GuestServicesCard;
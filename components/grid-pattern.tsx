"use client";

export default function GridPattern() {
  return (
    <>
      {/* Background with grid and light points */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Modern grid with thin lines with fading effect */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(to right, rgba(43, 8, 92, 0.03) 1px, transparent 1px), 
                              linear-gradient(to bottom, rgba(43, 8, 92, 0.03) 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
            maskImage:
              "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0) 100%)",
          }}
        ></div>

        {/* Modern random light points */}
        <div className="absolute inset-0">
          <div className="absolute top-[5%] left-[3%] w-72 h-72 bg-blue-500/30 rounded-full blur-3xl"></div>
          <div className="absolute top-[15%] right-[2%] w-96 h-96 bg-purple-500/25 rounded-full blur-3xl"></div>
          <div className="absolute bottom-[8%] right-[4%] w-80 h-80 bg-indigo-500/30 rounded-full blur-3xl"></div>
          <div className="absolute top-[67%] left-[7%] w-64 h-64 bg-blue-600/25 rounded-full blur-3xl"></div>
          <div className="absolute bottom-[25%] left-[42%] w-80 h-80 bg-purple-600/20 rounded-full blur-3xl"></div>
        </div>
      </div>
    </>
  );
}

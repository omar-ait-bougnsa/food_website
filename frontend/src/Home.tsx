function Home() {
  return (
    <div className=" flex px-12 h-[70px] mt-10">
      <div
        className="relative w-full max-w-9xl h-[900px] rounded-2xl overflow-hidden"
        style={{
          backgroundImage: "url('/image/header_img.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 flex items-center px-10">
          <div className="text-white max-w-md">
            <h1>
              Order your <br /> favourite food here </h1>

            <p>
              Choose from a diverse menu featuring delectable dishes
              crafted with the finest ingredients.
            </p>

            <button >
              View Menu
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;

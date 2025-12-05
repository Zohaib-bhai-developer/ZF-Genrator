export default function Gallery({ images }) {
  return (
    <div className="w-full max-w-6xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-4 mb-12">
      {images && images.length > 0 ? (
        images.map((img, index) => (
          <div key={index} className="rounded-lg overflow-hidden shadow-lg">
            <img src={img} alt={`AI Generated ${index}`} className="w-full h-auto" />
          </div>
        ))
      ) : (
        <p className="text-gray-400 text-center w-full">No images generated yet</p>
      )}
    </div>
  );
}

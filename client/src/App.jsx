import ImageGenerator from './components/ImageGenerator';
import CursorEffect from './components/CursorEffect';
import Gallery from './components/Gallery';

function App() {
  return (
    <>
      <CursorEffect />
      <div className="min-h-screen flex flex-col items-center justify-start pt-12 bg-gradient-to-b from-gray-900 to-black">
        <ImageGenerator />
        <Gallery />
      </div>
    </>
  );
}

export default App;

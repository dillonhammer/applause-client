import useSound from "use-sound";
import newHorizon from "./sounds/dillon-anh.m4a";

function App() {
  const [play, { stop }] = useSound(newHorizon);

  return (
    <div>
      <button onMouseDown={play} onMouseUp={() => stop()}>
        Play!
      </button>
    </div>
  );
}

export default App;

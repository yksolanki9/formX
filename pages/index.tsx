export default function Home() {
  return (
    <>
      <div className="snap-y snap-mandatory h-screen overflow-scroll">
        <div className="h-screen flex items-center justify-center bg-red-500 snap-start snap-always">
          <div>What's your first name?</div>
        </div>
        <div className="h-screen flex items-center justify-center bg-green-200 snap-start snap-always">
          <div>And what's your last name?</div>
        </div>
        <div className="h-screen flex items-center justify-center bg-blue-400 snap-start snap-always">
          <div>And here's the next question</div>
        </div>
        <div className="h-screen flex items-center justify-center bg-yellow-300 snap-start snap-always">
          <div>And the final question comes here</div>
        </div>
      </div>
    </>
  );
}

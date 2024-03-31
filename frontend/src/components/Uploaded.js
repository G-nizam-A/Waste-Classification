//import CheckIcon from '@mui/icons-material/Check';

const Uploaded = ({ image, predict, accuracy, advice, color, TrashBinImage }) => {
  const handleRetry = () => {
    window.location.reload();
  };
  return (
    <>
      <div className="left-0 sm:drop-shadow-lg gap-3 py-4 items-center justify-center w-full  md:w-1/2  bg-white rounded-3xl transition-all duration-500 transform mx-auto">
        <div className="flex justify-center items-center">
          <img src={TrashBinImage} alt="Trash Bin" className="h-16" />
          <div>
            <p className={`ml-0 uppercase text font-bold ${color}`}>{predict} </p>
            <p >Prob: <span className={accuracy > 80 ? 'text-green-600' : 'text-red-500'}>{accuracy}%</span> </p>
          </div>

        </div>
      </div>
      <div className="flex flex-col sm:drop-shadow-lg gap-6 py-4 items-center justify-center w-full  mx-auto bg-white md:w-1/2 rounded-3xl">
        <p className="text-center font-semibold text-2xl uppercase text-[#8BC541]">Waste classification</p>
        <div>
          <img src={image} className="max-w-full mx-auto h-[28vh] sm:h-[28vh] rounded-3xl" />
        </div>
        <div className="flex justify-center">
          <div className="bg-lime-200/40 text-slate-600 text-md rounded-xl px-8 py-3 mx-12">
            {advice?.split('\n').map((item, i) => (
              <p key={i} className="mt-2">
                {item}
              </p>
            ))}
          </div>
        </div>
        <button
          onClick={handleRetry}
          className="bg-lime-400/40 text-slate-600 font-medium rounded-xl w-auto mx-auto px-6 py-3 text-md hover:bg-lime-600/75 hover:text-white transition-all duration-300"
        >
          Retry
        </button>
      </div>
    </>
  );
};

export default Uploaded;

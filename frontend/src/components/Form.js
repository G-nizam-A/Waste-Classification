import { useCallback, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, glass, metal, paper, plastic, organic, battery, cardboard, shoes, trash, camera, biological, clothes} from '../assets';
import Camera from 'react-html5-camera-photo';
import axios from 'axios';

const Form = ({ setImage, setIsPending, setUrl, setColor, setError, setPredict, setAdvice, setTrashBinImage,setAccuracy }) => {
  const uploadImage = async (image) => {
    setError(false);
    setIsPending(true);

    const formData = new FormData();
    formData.append('file', image);

    try {
      const response = await axios.post(`http://localhost:8000/predict`, formData, {
        headers: { 'Content-Type': 'multipart/form-data', },
      });

      if (response.status !== 200) {
        throw Error('Internal Server Error');
      }

      const data = response.data;
      console.log('data', data)

      setUrl(data.path);

      console.log('Advice:', data.advice.advice);
      console.log('Time:', data.advice.time);

      setPredict(data.predicted_value);
      setAccuracy(data.predicted_accuracy);
      setAdvice(data.advice.advice);
      switch (data.predicted_value) {
        case 'glass':
          setTrashBinImage(glass);
          setColor('glass');
          break;
        case 'metal':
          setTrashBinImage(metal);
          setColor('metal');
          break;
        case 'paper':
          setTrashBinImage(paper);
          setColor('paper');
          break;
        case 'plastic':
          setTrashBinImage(plastic);
          setColor('plastic');
          break;
        case 'organic':
          setTrashBinImage(organic);
          setColor('organic');
          break;
        case 'battery':
          setTrashBinImage(battery);
          setColor('battery');
          break;
        case 'biological':
          setTrashBinImage(biological);
          setColor('biological');
          break;
        case 'cardboard':
          setTrashBinImage(cardboard);
          setColor('cardboard');
          break;
        case 'clothes':
          setTrashBinImage(clothes);
          setColor('clothes');
          break;
        case 'shoes':
          setTrashBinImage(shoes);
          setColor('shoes');
          break;
        case 'trash':
          setTrashBinImage(trash);
          setColor('trash');
          break;
        default:
          setTrashBinImage(null);
          break;
      }
      setIsPending(false);
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error('Error response from server:', error.response.data);
        console.error('Status code:', error.response.status);
        console.error('Headers:', error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        console.error('No response received:', error.request);
      } else {
        // Something happened in setting up the request that triggered an error
        console.error('Error:', error.message);
      }
      console.error('Main Error:', error);
      setIsPending(false);
      setError(true);
    }
  };

  const [dataUri, setDataUri] = useState('');
  function handleTakePhoto(dataUri) {
    console.log('takePhoto');
    setDataUri(dataUri);
    let byteString = atob(dataUri.split(',')[1]);

    // separate out the mime component
    let mimeString = dataUri.split(',')[0].split(':')[1].split(';')[0];

    let ab = new ArrayBuffer(byteString.length);
    let ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    let blob = new Blob([ab], { type: mimeString });
    setImage(URL.createObjectURL(blob));
    uploadImage(blob);
  }

  const onDrop = useCallback(
    async (acceptedFiles) => {
      let file = acceptedFiles[0];
      let reader = new FileReader();

      reader.readAsDataURL(file);
      reader.onload = () => {
        setImage(reader.result);
        uploadImage(file);
      };
    },
    [setImage],
  );
  const handlePaste = (event) => {
    const items = event.clipboardData.items;
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      if (item.kind === 'file') {
        const blob = item.getAsFile();
        console.log('Pasted file:', blob);
        setImage(URL.createObjectURL(blob));
        uploadImage(blob);
      }
    }
  };
  const { getRootProps, getInputProps, open } = useDropzone({
    onDrop,
    maxFiles: 1,
    accept: { 'image/*': [] },
    noClick: true,
    noKeyboard: true,
  });
  const [isCameraActive, setIsCameraActive] = useState(false);
  const toggleCamera = () => {
    setIsCameraActive((prevState) => !prevState);
  };
  useEffect(() => {
    document.addEventListener('paste', handlePaste);
    return () => {
      document.removeEventListener('paste', handlePaste);
    };
  }, []);
  return (
    <div className="flex flex-col min-h-[50vh] drop-shadow-xl w-full py-16 sm:px-16 sm:py-10 justify-between bg-white  sm:w-4/6 md:w-3/5 lg:w-fit rounded-3xl mx-auto p-3">
      <p className="text-center font-semibold text-[1.375rem] sm:text-3xl mt-4 sm:mt-0 mb-4 uppercase text-[#8BC541]">
      Waste classification
      </p>
      <p className="text-center font-thin text-xs text-slate-400 mb-2">File should be Jpeg , Png...</p>
      <div
        {...getRootProps({
          className:
            'h-52 bg-light-grey border-2 border-green-700 border-dashed rounded-2xl flex flex-col justify-center items-center',
        })}
      >
        <input {...getInputProps({ name: 'image' })} />
        <img
          src={Upload}
          className="max-w-1/3 mx-auto mt-2 w-28 sm:w-24"
          draggable="false"
          style={{ userDrag: 'none', filter: 'contrast(85%)' }}
        />
      </div>
      <p className="text-center font-thin text-xs text-slate-400 mt-4 mb-2">Drag & Drop your image here</p>
      <p className="text-center font-thin text-xs text-slate-400 mb-2">Or</p>
      <button
        onClick={open}
        className="bg-lime-400/40 text-slate-600 font-medium p-1 rounded-xl w-auto mx-auto px-4 py-2 text-md hover:bg-lime-600/75 hover:text-white transition-all duration-300"
      >
        Choose a file
      </button>
      <button
        onClick={toggleCamera}
        className="bg-lime-400/40 text-slate-600 font-medium p-1 mt-4 mb-2 rounded-full w-auto mx-auto px-4 py-2 text-md hover:bg-lime-600/75 hover:text-white transition-all duration-300"
      >
        <img src={camera} className="w-6" />
      </button>
      {isCameraActive && (
        <Camera
          onTakePhoto={(dataUri) => {
            handleTakePhoto(dataUri);
          }}
          isFullscreen={false}
          isImageMirror={true}
          idealResolution={{ width: 512, height: 384 }}
          isMaxResolution={false}
          sizeFactor={1}
        />
      )}
    </div>
  );
};

export default Form;

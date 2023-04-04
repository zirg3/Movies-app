import React, { useCallback } from 'react';
import { AiOutlineInfoCircle } from 'react-icons/ai';
// import PlayButton from '@/components/PlayButton';
import useBillboard from '@/hooks/useBillboard';
import PlayButton from './PlayButton';
import useInfoModal from '@/hooks/useInfoModal';

const Billboard: React.FC = () => {
  const { data } = useBillboard();
  const { openModal } = useInfoModal();

  const handleOpenModal = useCallback(() => {
    openModal(data?.id);
  }, [openModal, data?.id]);



  return (
    <div className="flex relative min-h-[50vw] h-auto">
      <video poster={data?.thumbnailUrl} className="absolute top-0 left-0 w-full min-h-[50vw] h-full object-cover brightness-[60%] transition duration-500" autoPlay muted loop src={data?.videoUrl}></video>
      <div className="relative self-center pt-[70px] md:pt-[100px] pb-8 top-[30%] md:top-[40%] ml-4 md:ml-16">
        <p className="text-white text-1xl md:text-5xl h-full w-[50%] lg:text-6xl font-bold drop-shadow-xl">
          {data?.title}
        </p>
        <p className="text-white text-[8px] md:text-lg mt-3 md:mt-8 w-[90%] md:w-[80%] lg:w-[50%] drop-shadow-xl">
          {data?.description}
        </p>
        <div className="flex flex-row items-center mt-3 md:mt-4 gap-3">
          <PlayButton movieId={data?.id} />
          <button
            onClick={handleOpenModal}
            className="
            bg-white
            text-white
              bg-opacity-30 
              rounded-md 
              py-1 md:py-2 
              px-2 md:px-4
              w-auto 
              text-xs lg:text-lg 
              font-semibold
              flex
              flex-row
              items-center
              hover:bg-opacity-20
              transition
            "
            >
              <AiOutlineInfoCircle className="w-4 md:w-7 mr-1" />
              More Info
          </button>
        </div>
      </div>
    </div>
  )
}
export default Billboard;
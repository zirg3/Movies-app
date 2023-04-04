
import React from 'react';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { useRouter } from 'next/router';
import useMovie from '@/hooks/useMovie';
import Plyr from "plyr-react"
import "plyr-react/plyr.css"
import {GetStaticPaths, GetStaticProps, NextPage} from "next";

type MyPlyrConfigurationProps = {
  source: {
    type: any;
    sources: {
      src: string;
    }[];
  };
  options: {
    keyboard: {
      focused: boolean;
      global: boolean;
    };
    controls: string[];
    quality: {
      default: number;
      options: number[];
    };
  };
};

const Watch = () => {
  const router = useRouter();
  const { movieId } = router.query;

  const { data } = useMovie(movieId as string);
  const plyrProps: MyPlyrConfigurationProps = {
  source: {
    type: 'video',
    sources: [{
      src: `${data?.videoUrl}`,
    }],
  },
  options: {
    keyboard: { focused: true, global: true },
    controls: ['play-large', 'play', 'progress', 'current-time', 'mute', 'volume', 'captions', 'settings', 'pip', 'airplay', 'fullscreen'],
    quality: {default: 480, options: [4320, 2880, 2160, 1440, 1080, 720, 576, 480, 360, 240]}
  }
}
  return (
    <div className="h-screen w-screen bg-black flex">
      <nav className="fixed w-full p-4 z-10 flex flex-row items-center gap-8 bg-black bg-opacity-70">
        <AiOutlineArrowLeft onClick={() => router.push('/')} className="w-4 md:w-10 text-white cursor-pointer hover:opacity-80 transition" />
        <p className="text-white text-1xl md:text-3xl font-bold">
          <span className="font-light">Watching:</span> {data?.title}
        </p>
      </nav>
      <Plyr style={{width: '100%'}} {...plyrProps} />
      {/* <video className="h-full w-full" autoPlay controls src={data?.videoUrl}></video> */}
    </div>
  )
}

export default Watch;
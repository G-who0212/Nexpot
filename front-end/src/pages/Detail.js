import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useLocation, useParams } from "react-router-dom";
import { ChevronRight } from "akar-icons";
import { ArrowRight } from "akar-icons";
import { Play } from "akar-icons"; 
import KakaoMapScript from "../components/kakaoMapScripts";
import DetailInfoScripts from "../components/detailInfoScripts";

export default function Detail() {
  const location = useLocation();
  let { videoid } = useParams();
  const [place, setPlaces] = useState([]);
  const [detail, setDetail] = useState([]);
  const [markerPositions, setMarkerPositions] = useState();
  const thumbnail = useRef();

  // 첫 렌더링에 videoid로 상세 정보를 가져옵니다.
  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get(
          "http://13.209.13.176/api/youtube/" + videoid
        );
        const _detail = [
          {
            videoid: res.data.videoid,
            title: res.data.title,
            channelname: res.data.channelname,
            views: res.data.views,
            places: res.data.places,
          },
        ]; 
        KakaoMapScript(res.data.places[0]);
        DetailInfoScripts(res.data.places[0]);
        setDetail(_detail);
        setPlaces(res.data.places);
      } catch (e) {
        console.error(e.message);
      }
    };
    getData();
    //console.log("init get Data");
  }, []);


  const getDetailInfo = () => {
    
  }

  const setPlaceItem = () => {
    return place.map((item, idx) => (
      <button
        key={idx}
        onClick={() => {
          // setMarkerPositions(item);
          KakaoMapScript(item);
          DetailInfoScripts(item);
        }}
        className="transition ease-in-out delay-100 hover:text-[#0D6EFD] hover:underline flex flex-wrap gap-2 place-items-center mt-6 text-sm font-normal text-[#737A7A]"
      >
        {item.pname}
        <ChevronRight
          className="chevronR"
          color="#656565"
          strokeWidth={2}
          size={16}
        />
      </button>
    ));
  };

  /**썸네일 고해상도 없을 시 이미지 에러 처리 */
  const [imgSrc, setImgSrc] = useState(location.state.thumbnail);
  const handleImgError = (e) => {
    if (thumbnail.current.width <= 360) {
      setImgSrc(location.state.thumbnail.replace("maxresdefault.jpg", "mqdefault.jpg"));
    }
    e.target.classList.add("w-full");
  };

  const onClickExtend = () =>{
    const target = document.getElementById('placeContent');
    console.log(target);
    target.classList.toggle("h-full");
    target.classList.toggle("h-48");
  }

    return (
      <div className="my-4 sm:my-0 mx-4 sm:mx-56 text-white">
        <div className="relative overflow-hidden">

        <div className="absolute inset-x-0 bottom-0 z-10 w-1/2 p-10">
          <p className="mt-6 text-xl font-bold channel">
            {location.state.channelname}
          </p>
          <p className="mt-2 text-sm font-normal title">
            {location.state.title}
          </p>
          <button className="px-10 py-2 mt-4 text-sm font-medium rounded-lg bg-slate-50 text-slate-800"
          onClick={() => window.open(`https://youtu.be/${videoid}`, '_blank')}>
            영상 재생
          </button>
        </div>
        <div className="img-gr"></div>
        <img
          className="m-auto videoImg min-w-[360px]"
          alt="thumbnail"
          ref={thumbnail}
          src={imgSrc}
          onLoad={handleImgError}
        />
      </div>
      <div>
        <p className="mt-16 text-base font-bold">관광코스</p>
        <div id="placeList" className="flex flex-wrap gap-2 sm:flex-row">
          {place && setPlaceItem()}
        </div>
        <div id="map" className="w-full h-[48rem] z-10 rounded-lg mt-6"></div>
        {/* <Map markerPositions={markerPositions} /> */}
        <p className="mt-10 text-base font-bold">여행지 정보</p>
        <div className="grid grid-flow-row sm:grid-flow-col gap-4 mt-4 auto-cols-max">
          <button className="grid grid-flow-col gap-2 items-center border-white border-[0.5px] py-2 px-4">
            카카오지도에서 정보를 찾아보세요
            <ArrowRight strokeWidth={1.5} size={20} />
          </button>
          <button className="grid grid-flow-col gap-2 items-center border-white border-[0.5px] py-2 px-4">
            대한민국 구석구석에서 정보를 찾아보세요
            <ArrowRight strokeWidth={1.5} size={20} />
          </button>
        </div>
        <div id="placeContent" className="mt-8 text-sm leading-6 break-all">
          2017년9월17일 개장. 미포에서 출발해 송정까지 이어지는 동해남부선
          폐선부지의 중간 쯤에 자리한 청사포 다릿돌전망대는 해수면으로 부터
          2017년9월17일 개장. 미포에서 출발해 송정까지 이어지는 동해남부선
          폐선부지의 중간 쯤에 자리한 청사포 다릿돌전망대는 해수면으로 부터
          미포에서 출발해 송정까지 이어지는 동해남부선 폐선부지의 중간 쯤에
          자리한 청사포 다릿돌전망대는 해수면으로 부터...
        </div>
        <button onClick={onClickExtend} className="mt-4 underline underline-offset-4 text-sm font-normal text-[#737A7A]">
          더보기
        </button>
        <p className="mt-8 text-base font-bold">
          상세 정보
        </p>
        <div className="mt-4" id="detailInfo">
        </div>
      </div>
    </div>
  );
}

import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import axios from "axios";

export default function SearchResult() {
  const location = useLocation();

  const [video, setVideo] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get(
          "http://13.209.13.176/api/youtube/search/",
          {
            params: {
              search: location.state.keyword,
            },
          }
        );
        //console.log(res.data);
        const _video = await res.data.map((item) => ({
          channelname: item.channelname,
          region: item.region,
          thumbnail: item.thumbnail,
          title: item.title,
          videoid: item.videoid,
          views: item.views,
          date: item.youtime,
        }));
        setVideo(video.concat(_video));
      } catch (e) {
        console.error(e.message);
      }
    };
    getData();
  }, []);

  return (
    <>
      <div className="mx-4 sm:mx-10 mt-20 text-white">
        <span className="mb-5 text-4xl sm:text-5xl font-bold">
          ‘{location.state.keyword}’
        </span>
        <span className="font-medium text-[#c4c4c4] text-2xl sm:text-3xl">
          의 검색 결과입니다.
        </span>
        {video.length ? (
          <div className="grid grid-col sm:grid-cols-4">
            {video.map((item, idx) => (
              <div className="mx-auto mt-20 sm:mt-16" key={idx}>
                <button className="hover:cursor-default mb-2 px-4 py-0.5 border-[#737A7A] border-[1px] rounded-2xl text-sm font-semibold text-[#737A7A]">
                  {item.region.length > 2
                    ? item.region.substr(3, 2)
                    : item.region}
                </button>
                <Link
                  to={`/detail/${item.videoid}`}
                  state={{
                    thumbnail: item.thumbnail.replace(
                      "mqdefault.jpg",
                      "maxresdefault.jpg"
                    ),
                    channelname: item.channelname,
                    title: item.title,
                  }}
                >
                  <img alt="thumbnail" src={item.thumbnail} />
                  <p className="my-3 text-base font-bold">{item.channelname}</p>
                  <p className="text-sm w-80">{item.title}</p>
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <div>
            <p className="mt-20 text-xl sm:text-4xl font-medium text-center text-white">
              검색 결과가 없어요.
            </p>
            <p className="mt-3 text-xl sm:text-4xl font-medium text-center text-white">
              다른 키워드로 검색해보세요.🕵🏻
            </p>
          </div>
        )}
      </div>
    </>
  );
}

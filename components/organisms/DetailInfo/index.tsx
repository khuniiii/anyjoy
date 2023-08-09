import useStates from "@/components/organisms/DetailInfo/state";
import useListStates from "@/components/organisms/MainList/state";
import useListHandlers from "@/components/organisms/MainList/handler";
import { useEffect } from "react";

const DetailInfo = () => {
  const states = useStates();
  const { router } = states;

  const listStates = useListStates();
  const { aniInfo } = listStates;

  const { getAnimeListData } = useListHandlers(listStates);

  useEffect(() => {
    getAnimeListData();
  }, []);

  console.log(Number(router.query.id));
  return (
    <>
      {aniInfo?.getAnimeList.map((item, index) => {
        return (
          Number(router.query.id) === index + 1 && (
            <div key={index}>{item.title}</div>
          )
        );
      })}
    </>
  );
};

export default DetailInfo;

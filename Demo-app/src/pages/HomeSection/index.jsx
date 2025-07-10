import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getHomeData } from "./HomeSaga";
import { componentKey } from "./HomeSlice";

function HomeSection() {
  const dispatch = useDispatch();
  const { homeData, isLoading, error } = useSelector(
    (state) => state[componentKey]
  );

  useEffect(() => {
    dispatch(getHomeData());
  }, [dispatch]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  console.log(homeData);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Home Section</h1>
      <div className="grid gap-4">
        {/* {homeData &&
          homeData?.map((item) => (
            <div key={item.id} className="border p-4 rounded-lg shadow">
              <h2 className="text-lg font-semibold">{item.title}</h2>
              <p className="text-gray-600 mt-2">{item.body}</p>
              <p className="text-sm text-gray-400 mt-2">ID: {item.id}</p>
            </div>
          ))} */}
      </div>
    </div>
  );
}

export default HomeSection;

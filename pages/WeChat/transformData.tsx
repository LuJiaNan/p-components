import getMessageTypes from "./components";

const transformData = (value: any[]) => {
  let data: any[] = [];
  value.forEach((item) => {
    data.push({
      ...item,
      component: getMessageTypes(item.type || "text", item.me)
    });
  });
  return data;
};

export { transformData };

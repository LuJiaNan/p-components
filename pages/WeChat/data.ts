import { pic1, pic2 } from "./image";

const data = [
  {
    id: 1,
    name: "",
    nickName: "🎃",
    content: "aaa"
  },
  {
    id: 2,
    name: "",
    nickName: "🚀",
    type: "errorText",
    content: "bbb"
  },
  {
    id: 3,
    name: "",
    nickName: "😄",
    type: "image",
    content: pic1
  },
  {
    id: 4,
    name: "",
    nickName: "皮卡丘",
    type: "system",
    // talker: "others",
    content: "xxx加入群聊"
  },
  {
    id: 5,
    name: "",
    nickName: "我",
    // 决定自己说的话还是别人
    me: true,
    content: "我说"
  },
  {
    id: 6,
    name: "",
    nickName: "🚀",
    type: "image",
    me: true,
    content: pic2
  }
];

export default data;

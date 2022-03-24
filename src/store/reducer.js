import { NEW_CREATE, CLICK_MENU, GET_DEVICE } from "./constants.js";
import pic1 from '../assets/img/a1.png'
import pic2 from '../assets/img/a2.png'
const ltdList=[  //主数据
  // {
  //   name:'1有限公司',
  //   icon:pic1,
    // sonList:[
      // {
      //   name:'M1111111 sir',
      //   email:'mSir@ekas.com',
      //   permissions:'owner'
      // },
      // {
      //   name:'B sir',
      //   email:'bSir@ekas.com',
      //   permissions:'can edit'
      // },
      // {
      //   name:'C sir',
      //   email:'CSir@ekas.com',
      //   permissions:'can edit'
      // },
      // {
      //   name:'D sir',
      //   email:'CSir@ekas.com',
      //   permissions:'can edit'
      // },
      // {
      //   name:'E sir',
      //   email:'CSir@ekas.com',
      //   permissions:'can edit'
      // },
      // {
      //   name:'F sir',
      //   email:'CSir@ekas.com',
      //   permissions:'can edit'
      // },
      // {
      //   name:'G sir',
      //   email:'CSir@ekas.com',
      //   permissions:'can edit'
      // }
      // ,
      // {
      //   name:'H sir',
      //   email:'CSir@ekas.com',
      //   permissions:'can edit'
      // }
      // ,
      // {
      //   name:'I sir',
      //   email:'CSir@ekas.com',
      //   permissions:'can edit'
      // }
    // ]
  // },
  // {
  //   name:'2有限公司',
  //   icon:pic2,
  //   sonList:[
  //     {
  //       name:'1 sir',
  //       email:'1Sir@ekas.com',
  //       permissions:'owner'
  //     },
  //     {
  //       name:'2 sir',
  //       email:'2Sir@ekas.com',
  //       permissions:'can edit'
  //     }
  //   ]
  // }
]
const defaultState = {
  counter: 0,
  isDevice:'',
  currentUser:'',//当前用户
  detailedData:ltdList?ltdList[0]:[],//右侧展示区域数据
  permissionsList:['owner','can edit','none'],//下拉数据
  ltdList:ltdList,
  userInfo:{//当前用户信息
    name:'超大有限公司',
    icon:'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
  }
};

function reducer(state = defaultState, action) {
  switch (action.type) {
    case NEW_CREATE:
      return {
        ...state,
        ltdList: action.list
      };
    case CLICK_MENU:
      return {
        ...state,
        detailedData: action.member,
      };
    case GET_DEVICE:
      return {
        ...state,
        isDevice: action.device,
      };  
    default:
      return state;
  }
}

export default reducer;
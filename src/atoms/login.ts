import { atom } from "recoil";
import { DynamicRouteType } from "@/config/routes";
// can use request result to instead it~
const defaultRoute = [
  {
    // path: "/",
    path: "/",
    index: true, // index route写法
    name: "欢迎菜单", // 翻译失败后 则采用name配置值,如无需全球化直接使用中文即可。
    icon: "HomeOutlined", // @/config/icons里配置的图标,小写也可以
    access: "dashboardOpen", // @/config/access里可配置静态策略。权限入口在@/config/pages里。
    component: "dashboard", // 非动态的有page属性的路由，会默认显示在sideMmenu里。
  },
  {
    // 带subs的 为下拉菜单，表明其无需路由，会其忽略page属性。 但会作为subs子路由的父路由,作为siderMenu的Key,内部计数+1
    // 此处没有 component ，则使用 page.js里的 Default 组件
    name: "功能",
    path: "/ab",
    icon: "AppstoreOutlined",
    children: [
      {
        name: "测试1",
        path: "a", // 解析为/ab/a
        component: "test1", // page 建议使用小写，内部会转换成大写,对应到组件上。权限配置中与此保持一致
        access: "test1Open",
      },
      {
        name: "测试2",
        path: "b", // 解析为/ab/b
        component: "test2",
        access: "test2Open",
      },
      {
        name: "测试3",
        path: "c", // 解析为/c
        component: "test3",
        access: "test3Open",
      },
      {
        name: "测试4",
        path: "counter", // 解析为/c
        component: "test4",
        access: "test4Open",
      },
    ],
  },
  {
    name: "微前端",
    path: "/micro",
    icon: "PaperClipOutlined",
    children: [
      // {
      //   name: "material-ui",
      //   path: "material/*",
      //   access: "microOpen",
      //   component: "http://localhost:8002" // 微前端配置
      // },
      {
        name: "vue2测试",
        path: "vue2/*",
        access: "microOpen",
        component: "http://localhost:8001", // 微前端配置
      },
    ],
  },
];

export interface LoginStateAtomType {
  role?: string | null,
  id?: string | null,
  account: string,
  isLogin: boolean,
  token: string | null,
  permission: object,
  route: DynamicRouteType[],
}

export const loginStateAtom = atom({
  key: "loginStateAtom",
  default: {
    role: null,
    id: null,
    account: "test",
    isLogin: false,
    // isLogin: true,
    token: null,
    permission: {},
    route:defaultRoute,
  } as LoginStateAtomType,
});


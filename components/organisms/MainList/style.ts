import { styled } from "stitches.config";

export const ContentContainer = styled("div", {
  width: "100%",
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(280px, 2fr))",
  gridGap: "10px",

  "@mobile": {
    gridTemplateColumns: "repeat(auto-fit, minmax(140px, 2fr))",
  },
});

export const Content = styled("div", {
  display: "grid",
  placeItems: "center",
  marginTop: "30px",
  cursor: "pointer",

  img: {
    width: "100%",
    maxWidth: "280px",
    borderRadius: "15px",

    "@mobile": {
      maxWidth: "140px",
    },
  },
});

export const Title = styled("p", {
  fontWeight: "500",
  fontSize: "20px",
  paddingTop: "10px",

  "@mobile": {
    fontSize: "16px",
  },
});

export const SearchBar = styled("form", {
  // display: "flex",
  // alignItems: "center",
  // justifyContent: "right",
  // // padding: "0 20px",
  // width: "350px",
  // height: "40px",

  // width: "220px",
  // height: "27px",
  // borderRadius: "5px",
  // border: "solid 1px rgba(0, 0, 0, 0.3)",
  // display: "flex",
  // justifyContent: "center",
  // alignItems: "center",
  // zIndex: 1,
  // opacity: 1,

  width: "100%",
  height: "40px",
  margin: "0 auto",
  display: "flex",
  flexDirection: "row",
  border: "1px solid transparent",
  borderRadius: "5px",
  padding: "5px",
  outline: "none",
  boxShadow: "0 0 6px 1px gainsboro",
});

export const SearchInput = styled("input", {
  // display: "inline",
  // boxSizing: "border-box",
  // width: "70%",
  // margin: "0",
  // paddingLeft: "5px",
  // height: "100%",

  // borderRadius: "5px",
  // padding: "10px",
  // fontSize: "14px",
  // fontWeight: "500",
  // marginRight: "5px", // 입력란과 버튼 사이 간격

  flexGrow: "2",
  border: "none",

  "&:focus": {
    outline: "none",
  },
});

export const SearchBtn = styled("button", {
  // width: "30%",
  // display: "inline",
  // border: "none",
  // boxSizing: "border-box",
  // margin: "0",
  // marginLeft: "-10px",
  // height: "100%",

  // backgroundColor: "#d8f7e6",
  // color: "#038235",
  // borderRadius: "5px",
  // textAlign: "center",
  // fontSize: "14px",
  // fontWeight: "500",

  width: "30px",
  border: "1px solid transparent",
  background: "#e5e5e5",
  color: "white",
  borderRadius: "5px",
  cursor: "pointer",

  variants: {
    isRefresh: {
      true: {
        svg: {
          transition: "transform 0.3s ease",
          "&:hover": {
            transform: "rotate(90deg)",
          },
        },
      },
    },
  },
});
